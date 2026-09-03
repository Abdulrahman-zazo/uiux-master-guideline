An interactive filter or category chip — 12px radius, unlike the fully-round Badge.

```jsx
<Tag onClick={pick}>Abayas</Tag>
<Tag selected onClick={pick}>Dresses</Tag>
<Tag removable onRemove={clear}>Under 500 SAR</Tag>
```

Use for anything the shopper can toggle. Use `Badge` for read-only state.
