Focused overlay — blurred dark scrim, 24px-radius card. `sheet` turns it into the mobile bottom sheet used for filters and size pickers.

```jsx
<Modal open={o} title="Delete this product?" description="This can't be undone." onClose={close}
  footer={<><Button variant="secondary" onClick={close}>Cancel</Button><Button variant="danger">Delete</Button></>}/>
<Modal open={f} sheet title="Filters" onClose={close}>…</Modal>
```

The scrim is `--surface-overlay` + 6px blur — the only place Trend uses backdrop blur.
