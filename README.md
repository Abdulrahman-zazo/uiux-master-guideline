# Trendsy — UI/UX master guideline

This repo is the design side of **Trendsy**, an Arabic-first marketplace connecting Syrian buyers with traditional Damascus souq merchants (mobile app + buyer website, cash on delivery, phone-OTP auth). It holds the product/UX planning docs and the full design system used to build the screens.

## Contents

| File / folder | What it is |
|---|---|
| `backend-brief.md` | The backend's API contract for frontend clients — auth, errors, money, pagination, entities. Source of truth for anything data-shaped. |
| `trendsy-web-flowchart.md` | The adopted MVP flow for the buyer website (Next.js). |
| `trendsy-ux-research-synthesis_1.md` | User research synthesis (personas, jobs, survey findings) behind the design decisions. |
| `trendsy-uxui-master-plan.md` | **The master plan.** Screen inventory, IA, states matrix, component build order and the delivery sequence for mobile + web MVP. |
| `trendsy-visual-direction.md` | The settled visual language: Trend's palette/fonts, Stripe's flat depth, Morflax's shapes — with the exact token deltas. |
| `trend-design-system-gap-list.md` | Work order reconciling the generated design system with this product (fixtures, components to add/fix/remove). |
| `design-handoff-data.md` | Data/API facts pulled from the backend repo for design use (endpoints, entities, seed data, enums) — see `prompt-for-backend-claude.md`. |
| `prompt-for-backend-claude.md` | The prompt used in the **backend** repo to generate `design-handoff-data.md`. |
| `Trend Design System/` | The design system itself: design tokens, 40+ React components (with `.d.ts` + usage docs), UI kits for storefront/mobile app/seller dashboard/admin panel, and brand assets/fonts. See its own `readme.md` and `SKILL.md`. |

## Where to start

Read `trendsy-uxui-master-plan.md` first, then `trendsy-visual-direction.md`, then `Trend Design System/readme.md`.
