The storefront header: a near-black sticky bar that frames the light canvas below — the system's strongest structural signature.

```jsx
<TopNav assetBase="../../assets/" links={[{id:'women',label:'Women'},{id:'new',label:'New in'}]}
  active="new" onNavigate={go} onSearch={setQ} cartCount={3} onCart={openCart}
  cta="Sign in" onCta={login} locale="ع" onLocale={toggleDir} />
```

No shadow — it sits flush against the hero. `tone="light"` is for dashboards, where the dark bar competes with the sidebar.

**Responsive behaviour.** Below `collapseAt` (default 1024px) the inline link rail is replaced by a `menu` icon button; tapping it opens the links as a full-width stacked row beneath the bar. Above the breakpoint the rail scrolls horizontally rather than clipping. Links are never hidden without an affordance. Below 640px the inline search field and the text CTA also collapse to icon buttons.
