> **PARKED — Out of MVP scope. Kept as shell reference for the merchant Console; redesign after merchant interviews.** (trend-design-system-gap-list.md §4)

# UI kit — Trend seller dashboard

The vendor-facing surface: a light 264px rail beside a 64px top bar. Four screens are built; every other nav item resolves to an honest "not built" empty state rather than an invented screen.

## Screens

| File | Contents |
|---|---|
| `shell.jsx` | `DashTopBar` (title, ⌘K search, notifications, locale + theme, store avatar) · `SellerSidebar` (sectioned nav with counts, store switcher footer) |
| `pages.jsx` | `SellerOverview` (low-stock alert, 4 stat tiles, token-only bar chart, top-sellers list, recent-orders table) · `SellerOrders` (status tabs with counts, export actions, full table, pagination) · `SellerCatalog` (state filters, product table with stock colouring and inline ratings) · `SellerEditor` (bilingual name fields, media grid with an upload slot, variant pickers, price/stock panel, live card preview) |
| `app.jsx` | Router + not-built empty state |

## Notes

- The bar chart is built from divs and `--purple-200 / --purple-700` — no charting library, so it inherits the theme and RTL for free.
- The product editor makes the bilingual requirement structural: **two name fields, always**.
- Stock numbers colour-code through the proposed functional hues (0 = danger, <10 = warning).

## Honest gaps

- Promotions, Insights, Payouts and Settings are deliberately unbuilt.
- The dashboard uses `TopNav tone="light"` logic (a light bar), not the storefront's near-black bar, so the rail and bar don't compete. Flag if you'd rather keep the dark bar everywhere.
