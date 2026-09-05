Footer of every cursor list on web — "تحميل المزيد" / loading / inline error / end rule. Mobile uses infinite scroll and shows only the loading and end states.

```jsx
<LoadMore hasMore={page.hasMore} loading={busy} error={err} onLoad={next} />
```

There are no page numbers and no result totals anywhere in Trendsy.
