The pill action control. No shadow, no lift, no scale — hover shifts the tint, press sinks the fill.

```jsx
<Button variant="primary" size="lg" fullWidth>أضف إلى السلة</Button>
<Button variant="outline">العودة إلى السلة</Button>
<Button variant="primary" loading processingLabel="جارٍ إنشاء الطلب…">تأكيد الطلب</Button>
```

One `primary` per screen, always paired with an `outline` or `ghost`. For checkout/cancel (idempotent calls) use `loading` + `processingLabel`; the button locks and the screen re-renders from the response — never optimistic.
