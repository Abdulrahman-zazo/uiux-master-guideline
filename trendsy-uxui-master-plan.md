# Trendsy — UX/UI Master Plan

**Version 1.1 · 2 Sep 2026 · Owner: Design (Lena Kallas) · Status: for approval by Ahmet**
Inputs: Survey synthesis (`design/ux-research-synthesis.md`) · Web flowchart (adopted MVP) · Backend brief 2026-08-20 (Ahmed, CTO) · ROADMAP.md (web) · Project overview & 5-year roadmap · Brand logo (Figma) · **Trend Design System (`Trend Design System/`) — visual source of truth.**

> **Changes in 1.1.** §9 rewritten to match the Trend Design System (radii, fonts, weights, shadows, motion, icons) where it is right, and to override it where the backend contract or Arabic rules win (digits, money, discount colour, voice). Screens that depended on data the backend does not provide were fixed: video slot removed, shop contact removed, sessions list reduced, offline cart edits removed, discount marked Slice 2, delivery estimate given an "absent" state. Decisions 2, 3 (radii), and category art resolved — see §13.
Scope of this pass: **MVP flowchart screens only**, mobile app first, then web. Console and Delivery app are out of scope but every decision below is made so they can inherit the system without redesign.

---

## 1. What we are designing, in one paragraph

A buyer walks into a digital version of Al-Hamidiyeh. She searches for "قميص قطني", sees a real photo taken inside a named shop with a final price in SYP, adds it to a cart that survives a network drop, gives her phone number only when she's ready to pay cash on delivery, is told plainly that someone will call her, and then watches a timeline of real events until the courier arrives the same day. The merchant is a traditional seller with no digital habits; the network is 2–8 Mbps with power cuts; there is no street addressing; and trust in online buying is low. Every screen exists to move one order through that cycle without a human touching the database.

## 2. Hard constraints the UI must obey (from the backend contract and roadmap)

These are not design opinions. Screens that violate them will be rejected in review.

| Constraint | UI consequence |
|---|---|
| **One checkout → one order per store** | Confirmation screen is a *list* of orders grouped by shop. Cart is grouped by shop. "طلباتي" shows one card per order, not per checkout. |
| **Tracking is `OrderEvent[]`, append-only** | Order detail is an event timeline with timestamps, never a 4-step progress bar reconstructed from status. |
| **`confirmed` = confirmed by phone call** | Checkout review carries a mandatory line: *"سنتصل بك لتأكيد الطلب"*. The timeline shows a "بانتظار مكالمة التأكيد" step explicitly. |
| **Money is `{amountMinor, currency, display}`; render `display` verbatim** | The Money component is a text primitive with no formatting logic. Digits are Latin in both locales (backend decision) — see §8.4. |
| **Cursor pagination only, no totals** | No page numbers, no "1,240 results". Infinite scroll on mobile, "تحميل المزيد" on web. Empty/end states designed explicitly. |
| **`cart.item_unavailable / store_inactive / price_changed` arrive as warnings on 200** | Inline warning on the line item (or on the shop group), user continues. A "تغيّر السعر" sheet only at checkout. |
| **Address = 4 geo nodes + landmark description** | Cascading selects (governorate → city → area → neighbourhood), then a required free-text landmark, optional map pin. No "city" text field. |
| **Idempotency: one key per attempt, no optimistic UI on transitions** | Primary buttons enter a locked "processing" state; the screen re-renders from the response. Retry keeps the same key — the UI shows "جارٍ إعادة المحاولة" not a fresh form. |
| **No push in Slice 1, no realtime** | Orders screen has pull-to-refresh; order detail polls every 15 s with a subtle "آخر تحديث" stamp. Notification permission is asked after the first order, never at launch. |
| **OTP only; Google/Apple may never ship** | Auth screens are designed with the social slots hidden by a feature flag. Not drawn as ghost buttons in MVP. |
| **Status labels come from the i18n endpoint; unknown values render neutrally** | Badge component takes a raw string + a tone map; unmapped statuses fall back to neutral grey with the raw label. |
| **Account deletion in build #1** | Settings includes "حذف الحساب" with a confirmation dialog and a privacy-policy link. |
| **Images: `thumb/sm/md/lg`, cache forever, blurred thumb while loading** | Every image container has a fixed aspect ratio; skeleton = blurred thumb, not a spinner. |
| **13 seeded Damascus markets, Store ≠ Merchant** | Shop card names the *store* and its *market*; "merchant" is never shown to buyers. |

