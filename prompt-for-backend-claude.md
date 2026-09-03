# Prompt to run in the Trendsy backend repository

Paste everything below the line into Claude Code opened at the backend repo root. It produces one file, `docs/design-handoff-data.md`, that the UI/UX side needs. Copy the result into `d:\Trend\uiux\`.

---

You are working in the Trendsy backend repository (NestJS + PostgreSQL, REST under `/api/v1`). The design team is planning the buyer mobile app and buyer website for the MVP (Slice 1) and needs a single, exact, design-oriented description of the data this API exposes. Produce it as `docs/design-handoff-data.md`.

## Ground rules

1. **Read the code, not the docs.** Derive every fact from the actual source of truth in this order: OpenAPI/Swagger output or decorators → DTO classes and validation decorators → Prisma/TypeORM entities and migrations → seed files → enum files → i18n message files. Use `docs/` and `conventions.md` only to explain intent, and flag any place where the docs and the code disagree.
2. **Never invent.** If a field, endpoint or enum value does not exist in the code, write `(not in code)` rather than a plausible guess. If something exists but is unfinished (TODaO, stubbed controller, feature flag off), write `(stubbed)` with the file path.
3. **Cite.** Every table row that states a field name or enum value carries the file path where it is defined, as `src/…`.
4. **Scope.** Buyer-facing only: the `public/` and `buyer/` audiences. List `merchant/` and `admin/` endpoints in one short appendix by path only; do not expand them.
5. **Design's questions, not the backend's.** For every entity, answer: what a screen can show, which fields are always present versus optional, which are localised, which are money, which are enums, how many items a list returns, and what a screen must do when the value is missing or unknown.
6. **Money is `{ amountMinor: string, currency, display: string }`. Dates are ISO-8601 UTC. Ids are UUIDv7.** Confirm each of these against the serializers and note any exception.
7. **Write in English** for field names and structure. Quote Arabic strings verbatim where they are the actual values (i18n messages, seeded names, reason labels). Do not translate seeded data.

## Required sections, in this order

### 0. Status of the API on the day you run this
- Which slice is implemented, which endpoints respond today, whether an OpenAPI file is generated and where (`path`), whether Prism mock is configured, base URLs per environment from the config module. List anything from `endpoints-by-slice.md` that is still missing in code.

### 1. Endpoint catalogue (buyer + public)
One table per audience: method, path, auth, query params with types and defaults (`limit`, `cursor`, `sort` keys allowed, filter names), request body DTO name, response DTO name, error codes this handler can raise, whether it requires `Idempotency-Key`, whether it returns `ETag`. Mark each as `live`, `stubbed`, or `planned`.

### 2. Entity data sheets
One subsection per entity that a buyer screen renders: **User, Address, GeoNode, Market, Merchant (only what leaks to buyers), Store, Category, Product, Variant, Price, Asset/Media, Cart, CartItem, Checkout, Order, OrderLine, OrderEvent, StatusReason, Shipment/ShipmentEvent, PaymentMethod, Page, Slot/SlotItem.**

For each entity give:
- **Wire shape as JSON** exactly as the buyer endpoint returns it (copy from the response DTO or serializer, with realistic values from the seed). Show nesting: does Product embed Variants? Does Order embed OrderLines and OrderEvents, or are they separate calls?
- **Field table:** name · type · required/optional/nullable · localised (single resolved string, or `{ar,en}`) · source file · design note (max length, format, whether it can be empty, whether it is a human-readable number like `orderNumber`).
- **Which list endpoint returns a summary shape versus which detail endpoint returns the full shape**, with the difference listed field by field.
- **Media:** which entities carry images, how many, in which order, and which variant sizes exist.
- **What is missing that a screen would want** (for example: no `compareAtPrice`, no store phone, no delivery estimate) — one bullet each, so design can plan the absent state.

### 3. Enums and state machines
For every enum a buyer screen renders: the exact string values from the code, the transitions allowed (from the state machine or service guards), which transitions the buyer can trigger and via which endpoint, and which need a reason (`StatusReason` kind). Include: order status, product status, media status, shipment status, payment method, cart warning codes, address label if enumerated.

### 4. i18n
- The namespaces available from `GET public/i18n/messages?ns=`, and for each namespace the full key list with the Arabic and English values as seeded today.
- How status labels, reason labels and category names are resolved, and what a client receives for a key that has no translation.
- The `Accept-Language` fallback rule as implemented.

### 5. Seed data (verbatim)
- The full **GeoNode tree** for Damascus as seeded, to the neighbourhood level, in a nested list with ids and Arabic names.
- The **13 Markets**: id, slug, Arabic name, English name if any, neighbourhood node, description, image count.
- The **Category tree** to leaf level with slugs and Arabic names, and the display order if one exists.
- **Stores** seeded: name, market, status.
- **Products** seeded: count per category, and five complete example products as returned by the detail endpoint (real seeded values, not made up).
- **StatusReasons** for each `kind`, with Arabic labels.
- **PaymentMethods** seeded.
- **Pages** seeded: slugs and titles.
- **Slots** seeded for the home screen: slot keys, item shape, image ratio if enforced.
- **Test phones** and the OTP behaviour in non-production.

### 6. Errors
- The problem+json shape as serialized, and the complete list of `code` values defined in the codebase (grep the error/exception module), grouped by prefix, each with the HTTP status it uses and the Arabic `title` as seeded.
- The three `cart.*` warning codes: exactly where they appear in a 200 response (field path) and their payload (for `price_changed`, both old and new money objects?).
- What `422 validation.*` errors look like for the address and checkout DTOs, with the actual `field` paths a client will receive.

### 7. Lists, images, limits
- Default and max `limit` per list endpoint; allowed `sort` keys per endpoint; which endpoints support `q`, `marketId`, `storeId`, `categoryId`, `priceMin/Max`.
- Image variant widths and URL pattern, product image aspect ratio if enforced or validated anywhere, max images per product, whether a primary image is marked.
- Rate limits per route group as configured.
- Text length limits from validation decorators for every user-entered field (address description, label, name, note, review later).

### 8. Auth and session facts a screen depends on
- OTP: code length, expiry, resend cooldown, max attempts, exact error codes, and what `user` in the verify response contains.
- Access and refresh token lifetimes, the web cookie attributes, the `logout` and `logout-all` paths, whether a sessions list exists `(not in code)` if it does not.
- `GET buyer/me` full shape including `customerNumber`, `locale`, `abilities`.
- `DELETE buyer/me` behaviour.

### 9. Checkout and order facts
- The `POST buyer/checkouts` request and response shape, including how orders per store are returned, whether delivery fee and delivery window are present and where they come from `(not in code)` if absent.
- The cancel window rule as implemented (hours, statuses).
- What an `OrderEvent` contains: type values, actor, reason, note, timestamp.
- Whether reorder, rating, or returns have any buyer endpoint today.

### 10. Analytics and deep links
- `POST public/track` accepted event names and payload schema from the DTO.
- QR redirect behaviour and the query params it appends.
- Slug rules: which entities have slugs, uniqueness, whether slugs can change.

### 11. Open questions for design, from the backend's point of view
Anything in the code that is undecided, flagged with TODO, or that design needs to choose (image ratio, `display` format for whole amounts, which currency symbol). One bullet each, with the file path.

## Output conventions
- Markdown, one file, tables for field lists, fenced JSON for shapes.
- Put a header block at the top: git commit hash, date, and the command used to generate the OpenAPI file if any.
- Keep every claim traceable. A reviewer will spot-check ten random rows against the source; a row that cannot be traced fails the file.
- Do not modify any source file. Do not run migrations against any non-local database.
