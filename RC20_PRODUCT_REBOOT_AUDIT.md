# RC20 Product Reboot Audit

Date: 2026-05-10 KST

## Reboot Reason

The previous RC line had strong automated coverage, but the user rejected the actual Android-phone product feel. That feedback is treated as a P1 product issue. RC20 does not defend the old UI and does not use previous "P1 없음" claims as completion evidence.

## Discarded UI Direction

| Area | Decision | Reason |
| --- | --- | --- |
| Heavy wood/parchment HUD as the dominant language | Discarded as the main product skin | It made screens feel like decorated web cards rather than a touch-first idle game. |
| Dense chip/badge clusters | Reduced | Status, level, effect, and CTA competed for attention. |
| Modal/toast as utility overlays | Reworked | Reward moments and save/settings screens needed clearer hierarchy and non-blocking overlays. |
| CSS patchwork over old surfaces | Replaced for core shell/components | Old `shell/hud/screens/effects` remains for legacy coverage, but RC20 imports a new product layer last. |
| "Tests passed = product accepted" | Rejected | Playwright/DOM checks are regression guards, not the user satisfaction gate. |

## Preserved Systems

| Area | Status | Notes |
| --- | --- | --- |
| `src/game/`, game loop, tap/EPS/prestige math | Preserved | No balance or save schema rewrite. |
| `src/state/`, save/load/import/export | Preserved | Existing local save and migration contracts remain. |
| `src/systems/` managers | Preserved | Retention, reward, monetization mock, settings, and debug systems remain. |
| Existing raster capybara/orchard art | Reused | RC20 changes how art is presented rather than adding asset count. |
| Quick-buy logic | Preserved | UI presentation changed; purchase modes and BigNumber calculation remain. |

## React Structure Findings

| Finding | Severity | RC20 Fix |
| --- | --- | --- |
| `AppShell` mixed shell chrome, navigation, overlays, and active screen rendering | P1 | Added `MobileGameShell`, `TopHud`, and `BottomNav` layout components. |
| Common controls were style wrappers with old class contracts | P1 | Added primitives: `GameButton`, `GamePanel`, `NumberPill`, `ProgressMeter`, `RewardSheet`, `ActionToast`; existing components delegate where safe. |
| Reward feedback was split between toast, floating text, and modal-specific UI | P1 | Added `RewardBurst` and strengthened reward sheet capture. |
| Upgrade screen still read as a decorated card list | P1 | Rebuilt growth screen hierarchy around growth choices, clear delta, cost tray, and CTA. |
| Toast could cover content/modals in screenshots | P1 | Moved to compact top-right status chip and suppresses over modal backdrops. |

## First 10 Minutes Product Issues

| Issue | Severity | RC20 Direction |
| --- | --- | --- |
| First action was visible but surrounded by too much HUD density | P1 | Home now prioritizes a large capybara/orange tap scene and one orange CTA. |
| Next action could feel like an extra card rather than a guide | P1 | Next-action panel is shorter, one-action, and linked to the relevant tab/action. |
| Upgrade purchase did not show enough before/after reward clarity | P1 | Growth rows show level/effect deltas and a separate purchase tray. |
| Reward claim could feel like a toast instead of an earned moment | P1 | Daily/reward screenshots now use dedicated reward sheet evidence. |

## New Product Direction

RC20 moves the visual language to a bright citrus garden:

- character and orchard art first;
- one clear next action;
- larger touch targets;
- reward numbers and before/after deltas over explanatory copy;
- fewer chips and less brown panel weight;
- modal/toast layers that do not block critical actions.

## Evidence

| Evidence | Status |
| --- | --- |
| `e2e/playability-reboot.spec.ts` | Added |
| `e2e/layout-regression.spec.ts` | Strengthened to avoid false positives from scroll-clipped actions and keep visible CTA hitboxes guarded |
| `e2e/visual-regression.spec.ts` | Added reward sheet screenshot capture |
| `qa-screenshots/360x740-home.png` | Regenerated, RC20 bright home scene |
| `qa-screenshots/390x844-upgrades-quick-buy.png` | Regenerated, RC20 growth choice layout |
| `qa-screenshots/390x844-reward-sheet.png` | Regenerated reward moment evidence |
| `qa-screenshots/390x844-save-modal.png` | Regenerated after modal/toast overlap fix |
| `store-screenshots/iphone-02-upgrade.png` | Regenerated with RC20 growth UI |

## Remaining Risk

Physical Android screenshots/videos are still not present in `device-qa/incoming/`. RC20 can be considered an internal web/native-build candidate only after automated validation passes. The active user goal still requires real phone recheck before complete.