## 3. Design principles for Trendsy (ranked — when two conflict, the higher wins)

1. **Trust before beauty.** Every screen must answer "is this real?" before "is this nice?". Real shop photos, final prices, the shop's name and location, the exchange promise. Nothing decorative goes above a trust element.
2. **One primary action per screen.** Home → search. PDP → add to cart. Cart → checkout. Checkout → confirm. Order → track. If a second button competes at the same weight, the screen is wrong.
3. **The network is hostile.** Design the loading, offline, stale and retry states *first*, the happy path second. Text appears before images; images appear blurred before sharp; nothing blocks scrolling.
4. **Arabic is the language, not a translation.** RTL layout, Arabic typography metrics, Arabic copy written by a native speaker, digits and mixed-direction strings isolated. English is verified after, never designed first.
5. **Search first, souq second.** The souq is the trust layer and the brand, not the navigation model (survey: 11/11 search, 1/11 spatial browsing).
6. **Zero surprises at checkout.** Price, delivery fee, delivery window and the confirmation call are all visible before the confirm button — nothing appears after.
7. **Calm feedback.** No modals for information. Modals only for irreversible actions (cancel order, delete account). Warnings are inline; connectivity is a banner; success is a toast or a screen, never an alert.
8. **Designed for 2030, drawn for 2026.** Tokens are semantic (not "purple-600" but "action.primary"), layouts are content-agnostic, and nothing is hard-wired to Damascus, SYP or a single currency — but no Year-2 feature is drawn in the MVP files.

## 4. Users & jobs (summary — full detail in the research synthesis)

- **P1 Rami (comparison shopper, 25–34):** find fast, see real photo and final price, COD.
- **P2 Hala (browser-turned-buyer, 18–24):** weak network in the evening, collect items without losing them, buy without a long form, exchange easily.
- **P3 Abu Samer (cautious buyer, 45+):** know which shop, be called by a human, pay cash, get it today.
- **M1 Merchant (no data yet):** blocks Console; interviews scheduled before Console design.

The MVP's success metric is 500 completed orders, ≥ 85 % delivered, ≤ 15 % cancelled. Design levers on those numbers: checkout clarity (fewer cancellations from surprise), address quality (fewer failed deliveries), confirmation-call expectation (fewer "why are you calling me" refusals).

## 5. Information architecture

### 5.1 Mobile app (Flutter) — bottom navigation, 5 tabs

| Tab (RTL order, right → left) | Label | Why it earns a tab |
|---|---|---|
| 1 | الرئيسية | Search + slots + defensible categories. The screen 9/11 said matters most. |
| 2 | الأسواق | Markets → shops → products. The trust/brand layer; secondary discovery; the only place the souq metaphor is spatial. |
| 3 | السلة | Always one tap away; badge with item count; survives offline. |
| 4 | طلباتي | The post-purchase anxiety screen. A tab because Slice 1 has no push — the user must be able to *check*. |
| 5 | حسابي | Profile, addresses, language, sessions, delete account, static pages. |

Search is **not** a tab: it lives in the home header and is reachable from every tab's header. Rationale: a search tab and a home search bar split the same intent; the survey says search is the front door, so it belongs on the front screen.

Guest mode: tabs 1–3 fully usable; tabs 4–5 show a friendly sign-in prompt (not a wall).

### 5.2 Web (Next.js) — 19 routes, one header

Header (RTL): logo (right) · search bar (center, dominant) · market selector · cart · account (left). Categories row under the header on public pages. Footer carries static pages, contact, the exchange/returns promise.

Web is the discovery surface (SEO: markets, shops, categories, products are SSR/ISR). Authenticated pages are CSR. The layout must therefore work with skeletons for everything behind auth.

### 5.3 Category & market model in the UI

Product lives in one leaf category; the UI shows breadcrumbs `الرئيسية › الفئة › الفئة الفرعية` on web and a back-titled app bar on mobile. Market filter is a chip in results, not a separate tree. Category order on home follows defensibility (clothing → home → gifts/perfume → sweets → electronics), overridable by the admin slots later.

## 6. RTL & Arabic rules (binding for Figma and code)

