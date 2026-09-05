Every price in Trendsy renders through this. It prints the server's `display` string as-is — **no formatting, no math, no digit conversion** on the client.

```jsx
<Money value={product.price} size="xl" />
<Money value={line.lineTotal} />
<Money value={oldPrice} tone="discount" strike size="sm" />
```

Currency symbol trails at 62% size: **ل.س** in Arabic, **SYP** in English. Digits are Latin and tabular in both. Wrapped in `<bdi>` so it never breaks an Arabic sentence.
