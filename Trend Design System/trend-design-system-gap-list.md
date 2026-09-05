# Trend Design System — gap list for Trendsy MVP

**2 Sep 2026 · companion to `trendsy-uxui-master-plan.md` v1.1 §9.** The design system in `Trend Design System/` was generated for a Gulf fashion marketplace in SAR. Its tokens and primitives are adopted; its fixtures, copy and several components are not. This is the work order to make it Trendsy's.

Legend: **Keep** untouched · **Fix** exists but wrong · **New** does not exist · **Remove** delete.

## 1. Tokens

| File | Action | Detail |
|---|---|---|
| `tokens/colors.css`, `dark.css` | Keep | Functional hues approved. Add nothing. |
| `tokens/typography.css` | Fix | Add the mobile tier from plan §9.3 (body 15, h1 24, h2 20, h3 17, display 28) as a `[data-density="mobile"]` or Flutter-side override. Remove any reference to weight 700. |
| `tokens/radii.css`, `elevation.css`, `motion.css`, `spacing.css` | Keep | Decision R2: DS radius language stands. |
| `tokens/layout.css` | Keep | `--page-max 1200` matches plan breakpoints. |
| Figma variables | New | Mirror semantic tokens; add an empty `brand` mode for white-label (plan §9.1). |

## 2. Shared fixtures and copy (`ui_kits/shared/kit-utils.jsx`)

| Item | Action | Detail |
|---|---|---|
| `SAR(n, locale)` | **Remove** | Backend forbids client money formatting. Replace with `Money` rendering `display`. |
| `CATALOG` | Fix | Rebuild as Damascus fixture: 13 markets, stores belonging to a market, products with `{ amountMinor, currency: "SYP", display }` prices, UUIDv7 ids, `slug`, `status`, media objects with `urls.thumb/sm/md/lg`. Obey backend brief §6–9 exactly. |
| `COPY` AR table | Fix | Rewrite in neutral voice (R7). Replace Riyadh/Jeddah/Dubai, "400+ ateliers", "2–4 days", SAR, "bag" with souq copy from the plan. Cart is **السلة**, not "الحقيبة". |
| `COPY` EN table | Fix | Secondary locale; verify after AR. |
| Numerals | Fix | Latin digits, tabular. Remove `Intl.NumberFormat('ar-SA')`. |

## 3. Components

### Core / forms / feedback

| Component | Action | Detail |
|---|---|---|
| Button, IconButton, Badge, Tag, Card, Avatar, Divider, Skeleton, Eyebrow, Logo | Keep | Eyebrow: drop tracking + uppercase when `lang="ar"`. |
| Icon | Fix | Load Lucide from cdnjs or bundle it (unpkg is blocked in artifacts). Add `direction` mirroring for chevron/arrow/undo/send. |
| SearchField | Fix | Hide the ⌘K keycap under 768px. Placeholder: "ابحث عن منتج، محل، أو سوق". |
| Input, Textarea, Select, Checkbox, Radio, Switch, FormField, QuantityStepper | Keep | FormField must show `errors[].message` keyed by `field`. |
| Alert | Fix | Add `offline` tone used as the global non-blocking banner. |
| Toast, Modal, Tooltip, EmptyState, ProgressBar | Keep | Modal `sheet` variant at 28px is the BottomSheet. EmptyState: Lucide glyph only. |

### Commerce