- Layout mirrors: navigation order, back chevrons, progress direction, list leading/trailing, sliders, carousels swipe direction, drawer side.
- Does **not** mirror: media playback icons, clocks, phone handset, checkmarks, brand logo, numbers, maps, the ✕ close icon.
- Icon set must ship `-rtl` variants for: back/forward, send, reply, list indent, "next" arrows. Figma: one component with a `direction` property.
- Bidi isolation on every mixed string: prices, phone numbers, order numbers, SKUs, English brand names inside Arabic sentences.
- Line-height for Arabic body ≥ 1.6; headings ≥ 1.35. Arabic glyphs sit lower and need looser leading than Latin at the same size.
- Minimum Arabic body size 15 sp mobile / 16 px web (Arabic at 14 is harder to read than Latin at 14).
- Never letter-space Arabic. Never all-caps (n/a) — but don't rely on weight alone for hierarchy either; use size + colour.
- Digits: Latin (0–9) everywhere, matching backend `display`. Revisit only if usability tests show confusion (ROADMAP §7.2 keeps this behind one function).
- Truncation: Arabic ellipsis at the *end* (visual left); never truncate a price or a shop name.

## 7. Screen inventory & specification — Mobile app (MVP)

Each screen lists: goal · primary action · must-have content · states · backend dependency. "States" always includes the 13 from the ROADMAP definition of done: loading skeleton, empty, error, offline, stale/retry, partial (warnings on 200), success, disabled/processing, 403, 404, rate-limited, unknown-enum, and first-run.

### A. Entry & auth

**A1 Splash / boot** — token check, i18n namespace fetch. State: offline-at-boot shows cached home. No brand animation longer than 800 ms.

**A2 Onboarding (first run only, 3 cards, skippable)** — "أسواق دمشق في جيبك" / "صور حقيقية من داخل المحل" / "ادفع عند الاستلام". Primary: ابدأ التسوق. No sign-in ask here.

**A3 Phone entry** — E.164 with +963 prefilled, Syrian number mask, single field, primary: أرسل الرمز. Explains *why* the phone is needed (delivery + confirmation call). Error codes: `auth.otp_cooldown` → countdown on the button. Social sign-in slots hidden by flag.

**A4 OTP verify** — 6 boxes, SMS autofill, 300 s expiry visible, resend after 60 s countdown, 5-attempt counter after the 3rd failure. `isNewUser: true` → A5. Errors: `auth.otp_invalid`, `auth.otp_expired`, `auth.otp_attempts_exceeded` each with a distinct, translated message and the right recovery action.

**A5 Welcome / name (new users)** — one optional field (name), primary: متابعة. Never blocks.

### B. Discovery

**B1 Home** — Primary: search bar (large, in the header, with placeholder "ابحث عن منتج، محل، أو سوق"). Content order: search → banner slots (admin-driven, 16:9, max 3) → category tiles (defensible order; **Lucide glyph on a `surface-brand-subtle` circle — illustrations deferred, layout does not change when they arrive**) → "أسواق دمشق" horizontal row (13 markets, real photos) → "وصل حديثاً" product grid (cursor list). States: skeleton with text-first, offline (cached home + banner), empty slots (section collapses, never shows a blank card).

**B2 Search (overlay from any header)** — recent searches, suggested categories, live results after 2 chars (Slice 2 endpoint; MVP falls back to category browse with `q`). Primary: submit.

**B3 Results / Category browse** — 2-column grid, product card (see §9), sort chip (`-createdAt`, price asc/desc), filter chip → **Filter sheet** (market, price range, in Slice 2 attributes). Sub-category chips row. States: empty ("لا توجد نتائج في هذا السوق — جرّب سوقاً آخر" with the market filter cleared as the action), end-of-list, load-more error inline.

**B4 Markets** — list of 13 markets with photo, location (neighbourhood), shop count. Primary: open market.

**B5 Market page** — hero photo, name, neighbourhood, short description, shops grid, "منتجات من هذا السوق" grid. Deep-link `/m/<slug>`.

**B6 Shop page** — shop card (name, market, location in market, rating placeholder — **no phone/WhatsApp: phones are masked by the backend, no store-contact field exists, and it bypasses the platform**), product grid. Deep-link `/s/<slug>`. State: `store_inactive` → banner "هذا المحل غير متاح حالياً", products shown but not addable.

