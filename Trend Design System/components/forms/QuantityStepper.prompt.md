Cart and PDP quantity control — a pill with −/＋ ends and tabular-figure count.

```jsx
<QuantityStepper value={qty} onChange={setQty} max={stock} />
<QuantityStepper size="sm" value={line.qty} onChange={fn} />
```

Clamps to `min`/`max` and greys the disabled end. Above ~10 selectable units, prefer a `Select`.
