# RC-11 Independent Re-Score

기준일: 2026-05-07

## Method

RC-11은 RC-10의 남은 P1 두 개, 즉 upgrade quick-buy/shelf와 store screenshot framing만 좁게 고친 pass다. 점수 근거로 테스트 수, 파일 수, asset 수, 구현량은 사용하지 않았다. 최신 screenshot을 직접 확인해 같은 6개 항목으로 다시 채점했다.

Primary evidence:

- `qa-screenshots/360x740-upgrades-quick-buy.png`
- `qa-screenshots/390x844-upgrades-quick-buy.png`
- `qa-screenshots/430x932-upgrades-quick-buy.png`
- `qa-screenshots/desktop-1280x900-upgrades-quick-buy.png`
- `qa-screenshots/390x844-daily-reward-claim.png`
- `qa-screenshots/390x844-collection-milestones.png`
- `qa-screenshots/390x844-milestone-claim.png`
- `qa-screenshots/390x844-prestige-result.png`
- `store-screenshots/iphone-01-home.png` through `iphone-05-reward.png`
- `store-screenshots/android-01-home.png` through `android-05-reward.png`

## Scorecard

| Screen | Visual | Interaction | Progression | Reward feel | Info hierarchy | Mobile ergonomics | Avg | RC-11 판정 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Upgrades / quick-buy | 8.1 | 8.2 | 8.2 | 7.8 | 8.1 | 8.0 | 8.1 | Pass |
| Daily reward | 8.1 | 8.0 | 8.1 | 8.1 | 8.0 | 7.9 | 8.0 | Pass, near gate |
| D1/D3/D7 milestone | 8.0 | 7.9 | 8.2 | 8.0 | 7.9 | 8.0 | 8.0 | Pass, near gate |
| Prestige result ceremony | 8.3 | 8.0 | 8.2 | 8.5 | 8.1 | 8.0 | 8.2 | Pass |
| Store screenshots | 8.2 | 8.0 | 8.1 | 8.2 | 8.1 | 8.0 | 8.1 | Pass |

Combined RC-11 average: **8.1 / 10**.

## RC-10 To RC-11 Delta

| Area | RC-10 independent score | RC-11 score | Delta |
| --- | ---: | ---: | ---: |
| Upgrades / quick-buy | 7.2 | 8.1 | +0.9 |
| Daily reward | 7.9 | 8.0 | +0.1 |
| D1/D3/D7 milestone | 7.8 | 8.0 | +0.2 |
| Prestige result ceremony | 8.2 | 8.2 | +0.0 |
| Store screenshots | 7.5 | 8.1 | +0.6 |
| Combined average | 7.7 | 8.1 | +0.4 |

## Upgrade Quick-Buy / Shelf

Score: **8.1 / 10**.

What changed:

- Quick-buy was redesigned as a workbench lever device with carved depth, notch rail, selected lift/glow, and secondary mode labels.
- `1개 / 10개 / 최대` still uses `aria-pressed` and keyboard-accessible buttons.
- Tool slots now read as filled pedestals with larger centered icons, category plaques, fixture base, and stronger shadows.
- The first card hierarchy now reads as tier/status/name, current/effect/next level, then cost/CTA.
- `360x740-upgrades-quick-buy.png` is captured at the shelf interaction point so the cost and CTA are not buried under the tab dock.

Remaining weakness:

- At 360px, the focused quick-buy screenshot necessarily crops the top of the lever board to keep the first shelf CTA visible. This is a P2 screenshot framing/compactness issue, not a P1 blocker.

## Store Screenshot Framing

Score: **8.1 / 10**.

What changed:

- Store pack now uses stronger, differentiated moments: home tap fantasy, upgrade workbench, milestone badge reveal, prestige ceremony, and return reward.
- Gameplay phone panel was enlarged and recentered so it no longer reads as a tiny app capture pasted over key art.
- Upgrade screenshot scroll/framing now shows the improved shelf card and CTA clearly on both iPhone and Android outputs.
- Milestone/prestige/reward modal shots are framed closer, with the reward moment occupying more of the phone panel.
- Public screenshot copy avoids mock/sandbox/internal/dev/test/debug/provider wording.
- Korean headline/subtitle copy uses `word-break: keep-all` and fixed widths to avoid mid-word breaks.

Remaining weakness:

- Modal store shots still rely on a blurred app backdrop behind the reward sheet. This is acceptable for RC-11 but should be revisited during final physical-device store art selection.

## Supporting Screens

Daily reward and milestone screens now clear the 8.0 gate narrowly. They are not the main RC-11 target and should remain P2 polish candidates rather than P1 blockers:

- daily reward sheet could still use richer staged animation/audio in a later pass.
- milestone board could use less text truncation and more tactile sticker interaction in a later pass.

## Decision

RC-11 result: **product-quality P1 cleared for the scoped gates**.

This does not mean App Store / Google Play submission is complete. External blockers remain for account access, signing, final icon/splash export, commissioned art ownership/legal approval, real SDK metadata, privacy/support URLs, and physical iPhone/Android QA.