**B7 Product detail (PDP)** — the most important screen.
Order top-to-bottom: gallery (4:5, shop-shot chip, dots; **no video — media accepts images only**) → price (`display` verbatim; strike-through + % is **Slice 2**: Price is a single effective-dated row with no compare-at value) → name → variant selector (size/colour, from attributes; MVP: variants list) → **shop card** (name · market · location · rating placeholder) → delivery estimate for the buyer's area (from selected/last address; guest: "اختر منطقتك"; **no endpoint exists yet — design the slot and the state where it is absent, the block collapses**) → exchange promise strip → description → attributes table → "من نفس المحل" row. Sticky bottom bar: quantity stepper + **أضف إلى السلة** (primary). States: variant out of stock (selector disabled with label, not hidden), price changed since cached (silent refresh), 404 product, `store_inactive`.

### C. Cart & checkout

**C1 Cart** — grouped by shop with shop header; line: thumb, name, variant, qty stepper, line total, remove (swipe + explicit icon). Inline warnings per line (`item_unavailable`, `price_changed` with old→new). Footer: subtotal per shop, note "رسوم التوصيل تُحسب في الخطوة التالية", primary: **إتمام الطلب**. Guest tap → A3 with return-to. Offline: **cached cart is readable, edits are blocked with the global offline banner** (the cart is server-side under `X-Anonymous-Token`; a local edit queue is Slice 2 at the earliest). Empty: `EmptyState` with a Lucide glyph + "تصفّح الأسواق" (no illustration — the DS has none).

**C2 Checkout — address** — address book (radio cards) or **Address form sheet** (cascading geo selects + landmark + phone + optional map pin). Primary: متابعة. Error: `checkout.address_invalid` maps to field errors.

**C3 Checkout — payment** — COD pre-selected card ("الدفع نقداً عند الاستلام"), ShamCash / Paymera shown only if `payment_method_unavailable` is not returned (Slice 3; hidden by flag in MVP). Primary: متابعة.

**C4 Checkout — review** — per-shop order blocks (items, subtotal, delivery fee and window **if the checkout response carries them — shape open with Ahmed; design the row and its absent state**), grand total, address summary, mandatory line **"سنتصل بك لتأكيد الطلب قبل التجهيز"**, the exchange promise. Primary: **تأكيد الطلب** (idempotent, locks on tap, shows "جارٍ إنشاء الطلب…"). Errors: `checkout.empty_cart`, `cart.price_changed` → **Price-change dialog** (shows old/new, confirm or return to cart), `idempotency.in_progress` → keep waiting state.

**C5 Order(s) created** — success screen listing **one card per order** (order number, shop, items count, total, status `placed`), one shared line "سنتصل بك خلال ساعات العمل لتأكيد الطلب". Primary: تتبّع الطلبات. Secondary: متابعة التسوق. This is also where notification permission is requested (post-first-order).

### D. Orders

**D1 My orders** — segmented: جارية / مكتملة. Card: order number, shop, date (Asia/Damascus), status badge, total, first item thumb. Pull-to-refresh with "آخر تحديث". Empty: "لا طلبات بعد" + browse. Guest: sign-in prompt.

**D2 Order detail** — header (order number, shop, status badge) → **event timeline** (OrderEvent list, newest at top, timestamps, reason text where present) → items snapshot (frozen prices) → address snapshot → totals → actions by status: إلغاء الطلب (while allowed; opens **Reason picker sheet** from `order-reasons?kind=cancel`, then confirm dialog), إعادة الطلب (delivered/completed), تقييم (Slice 3, hidden). Polling 15 s with unobtrusive refresh. `orders.cancel_window_closed` → inline message. Support line with `traceId` on error states.

### E. Account

**E1 Account** — profile row (name, masked phone, `customerNumber`), sections: العناوين، اللغة، أجهزتك، الصفحات (عن ترندسي، سياسة الاستبدال، الشروط، تواصل معنا)، تسجيل الخروج، حذف الحساب (destructive, bottom).
**E2 Address book** — list, default marker, add/edit via the Address form sheet, delete with confirm.
**E3 Language** — ar / en radio; applies immediately (RTL/LTR flip).
**E4 Sessions** — a single action "تسجيل الخروج من كل الأجهزة" with a confirm dialog (`POST buyer/auth/logout-all`). **No device list**: the backend has no sessions endpoint. Add the list when one exists.
**E5 Static page** — server markdown/HTML in a readable column.
**E6 Delete account** — explanation, consequences, confirm dialog with typed confirmation not required (one clear confirm is enough), links privacy policy.

### F. System screens & sheets

404 product/shop/market · generic error with retry + traceId · offline banner (global, non-blocking) · rate-limit timer (429) · update-required (future) · Filter sheet · Variant sheet (for card-level quick add, Slice 2) · Address form sheet · Reason picker sheet · Price-change dialog · Confirm dialog · Toast.

