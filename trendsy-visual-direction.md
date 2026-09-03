# Trendsy — Visual direction (the cross)

**2 Sep 2026 · binding for Figma and code · supersedes the mood sections of `Trend Design System/readme.md` where they differ.**
Inputs: Trend Design System (brand, fonts, tokens) · Stripe style reference (`DESIGN (2).md`) · Morflax reference (`DESIGN (1).md`) · master plan v1.1 §3 and §9.

## 1. The decision in one line

**Trend's palette and fonts, Stripe's discipline, Morflax's shapes.** A warm-white ledger with one purple: depth from tint and hairlines instead of shadows, text that leads and images that follow, pill buttons and rounded cards so it still feels like a souq and not a bank.

Why this cross and not either parent:

- Stripe's flatness is right for Trendsy's reality. Shadows cost paint on low-end Android, blur behind slow images, and hide the hairline that makes a card a card. Tint progression and 1px rules render identically at any DPI and any network speed.
- Stripe's text-led hierarchy is right for trust. A shop name, a market, a final price and "we will call you" must be legible before any photo loads (principle 3: network is hostile; principle 1: trust before beauty).
- Stripe's 4px radius and weight-300 type are wrong for us. The fonts we own have no 300; Arabic at 300 disappears on a 360px Android. 4px corners read as a financial instrument, and the master plan already fixed the DS pill-and-24 language (decision R2).
- Morflax's shapes stay. Pill buttons, 12/16/24 radii, the single radial brand wash on the hero.

## 2. What we take from each

| Dimension | Trend DS | Stripe | **Trendsy (chosen)** |
|---|---|---|---|
| Hue | purple ramp 50–900 | indigo, single accent | **Trend purple ramp.** One chromatic voice. Functional hues stay, low-chroma. |
| Neutrals | warm greys `#FFFFFF → #090909` | cool blue-greys | **Warm** (settled in the DS). |
| Depth | 5 shadows + brand glow | none, tint steps | **Tint steps + hairlines.** Shadows survive only on floating layers: sheet, modal, toast, dropdown. Cards, buttons and inputs cast nothing. `--shadow-brand` glow removed. |
| Surfaces | canvas / card / sunken / inverse | white / mist / frost / lavender / indigo | **Four-step tint ladder:** canvas `neutral-50` → card `neutral-0` → sunken `neutral-100` → tinted `purple-50`. Inverse `#090909` only for the storefront header and the footer. |
| Section structure | 80px rhythm, alternating bands | 96px + 1px rule, no bands | **1px hairline rule + 48px mobile / 80px web.** No alternating bands, no wash outside the hero. |
| Type family | Madani display + Plex body | one family, 300/400 | **Madani + Plex, weights 400/500/600.** Display at **500** (quiet), 600 only for h1 and the display size. Body 400. |
| Tracking | negative on Latin display | aggressive negative | **Latin display −0.02em max; Arabic 0 always.** |
| Numerals | Arabic-Indic | tabular Latin | **Tabular Latin** (`tnum`), matching backend `display`. |
| Radius | pill / 12 / 16 / 24 / 28 | 4 everywhere, pill tags | **Pill buttons and chips · 12 inputs · 16 product/media cards · 24 content cards and dialogs · 28 sheets.** |
| Buttons | primary + secondary + ghost, shadow on primary | filled + lavender-outline pair, no shadow | **Filled purple + outline pair, no shadow.** Outline border `purple-200`, text `purple-700`. Every primary is paired with an outline or text action, never alone. |
| Links | purple, underline on hover | purple + chevron, or underline | **Purple text with trailing chevron (mirrors in RTL)** for "see all / تصفّح الكل"; underline only inside paragraphs. |
| Hover / press | lift + shadow-lg, scale .97 | background tint shift | **Background tint shift only.** No lift, no scale on web; press = `surface-sunken` fill. Mobile has no hover. |
| Section label | eyebrow 12px uppercase +.05em | 12px muted label, uppercase | **Eyebrow kept: Latin uppercase tracked; Arabic plain 12px `text-muted`.** Pattern: eyebrow → heading → one-sentence paragraph → grid. |
| Stat / price | Madani 600 | display 300 "quiet monument" | **Price = Plex 600 tabular, `text-primary`, never purple. Stats (Console later) = Madani 500.** |
| Hero | radial purple wash + display | typography is the hero, no image | **Search bar is the hero.** Wash allowed behind it on web home only; on mobile the header is flat canvas. |
| Cards | hairline + shadow-sm | no border, whitespace only | **Hairline always, shadow never.** Product cards: 16px, zero padding, image top, text block 12px. |
| Imagery | placeholder, no photos | documentary, < 15% of area | **Real shop photos are the only imagery.** No illustration, no 3D, no stock. Icons Lucide 1.75. |
| Alignment | start-aligned | strictly left, never centred | **Start-aligned everywhere.** Centred text only in EmptyState and the order-created screen. |
| Dark theme | defined | none | **Defined in tokens, not shipped in MVP.** |

