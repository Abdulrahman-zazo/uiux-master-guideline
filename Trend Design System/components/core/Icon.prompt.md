Renders a Lucide glyph; the only icon primitive in the system — never hand-write an SVG in Trend UI.

```jsx
<Icon name="shopping-bag" size={20} />
<Icon name="star" size={14} color="var(--icon-brand)" />
<Icon name="star" size={14} fill="currentColor" strokeWidth={0} />  {/* solid glyph */}
```

Requires the Lucide UMD script on the page:
`<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>`.
Icons inherit `currentColor` — colour them by setting `color` on the parent.
