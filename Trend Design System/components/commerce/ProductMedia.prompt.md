The image frame for every product visual. With no `src` it renders an honest labelled placeholder — that is deliberate: Trend supplied no photography.

```jsx
<ProductMedia ratio="3 / 4" />
<ProductMedia src={p.image} alt={p.name} ratio="1 / 1">
  <Badge tone="brand" style={{position:'absolute', top:12, insetInlineStart:12}}>-30%</Badge>
</ProductMedia>
```

Do not swap the placeholder for stock or AI imagery — pass real product photos or leave it.
