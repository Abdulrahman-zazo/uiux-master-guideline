# Trendsy — Design-system rebuild plan

**3 Sep 2026 · draft for approval · derived from `uiux-master-guideline@07b05d0`**
Binding sources, in precedence order: `trendsy-uxui-master-plan.md` v1.1 → `trendsy-visual-direction.md` → `trend-design-system-gap-list.md` → `design-handoff-data.md` (what the API actually returns) → `trendsy-web-flowchart.md`.

The existing "Trend" system was built for a Gulf fashion marketplace in SAR with a feminine voice and Figma-less guesses. The repo turns it into **Trendsy**: an Arabic-first Damascus souq marketplace, SYP, cash on delivery, phone+OTP, one order per store, neutral voice, Latin digits. Tokens and primitives survive; fixtures, copy, several components and both shopper kits do not.

---

## 0. What changes at the foundation (before any page)

### Tokens — deltas from `visual-direction.md §3`
| File | Change |
|---|---|
| `elevation.css` | `--shadow-sm: none`, `--shadow-md: none`, `--shadow-brand: none`. Only `lg` (dropdown) and `xl` (sheet/modal/toast) survive. **Depth = tint steps + hairlines.** |
| `colors.css` | Add `--surface-tinted: var(--purple-50)`, `--border-outline-brand: var(--purple-200)`, `--text-price: var(--text-primary)`, `--text-discount: var(--danger-600)`. |
| `typography.css` | `--weight-display: 500` (600 only for h1/display). `--tracking-display: -0.02em` Latin, `[lang=ar]` → 0. `font-feature-settings: "tnum"` on `--font-numeric`. Add the **mobile tier** under `[data-density="mobile"]`: display 28 · h1 24 · h2 20 · h3 17 · body-lg 16 · body 15 · body-sm 13 · caption 12. Arabic line-heights: body ≥ 1.6, headings ≥ 1.35. |
| `motion.css` | Remove `transform` from `--transition-control`. Hover = background tint only. No lift, no `scale(.97)`. |
| `radii.css`, `spacing.css`, `layout.css`, `dark.css` | Keep. Dark defined, not shipped. |

### Component consequences
- **Button**: no shadow; outline variant = `border --border-outline-brand`, text `--text-brand`. Every primary is paired with an outline/text action.
- **Card**: hairline always, shadow never, no hover lift. **ProductCard**: 16px radius, zero padding, image top, 12px text block.
- **Eyebrow**: `[lang=ar]` drops tracking + uppercase.
- **PriceBlock** → thin wrapper over **Money**; discount `--text-discount`.
- **SectionHeader**: "تصفّح الكل" link = purple text + trailing chevron that mirrors.
- **Icon**: Lucide from cdnjs (unpkg blocked); `direction` mirroring for `chevron-*`, `arrow-*`, `undo-2`, `send`.

### Components — add / fix / remove (gap list §3 + plan §9.5)
**New (P0):** `Money` · `ShopCard` · `TrustStrip` · `GeoSelect` (4 cascading levels from `geo/tree`; Damascus goes 4 deep, every other city 2) · `ErrorState` (problem `title`, retry, copyable `traceId`) · `LoadMore` (cursor footer: loading / inline error+retry / end).
**New (P1):** `OTPField` (6 boxes, 300 s expiry, 60 s resend, attempt counter) · `RadioCard` · `AddressCard` · `OrderCard` · `Timeline` (`OrderEvent[]`, newest first, Damascus time, `note`) · `ReasonPicker` (`order-reasons?kind=` + note) · `RateLimitTimer` (`Retry-After`).
**Fix:** `ProductCard` (Money, store + market line, "صُوِّر في المحل" chip, no heart) · `StatusPill` (13 statuses → tone map, unknown → neutral + raw) · `CartLine` (`available:false` warning slot; swipe + explicit remove) · `OrderSummary` (per-store blocks, delivery-fee row with **absent** state, mandatory "سنتصل بك لتأكيد الطلب") · `Alert` (`offline` tone) · `SearchField` (hide ⌘K < 768; placeholder "ابحث عن منتج، محل، أو سوق") · `FormField` (`errors[].message` by `field`).
**Remove:** `Pagination` (page numbers forbidden) · `SAR()` and every `Intl.NumberFormat` money call · feminine AR copy table · Mada/Tabby/email/Apple/Google fixtures.

