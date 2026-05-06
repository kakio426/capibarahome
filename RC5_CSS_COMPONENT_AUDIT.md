# RC-5 CSS Component Audit

Date: 2026-05-06
Branch: `rc3-playtest-bug-bash`
Baseline commit: `ca9f6dd feat: harden rc4 game ui skin`

## Goal

RC-5 keeps the v2 raster art and RC-4 wood/parchment/orange HUD direction. This pass does not add raster assets. The goal is to reduce CSS debt, stabilize a reusable game UI skin system, and prevent visual regression across information-heavy screens.

## Current Git State

`git status --short --branch`:

```txt
## rc3-playtest-bug-bash...origin/rc3-playtest-bug-bash
```

Latest commit:

```txt
ca9f6dd feat: harden rc4 game ui skin
```

## CSS Audit Before RC-5

File audited: `src/ui/styles/layout.css`

Metrics:

| Metric | Value |
| --- | ---: |
| CSS files in runtime import path | 3: `tokens.css`, `global.css`, `layout.css` |
| `layout.css` lines | 3,021 |
| Selector references | 599 |
| Unique selectors | 350 |
| Duplicate selectors | 129 |
| Large late skin blocks | 3 |

Most repeated selectors:

| Selector | Count | Reason |
| --- | ---: | --- |
| `.album-hero` | 6 | base panel, screen layout, RC skin override, collection polish |
| `.settings-panel` | 6 | base panel, settings layout, RC skin override, ledger polish |
| `.settings-actions` | 6 | base panel, settings layout, RC skin override, ledger polish |
| `.stats-panel` | 6 | base panel, metric grid, RC skin override |
| `.modal` | 5 | base modal, RC frame, vault/reward variants |
| `.quest-card` | 5 | base card, layout, RC skin |
| `.upgrade-summary` | 4 | base grid, RC shelf summary |
| `.bottom-tabs` | 3 | base dock, RC dock, mobile override |
| `.toggle-row` | 3 | base form row, RC switch row, settings override |

Structure findings:

- `layout.css` starts with a broad base implementation and then applies late "game shell skin", "custom controls", and "information-heavy screen" skin blocks.
- The visual result after RC-4 is acceptable, but the implementation still depends on late selector overrides for many core materials.
- Common surfaces exist visually but are not expressed as a reusable CSS system. Examples: panel, plaque, button, modal, progress groove, ledger row, shelf card.
- JSX still mainly uses legacy classes such as `.btn`, `.panel`, `.modal`, `.bottom-tabs`, `.progress-track`; these are kept for E2E stability but need paired `.ui-*` system classes.
- Existing `tokens.css` contains only early generic tokens. RC-4 skin tokens live locally in `.game-shell`, which makes cross-file reuse harder.

## Screenshot Audit Before RC-5

| Screenshot | Severity | Findings | RC-5 Fix Direction |
| --- | --- | --- | --- |
| `qa-screenshots/390x844-home.png` | P3 | Strong v2 raster home scene. Lower metric plaques still depend on legacy metric classes but visual quality is acceptable. | Preserve. Move shell/HUD tokens into reusable CSS layers without changing scene. |
| `qa-screenshots/390x844-upgrades.png` | P2 | No longer a generic list, but the left tool slot still reads partly like an empty CSS plinth. Icons sit low and small inside a tall slot. Cost/buy hierarchy is clear but can be tighter. | Add reusable shelf/card/cost classes, improve tool slot pedestal and icon centering. |
| `qa-screenshots/390x844-settings.png` | P3 | Settings no longer reads as browser form. Rows are large and stable, but ledger/drawer system is still screen-specific CSS. | Express ledger rows and toggles as common `.ui-ledger-row` / `.ui-toggle` styles. |
| `qa-screenshots/390x844-save-modal.png` | P3 | Save modal reads as vault/ledger. Dense export code remains inherent. | Use reusable modal/vault/code-slot classes and keep scroll-safe text areas. |
| `qa-screenshots/390x844-collection.png` | P2 | Album art and portraits are strong. Score stamps are improved but still closer to metric tiles than a complete sticker ledger. | Add sticker ledger class and stronger stamp/album material cues. |

No P0/P1 visual defect is present before RC-5. The main risk is CSS maintainability and future regression.

## RC-5 Implementation Plan

1. Keep `layout.css` as a small import manifest.
2. Split runtime styles by responsibility:
   - `tokens.css`: shared material tokens.
   - `global.css`: reset/base typography.
   - `shell.css`: app frame, top bar, content shell, tab dock, responsive shell.
   - `hud.css`: reusable UI skin components and legacy class compatibility.
   - `screens.css`: screen-specific home, upgrade, album, prestige, shop, settings, save, tutorial, debug layout.
   - `effects.css`: particles, floating text, decor variables, animations, reduced motion.
