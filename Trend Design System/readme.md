# Trend — Design System

**Trend** is a fashion, beauty and lifestyle **eCommerce marketplace for the Gulf**: shoppers browse curated pieces from independent regional ateliers; sellers run their own stores through a seller dashboard; a platform operations team moderates listings and sellers. Every shopper-facing surface is **bilingual Arabic / English** and must work RTL and LTR, in light and dark.

The brand is deliberately narrow: **one purple, one black, warm greys, and nothing else.** Purple is the whole chromatic vocabulary — it appears on the primary action, the active state, the discount price and the brand wash, and now5here else.

---

## Sources this system was built from

| Source | Status | Notes |
| --- | --- | --- |
| Brand sheet (`assets/brand-sheet.png`) | ✅ used | Wordmark + three-colour palette: `#6D1B72`, `#864596`, `#090909`, with CMYK/RGB/HSB values |
| Logo (`assets/logo-trend.svg`) | ✅ used | Real vector supplied by the brand owner. Internal purple is `#984399`, between the two sheet values — recorded as `--purple-500` |
| Fonts — Madani Arabic (Regular/Medium/SemiBold TTF) | ✅ used | Display face. **Not available on Google Fonts** — the supplied TTFs are the only source |
| Fonts — IBM Plex Sans Arabic (Regular/Medium/SemiBold TTF) | ✅ used | Interface face, carries Arabic + Latin |
| `uploads/DESIGN (1).md` — "Morflax — Style Reference" | ✅ used as **visual mood** (per brief) | Source of: dark bar over light canvas, pill buttons, 24px card radius, wide-blur shadows, +0.05em eyebrow labels, radial hero wash, "one accent, rationed" discipline |
| `uploads/DESIGN.md` — "shadcn/ui — Style Reference" | ⚠️ **not applied** | Describes shadcn/ui, a different product. The brief chose Morflax as the mood; this file is retained for reference only |
| **Figma — `TrendSy-App`** | ❌ **NOT READ** | `https://www.figma.com/design/H3r9xXkxkEd6xtYXJsVFuc/TrendSy-App?node-id=28-3446` — no Figma access was available in this project. **No screen in this system is a recreation of that file.** Every layout is inferred from the brand sheet + mood reference and needs your review |
| Product / lifestyle photography | ❌ none supplied | All product visuals render `ProductMedia`'s labelled placeholder. See "Imagery" |
| Icon set | ❌ none supplied | Lucide is a **flagged substitution**. See "Iconography" |

> **The most important caveat:** the UI kits are brand-accurate but they are **our layouts**, not TrendSy's. If you can export the Figma screens as PNGs or share the app's code, the kits can be corrected to match.

---

## CONTENT FUNDAMENTALS

### Voice

Trend speaks like a well-informed shop assistant, not a marketing department. Plain, warm, specific. It never shouts and it never uses hype adjectives ("amazing", "revolutionary", "game-changing").

**Person.** Address the shopper directly as **you**; the brand refers to itself as **we**.

- ✅ "We've emailed your receipt." · "Saved items are waiting in your wishlist."
- ❌ "The customer's receipt has been dispatched." · "Trend has emailed you a receipt."

In Arabic, the shopper is addressed in the **feminine second person** on shopper surfaces (the primary audience is womenswear), and neutrally on seller/admin surfaces:

- ✅ shopper: **تسوّقي الجديد** · **أضيفي إلى الحقيبة** · **ابدئي التسوق**
- ✅ seller: **إضافة منتج** · **حفظ كمسودة** (verbal noun, no gender)

### Casing

**Sentence case everywhere** — headings, buttons, labels, table headers. Title Case is never used.

- ✅ "Add to bag" · "New this week" · "Order summary" · "Free 30-day returns"
- ❌ "Add To Bag" · "Order Summary"

The one exception is the **eyebrow label**: 12px, weight 500, `letter-spacing: .05em`, `text-transform: uppercase` — "NEW THIS WEEK", "EDITOR'S PICK". Arabic eyebrows keep the tracking and drop the transform (Arabic has no case).

### Length