### Fixture — `ui_kits/shared/kit-utils.jsx` rebuilt on the real seed (handoff §5)
13 markets (Al-Hamidiyah, Midhat Pasha, Al-Bzouriyah, Al-Hamra, Malki Mall, Sham City Center, Damascino, Qasioun Mall, Uptown, Al-Shaalan, Al-Salihiyah, Al-Hariqa, Al-Asrouniyah) · 2 stores (بيت الشام للحلويات, أنوال دمشق) · 2 published products (بقلاوة مشكلة 85,000.00 · قماش بروكار دمشقي 120,000.00) — **plus ~10 clearly-marked design fixtures** so grids aren't two tiles wide · 4 orders TS-000123/124/117/131 with their real event logs · 1 address (المنزل, الشعلان) · 1 payment method (`cod`) · 9 status reasons · 4 static pages · geo tree subset (دمشق → دمشق القديمة → الحميدية …). Money always `{ amountMinor, currency:"SYP", display }`; digits Latin.

---

## 1. Web storefront — 19 routes (`ui_kits/storefront/`, rebuild)

Header (RTL, one across all public pages): logo (right) · **search bar, dominant, ≥560px** · market selector · cart with count · account (left). Categories chip row under it. Footer: static pages, contact, exchange promise. Breakpoints 360 / 768 / 1024 / 1280, content 1200.

