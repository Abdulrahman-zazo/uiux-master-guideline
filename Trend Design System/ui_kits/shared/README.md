# UI-kit shared fixture

`kit-utils.jsx` mirrors the buyer API (see `design-handoff-data.md`) in **shape**:

- `GEO` — a subset of the 98 seeded geo nodes; Damascus goes four levels deep, other cities are leaves. `geoName(path)` / `geoLabel(path)` resolve names.
- `MARKETS` — the 13 real markets, seed order, no images (none exist on the API).
- `CATEGORIES` — the 2 real roots (sweets, fabrics) plus 4 **design-only** roots in the defensible order (clothing → home → gifts → sweets → electronics).
- `STORES` — 2 real + 6 design-only (`fixture: true`), spread across the real markets.
- `PRODUCTS` — 2 real + 10 design-only, `ProductDetailResponseDto` shape: `price` is `{ amountMinor, currency:"SYP", display }`, `variants[]` flat names, `media[]`, `store{}`, `attributes[]`. `imageUrl` is empty — no image host is reachable, so `ProductMedia` renders its placeholder.
- `ME`, `ADDRESSES`, `CART`, `ORDERS` (TS-000123/124/117/131 with their real event logs), `CHECKOUT`, `REASONS`, `PAYMENT_METHODS` (cod only), `PAGES`.
- `COPY` — neutral Arabic (decision R7) first, English second. Cart is **السلة**.
- `useKitShell('ar')` — Arabic-first locale + theme + offline simulation; writes `dir`, `lang`, `data-theme` on `<html>`.

**No client-side money math anywhere.** `M()` exists only to build fixture objects the way the server would.