- Button labels: **1–3 words.** "Add to bag", "Place order", "Start selling".
- Alert titles: one clause, no full stop. "Payment declined", "Only 3 left".
- Alert bodies and hints: one sentence, with a full stop. "We'll send order updates here."
- Toasts: under 60 characters. Anything longer is an `Alert`.
- Empty states: a title plus **one** line of copy plus **one** action. Never two ways out.

### Numbers and money

Prices always run through `PriceBlock`: tabular figures, currency code at 62% of the price size. **SAR** in English, **ر.س** in Arabic. Arabic surfaces use **Arabic-Indic numerals** (١٧٤, ٤١٢) via `Intl.NumberFormat('ar-SA')` — never Western digits in an Arabic sentence.

### Emoji

**Never.** Not in UI, not in copy, not in empty states, not as icons. Every glyph in Trend is a Lucide icon.

### The vibe

Quiet confidence. A porcelain-white room with one purple light on. The copy assumes the shopper is in a hurry and knows what she wants; it tells her the thing that changes her decision (2–4 days, only 3 left, free over 300) and gets out of the way.

**Specific examples from the kits:**

- Hero: "Shop the trend, not the season" / "تسوّقي الترند لا الموسم"
- Hero body: "Curated pieces from 400+ regional ateliers, delivered across the Gulf in 2–4 days."
- Editorial statement: "We work with small ateliers across Riyadh, Jeddah and Dubai — every piece is made in limited runs."
- Stock: "Only 3 left" — never "Hurry! Almost gone!!"
- Seller pitch: "Open your store in under 24 hours. 12% commission, no monthly fee, weekly payouts." Facts, in order, no adjectives.

---

## VISUAL FOUNDATIONS

### Colour

- **One chromatic hue.** A ten-step purple ramp (`--purple-50` → `--purple-900`) anchored on the brand sheet: `#6D1B72` is `--purple-700` (the primary fill), `#864596` is `--purple-600`, `#984399` (from the logo) is `--purple-500`.
- **Warm neutrals**, thirteen steps, `#FFFFFF` → `#090909`. The greys have a faint warm cast so they sit with the purple rather than fighting it. `#090909` from the sheet is `--neutral-950`.
- **Three functional hues — proposed, awaiting your approval.** `--success-600 #2F7D5B`, `--warning-600 #9A6410`, `--danger-600 #B3261E`, each with a 50-tint. The brand sheet has none, and an eCommerce platform cannot express "out of stock", "payment declined" and "delivered" without them. They are deliberately low-chroma so purple stays the loudest colour on any screen. **If you reject them, the alternative is status-by-icon-and-label only, and I'll rebuild `StockStatus`, `StatusPill` and `Alert` accordingly.**
- **Content on the wash** uses `--text-on-wash` / `--text-on-wash-soft` / `--border-on-wash`, never a hardcoded purple — the wash itself inverts in dark theme, so a fixed `--purple-900` headline would land on a `#3D0F42` background. Likewise `--surface-inverse` is always paired with `--text-on-inverse`.
- **Where purple is allowed:** primary button fill, active nav/tab, selected chip/swatch, focus ring, discount price, brand-subtle info panels, rating stars, progress fill, the wash gradients. **Nowhere else** — body text is never purple, card backgrounds are never purple.

### Type

Two faces, strictly divided:

- **Madani Arabic** — display only. Page titles, section headings, card titles at 20px+, pull quotes, stat values. 600 weight.
- **IBM Plex Sans Arabic** — everything else. Body, labels, buttons, table cells, captions, all numerals.

Scale: 12 / 14 / 16 / 20 / 24 / 36 / 48 / 72. Weights 400, 500, 600 — **there is no 700**.

Tracking travels with size: −1.8px at 72, −1.2px at 48, −0.36px at 36, −0.2px at 20, 0 at body, **+0.6px at 12px uppercase**. Nothing outside −0.05em…+0.05em.

**Arabic differs deliberately:** drop all negative tracking (it breaks joined letterforms) and raise line-height from 1.43–1.5 to **1.6–1.75** for body, 1.2–1.4 for display. Madani's ascenders need the room.

### Backgrounds

No photography anywhere in the chrome. Three background treatments only:

1. **Flat surfaces** — the four-step stack: canvas `#F5F5F4` → card `#FFFFFF` → sunken `#EBEBE9`, plus inverse `#090909` for headers, toasts and footers.
2. **The brand wash** — `--brand-wash`, a radial gradient `#F0E1F4 → #C89AD1` centred at 32%/46%. **Hero sections only.** `--brand-wash-deep` (`#864596 → #3D0F42`) for campaign bands, sale banners and auth side panels.
3. **Nothing else.** No repeating patterns, no textures, no grain, no noise overlays, no hand-drawn illustration. There are exactly two gradients in the system and both are brand washes.

### Animation

Short, eased, no bounce. `--ease-out: cubic-bezier(.22,1,.36,1)` for everything; `--ease-entrance: cubic-bezier(.16,1,.3,1)` for arriving elements. Durations: 80ms colour-only, **140ms controls** (hover/press/focus), 220ms card lift and tab switch, 320ms progress fill, 400ms bottom sheet.

What moves: colour, opacity, shadow, a 2px card lift, a toggle knob, a sheet sliding up, a 4-percent button press. What never moves: layout, page transitions, anything spring-loaded or overshooting. `prefers-reduced-motion` zeroes every duration.

### Hover states

- **Primary button:** fill deepens 700 → 800 **and** gains `--shadow-brand` (a purple-tinted glow). The only purple shadow in the system.
- **Secondary / ghost:** background fills with `--surface-sunken` (secondary) or `--surface-brand-subtle` (ghost). Borders never change colour on hover.
- **Cards:** `translateY(-2px)` + `--shadow-sm` → `--shadow-lg`, over 220ms. Interactive cards only.
- **Table rows:** background → `--surface-canvas`. No border, no shadow.
- **Links:** colour 700 → 900 plus an underline at 2px offset.
- Never opacity-based hover. Never a scale-up on hover.

### Press states

Controls **shrink to `scale(.97)`** over 140ms. No colour change beyond the hover state, no inset shadow, no ripple.

### Borders

One hairline weight: **1px**, `--border-hairline #DCDCD8`. `--border-strong #C2C2BD` only for unfilled control outlines (checkbox, radio, empty stars). `--border-brand` for a selected swatch ring (1.5px) and the 2px active-tab rule.

**Every card keeps its hairline border.** The shadow alone does not define a Trend card edge — this is the rule most often broken.

### Shadows

Five neutral steps plus one brand glow — all wide-blur and low-opacity, none coloured except `--shadow-brand`:

| Token | Use |
| --- | --- |
| `--shadow-sm` | resting card |
| `--shadow-md` | primary button, dropdown |
| `--shadow-lg` | card hover |
| `--shadow-xl` | modal, toast, featured pricing card |
| `--shadow-brand` | primary button **hover only** |

No inner shadows anywhere. Inputs use a fill change and a focus ring, never an inset.

### Protection: capsules, not gradients

Controls over imagery use **opaque white capsules** — always the token pair `--surface-capsule` (`rgba(255,255,255,.92)`, pill, no border) with `--icon-on-capsule` (`--neutral-800`) as the glyph colour — or the translucent `IconButton variant="inverse"`. **Both capsule tokens are identical in light and dark theme on purpose:** the capsule sits on a photograph, not on a themed surface, so a theme-aware glyph colour like `--icon-default` would fade to near-invisible on dark. A wishlisted heart is the one permitted override, switching to `--purple-700`. Trend does **not** use protection gradients (scrim overlays) over images — because there are no images yet, and because the capsule reads cleaner on a 3∶4 product crop.

### Transparency and blur

Used in exactly three places: the modal scrim (`--surface-overlay` `rgba(9,9,9,.56)` + `backdrop-filter: blur(6px)`), the translucent inverse `IconButton` on imagery, and `--surface-brand-subtle` in dark theme (`rgba(152,67,153,.16)`). Nowhere else — no frosted cards, no glass nav.

### Corner radii

Nothing is square. `6px` checkbox tick · `8px` tooltip/keycap · `12px` tags, inputs, alerts · `16px` media cards · `24px` cards and modals · `28px` mobile sheets · `9999px` **every button, badge, avatar, progress track and search field**.

### What a card looks like

`background: var(--surface-card)` · `border: 1px solid var(--border-hairline)` · `border-radius: 24px` · `box-shadow: var(--shadow-sm)` · `padding: 24px`. Media cards drop to 16px radius and zero padding. Interactive cards add the hover lift.

