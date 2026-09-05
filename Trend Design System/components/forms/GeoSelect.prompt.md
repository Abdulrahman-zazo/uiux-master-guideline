The address picker — four cascading selects over the geo tree. Damascus goes four levels deep; every other city stops at two. There is no free-text "city" field anywhere in Trendsy.

```jsx
<GeoSelect tree={geo.nodes} value={sel} onChange={setSel} errors={problem?.errors} />
<FormField label="وصف العنوان" required hint="أقرب معلم، البناء، الطابق"><Textarea maxLength={500} /></FormField>
<FormField label="رقم الهاتف للتوصيل" required><Input inputMode="tel" placeholder="+963 9__ ___ ___" /></FormField>
```

Levels render only when the parent has children, so the form never shows an empty select. Selection is by `path` (stable across environments); resolve to `id` at submit time.
