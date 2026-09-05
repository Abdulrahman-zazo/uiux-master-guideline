One cart or order line — 4:5 thumb, name, variant, unit × qty, stepper, line total via `Money`, explicit remove, inline warning slot.

```jsx
<CartLine item={line} onQuantity={n => patch(line.id, n)} onRemove={() => del(line.id)} />
<CartLine item={orderLine} readOnly />
```

`lineTotal` is the server's number — never multiply on the client. `available: false` dims the thumb, disables the stepper and shows the warning; the user continues, nothing blocks.
