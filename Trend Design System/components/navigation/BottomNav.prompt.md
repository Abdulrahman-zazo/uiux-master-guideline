The mobile app's primary navigation — 64px tall, icon over 10.5px label, active state in brand purple.

```jsx
<BottomNav active="home" onNavigate={go} items={[
  {id:'home',icon:'house',label:'Home'},
  {id:'search',icon:'search',label:'Search'},
  {id:'bag',icon:'shopping-bag',label:'Bag',count:3},
  {id:'me',icon:'user',label:'Account'}]} />
```

Active items get purple + weight 500 + 2px stroke. No pill, no background fill.
