The store card on every PDP and shop page — tinted surface, hairline, logo, name, market · location, founding-partner badge, "لا تقييمات بعد" placeholder.

```jsx
<ShopCard store={product.store} marketName="الحميدية" locationLabel="دمشق القديمة" onOpen={() => go('/s/' + store.slug)} />
```

**Never add a phone or WhatsApp action** — phones are masked and there is no store-contact field (decision R4).
