Order tracking is an **event log**, never a reconstructed 4-step progress bar. Newest event on top with a purple dot; older ones neutral.

```jsx
<Timeline events={events} pending={order.status === 'placed' ? {} : null} />
```

Timestamps: Asia/Damascus, Latin digits. `note` (operator text) prints verbatim under the event.
