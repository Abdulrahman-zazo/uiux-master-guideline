# UI kit — Trendsy web storefront

The 19 web routes from `trendsy-uxui-master-plan.md` §8, Arabic-first (`dir="rtl"`), content column 1200px, header bar 1440px. A route jumper sits bottom-corner for review; the header, category row and footer are the real chrome.

| File | Routes |
|---|---|
| `chrome.jsx` | `SiteHeader` (dark bar: logo · dominant search · cart · account/sign-in) · `CategoryRow` · `SiteFooter` (pages + promise) · `WSection` |
| `discovery.jsx` | `/` Home (search hero on the wash, 6-up category glyph tiles, 5 featured markets, 4-up new arrivals + `LoadMore`) · `/search` + `/c/<slug>` (left-rail filters, sub-category chips, no page numbers) · `/m` markets index · `/m/<slug>` · `/s/<slug>` · `/p/<slug>` PDP (gallery 5/12, sticky buy box 7/12) |
| `checkout.jsx` | `/cart` (grouped by store, sticky summary, fee absent) · `/login` (phone → OTP card) · `/checkout` (3 collapsible steps, summary sticky, fee appears at review, mandatory call line, primary locks) · `/checkout/success` (one `OrderCard` per order, print-friendly) |
| `account.jsx` | `/orders` (table) · `/orders/<id>` (timeline start-side, snapshot end-side, cancel → reason picker) · `/account/*` shell with sidebar: addresses, language, sessions (single sign-out-everywhere) · `/pages/<slug>` · 404 / error / 429 |
| `app.jsx` | Router, cart state, guest toggle, offline banner |

`/q/<code>` is a redirect with no UI beyond a spinner; `/join` is deferred (content unwritten).

## Honest gaps
- No image host is reachable; every visual is `ProductMedia`'s labelled frame.
- 10 products / 6 stores / 4 category roots are design-only (`fixture: true`).
- Search, sort and filter are cosmetic against the fixture except the market filter.
- Layout is ours: the Figma file was never readable, and the plan asks Ahmet whether existing code for `/`, `/c`, `/p`, `/cart`, `/login` should be matched or replaced.
