One row of the cart or order — media, variant summary, stepper, line total. Bottom hairline included.

```jsx
<CartLine item={line} onQuantity={n => setQty(line.id, n)} onRemove={() => remove(line.id)} />
<CartLine item={line} readOnly />
```

Line total = `price × quantity`, computed inside. Don't pre-multiply.
