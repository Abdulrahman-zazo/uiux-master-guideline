# UI-kit shared helpers

`kit-utils.jsx` is loaded by every kit's `index.html` before its screen files. It provides:

- `CATALOG` — 8-item bilingual product fixture (no `image` field: Trend supplied no photography, so every tile renders `ProductMedia`'s labelled placeholder)
- `COPY` — EN + AR string tables including `dir`, currency symbol and nav labels
- `useKitShell(initial)` — locale + theme state; writes `dir`, `lang` and `data-theme` onto `<html>`
- `KitControls` — the EN/ع + light/dark control pair used in every kit header
- `SAR(n, locale)` — `Intl.NumberFormat` money formatting, Arabic-Indic digits in AR

It is intentionally lowercase-stemmed with no `.d.ts`, so the design-system compiler does not treat it as a component.
