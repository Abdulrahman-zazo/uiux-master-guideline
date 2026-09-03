# UI kit — Trend web storefront

The shopper-facing web experience: **home → catalogue → product → bag → checkout → confirmation**, in English and Arabic, light and dark.

## Screens

| File | Screen | Notes |
|---|---|---|
| `home.jsx` | Home | Brand-wash hero, trust strip, category rail, two product rails, deep-wash sale banner, editorial statement, dark footer |
| `catalog.jsx` | Category / PLP | Breadcrumb, result count, sort, 232px filter rail (category, price, size, rating), 12-tile grid, pagination |
| `product.jsx` | Product detail | Thumb-rail gallery, variant pickers, stock, seller card, description / reviews / shipping tabs, review histogram, related rail |
| `checkout.jsx` | Bag · Checkout · Confirmation | Bag with live totals, 3-step checkout (contact / delivery / payment incl. Mada + Tabby), order confirmation with tracking progress |
| `app.jsx` | Router + state | Cart state, toast, EN/AR + theme toggles in the header |

## How to run

Open `index.html`. It loads `../../styles.css`, the compiled `../../_ds_bundle.js`, Lucide from CDN, then the screen files.

## Interactions that work

- Add to bag from the PDP → toast → bag → checkout → confirmation
- Quantity stepper and line removal update the summary and the header bag count
- **ع / EN** in the header flips `dir`, `lang`, copy, currency symbol and numerals
- **Moon / sun** flips `[data-theme]` on `<html>`

## Honest gaps

- **No product photography was supplied.** Every visual is `ProductMedia`'s labelled placeholder. Send real photos and they fill in with no code change.
- Search, filters, sort and pagination are cosmetic — they don't filter the fixture.
- These screens are a brand-accurate recreation built from the brand sheet, fonts and `DESIGN (1).md` mood, **not** a recreation of the TrendSy Figma file (which was unreachable). Layout decisions are ours and need your review.
