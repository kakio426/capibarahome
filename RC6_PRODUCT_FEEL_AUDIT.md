# RC-6 Product Feel Audit

Date: 2026-05-06
Branch: `rc3-playtest-bug-bash`
Baseline commit: `c8c8d72 feat: stabilize rc5 game ui css system`

## Goal

RC-6 keeps the RC-5 CSS component system, v2 raster art, and wood/parchment/orange HUD skin. This pass is not an art-count or CSS-restructure pass. The target is touch feel, reward moments, repeated purchase ergonomics, and retention clarity.

## Baseline Read

| Area | Severity | Baseline finding | RC-6 action |
| --- | --- | --- | --- |
| First 10 seconds | P3 | Home screen and tutorial show the tap target immediately. Tap response exists through floating text/particles, but the touch area itself can feel static. | Add short press feel and varied floating text while preserving particle caps and effects-off behavior. |
| First 1 minute | P2 | First tap upgrade and basket purchase are reachable. Repeated manual purchases still require one-by-one tapping. | Add 1/10/max quick-buy and purchase result chips. |
| First 5 minutes | P3 | Upgrade, quest, album, decoration, and companion loops already open through RC-3 playtest flow. | Add album/achievement claim reveal so opened loops feel more like rewards. |
| First 15 minutes | P3 | Automatic production and next-goal text remain visible. | Extend simulation checkpoints and document rhythm. |
| First 30-40 minutes | P3 | First prestige remains in the 30-60 minute target window. Prestige-ready glow already exists. | Add a result panel after prestige with gain, new multiplier, and next target. |
| Post-prestige first 30 minutes | P2 | Simulator validates acceleration, but the UI mainly relies on toast. | Add ceremony/result feedback so the stronger state is obvious. |
| Offline return | P2 | Reward modal uses raster art, but the reward is still mostly a static modal. | Add staged basket/chest reveal, reward count styling, and E2E assertion. |
| Achievement/album claim | P2 | Duplicate reward guards are solid, but claim is a button/toast moment. | Add sticker stamp/reveal banner and claimable item emphasis. |
| Shop/ad mock | P3 | Mock status is clear and reward banner is game-skinned. | Keep mock clarity; no real-payment wording changes needed. |
| Repeated purchase | P1 | No 10/max purchase mode. This is the main idle-game ergonomics gap. | Implement quick-buy with BigNumber purchase planning and tests. |

## P0/P1 Status Before Implementation

No P0 blocker is visible from RC-5 docs or code. The only internal P1 gameplay feel gap is repeated purchase ergonomics: upgrade purchases are single-tap only, which makes mid-game play feel slower than expected for an idle/clicker release candidate.

## Implementation Constraints

- Do not change save schema for transient UI/reward effects.
- Do not replace the RC-5 CSS file split.
- Do not add bulk raster assets.
- Do not use debug shortcuts in real-user E2E coverage.
- Keep existing upgrade, save, prestige, offline, and reward duplicate tests meaningful.

## Completion Evidence To Add

- Unit tests for 1/10/max purchase planning and max-level caps.
- E2E for quick-buy mode, album/achievement reveal, offline reward reveal, prestige result panel, and effects-off state.
- Updated balance simulation checkpoints for 10 seconds, first session, first prestige, post-prestige 30 minutes, and D1/D3/D7 retention assumptions.
- Updated screenshots for home, upgrades, collection, prestige, shop, settings, save modal, offline reward, claim-ready album, prestige result, and quick-buy mode.

## RC-6 Implementation Result

| Area | Result | Evidence |
| --- | --- | --- |
| Repeated purchase P1 | 해결 | `UpgradeManager.calculateUpgradePurchasePlan`, `UpgradePanel` quick-buy controls, `upgrade.test.ts`, `e2e/upgrade-flow.spec.ts` |
| Touch juice | 개선 | floating text variation, tap press CSS, particle cap preserved |
| Purchase feedback | 개선 | purchase shelf pulse, buy-after-level chip, failure toast/shake, haptic hook |
| Offline reward | 개선 | staged return copy, basket lid cue, reward count plaque, E2E reveal assertion |
| Prestige | 개선 | `새 계절 시작` result modal with gained leaves, total leaves, multiplier, next target |
| Album/achievement claim | 개선 | album reveal banner, claim-ready glow, first-five-minute E2E assertion |
| Retention plan | 완료 | `RETENTION_PLAN.md`, `PLAYTEST_REPORT.md`, D1/D3/D7 simulator checkpoints |
| Motion/sound/haptic settings | 완료 | effects-off disables new animations; sound mute remains covered; haptic is gated by vibration support/settings |

## Post-Implementation Severity

| Area | Severity | Status |
| --- | --- | --- |
| Repeated purchase | P1 -> 완료 | quick-buy 1/10/max implemented and tested |
| Offline reward ceremony | P2 -> P3 | reveal cue exists; full numeric count-up remains optional |
| Prestige ceremony | P2 -> P3 | result panel exists; full ritual animation remains optional |
| Album reveal | P2 -> P3 | claim banner exists; free sticker placement remains optional |
| D1/D3/D7 rewards | P2 | documented, but real daily calendar/milestone badge is not implemented to avoid save schema churn in RC-6 |

No internal P0/P1 gameplay feel blocker remains after this pass.