**Mobile total: 24 screens + 7 sheets/dialogs**, each with the 13-state matrix where applicable. Estimated Figma frames: ~110.

## 8. Screen inventory — Web (MVP, 19 routes + 8 sheets)

Maps 1:1 to ROADMAP §5; the design differences from mobile are layout, not content.

| Route | Screen | Web-specific design notes |
|---|---|---|
| `/` | Home | Search bar in header is the hero (min 560 px wide on desktop); banner slots as a carousel (max 3); category tiles 6-up; markets row; product grid 4-up (desktop) / 2-up (mobile web). ISR: skeleton only for personalised bits. |
| `/c/<slug>` | Category | Left rail filters (desktop), sheet on mobile; sub-categories as chips; "تحميل المزيد" button (SEO-safe, cursor). |
| `/p/<slug-or-id>` | PDP | Two-column: gallery right (RTL) 5/12, buy box left 7/12 with sticky add-to-cart; shop card and delivery estimate inside the buy box; description and attributes below; JSON-LD price from `display`. |
| `/cart` | Cart | Grouped by shop; summary card sticky on desktop; CSR skeleton. |
| `/login` | Phone + OTP | Single centered card with two steps; return-to preserved. |
| `/checkout` | Address → payment → review | One page, three collapsible steps (linear), summary sticky. |
| `/checkout/success` | Orders created | List of orders; print-friendly. |
| `/orders` | My orders | Table on desktop, cards on mobile. |
| `/orders/<id>` | Order detail | Timeline left, summary right (RTL: timeline right). |
| `/account` | Account index | Sidebar nav on desktop. |
| `/account/addresses` | Address book | Cards + form sheet. |
| `/account/sessions` | Devices | Single "sign out everywhere" action + confirm dialog (no list endpoint). |
| `/pages/<slug>` | Static | Readable column, TOC on desktop. |
| `/q/<code>` | QR landing | Redirect; interstitial only if slow: "جارٍ فتح صفحة المحل…". |
| `/join` | Landing | Deferred (content not written). Design after MVP screens. |
| 404 / error / offline | System | Same components as mobile. |
| `/search`, `/s/<slug>`, `/m/<slug>` | Slice 2 (already built in code) | Designed in this pass because they're live; same structure as mobile B2/B5/B6. |

Breakpoints: 360 (min), 768, 1024, 1280 (max content 1200 px). Mobile web must feel like the app — same components, same order — because it is the PWA fallback for users who can't get the app.

## 9. Design system plan

### 9.1 Token architecture (three tiers)

- **Primitive** (`color.purple.700 = #6D1B72`, `space.4 = 16`, `font.size.md = 16`) — raw values, never used in screens.
- **Semantic** (`action.primary.bg`, `surface.default`, `text.muted`, `status.success.fg`, `border.strong`) — what screens and components use. Themed per mode.
- **Component** (`button.primary.bg = action.primary.bg`) — only where a component needs to diverge.

Modes in Figma variables: `light` (MVP), `dark` (defined, not shipped), and — critical for Year 4 — a **brand mode** that lets a white-label partner swap `action.*` and `brand.*` without touching layout. This costs nothing now and saves a re-skin later.

### 9.2 Colour (settled — from the Trend Design System)

Source: `Trend Design System/tokens/colors.css` + `dark.css`. The peach/gold set on the older Figma page is **retired**; the logo purple set is current.

- **Primitives:** purple ramp 50–900 anchored on the brand sheet — `#6D1B72` = `purple-700` (primary fill), `#864596` = `purple-600`, `#984399` (logo) = `purple-500`. Thirteen warm neutrals `#FFFFFF` → `#090909`.
- **Functional hues — approved for Trendsy:** `success-600 #2F7D5B`, `warning-600 #9A6410`, `danger-600 #B3261E`, each with a 50-tint. An order-tracking product cannot express `delivery_failed`, `cancelled` or "out of stock" without them. They are low-chroma so purple stays the loudest colour on any screen.
- **Semantic aliases already exist** (`--surface-*`, `--text-*`, `--border-*`, `--icon-*`); the Figma variables mirror them one-to-one. A `brand` mode is added in Figma (empty in MVP) so a white-label partner can swap `--surface-brand`, `--text-brand`, `--border-brand`, `--focus-ring` and the two washes without touching layout.
- **Where purple is allowed:** primary button fill, active nav/tab, selected chip/swatch, focus ring, brand-subtle panels, progress fill, the two wash gradients. **Nowhere else.**
- **Overrides of the DS for Trendsy:** price uses `--text-primary`, never purple (price is information, not an action); **discount price uses `--text-danger`**, not purple; rating stars stay purple but are a placeholder until Slice 3.
- **Contrast:** `purple-700` on white is 8.9:1; `purple-300` on `#090909` (dark) is 7.6:1. Every text token passes 4.5:1 on its intended surface.
- **Dark theme:** tokens are defined in `dark.css` and Figma; **not shipped in MVP**.

