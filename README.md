# Wine Cellar Tracker for Home Assistant

A custom Home Assistant integration for managing your wine collection. Track bottles by location, scan barcodes with your camera, recognize wine labels with AI, rate wines, and visualize your cellar layout with an interactive Lovelace card.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)

## Features

- **Visual Cabinet Layout** — Interactive grid view of your wine cabinets with color-coded bottles by type (red, white, rose, sparkling, dessert)
- **Camera Barcode Scanning** — Point your phone or tablet camera at a wine bottle barcode to auto-lookup details from Vivino and Open Food Facts
- **AI Label Recognition** — Snap a photo of a wine label and let Google Gemini Vision identify the wine automatically (name, winery, vintage, type, region, country, grape variety)
- **Ratings & Tasting Notes** — Rate wines with an interactive half-star widget (0.5-5.0) and record structured tasting notes (aroma, taste, finish, overall impression)
- **Wine Search** — Search Vivino by name to find and add wines without a barcode
- **Drag & Place** — Click any empty slot to place a new bottle, or move existing bottles between positions
- **Bottom Zone Storage** — Dedicated box/case storage area below each cabinet grid
- **Search & Filter** — Filter your collection by wine type, cabinet, or search by name/winery/region
- **Statistics Dashboard** — Total bottles, capacity percentage, and breakdown by type and cabinet
- **Home Assistant Sensors** — Entities for total bottles, capacity, and per-cabinet counts for use in automations
- **Responsive Design** — Optimized layouts for phone, tablet, and desktop

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click the three dots in the top right and select **Custom repositories**
3. Add `https://github.com/BaconWappedBitcoin/ha-wine-cellar` with category **Integration**
4. Click **Install**
5. Restart Home Assistant

### Manual

1. Copy the `custom_components/wine_cellar` folder into your Home Assistant `custom_components` directory
2. Restart Home Assistant

## Setup

1. Go to **Settings > Devices & Services > Add Integration**
2. Search for **Wine Cellar** and follow the setup flow
3. Add the Lovelace card to your dashboard:

```yaml
type: custom:wine-cellar-card
title: Wine Cellar
```

### AI Label Recognition (Optional)

To enable the "Recognize Label" feature:

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Go to **Settings > Devices & Services > Wine Cellar > Configure**
3. Enter your Gemini API key
4. The "Recognize Label" button will appear in the Add Wine dialog

## Default Cabinet Layout

The integration ships with 3 cabinet sections, each with 10 rows and 9 columns (90 slots per section, 270 total), plus a bottom box storage zone. Cabinet dimensions and names can be customized through the WebSocket API.

## Services

| Service | Description |
|---|---|
| `wine_cellar.add_wine` | Add a wine bottle to your collection |
| `wine_cellar.remove_wine` | Remove a wine bottle |
| `wine_cellar.move_wine` | Move a wine to a different cabinet/position |
| `wine_cellar.scan_barcode` | Look up a barcode and fire a result event |

## Sensors

| Entity | Description |
|---|---|
| `sensor.wine_cellar_total_bottles` | Total number of bottles in your cellar |
| `sensor.wine_cellar_capacity` | Percentage of cellar capacity used |
| `sensor.wine_cellar_cabinet_*_count` | Bottle count per cabinet section |

## License

MIT
