"""KL Wines newsletter commentary lookup."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from html import unescape
import io
import logging
import re
from typing import Any
from urllib.parse import unquote, urljoin

import aiohttp
from pypdf import PdfReader

from .const import DOMAIN
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

_LOGGER = logging.getLogger(__name__)

NEWSLETTERS_URL = "https://onthetrail.klwines.com/newsletters-clubs"
NEWSLETTERS_RSS_URL = f"{NEWSLETTERS_URL}?format=rss"
MAX_NEWSLETTERS = 8
CACHE_TTL = timedelta(hours=24)
MATCH_THRESHOLD = 4
GEMINI_CONFIDENCE_THRESHOLD = 0.7
MAX_GEMINI_PAGES = 10
MAX_PAGE_CHARS = 3500
DEBUG_WINE_ID = "7b87734c-3a7b-4ceb-943f-ff7ef0d5a6e9"
DEBUG_KEYWORD = "madrigal"
DEFAULT_BROWSER_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

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
        self._refs: list[_NewsletterRef] = []
        self._pdf_pages_by_url: dict[str, list[tuple[int, str]]] = {}
        self._loaded_at: datetime | None = None

    async def find_commentary(self, wine: dict[str, Any]) -> dict[str, Any] | None:
        """Return best-match KL blurb for a wine."""
        debug_target = _is_debug_target_wine(wine)
        if debug_target:
            _LOGGER.debug(
                "KL DEBUG target wine id=%s winery='%s' name='%s' vintage=%s",
                wine.get("id", ""),
                wine.get("winery", ""),
                wine.get("name", ""),
                wine.get("vintage", ""),
            )
            _LOGGER.debug(
                "KL DEBUG header patterns: /^(19|20)\\d{2} ... Club:\\s*\\$/ OR /^(19|20)\\d{2} ... (\\$.../"
            )
            _LOGGER.debug("KL DEBUG match threshold=%s", MATCH_THRESHOLD)

        await self._ensure_loaded()
        if not self._sections:
            if debug_target:
                _LOGGER.debug("KL DEBUG no sections loaded")
            return None

        tokens = _tokenize_for_match(
            f"{wine.get('winery', '')} {wine.get('name', '')}"
        )
        if debug_target:
            _LOGGER.debug("KL DEBUG tokens=%s", sorted(tokens))
        if not tokens:
            if debug_target:
                _LOGGER.debug("KL DEBUG no tokens extracted from winery+name")
            return None
        vintage = wine.get("vintage")

        best_score = 0
        best: _BlurbSection | None = None
        scored: list[tuple[int, str, _BlurbSection]] = []

        for section in self._sections:
            score, reason = _section_score_details(section, tokens, vintage)
            if score > best_score:
                best_score = score
                best = section
            if debug_target:
                scored.append((score, reason, section))

        # Require a minimum match quality to avoid random blurbs.
        if debug_target:
            matched_keyword = [
                s
                for s in self._sections
                if DEBUG_KEYWORD in f"{s.title} {s.body}".lower()
            ]
            _LOGGER.debug(
                "KL DEBUG sections loaded=%d sections_containing_%s=%d",
                len(self._sections),
                DEBUG_KEYWORD,
                len(matched_keyword),
            )
            for idx, (score, reason, section) in enumerate(
                sorted(scored, key=lambda x: x[0], reverse=True)[:8], start=1
            ):
                _LOGGER.debug(
                    "KL DEBUG cand#%d score=%d reason=%s source='%s' title='%s'",
                    idx,
                    score,
                    reason,
                    section.source_label,
                    section.title[:180],
                )

        if not best or best_score < MATCH_THRESHOLD:
            if debug_target:
                _LOGGER.debug(
                    "KL DEBUG no match: best_score=%d < threshold=%d",
                    best_score,
                    MATCH_THRESHOLD,
                )
            gemini_match = await self._find_commentary_with_gemini(wine, debug_target)
            if gemini_match:
                return gemini_match
            return None

        blurb = best.body.strip() or best.title.strip()
        if len(blurb) > 1800:
            blurb = blurb[:1797].rstrip() + "..."

        if debug_target:
            _LOGGER.debug(
                "KL DEBUG selected score=%d source='%s' title='%s'",
                best_score,
                best.source_label,
                best.title[:180],
            )

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
        self._refs = refs[:MAX_NEWSLETTERS]
        _LOGGER.debug("KL loaded %d newsletter refs from index page", len(refs))

        sections: list[_BlurbSection] = []
        for ref in self._refs:
            pages = await self._fetch_pdf_pages(ref.url)
            if not pages:
                continue
            text = "\n".join(page_text for _, page_text in pages if page_text)
            extracted = _extract_blurb_sections(text, ref)
            _LOGGER.debug(
                "KL extracted %d sections from newsletter '%s' (%s)",
                len(extracted),
                ref.label,
                ref.url,
            )
            sections.extend(extracted)

        if sections:
            self._sections = sections
            self._loaded_at = now
            _LOGGER.debug("KL Wines loaded %d blurb sections", len(sections))

    async def _fetch_newsletter_refs(self) -> list[_NewsletterRef]:
        """Fetch month->PDF links from KL Wines newsletters page."""
        session = async_get_clientsession(self._hass)
        timeout = aiohttp.ClientTimeout(total=20)
        headers = {
            "User-Agent": DEFAULT_BROWSER_UA,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": "https://onthetrail.klwines.com/",
        }

        refs: list[_NewsletterRef] = []

        # Primary path: parse the newsletters page HTML.
        try:
            async with session.get(
                NEWSLETTERS_URL, timeout=timeout, headers=headers
            ) as resp:
                if resp.status == 200:
                    html = await resp.text()
                    refs = _extract_newsletter_refs_from_html(html)
                else:
                    _LOGGER.debug("KL newsletters page status %s", resp.status)
        except Exception as err:
            _LOGGER.debug("KL newsletters page fetch failed: %s", err)

        # Fallback path: parse Squarespace RSS if HTML page is blocked/empty.
        if not refs:
            rss_headers = dict(headers)
            rss_headers["Accept"] = "application/rss+xml,application/xml;q=0.9,*/*;q=0.8"
            try:
                async with session.get(
                    NEWSLETTERS_RSS_URL, timeout=timeout, headers=rss_headers
                ) as resp:
                    if resp.status == 200:
                        rss = await resp.text()
                        refs = _extract_newsletter_refs_from_rss(rss)
                    else:
                        _LOGGER.debug("KL newsletters RSS status %s", resp.status)
            except Exception as err:
                _LOGGER.debug("KL newsletters RSS fetch failed: %s", err)

        refs.sort(key=lambda r: r.source_date, reverse=True)
        return refs

    async def _fetch_pdf_pages(self, url: str) -> list[tuple[int, str]]:
        """Download and parse a PDF into page-numbered text."""
        cached = self._pdf_pages_by_url.get(url)
        if cached is not None:
            return cached

        session = async_get_clientsession(self._hass)
        timeout = aiohttp.ClientTimeout(total=30)
        candidates = [url]
        if "/s/" in url and "?" not in url:
            candidates.append(f"{url}?download=1")

        payload = b""
        for candidate in candidates:
            headers = {
                "User-Agent": DEFAULT_BROWSER_UA,
                "Accept": "application/pdf,application/octet-stream,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
                "Referer": NEWSLETTERS_URL,
                "Origin": "https://onthetrail.klwines.com",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
            }
            try:
                async with session.get(
                    candidate,
                    timeout=timeout,
                    headers=headers,
                    allow_redirects=True,
                ) as resp:
                    if resp.status != 200:
                        _LOGGER.debug(
                            "KL newsletter PDF status %s for %s",
                            resp.status,
                            candidate,
                        )
                        continue
                    payload = await resp.read()
                    if payload:
                        break
            except Exception as err:
                _LOGGER.debug(
                    "KL newsletter PDF fetch failed for %s: %s",
                    candidate,
                    err,
                )

        if not payload:
            return []

        try:
            reader = PdfReader(io.BytesIO(payload))
            pages: list[tuple[int, str]] = []
            for idx, page in enumerate(reader.pages, start=1):
                txt = page.extract_text() or ""
                if txt:
                    pages.append((idx, txt))
            self._pdf_pages_by_url[url] = pages
            return pages
        except Exception as err:
            _LOGGER.debug("KL newsletter PDF parse failed for %s: %s", url, err)
            return []

    async def _find_commentary_with_gemini(
        self, wine: dict[str, Any], debug_target: bool
    ) -> dict[str, Any] | None:
        """Use Gemini to semantically match a wine blurb in newsletter pages."""
        domain_data = self._hass.data.get(DOMAIN, {})
        gemini = domain_data.get("gemini")
        if not gemini:
            return None
        if not self._refs:
            return None

        for ref in self._refs:
            pages = await self._fetch_pdf_pages(ref.url)
            if not pages:
                continue

            candidate_pages = _select_candidate_pages_for_wine(
                pages, wine
            )[:MAX_GEMINI_PAGES]
            if not candidate_pages:
                continue
            payload = [
                {"page": page_num, "text": page_text[:MAX_PAGE_CHARS]}
                for page_num, page_text in candidate_pages
            ]
            result = await gemini.find_newsletter_wine_blurb(
                wine=wine,
                newsletter_label=ref.label,
                newsletter_url=ref.url,
                pages=payload,
            )
            if debug_target:
                _LOGGER.debug(
                    "KL DEBUG Gemini raw source='%s' found=%s confidence=%s page=%s title='%s' evidence='%s'",
                    ref.label,
                    result.get("found"),
                    result.get("confidence"),
                    result.get("page"),
                    str(result.get("matched_wine_title", ""))[:180],
                    str(result.get("evidence", ""))[:180],
                )
            if result.get("error"):
                if debug_target:
                    _LOGGER.debug(
                        "KL DEBUG Gemini error for '%s': %s",
                        ref.label,
                        result.get("error"),
                    )
                continue

            found = bool(result.get("found"))
            try:
                confidence = float(result.get("confidence") or 0.0)
            except (TypeError, ValueError):
                confidence = 0.0
            blurb = str(result.get("blurb", "")).strip()
            page = result.get("page")
            if found and blurb and confidence >= GEMINI_CONFIDENCE_THRESHOLD:
                source_label = ref.label
                if page:
                    source_label = f"{ref.label} (p. {page})"
                if debug_target:
                    _LOGGER.debug(
                        "KL DEBUG Gemini match source='%s' page=%s confidence=%.2f title='%s' evidence='%s'",
                        ref.label,
                        page,
                        confidence,
                        str(result.get("matched_wine_title", ""))[:180],
                        str(result.get("evidence", ""))[:180],
                    )
                return {
                    "blurb": blurb,
                    "source_url": ref.url,
                    "source_label": source_label,
                    "source_date": ref.source_date,
                }

            if debug_target:
                _LOGGER.debug(
                    "KL DEBUG Gemini no match source='%s' found=%s confidence=%.2f",
                    ref.label,
                    found,
                    confidence,
                )
        return None


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
    score, _ = _section_score_details(section, tokens, vintage)
    return score


def _section_score_details(
    section: _BlurbSection, tokens: set[str], vintage: Any
) -> tuple[int, str]:
    title_text = f"{section.title} {section.body}".lower()
    score = 0
    hit_tokens: list[str] = []
    for token in tokens:
        if token in title_text:
            score += 2
            hit_tokens.append(token)

    sec_vintage = _extract_vintage(section.title)
    vintage_bonus = False
    if vintage and isinstance(vintage, int) and sec_vintage == vintage:
        score += 3
        vintage_bonus = True

    reason = f"token_hits={sorted(hit_tokens)} vintage_match={vintage_bonus}"
    return score, reason


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


def _is_debug_target_wine(wine: dict[str, Any]) -> bool:
    """Enable deep KL debug logs for one known target wine."""
    if wine.get("id") == DEBUG_WINE_ID:
        return True
    name = f"{wine.get('winery', '')} {wine.get('name', '')}".lower()
    return DEBUG_KEYWORD in name


def _extract_newsletter_refs_from_html(html: str) -> list[_NewsletterRef]:
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
    return refs


def _extract_newsletter_refs_from_rss(rss: str) -> list[_NewsletterRef]:
    refs: list[_NewsletterRef] = []
    seen_urls: set[str] = set()

    for item in re.findall(r"<item\b.*?>.*?</item>", rss, flags=re.IGNORECASE | re.DOTALL):
        title_match = re.search(
            r"<title>(.*?)</title>", item, flags=re.IGNORECASE | re.DOTALL
        )
        title_text = _collapse_ws(_strip_tags(unescape(title_match.group(1)))) if title_match else ""
        date = _parse_month_year(title_text)
        item_urls = [
            unescape(href)
            for href in re.findall(r"https?://[^\"'<>\s]+\.pdf", item, flags=re.IGNORECASE)
        ]
        if not item_urls:
            continue

        # Prefer static1 links (typically less bot-protected than /s/ links).
        item_urls = sorted(
            set(item_urls),
            key=lambda u: (
                "static1.squarespace.com" not in u.lower(),
                "/s/" in u.lower(),
            ),
        )

        chosen = item_urls[0]
        if chosen in seen_urls:
            continue
        if not date:
            date = _parse_month_year_from_url(chosen)
        if not date:
            continue
        seen_urls.add(chosen)
        refs.append(
            _NewsletterRef(
                label=title_text or date.strftime("%B %Y"),
                source_date=date.strftime("%Y-%m"),
                url=chosen,
            )
        )
    return refs


def _parse_month_year_from_url(url: str) -> datetime | None:
    name = unquote(url.rsplit("/", 1)[-1]).replace("+", " ")
    # Handles filenames like "Wine Club Newsletter February 2026.pdf"
    match = re.search(
        r"\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2}|19\d{2})\b",
        name,
        flags=re.IGNORECASE,
    )
    if not match:
        return None
    month = match.group(1).title()
    year = match.group(2)
    try:
        return datetime.strptime(f"{month} {year}", "%B %Y")
    except ValueError:
        return None


def _select_candidate_pages_for_wine(
    pages: list[tuple[int, str]], wine: dict[str, Any]
) -> list[tuple[int, str]]:
    """Pick pages likely to contain the wine before invoking Gemini."""
    tokens = _tokenize_for_match(f"{wine.get('winery', '')} {wine.get('name', '')}")
    vintage = wine.get("vintage")
    scored: list[tuple[int, int, str]] = []
    for page_num, text in pages:
        lowered = text.lower()
        token_hits = sum(1 for token in tokens if token in lowered)
        score = token_hits
        if vintage and str(vintage) in lowered:
            score += 2
        if score > 0:
            scored.append((score, page_num, text))

    if not scored:
        return pages
    scored.sort(key=lambda row: row[0], reverse=True)
    return [(page_num, text) for _, page_num, text in scored]