### Layout rules

Content column **1200px**, chrome (header bars, dashboards) **1440px**, gutters 24px → 16px under 768px. Section rhythm **80px** → 48px under 768px.

**Fixed / sticky elements:** the storefront `TopNav` is sticky at `top: 0` with `z-index: 40` and **no shadow** — it sits flush against the hero. The checkout order summary is sticky at `top: 24px`. The mobile `BottomNav` and the mobile PDP's add-to-bag bar are pinned to the device bottom. Modals sit at `z-index: 100`, toasts at 200.

**RTL is structural, not a stylesheet.** Every component uses logical properties — `padding-inline`, `margin-inline-start`, `inset-inline-end`, `border-inline-end`, `text-align: start/end`. Setting `dir="rtl"` on `<html>` mirrors the entire system with no RTL-specific CSS.

### Colour vibe of imagery

Undetermined — **no imagery was supplied.** The recommendation, given the palette: cool-neutral photography with a faint plum cast in the shadows, on bone or white backgrounds, no warm filter and no grain. This is a suggestion awaiting your direction, not a rule.

### Dark theme

`[data-theme="dark"]` on `<html>` or any subtree. Canvas `#090909`, card `#141413`, raised `#262523`, hairline `#2E2D2A`. **Purple lightens:** the brand fill moves 700 → 600 and brand *text* moves to `--purple-300 #C89AD1`, because `#6D1B72` is unreadable on near-black. Shadows deepen to near-opaque black. Toasts stay dark in both themes.

---

## ICONOGRAPHY

**The sources contained no icon set** — no icon font, no SVG sprite, no PNG glyphs. **Lucide is a flagged substitution**, loaded from CDN:

```html
<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>
```

It was chosen because its geometric, uniform-stroke construction matches the wordmark's clean geometry and the mood reference's thin-stroke UI marks. **If Trend owns an icon set, send it and `Icon.jsx` swaps over in one file.**

### Rules

- **Every glyph goes through `<Icon name="…" />`.** Never hand-write an SVG path in Trend UI, never approximate an icon with a Unicode character, never use an emoji as an icon.
- Sizes: **16px** inline with body text, **20px** default, **22–24px** in nav bars and bottom nav, **26–28px** in empty-state circles.
- Stroke weight **1.75** default; 2 at 16px and below (thin strokes disappear); 1.5 for large decorative glyphs.
- Colour by `currentColor` from the parent, using `--icon-default` (`#3F3D39`), `--icon-muted` (`#9E9E98`), `--icon-brand` (`#6D1B72`) or `--icon-on-brand`.
- Icons are **functional cues, never decoration.** An icon that doesn't clarify an action or a state should be removed.
- **Unicode characters** appear in exactly two places: the `…` ellipsis in `Pagination`, and the `⌘K` keycap hint in `SearchField`. Nowhere else.
- **Emoji: never.**

### Glyphs the system actually uses

Commerce: `shopping-bag`, `shopping-cart`, `heart`, `star`, `truck`, `package`, `package-search`, `package-x`, `store`, `shirt`, `wallet`, `credit-card`, `undo-2`, `crown`, `image`, `image-plus`. Navigation: `chevron-left/right/down`, `chevrons-up-down`, `arrow-right`, `arrow-up-down`, `house`, `layout-grid`, `layout-dashboard`, `list`, `search`, `sliders-horizontal`, `ellipsis`, `x`. State: `check`, `circle-check`, `circle`, `circle-alert`, `circle-x`, `circle-help`, `triangle-alert`, `info`, `clock`, `flag`, `shield-check`, `lock`, `loader-circle`, `minus`, `plus`, `slash`. Account & ops: `user`, `users`, `bell`, `settings`, `mail`, `phone`, `map-pin`, `eye`, `share-2`, `download`, `upload`, `printer`, `trash-2`, `square-pen`, `megaphone`, `chart-line`, `trending-up`, `trending-down`, `filter`, `moon`, `sun`, `signal`, `wifi`, `battery-full`.

### Known substitution to replace

