"""KL Wines newsletter commentary lookup."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from html import unescape
import io
import logging
import re
from typing import Any
from urllib.parse import urljoin

import aiohttp
from pypdf import PdfReader

from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

_LOGGER = logging.getLogger(__name__)

NEWSLETTERS_URL = "https://onthetrail.klwines.com/newsletters-clubs"
MAX_NEWSLETTERS = 8
CACHE_TTL = timedelta(hours=24)

STOPWORDS = {
    "a",
    "an",
    "and",
    "cellar",
    "club",
    "de",
    "del",
    "estate",
    "la",
    "le",
    "of",
    "reserve",
    "the",
    "vineyard",
    "wine",
    "wines",
}


@dataclass
class _NewsletterRef:
    label: str
    source_date: str
    url: str


@dataclass
class _BlurbSection:
    title: str
    body: str
    source_url: str
    source_label: str
    source_date: str


class KLWinesClient:
    """Extract commentary blurbs from KL Wines newsletters."""

    def __init__(self, hass: HomeAssistant) -> None:
        self._hass = hass
        self._sections: list[_BlurbSection] = []
        self._loaded_at: datetime | None = None

    async def find_commentary(self, wine: dict[str, Any]) -> dict[str, Any] | None:
        """Return best-match KL blurb for a wine."""
        await self._ensure_loaded()
        if not self._sections:
            return None

        tokens = _tokenize_for_match(
            f"{wine.get('winery', '')} {wine.get('name', '')}"
        )
        if not tokens:
            return None
        vintage = wine.get("vintage")

        best_score = 0
        best: _BlurbSection | None = None

        for section in self._sections:
            score = _section_score(section, tokens, vintage)
            if score > best_score:
                best_score = score
                best = section

        # Require a minimum match quality to avoid random blurbs.
        if not best or best_score < 4:
            return None

        blurb = best.body.strip() or best.title.strip()
        if len(blurb) > 1800:
            blurb = blurb[:1797].rstrip() + "..."

        return {
            "blurb": blurb,
            "source_url": best.source_url,
            "source_label": best.source_label,
            "source_date": best.source_date,
        }

    async def _ensure_loaded(self) -> None:
        """Load newsletter blurbs into memory with TTL caching."""
        now = datetime.now(timezone.utc)
        if self._loaded_at and (now - self._loaded_at) < CACHE_TTL and self._sections:
            return

        refs = await self._fetch_newsletter_refs()
        if not refs:
            return

        sections: list[_BlurbSection] = []
        for ref in refs[:MAX_NEWSLETTERS]:
            text = await self._fetch_pdf_text(ref.url)
            if not text:
                continue
            sections.extend(_extract_blurb_sections(text, ref))

        if sections:
            self._sections = sections
            self._loaded_at = now
            _LOGGER.debug("KL Wines loaded %d blurb sections", len(sections))

    async def _fetch_newsletter_refs(self) -> list[_NewsletterRef]:
        """Fetch month->PDF links from KL Wines newsletters page."""
        session = async_get_clientsession(self._hass)
        timeout = aiohttp.ClientTimeout(total=20)
        headers = {"User-Agent": "Mozilla/5.0", "Accept": "text/html"}

        try:
            async with session.get(NEWSLETTERS_URL, timeout=timeout, headers=headers) as resp:
                if resp.status != 200:
                    _LOGGER.debug("KL newsletters page status %s", resp.status)
                    return []
                html = await resp.text()
        except Exception as err:
            _LOGGER.debug("KL newsletters page fetch failed: %s", err)
            return []

        refs: list[_NewsletterRef] = []
        seen_urls: set[str] = set()

        for href, label_html in re.findall(
            r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>',
            html,
            flags=re.IGNORECASE | re.DOTALL,
        ):
            label = _collapse_ws(_strip_tags(unescape(label_html)))
            parsed = _parse_month_year(label)
            if not parsed:
                continue

            url = urljoin(NEWSLETTERS_URL, unescape(href))
            if not url.lower().endswith(".pdf") or url in seen_urls:
                continue

            seen_urls.add(url)
            refs.append(
                _NewsletterRef(
                    label=label,
                    source_date=parsed.strftime("%Y-%m"),
                    url=url,
                )
            )

        refs.sort(key=lambda r: r.source_date, reverse=True)
        return refs

    async def _fetch_pdf_text(self, url: str) -> str:
        """Download and parse a PDF file into plain text."""
        session = async_get_clientsession(self._hass)
        timeout = aiohttp.ClientTimeout(total=30)
        headers = {"User-Agent": "Mozilla/5.0", "Accept": "application/pdf,*/*"}

        try:
            async with session.get(url, timeout=timeout, headers=headers) as resp:
                if resp.status != 200:
                    _LOGGER.debug("KL newsletter PDF status %s for %s", resp.status, url)
                    return ""
                payload = await resp.read()
        except Exception as err:
            _LOGGER.debug("KL newsletter PDF fetch failed for %s: %s", url, err)
            return ""

        try:
            reader = PdfReader(io.BytesIO(payload))
            chunks: list[str] = []
            for page in reader.pages:
                txt = page.extract_text() or ""
                if txt:
                    chunks.append(txt)
            return "\n".join(chunks)
        except Exception as err:
            _LOGGER.debug("KL newsletter PDF parse failed for %s: %s", url, err)
            return ""


def _extract_blurb_sections(text: str, ref: _NewsletterRef) -> list[_BlurbSection]:
    """Split newsletter text into wine-title + commentary sections."""
    lines = [_collapse_ws(line) for line in text.splitlines()]
    lines = [line for line in lines if line]

    sections: list[_BlurbSection] = []
    title: str | None = None
    body_lines: list[str] = []

    def flush() -> None:
        if not title:
            return
        body = " ".join(body_lines).strip()
        if len(body) < 40:
            return
        sections.append(
            _BlurbSection(
                title=title,
                body=body,
                source_url=ref.url,
                source_label=ref.label,
                source_date=ref.source_date,
            )
        )

    for line in lines:
        if _looks_like_wine_header(line):
            flush()
            title = line
            body_lines = []
            continue

        if title:
            if line.startswith("$"):
                continue
            body_lines.append(line)

    flush()
    return sections


def _section_score(section: _BlurbSection, tokens: set[str], vintage: Any) -> int:
    title_text = f"{section.title} {section.body}".lower()
    score = 0
    for token in tokens:
        if token in title_text:
            score += 2

    sec_vintage = _extract_vintage(section.title)
    if vintage and isinstance(vintage, int) and sec_vintage == vintage:
        score += 3
    return score


def _looks_like_wine_header(line: str) -> bool:
    return bool(
        re.match(r"^(19|20)\d{2}\s+.+\s+Club:\s*\$", line)
        or re.match(r"^(19|20)\d{2}\s+.+\(\s*\$[\d,]+", line)
    )


def _extract_vintage(text: str) -> int | None:
    match = re.search(r"\b(19|20)\d{2}\b", text)
    return int(match.group()) if match else None


def _tokenize_for_match(text: str) -> set[str]:
    clean = re.sub(r"[^a-z0-9\s]", " ", text.lower())
    tokens = {t for t in clean.split() if len(t) >= 3 and t not in STOPWORDS}
    return tokens


def _parse_month_year(text: str) -> datetime | None:
    try:
        return datetime.strptime(text, "%B %Y")
    except ValueError:
        return None


def _strip_tags(text: str) -> str:
    return re.sub(r"<[^>]+>", " ", text)


def _collapse_ws(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()
