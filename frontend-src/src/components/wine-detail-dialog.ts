import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Wine, WINE_TYPE_LABELS, WINE_TYPE_COLORS, WineType } from "../models";
import { sharedStyles } from "../styles";

@customElement("wine-detail-dialog")
export class WineDetailDialog extends LitElement {
  @property({ attribute: false }) wine: Wine | null = null;
  @property({ type: Boolean }) open = false;

  static styles = [
    sharedStyles,
    css`
      .wine-header {
        display: flex;
        gap: 16px;
        padding: 20px;
      }

      .wine-image {
        width: 80px;
        height: 120px;
        border-radius: 8px;
        object-fit: cover;
        background: #f0f0f0;
        flex-shrink: 0;
      }

      .wine-image-placeholder {
        width: 80px;
        height: 120px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        flex-shrink: 0;
        color: #fff;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }

      .wine-title {
        flex: 1;
        min-width: 0;
      }

      .wine-name {
        font-size: 1.2em;
        font-weight: 600;
        color: var(--wc-text);
        margin-bottom: 4px;
      }

      .wine-winery {
        font-size: 0.9em;
        color: var(--wc-text-secondary);
        margin-bottom: 8px;
      }

      .wine-type-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 0.75em;
        font-weight: 600;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .wine-rating {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
        font-size: 0.9em;
      }

      .rating-star {
        color: #f5a623;
      }

      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 0 20px 16px;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
      }

      .detail-label {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }

      .detail-value {
        font-size: 0.95em;
        color: var(--wc-text);
        font-weight: 500;
      }

      .wine-notes {
        padding: 0 20px 16px;
      }

      .wine-notes-text {
        font-size: 0.9em;
        color: var(--wc-text-secondary);
        font-style: italic;
        background: rgba(0, 0, 0, 0.03);
        padding: 10px;
        border-radius: 8px;
      }

      .actions {
        display: flex;
        gap: 8px;
        padding: 12px 20px 20px;
        border-top: 1px solid var(--wc-border);
      }
    `,
  ];

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("close"));
  }

  private _onRemove() {
    if (this.wine) {
      this.dispatchEvent(
        new CustomEvent("remove-wine", {
          detail: { wine_id: this.wine.id },
          bubbles: true,
          composed: true,
        })
      );
      this._close();
    }
  }

  private _onMove() {
    if (this.wine) {
      this.dispatchEvent(
        new CustomEvent("move-wine", {
          detail: { wine: this.wine },
          bubbles: true,
          composed: true,
        })
      );
      this._close();
    }
  }

  render() {
    if (!this.open || !this.wine) return nothing;

    const wine = this.wine;
    const typeColor =
      WINE_TYPE_COLORS[wine.type as WineType] || WINE_TYPE_COLORS.red;
    const typeLabel =
      WINE_TYPE_LABELS[wine.type as WineType] || wine.type;

    return html`
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" @click=${(e: Event) => e.stopPropagation()}>
          <div class="wine-header">
            ${wine.image_url
              ? html`<img class="wine-image" src="${wine.image_url}" alt="${wine.name}" />`
              : html`
                  <div
                    class="wine-image-placeholder"
                    style="background: ${typeColor}"
                  >
                    🍷
                  </div>
                `}
            <div class="wine-title">
              <div class="wine-name">${wine.name}</div>
              <div class="wine-winery">${wine.winery}</div>
              <span
                class="wine-type-badge"
                style="background: ${typeColor}"
              >
                ${typeLabel}
              </span>
              ${wine.rating
                ? html`
                    <div class="wine-rating">
                      <span class="rating-star">★</span>
                      ${wine.rating.toFixed(1)}
                    </div>
                  `
                : nothing}
            </div>
          </div>

          <div class="details-grid">
            ${wine.vintage
              ? html`
                  <div class="detail-item">
                    <span class="detail-label">Vintage</span>
                    <span class="detail-value">${wine.vintage}</span>
                  </div>
                `
              : nothing}
            ${wine.region
              ? html`
                  <div class="detail-item">
                    <span class="detail-label">Region</span>
                    <span class="detail-value">${wine.region}</span>
                  </div>
                `
              : nothing}
            ${wine.country
              ? html`
                  <div class="detail-item">
                    <span class="detail-label">Country</span>
                    <span class="detail-value">${wine.country}</span>
                  </div>
                `
              : nothing}
            ${wine.grape_variety
              ? html`
                  <div class="detail-item">
                    <span class="detail-label">Grape</span>
                    <span class="detail-value">${wine.grape_variety}</span>
                  </div>
                `
              : nothing}
            ${wine.price
              ? html`
                  <div class="detail-item">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">$${wine.price.toFixed(2)}</span>
                  </div>
                `
              : nothing}
            ${wine.purchase_date
              ? html`
                  <div class="detail-item">
                    <span class="detail-label">Purchased</span>
                    <span class="detail-value">${wine.purchase_date}</span>
                  </div>
                `
              : nothing}
            ${wine.drink_by
              ? html`
                  <div class="detail-item">
                    <span class="detail-label">Drink By</span>
                    <span class="detail-value">${wine.drink_by}</span>
                  </div>
                `
              : nothing}
            ${wine.barcode
              ? html`
                  <div class="detail-item">
                    <span class="detail-label">Barcode</span>
                    <span class="detail-value">${wine.barcode}</span>
                  </div>
                `
              : nothing}
          </div>

          ${wine.notes
            ? html`
                <div class="wine-notes">
                  <div class="detail-label" style="margin-bottom: 4px">
                    Notes
                  </div>
                  <div class="wine-notes-text">${wine.notes}</div>
                </div>
              `
            : nothing}

          <div class="actions">
            <button class="btn btn-outline" @click=${this._onMove}>
              ↔ Move
            </button>
            <button
              class="btn btn-outline"
              style="color: #c62828; border-color: #c62828"
              @click=${this._onRemove}
            >
              ✕ Remove
            </button>
            <span style="flex:1"></span>
            <button class="btn btn-primary" @click=${this._close}>
              Close
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
