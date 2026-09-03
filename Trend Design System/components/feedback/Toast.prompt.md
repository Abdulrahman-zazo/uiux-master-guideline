Transient confirmation — a dark pill that fades up from the bottom of the viewport. Always dark, in both themes.

```jsx
<Toast tone="success" message="Added to your bag" action={<a href="#" style={{color:'#C89AD1'}}>View bag</a>} />
```

Position it yourself: `position:fixed; bottom:24px; inset-inline-start:50%; transform:translateX(-50%)`.
Auto-dismiss after 4s. Needs the `trend-fade-up` keyframes.
