# UI kit — Trend shopper mobile app

Five app screens shown side by side in 390×780 device shells, each independently interactive.

## Screens

| File | Screens |
|---|---|
| `phone.jsx` | `Phone` device shell + neutral status row, `AppBar` in-app header |
| `screens.jsx` | `MHome` (search, category chips, sale card, product rails) · `MSearch` (recent searches, result grid, **bottom-sheet filters**) · `MProduct` (1∶1 gallery, dot pager, variant picker, sticky add-to-bag bar) · `MBag` (cart lines, summary, sticky checkout bar) · `MAccount` (profile, latest-order tracker, settings list) |
| `app.jsx` | `DeviceApp` wires `BottomNav` + cart state per device; four devices on one stage |

## Interactions that work

- Bottom nav switches screens inside each device
- Add to bag on the product screen → in-device toast → bag count updates
- Filter sheet opens as a `Modal sheet` from the search screen
- **ع / EN** and **moon / sun** in the page header apply to every device at once

## Honest gaps

- The device shell is a neutral rounded frame with a plain status row — no OS chrome (notch, home indicator, iOS/Android specifics) is recreated, because none was supplied.
- Checkout on mobile is not built; the bag's checkout button is a dead end. The full flow lives in the storefront kit.
- No photography: every tile is `ProductMedia`'s placeholder.