The marketing kit's social sign-in uses Lucide's `apple` and `chrome` glyphs as stand-ins. **Real Apple and Google brand marks were not supplied and must not be drawn from memory** — drop in the official assets before shipping.

---

## Imagery

**No product, lifestyle or brand photography was supplied, and none has been invented.** `ProductMedia` renders a neutral tinted frame with an "PRODUCT IMAGE" label and a `image` glyph. Pass a real `src` and it fills in with zero code change.

Ratios: **3∶4** apparel (default) · **1∶1** beauty and accessories · **16∶9** editorial.

Do not substitute stock or generated imagery into these frames.

---

## Intentional additions

Nothing in this project defined a component inventory, so the component set was authored from scratch, sized to what an eCommerce marketplace needs. Two entries deserve a note:

- **`Icon`** — a wrapper over the substituted Lucide set, so the whole system can be re-pointed at Trend's real icons by editing one file.
- **`ProductMedia`** — an honest photography placeholder, added because no imagery was supplied. It exists so no screen silently fakes a product shot.
- **Functional hues** (`--success-*`, `--warning-*`, `--danger-*`) — see Colour above. **These are the one place I extended the palette beyond your three colours, and they need your sign-off.**

---

## Index

### Root

| File | What it is |
| --- | --- |
| `styles.css` | **The single entry point** consumers link. `@import` lines only |
| `readme.md` | This document |
| `SKILL.md` | Agent-Skills front-matter for use in Claude Code |
| `thumbnail.html` | Homepage tile |

### `tokens/`

`fonts.css` (@font-face) · `colors.css` (ramps + semantic aliases) · `dark.css` (`[data-theme="dark"]`) · `typography.css` · `spacing.css` · `radii.css` · `elevation.css` · `motion.css` · `layout.css` · `base.css` (reset + link colours)

### `assets/`

`logo-trend.svg` (primary lockup) · `logo-trend-on-dark.svg` (white letterforms) · `logo-mark.svg` (sphere only) · `brand-sheet.png` (the supplied reference) · `fonts/` (6 TTFs)

### `components/` — 44 components

**`core/`** — `Icon`, `Logo`, `Button`, `IconButton`, `Badge`, `Tag`, `Card`, `Avatar`, `Eyebrow`, `Divider`, `Skeleton` (+ `keyframes.css`)

**`forms/`** — `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `SearchField`, `QuantityStepper`

**`commerce/`** — `ProductCard`, `ProductMedia`, `PriceBlock`, `RatingStars`, `OptionPicker`, `StockStatus`, `CartLine`, `OrderSummary`

**`navigation/`** — `TopNav`, `SidebarNav`, `BottomNav`, `Breadcrumb`, `Tabs`, `Pagination`, `SectionHeader`

**`feedback/`** — `Alert`, `Toast`, `Modal`, `Tooltip`, `ProgressBar`, `EmptyState`

**`data/`** — `StatCard`, `StatusPill`, `DataTable`

Each has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when, usage example, variants). Each directory has one `@dsCard` HTML showing its states.

### `ui_kits/` — 5 products

| Kit | Screens |
| --- | --- |
| `storefront/` | Home · Category/PLP · Product detail · Bag · 3-step Checkout · Order confirmation |
| `mobile_app/` | Home · Search + filter sheet · Product · Bag · Account (4 devices on one stage) |
| `seller_dashboard/` | Overview · Orders · Catalogue · Product editor |
| `admin_panel/` | Platform overview · Sellers · Moderation queue · Customers |
| `marketing_auth/` | Sell-with-us landing · Sign in · Sign up · Seller onboarding |
| `shared/` | `kit-utils.jsx` — bilingual fixture, EN/AR copy tables, locale + theme shell, `KitControls` |

Every kit's `index.html` opens standalone and carries a working **ع / EN** and **light / dark** toggle. Each has its own README listing what works and what is deliberately unbuilt.

### `guidelines/` — 24 specimen cards

Brand (4): logo light, logo dark, misuse, imagery policy. Colors (9): purple ramp, brand anchors, neutral ramp, functional hues, text colours, surfaces light, surfaces dark, borders & focus, brand wash. Type (6): display Latin, display Arabic, body Latin, body Arabic, eyebrow, numerals & price. Spacing (5): spacing scale, radii, elevation, layout frame, motion.
