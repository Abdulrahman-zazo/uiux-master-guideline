Seller and admin list view — uppercase eyebrow headers, hairline row rules, no zebra striping, no outer border. Drop it inside a `Card padding="none"`.

```jsx
<DataTable onRowClick={open} columns={[
  {key:'id',label:'Order'},
  {key:'customer',label:'Customer'},
  {key:'status',label:'Status',render:r => <StatusPill status={r.status} />},
  {key:'total',label:'Total',align:'end',numeric:true}]} rows={orders} empty={<EmptyState compact title="No orders yet" />} />
```

Amount columns are `align:"end"` + `numeric:true` — they flip correctly in RTL because the alignment is logical.