| Component | Action | Detail |
|---|---|---|
| **Money** | **New** | Props `{ display, currency }`. Renders `display` verbatim inside a bidi-isolate span, tabular figures, currency at 62% size. No arithmetic, no formatting. |
| PriceBlock | Fix | Becomes a thin wrapper over Money. Discount colour `--text-danger`, not purple. Strike-through variant marked Slice 2. |
| ProductCard | Fix | Add store name + market line, "صُوِّر في المحل" chip, StockStatus from variant inventory. Remove wishlist heart (no wishlist in MVP). |
| ProductMedia | Keep | Ratio constant defaults 4:5; blurred `thumb` while `md/lg` loads. |
| StockStatus | Fix | Label from i18n endpoint; unknown → neutral. |
| RatingStars | Keep | Placeholder until Slice 3; shows "لا تقييمات بعد". |
| OptionPicker | Keep | Out-of-stock option disabled with label, never hidden. |
| CartLine | Fix | Inline warning slot for `cart.item_unavailable` / `cart.price_changed` (old → new). Swipe + explicit remove. |
| OrderSummary | Fix | Per-store blocks; delivery-fee row with absent state; mandatory "سنتصل بك لتأكيد الطلب" line; Money everywhere. |
| **ShopCard** | **New** | Store name · market · location in market · rating placeholder. No phone (R4). |
| **TrustStrip** | **New** | Exchange promise · COD · confirmation call. |

### Navigation

| Component | Action | Detail |
|---|---|---|
| TopNav, BottomNav, Breadcrumb, Tabs, SectionHeader, SidebarNav | Keep | BottomNav: 5 tabs in plan §5.1 RTL order, cart count badge. |
| Pagination | **Remove** | Page numbers are forbidden. |
| **LoadMore** | **New** | Cursor list footer: loading / inline error with retry / end-of-list. |

### Data

| Component | Action | Detail |
|---|---|---|
| StatusPill | Fix | Raw enum in → i18n label out; tone map for the §14 statuses; unmapped → neutral grey + raw string. |
| StatCard, DataTable | Keep | Console/admin only; not in MVP scope. |
| **Timeline** | **New** | `OrderEvent[]` newest first, Damascus timestamps, reason text. |
| **OrderCard**, **AddressCard**, **RadioCard** | **New** | Per plan §9.5. |
| **GeoSelect** | **New, P0** | Four cascading levels from `public/geo/tree`, then landmark textarea (≤300), phone, optional pin. |
| **OTPField** | **New** | 6 boxes, autofill, 300 s expiry, 60 s resend countdown, attempt counter. |
| **ReasonPicker** | **New** | Single-select from `order-reasons?kind=` + optional note. |
| **ErrorState** | **New** | Problem `title`, retry, copyable `traceId`. |
| **RateLimitTimer** | **New** | Countdown from `Retry-After`. |

## 4. UI kits

| Kit | Action | Detail |
|---|---|---|
| `storefront/` | Rebuild | Replace with the 19 web routes in plan §8. Remove Mada, Tabby, email/Apple/Google auth, wishlist, numbered pager, free-text address, SAR. Add phone+OTP login, cascading address, per-store confirmation list, order timeline. |
| `mobile_app/` | Rebuild | 5-tab IA, screens A–F from plan §7. Device 390×844. |
| `marketing_auth/` | Defer | `/join` landing is deferred; auth moves into the storefront kit as phone+OTP. |
| `seller_dashboard/`, `admin_panel/` | Park | Out of MVP scope. Keep as shell reference for the Console after merchant interviews. |
| `shared/` | Fix | Per §2 above. |

## 5. Docs

| File | Action |
|---|---|
| `readme.md` | Rewrite the product paragraph (Syrian souq marketplace, SYP, neutral voice), the money and numerals rule, the imagery ratio, the icon substitution note (now adopted). |
| `SKILL.md` | Point to the master plan v1.1 as the binding spec. |
| `uploads/DESIGN.md` (shadcn) | Remove, never applied. |

## 6. Order of work

1. Tokens: mobile type tier. Half a day.
2. Shared fixture + copy rewrite. One day.
3. Money, StatusPill fix, LoadMore, Pagination removal. One day.
4. GeoSelect, OTPField, ErrorState. Two days.
5. ShopCard, TrustStrip, Timeline, OrderCard, AddressCard, RadioCard, ReasonPicker, RateLimitTimer. Two days.
6. Storefront and mobile kits rebuilt against plan §7–8, PDP and checkout first. After 1–5.
