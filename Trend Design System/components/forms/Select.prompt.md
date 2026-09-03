Native select styled to match `Input` — country, city, sort order, quantity above 10.

```jsx
<Select placeholder="Choose a city" options={['Riyadh','Jeddah','Dammam']} />
<Select options={[{value:'new',label:'Newest'},{value:'low',label:'Price: low to high'}]} />
```

The chevron sits on the trailing edge, so it mirrors correctly in RTL.
