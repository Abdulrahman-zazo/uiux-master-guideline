Category path on catalogue and product pages — purely typographic, chevron separators, last segment in weight 500.

```jsx
<Breadcrumb items={['Home','Women','Abayas','Embroidered linen abaya']} onNavigate={go} />
```

The chevron is a Lucide glyph, so it mirrors under `dir="rtl"` via CSS `transform: scaleX(-1)` on the nav — apply that at the page level.
