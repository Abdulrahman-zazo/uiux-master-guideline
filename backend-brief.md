# Trendsy backend — brief for frontend clients
 
| Owner | Status | Last reviewed |
|---|---|---|
| Ahmed (CTO) | Compiled — regenerated from the API docs with every handoff note; never edit a fact here first | 2026-08-20 |
 
> **Version 2026-08-20 (handoff #0).** Reissued with every handoff note. If a newer copy exists, use it.
> Applies to: Flutter buyer app · buyer website · admin panel · merchant panel · landing page.
 
## 0. How to use this file
 
Put it in your repository and let your AI assistant read it:
 
- **Claude Code:** save it as `CLAUDE.md` at the repo root. If you already have one, save it as `docs/backend.md` and add the line `@docs/backend.md` to your `CLAUDE.md`.
- **Anything else:** treat it as the API specification until the OpenAPI snapshot arrives.
Everything in sections 3–15 is **already decided and will not change**. Build against it today. Where a number or a shape is still open, it is marked *(open)* — do not design around those.
 
This is a compiled copy of the backend's own documents. If the two ever disagree, the backend repository wins; tell Ahmed and he reissues this file.
 
---
 
## 1. What the backend is — and what it is not
 
| | |
|---|---|
| Style | **REST over JSON.** No GraphQL, no gRPC, no realtime socket in the MVP |
| Server | One NestJS/PostgreSQL API that we own and run. Endpoints are versioned under `/api/v1` |
| Auth | **Our own phone-OTP + JWT.** *Not* Firebase Auth, not Auth0, not Supabase, not social login in Slice 1 |
| Database | You never touch one. No Firestore, no Realtime Database, no direct SQL, no Supabase client |
| File upload | Our presigned-upload flow (§9). **Not** Firebase Storage, not direct S3 credentials |
| Push | Firebase Cloud Messaging — **only FCM, and only from Slice 2** (§10) |
| Realtime updates | None. Poll, or wait for a push. There are no websockets and no server callbacks to clients |
| Analytics of record | Our own `POST public/track` (§11). You may add Firebase Analytics/Crashlytics for your own diagnostics, but product metrics come from our endpoint |
 
**Do not add a BaaS SDK to the project.** The only Firebase product in this system is Cloud Messaging.
 
---
 
## 2. What exists today (20 Aug 2026) and how to start anyway
 
| Thing | State |
|---|---|
| A running API you can call | **none yet** — first local backend 22–23 Aug, no shared/staging server at all |
| OpenAPI / Swagger file | **none yet** — first snapshot 22 Aug, then reissued after every backend task |
| The rules in this file (auth, errors, money, pagination, headers, images) | **final today** |
| The **entities**, their relationships and their state machines | **final today** — §15. Model them now |
| The **JSON field names** of those entities (`product.images` or `product.media`? does Order embed its lines?) | **do not exist yet.** Nobody knows them, including us |
 
**Therefore the one architectural rule that matters right now:**
 
> Define **one `ApiClient` interface** describing the calls your screens need. Put your invented fixtures behind it as one implementation. **No screen, widget, page or store may import a fixture directly.**
 
When the real spec lands you write a second implementation of the same interface and delete the first. If you skip this, entity shapes leak into every widget and the rewrite costs days instead of an afternoon.
 
Invent your fixture field names freely — but make every fixture obey §6, §7, §8 and §9 exactly, because *those* are real. A fixture with `price: 12500.0` as a float is a bug you will pay for later; `{ "amountMinor": "1250000", "currency": "SYP", "display": "12,500.00" }` is correct.
 
---
 
## 3. Base URLs, audiences, versioning
 
| Environment | API base | Media base |
|---|---|---|
| Local (backend run on your machine) | `http://localhost:3000/api/v1` | `http://localhost:9000/trendsy-media/public` |
| Local mock (Prism, from 22 Aug) | `http://localhost:4010` | — |
| Staging | none — decision pending | none |
| Production | not created (waits on the brand/domain decision) | not created |
 
**Never hardcode a base URL.** One build-time setting per target (`local`, `mock`, `staging`, `production`), one place in the code.
 
Every path is `/api/v1/<audience>/…`:
 
| Audience segment | Who calls it | Token needed |
|---|---|---|
| `public/` | anyone — browsing, categories, products, geo, i18n, currencies, static pages, OTP, guest cart | no |
| `buyer/` | signed-in buyer | `aud: buyer` |
| `merchant/` | merchant staff (Slice 2) | `aud: merchant` |
| `admin/` | platform staff | `aud: admin` |
 
A token whose `aud` does not match the path segment gets **403 `auth.wrong_audience`** — a buyer token can never call `/admin/*`.
 
**Additive changes may appear at any time**: new endpoints, new optional fields, new enum values. Your client must ignore unknown JSON fields and render unknown enum values neutrally instead of crashing. Breaking changes never happen on a published path — they ship as a new path with `Deprecation` and `Sunset` headers and at least three weeks of notice.
 
---
 
## 4. Headers
 
| Header | When | Value |
|---|---|---|
| `Authorization: Bearer <jwt>` | every authenticated call | access token, 10-minute lifetime |
| `Accept-Language` | **every call** | `ar` (default) or `en`. Response carries `Content-Language`. `?lang=` in a URL overrides it, for deep links |
| `Idempotency-Key: <uuid v4>` | required on the calls in §12 | one key per user attempt, **reused on every retry of that attempt** |
| `X-Anonymous-Token` | guest cart calls | returned by `POST public/carts` |
| `X-Request-Id` | optional, recommended | your own id (≤ 64 chars); the server echoes it. Makes bug reports findable |
| `If-None-Match` | public catalogue GETs | the previous `ETag`; handle `304 Not Modified` |
 
Responses carry `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, and `Retry-After` on 429.
 
Rate limits: public reads 60/min per IP · authenticated 600/min per user · OTP request 3 per phone per 10 min (60 s resend cooldown) · OTP verify 5 attempts per challenge.
 
---
 
## 5. Authentication (build this first — it is the only thing that is live early)
 
### Phone OTP — the only Slice 1 login
 
```
POST /api/v1/public/auth/otp/request
{ "phone": "+963900000001", "audience": "buyer", "locale": "ar" }
 
202 { "challengeId": "0190c5e8-…", "expiresInSeconds": 300, "resendAfterSeconds": 60 }
```
 
```
POST /api/v1/public/auth/otp/verify
{ "challengeId": "0190c5e8-…", "code": "000000", "device": { … } }
 
200 { "accessToken": "eyJ…", "refreshToken": "…", "user": { … }, "isNewUser": true }
```
 
- 6-digit code · valid 300 s · resend cooldown 60 s · 5 attempts per challenge.
- A user account is created on the first successful verify (`isNewUser: true` → show a welcome/profile step).
- Failures: `422 auth.otp_invalid` · `422 auth.otp_expired` · `429 auth.otp_attempts_exceeded` · `429 auth.otp_cooldown`.
- **Test phones on local and staging:** `+963900000001` … `+963900000009` always accept the code `000000`. For any other phone, non-production exposes `GET /api/v1/public/dev/last-otp?phone=` — use it in automated tests, never in shipped code.
Admin staff sign in with `POST /api/v1/admin/auth/login { phone, password }` → OTP challenge → `POST /api/v1/admin/auth/verify`. Same token pair, `aud: admin`. *(The password half is still open.)*
 
Google and Apple sign-in are **Slice 2–3** and may never arrive — enrolment for a Syrian entity is an open risk. Do not build UI for them now.
 
### Tokens
 
| Token | Lifetime | Where to keep it |
|---|---|---|
| Access (JWT RS256) | **10 minutes** | Mobile: secure storage (Keychain / Keystore). Web: **memory only** — never `localStorage` |
| Refresh (opaque string) | 30 days, **rotated on every use** | Mobile: response body → Keychain / Keystore. Web: the server sets an `HttpOnly; Secure; SameSite=Strict` cookie — you never see it and never store it |
 
**Web only:** send `credentials: 'include'` on exactly these routes and nowhere else — `POST public/auth/otp/verify`, `POST public/auth/oauth/*`, `POST admin/auth/verify`, `POST public/auth/refresh`, `POST {audience}/auth/logout`, `POST {audience}/auth/logout-all`.
 
### Refresh — get this exactly right
 
```
POST /api/v1/public/auth/refresh
{ "refreshToken": "…" }        // mobile; web sends the cookie instead
 
200 { "accessToken": "…", "refreshToken": "…" }   // the old refresh token is now dead
```
 
Rules your HTTP layer must enforce:
 
1. On `401`, refresh **once**, retry the original request **once**, and if that fails, sign the user out. Never loop.
2. **Single-flight:** if ten requests get a 401 at the same moment, exactly one refresh call goes out and the other nine wait for it. Parallel refreshes make the server think the token was stolen.
3. Reusing an already-used refresh token returns `401 auth.refresh_reused` and **revokes the whole session family** — the user must sign in again. This is theft detection, not a bug.
4. Never retry a `403`, a `422` or any non-`401` as if it were an auth problem.
`POST {audience}/auth/logout` ends this session; `logout-all` ends every session on every device.
 
### Account deletion — required in the first app build
 
`DELETE /api/v1/buyer/me` anonymises the account and revokes every session. Apple rejects any app that creates accounts without in-app deletion (Review Guideline 5.1.1(v)), so this ships in build #1, not "later". Put it in account settings with a clear confirmation and a link to the privacy policy (`GET public/pages/{slug}`).
 
### Permissions in panels
 
`GET /api/v1/{audience}/me` returns the profile, roles and a compact `abilities` list. Use it to **hide** actions the user cannot perform — but always handle a `403` anyway. The server is the authority; the UI is a convenience.
 
---
 
## 6. Errors — one shape, always
 
Every non-2xx response is `application/problem+json`:
 
```json
{
  "type": "https://docs.trendsy.example/errors/orders.invalid_transition",
  "title": "لا يمكن تنفيذ هذا الإجراء على الطلب",
  "status": 409,
  "detail": "Order is already shipped",
  "instance": "/api/v1/buyer/orders/0190c5e8-…/cancel",
  "code": "orders.invalid_transition",
  "traceId": "4bf92f3577b34da6a3ce929d0e0e4736",
  "errors": [{ "field": "items[0].qty", "code": "validation.min", "message": "…" }]
}
```
 
- **Branch on `code`. Never on `title`, `detail`, or the status alone.** `code` is stable forever; `title` is translated and may be reworded by an admin at any time.
- `title` is already localised for your `Accept-Language` — show it to the user as-is.
- `detail` is English, for developers. Do not show it to users.
- `errors[]` appears only on `422` validation problems: one entry per field, `field` matching your form field path.
- **Always log `traceId`, and show it on error/support screens.** A bug report without it cannot be investigated.
- `type` points at a docs URL on a placeholder domain that changes with the brand. Ignore it.
Status meanings: `400` malformed JSON or a missing `Idempotency-Key` · `401` token missing/expired/invalid · `403` forbidden or wrong audience · `404` not found · `409` invalid state transition or conflict · `422` validation **and every business-rule violation** · `429` rate limited · `500` internal · `503` API not ready.
 
Error codes you will meet in Slice 1: `auth.otp_invalid`, `auth.otp_expired`, `auth.otp_attempts_exceeded`, `auth.otp_cooldown`, `auth.token_expired`, `auth.token_invalid`, `auth.refresh_reused`, `auth.wrong_audience`, `auth.forbidden`, `cart.item_unavailable`, `cart.store_inactive`, `cart.price_changed`, `checkout.empty_cart`, `checkout.address_invalid`, `checkout.payment_method_unavailable`, `orders.not_found`, `orders.invalid_transition`, `orders.cancel_window_closed`, `orders.reason_required`, `catalog.product_not_found`, `media.upload_expired`, `media.type_not_allowed`, `idempotency.*`, `validation.*`, `rate_limit.exceeded`, `internal`. The list grows; unknown codes must fall back to `title` plus a generic retry action.
 
Note the three `cart.*` codes: on cart read and cart merge they arrive as **warnings alongside a successful response**, not as errors. Show them inline on the affected line (or on the store group for `store_inactive`) and let the user continue.
 
---
 
## 7. Lists — cursor pagination only
 
```
GET /api/v1/public/products?categoryId=…&limit=20&cursor=<opaque>
 
200 { "items": [ … ], "nextCursor": "eyJ…" | null, "hasMore": true }
```
 
- **There are no page numbers, no offsets and no total counts on public lists.** Do not build a numbered pager; build infinite scroll or a "load more" button.
- `limit` defaults to 20, max 100 (admin lists 200).
- `cursor` is opaque — pass it back exactly as received, never parse or construct one.
- Sorting is `sort=-createdAt` (leading `-` = descending); allowed keys are per endpoint. The cursor encodes the sort, so **changing `sort` invalidates the cursor** — reset to the first page.
- Filters are plain query parameters: `categoryId`, `marketId`, `storeId`, `q`, `priceMin`, `priceMax`, `status`, `from`, `to`, and `attrs[size]=M&attrs[color]=red` in Slice 2.
Build one generic paginated-list helper and use it everywhere. Test it against a fixture of at least 60 items so you actually exercise `hasMore: false`.
 
---
 
## 8. Field formats — these are absolute
 
| Topic | Rule |
|---|---|
| **Ids** | UUIDv7 strings: `"0190c5e8-4b2a-7c3e-9f1a-2b3c4d5e6f70"`. Treat as opaque strings. Some entities also carry a human `orderNumber` / `customerNumber` — show that to users, send the id to the API |
| **Dates** | ISO-8601 UTC with `Z`: `"2026-08-20T08:53:00.000Z"`. **Always convert to `Asia/Damascus` for display.** Date-only values are `YYYY-MM-DD` |
| **Money** | `{ "amountMinor": "1250000", "currency": "SYP", "display": "12,500.00" }` |
| **Percentages** | integer basis points: `250` means 2.5 % |
| **Enums** | lower_snake_case strings (`delivery_failed`). Unknown values must render neutrally, never crash |
| **Phones** | E.164 in requests: `+9639xxxxxxxx`. Responses mask them except for the owner and admins |
| **Localised text** | Buyer/merchant endpoints return one resolved string (`name`) already falling back to Arabic. **Admin endpoints return `{ "ar": "…", "en": "…" }` on fields ending `_i18n`** — the admin form edits both, Arabic required |
| **Nulls / PATCH** | an absent optional field means `null`. `PATCH` uses merge semantics: send only changed fields; sending `null` clears a value |
 
### Money, in detail — this is where clients break
 
`amountMinor` is a **string** holding minor units (SYP has exponent 2, so `"1250000"` = 12,500.00 SYP).
 
- Parse it as `BigInt` (Dart: `BigInt.parse`) if you must compute. **Never `double`, never `int`, never `Number`.** JavaScript `Number` and Flutter-web `int` both lose precision at these magnitudes.
- **For display, render the `display` field as-is.** Do not re-format it, do not append your own currency symbol, do not strip characters. It is already formatted for the request locale by the server, which means one change on our side updates every screen at once.
- *(open)* Whether `display` hides `.00` for whole amounts, and whether it uses the code `SYP` or a symbol, is still being decided; the digits are Latin in both locales. Because you render `display` verbatim, the decision costs you nothing.
- Never do arithmetic on `display`.
### Addresses
 
Request shape: `{ governorateNodeId, cityNodeId, areaNodeId, neighborhoodNodeId, description, phone, lat, lng, label }`. Reads add the resolved names.
 
- The four `*NodeId` fields come from `GET public/geo/tree` — Syria has **no reliable street addressing**, so the address is a cascade of picked geography nodes plus a free-text landmark description. Build cascading selects, never a free-text city field.
- Limits: `description` ≤ 300 characters, `label` ≤ 40, `phone` E.164, `lat`/`lng` optional.
---
 
## 9. Images and upload
 
Every media object looks like this:
 
```json
{ "id": "…", "urls": { "thumb": "…", "sm": "…", "md": "…", "lg": "…", "original": "…" }, "width": 1600, "height": 1200 }
```
 
Widths: `thumb` 160 · `sm` 320 · `md` 640 · `lg` 1280. Pick the smallest variant whose width ≥ container width × device pixel ratio — lists use `thumb`/`sm`, galleries `md`/`lg`. URLs are content-addressed and immutable: **cache them forever**. Show a blurred `thumb` or a neutral placeholder while the larger variant loads.
 
Upload (admin in Slice 1, merchant in Slice 2) is a three-step flow — there are no storage credentials in the client:
 
1. `POST /api/v1/{audience}/media/uploads { mime, bytes, purpose }` → returns a presigned `PUT` URL and an `assetId`.
2. `PUT` the raw bytes to that URL with **exactly** the `Content-Type` and byte count you declared. A mismatch is rejected.
3. Send the `assetId` with the entity you are creating.
The asset is processed asynchronously: it appears as `uploading → processing → ready` (or `failed`). Thumbnails exist only at `ready` — poll `GET public/media/{id}` or re-read the parent entity, and show a processing placeholder meanwhile.
 
Client-side rules: compress before upload (longest side ≤ 1600 px, JPEG quality ~85, strip EXIF except orientation) · max 10 MB · JPEG, PNG, WebP, HEIC accepted · **SVG rejected**. iOS HEIC is accepted, but declare the real mime of the bytes you actually send.
 
*(open)* Product image aspect ratio (4:5 vs 1:1) is being decided with the designer. Build the image container so the ratio is one constant.
 
---
 
## 10. Firebase — Cloud Messaging only, Slice 2
 
**Do not use Firebase for authentication, database, storage, hosting or remote config.** Push notifications are the single use.
 
Push is a **Slice 2** capability: the endpoints below do not exist in Slice 1, and no FCM project has been created yet. There is also a real risk that Firebase enrolment is unavailable to a Syrian legal entity — so keep FCM behind a small interface (`PushService`) that can be swapped or disabled without touching any screen.
 
What to prepare now, so Slice 2 is a day of work rather than a week:
 
1. Create your app records (bundle id / package name) — those are needed for the store listings anyway.
2. Keep `google-services.json` / `GoogleService-Info.plist` **out of the repository**; they arrive from us with the FCM project.
3. Ask for notification permission **contextually** — after the first order is placed, not on app launch.
4. Wrap all of it in `PushService` with three methods: `register()`, `unregister()`, `onMessage(handler)`.
When it lands the contract is:
 
- Register the FCM token with `POST /api/v1/buyer/devices` after login and again whenever the platform rotates it; `DELETE /api/v1/buyer/devices/{id}` on logout.
- Message data payload: `{ type, orderId, status, title, body, deepLink }`.
- Render `title` and `body` **as received** — they are localised server-side. Route on `deepLink` (§11). When `type = order_status`, refetch the order detail rather than trusting the payload.
- Respect `GET` / `PUT /api/v1/buyer/notification-preferences` in settings.
In Slice 1, order updates reach the buyer by SMS/WhatsApp from the backend, and the app simply refetches. Build the "my orders" screen so a pull-to-refresh is enough.
 
---
 
## 11. Deep links and analytics
 
| Route | Target |
|---|---|
| `/p/<slug-or-id>` | product detail |
| `/c/<category-slug>` | category browse |
| `/m/<market-slug>` | market page |
| `/s/<store-slug>` | store page |
| `/q/<qr-code>` | QR landing — the web calls `GET public/qr/{code}`, which redirects with `?src=qr&store=<id>` |
 
Accept **both** slug and id everywhere: slugs can change, ids never do. Preserve `src`, `store`, `utm_*` and `?lang=` from the landing URL for the whole session.
 
Analytics go to `POST /api/v1/public/track` — fire-and-forget, batched, never blocking the UI:
 
| Event | When | Payload |
|---|---|---|
| `page_view` | screen or route shown | `path`, `referrer` |
| `product_view` | product detail opened | `productId`, `storeId` |
| `add_to_cart` | item added | `variantId`, `qty` |
| `begin_checkout` | checkout opened | `cartId` |
| `order_placed` | checkout succeeded | `checkoutId` |
 
Every event also carries a `sessionId` (random per install / browser session), the preserved `source` and `utm` values, and the locale. `qr_scan` and `pre_registration` are recorded server-side — do not send them.
 
**Never put PII in an event**: no phone number, name, address or free text. Ever.
 
---
 
## 12. Idempotency — mandatory on money-moving calls
 
These calls **require** an `Idempotency-Key` header (a UUID you generate) and return `400 idempotency.key_required` without one:
 
`POST buyer/checkouts` · `POST buyer/orders/{id}/cancel` · `POST buyer/payments/intents` · `POST admin/payments/{id}/refund` · `POST merchant/orders/{id}/accept|reject|unavailable` · `POST admin/settlement/payouts` · `POST admin/settlement/remittances`
 
Rules:
 
- **One key per user attempt**, generated when the user presses the button — and **reused unchanged on every retry** of that same attempt (timeout, connection drop, tapping again). Generating a new key per HTTP call defeats the entire mechanism and can create two orders.
- Same key + same body → the original response is replayed with an `Idempotent-Replayed: true` header. Treat it as success.
- Same key + a different body → `422 idempotency.key_reused`.
- Two requests with the same key in flight → `409 idempotency.in_progress`; wait a second and retry with the same key.
- Keys live 24 hours.
- Disable the button while a request is in flight, and **never use optimistic UI for a state transition** — wait for the response and re-render from it. On `409 orders.invalid_transition`, refetch: someone else moved the order.
One checkout produces **one order per store**. A cart with items from three stores returns three orders from a single `POST buyer/checkouts`. Design the confirmation screen for a list of orders from the start, not for one.
 
---
 
## 13. Arabic, RTL and locale
 
- **Arabic is the primary language**, English is secondary. Design and build RTL-first, then verify LTR — not the other way around.
- Send `Accept-Language: ar` or `en` on every request. The server resolves text for you.
- **Never hardcode a status label, a reason, a category name or any backend vocabulary.** Backend strings come from `GET /api/v1/public/i18n/messages?ns=` and are editable by admins without a release — keys look like `order.status.delivered`. Cache each namespace with its `ETag` and refresh on app start.
- Reason pickers (cancel, reject, delivery-failed, return) are **data**, not code: `GET /api/v1/public/order-reasons?kind=cancel|reject|delivery_failed|return`. Build one generic single-select picker with an optional free-text note. If a transition needs a reason and none is given you get `422 orders.reason_required`.
- Mixed AR/LTR content (phone numbers, prices, order numbers inside Arabic text) needs bidi isolation, or digits will jump around.
---
 
## 14. Order statuses (for your badge component)
 
`awaiting_payment` *(Slice 3)* · `placed` · `confirmed` · `accepted` · `rejected` · `shipped` · `delivered` · `delivery_failed` · `cancelled` · `return_requested` · `returned` · `completed` · `payment_failed` *(Slice 3)*
 
Other sets you will need: **product** `draft`, `pending_review`, `approved`, `rejected`, `published`, `suspended`, `archived` · **merchant** `registered`, `verified`, `active`, `suspended` · **shipment** `created`, `picked_up`, `in_transit`, `delivered`, `failed`, `returned` · **media** `uploading`, `processing`, `ready`, `failed`, `deleted`.
 
Two rules for every badge component: labels come from the i18n endpoint (§13), and **an unknown value renders neutrally with the raw string** rather than throwing. New statuses will appear.
 
`confirmed` means *confirmed by phone call*: in Slice 1 a person calls the buyer before the order proceeds. Say so in the UI — a mandatory line at checkout reads *"we will call you to confirm your order"*.
 
---
 
## 15. The domain entities — model these today
 
There are **two different things** people mean by "the entities", and only one of them is ready:
 
| Layer | What it is | Ready? |
|---|---|---|
| **Domain model** — `Product`, `Order`, `Cart`, `Store`… | the business objects, their relationships and their state machines | **Yes. Decided, stable, below.** Write these classes today |
| **DTO / wire model** — the JSON each endpoint returns | exact field names, nesting, optionality, what each endpoint includes | **No.** Arrives with the OpenAPI snapshot, per slice |
 
So: build a **domain layer** now from the map below, keep the **DTOs** generated from the spec later, and put a **mapper** between them. The mapper is the only file that changes when a field is renamed. If instead you name your API response classes "the domain model", every rename reaches every widget.
 
### The Slice 1 entity map
 
| Entity | Belongs to / holds | What matters to a client |
|---|---|---|
| **User** | has many **Address** | phone is the identity; also carries a human `customerNumber` and a locale |
| **Address** | belongs to User; points at four **GeoNode**s | not a street address — see §8 |
| **GeoNode** | tree: country → governorate → city → area → neighborhood | the whole tree comes from one call; cascading selects |
| **Market** | sits in a GeoNode (neighborhood) | a souk, a mall or a street. Slice 1 seeds 13 of them in Damascus |
| **Merchant** | has many **Store** | the *legal entity* — the company that signed the contract |
| **Store** | belongs to a Merchant **and** to a Market | the *physical shop*. **Merchant ≠ Store, 1:N** — this is the relationship people get wrong. Products, orders and settlement all hang off the Store, not the Merchant |
| **Category** | tree | products are in exactly one leaf category |
| **Product** | belongs to a Store and a Category; has many **Variant**, many **Asset** | translatable name/description; attribute values are **data**, not fields (§ below) |
| **Variant** | belongs to a Product; has **Price** rows and **Inventory** | what is actually added to a cart and ordered — never the Product itself |
| **Price** | belongs to a Variant, **effective-dated** | there is no single "the price": there is the price effective now. SYP only |
| **Asset** | referenced by Product, Store, content | media; `uploading → processing → ready` (§9) |
| **Cart** | guest or user; has many **CartItem** | a guest cart exists before login and is merged into the user's on login |
| **CartItem** | points at a Variant | carries the quantity; price is revalidated server-side on every read |
| **Checkout** | one per payment attempt; produces many **Order** | **one checkout → one order per store** |
| **Order** | belongs to a Store; has many **OrderLine**, many **OrderEvent** | has a human `orderNumber`; status per §14 |
| **OrderLine** | belongs to an Order | a **snapshot**: product name, variant and unit price are frozen at placement. A later price change never alters a past order |
| **OrderEvent** | append-only log on an Order | **this is the tracking timeline** — render the events, do not reconstruct history from the current status |
| **StatusReason** | referenced by cancel / reject / delivery-failed / return | data, localised, loaded from the API (§13) |
| **Return** | belongs to an Order | manual procedure in Slice 1 |
| **Carrier** / **Shipment** / **ShipmentEvent** | Shipment belongs to an Order | Slice 1 is one manual carrier; shipment events drive the order forward |
| **PaymentMethod** | — | Slice 1 has exactly one: cash on delivery |
| **Page** / **Slot** / **SlotItem** | content | static pages; home banner slots |
| **PreRegistration** / **QrCode** | landing page | write-only from the client |
| *(admin only)* **CommissionRule**, **SettlementItem**, **Account**, **JournalEntry**, **Posting**, **AuditLog**, **Delivery** | — | read-only tables in the admin panel; the ledger shows debit/credit direction, never a signed balance |
 
### What is already true about every entity's fields
 
Model these with confidence — they are guaranteed by rules the backend cannot break:
 
- Every entity has an `id`: a **UUIDv7 string**, opaque. Orders and users additionally carry a human number (`orderNumber`, `customerNumber`) for people to read aloud on the phone.
- Every timestamp is **ISO-8601 UTC with `Z`**; you display `Asia/Damascus`.
- Every monetary field is the **three-part money object** of §8 — never a number.
- Every status field is one of the enums in §14, and **unknown values will appear**.
- Every business entity carries a **`geoNodeId`** (and its path). Geography is never free text.
- Buyer and merchant endpoints return **one resolved string** for translatable text (`name`), already falling back to Arabic. Admin endpoints return `{ ar, en }` on fields ending `_i18n`.
- Category, Product, Store and Market each have a latin **`slug`**, and an id route always works as a permanent fallback.
- **Product attributes are data, not fields** (colour, size, material…). They arrive as a list of attribute/value pairs in Slice 2 — never as columns on Product. Do not add `color`/`size` fields to your Product class; add a generic attribute list.
- There is **no soft-delete flag** anywhere. Entities have lifecycle statuses; orders and ledger rows are immutable; a deleted user is anonymised while their orders keep the same id.
### What you must not guess
 
The **names**, the **nesting** and **which fields each endpoint actually returns**. `product.images` vs `product.media` vs `product.assets`, whether a Variant carries its price inline or by reference, whether Order embeds its lines — all undecided. Put every one of those behind the `ApiClient` interface (§2), pick whatever reads well in your fixtures, and expect the mapper — and only the mapper — to change.
 
---
 
## 16. What to actually build first
 
A concrete file list for the shared client layer, in dependency order. None of it needs the API to exist.
 
| # | Module | What it does |
|---|---|---|
| 1 | `env` / config | one base URL per target (§3); no URL literal anywhere else |
| 2 | `http_client` | base client, `Accept-Language`, `X-Request-Id`, timeouts, one retry on network failure for **GET only** |
| 3 | `problem.dart` / `problem.ts` | parse §6, expose `code`, `title`, `traceId`, `errors[]`; one `AppError` type the UI understands |
| 4 | `token_store` | secure storage (mobile) / memory (web); read, write, clear |
| 5 | `auth_interceptor` | 401 → **single-flight** refresh → one retry → sign out (§5). The hardest file in the project; write its tests first |
| 6 | `money` | parse `amountMinor` as BigInt, render `display` verbatim (§8) |
| 7 | `paginated_list` | cursor helper + a list controller with loading / empty / error / end states (§7) |
| 8 | `image_variant` | pick `thumb`/`sm`/`md`/`lg` by container width × DPR (§9) |
| 9 | `idempotency` | generate a key per attempt, hold it across retries (§12) |
| 10 | `i18n` | `Accept-Language`, RTL layout, bidi isolation, backend messages cached by `ETag` (§13) |
| 11 | `domain/` | your own entity classes from §15 — plus the mappers that will translate DTOs into them |
| 12 | `api_client` | **the interface** every screen depends on — plus a fixture implementation (§2) |
| 13 | `analytics` | `POST public/track` batching behind an interface; a no-op sink until the endpoint exists (§11) |
| 14 | `push_service` | empty interface now; FCM behind it in Slice 2 (§10) |
 
Screens come after 1–12 exist. Modules 3, 5, 6, 7 and 9 are where clients normally get this wrong, so they deserve unit tests before any screen is written.
 
---
 
## 17. Hard rules for your AI assistant
 
1. **Do not invent an endpoint or a response shape and present it as real.** If it is not in this file, it does not exist yet — build it behind the `ApiClient` interface as a clearly-named fixture and say so. The **entities** in §15 are real and safe to model; their **JSON field names** are not.
2. **Do not add a BaaS SDK** (Firebase Auth/Firestore/Storage, Supabase, Amplify). See §1.
3. **Never store an access token in `localStorage`** or a refresh token anywhere on the web.
4. **Never do float or `Number` arithmetic on money.** `amountMinor` is a string; render `display`.
5. **Never hardcode a status label, reason or backend string** — read them from the i18n endpoint.
6. **Never branch on `title`, `detail` or a status code alone** — branch on `code`.
7. **Never build page numbers.** Cursors only.
8. **Never use optimistic UI for a state transition**, and never send a fresh `Idempotency-Key` on a retry.
9. **Never log or transmit PII** — phone, OTP code, token, address — to analytics, crash reporters or console output.
10. **Ignore unknown JSON fields and unknown enum values.** They will appear without notice, and crashing on them is a bug in the client, not the server.
11. When something is genuinely blocked on a backend answer, **stop and ask** rather than guessing a shape — a guess becomes load-bearing within a day.
---
 
## 18. When you need something changed
 
Send Ahmed: the screen, the endpoint, the current shape, the shape you need, why, and your deadline. It is triaged within one business day and the decision is written down before any code changes. Emergencies still get written down afterwards.
 
Two things worth knowing: a **shape fix** (a field is missing, wrong type, wrong nesting) is cheap and welcome — ask early. A **new feature** is a product decision and goes to the Wednesday review instead.
 
Always include the `traceId` from the problem response when reporting a bug, plus the method, path, environment, and your `X-Request-Id`. Strip phone numbers and addresses from anything you paste.
 
---
 
Related: this brief is compiled from the backend repository — [conventions.md](../api/conventions.md) (wire rules) · [auth.md](../api/auth.md) (auth flows) · [endpoints-by-slice.md](../api/endpoints-by-slice.md) (endpoint plan) · [client-guidelines.md](client-guidelines.md) (client behaviours) · [design-handoff.md](design-handoff.md) (design implications) · [start-here.md](start-here.md) (build order). Ask Ahmed for any of them; on a disagreement, those files win.
 