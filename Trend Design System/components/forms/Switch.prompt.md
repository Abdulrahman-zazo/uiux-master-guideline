An instant-effect toggle — notification preferences, product visibility, dark mode.

```jsx
<Switch checked={dark} onChange={setDark} label="Dark theme" />
<Switch size="sm" checked={live} onChange={setLive} />
```

Use only when the change applies immediately. Inside a form that needs saving, use `Checkbox`.

Note: the knob translate is computed in JS, so it mirrors automatically under `dir="rtl"` only when the parent is RTL-laid-out — verify in Arabic views.
