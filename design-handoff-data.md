# Design handoff — the data the buyer API exposes

| Generated from commit | Date | OpenAPI command | Snapshot read |
|---|---|---|---|
| `cd609f4a1a26ad0b2e2b5f270b96c18c6661f352` (`cd609f4`, 2026-09-03 11:54 UTC, working tree clean apart from this file) | 2026-09-03 (revised after `git pull da92ac8..cd609f4`: batches A6 + A7 — 17 new buyer-facing operations, 37 new schemas, `PaginatedProductCardDto` renamed `ProductListResponseDto`) | `pnpm openapi:export` = `nest build api && node tools/scripts/openapi.mjs export` (`package.json`) — not re-run for this file; the committed `docs/api/openapi/buyer.json` (v0.0.0) was read directly | `docs/api/openapi/buyer.json` |

**What changed since the first edition (commit `da92ac8`).** Every Slice 2/3 buyer-facing row that §0 previously listed as *planned, no handler* now has a `mock-only` handler: search + suggest, per-category form schema / filters / import template, attribute filters and facets on the product list, coupon validation, payment intents (Sham Cash / Paymera), push-device registration, notification preferences, reviews (write, read, report) and the two OAuth sign-in routes (which answer **503** by design). New sections: §2.19–§2.25, §3.9–§3.12, §5.12–§5.16. Rows touched elsewhere are marked **(A6)** or **(A7)**.

Reader: the UI/UX side planning the buyer mobile app and buyer website for Slice 1. Scope: the `public/` and `buyer/` audiences only. Every field name, enum value and seeded string below was read from the source of truth in this order: OpenAPI snapshot → DTO classes and validators → Drizzle schema/migrations → seed and fixture files → enum files → i18n messages. `docs/` is cited only to explain intent, and every place where a document and the code disagree is flagged **DOC≠CODE**. Where a thing does not exist the row says `(not in code)`; where it exists but serves fixture data it says `(stubbed)` with the file path. Paths are repo-relative; the repository has no `src/` root — contexts live under `libs/contexts/<ctx>/src/…` and the platform under `libs/platform/src/…`.

Conventions confirmed against the serializers (details in §2.0):

- Money is `{ amountMinor: string, currency: string, display: string }` — `libs/platform/src/http/dto/money.dto.ts`, formatted by `Money.toWire()` in `libs/shared-kernel/src/money/money.ts:222-237`.
- Dates are ISO-8601 UTC strings (`2026-08-31T12:00:00.000Z`) — every DTO types them `string`; the one live conversion is `toISOString()` in `libs/contexts/identity/src/presentation/http/buyer/buyer-auth.controller.ts:116-117`; fixtures hard-code ISO strings.
- Ids are UUIDv7 — `newId()` in `libs/shared-kernel/src/ids.ts` (`uuid` v7). Exceptions: fixture ids are hand-written fake v7s (`0199aa00-0000-7000-8000-…`), and `@IsUUID()` accepts any UUID version.
- Exception: `AuthUserDto.customerNumber` is a JSON **number** (`100042`) while `MeDto.customerNumber` is a **string** (`TS-C-000101`) — two wire types for one concept (§8).

---

## 0. Status of the API on 2026-09-03

**Slice / milestone.** Slice 1 window (opened 2026-08-23). The infrastructure platform M1.1–M1.17 is built; the business contexts are in the **endpoint sprint**: every S1–S3 endpoint is published as a `mock-only` stub (fully decorated controller serving fixture data, nothing persists) and is made real context by context afterwards. `STATUS.md` → *Right now*.

**What actually responds today.** Every public and buyer route in the snapshot has a handler. Only three groups are backed by a database:

| Backing | Endpoints | Evidence |
|---|---|---|
| **live** (Postgres/Redis) | `POST public/auth/otp/request`, `otp/verify`, `refresh`; `POST buyer/auth/logout`, `logout-all`; `GET/DELETE buyer/auth/sessions`; `GET public/geo/tree`; `GET public/currencies`; `GET public/ping`; `GET /.well-known/jwks.json`; `GET public/dev/last-otp` (non-production only) | `libs/contexts/identity/src/application/commands/auth.service.ts`; `libs/contexts/geo/src/application/queries/geo-tree.query.ts` → `GeoRepository`; `libs/contexts/ref/src/application/queries/list-currencies.query.ts` → `CurrencyRepository` |
| **stubbed** (fixture data, real auth, real validation, no persistence) | everything else: me, addresses, markets, i18n messages, media read, categories (+ form-schema, filters, import-template **A6/A7**), products (+ `attrs`/`facets` **A6**), stores, search + suggest **(A6)**, carts (+ coupon validate **A7**), checkout, orders, reasons, payment methods, payment intents **(A7)**, reviews **(A7)**, devices + notification preferences **(A6)**, pages, slots, pre-registrations, QR, track, merchant applications | each file carries the header `// Endpoint sprint (2026-09-01): mock-only stub — fixture data…` (A6/A7 files say "Mock-only during the endpoint sprint"); per-route file paths in §1 |
| **refused by design** | `POST public/auth/oauth/google`, `POST public/auth/oauth/apple` — validate the body, then answer **503 `auth.provider_unavailable`** on every call; the 200 `TokenPairDto` in the snapshot documents the future contract only | `libs/contexts/identity/src/presentation/http/public/public-oauth.controller.ts` |

**Live host.** `https://api.trendsy.chato-app.com` (interim shared host, not staging, not production — `STATUS.md` → *Deployed*). Redeployed 2026-09-03 with batch A7 (commit `7bbaeab`); `STATUS.md` records `/docs` at 70 operations matching the committed snapshot, so every route in this file is on the live host. **(A7)**

**OpenAPI.** Generated files: `docs/api/openapi/buyer.json`, `merchant.json`, `admin.json` (v0.0.0, last refreshed 2026-09-03, batch A7). Live documents: `/docs-json`, `/docs/merchant-json`, `/docs/admin-json`; Swagger UI at `/docs` (now sent `Cache-Control: no-store`, commit `8dc351e`). Gate: `pnpm openapi:diff` (oasdiff). Buyer document: **70 operations, 113 schemas** (counted from the snapshot; +17 operations and +37 schemas −1 since `da92ac8`). One rename a generated client sees as a type change: `GET public/products` answers `ProductListResponseDto` (= the old `PaginatedProductCardDto` + a required `facets[]`).

**Prism mock.** `pnpm mock` → `node tools/scripts/openapi.mjs mock` (Prism pinned 5.14.2, port 4010, `--cors`); `pnpm mock:dynamic` for schema-generated values. Named problem examples replay with `Prefer: code=<code>`.

**Base URLs** (snapshot `servers`, fed by `PUBLIC_API_URL` in `libs/platform/src/config/env.schema.ts`; `.env.example:37` default `http://localhost:3000`):

| Environment | URL |
|---|---|
| Local (`pnpm dev`) | `http://localhost:3000` |
| Interim shared host | `https://api.trendsy.chato-app.com` |
| Production | `https://api.trendsy.example` — placeholder until the brand/domain decision |

Media base: `MEDIA_PUBLIC_BASE_URL` (`.env.example:115`, `http://localhost:9000/trendsy-media/public` locally, "CDN prefix in production"). Fixture image URLs use the placeholder host `https://cdn.trendsy.example/public/fixtures/…` (§7).

**Missing from code versus `docs/api/endpoints-by-slice.md`.** **Every** S1–S3 `public/…` and `buyer/…` row now has a handler (Phase A of the endpoint sprint is complete, `STATUS.md` → *Right now*). Nothing buyer-facing is `planned` without code any more; what is still absent is *behaviour*, not routes — see the "stubbed" notes per row in §1 and the `(not in code)` markers in §2–§9.

**Global wire facts** (`libs/platform/src/http/setup/audience.ts`, `configure-http-app.ts`): prefix `/api/v1`, audiences `public|buyer|merchant|admin|webhooks|integrations`; `health/live`, `health/ready`, `metrics`, `.well-known/jwks.json` sit outside the prefix; request body limit 1 MB; every response carries `X-Request-Id` and `X-Api-Version`.

---

## 1. Endpoint catalogue

Legend. **Auth**: `guest` = `@RequireAbility` whose permission is in the seeded `guest` role, so anonymous callers pass (`libs/contexts/identity/src/domain/role-catalogue.seed.ts:72-100`); `bearer` = access token with `aud: buyer`; `anon-token` = `X-Anonymous-Token` header (documented; the stub does not verify it). **Idem** = `Idempotency-Key` header: `doc` means required by `@ApiHeader` only — `@Idempotent` is not attached yet (`libs/contexts/orders/src/presentation/http/buyer/orders.controller.ts:32-41`, the store table is unmigrated). **ETag** = `@Cacheable({ ttl: 300 })` → strong ETag, `Cache-Control: public, max-age=300`, 304 on `If-None-Match`; honoured only on the `public` audience, so no buyer route ever has one. Common error codes on every route are omitted from the table: `rate_limit.exceeded` (429 + `Retry-After`), `internal` (500), and on bearer routes `auth.token_missing`, `auth.token_expired` (401), `auth.forbidden` (403). `lang` = optional `?lang=` override (`@MaxLength(8)`, pattern `^[a-zA-Z-]+$`; unsupported values silently fall back). Pagination fields are the platform mixin: `limit` int 1–100 default 20, `cursor` ≤ 512 chars `[A-Za-z0-9_-]`, `sort` `^-?[a-zA-Z][a-zA-Z0-9_]{0,39}$` (`libs/platform/src/http/dto/cursor-pagination.query.dto.ts`). **No public or buyer handler calls `parseSort`**: `sort` is validated by pattern and then ignored, and no allowed-key list exists in code (DOC≠CODE: the snapshot descriptions say "allowed keys are listed per endpoint").

### 1.1 `public` audience

| Method + path | Auth | Query / path params | Body DTO | Response (status) | Extra error codes | Idem | ETag | Status | Source |
|---|---|---|---|---|---|---|---|---|---|
| `GET /api/v1/public/ping` | none | — | — | `PingResponseDto` (200) | — | no | no | live | `apps/api/src/ping/ping.controller.ts` |
| `POST /api/v1/public/auth/otp/request` | none; `@RateLimit('otpPhone','otpDevice','otpIp')` | — | `OtpRequestDto` | `OtpRequestResponseDto` (**202**) | `identity.phone_invalid` 422, `auth.otp_cooldown` 429, `validation.failed` | no | no | live | `libs/contexts/identity/src/presentation/http/public/public-auth.controller.ts` |
| `POST /api/v1/public/auth/otp/verify` | none; `@RateLimit('otpIp')` | — | `OtpVerifyDto` | `TokenPairDto` (200) | `auth.otp_invalid`, `auth.otp_expired` 422, `auth.otp_attempts_exceeded` 429, `auth.account_suspended` 403, `validation.failed` | no | no | live | same |
| `POST /api/v1/public/auth/refresh` | none; `@RateLimit('public')` | — | `RefreshDto` (or cookie) | `TokenPairDto` (200) | `auth.token_invalid`, `auth.refresh_reused` 401, `auth.account_suspended` 403, `validation.failed` | no | no | live | same |
| `POST /api/v1/public/auth/oauth/google` **(A7)** | none; `@RateLimit('public')` (`public-oauth.controller.ts:64`) | — | `OAuthSignInDto` `{ idToken, locale?, device? }` | documented `TokenPairDto` (200) — **never served** | **always 503 `auth.provider_unavailable`**; `validation.failed` | no | no | refused by design: body validated and discarded, no provider called, no token, no cookie | `libs/contexts/identity/src/presentation/http/public/public-oauth.controller.ts` |
| `POST /api/v1/public/auth/oauth/apple` **(A7)** | none; `@RateLimit('public')` (`:89`) | — | `OAuthSignInDto` | documented `TokenPairDto` (200) — never served | always 503 `auth.provider_unavailable` | no | no | same | same |
| `GET /api/v1/public/dev/last-otp?phone=` | `@Public()`; only registered when `DEV_ENDPOINTS_ENABLED` | `phone` ≤ 20, `^[0-9+()\s-]+$` | — | `{ code }` (200) | 404 `auth.challenge_not_found` when disabled | no | no | live, off on the shared host | `…/public/dev-otp.controller.ts` |
| `GET /api/v1/public/geo/tree` | guest (`geo:read`) | `lang` | — | `GeoTreeResponseDto` (200) | — | no | **yes** | live | `libs/contexts/geo/src/presentation/http/public/geo.controller.ts` |
| `GET /api/v1/public/markets` | guest (`markets:read`) | `lang` | — | `MarketListDto` (200) | — | no | yes | stubbed `libs/contexts/geo/src/application/queries/list-markets.query.ts` | `…/public/markets.controller.ts` |
| `GET /api/v1/public/markets/{idOrSlug}` | guest | `idOrSlug` ≤ 64, `^[a-zA-Z0-9-]+$`; `lang` | — | `MarketDto` (200) | `geo.market_not_found` 404, `validation.failed` | no | yes | stubbed | same |
| `GET /api/v1/public/currencies` | guest (`currencies:read`) | none (no query DTO; `lang` still resolved) | — | `CurrencyListDto` (200) | — | no | yes | live | `libs/contexts/ref/src/presentation/http/public/currencies.public.controller.ts` |
| `GET /api/v1/public/i18n/messages?ns=` | guest (`i18n:read`) | `ns` **required** ≤ 64 `^[a-z0-9_]+$`; `lang` | — | `MessagesResponseDto` (200) | `validation.failed` | no | yes | stubbed `libs/contexts/i18n/src/application/queries/get-public-messages.query.ts` | `libs/contexts/i18n/src/presentation/http/public/messages.controller.ts` |
| `GET /api/v1/public/media/{id}` | guest (`media:read`) | `id` uuid | — | `MediaAssetDto` (200) | `media.asset_not_found` 404, `validation.failed` | no | **no** (status must not be cached) | stubbed `libs/contexts/media/src/domain/media.fixtures.ts` | `libs/contexts/media/src/presentation/http/public/media-public.controller.ts` |
| `GET /api/v1/public/categories` | guest (`catalog:read`) | `lang` | — | `CategoryTreeResponseDto` (200) | — | no | yes | stubbed `libs/contexts/catalog/src/domain/catalog.fixtures.ts` | `libs/contexts/catalog/src/presentation/http/public/categories.controller.ts` |
| `GET /api/v1/public/categories/{id}/form-schema` **(A6)** | guest (`catalog:read`) | `id` uuid (any depth — a subcategory inherits its nearest bound ancestor); `lang` | — | `CategoryFormSchemaResponseDto` (200) | `catalog.category_not_found` 404, `validation.failed` | no | yes | stubbed `libs/contexts/catalog/src/application/queries/catalog-attributes-stub.service.ts` (fixture dictionary, §5.12) — a merchant-form definition; buyer screens only need `/filters` | `libs/contexts/catalog/src/presentation/http/public/categories.controller.ts:52-73` |
| `GET /api/v1/public/categories/{id}/filters` **(A6)** | guest | `id` uuid; `lang` | — | `CategoryFiltersResponseDto` (200) | `catalog.category_not_found` 404, `validation.failed` | no | yes | stubbed — counts over the fixture catalogue's **subtree**; values with count 0 are omitted | same `:75-96` |
| `GET /api/v1/public/categories/{id}/import-template` **(A7)** | guest | `id` uuid; `lang` | — | `ImportTemplateDto` (200) | `catalog.category_not_found` 404, `validation.failed` | no | yes | stubbed — a merchant-panel bulk-import descriptor (JSON, not a file); not buyer-facing, listed because it is on the `public` audience | `…/public/import-template.controller.ts` |
| `GET /api/v1/public/products` **(A6)** | guest | `ProductListQueryDto`: `limit`, `cursor`, `sort`, `categoryId` uuid (**subtree**: a leaf or any ancestor), `marketId` uuid, `storeId` uuid, `q` ≤ 200, `priceMin`/`priceMax` decimal-string minor units `^\d+$`, **`attrs` repeatable `<code>:<optionCode>`** (AND across codes, OR within one code; a comma-joined value is 422), `lang` | — | **`ProductListResponseDto`** (200) = page + `facets[]` (§2.8) | `validation.failed` | no | yes | stubbed — `storeId`, `categoryId` (subtree) and `attrs` filter; `q`, `marketId`, price band, `sort`, `cursor` validated and ignored; every page is page one; facets computed over the whole filtered set, not the page (`…/application/queries/list-products.query.ts`) | `…/public/products.controller.ts` |
| `GET /api/v1/public/products/{idOrSlug}` | guest | `idOrSlug` ≤ 100 `^[a-zA-Z0-9-]+$`; `lang` | — | `ProductDetailResponseDto` (200) — `attributes[].valueCode` added **(A6)** | `catalog.product_not_found` 404, `validation.failed` | no | yes | stubbed | same |
| `GET /api/v1/public/products/{id}/reviews` **(A7)** | guest (`reviews:read`) | `id` = product **uuid only** (no slug); `limit`, `cursor`, `sort`, `rating` int 1–5 (exact match), `lang` | — | `PaginatedPublicReviewDto` (200) = page + `summary{}` (§2.25) | `reviews.product_not_found` 404 (also for the draft product), `validation.failed` | no | **no** (no `@Cacheable`) | stubbed `libs/contexts/reviews/src/application/queries/reviews-public-stub.service.ts`: baklava `…0301` → 2 reviews (5★, 3★, average 4); brocade `…0302` → 0 (its only review is `hidden`); `rating` filters honestly, page one always | `libs/contexts/reviews/src/presentation/http/public/product-reviews.controller.ts` |
| `POST /api/v1/public/reviews/{id}/report` **(A7)** | guest (`reviews:report`); `@RateLimit('prereg')` | `id` review uuid | `ReportReviewDto` `{ reason, note? }` | `ReviewReportReceiptDto` (**202**) | `reviews.not_found` 404 (an already-hidden review 404s identically — never a probe), `validation.failed` | no | no | stubbed (fixture receipt `…0c06`; nothing persists; not audited) | `…/public/review-reports.controller.ts` |
| `GET /api/v1/public/search` **(A6)** | guest (`catalog:read`) | `q` **required** 1–200; `limit`, `cursor`, `sort`; `categoryId` uuid (ancestry match), `marketId` uuid; `lang` | — | `PaginatedSearchHitDto` (200) | `validation.failed` | no | **no** | stubbed `libs/contexts/search/src/application/queries/search-stub.service.ts` — term match over a fixture term list with Arabic folding (§5.16); بقلاوة/baklava → product 1, قماش/brocade → product 2, else empty; no ranking, page one always | `libs/contexts/search/src/presentation/http/public/search.controller.ts` |
| `GET /api/v1/public/search/suggest` **(A6)** | guest | `q` required 1–200; `lang` | — | `SuggestionListDto` (200, uncursored) | `validation.failed` | no | no | stubbed — four fixture terms, products before categories | same `:63-80` |
| `GET /api/v1/public/stores/{idOrSlug}` | guest (`stores:read`) | `idOrSlug` ≤ 100 `^[a-zA-Z0-9-]+$`; `lang` | — | `StoreResponseDto` (200) | `merchants.store_not_found` 404, `validation.failed` | no | yes | stubbed `libs/contexts/merchants/src/domain/merchants.fixtures.ts` | `libs/contexts/merchants/src/presentation/http/public/stores.controller.ts` |
| `GET /api/v1/public/stores/{id}/products` | guest | `id` **uuid only** (no slug); `limit`, `cursor`, `sort`, `lang`; no filters | — | `PaginatedStoreProductCardDto` (200) | `merchants.store_not_found` 404, `validation.failed` | no | yes | stubbed, page one always | same |
| `POST /api/v1/public/merchants/applications` | guest (`merchant_applications:create`); `@RateLimit('prereg')` | — | `CreateMerchantApplicationDto` | `MerchantApplicationDto` (**201**) | `validation.failed` | no | no | stubbed (Slice 2 row, not buyer-facing) | `…/public/merchant-applications.controller.ts` |
| `GET /api/v1/public/pages/{slug}` | guest (`content:read`) | `slug` ≤ 64 `^[a-z0-9-]+$`; `lang` | — | `PageDto` (200) | `content.page_not_found` 404, `validation.failed` | no | yes | stubbed `libs/contexts/content/src/domain/content.fixtures.ts` | `libs/contexts/content/src/presentation/http/public/pages.controller.ts` |
| `GET /api/v1/public/slots/{code}` | guest | `code` ≤ 64 `^[a-z0-9_]+$`; `lang` | — | `SlotDto` (200) | `content.slot_not_found` 404, `validation.failed` | no | yes | stubbed | `…/public/slots.controller.ts` |
| `POST /api/v1/public/carts` | guest (`cart:write`) | — | none | `GuestCartCreatedDto` (**201**) | — | no | no | stubbed `libs/contexts/cart/src/application/cart-stub.service.ts` — answers the two-line fixture cart, not an empty one | `libs/contexts/cart/src/presentation/http/public/guest-cart.controller.ts` |
| `GET /api/v1/public/carts/{id}` | guest + anon-token | `id` uuid; `lang` | — | `CartDto` (200) | `cart.not_found` 404, `validation.failed` | no | no (`private, no-store`) | stubbed | same |
| `POST /api/v1/public/carts/{id}/items` | guest + anon-token | `id` uuid | `AddItemDto` | `CartDto` (**200**) | `cart.not_found`, `validation.failed` | no | no | stubbed (cart returned unchanged) | same |
| `PATCH /api/v1/public/carts/{id}/items/{itemId}` | guest + anon-token | `id`, `itemId` uuid | `UpdateItemDto` | `CartDto` (200) | `cart.not_found`, `cart.item_not_found` 404, `validation.failed` | no | no | stubbed | same |
| `DELETE /api/v1/public/carts/{id}/items/{itemId}` | guest + anon-token | `id`, `itemId` uuid | — | `CartDto` (**200**, not 204) | `cart.not_found`, `cart.item_not_found`, `validation.failed` | no | no | stubbed | same |
| `GET /api/v1/public/order-reasons?kind=` | guest (`order_reasons:read`) | `kind` **required** ∈ `cancel|reject|delivery_failed|return`; `lang` | — | `OrderReasonListDto` (200) | `validation.failed` | no | yes | stubbed `libs/contexts/orders/src/domain/orders.fixtures.ts:292` | `libs/contexts/orders/src/presentation/http/public/order-reasons.controller.ts` |
| `GET /api/v1/public/payment-methods` | guest (`payment_methods:read`) | `geoNodeId` uuid (reserved, unread); `lang` | — | `PaymentMethodListDto` (200) | `validation.failed` | no | yes | stubbed `libs/contexts/payments/src/domain/payments.fixtures.ts` | `libs/contexts/payments/src/presentation/http/public/payments-public.controller.ts` |
| `POST /api/v1/public/pre-registrations` | guest (`pre_registrations:create`); `@RateLimit('prereg')` | — | `PreRegistrationRequestDto` | `PreRegistrationResponseDto` (**201**) | `validation.failed` | no | no | stubbed (nothing stored) | `libs/contexts/analytics/src/presentation/http/public/analytics-public.controller.ts` |
| `GET /api/v1/public/qr/{code}` | guest (`analytics:track`) | `code` `^[A-Za-z0-9_-]{1,64}$` | — | **302** + `Location` | `validation.failed` | no | no | stubbed (scan not recorded) | same |
| `POST /api/v1/public/track` | guest (`analytics:track`) | — | `TrackEventRequestDto` | `TrackResponseDto` (**202**) | `validation.failed` | no | no | stubbed (nothing stored) | same |

