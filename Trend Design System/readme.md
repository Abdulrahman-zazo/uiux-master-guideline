# Trendsy — Design System

**Trendsy** is an **Arabic-first e-commerce marketplace for the traditional souqs of Damascus**. Buyers search for a product, see a real photo taken inside a named shop with a final price in Syrian pounds, add to a cart that survives a network drop, give a phone number only at checkout, pay cash on delivery after a confirmation call, and follow an event timeline until the courier arrives. Merchants are traditional sellers with no digital habits; the network is 2–8 Mbps with power cuts; there is no street addressing.

The brand is deliberately narrow: **Trend's purple and warm greys, Stripe's flatness, Morflax's shapes.** One purple, hairlines instead of shadows, pill buttons and rounded cards.

---

## Binding sources (in precedence order)

| Source | Role |
|---|---|
| `trendsy-uxui-master-plan.md` v1.1 | **The spec.** IA, screen inventories (mobile §7, web §8), token architecture §9, decisions §13 |
| `trendsy-visual-direction.md` | The visual cross; supersedes older mood sections. Token deltas §3 |
| `trend-design-system-gap-list.md` | Work order that turned the original Trend DS into Trendsy's |
| `design-handoff-data.md` | What the buyer API **actually** returns — every component prop is bound to a DTO here |
| `trendsy-web-flowchart.md`, `trendsy-ux-research-synthesis_1.md` | Flow and evidence |
| Brand sheet, logo SVG, Madani Arabic + IBM Plex Sans Arabic TTFs | Assets (`assets/`) |
| GitHub `Abdulrahman-zazo/uiux-master-guideline` | Where the above live; see `github.md` |

The Figma file `TrendSy-App` was never readable. **Every kit layout is ours, not a recreation.** Master plan §13 asks whether existing code for `/`, `/c`, `/p`, `/cart`, `/login` should be matched or replaced.

---

## CONTENT FUNDAMENTALS

**Arabic is the language, not a translation.** Every string is written in Arabic first; English is verified after.

**Voice (decision R7): neutral.** Verbal nouns and masculine-neutral imperatives — never the feminine second person.
- ✅ **أضف إلى السلة** · **إتمام الطلب** · **تأكيد الطلب** · **تصفّح الأسواق** · **ابدأ التسوق**
- ❌ أضيفي · تسوّقي · ابدئي

**Cart is السلة**, never الحقيبة. Shop is **المحل**, market is **السوق**, and buyers never see the word "merchant".

**Trust copy is factual and specific.** "سنتصل بك لتأكيد الطلب قبل التجهيز" · "استبدال فوري للمقاس أو اللون" · "الدفع نقداً عند الاستلام" · "رسوم التوصيل تُحسب في الخطوة التالية". No adjectives, no exclamation marks, no urgency theatre.

**Exchange, not return.** Buyers want the right item (research F10): "استبدال" on every trust surface.

**Casing.** English is sentence case everywhere. The eyebrow is uppercase +0.05em in Latin; Arabic eyebrows keep size and weight and drop both tracking and transform.

**Numbers and money (R6).** Digits are **Latin 0–9, tabular**, in both languages, matching the backend `display` string. Money is `{ amountMinor, currency, display }` and is rendered **verbatim** by `Money` — no client formatting, no arithmetic. Symbol trails at 62%: **ل.س** (ar) / **SYP** (en). Phone numbers, order numbers and prices sit in `<bdi dir="ltr">`.

**Status labels come from the server** (`statusLabel`, event `label`); the UI never invents them. Unknown statuses render neutral with the raw string.

**Emoji: never.** Unicode as icon: never (the ⌘K keycap and the … ellipsis are the only glyph exceptions, and the keycap hides under 768px).

---

## VISUAL FOUNDATIONS

### Colour
Purple ramp 50–900 anchored on the brand sheet (`#6D1B72` = 700, primary fill; `#864596` = 600; `#984399` from the logo = 500). Thirteen warm neutrals `#FFFFFF → #090909`. Functional hues **approved** (master plan §9.2): success `#2F7D5B`, warning `#9A6410`, danger `#B3261E`, low-chroma.

Surface ladder: canvas `neutral-50` → card `neutral-0` → sunken `neutral-100` → **tinted `purple-50`** (`--surface-tinted`: shop card, selected radio card, confirmation-call panel). Inverse `#090909` only for the web header and footer.

Where purple is allowed: primary fill, active nav/tab, selected chip, focus ring, tinted panels, progress fill, timeline's latest dot, the wash behind the web-home search. **Price is `--text-price` = text-primary, never purple.** Discount is `--text-discount` = danger.

Dark theme is defined in `tokens/dark.css` and **not shipped in MVP**.

### Type
Madani Arabic for display at **weight 500** (600 only for h1/display); IBM Plex Sans Arabic for everything else including Latin runs. Weights 400/500/600 — **no 700 exists**. Web: 12 / 14 / 16 / 17 / 20 / 24 / 30 / 36. Mobile tier (`[data-density="mobile"]`): 12 / 13 / 15 / 16 / 17 / 20 / 24 / 28. Arabic body line-height ≥ 1.6, headings ≥ 1.35, **no letter-spacing at any size**; Latin display tracks −0.02em max. Numerals `tnum`.

