# Pushing this design system to `uiux-master-guideline`

I can read the repo but I can't write to it. Download the project (the card in chat), then commit it yourself.

## Suggested layout

Put the whole thing in a subfolder so it sits next to the planning docs rather than on top of them:

```
uiux-master-guideline/
├─ trendsy-uxui-master-plan.md        ← already there
├─ trend-design-system-gap-list.md
├─ …the other planning docs
└─ design-system/                     ← new: everything from the download
   ├─ styles.css
   ├─ tokens/
   ├─ components/
   ├─ guidelines/
   ├─ ui_kits/
   │  ├─ mobile_app/index.html        ← the mobile interface
   │  ├─ storefront/index.html        ← the web interface
   │  └─ shared/kit-utils.jsx
   ├─ assets/
   ├─ readme.md
   ├─ SKILL.md
   └─ _ds_bundle.js
```

The six planning docs are duplicated at the root of the download — **delete those copies** before committing so the repo keeps one source of truth. Same for `PLAN.md` if you'd rather keep planning at the root.

## Commands

```bash
git clone https://github.com/Abdulrahman-zazo/uiux-master-guideline.git
cd uiux-master-guideline
mkdir design-system
# unzip the download into design-system/, then remove the duplicated docs:
rm design-system/{trendsy-uxui-master-plan,trend-design-system-gap-list,trendsy-visual-direction,trendsy-web-flowchart,design-handoff-data,trendsy-ux-research-synthesis_1}.md
git add design-system
git commit -m "Add Trendsy design system: tokens, 56 components, mobile + storefront UI kits"
git push
```

## Making the two interfaces open in a browser

Both kits are plain HTML and run with no build step — but they load `styles.css`, `_ds_bundle.js`, fonts and sibling `.jsx` files by relative path, so they need to be **served**, not opened as `file://`:

```bash
cd design-system && python3 -m http.server 8000
# → http://localhost:8000/ui_kits/mobile_app/index.html
# → http://localhost:8000/ui_kits/storefront/index.html
```

For GitHub Pages: enable Pages on the branch, then the same two paths work under
`https://abdulrahman-zazo.github.io/uiux-master-guideline/design-system/ui_kits/…`.

Both need internet access at runtime for React, Babel and Lucide (all CDN `<script>` tags). If the kits must work offline, say so and I'll produce single-file self-contained copies with everything inlined.

## What must not be edited by hand

`_ds_bundle.js`, `_ds_manifest.json` and `_adherence.oxlintrc.json` are generated from the sources. Commit them (consumers need the bundle) but never edit them — change the `.jsx`/`.css` and let them regenerate.
