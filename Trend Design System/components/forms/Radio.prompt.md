Single-choice control — payment method, shipping speed, return reason.

```jsx
<Radio name="pay" value="mada" checked={p==='mada'} onChange={setP} label="Mada debit" description="Instant confirmation" />
<Radio name="pay" value="cod" checked={p==='cod'} onChange={setP} label="Cash on delivery" />
```

For 2–3 options that fit one row, a `Tag` group is often the better shape.