### Depth
**Tint steps and 1px hairlines.** `--shadow-sm`, `--shadow-md` and `--shadow-brand` are `none`. Shadows survive only on floating layers: `--shadow-lg` dropdown, `--shadow-xl` sheet / modal / toast. Cards, buttons and inputs cast nothing. Every card keeps its hairline.

### Shape
Pill for every button, badge, avatar, search field, progress track · 12px inputs, tags, alerts · 16px product/media cards · 24px content cards and dialogs · 28px bottom sheets · 6px checkbox tick. Nothing square.

### Motion
`ease-out cubic-bezier(.22,1,.36,1)`; 80 / 140 / 220 / 320 / 400ms. **Hover = background tint shift only; press = sunken fill.** No lift, no scale, no spring, no glow. Layout never animates. `prefers-reduced-motion` zeroes everything.

### Layout
Content 1200px, chrome 1440px; gutters 24 → 16 under 768; section rhythm 80 web / 48 mobile with a **hairline rule, not alternating bands**. Breakpoints 360 / 768 / 1024 / 1280. Sticky: web header (`z 40`, no shadow), checkout summary, mobile add-to-cart bar (canvas bg + top hairline). Modal `z 100`, toast `z 200`.

**RTL is structural.** Logical properties everywhere; `dir="rtl"` on `<html>` mirrors the whole system. `Icon` mirrors `chevron-*`, `arrow-*`, `undo-2`, `send`; `x`, `check`, `clock`, `phone`, the logo and numbers never mirror.

### Imagery
Product images **4:5**; market/shop heroes 16:9; avatars 1:1. Real shop photos only, with the **"صُوِّر في المحل"** capsule chip. No illustration, no 3D, no stock, no video (API accepts images only). `ProductMedia` renders a labelled neutral frame until a real `src` arrives — **no image host is reachable from the fixtures, so every kit visual is that frame.** Category tiles are Lucide glyphs on a tinted circle (R3).

### States
Every screen designs loading (text first, blurred thumb), empty, error (`ErrorState` with copyable traceId), offline (`Alert tone="offline" banner`, non-blocking), processing (locked primary with `processingLabel`), 404, 429 (`RateLimitTimer`), unknown-enum (neutral `StatusPill`).

---

## ICONOGRAPHY
**Lucide 0.469** via `Icon` — the flagged substitution is now **adopted** (master plan §9.6). Loaded from unpkg (`https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js`; cdnjs does not mirror the UMD build). Stroke 1.75; 2 at ≤16px. Sizes 16 inline · 20 default · 24 nav · 28 empty-state circle. Colour by `currentColor`. Directional glyphs mirror in RTL through the wrapper. No duotone; active nav = colour + 2px rule.

Glyphs used: `search shopping-cart store package user house map-pin phone phone-call banknote refresh-cw truck receipt package-check check x circle-alert triangle-alert info wifi wifi-off clock hourglass copy rotate-cw chevron-left chevron-right arrow-left arrow-up-down sliders-horizontal plus minus trash-2 pencil share-2 bell languages smartphone file-text log-out award star image scissors lamp gift cake shirt building-2 route camera loader-circle search-x package-x construction`.

---

## Components (56)

**core/** Icon · Logo · Button · IconButton · Badge · Tag · Card · Avatar · Eyebrow · Divider · Skeleton
**forms/** FormField · Input · Textarea · Select · Checkbox · Radio · Switch · SearchField · QuantityStepper · **GeoSelect** · **OTPField** · **RadioCard** · **ReasonPicker**
**commerce/** **Money** · ProductCard · ProductMedia · PriceBlock · RatingStars · OptionPicker · StockStatus · CartLine · OrderSummary · **ShopCard** · **TrustStrip**
**navigation/** TopNav · SidebarNav · BottomNav · Breadcrumb · Tabs · SectionHeader · **LoadMore**
**feedback/** Alert · Toast · Modal · Tooltip · ProgressBar · EmptyState · **ErrorState** · **RateLimitTimer**
**data/** StatCard · StatusPill · DataTable · **Timeline** · **OrderCard** · **AddressCard**

Bold = new for Trendsy. **Removed:** Pagination (page numbers forbidden), all client money formatting. **Console-only (not MVP):** StatCard, DataTable. **Placeholder until Slice 3:** RatingStars. **Legacy, prefer Money:** PriceBlock.

Each has `.d.ts` (props bound to the API DTO where one exists) and `.prompt.md`.

---

## UI kits
| Kit | Status | Contents |
|---|---|---|
| `ui_kits/mobile_app/` | **MVP** | Screens A–F (24) + sheets, 390×844, 16 devices staged |
| `ui_kits/storefront/` | **MVP** | 19 web routes with route jumper |
| `ui_kits/shared/` | — | Fixture mirroring the API (13 markets, 2 real + 10 design-only products, 4 orders with event logs), neutral AR copy, locale/theme/offline shell |
| `ui_kits/marketing_auth/` | Deferred | `/join` placeholder |
| `ui_kits/seller_dashboard/`, `ui_kits/admin_panel/` | Parked | Console shell reference; pre-Trendsy fixture via compat shim |

## Index
`styles.css` (entry) · `tokens/` (fonts, colors, dark, typography, spacing, radii, elevation, motion, layout, base) · `assets/` (logo ×3, fonts ×6, brand sheet) · `components/` · `guidelines/` (24 specimen cards) · `ui_kits/` · `PLAN.md` (rebuild plan) · `github.md` · `SKILL.md` · `thumbnail.html` · the six copied spec documents at the root.
