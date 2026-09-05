# Trendsy — UX Research Synthesis (Survey Round 1)

**Source:** Google Forms survey, 25 Aug – 2 Sep 2026. 12 rows, **11 usable responses** (row 12 empty; row 1 has partial pain-point data; row 2 skipped two pain-point items).
**Author:** Design (Lena Kallas) · **Status:** Input to the UX/UI Master Plan — not a substitute for it.

---

## 0. Read this first — what this data can and cannot tell us

n = 11 is a directional signal, not statistics. Anything below 7/11 should be treated as "plausible", anything ≥ 9/11 as "strong enough to design on until contradicted". The sample is also skewed in ways that matter for an Arabic-first souq platform:

- **8 men / 3 women.** Souq shopping in Damascus (clothing, home goods, sweets, gifts) is heavily driven by women. We are under-hearing our likely primary buyer.
- **Ages 18–34 = 8 of 11.** Only 1 respondent is 45+. Older, less digitally fluent buyers — who care most about phone-call confirmation and cash — are nearly absent.
- **Damascus + Rif Dimashq = 9 of 11** (Qudsaya ×2, Jaramana, Daraya, Ghouta, Rukn al-Din, Mezzeh). One from Aleppo. Fine for the MVP (Damascus only), useless for the Year-2+ expansion questions.
- **Zero merchants.** Half of the product (Console, settlements, order confirmation) serves merchants, and we have no merchant voice at all.
- **Mostly light shoppers:** 7 buy online "rarely (< once a month)", 3 buy 1–3×/month, 1 buys 4–8×/month. This is the honest baseline: we are designing for people who do *not* currently shop online, not for power users.

Consequence: this synthesis is used to **rank** the flowchart's screens and states, not to add scope. Section 6 lists the research gaps we must close before Year-1 launch.

---

## 1. Findings, ranked by strength of evidence

### F1 — Product-quality mismatch is the #1 blocker (9/10 "prevents me completely")
The strongest signal in the whole survey. Nobody said "annoying" — it is binary: they either trust what they'll receive or they don't buy. This is the fear Trendsy must design *against* on every surface: PDP, cart, confirmation call, delivery, returns.

### F2 — Real photos/videos from inside the shop are the top PDP element (10/11)
Explicitly "ملتقطة من داخل المحل" — *taken inside the store*, not catalog renders. Buyers want proof the item physically exists at that stall today. This is Trendsy's structural advantage over SHEIN/Temu (global platforms 6/11 already use) — those cannot show a real Damascene shop.

### F3 — Price clarity + image/video quality is the top trust driver on global platforms (8/11)
Followed by reviews with photos (6/11), discounts (6/11), ease of purchase (3/11), filter accuracy (3/11).

### F4 — Hidden prices block purchase (7/10 "prevents completely")
This is the single most common failure of the Facebook/Instagram/WhatsApp selling channels 6/11 currently use ("السعر خاص"). A visible, final, per-unit price in SYP on **every** product card — no exceptions, no "contact seller" — is a hard rule.

### F5 — Cash on Delivery is the default (9/11); e-gateways are a strong secondary (6/11); Syriatel/ShamCash 3/11
2 respondents chose gateways *only*. COD must be the pre-selected, zero-friction path; digital options must be visibly present but never in the way.

### F6 — Same-day delivery (8–12h) is the expectation (8/11); 2 want 2–4h; 1 accepts next-day
Delivery delay "prevents purchase completely" for 6/11. Expectation is set by in-city courier services and by the fact the souq is a taxi ride away. The tracking screen and ETA copy must be honest to the hour, not to the day.

### F7 — Offline cart is the expected behaviour on weak network (8/11)
2 want an immediate connectivity alert instead; 1 wants text-only mode. Slow internet "prevents purchase completely" for 6/11. Design implication: silent persistence + a calm, non-blocking connectivity banner + image-light fallback. Not a modal.

### F8 — Discovery is search-first (11/11), not souq-first
Every respondent picked "search directly by product type (e.g. cotton shirt)". Only 3 also chose "virtual souq stroll", 1 chose spatial hierarchy (souq → lane → shop). The souq metaphor is Trendsy's *brand* and a trust layer on the PDP ("this shop is in Al-Hamidiyeh, lane 3"), but it must **not** be the primary navigation model. Search bar dominates the home screen.

### F9 — Home is the screen people care about most (9/11), then PDP (4/11), cart/checkout (3/11), souq explore (2/11), tracking (1/11)
Note the gap between what people *say* matters (home) and what actually converts (PDP → cart → checkout). Design effort should still go disproportionately to PDP and checkout; home must simply feel rich and trustworthy at first glance.

