# Trendsy — Website Flowchart
 
---
 
## Summary
 
Trendsy is an Arabic-first e-commerce platform connecting buyers with traditional Syrian market merchants (souqs). The website is built on Next.js 15 with full RTL support, targeting Syrian buyers on weak mobile networks.
 
**The core user journey is simple:** browse or search for a product → view product details → add to cart → checkout with cash on delivery → track the order.
 
**Guest browsing is fully supported.** A visitor can browse, search, and add items to cart without logging in. Authentication is only required at the point of checkout, after which the guest cart is merged with the user account.
 
**Authentication is OTP-only** via phone number (E.164 format). Google and Apple Sign-In exist in the flow but are Post-MVP and may never ship. There are no passwords.
 
**Payment in MVP is primarily Cash on Delivery.** ShamCash and Paymera appear in the flow but are secondary options. The checkout is intentionally linear: address → payment method → review → confirm.
 
**Order confirmation in Phase 1 requires a phone call.** After placing an order, the buyer receives a call from the team to confirm before the order moves forward. This must be communicated clearly on the confirmation screen: *"We will call you to confirm your order."*
 
**Order tracking uses polling, not WebSockets.** The order detail page refreshes every 15 seconds to reflect status changes. The tracking UI is built from an event log (`OrderEvent[]`), not a static progress bar.
 
**The merchant is a traditional souq seller** with minimal digital experience. The merchant console (separate app) is intentionally simple: view orders, update status, manage products.
 
**All public pages (homepage, product, category, store, market) are server-rendered (SSR/ISR)** for SEO and performance. All authenticated pages (cart, checkout, orders, account) are client-side rendered only — SSR for authenticated pages is architecturally forbidden due to token rotation behavior.
 
<!-- --- -->


 
## Entry Point
 
```
[Trendsy Homepage]
```
 
---
 
## Main Navigation
 
```
[Homepage]
├── [Featured Products]
├── [Filter by Market]
├── [Browse / Search]
├── [Cart]
├── [Account]
└── [Static Pages]
```
 
---
 
## Browse & Search Flow
 
```
[Browse / Search]
├── [Category Browse]
│   └── [Category Page]
│       └── [Search Results]
│           ├── [Filters]
│           │   └── [Filter by Market]
│           ├── [Cart Items]
│           └── [Sub-category]
│
└── [Search]
    └── [Search Results]
        ├── [Filters]
        └── [Cart Items]
```
 
---
 
## Product Detail Flow
 
```
[Product Page]
├── [Merchant Card]
│   ├── [Merchant Info]
│   ├── [Merchant Location in Market]
│   └── [Merchant Products]
├── [Ratings]
├── [Buyer Location]  ← Delivery estimate
└── [Cart]           ← Add to cart
```
 
---
 
## Cart & Checkout Flow
 
```
[Cart]
├── [Guest Trigger] ──────────────────────────────────────────┐
│                                                              ↓
│                                                   [Register / Login]
│                                                   [Auth Screen]
│                                                       ├── OTP
│                                                       ├── Google
│                                                       └── Apple
│                                                              ↓
│                                                   [OTP Verify]
│                                                              ↓
│                                              ┌── [After Login] ──┐
│                                              ↓                   ↓
└── [Complete Order Button] ──────────► [Checkout Screen]          │
                                              │                    │
                                    ┌─────────┴──────────┐        │
                                    ↓                    ↓        │
                             [Address Book]        [New Address]   │
                             [Addresses]                           │
                                    │                              │
                                    ↓                              │
                             [Payment Method]                      │
                                    ├── Cash on Delivery           │
                                    ├── ShamCash                   │
                                    └── Paymera                    │
                                    │                              │
                                    ↓                              │
                             [Review & Confirm]                    │
                                    │                              │
                                    ↓                              │
                             [Order Created]  ◄─────────────────── ┘
```
 
---
 
## Order Management Flow
 
```
[My Orders]
└── [Order Detail]
    ├── [Order Status]  ← real-time polling
    ├── [Cancel Order]  ← based on order status
    ├── [Reorder]
    └── [Rate Product]  ← after delivery
```
 
---
 
## Account Flow
 
```
[My Account]
├── [Account Data / Profile]
├── [Address Book]
│   └── [Addresses]
│       └── [New Address]
├── [Language]
└── [About Us]
```
 
---
 
## Static Pages
 
```
[Static Pages]
├── [About Us]
├── [Returns Policy]
├── [Terms & Conditions]
└── [Contact Us]
```
 
---
 
## Auth Flow (Detailed)
 
```
[Auth Screen]
├── OTP Path
│   ├── [Enter Phone Number]  → POST /auth/otp/request
│   └── [Verify OTP]         → POST /auth/otp/verify
│           ↓
│   [After Login] → redirect to previous page
│
├── Google Sign In
└── Apple Sign In
```
 
---
 
## Delivery Flow
 
```
[Order Confirmed]
└── [Manual Shipping Process]  ← handled manually in MVP
    └── [Order Status Updates]
        ├── placed
        ├── confirmed  ← phone call to buyer
        ├── shipped
        └── delivered
```
 