| # | Route | Screen | Primary action | Must-have content (order) | Components | States to draw |
|---|---|---|---|---|---|---|
| W1 | `/` | Home | Search | Search hero (wash allowed here only) → banner slots carousel ≤3 (16:9, `home_hero`) → category tiles 6-up (Lucide glyph on `surface-tinted` circle; order: clothing → home → gifts/perfume → sweets → electronics) → "أسواق دمشق" row (13, **no images exist** → name + kind + neighbourhood tile) → "وصل حديثاً" grid 4-up + `LoadMore` | `SearchField` `Tag` `ProductCard` `SectionHeader` `LoadMore` | skeleton text-first · slot empty → section collapses · offline banner |
| W2 | `/search` | Results | Refine | Query echo · sort chip (`-createdAt`, price ↑↓) · filter chip → sheet (market, price band) · 4-up grid · `LoadMore` | `Tag` `Modal sheet` `ProductCard` `LoadMore` `EmptyState` | empty "لا توجد نتائج في هذا السوق — جرّب سوقاً آخر" (clears market filter) · end-of-list · load-more error inline |
| W3 | `/c/<slug>` | Category | Browse | Breadcrumb `الرئيسية › الفئة › الفرعية` · left rail filters (desktop) / sheet (mobile) · sub-category chips · grid · `LoadMore` | as W2 + `Breadcrumb` | same as W2 |
| W4 | `/m/<slug>` | Market | Open shop | Name · kind · neighbourhood (resolved via geo tree) · shops grid (`ShopCard`) · "منتجات من هذا السوق" grid. **No hero photo/description — API has none; design the block collapsed.** | `ShopCard` `ProductCard` `LoadMore` | 404 market |
| W5 | `/s/<slug>` | Shop | Add to cart | `ShopCard` (name · market · location · founding-partner badge · rating placeholder "لا تقييمات بعد") · description · product grid | `ShopCard` `Badge` `ProductCard` | `store_inactive` banner (products shown, not addable) · no-description · 404 |
| W6 | `/p/<slug>` | **PDP** | **أضف إلى السلة** | Two-column: gallery **right** 5/12 (4:5, "صُوِّر في المحل" chip, dots) · buy box left 7/12 sticky: price Plex 600 tabular via `Money` → name Madani 500 → variant list (flat names, out-of-stock disabled with label) → `ShopCard` (tinted) → delivery-estimate slot (**absent state: collapses**) → `TrustStrip` → qty + primary. Below: description · attributes table · "من نفس المحل" row | `ProductMedia` `Money` `OptionPicker` `ShopCard` `TrustStrip` `QuantityStepper` `Button` | variant OOS · `store_inactive` · 404 · skeleton (blurred thumb) |
| W7 | `/cart` | Cart | **إتمام الطلب** | Grouped by store with store header · line: thumb, name, variant, stepper, `Money` line total, remove · `available:false` inline warning · per-store subtotal · "رسوم التوصيل تُحسب في الخطوة التالية" · sticky summary (desktop) | `CartLine` `OrderSummary` `Alert` | empty → `EmptyState` + "تصفّح الأسواق" · guest tap → `/login` with return-to · offline: readable, edits blocked |
| W8 | `/login` | Phone + OTP | أرسل الرمز / تحقّق | One centred card, two steps: (1) +963 prefilled, Syrian mask, *why* copy (delivery + confirmation call); (2) `OTPField`, 300 s expiry, resend 60 s, attempt counter. Social slots **hidden**, not ghosted | `Input` `OTPField` `RateLimitTimer` `Alert` | `otp_cooldown` countdown on button · `otp_invalid` · `otp_expired` · `otp_attempts_exceeded` · `isNewUser` → name step |
| W9 | `/checkout` | Address → payment → review | **تأكيد الطلب** | One page, three collapsible linear steps, summary sticky. (1) address book `RadioCard`s or **address sheet** = `GeoSelect` + landmark ≤500 + phone + optional pin. (2) COD `RadioCard` pre-selected; others hidden by flag. (3) per-store blocks (items, subtotal), delivery-fee row **absent until response**, grand total, address summary, **"سنتصل بك لتأكيد الطلب قبل التجهيز"** in tinted panel, exchange promise. Primary locks → "جارٍ إنشاء الطلب…" + outline "العودة إلى السلة" | `RadioCard` `GeoSelect` `FormField` `OrderSummary` `TrustStrip` `Button` | `address_invalid` field errors · `empty_cart` · `price_changed` dialog · `idempotency.in_progress` keeps waiting |
| W10 | `/checkout/success` | Orders created | تتبّع الطلبات | **One `OrderCard` per order** (number, store, items count, `Money` total, `placed` pill) · shared line "سنتصل بك خلال ساعات العمل لتأكيد الطلب" · secondary "متابعة التسوق". Print-friendly | `OrderCard` `StatusPill` `TrustStrip` | — |
| W11 | `/orders` | My orders | Open order | Segmented جارية / مكتملة · desktop table, mobile cards · "آخر تحديث" stamp | `Tabs` `OrderCard` `DataTable` `StatusPill` | empty "لا طلبات بعد" · guest prompt |
| W12 | `/orders/<id>` | Order detail | Track / cancel | Header (number, store, pill) · **`Timeline` right (RTL)**: events newest-first, "بانتظار مكالمة التأكيد" explicit, purple dot latest · summary left: items snapshot (frozen `Money`), address snapshot, totals · actions by status: إلغاء (placed/confirmed/accepted → `ReasonPicker` sheet → confirm dialog), إعادة الطلب (delivered/completed) · polls 15 s | `Timeline` `StatusPill` `CartLine readOnly` `ReasonPicker` `Modal danger` | `invalid_transition` inline · `ErrorState` with traceId |
| W13 | `/account` | Account | — | Sidebar nav (desktop) · profile row (masked phone, `customerNumber` — **no name field exists**) · العناوين · اللغة · أجهزتك · pages · تسجيل الخروج · **حذف الحساب** (destructive, bottom) | `SidebarNav` `Avatar` `Button danger` | guest prompt |
| W14 | `/account/addresses` | Address book | Add | `AddressCard` list, default marker, edit/delete, add via address sheet | `AddressCard` `GeoSelect` | empty |
| W15 | `/account/sessions` | Devices | Sign out everywhere | **Single action** "تسجيل الخروج من كل الأجهزة" + confirm. No device list | `Button` `Modal` | — |
| W16 | `/pages/<slug>` | Static | — | Readable column, TOC desktop; 4 slugs: about, return-policy, terms, contact | — | 404 |
| W17 | `/q/<code>` | QR landing | — | Redirect; interstitial only if slow: "جارٍ فتح صفحة المحل…" | `Skeleton` | — |
| W18 | 404 / error / offline | System | Retry | `ErrorState` (title, retry, traceId) · offline `Alert` banner global, non-blocking · 429 `RateLimitTimer` | `ErrorState` `Alert offline` `RateLimitTimer` | — |
| W19 | `/join` | Landing | — | **Deferred** — content not written. Current `marketing_auth` kit parked, not deleted | — | — |

