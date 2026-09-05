Cancel-order sheet body: one reason from the API list plus an optional note.

```jsx
<ReasonPicker reasons={reasons} value={v} onChange={setV} />
<Button variant="danger" disabled={!v.reasonCode} loading={busy}>إلغاء الطلب</Button>
```

`reasonCode` is required by `CancelOrderDto`; keep the confirm disabled until one is picked.
