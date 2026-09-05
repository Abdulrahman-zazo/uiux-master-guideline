One row in "طلباتي" and the order-created list — order number, status pill, store, date · count, total.

```jsx
<OrderCard order={o} onOpen={() => go('/orders/' + o.id)} />
```

Always one card per **order**, never per checkout.