3. Pair existing classes with stable `.ui-*` classes without breaking E2E selectors.
4. Polish the remaining P2/P3 upgrade slot, collection stamp, and save/settings component consistency.
5. Regenerate QA and store screenshots, then record result in release docs.

## RC-5 Implementation Result

`layout.css` is now an import manifest instead of the main styling file:

```css
@import "./shell.css";
@import "./hud.css";
@import "./screens.css";
@import "./effects.css";
```

Runtime CSS responsibilities after the split:

| File | Lines | Responsibility |
| --- | ---: | --- |
| `tokens.css` | 24 | shared color/spacing/radius/motion tokens |
| `global.css` | 70 | reset, base typography, root/body setup |
| `layout.css` | 4 | stable import manifest |
| `shell.css` | 415 | app frame, top bar, content shell, tab dock, desktop/mobile shell materials |
| `hud.css` | 1,153 | common button, panel, modal, toggle, progress, plaque, toast, vault/reward HUD skin |
| `screens.css` | 1,411 | home, upgrade, album, prestige, shop, settings, save, tutorial, debug screen layout and responsive rules |
| `effects.css` | 236 | floating text, particles, decorative state variables, motion/reduced-motion rules |

The split intentionally does not claim quality from fewer CSS lines. Total CSS increased slightly because legacy E2E-safe classes now coexist with canonical `.ui-*` skin classes. The important change is that the late all-in-one `layout.css` override chain is gone and each file has a clear ownership boundary.

## Common UI Skin Classes Added

Existing selectors remain for test stability. These `.ui-*` classes are now paired in JSX and stylesheet rules:

| Skin | Classes |
| --- | --- |
| game shell/frame | `.ui-game-frame`, `.ui-game-shell`, `.ui-carved-header` |
| panel/plaque | `.ui-panel`, `.ui-panel--parchment`, `.ui-panel--ledger`, `.ui-plaque`, `.ui-cost-plaque` |
| buttons | `.ui-button`, `.ui-button--primary`, `.ui-button--secondary`, `.ui-button--ghost`, `.ui-button--danger`, `.ui-icon-button` |
| modal | `.ui-modal`, `.ui-modal__header`, `.ui-modal__body`, `.ui-modal__actions`, `.ui-modal--reward`, `.ui-modal--vault`, `.ui-modal--danger` |
| controls | `.ui-ledger-row`, `.ui-toggle`, `.ui-toggle__switch`, `.ui-segmented` |
| progress/toast/tabs | `.ui-progress`, `.ui-progress-groove`, `.ui-progress__fill`, `.ui-toast-banner`, `.ui-tab-dock`, `.ui-tab-dock__item` |
| upgrade/album/save | `.ui-shelf-card`, `.ui-tool-slot`, `.ui-shelf-card__buy`, `.ui-sticker-ledger`, `.ui-vault-body`, `.ui-vault-seal`, `.ui-code-slot` |

## RC-5 Screen Result

| Screenshot | Result | Notes |
| --- | --- | --- |
| `qa-screenshots/390x844-upgrades.png` | P1 없음, P2 완화 | tool slot pedestal, centered icon treatment, inline cost/buy plaque hierarchy, shared shelf classes applied. Still not as animated as top idle games, so quick-buy/ceremony depth remains P2. |
| `qa-screenshots/390x844-settings.png` | P1 없음 | settings still reads as ledger/drawer, not browser form. Toggle rows now use common `.ui-ledger-row` / `.ui-toggle` system. |
| `qa-screenshots/390x844-save-modal.png` | P1 없음 | save modal remains vault/ledger, not util dialog. Export/import code areas are scroll-safe and buttons no longer push the layout. |
| `qa-screenshots/390x844-collection.png` | P1 없음, P2 완화 | score area has stronger sticker-ledger/stamp treatment. Free placement/reveal depth remains P2. |
| `qa-screenshots/390x844-home.png` | P1 없음 | v2 raster home art preserved. Lower metric plaques remain acceptable P3 polish territory. |

During the first RC-5 visual rerun, screen headers briefly regressed to low-contrast parchment panels because a shared panel block overrode the header plaque after the CSS split. This was fixed in `screens.css`, and the regenerated screenshots show readable dark wood plaques across upgrades/settings/album/prestige/shop.

## Verification Evidence

Commands run during this pass:

```txt
npm run build
passed

npm test
21 files / 479 tests passed

npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
6 passed, QA and store screenshots regenerated
```

Final full-suite verification is recorded in `QA_REPORT.md`.

## Remaining RC-5 Visual Risk

No internal P0/P1 visual defect remains after the RC-5 pass. Remaining items are P2/P3 only:

- P2: upgrade screen could still use true quick-buy batching and richer purchase ceremony later.
- P2: album could add deeper sticker-book reveal and free placement interactions later.
- P3: export/import code is inherently dense, though the vault modal is now scroll-safe and usable.
- P3: lower home metric plaques could receive more collection-specific material variants in a later pass.
