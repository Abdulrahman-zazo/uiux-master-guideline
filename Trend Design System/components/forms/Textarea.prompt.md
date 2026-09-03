Multi-line entry — review bodies, order notes, product descriptions. Same fill and focus ring as `Input`.

```jsx
<Textarea rows={5} placeholder="Tell shoppers about this product" />
<Textarea maxLength={280} value={note} onChange={e => setNote(e.target.value)} />
```

Passing `maxLength` adds a live counter under the trailing edge.