### 1.2 `buyer` audience

Every route: `@ApiBearerAuth()`, `aud` must be `buyer` (a merchant/admin token answers 403 `auth.wrong_audience`). None carries `@Cacheable` or `@RateLimit` (the `auth` bucket applies per user: 600/min, §7.3).

| Method + path | Ability (all held by `buyer`) | Params | Body DTO | Response (status) | Extra error codes | Idem | Status | Source |
|---|---|---|---|---|---|---|---|---|
| `POST /api/v1/buyer/auth/logout` | `session:end` | — | — | **204**; clears the refresh cookie | — | no | live | `libs/contexts/identity/src/presentation/http/buyer/buyer-auth.controller.ts` |
| `POST /api/v1/buyer/auth/logout-all` | `session:end` | — | — | 204 | — | no | live | same |
| `GET /api/v1/buyer/auth/sessions` | `session:read` | none (uncursored, capped at 50) | — | `SessionListDto` (200) | — | no | live | same |
| `DELETE /api/v1/buyer/auth/sessions/{id}` | `session:end` | `id` uuid | — | 204 always (never a probe) | `validation.failed` | no | live | same |
| `GET /api/v1/buyer/me` | `profile:read:self` | — | — | `MeDto` (200) | — | no | stubbed `libs/contexts/identity/src/domain/profile.fixtures.ts` (`ME_FIXTURE`) | `…/buyer/me.controller.ts` |
| `PATCH /api/v1/buyer/me` | `profile:update:self` | — | `UpdateMeDto` | `MeDto` (200) | `validation.failed` | no | stubbed (echoes the fixture with the new `locale`) | same |
| `DELETE /api/v1/buyer/me` | `profile:delete:self` | — | — | 204 | — | no | stubbed (`DeleteMeCommand` is a no-op, `…/application/queries/profile-stub.queries.ts:35-39`) | same |
| `GET /api/v1/buyer/addresses` | `addresses:read` | none (uncursored, "default first") | — | `AddressListDto` (200) | — | no | stubbed (`ADDRESS_FIXTURES`, one row) | `…/buyer/addresses.controller.ts` |
| `POST /api/v1/buyer/addresses` | `addresses:write` | — | `AddressInputDto` | `AddressDto` (**201**) | `validation.failed` | no | stubbed (answers id `…0112`, `isDefault: false`) | same |
| `PATCH /api/v1/buyer/addresses/{id}` | `addresses:write` | `id` uuid | `UpdateAddressInputDto` | `AddressDto` (200) | `identity.address_not_found` 404, `validation.failed` | no | stubbed | same |
| `DELETE /api/v1/buyer/addresses/{id}` | `addresses:write` | `id` uuid | — | 204 always | `validation.failed` | no | stubbed | same |
| `GET /api/v1/buyer/cart` | `cart:read` | `lang` | — | `CartDto` (200) | — | no | stubbed (`kind: 'user'` copy of the fixture cart) | `libs/contexts/cart/src/presentation/http/buyer/buyer-cart.controller.ts` |
| `POST /api/v1/buyer/cart/items` | `cart:write` | — | `AddItemDto` | `CartDto` (**200**) | `validation.failed` | no | stubbed | same |
| `PATCH /api/v1/buyer/cart/items/{itemId}` | `cart:write` | `itemId` uuid | `UpdateItemDto` | `CartDto` (200) | `cart.item_not_found` 404, `validation.failed` | no | stubbed | same |
| `DELETE /api/v1/buyer/cart/items/{itemId}` | `cart:write` | `itemId` uuid | — | `CartDto` (**200**) | `cart.item_not_found`, `validation.failed` | no | stubbed | same |
| `POST /api/v1/buyer/carts/merge` | `cart:write` + `X-Anonymous-Token` | — | **no body** — the header is the input | `CartDto` (200) | `cart.not_found` 404 | no | stubbed | same |
| `PUT /api/v1/buyer/cart/coupon` | `cart:write` | — | `SetCouponDto` | `CartDto` (200) | `validation.failed` | no | stubbed (code echoed, totals unchanged) | same |
| `POST /api/v1/buyer/cart/coupon/validate` **(A7)** | `cart:write` | — | `ValidateCouponDto` `{ code }` | `CouponValidationDto` (**200 even when invalid** — `valid:false` + typed `reason`, §2.21) | `validation.failed` only (a wrong code is never an error) | no | stubbed `libs/contexts/cart/src/application/queries/cart-coupon-stub.service.ts`: `AHLAN10` → valid, 2,050,000 off; `SOUQ25` → `expired` with terms; anything else `unknown_code`; nothing attached to the cart | same `:175-199` |
| `POST /api/v1/buyer/payments/intents` **(A7)** | `payments:create`; `@Audited` | — | `CreatePaymentIntentDto` `{ orderId, provider, returnUrl? }` | `PaymentIntentDto` (**201**) | `payments.order_not_found` 404, `payments.invalid_transition` 409 (order already paid), the four `idempotency.*`, `validation.failed` | **doc** | stubbed `libs/contexts/payments/src/application/queries/payments-buyer-stub.service.ts`: only TS-000131 `…0604` is payable → intent `…0811` with the requested provider's checkout URL; TS-000124 `…0602` → 409; other ids → 404; nothing persists | `libs/contexts/payments/src/presentation/http/buyer/payments-buyer.controller.ts` |
| `GET /api/v1/buyer/payments/intents/{id}` **(A7)** | `payments:read:self` | `id` uuid; `lang` | — | `PaymentIntentDto` (200) | `payments.intent_not_found` 404, `validation.failed` | no | stubbed: `…0811` `requires_action` (always `sham_cash`, whatever the create asked for), `…0812` `succeeded` on TS-000124; ownership not filtered | same |
| `POST /api/v1/buyer/devices` **(A6)** | `notifications:manage:self`; `@Audited` | — | `RegisterDeviceDto` `{ platform, token, deviceId?, appVersion? }` | `RegisteredDeviceDto` (**201**) — never echoes `token` | `validation.failed` | no | stubbed (fixture registration `…0b51`) | `libs/contexts/notifications/src/presentation/http/buyer/devices.controller.ts` |
| `DELETE /api/v1/buyer/devices/{id}` **(A6)** | `notifications:manage:self`; `@Audited` | `id` uuid | — | 204 always (never a probe) | `validation.failed` | no | stubbed | same |
| `GET /api/v1/buyer/notification-preferences` **(A6)** | `notifications:manage:self` | `lang` | — | `NotificationPreferencesDto` (200, uncursored) | — | no | stubbed (`CHANNEL_PREFERENCE_FIXTURES`, `TOPIC_PREFERENCE_FIXTURES`) | `…/buyer/notification-preferences.controller.ts` |
| `PUT /api/v1/buyer/notification-preferences` **(A6)** | `notifications:manage:self`; `@Audited` | `lang` | `UpdateNotificationPreferencesDto` `{ channels[], topics[] }` (both arrays required, `[]` = change none; omitted switches keep their value) | `NotificationPreferencesDto` (200) | `notifications.channel_unknown`, `topic_unknown`, `channel_required`, `topic_required` 422, `validation.failed` | no | stubbed (validated against the real rules in `…/domain/notification-preferences.ts`; nothing persists) | same |
| `POST /api/v1/buyer/reviews` **(A7)** | `reviews:create`; `@Audited` | — | `CreateReviewDto` `{ productId, rating, title?, body }` | `BuyerReviewDto` (**201**) | `reviews.product_not_found` 404, `reviews.already_reviewed` 409, `reviews.purchase_required` 422, `validation.failed` | no | stubbed `libs/contexts/reviews/src/application/queries/reviews-buyer-stub.service.ts`: buyer is always رانيا; brocade `…0302` → 201 (`…0c04`, echoing `rating`/`title`/`body`), baklava `…0301` → 409, draft `…0303` → 422, other → 404 | `libs/contexts/reviews/src/presentation/http/buyer/buyer-reviews.controller.ts` |
| `POST /api/v1/buyer/checkouts` | `checkout:create`; `@Audited` | — | `CreateCheckoutDto` | `CheckoutResponseDto` (**201**) | `idempotency.key_required`, `idempotency.key_invalid` 400, `idempotency.in_progress` 409, `idempotency.key_reused` 422, `validation.failed` | **doc** | stubbed (always the canonical checkout `…0600` with TS-000123 + TS-000124) | `libs/contexts/orders/src/presentation/http/buyer/orders.controller.ts` |
| `GET /api/v1/buyer/checkouts/{id}` | `orders:read:self` | `id` uuid; `lang` | — | `CheckoutResponseDto` (200) | `orders.checkout_not_found` 404, `validation.failed` | no | stubbed | same |
| `GET /api/v1/buyer/orders` | `orders:read:self` | `limit`, `cursor`, `sort` (documented: only `-createdAt`; ignored), `status` ∈ the 13 order statuses, `lang` | — | `PaginatedOrderSummaryDto` (200) | `validation.failed` | no | stubbed (four fixture orders; `status` filter applied; page one always) | same |
| `GET /api/v1/buyer/orders/{id}` | `orders:read:self` | `id` uuid; `lang` | — | `OrderDetailDto` (200) | `orders.not_found` 404, `validation.failed` | no | stubbed | same |
| `GET /api/v1/buyer/orders/{id}/events` | `orders:read:self` | `id` uuid; `lang` | — | `OrderEventListDto` (200, unpaginated) | `orders.not_found`, `validation.failed` | no | stubbed | same |
| `POST /api/v1/buyer/orders/{id}/cancel` | `orders:cancel:self`; `@Audited` | `id` uuid | `CancelOrderDto` | `OrderDetailDto` (**200**) | `orders.not_found` 404, `orders.invalid_transition` 409, the four `idempotency.*`, `validation.failed` | **doc** | stubbed — the transition is checked against the real table and simulated | same |
| `POST /api/v1/buyer/orders/{id}/reorder` | `cart:write` (deliberately the cart permission); `@Audited` | `id` uuid | — | `ReorderResponseDto` (200) | `orders.not_found`, `validation.failed` | no | stubbed (`{ cartId: …0501, addedCount: 1, skipped: [] }` hard-coded) | same |
| `GET /api/v1/buyer/orders/{id}/shipment` | `shipments:read:self` | `id` = **order** id uuid | — | `ShipmentDto` (200) | `shipping.shipment_not_found` 404 (any order before `accepted`), `auth.wrong_audience` 403, `validation.failed` | no | stubbed (`SHIPMENT_BY_ORDER`; ownership not filtered) — live on the host since the A7 deploy | `libs/contexts/shipping/src/presentation/http/buyer/buyer-shipping.controller.ts` |

### 1.3 Appendix — `merchant/` and `admin/` routes (path only)

`merchant/`: `GET/POST products`, `PATCH products/{id}`, `PUT products/{id}/variants`, `PUT products/{id}/prices`, `PATCH products/{id}/inventory`, `PUT products/{id}/media`, `POST products/{id}/submit` · `GET me` · `POST media/uploads` · `GET/PATCH application`, `POST application/documents`, `POST application/agreement/sign`, `POST application/submit` · `GET/PATCH stores/{id}`, `GET/POST stores/{id}/staff`, `DELETE stores/{id}/staff/{assignmentId}` · `GET orders`, `GET orders/{id}`, `POST orders/{id}/accept|reject|unavailable` · `GET statement`, `GET statement/postings` · `GET orders/{id}/shipment` · **(A7)** `POST products/bulk-import`, `POST products/bulk-price-update` (both 202 + job id), `GET bulk-jobs/{id}` · `GET reviews`, `POST reviews/{id}/reply`.

`admin/`: `GET reports/counters` · `GET audit` · `GET/POST categories`, `PATCH categories/{id}` · `GET/POST products`, `GET/PATCH products/{id}`, `PUT products/{id}/variants|prices`, `PATCH products/{id}/inventory`, `POST products/{id}/submit|approve|reject|publish|unpublish` · `PUT pages/{slug}`, `PUT slots/{code}/items` · `POST geo/nodes`, `PATCH geo/nodes/{id}`, `POST markets`, `PATCH markets/{id}` · `PUT i18n/messages` · `GET me` · `GET users`, `POST users/lookup`, `GET users/{id}`, `POST users/{id}/suspend`, `GET roles`, `POST users/{id}/role-assignments` · `GET ledger/accounts`, `GET ledger/accounts/{code}/postings` · `POST media/uploads` · `GET merchants/applications`, `POST merchants/{id}/verify|request-changes`, `POST merchants/import` · `GET/POST merchants`, `PATCH merchants/{id}`, `POST merchants/{id}/activate|suspend`, `GET/POST stores`, `PATCH stores/{id}` · `GET notifications/deliveries` · `GET orders`, `GET orders/{id}`, `POST orders/{id}/confirm|accept|reject|ship|deliver|delivery-failed|cancel`, `POST orders/{id}/returns`, `POST orders/{id}/returns/{rid}/accept|decline` · `GET/PUT settlement/commission-rules`, `GET settlement/items`, `POST settlement/remittances` · `GET/POST carriers`, `PUT carriers/{id}/zones`, `GET orders/{id}/shipment`, `POST shipments/{id}/events` · **(A6)** `GET/PUT categories/{id}/attributes`, `GET/POST attributes`, `PATCH attributes/{id}`, `PUT attributes/{id}/options` · `GET/POST settlement/reconciliations`, `POST settlement/payouts`, `GET settlement/merchants/{id}/balance` · `GET notifications/templates`, `PUT notifications/templates/{code}` · **(A7)** `GET payments`, `POST payments/{id}/refund` · `GET reviews`, `POST reviews/{id}/hide|restore` · `GET/POST coupons`, `PATCH coupons/{id}`.

---

## 2. Entity data sheets

Reading the tables: **req** = always present in a 200 body; **null** = present but may be `null`; **opt** = may be absent (request bodies only). **Localised** = one string already resolved to the request locale (Arabic fallback); the `{ar,en}` shape (`LocalizedTextDto`) never appears on public/buyer reads. Fixture ids are abbreviated `…0301` for `0199aa00-0000-7000-8000-000000000301`. Snapshot examples use an illustrative price `1250000` → `12,500.00`; the fixture prices are `8500000` (85,000.00) and `12000000` (120,000.00) — the two differ on purpose, so read shapes from the examples and values from §5.

### 2.0 Shared shapes

**MoneyDto** — `libs/platform/src/http/dto/money.dto.ts`

```json
{ "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" }
```

| Field | Type | Design note |
|---|---|---|
| `amountMinor` | string, `^-?\d+$` | Minor units (piastres; SYP exponent 2). Never a JSON number. Negative values are possible in the type but no buyer endpoint emits one. |
| `currency` | string, 3 letters | Always `SYP` today (`libs/contexts/ref/src/domain/currency.seed.ts`). |
| `display` | string | Server-formatted, **digits only — no symbol, no code, no RTL marks** (`libs/shared-kernel/src/money/money.ts:222-237`: `Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2, numberingSystem: 'latn' })`). Latin digits in both languages; `.00` is always kept. Pair it with `CurrencyDto.symbol` (`ل.س` in `ar`, `SYP` in `en`). Both are open decisions (§11). |

**Paginated lists** — `libs/platform/src/http/dto/paginated-response.dto.ts`: `{ items: T[], nextCursor: string | null, hasMore: boolean }`. No `total`. Used by products, store products, orders. Every other list is a named-key envelope with no cursor (`nodes`, `markets`, `currencies`, `methods`, `items` on addresses/sessions, `reasons`, `events`).

**ProblemDetailsDto** — see §6.

### 2.1 User (`MeDto`)

`GET/PATCH buyer/me` — `libs/contexts/identity/src/presentation/http/buyer/dto/me.dto.ts`; fixture `libs/contexts/identity/src/domain/profile.fixtures.ts`.

```json
{
  "id": "0199aa00-0000-7000-8000-000000000101",
  "customerNumber": "TS-C-000101",
  "phone": "+963900000001",
  "locale": "ar",
  "createdAt": "2026-08-26T09:00:00.000Z"
}
```

| Field | Type | Presence | Localised | Source | Design note |
|---|---|---|---|---|---|
| `id` | uuid | req | — | `me.dto.ts` | Equals the token's `sub`. |
| `customerNumber` | string | req | — | `me.dto.ts` | Human number for support, format `TS-C-` + 6 digits by example only (no generator in code). |
| `phone` | string E.164 | req | — | `me.dto.ts` | The sign-in identity; only returned to its owner. |
| `locale` | `ar` \| `en` | req | — | `me.dto.ts` | Persisted preference; the only editable field (`UpdateMeDto.locale`, `@IsIn(['ar','en'])`). |
| `createdAt` | ISO date-time | req | — | `me.dto.ts` | First successful OTP verification. |

