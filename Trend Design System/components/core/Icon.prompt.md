Renders a Lucide glyph; the only icon primitive in the system — never hand-write an SVG, never use emoji or Unicode as an icon.

```jsx
<Icon name="shopping-cart" size={20} />
<Icon name="chevron-left" />              {/* mirrors automatically under dir="rtl" */}
<Icon name="star" fill="currentColor" strokeWidth={0} />
```

Requires Lucide on the page:
`<script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.min.js"></script>`
Directional glyphs (`chevron-*`, `arrow-*`, `undo-2`, `send`) flip in RTL; `x`, `check`, `clock`, `phone` never do.
