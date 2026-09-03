The catalogue tile — 16px-radius media card with brand eyebrow, 2-line name clamp, rating and price.

```jsx
<ProductCard product={{brand:'Nour Atelier', name:'Embroidered linen abaya', price:174, compareAt:249, rating:4.6, reviews:128}} onWishlist={fn} />
<ProductCard layout="row" product={p} />
```

The discount badge is computed from `compareAt` — never pass "-30%" by hand.
Grid tiles sit in a `repeat(auto-fill, minmax(220px, 1fr))` grid with 24px gap.
