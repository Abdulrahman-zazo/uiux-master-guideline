# UI kit — Trend admin panel

The platform-operations surface. Same shell grammar as the seller dashboard (264px rail + 64px bar) so operators moving between them aren't relearning layout — only the rail label ("Admin" vs "Seller") and content differ.

## Screens

| File | Contents |
|---|---|
| `pages.jsx` | `AdminOverview` (moderation alert, 5 platform stat tiles, GMV-by-city bars, top-seller list) · `AdminSellers` (status tabs, city filter, seller table with ratings and row actions) · `AdminModeration` (card queue with flag reasons, bulk approve/reject, rejection-reason modal) · `AdminCustomers` (3 stat tiles + customer table) |
| `app.jsx` | Router + not-built empty state |

## Notes

- The moderation queue is a **card grid**, not a table, because each item needs its image to judge — the one place admin deliberately breaks the table pattern.
- Rejection is destructive, so it goes through a `Modal` with a `variant="danger"` confirm.

## Honest gaps

- Orders, Payouts and Settings are deliberately unbuilt.
- Seller/reviews moderation tabs render the products queue; only the products tab has real content.
