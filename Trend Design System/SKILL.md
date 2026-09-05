---
name: trendsy-design
description: Use this skill to generate well-branded interfaces and assets for Trendsy — an Arabic-first Damascus souq marketplace — either for production or throwaway prototypes/mocks. Contains design guidelines, colors, type, fonts, assets, API-bound UI components and two MVP UI kits (mobile app, web storefront).
user-invocable: true
---

Read `readme.md` first, then `trendsy-uxui-master-plan.md` v1.1 — **the binding spec** — and `trendsy-visual-direction.md`. `design-handoff-data.md` says what the buyer API actually returns; never draw a field it doesn't have.

Hard rules: Arabic first, neutral voice, Latin tabular digits, Money `display` rendered verbatim, one order per store, tracking as an event log, COD + phone/OTP only, no page numbers, no shadows on cards or buttons, Lucide icons only, no emoji, no invented imagery.

If creating visual artifacts (mocks, prototypes, slides), copy assets out and build static HTML against `styles.css` + `_ds_bundle.js`. If working on production code, lift the tokens and component contracts. If invoked with no other guidance, ask what to build, which screen from §7/§8 it maps to, and which of the 13 states matter.
