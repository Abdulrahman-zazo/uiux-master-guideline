# UI kit — Trendsy buyer mobile app

Screens A–F from `trendsy-uxui-master-plan.md` §7, in 390×844 device shells with `data-density="mobile"` (the mobile type tier). Arabic-first: default `dir="rtl"`, `lang="ar"`. Sixteen devices are staged; every device is an independent, fully navigable instance.

| File | Screens |
|---|---|
| `phone.jsx` | `Phone` shell (neutral status row, offline banner), `AppBar`, `MSection` (heading + chevron link) |
| `discovery.jsx` | B1 Home (search hero, home_hero slot, category glyph circles, featured markets, new arrivals) · `MarketTile` · B3 Results + **filter sheet** · B4 Markets · B5 Market page · B6 Shop page (`store_inactive` variant) · **B7 PDP** |
| `cart-checkout.jsx` | C1 Cart (grouped by store, fee note, guest → A3) · **Address sheet** (`GeoSelect` + landmark + phone) · C2–C4 Checkout (address radio cards → COD → per-store review with mandatory call line; primary locks to "جارٍ إنشاء الطلب…") · C5 Orders created (one `OrderCard` per order) |
| `orders-account.jsx` | D1 My orders (جارية / مكتملة, "آخر تحديث") · D2 Order detail (`Timeline` newest-first with pending-call step, snapshot, cancel via **Reason picker sheet** → danger confirm) · E1 Account (masked phone + customerNumber; **no name field exists**) · E2 Address book · E3 Language · E5 Static page · F Error / 404 / 429 |
| `auth.jsx` | A2 Onboarding · A3 Phone entry (cooldown variant) · A4 OTP verify (`otp_invalid` variant, expiry + resend timers) · A5 Welcome/name |
| `app.jsx` | `DeviceApp` router + per-device cart; stage of 16 devices |

## Rules enforced here
- Every price is a server `Money` object rendered by `<Money>`; Latin tabular digits.
- One checkout → one order per store; C5 lists **two** orders.
- Tracking is an event log, not a progress bar.
- COD only; ShamCash/Paymera hidden by flag, not ghosted. Social sign-in likewise.
- No wishlist, no ratings (placeholder), no store phone/WhatsApp, no page numbers.
- Offline (wifi toggle in the page header): banner appears, cart is readable, edits and add-to-cart are blocked.

## Honest gaps
- No image host is reachable: every product/market visual is `ProductMedia`'s labelled frame.
- The API seeds 2 products / 2 stores; 10 products, 6 stores and 4 category roots are **design-only** (`fixture: true` in `shared/kit-utils.jsx`).
- Search overlay (B2) is folded into B3; live suggestions are Slice 2.
- Device shell has no OS chrome.
