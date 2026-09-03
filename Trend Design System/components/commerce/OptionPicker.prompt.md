The PDP variant selector — size chips or colour swatches, with sold-out slashes.

```jsx
<OptionPicker label="Size" options={['XS','S','M',{value:'L',soldOut:true}]} value={size} onChange={setSize} />
<OptionPicker label="Colour" kind="swatch" options={[{value:'Plum',color:'#6D1B72'},{value:'Ink',color:'#090909'}]} value={c} onChange={setC} />
```

Selected text chips fill purple; selected swatches get a 1.5px purple ring with an inset gap.
Sold-out chips keep their label at `--text-muted` (readable — the shopper has to know *which* size is gone) and add a thin diagonal rule plus `cursor: not-allowed`. Never dim a sold-out label to `--text-disabled`.
