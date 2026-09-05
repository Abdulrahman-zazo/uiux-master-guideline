Totals card. Every number is a server Money object; nothing is summed on the client.

```jsx
// Cart — no fee yet, no grand total
<OrderSummary itemsSubtotal={cart.itemsSubtotal}><Button fullWidth size="lg">إتمام الطلب</Button></OrderSummary>
// Review — from CheckoutResponseDto
<OrderSummary itemsSubtotal={c.itemsSubtotal} deliveryFee={c.deliveryFee} discount={c.discount} grandTotal={c.grandTotal} stores={c.orders} showCallNote />
```

The delivery-fee row has an explicit **absent** state; the confirmation-call panel is mandatory on review.
