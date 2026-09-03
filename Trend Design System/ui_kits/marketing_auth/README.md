# UI kit — Trend marketing site & auth

Seller acquisition and account entry: the surfaces that sell *Trend itself* rather than products.

## Screens

| File | Contents |
|---|---|
| `landing.jsx` | `MarketingNav` (dark bar, locale/theme, dual CTA) · `MarketingHero` (brand wash, inline proof stats, live-dashboard card) · `ValueGrid` (6 benefit cards) · `PricingBand` (3 plans, middle one featured with a purple border + shadow-xl) · `Testimonial` (display-face pull quote) · `ClosingCta` (deep-wash band) |
| `auth.jsx` | `AuthShell` (form left, deep brand wash right) · `SignInScreen` · `SignUpScreen` · `OnboardingScreen` (4-step seller verification: CR number, document upload, IBAN) |
| `app.jsx` | Router + dark marketing footer |

## Interactions that work

- Nav and hero CTAs route between landing → sign up → onboarding → sign in
- Onboarding's Back/Continue move the step and drive the `ProgressBar`
- Locale and theme toggles work on every screen

## Honest gaps

- Social sign-in uses Lucide's `apple` and `chrome` glyphs as stand-ins — **real Apple/Google brand marks were not supplied** and must not be drawn by hand. Replace with the official assets before shipping.
- Pricing numbers, commission rates and proof stats are placeholder copy written to demonstrate the layout — replace with real terms.
- No photography, so the hero uses the brand wash plus a live dashboard card instead of a product shot.
