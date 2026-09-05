Order / shipment status as a capsule. Raw enum in, server label out; tone is looked up, never guessed.

```jsx
<StatusPill status={order.status} label={order.statusLabel} />
<StatusPill status="some_future_status" />   {/* neutral grey, raw text */}
```

Tone map: placed → warning · confirmed/accepted/shipped → purple tint · delivered/completed → success · rejected/delivery_failed/payment_failed → danger · cancelled/returned → neutral.