### 9.3 Typography (settled)

Two faces, from the supplied TTFs — no substitutes:

- **Madani Arabic** — display only: page titles, section headings, card titles ≥ 20px, stat values. Weight 600.
- **IBM Plex Sans Arabic** — everything else, **and it carries the Latin runs**. No Montserrat. One family means no fallback seam inside a mixed Arabic/Latin string.
- **Weights: 400 / 500 / 600. There is no 700** — the font files do not exist. Hierarchy comes from size and colour, which is also the §6 rule.
- **Digits: Latin 0–9**, tabular (`font-variant-numeric: tabular-nums`), matching the backend `display` string. The DS's Arabic-Indic formatter is removed.

Two scales, one token set with a mobile override:

| Role | Mobile (Flutter, sp) | Web (px) | Face / weight | Line-height AR |
|---|---|---|---|---|
| display | 28 | 36 | Madani 600 | 1.3 |
| h1 | 24 | 30 | Madani 600 | 1.35 |
| h2 | 20 | 24 | Madani 600 | 1.35 |
| h3 | 17 | 20 | Plex 600 | 1.4 |
| body-lg | 16 | 17 | Plex 400/500 | 1.6 |
| body | **15** | 16 | Plex 400 | 1.6 |
| body-sm | 13 | 14 | Plex 400/500 | 1.6 |
| caption / eyebrow | 12 | 12 | Plex 500, +0.05em **Latin only** | 1.4 |

Arabic: no negative tracking at any size; the eyebrow keeps its size and weight and drops the tracking and the uppercase transform. Web display sizes above 36 (48, 72 in the DS) are reserved for the `/join` landing and never appear in the shop.

### 9.4 Spacing, radius, elevation, motion (settled — DS values)

- **Spacing:** 4-pt grid (`--space-1 … --space-40`); component padding 12/16; screen gutter 16 mobile / 24 web; section rhythm 48 mobile / 80 web.
- **Radius (decision: DS language):** 6 checkbox tick · 8 tooltip · **12 inputs, tags, chips, alerts** · 16 media tiles · **24 cards and dialogs** · **28 bottom sheets** · **pill for every button, badge, avatar, search field, progress track**. Nothing is square.
- **Borders:** every card keeps its 1px `--border-hairline`; the shadow never defines the edge alone. `--border-strong` only on unfilled controls. `--border-brand` for a selected swatch ring and the active-tab rule.
- **Elevation:** `shadow-sm` resting card · `shadow-md` primary button and dropdown · `shadow-lg` card hover (web only) · `shadow-xl` modal, toast, sheet · `shadow-brand` primary-button hover only. No inner shadows; inputs use fill change + focus ring.
- **Motion:** `ease-out cubic-bezier(.22,1,.36,1)`; 80ms colour-only · **140ms controls** · 220ms card lift/tab · 320ms progress · **400ms sheet**. Press = `scale(.97)`. Nothing springs, nothing overshoots, layout never animates; `prefers-reduced-motion` zeroes every duration.

### 9.5 Component library (build order = screen dependency order)

The DS already ships 44 web components. The list below marks each as **reuse** (exists, needs only fixture/copy fixes), **fix** (exists but violates a backend rule), or **new**. Flutter widgets mirror the same names.

