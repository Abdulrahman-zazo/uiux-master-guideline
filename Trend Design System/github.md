repo: Abdulrahman-zazo/uiux-master-guideline
branch: main

## Last sync
date: 2026-09-03T12:47:26Z
commit: 07b05d0d7dfb

### Updated in this project
- Applied the gap list + visual direction: shadows removed, display weight 500, tnum digits, mobile type tier, tinted surface, outline button
- 13 new API-bound components (Money, ShopCard, TrustStrip, GeoSelect, OTPField, Timeline, OrderCard, AddressCard, RadioCard, ReasonPicker, LoadMore, ErrorState, RateLimitTimer); Pagination and client money formatting removed
- Rebuilt shared fixture on the real seed (13 markets, 2 stores, 2 products + design padding, 4 orders); rebuilt mobile (24 screens) and web (19 routes) kits AR-first
- Console and /join kits parked; readme, SKILL, PLAN rewritten

## Screen map
| Project screen | Repo source files |
|---|---|
| `tokens/*` | trendsy-visual-direction.md §3; trendsy-uxui-master-plan.md §9.3–9.4 |
| `components/*` | trend-design-system-gap-list.md §3; trendsy-uxui-master-plan.md §9.5; design-handoff-data.md §2–3 (DTO shapes) |
| `ui_kits/shared/kit-utils.jsx` | design-handoff-data.md §5 (seed), §2.10–2.13; trend-design-system-gap-list.md §2 |
| `ui_kits/mobile_app/*` | trendsy-uxui-master-plan.md §5.1, §7 |
| `ui_kits/storefront/*` | trendsy-uxui-master-plan.md §5.2, §8; trendsy-web-flowchart.md |
| `ui_kits/marketing_auth`, `seller_dashboard`, `admin_panel` (parked) | trend-design-system-gap-list.md §4 |
| `readme.md`, `SKILL.md`, `PLAN.md` | all eight root documents |
