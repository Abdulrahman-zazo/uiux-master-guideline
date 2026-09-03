The cart/checkout totals card. Computes the total itself from the parts you pass.

```jsx
<OrderSummary subtotal={612} shipping={0} discount={75} tax={80.55} freeShippingAt={300}>
  <Button variant="primary" size="lg" fullWidth iconEnd="arrow-right">Checkout</Button>
</OrderSummary>
```

Total is `subtotal + shipping + tax − discount`. Never pass `total`.
