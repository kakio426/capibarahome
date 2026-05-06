# RC-4 Game UI Skin Audit

Date: 2026-05-06
Branch: `rc3-playtest-bug-bash`
Baseline commit: `42db619 feat: polish rc4 game hud interactions`

## Goal

V2 raster key art is the visual baseline. RC-4 does not solve polish by adding more key art. The pass extends the existing capybara/orange garden direction into information-heavy screens so upgrades, settings, save/import, modals, tabs, buttons, HUD, progress, and toasts read as one mobile idle game UI skin.

Severity scale:
- P0: release-blocking broken or unreadable game UI.
- P1: screen still reads as generic web app/CSS card UI.
- P2: game skin exists but isolated controls still feel generic.
- P3: minor polish.

## Screenshot Audit Before This Pass

| Screenshot | Severity | Findings | Required Fix |
| --- | --- | --- | --- |
| `qa-screenshots/390x844-home.png` | P2 | Home has the strongest v2 raster direction and the HUD feels like a game. Remaining issue is that some lower metric tiles/progress surfaces still read as small generic cards when separated from the hero. | Keep raster direction. Tighten shared HUD skin so stat tiles/progress match the same wood/parchment/orange language used elsewhere. |
| `qa-screenshots/390x844-upgrades.png` | P1 | The upgrade screen is still a vertical list of rounded information cards. Icon, chips, description, meta tags, and button are readable, but the composition resembles a web dashboard list/spreadsheet more than a garden workbench/tool shelf. Long copy competes with level/effect/cost. | Re-skin as a `garden workbench / facility shelf`: shelf rails, tool slot, carved level/effect plaques, cost plaque, stronger buyable glow, shorter body copy hierarchy. |
| `qa-screenshots/390x844-settings.png` | P2 | Custom toggle switches removed the browser checkbox look, but the whole screen still reads partly as rows plus action buttons. The actions panel needs more "ledger drawer" treatment and less utility form feel. | Keep custom toggles, add ledger/drawer skin, section labels, carved action rows, and stronger dangerous-action seal styling. |
| `qa-screenshots/390x844-save-modal.png` | P2 | Save modal has a ledger tone and copy button, but the export/import textareas still look close to a util dialog/code form. | Reframe as save vault/sealed ledger: vault rim, code parchment slots, seal/copy plaque, import slot, and confirmation-style message. |
| `qa-screenshots/390x844-collection.png` | P2 | Companion portraits and album art are strong. The score grid and progress bar still read as metric cards/progress controls. | Shift lower album summary to sticker-book/collection ledger styling and use the shared ribbon/groove progress style. |

No current screenshot was P0: text is readable and core flows are usable. Upgrades are P1 because the user-facing structure still looks like a card list.

## CSS Audit

File: `src/ui/styles/layout.css`

Findings:
- The file contains an earlier web-card baseline followed by a later RC-4 skin override block. This layering works visually but makes the source harder to audit and can hide stale web UI selectors.
- Repeated selector groups exist for `.panel`, `.settings-panel`, `.settings-actions`, `.upgrade-card`, `.modal`, `.bottom-tabs`, `.toggle-row`, `.segmented`, `.save-code-textarea`, `.save-import-textarea`, and `.album-score-grid > div`.
- The later skin block intentionally overrides white rounded card surfaces, but several one-off rules still preserve a card/list mental model, especially upgrade list/card, settings actions, save textarea slots, and album score metrics.
- `rg` inspection did not find known orphaned old raster scene selectors such as `scene-backdrop`, `hero-raster-character`, or `capybara-illustration`.
- Splitting CSS into files is optional. The immediate quality issue is not file count; it is the generic surface language and repeated late overrides.

Cleanup decision:
- Keep the single stylesheet for this pass to avoid churn.
- Add a focused final `Game UI skin system` block that consolidates the current remaining P1/P2 surfaces into shared wood/parchment/orange components.
- Do not increase raster asset count for this pass.

## RC-4 Fix Scope

Required in this pass:
- Upgrade list becomes shelf/workbench composition, not plain cards.
- Settings becomes a housekeeper ledger/drawer screen, not form rows.
- Save/import modal becomes a save vault/sealed ledger, not util code dialog.
- Collection metrics become sticker-book ledger stamps.
- Progress becomes a carved groove/ribbon consistently.
- Button/tab/toast interactions get lightweight game feedback while respecting effects off and reduced motion.

Completion rule:
- Internal P0/P1 visual defects must be fixed before declaring this pass complete.
- Remaining P2/P3 issues must be recorded in `QA_REPORT.md`, `VISUAL_QA.md`, and `RELEASE_BLOCKERS.md`.

## Result After RC-4 Hardening

Verification screenshots were regenerated with `npx playwright test e2e/visual-regression.spec.ts --reporter=line` and `npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line`, then re-run inside the full `npm run test:e2e` suite.

| Screenshot | Result | Evidence |
| --- | --- | --- |
| `qa-screenshots/390x844-upgrades.png` | P1 fixed | The screen now reads as a garden workbench/facility shelf with tool slot, shelf rail, cost plaque, carved buy button, and level/effect plaques. It no longer looks like a spreadsheet/list/card layout. |
| `qa-screenshots/390x844-settings.png` | P1 fixed, P3 polish remains | The screen reads as a butler ledger/garden drawer, not a browser form. Remaining P3 is richer setting-change feedback beyond toast. |
| `qa-screenshots/390x844-save-modal.png` | P1 fixed, P3 polish remains | The modal reads as a save vault/sealed ledger with code slot and copy action. Remaining P3 is that the export code itself is inherently dense. |
| `qa-screenshots/390x844-collection.png` | P2 improved | Album portraits remain strong and score/progress now use sticker-ledger/groove styling. Remaining P2 is deeper sticker-book reveal/collection ceremony. |
| `qa-screenshots/390x844-home.png` | P2 improved | Home remains the strongest v2 raster scene. Metric/progress materials now align better with the shared carved HUD skin. |

Store screenshot check:
- `store-screenshots/iphone-05-save.png` and `store-screenshots/android-05-save.png` now show the save vault skin inside the gameplay panel.
- Store home/album/prestige/shop candidates keep the v2 key art background and do not rely on adding new raster art for this pass.

Residual visual defects:
- P0/P1: none found after this pass.
- P2: collection can still gain a more ceremonial sticker-book reveal; upgrade flow can still add quick-buy ergonomics later.
- P3: export/import code density, setting-change microcopy/feedback, physical-device screenshot retake before real store submission.
