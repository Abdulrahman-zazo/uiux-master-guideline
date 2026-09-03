Switches between sibling views — PDP detail panes, order status filters, dashboard periods.

```jsx
<Tabs active={t} onChange={setT} items={[{id:'desc',label:'Description'},{id:'reviews',label:'Reviews',count:128}]} />
<Tabs variant="pill" active={r} onChange={setR} items={['7 days','30 days','12 months']} />
```

`underline` marks the active tab purple with a 2px purple rule; `pill` lifts a white capsule inside a sunken track.