### F10 — Instant exchange for size/colour is the top trust feature (8/11)
Then demo videos (5/11), price guarantee (5/11), built-in WhatsApp (4/11). "Exchange" beats "return" in wording — buyers want the *right item*, not their money back. This should be a visible promise on PDP and in the order-confirmation screen.

### F11 — Login preference is split: Google/Apple one-tap (5/11), guest-until-checkout (4/11), OTP-only (2/11)
Nobody asked for email/password. The MVP is OTP-only (flowchart) — acceptable *only if* guest browsing is real and the phone number is requested at the last possible moment. Google/Apple sign-in is a justified Year-1 addition (already in the tech stack).

### F12 — Size chart (6/11), colour options (7/11), shop name + exact location in the souq + its rating (6/11)
The "shop identity" element is unique to Trendsy and was chosen by more than half. The PDP must carry a shop card with souq → location → rating, and a tap-through to the shop.

### F13 — Category demand: electronics (7/11), home goods (6/11), gifts/accessories/perfume (6/11), clothing/textiles/shoes (5/11), sweets/food (4/11)
Electronics scores high but is the *least* defensible category for a souq platform (global price competition, spec-driven, low trust needs). Clothing, home goods, gifts and sweets are where "real shop photos" and "instant exchange" create differentiation. Recommend the launch category set and the home-screen category order follow the *defensible* categories, not the raw popularity.

### F14 — Lack of an organised catalogue is "annoying but not blocking" (8/10)
The one pain point people tolerate. It means a beautiful catalogue is *not* a conversion driver by itself — trust (F1, F2, F4) is. Don't over-invest in taxonomy visuals at the expense of PDP trust signals.

---

## 2. Personas (evidence-based, MVP set)

### P1 — Rami, 28, Qudsaya · "The comparison shopper" *(primary — 5/11 match)*
Male, 25–34, buys online rarely, uses SHEIN/Temu *and* Facebook groups *and* walks the souq. Wants: clear prices, real photos, size chart, discounts. Blocker: quality mismatch, hidden prices. Payment: COD, open to gateway. Login: Google one-tap or guest.
**JTBD:** *When I need a specific item, help me find it fast, see exactly what I'll get and what it costs, so I don't waste a trip to the souq or get burned by a Facebook seller.*

### P2 — Hala, 21, Jaramana · "The browser-turned-buyer" *(3/11 match)*
Female, 18–24, buys 1–3×/month, mixes global platforms and Instagram pages. Wants: clothing, home goods, gifts; videos; instant exchange; WhatsApp option. Blocker: slow internet, delivery delay. Payment: COD, sometimes ShamCash.
**JTBD:** *When I'm scrolling in the evening on a weak connection, let me collect what I like without losing it, and buy when I'm ready without a long form.*

### P3 — Abu Samer, 47, Damascus · "The cautious buyer" *(1/11 — under-sampled, but critical for Year 1)*
Male, 45+, uses local apps and global apps sparingly. Wants: shop name and its exact location, sweets/electronics/furnishings, same-day delivery, COD, Google login (no OTP typing). Blocker: hidden prices, quality mismatch, delivery delay.
**JTBD:** *When I order something I can't inspect, reassure me it comes from a shop I could walk into, and let a human confirm it before money moves.*

> A merchant persona (**M1 — Abu Khaled, Al-Hamidiyeh textile stall**) is required for Console design. We have no data; see §6.

---

## 3. Jobs-to-be-done → screen priorities

| Job | Where it is won or lost | Priority |
|---|---|---|
| Find a specific item fast | Home search bar, search results, filters | P0 |
| Believe the item is real and as shown | PDP gallery (shop-shot photos/video), shop card, exchange promise | P0 |
| Know the final price instantly | Product card, PDP, cart totals incl. delivery | P0 |
| Not lose progress on weak network | Offline cart, connectivity banner, retry states | P0 |
| Buy without creating an account | Guest browse → phone at checkout → OTP | P0 |
| Pay cash, get it today | Checkout (COD default, honest delivery ETA), tracking | P0 |
| Get the right size/colour or swap it | PDP variants, exchange promise, order details | P1 |
| Reach the shop directly | WhatsApp / call CTA on shop card | P1 |
| Stroll the souq for inspiration | Souq/shop explore screens | P2 |

---

## 4. Design implications (what changes because of this data)

