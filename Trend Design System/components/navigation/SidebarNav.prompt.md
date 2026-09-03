The left rail for the seller and admin surfaces — logo, sectioned nav, bottom-pinned footer slot.

```jsx
<SidebarNav assetBase="../../assets/" title="Seller" active="orders" onNavigate={go}
  items={[{section:'Sell'},{id:'orders',icon:'package',label:'Orders',count:12},{id:'catalog',icon:'shirt',label:'Catalogue'}]}
  footer={<AccountRow/>} />
```

Uses `borderInlineEnd`, so the rail flips to the right edge under `dir="rtl"` with no extra work.
