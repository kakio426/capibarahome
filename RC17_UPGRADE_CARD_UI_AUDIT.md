# RC-17 Upgrade Card UI Audit

Date: 2026-05-09
Branch: `rc3-playtest-bug-bash`
Baseline commit: `90a7d9d fix: verify rc16 android signed release rehearsal`

## Scope

RC-17 is a narrow UI surgery pass for the upgrade/growth screen. It does not add gameplay systems, save schema, balance changes, or Android release artifacts. The target is the visual hierarchy and perceived overlap inside the upgrade shelf cards.

## Baseline Evidence

Before screenshots:
- `qa-screenshots/360x740-upgrades-quick-buy.png`
- `qa-screenshots/390x844-upgrades-quick-buy.png`

Observed DOM structure before RC-17:
- `.upgrade-card.upgrade-shelf-card.ui-shelf-card`
- `.upgrade-tool-slot.ui-tool-slot`
- `.upgrade-copy`
- `.upgrade-title-row` containing tier/status chips and the title
- `.upgrade-meta` containing current level, effect, and next-level chip
- `.upgrade-ui-copy`, `.upgrade-description`, `.upgrade-family-chip`
- `.upgrade-buy-slot.ui-shelf-card__buy`

Primary CSS involved:
- `src/ui/styles/screens.css`
- `src/ui/styles/hud.css`
- `src/ui/styles/shell.css`
- `src/ui/styles/effects.css`

## Baseline Defects

| Severity | Area | Finding | Evidence |
| --- | --- | --- | --- |
| P1 | Purchase tray | The dark lower wood rail visually touches or covers the price/CTA tray, making the first two cards look broken even when DOM clipping passes. | `390x844-upgrades-quick-buy.png`, `360x740-upgrades-quick-buy.png` |
| P1 | 360px layout | Price and max-buy CTA are compressed against the decorative rail and bottom dock, so the card reads as crowded rather than tappable. | `360x740-upgrades-quick-buy.png` |
| P1 | Information hierarchy | Tier/status chips and current/effect/next-level chips compete with the title and CTA as if all are primary buttons. | `390x844-upgrades-quick-buy.png` |
| P2 | Tool pedestal | The left tool pedestal takes too much of the card width and height, reducing room for useful upgrade information. | `360x740-upgrades-quick-buy.png` |
| P2 | Description | The description is squeezed into the remaining space and looks like it is trapped between badge rows and the CTA tray. | `390x844-upgrades-quick-buy.png` |
| P2 | Store screenshot | The upgrade store screenshot inherits the same crowded shelf card, reducing product-quality framing. | `store-screenshots/iphone-02-upgrade.png`, `store-screenshots/android-02-upgrade.png` |

## RC-17 Fix Target

Required changes:
- Split the card into clear body and purchase tray layers.
- Limit tool pedestal width to roughly 24-30% of the card.
- Move tier/status chips into a small status row.
- Make `현재`, `효과`, and `구매 후 Lv` read as compact stat tags, not CTA buttons.
- Remove or move the bottom rail so it cannot appear over cost/CTA.
- Give the purchase tray its own full-width area with a minimum 44px CTA target.
- Keep quick-buy `1개 / 10개 / 최대`, max-buy math, save/load behavior, aria labels, and E2E selectors intact.

## Implementation Notes

Implemented structure:
- Added `.upgrade-card-body` for the icon tile plus copy area.
- Added `.upgrade-status-row` so tier and availability are no longer mixed into the title row.
- Kept `.upgrade-title-row h3`, `.upgrade-meta span`, `.cost-plaque`, and `.upgrade-buy-button` selectors for existing tests.
- Added stable `data-qa` selectors for upgrade card, body, tool slot, purchase tray, and cost.

Implemented CSS direction:
- `.upgrade-shelf-card` now uses a single-column grid: body first, purchase tray second.
- The previous lower rail pseudo-element was removed and replaced with a small left accent plus a top highlight.
- `.upgrade-card-body` uses a compact tool column and a flexible information column.
- `.upgrade-buy-slot` spans the full card width with its own tray, cost plaque, and CTA button.
- The UI copy/family chip is hidden inside shelf cards to reduce badge noise.

## Regression Guard

`e2e/layout-regression.spec.ts` now includes an upgrade-card-specific geometry check:
- purchase tray inside the card bounds
- tool tile width ratio no more than 31% of card width
- body and tray separated vertically
- cost plaque and CTA do not overlap
- CTA remains at least 44px high
- title, status row, stat row, description, and purchase tray are visible
- first visible buy buttons remain clear of the bottom tab dock

## Final Evidence

Regenerated and reviewed:

| Screenshot | RC-17 judgment |
| --- | --- |
| `qa-screenshots/360x740-upgrades-quick-buy.png` | Pass. First two cards no longer have a bottom rail appearing over the price/CTA tray. Tool pedestal is compact, and max-buy CTA remains clear of the tab dock. |
| `qa-screenshots/390x844-upgrades-quick-buy.png` | Pass. Purchase tray is now a separate full-width tray; cost and CTA are readable within 2 seconds. Status chips are separated from title and stats. |
| `qa-screenshots/430x932-upgrades-quick-buy.png` | Pass. The previous auxiliary family chip was removed from shelf cards, reducing badge competition at this wider mobile viewport. |
| `qa-screenshots/desktop-1280x900-upgrades.png` | Pass for requested desktop evidence. The normal upgrades screen remains scrollable in the centered mobile panel; no new horizontal overflow or card geometry issue was introduced. |
| `qa-screenshots/desktop-1280x900-upgrades-quick-buy.png` | Pass. The focused quick-buy shelf shows separated purchase trays and no decorative rail over CTA/cost. |
| `store-screenshots/iphone-02-upgrade.png` | Pass. Store upgrade scene reflects the RC-17 shelf layout and keeps public copy free of internal/dev wording. |
| `store-screenshots/android-02-upgrade.png` | Pass. Android store frame uses the same RC-17 shelf layout and keeps gameplay readable. |

Validation performed during the pass:
- `npm run build`: passed
- `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: 4 passed
- `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: 7 passed

Final RC-17 status:
- Internal upgrade-card P1 visual overlap: resolved.
- Remaining upgrade UI P2/P3: richer purchase ceremony and optional animated workbench feedback can be improved later, but the card no longer looks visually broken in the target screenshots.
