Screen-level error for a failed primary fetch (PDP, order detail): server title, optional detail, retry, copyable trace id.

```jsx
<ErrorState problem={err} onRetry={reload} />
```

For a failed *page* in a list use `LoadMore`'s inline error instead; for connectivity use `Alert tone="offline" banner`.