Web sheets/dialogs (8): Filter · Address form · Reason picker · Price-change dialog · Confirm dialog · Language · Delete account · Toast.

---

## 2. Mobile app — 24 screens + 7 sheets (`ui_kits/mobile_app/`, rebuild)

Device **390×844**, verified at 360×780. Bottom nav, 5 tabs, RTL order right→left: **الرئيسية · الأسواق · السلة (badge) · طلباتي · حسابي**. Search is in every header, not a tab. Guest: tabs 1–3 usable; 4–5 show a friendly sign-in prompt. Type uses the mobile tier (`data-density="mobile"`); body 15 sp min.

### A. Entry & auth
| # | Screen | Primary | Content | States |
|---|---|---|---|---|
| A1 | Splash | — | Logo, ≤800 ms | offline-at-boot → cached home |
| A2 | Onboarding (3 cards, skippable) | ابدأ التسوق | "أسواق دمشق في جيبك" · "صور حقيقية من داخل المحل" · "ادفع عند الاستلام". No sign-in ask | first-run only |
| A3 | Phone entry | أرسل الرمز | +963 prefilled, mask, why-copy | `otp_cooldown` countdown |
| A4 | OTP verify | تحقّق | `OTPField` 6 boxes, 300 s, resend 60 s, attempts after 3rd fail | invalid · expired · exceeded |
| A5 | Welcome / name | متابعة | one optional field | never blocks |

### B. Discovery
| # | Screen | Primary | Content (top→bottom) | States |
|---|---|---|---|---|
| B1 | Home | Search | flat canvas · logo · pill search · hairline · slots ≤3 16:9 · category glyph circles · markets row · "وصل حديثاً" 2-up + infinite scroll | skeleton text-first · offline cached · empty slot collapses |
| B2 | Search overlay | Submit | recents · suggested categories · live results ≥2 chars (Slice 2; MVP → category browse with `q`) | — |
| B3 | Results / category | — | 2-up grid · sort chip · filter chip → **Filter sheet** · sub-category chips | empty (clears market) · end · load-more error |
| B4 | Markets | Open | 13 rows: name, kind, neighbourhood (no photo, no count — API) | — |
| B5 | Market page | Open shop | name · neighbourhood · shops · products | 404 |
| B6 | Shop page | Add | `ShopCard` · products · **no phone/WhatsApp (R4)** | `store_inactive` banner |
| B7 | **PDP** | **أضف إلى السلة** | gallery 4:5 edge-to-edge + shop-shot chip + dots → `Money` price Plex 600 → name Madani 500 → hairline → variants → `ShopCard` tinted → hairline → delivery slot (absent) → `TrustStrip` → description → attributes → "من نفس المحل". **Sticky bottom bar: canvas bg, top hairline, stepper + filled pill** | variant OOS disabled w/ label · 404 · `store_inactive` |

### C. Cart & checkout
| # | Screen | Primary | Content | States |
|---|---|---|---|---|
| C1 | Cart | إتمام الطلب | grouped by store · line w/ swipe + explicit remove · `available:false` inline · per-store subtotal · fee note | empty · guest → A3 · offline read-only |
| C2 | Checkout — address | متابعة | `RadioCard` address book or **Address sheet** (`GeoSelect` 4 levels · landmark · phone · pin) | `address_invalid` |
| C3 | Checkout — payment | متابعة | COD `RadioCard` pre-selected ("الدفع نقداً عند الاستلام") · others flag-hidden | — |
| C4 | Checkout — review | **تأكيد الطلب** | per-store blocks · delivery fee (absent state) · grand total · address · **"سنتصل بك لتأكيد الطلب قبل التجهيز"** · exchange promise · locks on tap | `price_changed` dialog · `in_progress` |
| C5 | Orders created | تتبّع الطلبات | one `OrderCard` per order · "سنتصل بك خلال ساعات العمل" · متابعة التسوق · **notification permission asked here** | — |

