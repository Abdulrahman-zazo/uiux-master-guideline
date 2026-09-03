The label + hint + error wrapper every Trend form control sits inside. Never label a control with bare text.

```jsx
<FormField label="Email" htmlFor="email" hint="We'll send order updates here" required>
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>
```

Trend marks *required* fields with an asterisk and *optional* ones with the word — pick one convention per form.