1. **PDP gallery is the hero, and it must be labelled as shop-shot.** A small "📍 صُوِّر في المحل" chip on real photos. Video thumbnail with a play affordance in the first three gallery slots.
2. **Price is never hidden, never "on request".** Product card: price in SYP, Arabic-Indic or Western digits per design-system decision, bold, above the fold. Strike-through original + discount % when applicable (discounts are a 6/11 trust driver).
3. **Shop card on every PDP:** shop name · souq · location inside souq · rating (placeholder until reviews exist) · "تواصل واتساب" / call. This is the trust surface global platforms cannot copy.
4. **Exchange promise as a persistent trust strip** on PDP, cart, and order-confirmation: "استبدال فوري للمقاس أو اللون".
5. **Search-first home.** Search bar is the primary action on the home screen (not the souq map). Souq entry points are secondary tiles.
6. **Connectivity UX is calm.** Silent offline cart persistence; a top banner ("لا يوجد اتصال — سلتك محفوظة") that does not block scrolling; image placeholders (blurhash) with text visible first; per-request retry, never a full-screen error.
7. **Checkout defaults:** COD pre-selected; other methods shown as radio options; phone number collected here (guest flow); one screen, no account creation step.
8. **Delivery honesty:** ETA shown as a time window ("اليوم بين 4–8 مساءً"), status via polling with timestamps; the "order confirmation call" step is shown explicitly in tracking so the wait feels intentional.
9. **Category order on home** follows defensibility: clothing/textiles → home goods → gifts/accessories/perfume → sweets → electronics.
10. **Google/Apple sign-in** designed into the auth screens now (greyed/hidden in MVP build) so Year-1 addition needs no redesign.

---

## 5. What the survey did *not* validate (design decisions still on judgement)

- The souq-based information architecture (souq → shop → product) as a browsing model — only 1/11 wanted it.
- Phone-call order confirmation — not asked. Assumed positive for P3, possibly annoying for P2.
- Arabic-Indic (١٢٣) vs Western (123) numerals — not asked; matters for prices.
- Reviews — wanted (6/11) but the MVP has none; the PDP needs a graceful "no reviews yet" state, not an empty star row.
- Web vs app preference — not asked. Roadmap says web = discovery, app = transaction; the survey can't confirm.

---

## 6. Research gaps to close before Year-1 launch (recommended, cheap)

1. **Merchant interviews — 6 to 8, in the souq, 30 min each.** Order handling, phone habits, photo-taking willingness, settlement expectations. Blocks Console design.
2. **Women 30–55 — 8 to 10 more survey responses, or 5 short interviews.** The likely primary buyer of the defensible categories.
3. **5 moderated usability tests on the MVP prototype** (Figma), tasks: find a cotton shirt under X SYP → order it COD → find the order status. Measures F1/F4/F7 fixes.
4. **A/B question set for the next survey round:** numerals, confirmation call, WhatsApp vs in-app chat, delivery fee sensitivity.

---

## Appendix — raw tallies (n = 11 unless noted)

| Question | Tally |
|---|---|
| Gender | Male 8 · Female 3 |
| Age | 18–24: 3 · 25–34: 5 · 35–44: 2 · 45+: 1 |
| Frequency | Rarely 7 · 1–3/mo 3 · 4–8/mo 1 |
| Channels used (multi) | Direct souq visit 7 · Global platforms 6 · Social groups 6 · Local apps 4 · WhatsApp/direct 3 |
| Trust drivers (multi) | Price clarity + media 8 · Reviews w/ photos 6 · Discounts 6 · Ease of purchase 3 · Filter accuracy 3 |
| Categories (multi) | Electronics 7 · Home 6 · Gifts/accessories/perfume 6 · Clothing 5 · Sweets/food 4 · Attar 1 · Furnishings 1 · Handmade 1 |
| Hidden prices (n=10) | Blocks 7 · Annoying 2 · Minor 1 |
| No catalogue (n=10) | Annoying 8 · Blocks 1 · None 1 |
| Slow internet | Blocks 6 · Annoying 4 · None 1 |
| Delivery delay | Blocks 6 · Annoying 3 · None 2 |
| Quality mismatch (n=10) | Blocks 9 · None 1 |
| Weak-network cart | Offline cart 8 · Alert + stop 2 · Text-only mode 1 |
| Discovery (multi) | Direct search 11 · Virtual stroll 3 · Spatial hierarchy 1 |
| PDP elements (multi) | Real shop photos/video 10 · Colour options 7 · Size chart 6 · Shop name/location/rating 6 |
| Most important screens (multi) | Home 9 · PDP 4 · Cart/checkout 3 · Souq explore 2 · Tracking 1 |
| Login | Google/Apple 5 · Guest until checkout 4 · OTP 2 |
| Payment (multi) | COD 9 · E-gateway 6 · Syriatel/ShamCash 3 |
| Delivery expectation | Same day 8–12h: 8 · 2–4h: 2 · Next day: 1 |
| Trust features (multi) | Instant exchange 8 · Demo videos 5 · Price guarantee 5 · WhatsApp 4 |