**P0 (Home / PDP / Cart / Address):**
Button (reuse) · IconButton (reuse) · SearchField (reuse; drop the ⌘K hint on mobile) · Tag/Chip (reuse) · ProductCard (**fix**: price via Money, remove `SAR()`, add shop + market line, "صُوِّر في المحل" chip) · **Money (new)** — renders `display` verbatim, bidi-isolated, tabular; zero formatting logic · ProductMedia/Image (reuse; ratio constant 4:5 default, blurred `thumb` while `md/lg` loads) · Skeleton (reuse) · Badge (reuse) · **StatusPill (fix)**: raw string in → i18n label out, unmapped status → neutral grey with the raw string · BottomNav / TopNav (reuse; 5 tabs, RTL order) · QuantityStepper (reuse) · Alert (reuse, adds `offline` tone as a global banner) · Toast (reuse) · **ShopCard (new)** · **TrustStrip (new)** — exchange promise / COD / confirmation call · Modal (reuse; `sheet` variant at 28px) · **Dialog (reuse Modal `danger`)** · EmptyState (reuse; Lucide glyph only) · **ErrorState (new)** — title from problem `title`, retry, `traceId` copyable · **GeoSelect (new, cascading, four levels)** — pulled into P0 because C2 is the MVP metric lever and it is the hardest form in the product.

**P1 (Checkout / Orders / Account):**
FormField + Input + Textarea (reuse; RTL affix) · **OTPField (new)** — 6 boxes, autofill, expiry, resend countdown · Select (reuse) · **RadioCard (new)** — address and payment method · Checkbox / Switch (reuse) · **AddressCard (new)** · **OrderCard (new)** · **Timeline (new)** — `OrderEvent[]`, newest first, reason text, Damascus time · Tabs → SegmentedControl (reuse) · OrderSummary (**fix**: per-store blocks, Money, delivery-fee row with absent state) · **ReasonPicker (new)** — generic single-select + optional note, fed by `order-reasons?kind=` · **RateLimitTimer (new)** — reads `Retry-After` · **LoadMore (new)** — cursor list footer with loading / error / end states.

**P2 (later):** RatingStars (exists, placeholder until Slice 3) · Review card · Payment method card · Map picker · DataTable (exists, web orders) · Tooltip (exists).

**Removed from the DS for Trendsy:** `Pagination` (page numbers are forbidden), `SAR()` and every `Intl.NumberFormat` money call, the feminine-form Arabic copy table, the Mada/Tabby/email/Apple/Google auth and payment fixtures.

Every component ships with: RTL + LTR, all states, min touch target 44×44, focus ring, content-agnostic width, a short usage note. Naming mirrors `packages/ui` and `Trend Design System/components/` so Code Connect maps 1:1.

### 9.6 Iconography (settled)

**Lucide**, via the DS `Icon` wrapper, is the icon set — a flagged substitution that is now adopted. Stroke 1.75 default, 2 at 16px and below. Sizes: 16 inline, 20 default, 24 nav, 28 empty-state circle. Directional glyphs (`chevron-*`, `arrow-*`, `undo-2`, `send`) mirror in RTL via the wrapper's `direction` handling; `x`, `check`, `clock`, `phone`, brand logo and numbers never mirror. **Category tiles use Lucide glyphs on a `--surface-brand-subtle` circle in MVP** (decision: no illustrations; the tile layout is unchanged if illustrations arrive later). No duotone variants — active nav is expressed by colour (`--icon-brand`) and the 2px rule, matching the DS. **Emoji: never.**

### 9.7 Imagery

Product images **4:5** (recommended — clothing and home goods dominate and 4:5 keeps a 2-column grid dense); market and shop heroes 16:9; avatar 1:1. All shop-shot photos carry the "صُوِّر في المحل" chip. Placeholder is the DS `ProductMedia` neutral frame with the category glyph, never a broken-image glyph, never stock or generated imagery. **Only images are accepted by the backend (JPEG/PNG/WebP/HEIC) — no video anywhere in MVP.** Ahmet confirms 4:5 with Ahmed (open item in backend §9).

## 10. Figma file plan

One team library file **"Trendsy DS"** and two product files **"Trendsy App"** and **"Trendsy Web"**.

**Trendsy DS pages:** 00 Cover & principles · 01 Tokens (variables: colour/space/radius/type with modes) · 02 Typography · 03 Icons · 04 Components P0 · 05 Components P1 · 06 Patterns (states, offline, errors, timeline, address) · 07 Illustrations & imagery rules · 99 Deprecated.

**Trendsy App pages:** 00 Flows (linked frames) · A Auth · B Discovery · C Cart & Checkout · D Orders · E Account · F System & sheets · Z States matrix. Frame naming: `A3 Phone entry / default`, `A3 Phone entry / error-cooldown`. Device: 390×844 base, verified at 360×780.

**Trendsy Web pages:** same sections; frames at 1280 and 375.

