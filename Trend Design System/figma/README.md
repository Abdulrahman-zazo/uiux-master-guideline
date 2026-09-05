# Setting up Trendsy in Figma

You can't import a code design system into Figma automatically — Figma has no "import CSS" feature. But the two things that take longest (variables and text styles) can be imported from a file, and the rest is a few hours of assembly. Order matters: **variables → text styles → effects → components → screens.**

`trendsy.tokens.json` in this folder is the import file. It carries every token from `tokens/*.css` with the real aliasing preserved (semantic tokens point at primitives, not at raw hexes).

---

## 1. Variables — import, don't retype (30 min)

Use the **Tokens Studio for Figma** plugin (free tier is enough).

1. Plugins → Tokens Studio → **Settings → Import** → paste or upload `figma/trendsy.tokens.json`.
2. You get seven token sets:

| Set | Contents | Enable as |
|---|---|---|
| `primitive` | purple 50–900, neutral 0–950, functional hues | **Source** (hidden from designers) |
| `semantic-light` | text / surface / border / icon aliases | **Enabled** |
| `semantic-dark` | the dark overrides | **Enabled** (second theme) |
| `scale` | spacing, radius, layout, breakpoints | **Enabled** |
| `typography` | web + mobile type ramps | **Enabled** |
| `effect` | the two surviving shadows + focus ring | **Enabled** |
| `motion` | durations, easings (reference only — Figma can't use them) | **Source** |

3. Create two themes in the plugin: **Light** = `primitive` + `semantic-light` + `scale`, **Dark** = `primitive` + `semantic-dark` + `scale`.
4. Hit **Push to Figma → Create variables**. You now have real Figma variables with light/dark modes, and `surface/card` resolves through `neutral/0` exactly as in CSS.

**Set `primitive` to "source" so designers can only pick semantic tokens.** That single setting is what keeps the system from drifting — same rule as "only semantic aliases appear in component code."

Doing it by hand instead: Local variables panel → collection **Trendsy** → modes Light / Dark → groups `purple/`, `neutral/`, `text/`, `surface/`, `border/`, `icon/`, `space/`, `radius/`. Alias the semantic ones (right-click value → *Create alias*). Budget 2–3 hours.

## 2. Fonts (10 min)

Install both families locally **before** creating text styles, or Figma silently substitutes:

- `assets/MadaniArabic-Medium.ttf`, `-SemiBold.ttf` → display only
- `assets/IBMPlexSansArabic-Regular/-Medium/-SemiBold.ttf` → everything else

Only 400 / 500 / 600 exist. If you see Bold anywhere in Figma, it's faux-bold — fix it, don't keep it.

## 3. Text styles (20 min)

Tokens Studio pushes typography as **text styles** in the same step as variables. Names come out as `web/display`, `web/h1`, … `mobile/body`.

Two things the JSON can't express, set by hand:

- **Arabic tracking.** The web display/h1/h2 styles carry −2% / −1% tracking, which is **wrong for Arabic**. Duplicate those three as `web/display-ar`, `web/h1-ar`, `web/h2-ar` with tracking **0** and line-height 135%+. Use the `-ar` set on every Arabic frame.
- **Tabular numerals.** On `web/price`, `web/price-pdp` and any style used for numbers, open Type details → **Features → tnum on**. Prices and order numbers must not shift width.

## 4. Effect styles (5 min)

Only two exist: `shadow/dropdown` and `shadow/sheet`, plus `focus-ring`.

**Do not create a card shadow or a button shadow.** Depth in Trendsy is a tint step plus a 1px border. If a Figma card looks flat next to your other files, that's correct.

## 5. Grids and frames

Layout grid presets to save as shared styles:

| Frame | Width | Columns | Gutter | Margin |
|---|---|---|---|---|
| Desktop | 1440 | 12 | 24 | 120 (content 1200) |
| Laptop | 1280 | 12 | 24 | 40 |
| Tablet | 768 | 8 | 16 | 16 |
| Mobile web | 360 | 4 | 16 | 16 |
| App | 390 × 844 | 4 | 16 | 16 |

Set **Text direction: RTL** in the text panel and lay out Arabic frames right-to-left. Figma has no document-level RTL — it's per text layer, so build the Arabic frames as the primary set and mirror to LTR only if you need English mocks.

## 6. Components — rebuild, in this order

Figma components must be drawn by hand; there's no import path. Build them against the variables so they inherit light/dark for free. Each `.d.ts` in `components/` is the variant spec — read it and mirror the prop names as Figma properties.

**Wave 1 — unblocks every screen (1 day)**
`Icon` (Lucide plugin → 40 glyphs listed in `readme.md` → one component set) · `Button` (variant: primary/outline/secondary/ghost/danger × sm/md/lg × default/hover/pressed/disabled/loading) · `Card` (default/tinted/sunken × padding) · `Badge` · `Tag` · `Money` (a text component with `tnum` on) · `Input` + `FormField`

**Wave 2 — commerce (1 day)**
`ProductCard` (4:5 image slot, shop-shot chip, 2-line clamp, store·market line) · `ShopCard` · `TrustStrip` · `CartLine` · `OrderSummary` · `QuantityStepper` · `StatusPill` (13 variants — one per status, using the tone map in `StatusPill.jsx`)

**Wave 3 — flows (1 day)**
`GeoSelect` · `OTPField` · `RadioCard` · `AddressCard` · `OrderCard` · `Timeline` · `Alert` (incl. offline) · `Modal` / bottom sheet · `EmptyState` · `ErrorState` · `LoadMore` · `TopNav` / `BottomNav` / `Tabs` / `Breadcrumb`

Use **component properties** (not detached variants) for text and instance swaps, and **auto-layout everywhere** with spacing bound to `space/*` variables — otherwise the RTL mirror breaks.

Skip: `Pagination` (deleted), `StatCard` / `DataTable` (console only), `PriceBlock` (superseded by `Money`).

## 7. Screens

Rebuild from `ui_kits/mobile_app/index.html` (24 screens) and `ui_kits/storefront/index.html` (19 routes) — serve them locally and screenshot as reference, then compose from your Figma components. `PLAN.md` §1 and §2 are the page-by-page content order; each row lists the components that screen uses.

Suggested Figma page structure:

```
📄 Cover
📄 Foundations        ← colour, type, spacing, radius specimens
📄 Components         ← the three waves above
📄 App — Discovery    ← A, B screens
📄 App — Checkout     ← C screens
📄 App — Orders       ← D, E, F screens
📄 Web — Public       ← W1–W6
📄 Web — Commerce     ← W7–W10
📄 Web — Account      ← W11–W18
📄 Archive
```

## Keeping the two in sync

Figma and this repo will drift. Pick one direction and stick to it:

- **Code is truth** (recommended here — the tokens are already generated from the API-bound components): change `tokens/*.css`, regenerate `trendsy.tokens.json`, re-import in Tokens Studio, push to Figma.
- **Figma is truth**: designers change variables, Tokens Studio **exports** JSON to a repo branch, someone converts it back to CSS.

Ask me to regenerate `trendsy.tokens.json` whenever the tokens change — it's a scripted export, not a retype.