### D. Orders
| # | Screen | Primary | Content | States |
|---|---|---|---|---|
| D1 | My orders | Open | segmented جارية/مكتملة · `OrderCard` (number, store, Damascus date, pill, total, thumb) · pull-to-refresh "آخر تحديث" | empty · guest |
| D2 | Order detail | Cancel / reorder | header · `Timeline` newest-first w/ confirmation-call step · items snapshot · address · totals · actions by status · 15 s poll | `cancel_window_closed` inline · traceId on error |

### E. Account
| # | Screen | Content |
|---|---|---|
| E1 | Account | profile row (masked phone, `customerNumber`) · العناوين · اللغة · أجهزتك · pages · logout · حذف الحساب |
| E2 | Address book | list, default, add/edit sheet, delete confirm |
| E3 | Language | ar/en radio, applies immediately (RTL flip) |
| E4 | Sessions | single "تسجيل الخروج من كل الأجهزة" + confirm — **no list** |
| E5 | Static page | readable column |
| E6 | Delete account | consequences · one confirm · privacy link |

### F. System & sheets
404 (product/shop/market) · generic `ErrorState` · offline banner · 429 timer · Filter sheet · Variant sheet (Slice 2, skip) · Address form sheet · Reason picker sheet · Price-change dialog · Confirm dialog · Toast.

Every screen carries the **13-state matrix** where applicable: loading, empty, error, offline, stale/retry, partial, success, processing, 403, 404, 429, unknown-enum, first-run. In the kit I'll draw the states that change layout (loading, empty, error, offline, processing); the rest are copy variants.

---

## 3. Other kits
| Kit | Action |
|---|---|
| `marketing_auth/` | **Defer.** `/join` has no content. Auth moves into storefront W8. Keep folder, mark deferred in its README, remove from Design System tab. |
| `seller_dashboard/`, `admin_panel/` | **Park** as Console shell reference. Untouched until merchant interviews. Cards stay, README notes "out of MVP". |

## 4. Docs
- `readme.md`: rewrite product paragraph (Syrian souq, SYP, neutral voice), money + numerals rule (Latin tabular, `display` verbatim), imagery ratio 4:5, icon note (Lucide adopted), voice (R7 neutral, not feminine).
- `SKILL.md`: point to master plan v1.1 as binding.
- Delete `uploads/DESIGN.md` (shadcn; never applied).

## 5. Order of work (gap list §6, adjusted)
1. Tokens (½ day) — deltas above + mobile tier.
2. Shared fixture + copy (1 day) — real seed, neutral AR, EN second.
3. `Money`, `StatusPill`, `LoadMore`, remove `Pagination` (1 day).
4. `GeoSelect`, `OTPField`, `ErrorState` (2 days).
5. `ShopCard`, `TrustStrip`, `Timeline`, `OrderCard`, `AddressCard`, `RadioCard`, `ReasonPicker`, `RateLimitTimer` (2 days).
6. Kits: **mobile B7 PDP → C1–C5 → B1 → B3 → D1–D2 → A → E → F**, then web W6 → W7–W10 → W1 → W2–W5 → W11–W18. PDP first (most trust decisions), checkout second (decides the MVP metric).

## 6. Decisions I need from you before step 1
1. **Fixture padding.** The API has 2 products, 2 stores, 4 orders. Grids at 2 tiles look broken. May I add ~10 design-only products/stores, clearly flagged `fixture: true`, spread across the 13 real markets? (Alternative: honest 2-tile screens.)
2. **Market tiles without photos.** The API has no market image or description. Plan §7 B1 says "real photos" — none exist. Proposal: name + kind glyph (souk/mall/street) + neighbourhood, on `surface-tinted`. Confirm.
3. **Currency symbol placement.** `display` is digits only; `ل.س` (ar) / `SYP` (en) comes from `currencies`. Proposal: trailing, 62% size, bidi-isolated — matches today's `PriceBlock`. Confirm.
4. **Cart `available:false` only.** `price_changed` / `store_inactive` warnings don't exist on the wire (DOC≠CODE). Draw only the unavailable state, or draw all three as future-ready?
5. **Do the kits stay bilingual?** Plan says Arabic is the language, English verified after. I'll keep the ع/EN toggle but design AR-first (default `dir=rtl`). Confirm.
6. **Dark theme toggle** in kits — keep (tokens defined) or hide (not shipped)?