## 3. Token deltas to apply to the DS

```css
/* tokens/elevation.css */
--shadow-sm: none;                 /* cards no longer cast */
--shadow-md: none;                 /* buttons, inputs */
--shadow-lg: 0 18px 32px -10px rgba(9,9,9,.16);   /* dropdown, popover */
--shadow-xl: 0 25px 50px -12px rgba(9,9,9,.25);   /* sheet, modal, toast */
--shadow-brand: none;              /* removed */

/* tokens/colors.css — additions */
--surface-tinted: var(--purple-50);           /* highlighted card, selected radio card */
--border-outline-brand: var(--purple-200);    /* outline button */
--text-price: var(--text-primary);
--text-discount: var(--danger-600);

/* tokens/typography.css */
--weight-display: 500;             /* was 600; 600 reserved for h1/display */
--tracking-display: -0.02em;       /* Latin only; [lang=ar] → 0 */
font-feature-settings: "tnum" 1;   /* on --font-numeric */

/* tokens/motion.css */
/* hover: background-color only, 140ms; remove transform from --transition-control on web */
```

Component consequences: `Button` drops `box-shadow`; `Card` drops `hover` lift; `ProductCard` becomes 16px radius, hairline, no shadow; `PriceBlock` uses `--text-price` / `--text-discount`; `SectionHeader` gains the chevron link; `Eyebrow` drops transform and tracking under `[lang="ar"]`.

## 4. What this looks like on the four screens that matter

- **Home (mobile):** flat canvas, search field pill at the top with the logo above it, one hairline, category glyph circles in `surface-tinted`, market row with 16:9 photos, product grid 2-up. No wash, no banner shadow.
- **PDP:** gallery 4:5 edge-to-edge, then price in Plex 600 tabular, name in Madani 500, hairline, shop card (tinted surface, hairline), hairline, trust strip, description. Sticky bottom bar: canvas background, top hairline, stepper + filled pill.
- **Checkout review:** per-store blocks separated by hairlines, totals in tabular figures aligned end, the confirmation-call line in a `surface-tinted` panel with an `info` glyph, one filled pill "تأكيد الطلب" with an outline "العودة إلى السلة" beside it.
- **Order detail:** header with status pill, hairline, event timeline (purple dot for the latest event, neutral for older), hairline, items snapshot, address, totals.

## 5. Rejected, and why

- **Stripe 4px radius** — contradicts R2 and reads cold for a souq.
- **Weight 300 anywhere** — font files do not exist; unreadable Arabic at 13–15sp.
- **Stripe cool neutrals** — the DS warm greys are settled and sit with the photography we expect (indoor shop light is warm).
- **No functional colours** — an order-tracking product cannot express `delivery_failed` with purple alone.
- **1320px content, 96px section gap** — too airy for a catalogue; 1200 / 80 stays.
- **DS purple glow on the primary button, card hover lift, scale .97 press** — motion and shadow the network cannot afford and the ledger tone does not want.
- **Morflax alternating white/bone bands** — replaced by hairline rules.