Missing that a profile screen would want: **no display name** (the fixture's رانيا الحلبي is never on the wire), no avatar, no email, no `abilities`/`roles` (those exist only on the staff `StaffMeDto`), no marketing-consent flag, no notification preferences (Slice 2 `buyer/notification-preferences` is `planned`). `DELETE buyer/me`: 204, empty body, immediate and irreversible by contract (INV-18 anonymisation: phone removed, id kept, every session revoked); today a no-op stub. No grace period or "scheduled deletion" state exists.

### 2.2 Address (`AddressDto`, `AddressInputDto`, `UpdateAddressInputDto`, `AddressSnapshotDto`)

`libs/contexts/identity/src/presentation/http/buyer/dto/address.dto.ts`; snapshot in `libs/contexts/orders/src/presentation/http/buyer/dto/order.dto.ts`.

```json
{
  "id": "0199aa00-0000-7000-8000-000000000111",
  "label": "المنزل",
  "governorateNodeId": "0199aa00-0000-7000-8000-00000000f001",
  "cityNodeId": "0199aa00-0000-7000-8000-00000000f002",
  "areaNodeId": "0199aa00-0000-7000-8000-00000000f003",
  "neighborhoodNodeId": "0199aa00-0000-7000-8000-00000000f004",
  "description": "بناء الياسمين، طابق ٣، قرب صيدلية الشعلان",
  "phone": "+963900000001",
  "lat": 33.518,
  "lng": 36.293,
  "isDefault": true
}
```

| Field | Type | Read | Create (`POST`) | Update (`PATCH`) | Design note |
|---|---|---|---|---|---|
| `id` | uuid | req | — | — | |
| `label` | string | **null** | opt, ≤ 50 | opt ≤ 50 | **Free text, not an enum.** Examples in code: `المنزل`, `العمل`. Design decides the chips; the API stores whatever is typed. |
| `governorateNodeId` | uuid | req | **req** | opt | Node ids come from `GET public/geo/tree` and are per-environment. |
| `cityNodeId` | uuid | req | **req** | opt | |
| `areaNodeId` | uuid | null | opt | opt | Only Damascus city has this depth today. |
| `neighborhoodNodeId` | uuid | null | opt | opt | Same. |
| `description` | string | req | **req**, ≤ 500 | opt ≤ 500 | Free-text last-metre directions; the only street-level text. |
| `phone` | string | req | **req**, ≤ 20, `^[0-9+()\s-]+$` | opt | Courier contact; may differ from the account phone. |
| `lat` | number | null | opt, −90…90 | opt | Map pin. |
| `lng` | number | null | opt, −180…180 | opt | |
| `isDefault` | boolean | req | **not writable** | not writable | No endpoint sets the default today `(not in code)`; the create stub answers `false`. |

`AddressSnapshotDto` (on orders/checkouts) = the same fields minus `id` and `isDefault`; `label` nullable. Missing: **no resolved place names on the address** (a screen must map the four node ids back through the cached geo tree), no recipient name, no address type, no delivery instructions separate from `description`, no "set default" action.

### 2.3 GeoNode (`GeoNodeDto`)

`GET public/geo/tree` — `libs/contexts/geo/src/presentation/http/public/dto/geo-tree.response.dto.ts`; live data from `libs/contexts/geo/src/domain/geo.seed.ts` (§5.1).

```json
{ "nodes": [ { "id": "…", "code": "SY", "kind": "country", "path": "SY", "name": "سوريا", "lat": null, "lng": null,
  "children": [ { "id": "…", "code": "DMS", "kind": "governorate", "path": "SY.DMS", "name": "محافظة دمشق", "lat": null, "lng": null,
    "children": [ { "id": "…", "code": "DMC", "kind": "city", "path": "SY.DMS.DMC", "name": "مدينة دمشق", "lat": 33.5138, "lng": 36.2765,
      "children": [ { "id": "…", "code": "OLD", "kind": "area", "path": "SY.DMS.DMC.OLD", "name": "دمشق القديمة", "lat": null, "lng": null,
        "children": [ { "id": "…", "code": "HAMIDIYAH", "kind": "neighborhood", "path": "SY.DMS.DMC.OLD.HAMIDIYAH", "name": "الحميدية", "lat": null, "lng": null, "children": [] } ] } ] } ] } ] } ] }
```

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `id` | uuid | req | — | **Minted at seed time per environment** (`libs/contexts/geo/src/infrastructure/persistence/geo.seeder.ts:15-31`). Never hard-code; key on `path`. |
| `code` | string | req | — | Stable, unique among siblings. |
| `kind` | `country`\|`governorate`\|`city`\|`area`\|`neighborhood` | req | — | `libs/contexts/geo/src/domain/value-objects/geo-node.ts`. Depth varies by branch: Damascus city goes to `neighborhood`, every other city is a leaf. |
| `path` | ltree string | req | — | Stable across environments. |
| `name` | string | req | yes | |
| `lat`/`lng` | number | null | — | Set only on `DMC` today; null everywhere else. |
| `children` | array | req | — | Empty array at leaves, never absent. Display order = array order (`sort` column, not exposed). |

Whole tree in one document (98 nodes, ~30 KB in one language), `Cache-Control: public, max-age=300`, a **different ETag per locale**. No search endpoint by design: the client filters the cached tree. Missing: no `status` field (only active nodes are returned), no per-node delivery flag (delivery coverage is a shipping-zone question; the only zone in code is `SY.DMS.DMC` at 5,000.00 SYP — `libs/contexts/shipping/src/domain/shipping.fixtures.ts`).

### 2.4 Market (`MarketDto`)

`GET public/markets`, `GET public/markets/{idOrSlug}` — `libs/contexts/geo/src/presentation/http/public/dto/market.dto.ts`; stub `libs/contexts/geo/src/domain/markets.fixtures.ts` mirroring the seeded `MARKET_SEED`.

```json
{ "id": "0199aa00-0000-7000-8000-00000000c001", "code": "HAMIDIYAH", "kind": "souk", "slug": "hamidiyah",
  "name": "الحميدية", "isFeatured": true, "nodePath": "SY.DMS.DMC.OLD.HAMIDIYAH" }
```

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `id` | uuid | req | — | Per-environment; key on `code`/`slug`. |
| `code` | string | req | — | What stores reference (`marketCode`). |
| `kind` | `souk`\|`mall`\|`street` | req | — | `libs/contexts/geo/src/domain/value-objects/market.ts` |
| `slug` | string | req | — | |
| `name` | string | req | yes | |
| `isFeatured` | boolean | req | — | Exactly five true (§5.2). |
| `nodePath` | string | req | — | Host neighbourhood path; resolve the name through the geo tree. |

List and detail return the identical shape; the list is `{ markets: [...] }` in seed order, 13 rows, no cursor. Missing: **no image, no description, no opening hours, no store count, no geo node id, no coordinates** `(not in code)`. A market screen has only a name, a kind and a neighbourhood.

### 2.5 Merchant (what leaks to buyers)

Nothing. No buyer or public endpoint returns a merchant entity, merchant status, or merchant contact `(not in code)`. The only merchant-derived facts on buyer screens are on the Store (§2.6): `isFoundingPartner`. Merchant statuses (`registered|verified|active|suspended`) never reach a buyer response.

### 2.6 Store (`StoreResponseDto`, `ProductStoreCardDto`)

`GET public/stores/{idOrSlug}` — `libs/contexts/merchants/src/presentation/http/public/dto/store.response.dto.ts`; fixtures `libs/contexts/merchants/src/domain/merchants.fixtures.ts`.

```json
{
  "id": "0199aa00-0000-7000-8000-000000000211",
  "slug": "bayt-al-sham-sweets",
  "name": "بيت الشام للحلويات",
  "description": "محل حلويات شامية عريق في قلب سوق الحميدية، يصنع البقلاوة والحلويات الشرقية يومياً منذ ثلاثة أجيال.",
  "marketCode": "HAMIDIYAH",
  "marketName": "الحميدية",
  "geoPath": "SY.DMS.DMC.OLD.HAMIDIYAH",
  "isFoundingPartner": true,
  "logoUrl": "https://cdn.trendsy.example/public/fixtures/bayt-al-sham-logo.webp"
}
```

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `id`, `slug` | uuid, string | req | — | Deep-link by slug. |
| `name` | string | req | yes | |
| `description` | string | req | yes | Can it be empty? The DTO does not forbid `""`; fixtures are one sentence. Plan a no-description state. |
| `marketCode`, `marketName` | string | req | name yes | No market id or link. |
| `geoPath` | string | req | — | |
| `isFoundingPartner` | boolean | req | — | The BRD §13 badge. |
| `logoUrl` | string | req | — | A bare URL, **not** a variant set; fixtures use `<name>-logo.webp` with no size suffix. |

Embedded on a product (`ProductStoreCardDto`): `id`, `slug`, `name`, `marketCode` only — no logo, no description, no path. Store product list (`GET public/stores/{id}/products`) returns `StoreProductCardDto`, byte-identical in shape to `ProductCardDto` (§2.8). Missing: **no store phone, no opening hours, no cover image, no rating, no product count, no status/open-closed flag, no address beyond `geoPath`** `(not in code)`.

### 2.7 Category (`CategoryDto`)

`GET public/categories` — `libs/contexts/catalog/src/presentation/http/public/dto/category-tree.response.dto.ts`; fixture `libs/contexts/catalog/src/domain/catalog.fixtures.ts`.

```json
{ "categories": [
  { "id": "0199aa00-0000-7000-8000-000000000a01", "slug": "sweets", "name": "حلويات",
    "children": [ { "id": "0199aa00-0000-7000-8000-000000000a11", "slug": "oriental-sweets", "name": "حلويات شرقية", "children": [] } ] },
  { "id": "0199aa00-0000-7000-8000-000000000a02", "slug": "fabrics-textiles", "name": "أقمشة ومنسوجات",
    "children": [ { "id": "0199aa00-0000-7000-8000-000000000a12", "slug": "damascene-fabrics", "name": "أقمشة دمشقية", "children": [] } ] } ] }
```

Four fields, all required; `name` localised; nested to any depth (fixture: 2 levels). Whole tree in one document, ETag-cached. Missing: **no icon/image, no product count, no sort field (array order is the order), no "is leaf" flag beyond `children: []`, no description** `(not in code)`. `categoryId` on a product is the leaf; filtering `GET public/products?categoryId=` by an ancestor is documented as intended but the stub matches the exact id only.

### 2.8 Product (`ProductCardDto`, `ProductDetailResponseDto`)

`libs/contexts/catalog/src/presentation/http/public/dto/product-card.dto.ts`, `product-detail.response.dto.ts`; fixtures `libs/contexts/catalog/src/domain/catalog.fixtures.ts`.

Card (list item, from `GET public/products` and `GET public/stores/{id}/products`):

```json
{
  "id": "0199aa00-0000-7000-8000-000000000301",
  "slug": "mixed-baklava",
  "name": "بقلاوة مشكلة",
  "price": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" },
  "imageUrl": "https://cdn.trendsy.example/public/fixtures/baklava-md.webp",
  "storeId": "0199aa00-0000-7000-8000-000000000211",
  "storeName": "بيت الشام للحلويات",
  "categoryId": "0199aa00-0000-7000-8000-000000000a11"
}
```

Detail = **card + `description`, `variants[]`, `media[]`, `store{}`, `attributes[]`** — one document, nothing dropped, no separate calls:

```json
{
  "id": "0199aa00-0000-7000-8000-000000000301",
  "slug": "mixed-baklava",
  "name": "بقلاوة مشكلة",
  "price": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" },
  "imageUrl": "https://cdn.trendsy.example/public/fixtures/baklava-md.webp",
  "storeId": "0199aa00-0000-7000-8000-000000000211",
  "storeName": "بيت الشام للحلويات",
  "categoryId": "0199aa00-0000-7000-8000-000000000a11",
  "description": "تشكيلة بقلاوة شامية طازجة بالفستق الحلبي والجوز، تُحضّر يومياً في سوق الحميدية.",
  "variants": [
    { "id": "0199aa00-0000-7000-8000-000000000311", "name": "كيلو",
      "price": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" }, "inStock": true }
  ],
  "media": [
    { "assetId": "0199aa00-0000-7000-8000-000000000401",
      "urls": { "thumb": "https://cdn.trendsy.example/public/fixtures/baklava-thumb.webp",
                "sm": "https://cdn.trendsy.example/public/fixtures/baklava-sm.webp",
                "md": "https://cdn.trendsy.example/public/fixtures/baklava-md.webp",
                "lg": "https://cdn.trendsy.example/public/fixtures/baklava-lg.webp",
                "original": "https://cdn.trendsy.example/public/fixtures/baklava-original.webp" } }
  ],
  "store": { "id": "0199aa00-0000-7000-8000-000000000211", "slug": "bayt-al-sham-sweets", "name": "بيت الشام للحلويات", "marketCode": "HAMIDIYAH" },
  "attributes": [
    { "code": "weight", "name": "الوزن", "value": "1 كغ", "valueCode": null },
    { "code": "color", "name": "اللون", "value": "ذهبي", "valueCode": "gold" }
  ]
}
```

**(A6)** The list response is now `ProductListResponseDto` — the page plus a `facets[]` block computed over the whole filtered set (never over the page), with the same shape as `GET public/categories/{id}/filters`:

```json
{
  "items": [ /* ProductCardDto… */ ], "nextCursor": null, "hasMore": false,
  "facets": [
    { "code": "color", "label": "اللون", "type": "select",
      "values": [ { "value": "gold", "label": "ذهبي", "count": 1 } ] }
  ]
}
```

A value nothing in the set carries is omitted, so `count` is never 0. Send a facet back as `?attrs=color:gold` (repeat the parameter per value; repeats of one code widen, different codes narrow). `type` is how a product stores the attribute (`select`/`multi_select`), **not** whether the shopper may multi-select — they always may. Source: `libs/contexts/catalog/src/application/queries/attribute-filters.ts`, `…/public/dto/product-list.query.dto.ts`.

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `id`, `slug` | uuid, string | req | — | Deep-link by slug. |
| `name` | string | req | yes | No length cap on read; admin/merchant input caps `ar`/`en` at 200 (`LocalizedTextInputDto`). |
| `price` | Money | req | — | "From-price (cheapest in-stock variant)"; in the stub literally `variants[0].price` (`…/application/queries/list-products.query.ts:32`). |
| `imageUrl` | string | req | — | Always `media[0].urls.md` (640 px). No product without an image can be represented — a placeholder state is the client's `(not in code)`. |
| `storeId`, `storeName` | uuid, string | req | name yes | |
| `categoryId` | uuid | req | — | Leaf only; no breadcrumb. |
| `description` | string | req (detail) | yes | Input cap 2 000 chars (`LocalizedDescriptionInputDto`). |
| `variants[]` | `ProductVariantDto` | req (detail) | `name` yes | `{ id, name, price, inStock }`. **One flat name per variant — no option axes (colour/size), no SKU, no stock count, no `compareAtPrice`, no unit/weight fields** `(not in code)`. |
| `media[]` | `ProductMediaDto` | req (detail) | — | `{ assetId, urls }`, cover first (array order; no `isPrimary`, no `sortOrder` field). Fixtures: 1 image per product; merchant input cap **20** (`@ArrayMaxSize(20)`, `libs/contexts/catalog/src/presentation/http/merchant/dto/merchant-product.dto.ts:71-83`). |
| `store` | `ProductStoreCardDto` | req (detail) | name yes | |
| `attributes[]` | `ProductAttributeDto` | req (detail) | `name`, `value` yes | `{ code, name, value, valueCode }` — `value` is a resolved string, not typed; **`valueCode` (A6)** is the dictionary option code behind it (`null` for `number`/`text` attributes), so a PDP chip can deep-link `?attrs=<code>:<valueCode>`. Fixtures: baklava `weight`=«1 كغ» + `color`=«ذهبي»/`gold`; brocade `material`=«حرير وقطن» (no code), `fabric_type`=«بروكار»/`brocade`, `color`=«أحمر»/`red`; the draft has none. Note `material` is a free-text attribute **not in the dictionary** (§5.12), so it never appears as a facet. |

**Price / Variant** as separate entities: there is no separate price endpoint or price object; a price is `variant.price` (Money) and `product.price`. Effective-dated prices (ADR-0013) are `(not in code)` in the stub — a variant has one price. Product `status` never reaches the public API; only `published` products are in `PRODUCT_FIXTURES` (§3.2). Missing that a PDP would want: `compareAtPrice`/discount badge, stock quantity or "only N left", delivery estimate, share URL (build it from `slug`), related products, `createdAt`/"new" flag, per-variant images. **Rating and review count are not on the product document** — they come from a second call, `GET public/products/{id}/reviews` → `summary` (§2.25) **(A7)**; the card has no rating either.

### 2.9 Asset / Media (`MediaAssetDto`, `MediaVariantUrlsDto`)

`GET public/media/{id}` — `libs/contexts/media/src/presentation/http/public/dto/media-asset.dto.ts`; variants `libs/contexts/media/src/domain/value-objects/asset.ts`; fixtures `libs/contexts/media/src/domain/media.fixtures.ts`.

```json
{ "id": "0199aa00-0000-7000-8000-000000000401", "status": "ready", "mime": "image/webp", "width": 1024, "height": 1280,
  "urls": { "thumb": "…/baklava-thumb.webp", "sm": "…/baklava-sm.webp", "md": "…/baklava-md.webp", "lg": "…/baklava-lg.webp", "original": "…/baklava-original.webp" } }
```

| Field | Type | Presence | Design note |
|---|---|---|---|
| `status` | `uploading`\|`processing`\|`ready`\|`failed`\|`deleted` | req | `urls` are meaningful only when `ready`; the DTO still types `urls` as required — DOC≠CODE inside the contract itself (description says "present only when ready"). Poll after upload. |
| `mime` | string | req | Always `image/webp` for variants (every published object is a re-encode; EXIF stripped). |
| `width`, `height` | number | req | Source dimensions **as served** (EXIF orientation applied). Fixtures are 1024×1280 (4:5). |
| `urls` | object | req | Widths: `thumb` 160, `sm` 320, `md` 640, `lg` 1280, `original` = source size. Widths are targets; height follows the source ratio — **nothing crops**. Use `object-fit: cover` for fixed boxes. |

Buyer screens never call this endpoint for catalogue images (products embed `urls`); it exists for upload polling and deep links. Uploads are merchant/admin only. Accepted upload types: `image/jpeg`, `image/png`, `image/webp` (`libs/contexts/media/src/domain/value-objects/upload-mime.ts`; HEIC removed 2026-08-31, SVG rejected), ≤ 10 MiB (`MEDIA_MAX_UPLOAD_BYTES`, `.env.example:116`).

### 2.10 Cart, CartItem (`CartDto`, `CartItemDto`, `GuestCartCreatedDto`)

`libs/contexts/cart/src/presentation/http/dto/cart.dto.ts` (one file for guest and buyer); fixtures `libs/contexts/cart/src/domain/cart.fixtures.ts`.

```json
{
  "anonymousToken": "anon_0199aa00mockonlytoken0000000501",
  "cart": {
    "id": "0199aa00-0000-7000-8000-000000000501",
    "kind": "guest",
    "items": [
      { "id": "0199aa00-0000-7000-8000-000000000502", "productId": "0199aa00-0000-7000-8000-000000000301",
        "variantId": "0199aa00-0000-7000-8000-000000000311", "name": "بقلاوة مشكلة", "variantName": "كيلو",
        "unitPrice": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" }, "qty": 1,
        "lineTotal": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" },
        "imageUrl": "https://cdn.trendsy.example/public/fixtures/baklava-md.webp", "available": true },
      { "id": "0199aa00-0000-7000-8000-000000000503", "productId": "0199aa00-0000-7000-8000-000000000302",
        "variantId": "0199aa00-0000-7000-8000-000000000321", "name": "قماش بروكار دمشقي", "variantName": "متر",
        "unitPrice": { "amountMinor": "12000000", "currency": "SYP", "display": "120,000.00" }, "qty": 1,
        "lineTotal": { "amountMinor": "12000000", "currency": "SYP", "display": "120,000.00" },
        "imageUrl": "https://cdn.trendsy.example/public/fixtures/brocade-md.webp", "available": true }
    ],
    "itemsCount": 2,
    "itemsSubtotal": { "amountMinor": "20500000", "currency": "SYP", "display": "205,000.00" },
    "couponCode": null,
    "updatedAt": "2026-08-31T12:00:00.000Z"
  }
}
```

(`POST public/carts` answers this envelope; every other cart route answers the inner `CartDto`.)

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `id` | uuid | req | — | Guest routes carry it in the path; buyer routes have no cart id (one cart per user). |
| `kind` | `guest`\|`user` | req | — | |
| `items[]` | `CartItemDto` | req | `name`, `variantName` yes | `{ id, productId, variantId, name, variantName, unitPrice, qty, lineTotal, imageUrl, available }`. `qty` 1–99. `available: false` = cannot be checked out (stock or store inactive) — the only per-line warning that exists. **Lines are not grouped by store** on the wire; the client groups by `productId → store` only if it fetched the products. |
| `itemsCount` | number | req | — | Number of **lines**, not units. |
| `itemsSubtotal` | Money | req | — | The only total on the cart: **no delivery fee, no discount, no grand total on the cart** `(not in code)` — those appear only on the checkout response. |
| `couponCode` | string | null | — | Stored only; totals never change in Slice 1. |
| `updatedAt` | ISO | req | — | |

Inputs: `AddItemDto { variantId uuid, qty 1–99 }`, `UpdateItemDto { qty 1–99 }`, `SetCouponDto { code ^[A-Z0-9]{3,20}$ }`. Merge (`POST buyer/carts/merge`) takes no body: the guest token header is the input; quantities add and the guest cart is consumed. **Cart warnings (`cart.price_changed`, `cart.item_unavailable`, `cart.store_inactive`) do not exist on the wire** — no `warnings` field, no old/new price payload anywhere under `libs/` (§6.2). DOC≠CODE with `docs/frontend/design-handoff.md` §2 and `docs/api/conventions.md`. Missing: per-store subtotals, delivery estimate per store, a "saved for later" state, stock-limited qty (the cap is a flat 99).

### 2.11 Checkout (`CreateCheckoutDto`, `CheckoutResponseDto`)

`libs/contexts/orders/src/presentation/http/buyer/dto/order.dto.ts`; fixture `libs/contexts/orders/src/domain/orders.fixtures.ts`.

Request (`POST buyer/checkouts`, header `Idempotency-Key` required — `[A-Za-z0-9._-]{8,64}`):

```json
{ "cartId": "0199aa00-0000-7000-8000-000000000501", "addressId": "0199aa00-0000-7000-8000-000000000111",
  "paymentMethodCode": "cod", "couponCode": "AHLAN10", "note": "الرجاء الاتصال قبل الوصول" }
```

`cartId` uuid req · `addressId` uuid req · `paymentMethodCode` `@IsIn(['cod'])` req · `couponCode` opt `^[A-Z0-9]{3,20}$` · `note` opt ≤ 500.

Response (201; the same shape from `GET buyer/checkouts/{id}`):

```json
{
  "id": "0199aa00-0000-7000-8000-000000000600",
  "createdAt": "2026-08-31T10:00:00.000Z",
  "paymentMethodCode": "cod",
  "address": { "governorateNodeId": "…f001", "cityNodeId": "…f002", "areaNodeId": "…f003", "neighborhoodNodeId": "…f004",
               "description": "بناء الياسمين، طابق ٣، قرب صيدلية الشعلان", "phone": "+963900000001", "lat": 33.518, "lng": 36.293, "label": "المنزل" },
  "orders": [
    { "id": "0199aa00-0000-7000-8000-000000000601", "orderNumber": "TS-000123", "checkoutId": "0199aa00-0000-7000-8000-000000000600",
      "storeId": "0199aa00-0000-7000-8000-000000000211", "storeName": "بيت الشام للحلويات", "status": "placed", "statusLabel": "بانتظار التأكيد",
      "itemsCount": 1, "total": { "amountMinor": "9000000", "currency": "SYP", "display": "90,000.00" }, "createdAt": "2026-08-31T10:00:00.000Z" },
    { "id": "0199aa00-0000-7000-8000-000000000602", "orderNumber": "TS-000124", "checkoutId": "0199aa00-0000-7000-8000-000000000600",
      "storeId": "0199aa00-0000-7000-8000-000000000212", "storeName": "أنوال دمشق", "status": "shipped", "statusLabel": "في الطريق إليك",
      "itemsCount": 1, "total": { "amountMinor": "12500000", "currency": "SYP", "display": "125,000.00" }, "createdAt": "2026-08-31T10:00:00.000Z" }
  ],
  "itemsSubtotal": { "amountMinor": "20500000", "currency": "SYP", "display": "205,000.00" },
  "deliveryFee": { "amountMinor": "1000000", "currency": "SYP", "display": "10,000.00" },
  "discount": { "amountMinor": "0", "currency": "SYP", "display": "0.00" },
  "grandTotal": { "amountMinor": "21500000", "currency": "SYP", "display": "215,000.00" }
}
```

One checkout → **one order per store** (ADR-0017); `orders[]` are `OrderSummaryDto`. `deliveryFee` is the **sum** of per-order fees (5,000.00 SYP per store from the single `manual` carrier zone). **No delivery window / ETA, no per-store delivery fee breakdown before placing, no "estimate" endpoint, no order-preview step** `(not in code)` — the first time a buyer sees the delivery fee is in the 201 response. The `note` is accepted but not echoed back anywhere `(not in code)`. `couponCode` is stored, `discount` stays `0`.

### 2.12 Order, OrderLine (`OrderSummaryDto`, `OrderDetailDto`, `OrderLineDto`)

Same DTO file. Summary (list rows, checkout `orders[]`) = the first ten fields below; detail adds the rest. Events are **not** embedded (§2.13).

```json
{
  "id": "0199aa00-0000-7000-8000-000000000601",
  "orderNumber": "TS-000123",
  "checkoutId": "0199aa00-0000-7000-8000-000000000600",
  "storeId": "0199aa00-0000-7000-8000-000000000211",
  "storeName": "بيت الشام للحلويات",
  "status": "placed",
  "statusLabel": "بانتظار التأكيد",
  "itemsCount": 1,
  "total": { "amountMinor": "9000000", "currency": "SYP", "display": "90,000.00" },
  "createdAt": "2026-08-31T10:00:00.000Z",
  "lines": [
    { "id": "0199aa00-0000-7000-8000-000000000611", "productId": "0199aa00-0000-7000-8000-000000000301", "variantId": "0199aa00-0000-7000-8000-000000000311",
      "name": "بقلاوة مشكلة", "variantName": "كيلو",
      "unitPrice": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" }, "qty": 1,
      "lineTotal": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" },
      "imageUrl": "https://cdn.trendsy.example/public/fixtures/baklava-md.webp" }
  ],
  "address": { "governorateNodeId": "…f001", "cityNodeId": "…f002", "areaNodeId": "…f003", "neighborhoodNodeId": "…f004",
               "description": "بناء الياسمين، طابق ٣، قرب صيدلية الشعلان", "phone": "+963900000001", "lat": 33.518, "lng": 36.293, "label": "المنزل" },
  "paymentMethodCode": "cod",
  "subtotal": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" },
  "deliveryFee": { "amountMinor": "500000", "currency": "SYP", "display": "5,000.00" },
  "discount": { "amountMinor": "0", "currency": "SYP", "display": "0.00" },
  "grandTotal": { "amountMinor": "9000000", "currency": "SYP", "display": "90,000.00" },
  "cancellable": true
}
```

| Field | Summary | Detail | Localised | Design note |
|---|---|---|---|---|
| `id`, `checkoutId`, `storeId` | req | req | — | Group "my orders" by `checkoutId` to show one purchase as one card. |
| `orderNumber` | req | req | — | `TS-` + 6 digits by example (`TS-000123`); what SMS and support use. No generator in code. |
| `storeName` | req | req | yes | |
| `status` | req | req | — | Raw INV-04 state; branch on it (§3.1). |
| `statusLabel` | req | req | yes | Render this; never map the enum yourself. |
| `itemsCount` | req | req | — | Lines, not units. |
| `total` | req | req | — | = `grandTotal`. |
| `createdAt` | req | req | — | |
| `lines[]` | — | req | `name`, `variantName` yes | Snapshots at placement (INV-14); `{ id, productId, variantId, name, variantName, unitPrice, qty, lineTotal, imageUrl }`. No `available`. |
| `address` | — | req | — | `AddressSnapshotDto`. |
| `paymentMethodCode` | — | req | — | `cod`. |
| `subtotal`, `deliveryFee`, `discount`, `grandTotal` | — | req | — | Per order. |
| `cancellable` | — | req | — | `CANCELLABLE_STATUSES.includes(status)` = `placed`, `confirmed`, `accepted` (`orders.fixtures.ts:53`, `orders-stub.service.ts:132`). Render the cancel button on this, not on `status`. |

Missing: delivery ETA/window, courier contact, payment status (COD has none), a reason/note on a cancelled or rejected order (the reason is accepted on cancel but never returned), the buyer's `note` from checkout, invoice/receipt download, "rate this order" (Slice 3), return request from the buyer side (returns are admin-initiated only: `admin/orders/{id}/returns`).

### 2.13 OrderEvent (`OrderEventDto`)

`GET buyer/orders/{id}/events`, unpaginated, oldest first:

```json
{ "events": [
  { "seq": 1, "status": "placed",    "label": "بانتظار التأكيد", "occurredAt": "2026-08-31T10:00:00.000Z", "note": null },
  { "seq": 2, "status": "confirmed", "label": "تم تأكيد الطلب",  "occurredAt": "2026-08-31T10:30:00.000Z", "note": null },
  { "seq": 3, "status": "accepted",  "label": "قيد التجهيز",     "occurredAt": "2026-08-31T11:00:00.000Z", "note": null },
  { "seq": 4, "status": "shipped",   "label": "في الطريق إليك",  "occurredAt": "2026-08-31T12:00:00.000Z", "note": null } ] }
```

`seq` number · `status` (one of the 13) · `label` localised · `occurredAt` ISO · `note` string|null (operator note shown to the buyer verbatim). **No `type` field, no actor, no reason code** on the buyer event `(not in code)` — an event *is* a status entered. A screen renders a vertical timeline of labels and times; failed/rejected steps carry no reason unless an operator typed a note.

### 2.14 StatusReason (`OrderReasonDto`)

`GET public/order-reasons?kind=cancel` — `libs/contexts/orders/src/presentation/http/public/dto/order-reasons.dto.ts`; values `orders.fixtures.ts:292`.

```json
{ "kind": "cancel", "reasons": [ { "code": "changed_mind", "label": "غيرت رأيي" }, { "code": "wrong_item", "label": "طلبت المنتج الخطأ" }, { "code": "delivery_too_slow", "label": "التوصيل تأخر" } ] }
```

`code` stable, `label` localised. Only `kind=cancel` is buyer-triggered (`CancelOrderDto { reasonCode ^[a-z][a-z0-9_]{1,49}$, note? ≤ 500 }`). Full lists in §5.6.

### 2.15 Shipment, ShipmentEvent (`ShipmentDto`, `ShipmentEventDto`)

`GET buyer/orders/{id}/shipment` — `libs/contexts/shipping/src/presentation/http/dto/shipment.dto.ts` (extends the admin shape; no PII in it); fixtures `libs/contexts/shipping/src/domain/shipping.fixtures.ts`.

```json
{
  "id": "0199aa00-0000-7000-8000-000000000701",
  "orderId": "0199aa00-0000-7000-8000-000000000602",
  "orderNumber": "TS-000124",
  "carrierCode": "manual",
  "status": "in_transit",
  "attempts": 0,
  "createdAt": "2026-08-31T11:00:00.000Z",
  "events": [
    { "seq": 1, "status": "created",    "source": "manual", "reasonCode": null, "note": null, "occurredAt": "2026-08-31T11:00:00.000Z" },
    { "seq": 2, "status": "picked_up",  "source": "manual", "reasonCode": null, "note": null, "occurredAt": "2026-08-31T12:00:00.000Z" },
    { "seq": 3, "status": "in_transit", "source": "manual", "reasonCode": null, "note": null, "occurredAt": "2026-08-31T12:30:00.000Z" }
  ]
}
```

`status` ∈ `created|picked_up|in_transit|delivered|failed|returned`; `source` ∈ `webhook|poll|manual`; `reasonCode` set only on `failed` (from `?kind=delivery_failed`); `note` operator text; `attempts` = failed delivery attempts. **Nothing localised** in this DTO — the client needs the `shipping` i18n namespace for labels (§4). 404 `shipping.shipment_not_found` for any order before `accepted`: the screen falls back to the order timeline. Missing: carrier display name, tracking number, tracking URL, courier phone, ETA `(not in code)`.

### 2.16 PaymentMethod (`PaymentMethodDto`)

`GET public/payment-methods` — `libs/contexts/payments/src/presentation/http/public/dto/payment-methods.dto.ts`; fixture `libs/contexts/payments/src/domain/payments.fixtures.ts`.

```json
{ "methods": [ { "code": "cod", "name": "الدفع عند الاستلام", "description": "ادفع نقداً لمندوب التوصيل عند استلام طلبك.", "enabled": true } ] }
```

`name`, `description` localised; `enabled` boolean. **No fee, no icon, no min/max amount** `(not in code)`. One method in Slice 1.

### 2.17 Page (`PageDto`)

`GET public/pages/{slug}` — `libs/contexts/content/src/presentation/http/public/dto/page.dto.ts`; fixtures `libs/contexts/content/src/domain/content.fixtures.ts`.

```json
{ "slug": "return-policy", "title": "سياسة الإرجاع",
  "bodyMarkdown": "يمكنك طلب إرجاع المنتج خلال ثلاثة أيام من الاستلام إذا كان بحالته الأصلية.\n\nالدفع عند الاستلام: إذا رفضت الطلب عند باب المنزل قبل الدفع، لا تُحتسب أي رسوم عليك.",
  "updatedAt": "2026-08-31T12:00:00.000Z" }
```

`title`, `bodyMarkdown` localised; body is Markdown (paragraphs separated by blank lines in the fixtures; no headings or images used). No list-of-pages endpoint: the four slugs (§5.8) are known to the client.

### 2.18 Slot, SlotItem (`SlotDto`, `SlotItemDto`)

`GET public/slots/{code}` — `libs/contexts/content/src/presentation/http/public/dto/slot.dto.ts`.

```json
{ "code": "home_hero", "items": [
  { "kind": "banner", "title": "سوق الحميدية بين يديك", "imageUrl": "https://cdn.trendsy.example/public/fixtures/hero-lg.webp",
    "targetType": "market", "targetId": "0199aa00-0000-7000-8000-00000000c001", "sort": 10 } ] }
```

| Field | Type | Design note |
|---|---|---|
| `kind` | `banner`\|`product`\|`store` | What to render. |
| `title` | string, localised | |
| `imageUrl` | string | A **single URL**, not a variant set and not an asset id — the client cannot pick a size. |
| `targetType` | `market`\|`product`\|`store` | Note the asymmetry: a `banner` targets a `market`; there is no `category` or `url` target. |
| `targetId` | uuid | Per-environment. **No slug on the target** — a web deep link needs a second fetch. |
| `sort` | number | Ascending. |

No image ratio is enforced or declared anywhere `(not in code)`; admin input caps a slot at 50 items. Two slots exist (`home_hero`, `home_featured`; §5.9); no list-of-slots endpoint.

### 2.19 Category filters / form schema (`CategoryFiltersResponseDto`, `CategoryFormSchemaResponseDto`) **(A6)**

`libs/contexts/catalog/src/presentation/http/public/dto/category-attributes.response.dto.ts`; logic `…/application/queries/catalog-attributes-stub.service.ts`; dictionary fixtures §5.12.

`GET public/categories/{id}/filters` — the sidebar definition:

```json
{
  "categoryId": "0199aa00-0000-7000-8000-000000000a02",
  "filters": [
    { "code": "fabric_type", "label": "نوع القماش", "type": "select",
      "values": [ { "value": "brocade", "label": "بروكار", "count": 1 } ] },
    { "code": "color", "label": "اللون", "type": "select",
      "values": [ { "value": "red", "label": "أحمر", "count": 1 } ] }
  ]
}
```

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `categoryId` | uuid | req | — | Echoes the id asked for even when the schema is inherited from an ancestor. |
| `filters[]` / `facets[]` | `CategoryFilterDto` / `ProductFacetDto` | req | `label` yes | Same shape in both places; in form order. A `number`/`text`/`boolean` attribute never appears (only option-valued types are filterable). |
| `values[].value` | string | req | — | The option **code** (`red`), what `?attrs=` takes. |
| `values[].count` | int | req | — | Always ≥ 1; counts published products in the subtree. |

`GET public/categories/{id}/form-schema` (`fields[]` of `CategoryFormFieldDto`: `attributeId`, `code`, `label`, `type` ∈ `select|multi_select|number|text|boolean`, `unit` nullable, `isRequired`, `isFilterable`, `sortOrder`, `options[{ id, code, label }]`) is the **merchant product form** definition — a buyer app does not need it. A subcategory with no bindings inherits its nearest bound ancestor's set (both routes). Missing for a buyer filter UI: price-band bounds (min/max price in the set), sort options, "in stock only" `(not in code)`.

### 2.20 Search hit and suggestion (`SearchHitDto`, `SuggestionDto`) **(A6)**

`libs/contexts/search/src/presentation/http/public/dto/search.dto.ts`; fixtures `libs/contexts/search/src/domain/search.fixtures.ts`; matching `…/domain/search-matching.ts`.

```json
{ "items": [ {
    "id": "0199aa00-0000-7000-8000-000000000301", "kind": "product", "slug": "mixed-baklava",
    "name": "بقلاوة مشكلة", "storeName": "بيت الشام للحلويات",
    "priceFrom": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" },
    "imageUrl": "https://cdn.trendsy.example/public/fixtures/baklava-md.webp",
    "categoryId": "0199aa00-0000-7000-8000-000000000a11" } ],
  "nextCursor": null, "hasMore": false }
```

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `id`, `kind`, `slug`, `name` | uuid, enum, string, string | req | `name` yes | `kind` ∈ `product|store|category`; **only `product` is served today**; `store`/`category` hits arrive with OpenSearch (Slice 2). Branch on `kind`; deep-link by `slug`. |
| `storeName`, `priceFrom`, `imageUrl`, `categoryId` | string, Money, string, uuid | **optional** | `storeName` yes | Present on `product` hits only; declared optional so future kinds do not re-type the client. `imageUrl` is the `md` variant. |

Suggestion (`GET public/search/suggest` → `{ suggestions: [{ text, kind }] }`): a **term, not a link** — no id, no slug; picking one re-runs `GET public/search?q=<text>`. Fixture terms (§5.16): «بقلاوة مشكلة» (product), «حلويات شرقية» (category), «قماش بروكار دمشقي» (product), «أقمشة دمشقية» (category); English equivalents under `lang=en`. Missing: highlight ranges, result counts per kind, "did you mean", recent searches `(not in code)`. `SEARCH_ERROR_CODES` is empty — search never raises a domain error; an unmatched `q` is an empty page, never a 404.

### 2.21 Coupon validation (`CouponValidationDto`, `ValidatedCouponDto`) **(A7)**

`libs/contexts/cart/src/presentation/http/dto/cart.dto.ts` (bottom); logic `libs/contexts/cart/src/application/queries/coupon-validation.ts`; fixtures `libs/contexts/cart/src/domain/cart.fixtures.ts` (`CART_COUPON_FIXTURES`, §5.13).

```json
{
  "valid": true, "code": "AHLAN10", "reason": null,
  "coupon": {
    "id": "0199aa00-0000-7000-8000-000000000901", "code": "AHLAN10", "name": "خصم أهلاً 10%",
    "kind": "percentage", "percentOffBps": 1000, "amountOff": null,
    "minimumOrder": { "amountMinor": "5000000", "currency": "SYP", "display": "50,000.00" },
    "validFrom": "2026-08-01T00:00:00.000Z", "validUntil": "2026-12-31T23:59:59.000Z"
  },
  "itemsSubtotal": { "amountMinor": "20500000", "currency": "SYP", "display": "205,000.00" },
  "discount": { "amountMinor": "2050000", "currency": "SYP", "display": "20,500.00" },
  "totalAfterDiscount": { "amountMinor": "18450000", "currency": "SYP", "display": "184,500.00" }
}
```

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `valid` | bool | req | — | The answer. **A wrong code is `200 valid:false`, never an error.** |
| `code` | string | req | — | Uppercased echo. Input: 3–20 `^[A-Z0-9]{3,20}$` — upper-case client-side. |
| `reason` | enum, nullable | req | — | `unknown_code`, `not_started`, `expired`, `usage_limit_reached`, `already_used`, `not_applicable_to_items`, `minimum_not_met` (evaluated in that order, `coupon-validation.ts:38-52`). **No server wording** — the client owns the seven sentences per locale. A switched-off coupon is `unknown_code` (indistinguishable from nonexistent). |
| `coupon` | object, nullable | req | `name` yes | The terms, present on every reason except `unknown_code` — so "expired on 31 July" can be said precisely. `kind` ∈ `percentage|fixed`; `percentOffBps` is basis points (1000 = 10 %); `amountOff`/`minimumOrder` Money or null. No `description` on the wire (the fixture has one; `ValidatedCouponDto` drops it). |
| `itemsSubtotal`, `discount`, `totalAfterDiscount` | Money | req | — | `discount` is zero on every refusal, so always renderable. Excludes delivery. A percentage is applied to the **eligible** subtotal (category-restricted coupons: lines in `appliesToCategoryIds` only); a fixed amount is capped at the eligible subtotal. |

Nothing is attached to the cart by this call; `PUT buyer/cart/coupon` does that and still returns the cart with **totals unchanged** (stub). The cart's own `couponCode`/`discount` fields are unchanged from §2.10.

### 2.22 Payment intent (`PaymentIntentDto`, `CreatePaymentIntentDto`) **(A7)**

`libs/contexts/payments/src/presentation/http/buyer/dto/payment-intent.dto.ts`; machine `…/application/queries/payment-intent.machine.ts`; fixtures `libs/contexts/payments/src/domain/payments.fixtures.ts` (§5.14).

```json
{
  "id": "0199aa00-0000-7000-8000-000000000811",
  "orderId": "0199aa00-0000-7000-8000-000000000604", "orderNumber": "TS-000131",
  "provider": "sham_cash", "status": "requires_action", "statusLabel": "بانتظار الدفع",
  "amount":     { "amountMinor": "24500000", "currency": "SYP", "display": "245,000.00" },
  "refunded":   { "amountMinor": "0", "currency": "SYP", "display": "0.00" },
  "refundable": { "amountMinor": "0", "currency": "SYP", "display": "0.00" },
  "redirectUrl": "https://pay.shamcash.example/checkout/0199aa00-0000-7000-8000-000000000811",
  "returnUrl": "https://trendsy.example/orders/TS-000131",
  "createdAt": "2026-09-02T09:00:00.000Z", "expiresAt": "2026-09-02T09:30:00.000Z",
  "succeededAt": null, "failureCode": null
}
```

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `provider` | enum | req | — | `sham_cash`, `paymera` (`PAYMENT_PROVIDERS`). Chosen by the buyer in the create body. The provider's hosted page is where the buyer pays — there is no in-app card form. |
| `status` / `statusLabel` | enum / string | req | label yes | §3.9. `statusLabel` is served (AR/EN literals in `PAYMENT_INTENT_STATUS_LABELS`, not the i18n store). |
| `amount` | Money | req | — | Taken from the **order**, never the body (24,500,000 = TS-000131's total, delivery included). |
| `refunded`, `refundable` | Money | req | — | `refundable` is zero unless `succeeded`. Refunds are an admin action (`POST admin/payments/{id}/refund`, `finance` only); the buyer sees the result here. |
| `redirectUrl` | string, nullable | req | — | Only while `requires_action` and before `expiresAt` (30 min window in the fixture). Open it in the system browser / a web view; the provider returns the buyer to `returnUrl`. |
| `returnUrl` | string, nullable | req | — | Echo of the create body (`https` only, ≤ 2048; on mobile the app's deep link). |
| `expiresAt`, `succeededAt`, `failureCode` | string / nullable / nullable | req | — | `failureCode` is "a stable code" — **no enumeration exists in code** `(not in code)`; render it generically. |

Rule the screen depends on: **poll `GET buyer/payments/intents/{id}` after the return, do not trust the redirect** — only a provider webhook (Phase B) moves the intent out of `requires_action`. A `failed`/`expired` attempt does not block a retry (new intent); an already-`succeeded` order answers 409 on create. Design fact worth flagging: an intent is **per order**, so a two-store checkout would be paid twice (STATUS *Pending decisions*: "intent-per-order vs ADR-0017's payment-per-checkout" — open). `paymentMethodCode` on checkout is still `@IsIn(['cod'])`, so today no prepaid checkout can even be created; the intent routes exist ahead of the checkout that would need them.

### 2.23 Push device (`RegisterDeviceDto`, `RegisteredDeviceDto`) **(A6)**

`libs/contexts/notifications/src/presentation/http/buyer/dto/buyer-notifications.dto.ts`. Request `{ platform: android|ios|web, token (≤ 4096, write-only, never returned or logged), deviceId? (≤ 100 — the same value as `X-Device-Id`, so a re-register replaces the row), appVersion? (≤ 40) }` → 201 `{ id, platform, createdAt }`. There is **no list of registered devices**; the app keeps the `id` and calls `DELETE buyer/devices/{id}` on sign-out (204 always). Push itself is Slice 2 (`PUSH_PROVIDER=none`), so registering succeeds and delivers nothing.

### 2.24 Notification preferences (`NotificationPreferencesDto`) **(A6)**

Same DTO file; rules `libs/contexts/notifications/src/domain/notification-preferences.ts`; fixtures §5.15.

```json
{
  "channels": [
    { "channel": "sms",      "label": "رسائل نصية",        "enabled": true,  "required": true },
    { "channel": "whatsapp", "label": "واتساب",            "enabled": false, "required": false },
    { "channel": "push",     "label": "إشعارات التطبيق",   "enabled": true,  "required": false }
  ],
  "topics": [
    { "topic": "order_updates",    "label": "تحديثات الطلب",       "enabled": true,  "required": false },
    { "topic": "promotions",       "label": "العروض والتخفيضات",   "enabled": false, "required": false },
    { "topic": "account_security", "label": "أمان الحساب",         "enabled": true,  "required": true }
  ]
}
```

Two switch groups, labels served for the request locale. `required: true` rows (`sms`, `account_security`) **cannot be switched off** — render the switch disabled; sending `enabled:false` answers 422 `notifications.channel_required` / `topic_required`. `PUT` takes `{ channels: [{ channel, enabled }], topics: [{ topic, enabled }] }` — both arrays required, `[]` allowed, omitted switches keep their value, unknown codes 422 rather than ignored. No quiet hours, no per-topic channel matrix, no email `(not in code)`.

### 2.25 Review (`PublicReviewDto`, `ReviewRatingSummaryDto`, `BuyerReviewDto`) **(A7)**

`libs/contexts/reviews/src/presentation/http/public/dto/public-review.dto.ts`, `…/buyer/dto/buyer-review.dto.ts`, `…/dto/review-shared.dto.ts`; fixtures `libs/contexts/reviews/src/domain/reviews.fixtures.ts` (§5.13).

`GET public/products/{id}/reviews` (baklava):

```json
{
  "items": [
    { "id": "0199aa00-0000-7000-8000-000000000b01", "rating": 5, "title": "بقلاوة ممتازة",
      "body": "وصلت طازجة وبالوقت المحدد، والطعم مثل بقلاوة السوق تماماً. سأطلب مرة أخرى.",
      "authorName": "رانيا ح.", "isVerifiedPurchase": true, "createdAt": "2026-08-28T10:15:00.000Z",
      "reply": { "id": "0199aa00-0000-7000-8000-000000000c05", "reviewId": "0199aa00-0000-7000-8000-000000000b01",
                 "body": "شكراً لك! سعداء أن البقلاوة وصلت طازجة.", "createdAt": "2026-08-28T15:40:00.000Z" } },
    { "id": "0199aa00-0000-7000-8000-000000000c02", "rating": 3, "title": null,
      "body": "الطعم جيد لكن الكمية أقل مما توقعت مقابل السعر.",
      "authorName": null, "isVerifiedPurchase": false, "createdAt": "2026-08-29T18:05:00.000Z", "reply": null }
  ],
  "nextCursor": null, "hasMore": false,
  "summary": { "count": 2, "average": 4, "distribution": { "1": 0, "2": 0, "3": 1, "4": 0, "5": 1 } }
}
```

| Field | Type | Presence | Localised | Design note |
|---|---|---|---|---|
| `rating` | int 1–5 | req | — | Whole stars only; no half stars. |
| `title` | string, nullable | req | **no** | ≤ 120 on input; `null` when the shopper wrote none. |
| `body` | string | req | **no** | ≤ 2000 on input; the shopper's own language, never translated. |
| `authorName` | string, nullable | req | — | Given name + family initial («رانيا ح.»); **`null` is a real state** (account with no display name) — the client supplies a placeholder. Never phone, customer number or id. |
| `isVerifiedPurchase` | bool | req | — | `false` is a real state, not an error (the 3★ fixture). |
| `reply` | object, nullable | req | `body` no | One store reply at most (`reviews.already_replied` on a second); `{ id, reviewId, body ≤ 1000, createdAt }`. |
| `summary` | object | req | — | Over **every published** review of the product, not the page or the `rating` filter. `average` is one decimal, exactly `0` when `count` is 0 — gate the block on `count`. `distribution` keyed `"1"`–`"5"`. |

Buyer's own review (`POST buyer/reviews` → `BuyerReviewDto`) adds `productId`, `productName` (localised), `status` ∈ `published|hidden`, `orderNumber` (nullable; the verifying order, never public). Rules: **verified purchase required** (a product with no order of yours → 422 `reviews.purchase_required`), one review per product (409 `reviews.already_reviewed`), no edit or delete endpoint, no photos, no "was this helpful" votes, no per-store rating, no buyer list of their own reviews `(not in code)`. Moderation is `published ⇄ hidden` by an admin; a hidden review vanishes from the public list and the buyer is not told why. Report reasons (`POST public/reviews/{id}/report`): `spam`, `offensive`, `off_topic`, `fake`, `other` + optional `note` ≤ 500 — machine codes, client wording.

---

## 3. Enums and state machines

Every transition table below is a real, enforced pure function (an off-edge request answers 409 `<ctx>.invalid_transition`); the persistence behind it is still fixture data. The docs' tables in `docs/architecture/domain-model.md` differ from the code in the places marked **DOC≠CODE**.

### 3.1 Order status — `ORDER_STATUSES`

`libs/contexts/orders/src/domain/orders.fixtures.ts:18-33`; transitions `libs/contexts/orders/src/application/queries/orders-admin-stub.service.ts:31-68` (`nextOrderStatus`); buyer cancel `…/orders-stub.service.ts:198-205`.

Values, in order: `awaiting_payment`, `payment_failed`, `placed`, `confirmed`, `accepted`, `rejected`, `shipped`, `delivered`, `delivery_failed`, `cancelled`, `return_requested`, `returned`, `completed`.

| From | To | Who / how | Reason required |
|---|---|---|---|
| `placed` | `confirmed` | admin `confirm` (phone confirmation) | no |
| `confirmed` | `accepted` | admin or merchant `accept` | no |
| `confirmed` | `rejected` | admin or merchant `reject` (merchant `unavailable` = reject with `out_of_stock`) | documented `kind=reject`; **not enforced** (the function takes no reason) |
| `accepted` | `shipped` | admin `ship` | no |
| `shipped` | `delivered` | admin `deliver` | no |
| `shipped` | `delivery_failed` | admin `delivery-failed` | documented `kind=delivery_failed`; not enforced |
| `placed` \| `confirmed` \| `accepted` | `cancelled` | **buyer** `POST buyer/orders/{id}/cancel` — the only buyer-triggered transition | **yes**, `reasonCode` from `kind=cancel` (required by `CancelOrderDto`) |
| `delivery_failed` | `cancelled` | admin only | not enforced |
| `delivered` | `return_requested` | admin `POST admin/orders/{id}/returns` (manual procedure; no buyer endpoint) | documented `kind=return`; not enforced |
| `return_requested` | `returned` / `completed` | admin accept / decline the return | no |

Buyer cancel rule as implemented: **status-based only** — `CANCELLABLE_STATUSES = ['placed','confirmed','accepted']` (`orders.fixtures.ts:52-53`), surfaced as `cancellable`. **There is no time window in hours** `(not in code)`. `awaiting_payment` and `payment_failed` are declared and labelled but no transition produces them (prepaid is Slice 3). DOC≠CODE: domain-model.md also lists `delivery_failed → shipped` (retry), `delivery_failed → returned`, and `delivered → completed` by a return-window job — none exists in code (the first two are acknowledged as Phase B in the stub's comment).

### 3.2 Product status — `PRODUCT_STATUSES`

`libs/contexts/catalog/src/application/queries/catalog-admin-stub.service.ts:17-65` (`nextProductStatus`). Values: `draft`, `pending_review`, `approved`, `published`, `rejected`, `suspended`, `archived`. Edges: `draft →submit→ pending_review →approve→ approved →publish→ published →unpublish→ suspended`; `pending_review →reject→ rejected`. **Never reaches a buyer**: the public endpoints serve `published` products only (no `status` field on any public DTO). DOC≠CODE: `rejected → draft`, `suspended → published` and `any → archived` are in the doc and absent in code; `archived` is unreachable.

### 3.3 Media asset status — `MEDIA_ASSET_STATUSES`

`libs/contexts/media/src/domain/value-objects/asset.ts:10-17`, transitions `asset-transitions.ts:11-17`. `uploading → processing | failed | deleted`; `processing → ready | failed | deleted`; `ready → deleted`; `failed → deleted`. Buyer screens see `status` only through `GET public/media/{id}`. Matches the doc verbatim.

### 3.4 Shipment status — `SHIPMENT_STATUSES`

`libs/contexts/shipping/src/domain/shipping.fixtures.ts:14-36`. `created → picked_up → in_transit → delivered | failed`; `failed → in_transit | returned`. Event `source` ∈ `webhook | poll | manual`. No buyer-triggered transition. Matches the doc; the doc's "shipment events drive order transitions" is not implemented yet.

### 3.5 Payment method

`libs/contexts/payments/src/domain/payments.fixtures.ts:18-35`: one method code, `cod`. Checkout enforces `@IsIn(['cod'])`. Payment **intents** now exist as a stub (§3.9) but no checkout can reference them yet.

### 3.6 Cart warning codes

`(not in code)`. No `warnings[]` field, no `cart.price_changed` / `cart.item_unavailable` / `cart.store_inactive` anywhere under `libs/`. The wire carries `CartItemDto.available: boolean` only. DOC≠CODE with `docs/frontend/design-handoff.md` §2, `docs/api/conventions.md`, `docs/frontend/client-guidelines.md`.

### 3.7 Address label

Free text ≤ 50, not enumerated (`libs/contexts/identity/src/presentation/http/buyer/dto/address.dto.ts:111-115`).

### 3.8 Other closed sets a buyer screen meets

| Set | Values | Source |
|---|---|---|
| Geo node `kind` | `country`, `governorate`, `city`, `area`, `neighborhood` | `libs/contexts/geo/src/domain/value-objects/geo-node.ts:5` |
| Market `kind` | `souk`, `mall`, `street` | `libs/contexts/geo/src/domain/value-objects/market.ts:2` |
| Cart `kind` | `guest`, `user` | `libs/contexts/cart/src/presentation/http/dto/cart.dto.ts:66-67` |
| Reason `kind` | `cancel`, `reject`, `delivery_failed`, `return` | `libs/contexts/orders/src/domain/orders.fixtures.ts:288` |
| Slot item `kind` / `targetType` | `banner`\|`product`\|`store` / `market`\|`product`\|`store` | `libs/contexts/content/src/presentation/http/public/dto/slot.dto.ts` |
| Session `audience` / `clientPlatform` | `buyer`\|`merchant`\|`admin` / `android`\|`ios`\|`web`\|`unknown` | `libs/contexts/identity/src/presentation/http/buyer/dto/session.dto.ts`; `libs/platform/src/context/request-context.ts:44` |
| Reorder `skipped[].reason` | documented `variant_retired`, `out_of_stock`, `store_inactive` — **a plain string, no enum** | `libs/contexts/orders/src/presentation/http/buyer/dto/order.dto.ts:330-343` |
| Merchant / store status | never on a buyer response | `libs/contexts/merchants/src/presentation/http/public/dto/store.response.dto.ts` has no `status` |

### 3.9 Payment intent status — `PAYMENT_INTENT_STATUSES` **(A7)**

`libs/contexts/payments/src/domain/payments.fixtures.ts` (statuses + `PAYMENT_INTENT_STATUS_LABELS`), machine `…/application/queries/payment-intent.machine.ts` (`nextPaymentIntentStatus`, forbidden edges pinned by a spec). Values: `requires_action`, `succeeded`, `failed`, `expired`, `refunded`.

| From | To | How | Label (ar / en) |
|---|---|---|---|
| — | `requires_action` | `POST buyer/payments/intents` | بانتظار الدفع / Awaiting payment |
| `requires_action` | `succeeded` | provider webhook (Phase B) | مدفوع / Paid |
| `requires_action` | `failed` | provider webhook | فشل الدفع / Payment failed |
| `requires_action` | `expired` | `expiresAt` passes | انتهت صلاحية الدفع / Payment expired |
| `succeeded` | `refunded` | admin refund of the full amount (`finance` only); a partial refund keeps `succeeded` with `refunded` > 0 | مُعاد بالكامل / Fully refunded |

DOC≠CODE: the doc's `pending` and `captured` states do not exist; the code uses `requires_action → succeeded`. Refund reasons (admin-side, never on a buyer response): `order_cancelled`, `order_returned`, `duplicate_payment`, `goodwill`. No buyer-triggered transition; no "cancel payment" endpoint.

### 3.10 Review status and report reasons **(A7)**

`libs/contexts/reviews/src/domain/reviews.fixtures.ts`: `REVIEW_STATUSES = ['published','hidden']` — `published →hide→ hidden →restore→ published`, admin only (`…/application/queries/reviews-admin-stub.service.ts`); the two off-edge calls are 409 `reviews.invalid_transition`. A buyer's `BuyerReviewDto.status` is the only place a buyer sees it. `REVIEW_REASONS = ['spam','offensive','off_topic','fake','other']` for reports; no labels served.

### 3.11 Coupon validation reasons **(A7)**

`libs/contexts/cart/src/application/queries/coupon-validation.ts:4-12`: `unknown_code`, `not_started`, `expired`, `usage_limit_reached`, `already_used`, `not_applicable_to_items`, `minimum_not_met`; coupon `kind` ∈ `percentage|fixed`. Admin-side coupon `status` (`scheduled|active|expired|disabled`, `libs/contexts/promotions/src/domain/promotions.fixtures.ts`) never reaches a buyer.

### 3.12 Notifications, devices, search, attributes **(A6)**

| Set | Values | Source |
|---|---|---|
| Notification channel | `sms`, `whatsapp`, `push` | `libs/contexts/notifications/src/domain/notifications.fixtures.ts` (`NOTIFICATION_CHANNELS`) |
| Notification topic | `order_updates`, `promotions`, `account_security` | same (`NOTIFICATION_TOPICS`) |
| Device platform | `android`, `ios`, `web` | same (`DEVICE_PLATFORMS`) |
| Search hit / suggestion `kind` | `product`, `store`, `category` (only `product` served) | `libs/contexts/search/src/domain/search.fixtures.ts:5` |
| Attribute `type` | `select`, `multi_select`, `number`, `text`, `boolean` | `libs/contexts/catalog/src/domain/catalog.fixtures.ts` (`ATTRIBUTE_TYPES`) |
| Filter / facet `type` | `select`, `multi_select` only | `category-attributes.response.dto.ts` |
| Payment provider | `sham_cash`, `paymera` | `payments.fixtures.ts` (`PAYMENT_PROVIDERS`) |
| Bulk job `state` / `kind` (merchant only) | `queued|processing|completed|failed` / `import|price_update` | `catalog.fixtures.ts` |

---

## 4. i18n

### 4.1 `GET public/i18n/messages?ns=`

`libs/contexts/i18n/src/presentation/http/public/messages.controller.ts`; stub `libs/contexts/i18n/src/application/queries/get-public-messages.query.ts`; fixtures `libs/contexts/i18n/src/domain/i18n.fixtures.ts:18-39`. Any `ns` matching `^[a-z0-9_]+$` (≤ 64) is accepted; an unknown namespace answers **200 with `messages: {}`**, never 404. Response: `{ namespace, locale, messages: Record<string,string> }`, values already resolved (never `{ar,en}`). Only two namespaces have content today; the seeded `errors` namespace in the database is **not** served by this endpoint (the stub is isolated from the catalogue port).

**`ns=orders`** — the 13 INV-04 state labels (byte-identical to `STATUS_LABELS` in `libs/contexts/orders/src/domain/orders.fixtures.ts:36-50`; two copies, nothing enforces agreement):

| key | ar | en |
|---|---|---|
| `awaiting_payment` | بانتظار الدفع | Awaiting payment |
| `payment_failed` | فشل الدفع | Payment failed |
| `placed` | بانتظار التأكيد | Awaiting confirmation |
| `confirmed` | تم تأكيد الطلب | Order confirmed |
| `accepted` | قيد التجهيز | Being prepared |
| `rejected` | اعتذر المتجر عن الطلب | Declined by the store |
| `shipped` | في الطريق إليك | On its way |
| `delivered` | تم التوصيل | Delivered |
| `delivery_failed` | تعذر التوصيل | Delivery failed |
| `cancelled` | تم إلغاء الطلب | Cancelled |
| `return_requested` | طلب إرجاع قيد المراجعة | Return requested |
| `returned` | تم الإرجاع | Returned |
| `completed` | اكتمل الطلب | Completed |

**DOC≠CODE**: `docs/frontend/design-handoff.md` §3 shows different Arabic labels (e.g. `placed` = تم استلام الطلب, `confirmed` = مؤكَّد هاتفياً, `shipped` = قيد التوصيل). The code's labels above are what the API serves.

**`ns=cancel_reasons`**:

| key | ar | en |
|---|---|---|
| `changed_mind` | غيرت رأيي | Changed my mind |
| `wrong_item` | طلبت المنتج الخطأ | Ordered the wrong item |
| `delivery_too_slow` | التوصيل تأخر | Delivery was too slow |

No namespace exists for shipment statuses, product statuses, reject/delivery-failed/return reasons, or UI chrome `(not in code)`: shipment labels in particular must be client-owned today.

**Database-seeded namespace `errors`** (`libs/platform/src/http/errors/problem-titles.seed.ts`, inserted verbatim by `libs/contexts/i18n/src/infrastructure/persistence/message.seeder.ts`): 19 keys × ar/en, used only for problem `title` (§6.1). There is no `libs/contexts/i18n/src/domain/*.seed.ts` `(not in code)`.

### 4.2 How labels are resolved

- **Order status labels**: served inline as `statusLabel` on every order DTO and `label` on every order event, resolved server-side. The messages endpoint is the same wording for filters, badges and pickers.
- **Reason labels**: `GET public/order-reasons?kind=` returns `{ code, label }` resolved; `cancel_reasons` in i18n duplicates the cancel list only.
- **Category, market, store, product, variant, attribute, page, slot, payment-method names**: one resolved string per field.
- **Missing translation**: `localize(rows, requested)` (`libs/shared-kernel/src/i18n/locale.ts:63-73`) tries the requested locale then `ar`; every public mapper adds `?? pair.ar`, so a missing English string comes back as the **Arabic string**, never the key and never empty. A key absent from a namespace is simply **absent from the map** (no placeholder).

### 4.3 `Accept-Language` fallback as implemented

`libs/platform/src/http/context/locale.ts:30-53`, called by `libs/platform/src/http/context/request-context.middleware.ts:78-83`. Supported `ar,en`, default `ar` (`.env.example:166-167`; `ar` is mandatory by boot rule `libs/platform/src/config/env.rules.ts:372-381`).

1. `?lang=` wins if, lower-cased, it is exactly `ar` or `en`. An unsupported `?lang=` is **ignored**, never a 422.
2. Else `Accept-Language`, up to 20 entries sorted by `q`: `*` → default; each tag matched on the full tag or its base (`en-US` → `en`).
3. Else `ar`.

Consequences: `Accept-Language: en-US` → `en`; `?lang=en-US` → **`ar`** (the query path has no base-tag stripping; a real asymmetry); `fr` → `ar`. The response echoes `Content-Language` and sets `Vary: Accept-Language`. Public GET ETags differ per locale.

---

## 5. Seed data (verbatim)

Ids: geo node and market ids are **minted per environment** at seed time (`libs/contexts/geo/src/infrastructure/persistence/geo.seeder.ts:15-31`), so the stable keys are `path` (nodes) and `code`/`slug` (markets). Fixture-cast ids (`0199aa00-0000-7000-8000-…`) are hand-written and identical everywhere the stubs run.

### 5.1 GeoNode tree — the whole seeded country, Damascus to neighbourhood level

`libs/contexts/geo/src/domain/geo.seed.ts` (`GEO_NODE_SEED`); 98 nodes = 1 country + 14 governorates + 29 cities + 16 areas + 38 neighbourhoods. Format: `CODE` · path · kind · Arabic · English. Only `DMC` carries coordinates (33.5138, 36.2765); every other node has `lat`/`lng` null.

- `SY` · `SY` · country · سوريا · Syria
  - `DMS` · `SY.DMS` · governorate · محافظة دمشق · Damascus Governorate
    - `DMC` · `SY.DMS.DMC` · city · مدينة دمشق · Damascus City
      - `OLD` · `SY.DMS.DMC.OLD` · area · دمشق القديمة · Old Damascus
        - `HAMIDIYAH` · `…OLD.HAMIDIYAH` · الحميدية · Al-Hamidiyah
        - `ASROUNIYAH` · `…OLD.ASROUNIYAH` · العصرونية · Al-Asrouniyah
        - `HARIQA` · `…OLD.HARIQA` · الحريقة · Al-Hariqa
        - `BZOURIYAH` · `…OLD.BZOURIYAH` · البزورية · Al-Bzouriyah
        - `AMARA` · `…OLD.AMARA` · العمارة · Al-Amara
        - `BAB_TOUMA` · `…OLD.BAB_TOUMA` · باب توما · Bab Touma
        - `BAB_SHARQI` · `…OLD.BAB_SHARQI` · باب شرقي · Bab Sharqi
      - `SAROUJA` · `SY.DMS.DMC.SAROUJA` · area · ساروجة · Sarouja
        - `SOUQ_SAROUJA` · سوق ساروجة · Souq Sarouja
        - `MARJEH` · المرجة · Al-Marjeh
        - `SABAA_BAHRAT` · السبع بحرات · Al-Sabaa Bahrat
      - `QANAWAT` · `SY.DMS.DMC.QANAWAT` · area · القنوات · Al-Qanawat
        - `QANAWAT` · القنوات · Al-Qanawat
        - `BAB_SRIJEH` · باب سريجة · Bab Srijeh
        - `BARAMKEH` · البرامكة · Al-Baramkeh
      - `SHAGHOUR` · `SY.DMS.DMC.SHAGHOUR` · area · الشاغور · Al-Shaghour
        - `SHAGHOUR` · الشاغور · Al-Shaghour
        - `DUWAYLAH` · الدويلعة · Al-Duwaylah
      - `MIDAN` · `SY.DMS.DMC.MIDAN` · area · الميدان · Al-Midan
        - `MIDAN` · الميدان · Al-Midan
        - `ZAHERA_JADIDA` · الزاهرة الجديدة · Al-Zahera Al-Jadida
        - `ZAHERA_QADIMA` · الزاهرة القديمة · Al-Zahera Al-Qadima
      - `QADAM` · `SY.DMS.DMC.QADAM` · area · القدم · Al-Qadam
        - `QADAM` · القدم · Al-Qadam
        - `NAHR_AISHA` · نهر عيشة · Nahr Aisha
      - `KAFR_SOUSA` · `SY.DMS.DMC.KAFR_SOUSA` · area · كفرسوسة · Kafr Sousa
        - `KAFR_SOUSA` · كفرسوسة · Kafr Sousa
      - `MEZZEH` · `SY.DMS.DMC.MEZZEH` · area · المزة · Al-Mezzeh
        - `MEZZEH_86` · المزة 86 · Mezzeh 86
        - `MEZZEH_VILLAS_EAST` · المزة فيلات شرقية · Mezzeh Eastern Villas
        - `MEZZEH_VILLAS_WEST` · المزة فيلات غربية · Mezzeh Western Villas
      - `MUHAJIRIN` · `SY.DMS.DMC.MUHAJIRIN` · area · المهاجرين · Al-Muhajirin
        - `MUHAJIRIN` · المهاجرين · Al-Muhajirin
        - `ABU_RUMMANEH` · أبو رمانة · Abu Rummaneh
        - `MALKI` · المالكي · Al-Malki
        - `RAWDA` · الروضة · Al-Rawda
        - `SHAALAN` · الشعلان · Al-Shaalan
      - `SALIHIYAH` · `SY.DMS.DMC.SALIHIYAH` · area · الصالحية · Al-Salihiyah
        - `SALIHIYAH` · الصالحية · Al-Salihiyah
        - `MAZRAA` · المزرعة · Al-Mazraa
        - `SHEIKH_MUHIDDIN` · الشيخ محي الدين · Sheikh Muhyiddin
      - `RUKN_AL_DIN` · `SY.DMS.DMC.RUKN_AL_DIN` · area · ركن الدين · Rukn al-Din
        - `RUKN_AL_DIN` · ركن الدين · Rukn al-Din
      - `BARZEH` · `SY.DMS.DMC.BARZEH` · area · برزة · Barzeh
        - `BARZEH` · برزة · Barzeh
      - `QABOUN` · `SY.DMS.DMC.QABOUN` · area · القابون · Al-Qaboun
        - `QABOUN` · القابون · Al-Qaboun
      - `JOBAR` · `SY.DMS.DMC.JOBAR` · area · جوبر · Jobar
        - `JOBAR` · جوبر · Jobar
      - `DUMMAR` · `SY.DMS.DMC.DUMMAR` · area · دمر · Dummar
        - `DUMMAR_PROJECT` · مشروع دمر · Dummar Project
      - `YARMOUK` · `SY.DMS.DMC.YARMOUK` · area · اليرموك · Al-Yarmouk
        - `YARMOUK_CAMP` · مخيم اليرموك · Yarmouk Camp
  - `RDM` · `SY.RDM` · governorate · محافظة ريف دمشق · Rif Dimashq Governorate — cities: `DUMA` دوما Douma · `KSWA` الكسوة Al-Kiswah · `QTYF` القطيفة Al-Qutayfah · `TALL` التل Al-Tall · `ZBDN` الزبداني Al-Zabadani · `NABK` النبك An-Nabk · `ASHS` أشرفية صحنايا Ashrafiyat Sahnaya · `DRYA` داريا Darayya · `HRST` حرستا Harasta · `JRMN` جرمانا Jaramana · `QTNA` قطنا Qatana · `QDSY` قدسيا Qudsaya · `ZYNB` السيدة زينب Sayyidah Zaynab · `YBRD` يبرود Yabroud
  - `ALP` · محافظة حلب · Aleppo Governorate — `ALC` مدينة حلب Aleppo City
  - `HOM` · محافظة حمص · Homs Governorate — `HOC` مدينة حمص Homs City · `PLMR` تدمر Palmyra
  - `HAM` · محافظة حماة · Hama Governorate — `HAC` مدينة حماة Hama City
  - `LTK` · محافظة اللاذقية · Latakia Governorate — `LTC` مدينة اللاذقية Latakia City
  - `TRT` · محافظة طرطوس · Tartus Governorate — `TRC` مدينة طرطوس Tartus City
  - `IDL` · محافظة إدلب · Idlib Governorate — `IDC` مدينة إدلب Idlib City
  - `RAQ` · محافظة الرقة · Raqqa Governorate — `RAC` مدينة الرقة Raqqa City
  - `DEZ` · محافظة دير الزور · Deir ez-Zor Governorate — `DEC` مدينة دير الزور Deir ez-Zor City
  - `HSK` · محافظة الحسكة · Al-Hasakah Governorate — `HSC` مدينة الحسكة Al-Hasakah City
  - `DRA` · محافظة درعا · Daraa Governorate — `DRC` مدينة درعا Daraa City
  - `SWD` · محافظة السويداء · As-Suwayda Governorate — `SWC` مدينة السويداء As-Suwayda City
  - `QNT` · محافظة القنيطرة · Quneitra Governorate — `SALAM` مدينة السلام Madinat al-Salam · `QNC` مدينة القنيطرة Quneitra City

Every city outside Damascus is a leaf: the address form must accept a two-level pick there and a four-level pick in Damascus.

### 5.2 The 13 markets

`libs/contexts/geo/src/domain/geo.seed.ts` (`MARKET_SEED`), mirrored by `libs/contexts/geo/src/domain/markets.fixtures.ts` with fixture ids `…c001`–`…c013` in this order. **No description and no images exist on any market** (image count 0, `(not in code)`).

| # | fixture id | code | slug | kind | ar | en | host neighbourhood path | featured |
|---|---|---|---|---|---|---|---|---|
| 1 | `…c001` | `HAMIDIYAH` | `hamidiyah` | souk | الحميدية | Al-Hamidiyah | `SY.DMS.DMC.OLD.HAMIDIYAH` | **yes** |
| 2 | `…c002` | `MIDHAT_PASHA` | `midhat-pasha` | souk | مدحت باشا | Midhat Pasha | `SY.DMS.DMC.OLD.HARIQA` | no |
| 3 | `…c003` | `BZOURIYAH` | `bzouriyah` | souk | البزورية | Al-Bzouriyah | `SY.DMS.DMC.OLD.BZOURIYAH` | **yes** |
| 4 | `…c004` | `HAMRA` | `hamra` | street | الحمرا | Al-Hamra | `SY.DMS.DMC.MUHAJIRIN.SHAALAN` | no |
| 5 | `…c005` | `MALKI_MALL` | `malki-mall` | mall | مول المالكي | Malki Mall | `SY.DMS.DMC.MUHAJIRIN.MALKI` | no |
| 6 | `…c006` | `SHAM_CITY_CENTER` | `sham-city-center` | mall | شام سيتي سنتر | Sham City Center | `SY.DMS.DMC.KAFR_SOUSA.KAFR_SOUSA` | no |
| 7 | `…c007` | `DAMASCINO` | `damascino` | mall | مول داماسكينو | Damascino Mall | `SY.DMS.DMC.KAFR_SOUSA.KAFR_SOUSA` | no |
| 8 | `…c008` | `QASIOUN_MALL` | `qasioun-mall` | mall | مول قاسيون | Qasioun Mall | `SY.DMS.DMC.BARZEH.BARZEH` | no |
| 9 | `…c009` | `UPTOWN` | `uptown` | mall | أب تاون | Uptown | `SY.DMS.DMC.DUMMAR.DUMMAR_PROJECT` | no |
| 10 | `…c010` | `SHAALAN` | `shaalan` | street | الشعلان | Al-Shaalan | `SY.DMS.DMC.MUHAJIRIN.SHAALAN` | **yes** |
| 11 | `…c011` | `SALIHIYAH` | `salihiyah` | street | الصالحية | Al-Salihiyah | `SY.DMS.DMC.SALIHIYAH.SALIHIYAH` | **yes** |
| 12 | `…c012` | `HARIQA` | `hariqa` | street | الحريقة | Al-Hariqa | `SY.DMS.DMC.OLD.HARIQA` | **yes** |
| 13 | `…c013` | `ASROUNIYAH` | `asrouniyah` | street | العصرونية | Al-Asrouniyah | `SY.DMS.DMC.OLD.ASROUNIYAH` | no |

### 5.3 Category tree

`libs/contexts/catalog/src/domain/catalog.fixtures.ts` (`CATEGORY_FIXTURES`). No sort field exists; array order is the order.

- `…0a01` · `sweets` · حلويات · Sweets
  - `…0a11` · `oriental-sweets` · حلويات شرقية · Oriental sweets
- `…0a02` · `fabrics-textiles` · أقمشة ومنسوجات · Fabrics & textiles
  - `…0a12` · `damascene-fabrics` · أقمشة دمشقية · Damascene fabrics

### 5.4 Stores

`libs/contexts/merchants/src/domain/merchants.fixtures.ts` (`STORE_FIXTURES`). No `status` field exists on the fixture or the public DTO.

| id | slug | name | market | geoPath | founding partner | logo |
|---|---|---|---|---|---|---|
| `…0211` | `bayt-al-sham-sweets` | بيت الشام للحلويات / Bayt al-Sham Sweets | `HAMIDIYAH` الحميدية | `SY.DMS.DMC.OLD.HAMIDIYAH` | **true** | `…/fixtures/bayt-al-sham-logo.webp` |
| `…0212` | `anwal-dimashq` | أنوال دمشق / Anwal Dimashq | `MIDHAT_PASHA` مدحت باشا | `SY.DMS.DMC.OLD.HARIQA` | false | `…/fixtures/anwal-dimashq-logo.webp` |

Descriptions (ar): store 1 «محل حلويات شامية عريق في قلب سوق الحميدية، يصنع البقلاوة والحلويات الشرقية يومياً منذ ثلاثة أجيال.»; store 2 «أقمشة دمشقية تقليدية من البروكار والأغباني، تُنسج على أنوال يدوية في سوق مدحت باشا.»

### 5.5 Products

`libs/contexts/catalog/src/domain/catalog.fixtures.ts`. **Only two published products exist**, one per leaf category (`oriental-sweets`: 1, `damascene-fabrics`: 1); a third is a `draft` in `DRAFT_PRODUCT_FIXTURES` and never appears publicly. Five complete examples cannot be given because five do not exist — the two below are the complete public set, exactly as `GET public/products/{idOrSlug}` returns them in `ar` (the English values are in the same file).

Product 1 — `mixed-baklava`:

```json
{
  "id": "0199aa00-0000-7000-8000-000000000301",
  "slug": "mixed-baklava",
  "name": "بقلاوة مشكلة",
  "price": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" },
  "imageUrl": "https://cdn.trendsy.example/public/fixtures/baklava-md.webp",
  "storeId": "0199aa00-0000-7000-8000-000000000211",
  "storeName": "بيت الشام للحلويات",
  "categoryId": "0199aa00-0000-7000-8000-000000000a11",
  "description": "تشكيلة بقلاوة شامية طازجة بالفستق الحلبي والجوز، تُحضّر يومياً في سوق الحميدية.",
  "variants": [ { "id": "0199aa00-0000-7000-8000-000000000311", "name": "كيلو", "price": { "amountMinor": "8500000", "currency": "SYP", "display": "85,000.00" }, "inStock": true } ],
  "media": [ { "assetId": "0199aa00-0000-7000-8000-000000000401", "urls": { "thumb": "https://cdn.trendsy.example/public/fixtures/baklava-thumb.webp", "sm": "https://cdn.trendsy.example/public/fixtures/baklava-sm.webp", "md": "https://cdn.trendsy.example/public/fixtures/baklava-md.webp", "lg": "https://cdn.trendsy.example/public/fixtures/baklava-lg.webp", "original": "https://cdn.trendsy.example/public/fixtures/baklava-original.webp" } } ],
  "store": { "id": "0199aa00-0000-7000-8000-000000000211", "slug": "bayt-al-sham-sweets", "name": "بيت الشام للحلويات", "marketCode": "HAMIDIYAH" },
  "attributes": [ { "code": "weight", "name": "الوزن", "value": "1 كغ", "valueCode": null }, { "code": "color", "name": "اللون", "value": "ذهبي", "valueCode": "gold" } ]
}
```

English strings for product 1: name "Mixed baklava", variant "1 kg", description "A fresh Damascene baklava assortment with Aleppo pistachio and walnut, made daily in Al-Hamidiyah Souq.", attribute "Weight" = "1 kg".

Product 2 — `damascene-brocade-fabric`:

```json
{
  "id": "0199aa00-0000-7000-8000-000000000302",
  "slug": "damascene-brocade-fabric",
  "name": "قماش بروكار دمشقي",
  "price": { "amountMinor": "12000000", "currency": "SYP", "display": "120,000.00" },
  "imageUrl": "https://cdn.trendsy.example/public/fixtures/brocade-md.webp",
  "storeId": "0199aa00-0000-7000-8000-000000000212",
  "storeName": "أنوال دمشق",
  "categoryId": "0199aa00-0000-7000-8000-000000000a12",
  "description": "بروكار دمشقي أصيل منسوج يدوياً من الحرير والقطن بنقوش تقليدية، يُباع بالمتر.",
  "variants": [ { "id": "0199aa00-0000-7000-8000-000000000321", "name": "متر", "price": { "amountMinor": "12000000", "currency": "SYP", "display": "120,000.00" }, "inStock": true } ],
  "media": [ { "assetId": "0199aa00-0000-7000-8000-000000000402", "urls": { "thumb": "https://cdn.trendsy.example/public/fixtures/brocade-thumb.webp", "sm": "https://cdn.trendsy.example/public/fixtures/brocade-sm.webp", "md": "https://cdn.trendsy.example/public/fixtures/brocade-md.webp", "lg": "https://cdn.trendsy.example/public/fixtures/brocade-lg.webp", "original": "https://cdn.trendsy.example/public/fixtures/brocade-original.webp" } } ],
  "store": { "id": "0199aa00-0000-7000-8000-000000000212", "slug": "anwal-dimashq", "name": "أنوال دمشق", "marketCode": "MIDHAT_PASHA" },
  "attributes": [ { "code": "material", "name": "الخامة", "value": "حرير وقطن", "valueCode": null }, { "code": "fabric_type", "name": "نوع القماش", "value": "بروكار", "valueCode": "brocade" }, { "code": "color", "name": "اللون", "value": "أحمر", "valueCode": "red" } ]
}
```

English strings for product 2: "Damascene brocade fabric", variant "1 m", description "Authentic hand-woven Damascene brocade of silk and cotton in traditional patterns, sold by the metre.", attribute "Material" = "Silk & cotton".

Draft (merchant/admin only, never public): `…0303` `embroidered-silk-shawl` · شال حريري مطرز / Embroidered silk shawl · variant `…0331` قطعة / 1 piece · 4 500 000 minor (45,000.00) · media `…0403` · no attributes.

### 5.6 StatusReasons

`libs/contexts/orders/src/domain/orders.fixtures.ts:288-312` (`REASON_FIXTURES`):

| kind | code | ar | en |
|---|---|---|---|
| `cancel` | `changed_mind` | غيرت رأيي | Changed my mind |
| `cancel` | `wrong_item` | طلبت المنتج الخطأ | Ordered the wrong item |
| `cancel` | `delivery_too_slow` | التوصيل تأخر | Delivery was too slow |
| `reject` | `out_of_stock` | المنتج غير متوفر | Out of stock |
| `reject` | `cannot_fulfil` | تعذر تجهيز الطلب | Cannot fulfil |
| `delivery_failed` | `no_answer` | لا يوجد رد | No answer |
| `delivery_failed` | `wrong_address` | العنوان غير صحيح | Wrong address |
| `return` | `damaged` | المنتج تالف | Damaged |
| `return` | `not_as_described` | مختلف عن الوصف | Not as described |

### 5.7 PaymentMethods

`libs/contexts/payments/src/domain/payments.fixtures.ts`: `cod` · enabled · ar «الدفع عند الاستلام» / «ادفع نقداً لمندوب التوصيل عند استلام طلبك.» · en "Cash on delivery" / "Pay the courier in cash when your order arrives."

### 5.8 Pages

`libs/contexts/content/src/domain/content.fixtures.ts` (`PAGE_FIXTURES`), all `updatedAt` `2026-08-31T12:00:00.000Z`, bodies are two short Markdown paragraphs:

| slug | title ar | title en |
|---|---|---|
| `about` | من نحن | About us |
| `return-policy` | سياسة الإرجاع | Return policy |
| `terms` | الشروط والأحكام | Terms & conditions |
| `contact` | اتصل بنا | Contact us |

Body excerpts (ar): about «منصة سورية وطنية للتجارة الإلكترونية تجمع أسواق دمشق ومولاتها في مكان واحد.\n\nنبدأ من أسواق دمشق العريقة — الحميدية والحريقة والشعلان — ونتوسع تدريجياً إلى كل المحافظات.»; return-policy «يمكنك طلب إرجاع المنتج خلال ثلاثة أيام من الاستلام إذا كان بحالته الأصلية.\n\nالدفع عند الاستلام: إذا رفضت الطلب عند باب المنزل قبل الدفع، لا تُحتسب أي رسوم عليك.»; terms «باستخدامك المنصة فأنت توافق على شروط الاستخدام هذه.\n\nالأسعار المعروضة بالليرة السورية وتشمل ما يُذكر صراحة فقط؛ رسوم التوصيل تظهر قبل تأكيد الطلب.»; contact «لأي استفسار أو مشكلة في طلبك، تواصل معنا عبر تطبيق واتساب أو الهاتف من التاسعة صباحاً حتى التاسعة مساءً.»

Note for design: the return-policy copy promises a three-day return window and the terms copy says "delivery fees are shown before you confirm an order" — the API has no return endpoint for buyers and no fee preview before the 201 (§2.11, §9). Both are content claims the product does not yet honour.

### 5.9 Home slots

`libs/contexts/content/src/domain/content.fixtures.ts` (`SLOT_FIXTURES`). Item shape `{ kind, title, imageUrl, targetType, targetId, sort }`; no image ratio is enforced or declared.

| slot | items |
|---|---|
| `home_hero` | 1 × `banner` — «سوق الحميدية بين يديك» / "Al-Hamidiyah Souq at your fingertips", `…/fixtures/hero-lg.webp`, target `market` `…c001`, sort 10 |
| `home_featured` | 2 × `product` — «بقلاوة مشكلة» `…/baklava-md.webp` → product `…0301` (sort 10); «قماش بروكار دمشقي» `…/brocade-md.webp` → product `…0302` (sort 20) |

### 5.10 The fixture buyer, cart and orders

- Buyer رانيا الحلبي: id `…0101`, `TS-C-000101`, `+963900000001`, locale `ar`, created `2026-08-26T09:00:00.000Z` (`libs/contexts/identity/src/domain/profile.fixtures.ts`); one address `…0111` «المنزل», path `SY.DMS.DMC.MUHAJIRIN.SHAALAN` (§2.2); `POST buyer/addresses` answers id `…0112`.
- Cart `…0501`: lines `…0502` (baklava, 8 500 000) and `…0503` (brocade, 12 000 000), subtotal 20 500 000, guest token `anon_0199aa00mockonlytoken0000000501` (`libs/contexts/cart/src/domain/cart.fixtures.ts`).
- Orders (`libs/contexts/orders/src/domain/orders.fixtures.ts`), every event `note: null`:

| order | id | checkout | store | status | created | lines | subtotal / fee / total | events |
|---|---|---|---|---|---|---|---|---|
| TS-000123 | `…0601` | `…0600` | بيت الشام للحلويات | `placed` | 2026-08-31T10:00Z | `…0611` baklava × 1 | 8 500 000 / 500 000 / **9 000 000** | placed 10:00 |
| TS-000124 | `…0602` | `…0600` | أنوال دمشق | `shipped` | 2026-08-31T10:00Z | `…0612` brocade × 1 | 12 000 000 / 500 000 / **12 500 000** | placed 10:00 · confirmed 10:30 · accepted 11:00 · shipped 12:00 |
| TS-000117 | `…0603` | `…0590` | بيت الشام للحلويات | `delivered` | 2026-08-25T14:00Z | `…0613` baklava × 1 | 8 500 000 / 500 000 / **9 000 000** | placed 08-25 14:00 · confirmed 14:20 · accepted 15:00 · shipped 08-26 09:00 · delivered 08-27 13:00 |
| TS-000131 | `…0604` | `…0591` | أنوال دمشق | `confirmed` | 2026-09-01T09:00Z | `…0614` brocade × **2** | 24 000 000 / 500 000 / **24 500 000** | placed 09:00 · confirmed 09:25 |

Shipments: `…0701` for TS-000124 (`in_transit`) and `…0702` for TS-000117 (`delivered`); TS-000123 and TS-000131 answer 404 on the shipment route. Carrier `manual` («التوصيل اليدوي»), one zone `SY.DMS.DMC` at 500 000 minor (`libs/contexts/shipping/src/domain/shipping.fixtures.ts`).

### 5.11 Test phones and OTP behaviour outside production

`.env.example:136-143` (validated in `libs/platform/src/config/env.schema.ts:404-420`, behaviour in `libs/contexts/identity/src/application/commands/auth.service.ts` and `…/infrastructure/adapters/otp-store.ts`):

- `OTP_TEST_PHONES=+963900000001 … +963900000009`, `OTP_TEST_CODE=000000`: a test phone never receives an SMS; the code is pinned to `000000`. Both must be empty in production.
- `+963900000001` is also the demo `super_admin` (`libs/contexts/identity/src/domain/demo-admin.seed.ts`) on the shared host — sign in with `audience: "buyer"` for buyer screens.
- Any other number: `GET public/dev/last-otp?phone=` returns the code when `DEV_ENDPOINTS_ENABLED=true` (local only; **off on the shared host**, so only the test phones work there).
- Console SMS adapter prints the code locally; no real SMS provider exists yet.

### 5.12 Attribute dictionary and category bindings **(A6)**

`libs/contexts/catalog/src/domain/catalog.fixtures.ts` (`ATTRIBUTE_FIXTURES`, `CATEGORY_ATTRIBUTE_BINDINGS`):

| Attribute id | code | type | name ar / en | unit | filterable | options (code → ar / en) |
|---|---|---|---|---|---|---|
| `…0a21` | `color` | select | اللون / Colour | — | yes | `red` أحمر / Red · `blue` أزرق / Blue · `gold` ذهبي / Gold |
| `…0a22` | `weight` | number | الوزن / Weight | كغ / kg | no | — |
| `…0a23` | `fabric_type` | select | نوع القماش / Fabric type | — | yes | `silk` حرير / Silk · `cotton` قطن / Cotton · `brocade` بروكار / Brocade |

Bindings: root category حلويات `…0a01` → `weight` (required, not filterable, order 10) + `color` (optional, filterable, 20); root أقمشة `…0a02` → `fabric_type` (required, filterable, 10) + `color` (optional, filterable, 20). The subcategories `…0a11`/`…0a12` bind nothing and inherit their parent. Live filter values: sweets → `color:gold` (1); fabrics → `fabric_type:brocade` (1), `color:red` (1); `blue`, `silk`, `cotton` are dictionary options no product carries, so they never appear in `/filters`.

### 5.13 Coupons and reviews **(A7)**

Coupons (`libs/contexts/cart/src/domain/cart.fixtures.ts` `CART_COUPON_FIXTURES`, mirrored in `libs/contexts/promotions/src/domain/promotions.fixtures.ts`):

| id | code | kind | value | minimum | valid | usage | name ar / en | against the fixture cart (subtotal 20 500 000) |
|---|---|---|---|---|---|---|---|---|
| `…0901` | `AHLAN10` | percentage | 1000 bps (10 %) | 5 000 000 | 2026-08-01 → 2026-12-31 | 137 / 1000 | خصم أهلاً 10% / Ahlan 10% off | **valid**, discount 2 050 000 → 18 450 000 |
| `…0902` | `SOUQ25` | fixed | 2 500 000 | none | 2026-06-01 → 2026-07-31 | 312 / 500 | عرض السوق / Souq offer | `expired`, terms still returned |

Any other code → `unknown_code`, `coupon: null`. The admin-created `HALAWIYAT15` (`…0903`, 15 %, sweets subtree only) is not in the cart's list, so it validates as `unknown_code`.

Reviews (`libs/contexts/reviews/src/domain/reviews.fixtures.ts`):

| id | product | rating | title | author | verified (order) | status | reply |
|---|---|---|---|---|---|---|---|
| `…0b01` | baklava `…0301` | 5 | بقلاوة ممتازة | رانيا ح. | yes (TS-000117) | published | `…0c05` «شكراً لك! سعداء أن البقلاوة وصلت طازجة.» 2026-08-28T15:40Z |
| `…0c02` | baklava | 3 | — | `null` | no | published | none |
| `…0c03` | brocade `…0302` | 2 | — | `null` | no | **hidden** (`offensive`, 2026-08-31) | never listed publicly |
| `…0c04` | brocade | 5 | قماش رائع | رانيا ح. | yes (TS-000124) | the answer `POST buyer/reviews` returns | — |

Report receipt id `…0c06`. Purchases known to the stub: رانيا bought baklava (TS-000117) and brocade (TS-000124).

### 5.14 Payment intents **(A7)**

`libs/contexts/payments/src/domain/payments.fixtures.ts`: `…0811` on TS-000131 (`…0604`, 24 500 000) — `sham_cash`, `requires_action`, created 2026-09-02T09:00Z, expires 09:30Z, redirect `https://pay.shamcash.example/checkout/…0811`; `…0812` on TS-000124 (`…0602`, 12 500 000) — `paymera`, `succeeded` 2026-08-31T09:58Z, `redirectUrl: null`. Provider checkout bases are placeholders (`pay.shamcash.example`, `pay.paymera.example`). Creating for TS-000124 → 409; for TS-000123/TS-000117 → 404 `payments.order_not_found` (the stub knows only two orders).

### 5.15 Notification preferences and device **(A6)**

`libs/contexts/notifications/src/domain/notifications.fixtures.ts`: channels `sms` (on, **required**), `whatsapp` (off), `push` (on); topics `order_updates` (on), `promotions` (off), `account_security` (on, **required**). Device registration always answers `…0b51`, `android`, 2026-09-02T09:00Z. SMS templates the buyer will receive (admin-editable, `TEMPLATE_FIXTURES`): `order_placed` «مرحباً {{customerName}}، استلمنا طلبك {{orderNumber}} وسنتصل بك لتأكيده.», `order_confirmed`, `order_shipped` «طلبك {{orderNumber}} في الطريق إليك مع {{carrierName}}.», `otp` «رمز الدخول: {{otpCode}} — صالح لمدة {{minutes}} دقائق.».

### 5.16 Search terms **(A6)**

`libs/contexts/search/src/domain/search.fixtures.ts`: product 1 matches بقلاوة, بقلاوة مشكلة, baklava, mixed baklava, حلويات, حلويات شرقية, sweets, oriental sweets, بيت الشام, دمشق, damascus; product 2 matches قماش, بروكار, قماش بروكار دمشقي, brocade, damascene brocade, damascene brocade fabric, fabric, fabrics, أقمشة, أقمشة دمشقية, damascene fabrics, أنوال دمشق, دمشق, damascus. Matching folds diacritics, tatweel, alef variants and ta-marbuta (`…/domain/search-matching.ts`), so «بقلاوه» finds the baklava. «دمشق» returns both products.

---

## 6. Errors

### 6.1 The problem+json document

`libs/platform/src/http/errors/problem-details.filter.ts:145-176`, type `libs/platform/src/http/errors/problem.ts:26-38`. Headers: `Content-Type: application/problem+json; charset=utf-8`, `Content-Language`, `Cache-Control: no-store`, `X-Request-Id`, `X-Api-Version`, plus error-supplied headers (`Retry-After` on 429s and on `idempotency.in_progress`).

```json
{
  "type": "https://docs.trendsy.example/errors/orders.invalid_transition",
  "title": "لا يمكن تنفيذ هذا الإجراء الآن",
  "status": 409,
  "detail": "An order that is shipped cannot be cancelled.",
  "instance": "/api/v1/buyer/orders/0199aa00-0000-7000-8000-000000000602/cancel",
  "code": "orders.invalid_transition",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736"
}
```

| Field | Design use |
|---|---|
| `title` | Localised by the request locale; safe to show to a buyer. Only 7 codes have their own sentence; every other code shows the per-status sentence (§6.3). |
| `detail` | English, developer-only, never echoes input. **Do not show to buyers.** |
| `code` | Branch on this. |
| `traceId` | 32 hex; show on error screens ("report a problem"). |
| `errors[]` | Present **only** on 422 `validation.failed`: `{ field, code, message }`, `message` always present, English. |
| `type` | Placeholder docs host; never branch on it. |

### 6.2 Complete `code` list

Status rules (`libs/platform/src/http/errors/status-for-code.ts:11-80`): an exact map first; then prefix `validation.` → 422; then suffix `_not_found` → 404, `_forbidden` → 403, `invalid_transition` → 409, `_conflict` → 409, `in_progress` → 409, `already_` → 409; else **422**. Arabic `title` = code-level where one exists (marked ★), otherwise the per-status title from §6.3.

**Platform** (`libs/platform/src/http/errors/problem.ts:41-62`, `status-for-code.ts`)

| code | status | title (ar) |
|---|---|---|
| `request.invalid` | 400 | طلب غير صالح |
| `request.malformed_json` | 400 | طلب غير صالح |
| `request.payload_too_large` | 413 | ★ حجم الطلب أكبر من المسموح |
| `request.unsupported_media_type` | 415 | نوع المحتوى غير مدعوم |
| `request.method_not_allowed` | 405 | الإجراء غير مدعوم |
| `request.conflict` | 409 | لا يمكن تنفيذ هذا الإجراء الآن |
| `request.unprocessable` | 422 | تعذّر قبول البيانات المرسلة |
| `route.not_found` | 404 | العنصر غير موجود |
| `validation.failed` | 422 | تعذّر قبول البيانات المرسلة |
| `validation.ltree_path` | 422 | ★ موقع جغرافي غير صالح (seeded, raised nowhere) |
| `validation.cursor` | 422 | تعذّر قبول البيانات المرسلة (`libs/shared-kernel/src/pagination/cursor.ts`) |
| `rate_limit.exceeded` | 429 + `Retry-After` | محاولات كثيرة، حاول بعد قليل |
| `internal` | 500 | حدث خطأ غير متوقع |
| `service.unavailable` | 503 | الخدمة غير متاحة مؤقتًا |

**`auth.*`** (`libs/platform/src/auth/auth.errors.ts:12-26`)

| code | status | title (ar) |
|---|---|---|
| `auth.token_missing` | 401 | يلزم تسجيل الدخول |
| `auth.token_expired` | 401 | يلزم تسجيل الدخول |
| `auth.token_invalid` | 401 | يلزم تسجيل الدخول |
| `auth.refresh_reused` | 401 | يلزم تسجيل الدخول |
| `auth.wrong_audience` | 403 | لا تملك صلاحية لهذا الإجراء |
| `auth.forbidden` | 403 | لا تملك صلاحية لهذا الإجراء |
| `auth.account_suspended` | 403 | ★ تم إيقاف هذا الحساب |
| `auth.otp_invalid` | 422 | ★ الرمز غير صحيح |
| `auth.otp_expired` | 422 | ★ انتهت صلاحية الرمز |
| `auth.otp_attempts_exceeded` | 429 + `Retry-After` | ★ محاولات كثيرة، اطلب رمزًا جديدًا |
| `auth.otp_cooldown` | 429 + `Retry-After` | ★ تم إرسال رمز للتو، انتظر قليلًا |
| `auth.locked` | 429 + `Retry-After` | محاولات كثيرة، حاول بعد قليل |
| `auth.password_invalid` | 422 | declared, no error class raises it |
| `auth.provider_unavailable` **(A7)** | **503** (exact map, `status-for-code.ts`) | ★ تسجيل الدخول بهذه الطريقة غير متاح حاليًا / That sign-in method is unavailable — the answer of both OAuth routes today; hide or disable the button, do not show an outage screen |

**`idempotency.*`** (`libs/platform/src/idempotency/idempotency.errors.ts:12-21`): `key_required` 400 · `key_invalid` 400 (key must be 8–64 of `[A-Za-z0-9._-]`) · `key_reused` 422 · `in_progress` 409 + `Retry-After: 1`.

**Context registries** (`libs/contexts/<ctx>/src/domain/errors.ts`; buyer-reachable ones in bold)

| code | status |
|---|---|
| **`cart.not_found`**, **`cart.item_not_found`** | 404 |
| **`catalog.product_not_found`**, **`catalog.category_not_found`** (form-schema / filters / import-template), `catalog.store_not_found`, `catalog.attribute_not_found`, `catalog.bulk_job_not_found` | 404 |
| `catalog.invalid_transition` | 409 |
| `catalog.attribute_options_not_supported`, `catalog.attribute_code_taken` (note: `_taken` is **not** a 409 suffix, so this answers 422), `catalog.bulk_file_invalid` | 422 |
| **`notifications.channel_unknown`**, **`notifications.topic_unknown`**, **`notifications.channel_required`**, **`notifications.topic_required`** (all `PUT buyer/notification-preferences`), `notifications.template_variable_unknown`, `notifications.template_subject_not_supported` | 422 |
| `notifications.template_not_found` | 404 |
| **`payments.intent_not_found`**, **`payments.order_not_found`**, `payments.payment_not_found` | 404 |
| **`payments.invalid_transition`** (order already paid, or refund of a non-succeeded intent) | 409 |
| `payments.refund_exceeds_amount` | 422 |
| `promotions.coupon_not_found` | 404 |
| `promotions.coupon_code_already_exists` | 409 |
| `promotions.coupon_invalid_period` | 422 |
| **`reviews.not_found`**, **`reviews.product_not_found`** | 404 |
| **`reviews.already_reviewed`**, `reviews.already_replied`, `reviews.invalid_transition` | 409 |
| **`reviews.purchase_required`** | 422 |
| **`content.page_not_found`**, **`content.slot_not_found`** | 404 |
| **`geo.market_not_found`**, `geo.node_not_found` | 404 |
| `identity.user_not_found`, **`identity.challenge_not_found`**, **`identity.address_not_found`** | 404 |
| **`identity.phone_invalid`** (not a Syrian mobile: `^\+9639\d{8}$` after normalisation, `libs/contexts/identity/src/domain/value-objects/phone.ts:15`) | 422 |
| `identity.user_already_suspended` | 409 |
| `identity.role_not_assignable` | 422 |
| `ledger.account_not_found` | 404 |
| **`media.asset_not_found`** | 404 |
| `media.upload_expired`, `media.type_not_allowed`, `media.upload_too_large`, `media.upload_size_invalid`, `media.kind_unavailable` | 422 |
| **`merchants.store_not_found`**, `merchants.merchant_not_found`, `merchants.application_not_found`, `merchants.staff_not_found` | 404 |
| `merchants.invalid_transition`, `merchants.application_invalid_transition` | 409 |
| `merchants.application_incomplete`, `merchants.staff_role_invalid` | 422 |
| **`orders.not_found`**, **`orders.checkout_not_found`**, `orders.return_not_found` | 404 |
| **`orders.invalid_transition`** | 409 |
| `orders.line_invalid` | 422 |
| `settlement.store_not_found` | 404 |
| **`shipping.shipment_not_found`**, `shipping.carrier_not_found` | 404 |
| `shipping.invalid_transition` | 409 |
| `analytics.*`, `audit.*`, `i18n.*`, `ref.*`, `search.*` | registries empty (search deliberately: no route can raise one) |

None of the A6/A7 context codes has its own Arabic sentence — every one shows the per-status title of §6.3 (`reviews.purchase_required` → «تعذّر قبول البيانات المرسلة», `payments.invalid_transition` → «لا يمكن تنفيذ هذا الإجراء الآن»). Only `auth.provider_unavailable` got a ★ title.

### 6.3 Per-status titles (the wording most buyer errors show)

`libs/platform/src/http/errors/problem-titles.seed.ts:43-75`, also seeded into `i18n.messages` namespace `errors`:

| status | ar | en |
|---|---|---|
| 400 | طلب غير صالح | Bad request |
| 401 | يلزم تسجيل الدخول | Authentication required |
| 403 | لا تملك صلاحية لهذا الإجراء | Not allowed |
| 404 | العنصر غير موجود | Not found |
| 405 | الإجراء غير مدعوم | Method not allowed |
| 409 | لا يمكن تنفيذ هذا الإجراء الآن | Action not possible right now |
| 413 | حجم الطلب كبير جدًا | Request too large |
| 415 | نوع المحتوى غير مدعوم | Unsupported media type |
| 422 | تعذّر قبول البيانات المرسلة | Request could not be processed |
| 429 | محاولات كثيرة، حاول بعد قليل | Too many requests |
| 500 | حدث خطأ غير متوقع | Unexpected error |
| 503 | الخدمة غير متاحة مؤقتًا | Service temporarily unavailable |

Consequence for design: `cart.item_not_found`, `orders.not_found` and `route.not_found` all show «العنصر غير موجود»; a screen wanting a specific message must map `code` itself.

### 6.4 The three `cart.*` warning codes

`(not in code)`. There is no field path in any 200 response where `price_changed`, `item_unavailable` or `store_inactive` appear, and no old/new money payload. The cart expresses one signal: `items[].available: false`. The reorder response carries `skipped[].reason` as a free string. Design should keep the "price changed" state in the kit, but it has no wire source until Phase B.

### 6.5 What `422 validation.failed` looks like

Pipe: `libs/platform/src/http/setup/configure-http-app.ts:92-105` (`whitelist` + `forbidNonWhitelisted`, so an unknown key is itself an error). Mapping: `libs/platform/src/http/errors/validation.ts:26-63` — `code = validation.<snake_case(constraint)>`, field path `parent.child`, arrays `items[0].qty`; at most 50 entries, messages ≤ 200 chars, English. Codes a buyer form will meet: `validation.is_defined` (missing required), `validation.is_uuid`, `validation.is_string`, `validation.max_length`, `validation.matches`, `validation.is_in`, `validation.is_int`, `validation.is_number`, `validation.min`, `validation.max`, `validation.whitelist_validation` (unknown key), `validation.is_boolean`, `validation.equals` (pre-registration `consent`).

`POST buyer/addresses` (`libs/contexts/identity/src/presentation/http/buyer/dto/address.dto.ts:110-185`) — fields and their possible codes: `label` (`is_string`, `max_length`), `governorateNodeId` / `cityNodeId` (`is_defined`, `is_uuid`), `areaNodeId` / `neighborhoodNodeId` (`is_uuid`), `description` (`is_defined`, `is_string`, `max_length`), `phone` (`is_defined`, `is_string`, `max_length`, `matches` — message "must contain only digits and phone punctuation"), `lat`/`lng` (`is_number`, `min`, `max`).

```json
{
  "type": "https://docs.trendsy.example/errors/validation.failed",
  "title": "تعذّر قبول البيانات المرسلة",
  "status": 422,
  "detail": "Request validation failed",
  "instance": "/api/v1/buyer/addresses",
  "code": "validation.failed",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "errors": [
    { "field": "governorateNodeId", "code": "validation.is_uuid", "message": "governorateNodeId must be a UUID" },
    { "field": "phone", "code": "validation.matches", "message": "must contain only digits and phone punctuation" },
    { "field": "lat", "code": "validation.max", "message": "lat must not be greater than 90" },
    { "field": "city", "code": "validation.whitelist_validation", "message": "property city should not exist" }
  ]
}
```

`POST buyer/checkouts` (`libs/contexts/orders/src/presentation/http/buyer/dto/order.dto.ts:259-305`): `cartId` / `addressId` (`is_defined`, `is_uuid`), `paymentMethodCode` (`is_defined`, `is_in` — "must be one of the following values: cod"), `couponCode` (`is_string`, `max_length`, `matches`), `note` (`is_string`, `max_length`). Field paths are flat (no nesting) on both DTOs. A missing required field yields `is_defined` **plus** each type constraint on the same `field`. Path parameter DTOs also answer 422 (not 400): a malformed `{id}` gives `errors[{ field: "id", code: "validation.is_uuid" }]`.

---

## 7. Lists, images, limits

### 7.1 Lists

`libs/platform/src/http/dto/cursor-pagination.query.dto.ts`: `limit` default **20**, max **100** (admin 200); `cursor` opaque unpadded base64url of `{ k: sortValue, i: id }`, ≤ 512 chars, unsigned; an invalid cursor is 422 `validation.cursor`, never silently page one.

| Endpoint | Paginated | Default / max | `sort` keys honoured | Filters |
|---|---|---|---|---|
| `GET public/products` | yes (+ `facets[]` over the whole set) | 20 / 100 | none in code (only `-createdAt` documented; validated by pattern, ignored) | `q` (≤ 200), `marketId`, `storeId`, `categoryId` (subtree), `priceMin`, `priceMax`, `attrs` (repeat) — all validated; **only `storeId`, `categoryId` and `attrs` filter today** **(A6)** |
| `GET public/search` **(A6)** | yes | 20 / 100 | none | `q` required, `categoryId` (ancestry), `marketId` |
| `GET public/search/suggest` **(A6)** | no (capped server-side; 4 fixture terms) | — | products before categories | `q` required |
| `GET public/products/{id}/reviews` **(A7)** | yes (+ `summary{}` over all published) | 20 / 100 | newest first (`sort` validated, ignored) | `rating` exact 1–5 |
| `GET public/categories/{id}/filters`, `form-schema`, `import-template` **(A6/A7)** | no (bounded by the dictionary; template ≤ 60 columns, ≤ 200 options) | — | form order | — |
| `GET buyer/notification-preferences` **(A6)** | no (3 channels × 3 topics) | — | fixed | — |
| `GET public/stores/{id}/products` | yes | 20 / 100 | none | none (no `q`, no category) |
| `GET buyer/orders` | yes | 20 / 100 | `-createdAt` only, ignored by the stub | `status` |
| `GET buyer/orders/{id}/events` | no (bounded by the machine) | — | — | — |
| `GET buyer/addresses` | no (no numeric cap in code) | — | default first | — |
| `GET buyer/auth/sessions` | no, capped **50** (`auth.service.ts:56`) | — | most recent first | — |
| `GET public/geo/tree`, `categories`, `markets`, `currencies`, `payment-methods`, `order-reasons` | no (bounded reference reads) | — | seed order | `kind` on reasons only |

### 7.2 Images

`libs/contexts/media/src/domain/value-objects/asset.ts`: variants `thumb` 160 · `sm` 320 · `md` 640 · `lg` 1280 · `original` (source size) — **target widths, resized never cropped**, WebP (quality 82), EXIF stripped. Real URL pattern (`libs/platform/src/storage/media-url.builder.ts`): `${MEDIA_PUBLIC_BASE_URL}/<sha[0:2]>/<sha[2:4]>/<sha256>.webp` — content-addressed, immutable, cache forever. Fixture pattern: `https://cdn.trendsy.example/public/fixtures/<base>-<variant>.webp` (bases `baklava`, `brocade`, `shawl`, `hero`; logos `<store>-logo.webp` with no variant).

- Product image aspect ratio: **nothing enforces or validates it** `(not in code)`; the fixtures are 1024×1280 (4:5) and the pending decision proposes 4:5 with no server crop (§11). Card `imageUrl` is always `md`.
- Max images per product: **20** on the merchant write (`libs/contexts/catalog/src/presentation/http/merchant/dto/merchant-product.dto.ts:80`); fixtures carry 1.
- Primary image: **positional** (`media[0]` is the cover); no `isPrimary`/`sortOrder` field.
- Upload constraints (merchant/admin only): JPEG/PNG/WebP, ≤ 10 MiB, ≤ 25 MP; HEIC refused at presign (iOS must transcode).
- Slot and store images are bare URLs with no variant choice.

### 7.3 Rate limits

`libs/platform/src/auth/throttler/throttler-options.ts`, defaults `.env.example:153-159`:

| Bucket | Limit | Window | Keyed by | Applies to |
|---|---|---|---|---|
| `public` | 60 | 1 min | `X-Device-Id`, else IP | every unauthenticated route by default (all `public/*` reads, cart, track) |
| `publicIp` | 600 | 1 min | IP | backstop across devices behind one IP |
| `auth` | 600 | 1 min | user id | every bearer route (`buyer/*`) |
| `otpPhone` | 3 | 10 min | phone (last 9 digits) | `otp/request` |
| `otpDevice` | 10 | 1 h | `X-Device-Id` (skipped without it) | `otp/request` |
| `otpIp` | 100 | 1 h | IP | `otp/request`, `otp/verify`, `dev/last-otp` |
| `prereg` | 50 | 1 h | IP | `pre-registrations`, `merchants/applications`, **`reviews/{id}/report`** (A7) |

The two OAuth routes sit in the `public` bucket (`public-oauth.controller.ts:64,89`) — DOC≠CODE with `STATUS.md`, which says they share `otpIp`.

Refusal: 429 `rate_limit.exceeded` with `Retry-After` and `RateLimit-Limit` / `RateLimit-Remaining` / `RateLimit-Reset` (the tightest bucket). Budgets are per caller across routes, not per route. Send `X-Device-Id` from mobile so the per-device bucket, not the shared-IP one, applies.

### 7.4 Text length limits (user-entered fields)

| Field | Limit | Source |
|---|---|---|
| Address `label` | ≤ 50, free text | `libs/contexts/identity/src/presentation/http/buyer/dto/address.dto.ts:111` |
| Address `description` | ≤ 500, required on create | same `:151-158` |
| Address `phone` | ≤ 20, `^[0-9+()\s-]+$` | same `:160-168` |
| Address `lat` / `lng` | −90…90 / −180…180 | same `:170-184` |
| Profile: display name | `(not in code)` — only `locale` is editable | `me.dto.ts:38-47` |
| Cart `qty` | 1…99 integer | `libs/contexts/cart/src/presentation/http/dto/cart.dto.ts:156-170` |
| Coupon `code` | 3–20, `^[A-Z0-9]{3,20}$` (uppercase only — the client should upper-case input) | same `:173-183`; `order.dto.ts:285-294` |
| Checkout `note` | ≤ 500 | `order.dto.ts:296-304` |
| Cancel `reasonCode` | picker code, `^[a-z][a-z0-9_]{1,49}$` | `order.dto.ts:307-317` |
| Cancel `note` | ≤ 500 | `order.dto.ts:319-327` |
| OTP `phone` | ≤ 20, `^[0-9+()\s-]+$`; must normalise to `+9639XXXXXXXX` | `otp-request.dto.ts:13-22`; `phone.ts:15` |
| OTP `code` | ≤ 8 digits (6 issued) | `otp-verify.dto.ts:12-17` |
| Device label | ≤ 200 printable | `otp-verify.dto.ts:19-32` |
| Pre-registration `phone` / `source` / `qrCode` | ≤ 20 / ≤ 100 / ≤ 64; `consent` must be `true` | `libs/contexts/analytics/src/presentation/http/public/dto/pre-registration.dto.ts` |
| Track `event` / `source` / `utm.*` | `^[a-z0-9_.]{1,64}$` / ≤ 100 / ≤ 100 each | `…/dto/track-event.dto.ts` |
| Search `q` | ≤ 200 on products; **1–200, required** on `search` / `suggest` | `product-list.query.dto.ts`; `libs/contexts/search/src/presentation/http/public/dto/search.dto.ts` |
| Review `title` / `body` **(A7)** | ≤ 120 / ≤ 2000, `rating` int 1–5 | `libs/contexts/reviews/src/domain/reviews.fixtures.ts:12-15`, `…/buyer/dto/buyer-review.dto.ts` |
| Review report `note` **(A7)** | ≤ 500 | `…/public/dto/public-review.dto.ts` |
| Coupon validate `code` **(A7)** | 3–20, `^[A-Z0-9]{3,20}$` | `cart.dto.ts` (`ValidateCouponDto`) |
| Payment `returnUrl` **(A7)** | ≤ 2048, `https` only | `payment-intent.dto.ts` |
| Push `token` / `deviceId` / `appVersion` **(A6)** | ≤ 4096 / ≤ 100 / ≤ 40 | `buyer-notifications.dto.ts` |
| Preference `channel` / `topic` codes **(A6)** | ≤ 40, `^[a-z][a-z0-9_]*$`, ≤ 20 entries per array | same |
| OAuth `idToken` / `device` **(A7)** | ≤ 4096 `^[A-Za-z0-9._~+/=-]+$` / ≤ 200 printable | `oauth-sign-in.dto.ts` |
| `attrs` filter value | `<code>:<optionCode>`, repeat per value | `product-list.query.dto.ts` |

---

## 8. Auth and session facts a screen depends on

Sources: `.env.example:125-142`, `libs/platform/src/config/env.schema.ts:404-419`, `libs/contexts/identity/src/application/commands/auth.service.ts`, `…/infrastructure/adapters/otp-store.ts`, `…/presentation/http/public/refresh-cookie.ts`, `…/public/public-auth.controller.ts:128-165`.

**OTP.** Code length 6 digits (`OTP_LENGTH`, 4–8 allowed); expiry 300 s (`expiresInSeconds` is echoed in the 202); resend cooldown 60 s (`resendAfterSeconds` echoed; a request inside it is 429 `auth.otp_cooldown` + `Retry-After`); max attempts 5 per challenge — the 6th wrong code burns the challenge and answers 429 `auth.otp_attempts_exceeded` with `Retry-After` = the cooldown, after which the user must request a new code. No account lock exists. Wrong code → 422 `auth.otp_invalid`; expired or unknown challenge → 422 `auth.otp_expired` / `auth.otp_invalid` (deliberately indistinguishable); non-Syrian number → 422 `identity.phone_invalid`; suspended account → 403 `auth.account_suspended`. Per-phone throttle: 3 requests per 10 minutes. `audience` must be sent (`buyer` for the app). The 202 is identical whether or not the phone has an account — no "new user" hint before verify.

**Verify response** (`TokenPairDto`): `accessToken` (RS256 JWT), `refreshToken` (**omitted on web**), `expiresIn: 600`, `isNewUser` (true when this verification created the account — the onboarding branch), and `user`:

```json
{ "id": "0199c5e8-7a1f-7c3d-9b2a-4f6e8d0a1b2c", "customerNumber": 100042, "locale": "ar" }
```

Note `customerNumber` is a **number** here and a **string** (`TS-C-000101`) on `GET buyer/me` — treat the verify value as opaque and read the profile for display.

**Tokens.** Access token 10 minutes (`JWT_ACCESS_TTL_SECONDS=600`), claims `sub`, `aud`, `sid`, `roles`, `scp`, `locale`, `iss`, `iat`, `exp`, `jti`. Refresh token 30 days (`REFRESH_TTL_DAYS`), opaque, **rotated on every use**; presenting a used one answers 401 `auth.refresh_reused` and kills the whole family (every device signed in through that session) — clients must serialise concurrent refreshes. No separate absolute lifetime beyond the 30-day refresh TTL. A 401 after one failed refresh means "sign in again"; a 401 `auth.token_missing` on a `buyer/*` route from a guest is the **login prompt** (checkout), not a session expiry.

**Web cookie** (`refresh-cookie.ts`): name `trendsy_rt`, `HttpOnly`, `Secure` outside development, `SameSite=Strict`, `Path=/api/v1/public/auth`, `Domain=REFRESH_COOKIE_DOMAIN`, `Max-Age` 30 days. Web vs mobile is detected by the presence of an `Origin` header on verify/refresh: a browser gets the cookie and no `refreshToken` in the body. `SameSite=Strict` means the web app must be same-site with the API (proxy `/api` or run it locally in dev).

**Sign-out.** `POST buyer/auth/logout` (this session, clears the cookie) and `POST buyer/auth/logout-all` (every device), both 204. **A sessions list exists**: `GET buyer/auth/sessions` (§2, `SessionDto`) and `DELETE buyer/auth/sessions/{id}` (204 always) — the "your devices" screen; the row whose `id` equals the token's `sid` is this device. Device rows show `deviceLabel` (what the app sent on verify), `deviceModel`, `osName`, `osVersion`, `clientPlatform`, `clientVersion`, `lastSeenAt`, `createdAt`; IP and user agent are never returned.

**Client headers** the app should send (`libs/platform/src/http/setup/configure-http-app.ts:25-40`): `X-Client-Platform` (`android|ios|web`), `X-Client-Version`, `X-Client-Build`, `X-Device-Id`, `X-Device-Model`, `X-OS-Name`, `X-OS-Version`, `Accept-Language`, `X-Anonymous-Token`, `Idempotency-Key`. Values ≤ 100 printable chars.

**Google / Apple sign-in (A7).** `POST public/auth/oauth/google|apple` take `{ idToken, locale?, device? }` from the provider SDK and are documented to answer the same `TokenPairDto` as `otp/verify` (web: refresh cookie; mobile: body). **Today every call answers 503 `auth.provider_unavailable`** («تسجيل الدخول بهذه الطريقة غير متاح حاليًا») — no provider is integrated, and the backend refuses to mint a token from an unverified id token. Design the buttons, ship them hidden or disabled behind that code, and keep the phone flow primary; `isNewUser` semantics will be the same as OTP when it lands.

**Push (A6).** After sign-in register the handset with `POST buyer/devices`; on sign-out `DELETE buyer/devices/{id}`. Notification switches: §2.24.

**`GET buyer/me`** full shape: exactly `{ id, customerNumber, phone, locale, createdAt }` (§2.1). `abilities`: `(not in code)`. `DELETE buyer/me`: 204, immediate anonymisation by contract, every session revoked; stubbed as a no-op today; irreversible; no undo window.

---

## 9. Checkout and order facts

- **`POST buyer/checkouts`** request `{ cartId, addressId, paymentMethodCode: "cod", couponCode?, note? }` + required `Idempotency-Key` (§2.11). Response 201 `CheckoutResponseDto`: `id`, `createdAt`, `paymentMethodCode`, `address` snapshot, `orders[]` (**one `OrderSummaryDto` per store**, each already `placed`), and checkout-level `itemsSubtotal`, `deliveryFee`, `discount`, `grandTotal`. Replaying the same key returns the same checkout (documented; the interceptor is not attached yet, so a replay today creates a second identical fixture answer).
- **Delivery fee**: present, per order (`OrderDetailDto.deliveryFee`) and summed on the checkout. Source: the carrier zone (`manual`, `SY.DMS.DMC`, 500 000 minor = 5,000.00 SYP) — one flat fee per store-order, Damascus city only. **No fee preview before placing, no free-delivery threshold** `(not in code)`.
- **Delivery window / ETA**: `(not in code)` on cart, checkout, order, event and shipment.
- **Cancel window**: status-based only — `placed`, `confirmed`, `accepted` (until the store ships); no hour rule (§3.1). `cancellable` on the detail is authoritative. Cancel needs a `reasonCode` from `kind=cancel` and takes an optional note; answers the updated `OrderDetailDto` (status `cancelled`, label «تم إلغاء الطلب»); after shipping, 409 `orders.invalid_transition` («لا يمكن تنفيذ هذا الإجراء الآن»).
- **`OrderEvent`** contains `seq`, `status`, `label`, `occurredAt`, `note` only — no type, actor or reason (§2.13). Timeline = the buyer-visible slice; a cancelled order's reason is not returned.
- **Reorder**: yes, `POST buyer/orders/{id}/reorder` → `{ cartId, addedCount, skipped[{ variantId, reason }] }`; the buyer then opens the cart.
- **Coupon check (A7)**: `POST buyer/cart/coupon/validate` answers `valid` + a typed `reason` + the resulting `discount`/`totalAfterDiscount` **before** checkout (§2.21) — the one place a pre-checkout total preview exists; still excludes delivery. Guests have no validate route (bearer only).
- **Rating / reviews (A7)**: `POST buyer/reviews` (verified purchase, one per product), `GET public/products/{id}/reviews` with `summary`, `POST public/reviews/{id}/report` (§2.25). Product cards and detail carry **no** rating field; the reviews call is separate.
- **Prepayment (A7)**: `POST buyer/payments/intents` + `GET buyer/payments/intents/{id}` exist as stubs (§2.22, §3.9) but checkout still accepts `paymentMethodCode: "cod"` only, so no real prepaid flow can be started from a checkout today.
- **Returns**: no buyer endpoint `(not in code)`; `return_requested` is created by an admin (`POST admin/orders/{id}/returns`) from `delivered` only, so a buyer "request a return" screen has no API — the return-policy page text promises one.
- **Payment**: COD only on checkout; the order documents carry no payment status or receipt. Intent objects live on the separate `buyer/payments/intents` routes (§2.22).

---

## 10. Analytics and deep links

**`POST public/track`** (`libs/contexts/analytics/src/presentation/http/public/dto/track-event.dto.ts`): body `{ event, source?, utm?: { source?, medium?, campaign? }, sessionId? }`. `event` is a free string matching `^[a-z0-9_.]{1,64}$` (example `product.viewed`) — **no enum of accepted names and no `payload`/`props` object** `(not in code)`; `utm_term`/`utm_content` are not accepted (unknown keys are 422). Device/app identity comes from the `X-Client-*` headers. Always 202 `{ accepted: true }`; nothing persists today; clients must never retry or surface a failure.

**`GET public/qr/{code}`** (`…/analytics-public.controller.ts:48-70`, `libs/contexts/analytics/src/domain/analytics.fixtures.ts`): 302. Known code `SOUQ_HAMIDIYAH` → `https://trendsy.chato-app.com/?src=qr&code=SOUQ_HAMIDIYAH`; any other well-formed code → `https://trendsy.chato-app.com/?src=qr`; a malformed code (not `^[A-Za-z0-9_-]{1,64}$`) → 422. The only query params appended are `src=qr` and `code=`; no `utm_*` `(not in code)`. The landing base URL is a hard-coded fixture constant (interim host), not config.

**`POST public/pre-registrations`**: `{ phone, source?, qrCode?, consent: true }` → 201 `{ id }`; the phone is never echoed.

**Slugs** (`^[a-zA-Z0-9-]+$`, ≤ 100 for products/stores, ≤ 64 for markets; pages lowercase `^[a-z0-9-]+$`):

| Entity | `slug` | Uniqueness | Can change |
|---|---|---|---|
| Product | yes | not yet in a schema (catalog is mock-only) `(not in code)` | undefined until Phase B; the DTO calls it "URL-stable" |
| Store | yes | same | same |
| Market | yes | `unique('markets_slug_key')` and `markets_code_key` in `libs/contexts/geo/src/infrastructure/persistence/schema.ts:81-91` | seeded, not editable by buyers |
| Category | **yes** on the DTO (`sweets`), addressed by id in filters (no `/categories/{slug}` route) | `(not in code)` | — |
| Page | the slug is the identity | fixture | — |
| Order | no slug; `orderNumber` (`TS-000123`) is the human key | — | — |

`{idOrSlug}` routes accept either and match id first, then slug (`libs/contexts/catalog/src/application/queries/get-product.query.ts:44-46`); nested routes (`stores/{id}/products`) are id-only by design. Web deep links should use slugs for products, stores, markets; ids are per-environment.

---

## 11. Open questions for design, from the backend's point of view

- **Money `display` digit set for `ar`** — Latin digits are pinned today (`libs/shared-kernel/src/money/money.ts:209-215`); STATUS *Pending decisions* row "Digit set of the money `display` string for `ar`", proposed Latin everywhere. Decide before S1.3.
- **`display` keeps `.00` and carries no symbol or code** (`money.ts:222-232`); pending row "hide `.00` for whole pounds? `SYP` code vs symbol", proposed hide `.00`, code until brand. Design must choose where `ل.س` / `SYP` sits relative to the number and whether `85,000` or `85,000.00` is the target.
- **Product image ratio** — nothing in code enforces one; fixtures are 4:5 (`libs/contexts/media/src/domain/media.fixtures.ts`); pending row proposes 4:5 with no server crop. Variants are width-fit, never cropped (`libs/contexts/media/src/domain/value-objects/asset.ts:29-34`), so a mixed-ratio grid needs a client crop policy.
- **Address `label`** is free text (`address.dto.ts:111`); if design wants Home/Work chips they are client-side presets.
- **Cart warnings** (`price_changed`, `item_unavailable`, `store_inactive`) are absent from the wire (§6.4); the only signal is `available: false`. Design the states, expect no payload until Phase B.
- **No delivery ETA, fee preview or per-store fee breakdown before checkout** (§9); the terms page copy promises fees "before you confirm".
- **No buyer return request** (§9) while the return-policy page promises a three-day window.
- **Order-status Arabic labels differ between `docs/frontend/design-handoff.md` §3 and the served strings** (§4.1); the served strings win.
- **Shipment statuses have no i18n namespace** (`libs/contexts/i18n/src/domain/i18n.fixtures.ts` serves `orders` and `cancel_reasons` only); tracking-screen labels are client-owned for now.
- **`customerNumber` is a number on verify and a string on `me`** (`otp-verify.dto.ts` vs `me.dto.ts`); display from `me`.
- **Slot items carry a single `imageUrl` and no target slug** (`slot.dto.ts`); web banners need an id→slug lookup or a URL target the API does not have.
- **Market has no image or description** (`market.dto.ts`); a market landing screen needs client art.
- **Store has no phone, hours, cover or status** (`store.response.dto.ts`).
- **Profile has no display name or avatar** (`me.dto.ts`); the app cannot greet the user by name.
- **`?lang=en-US` resolves to Arabic while the header form resolves to English** (`libs/platform/src/http/context/locale.ts:36-48`); web deep links must pass `?lang=en` exactly.
- **Only two published products and two stores exist as fixtures** (`catalog.fixtures.ts`); list screens must be designed for real volume against Prism's `mock:dynamic` output, and empty/one-item states are what the live stub shows.
- **HEIC is refused at upload** (`upload-mime.ts`); the iOS upload flow (merchant panel, later buyer reviews) must transcode on device.
- **`Idempotency-Key` is document-only on checkout, cancel and payment-intent create** (`orders.controller.ts:32-41`, `payments-buyer.controller.ts`); the client must still generate and retain one per attempt now so the behaviour does not change when the interceptor lands.
- **Coupon refusal wording is client-owned (A7)** — seven `reason` codes (§3.11), no server sentence; design needs seven localised messages, one of which («expired») can quote `coupon.validUntil`.
- **Review author placeholder (A7)** — `authorName` is `null` for accounts with no display name (the profile has no name field at all, §2.1), so today **every** review a real buyer writes would show the placeholder; the fixture's «رانيا ح.» comes from a name the API cannot yet collect.
- **Hosted-checkout return flow (A7)** — the provider page opens from `redirectUrl` and returns to the app's `returnUrl`; the app must then poll the intent (§2.22). Design the "waiting for confirmation" state; there is no in-app payment form and no `failureCode` enumeration.
- **Payment intent per order vs one per checkout** — a two-store basket would be paid twice under the current shape; open in STATUS *Pending decisions*. Keep the payment screen per order until ruled.
- **OAuth buttons answer 503 by design (A7)** — treat `auth.provider_unavailable` as "hide this method", never as an outage.
- **Search hits are products only (A6)**; store and category hits (and any ranking) come with OpenSearch. Suggestions are terms, not links — tapping one must re-run the search.
- **Facet counts are over the whole filtered set (A6)**, never the page, and only `select`/`multi_select` attributes can be filters; a price-range slider has no bounds source `(not in code)`.
- **Required notification switches (A6)** — `sms` and `account_security` must render disabled-on; there is no email channel and no quiet-hours setting.
