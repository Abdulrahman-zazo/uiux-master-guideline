The catalogue tile: 4:5 image, "صُوِّر في المحل" chip, name (2-line clamp), store · market line, price via `Money`. Hairline, 16px radius, no shadow, no heart, no stars.

```jsx
<ProductCard product={p} marketName="الحميدية" onClick={() => go('/p/' + p.slug)} />
<ProductCard layout="row" product={p} />
```

Grid: `repeat(2, 1fr)` mobile · `repeat(4, 1fr)` desktop, 12–24px gap. The price is **never hidden and never "on request"**.
