Address book row / checkout address choice — label, default badge, resolved place, landmark description, courier phone.

```jsx
<AddressCard address={a} placeLabel="دمشق › المهاجرين › الشعلان" onEdit={edit} onDelete={del} />
<AddressCard address={a} placeLabel={…} selected onSelect={() => pick(a.id)} />
```