Handoff: Dev Mode with Code Connect mapping to `packages/ui` (web) and a Flutter widget map (`docs/design-handoff.md`). Tokens exported as JSON → Tailwind 4 theme + Flutter `ThemeExtension`.

**Blocker:** the connected Figma seat is View-only. An Edit seat is required before phase 2.

## 11. Delivery sequence & review gates

| Phase | Output | Gate |
|---|---|---|
| 0 (done) | Research synthesis | — |
| 1 (this doc) | Master plan | Ahmet approves principles, IA, token architecture, 4:5 ratio, digit decision |
| 2 | DS tokens + P0 components in Figma; low-fi flows for A–F mobile | Ahmet reviews flows on paper before any hi-fi |
| 3 | Hi-fi mobile: B7 PDP → C1–C5 checkout → B1 home → B3 results → D1–D2 → A → E → F. PDP first because it carries the most trust decisions; checkout second because it decides the MVP metric. | Screen-by-screen review with Tarek (Flutter) for feasibility |
| 4 | States matrix for every mobile screen | Checklist §8 of ROADMAP applied |
| 5 | Hi-fi web (desktop + mobile web) reusing components | Review with Baraa/Abdulrahman against what is already built (`/`, `/c`, `/p`, `/cart`, `/login` exist in code — the design must either match or explicitly replace) |
| 6 | Usability test round 1 (5 sessions, Figma prototype, Arabic) | Fix list prioritised by impact |
| 7 | Handoff pack: Code Connect, token JSON, redlines for RTL, copy deck (AR) | — |
| Later | Console (merchant + admin), Delivery app, Landing `/join` | After merchant interviews |

## 12. Validation plan

- **Prototype tests (phase 6):** tasks — find a cotton shirt under a price; add from two shops and check out COD; find the status of that order; change language. Success = task completion without help, time, and a 1–5 trust rating after PDP.
- **Instrumented funnel (from `public/track`):** `product_view → add_to_cart → begin_checkout → order_placed`. Design owns the ratio between each step.
- **Field metrics:** delivered ≥ 85 %, cancelled ≤ 15 % — watch the cancellation reasons picker data; if "changed my mind after the call" dominates, the checkout expectation copy is failing.

## 13. Decisions

### Resolved on 2 Sep 2026

| # | Decision | Outcome |
|---|---|---|
| R1 | Palette | Logo purple set (`#6D1B72 / #864596 / #090909`) from the Trend Design System. Peach/gold set retired. Functional hues approved. |
| R2 | Radius language | Design-system values: pill buttons, 12 inputs, 24 cards, 28 sheets. |
| R3 | Category art | Lucide glyphs only in MVP. Illustrations deferred, layout unchanged when they arrive. |
| R4 | Shop contact (WhatsApp/call) | Dropped from MVP. Phones are masked, no store-contact field exists, and it bypasses the platform. |
| R5 | Fonts | Madani Arabic (display) + IBM Plex Sans Arabic (UI + Latin). No Montserrat, no weight 700. |
| R6 | Digits | Latin, tabular, matching backend `display`. |
| R7 | Voice | Neutral Arabic address (verbal nouns / masculine-neutral imperatives), not the DS feminine form. |

### Still needed from Ahmet (blocking phase 2)

1. Approve the 5-tab mobile IA (search in header, not a tab).
2. Approve 4:5 product image ratio (to relay to Ahmed).
3. Confirm the web design should *match* what's already built for `/`, `/c`, `/p`, `/cart`, `/login`, or that the team will re-implement to the new design.
4. Upgrade the Figma seat to Edit.

### Shape requests to send Ahmed (per backend brief §18)

1. Delivery fee and delivery window: which endpoint returns them, and per store or per checkout?
2. Discount / compare-at price: exists in Slice 2? If so, shape.
3. Store contact for buyers: confirm there is none (R4 assumes so).
4. Sessions list for `E4`: confirm none in Slice 1.

## 14. Future-proofing notes (not designed now, but the system allows them)

Multi-currency and multi-city: no hard-coded "دمشق" or "ل.س" in components; market selector is a component from day one. Merchant self-onboarding & Console: same tokens, a denser "data" type scale added in the DS later. Reviews & ratings: PDP and order detail reserve the slot with a graceful "لا تقييمات بعد". Payments: payment-method card is a list item component, not two hard-coded options. White-label: brand mode in variables. Dark mode: semantic tokens defined now, shipped when there is time.
