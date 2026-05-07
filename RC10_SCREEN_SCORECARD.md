# RC-10 Screen Scorecard

기준일: 2026-05-07

RC-9 scorecard는 before audit로 보존한다. 이 파일은 처음에는 RC-10 self-score `8.2 / 10`을 기록했지만, RC-10 integrity pass에서 최신 screenshot을 독립 재검토한 결과 과장된 판정으로 보정했다. 현재 공식 점수는 `RC10_INDEPENDENT_RESCORE.md`와 동일하다. 자동 테스트 통과, 파일 수, 에셋 수는 점수 근거로 쓰지 않았다.

## Screenshot Evidence

```txt
npx playwright test e2e/visual-regression.spec.ts --reporter=line
4 passed (1.9m)

npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line
2 passed (1.5m)
```

핵심 근거:

- `qa-screenshots/360x740-upgrades-quick-buy.png`
- `qa-screenshots/390x844-upgrades-quick-buy.png`
- `qa-screenshots/desktop-1280x900-upgrades-quick-buy.png`
- `qa-screenshots/390x844-home-daily-available.png`
- `qa-screenshots/390x844-daily-reward-claim.png`
- `qa-screenshots/390x844-collection-milestones.png`
- `qa-screenshots/390x844-milestone-claim.png`
- `qa-screenshots/390x844-prestige-result.png`
- `store-screenshots/iphone-01-home.png`
- `store-screenshots/iphone-02-upgrade.png`
- `store-screenshots/iphone-03-milestone.png`
- `store-screenshots/iphone-04-prestige.png`
- `store-screenshots/iphone-05-reward.png`
- Android 5장 동일 구성

## Score Table

| Screen | Evidence | Visual | Interaction | Progression | Reward feel | Info hierarchy | Mobile ergonomics | Avg | RC-10 보정 판정 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Upgrades / quick-buy | `390x844-upgrades-quick-buy.png`, `360x740-upgrades-quick-buy.png`, `desktop-1280x900-upgrades-quick-buy.png` | 7.0 | 7.5 | 7.7 | 6.9 | 7.1 | 6.9 | 7.2 | P1 remains for RC gate |
| Daily reward moment | `390x844-home-daily-available.png`, `390x844-daily-reward-claim.png` | 7.8 | 7.8 | 8.1 | 8.0 | 7.9 | 7.8 | 7.9 | 개선됐으나 8.0 미만 |
| D1/D3/D7 milestone | `390x844-collection-milestones.png`, `390x844-milestone-claim.png`, `360x740-collection-milestones.png` | 7.9 | 7.8 | 8.1 | 7.9 | 7.6 | 7.5 | 7.8 | 개선됐으나 8.0 미만 |
| Prestige result ceremony | `390x844-prestige-result.png` | 8.3 | 8.0 | 8.2 | 8.5 | 8.1 | 8.0 | 8.2 | 통과 |
| Store screenshots | `store-screenshots/iphone-*.png`, `store-screenshots/android-*.png` | 7.6 | 7.2 | 7.7 | 7.8 | 7.5 | 7.3 | 7.5 | P1 remains for store gate |

## Combined Score

| Metric | Score |
| --- | ---: |
| Required RC-10 screen average | 7.7 / 10 |
| Store screenshot average | 7.5 / 10 |
| Combined RC-10 average | 7.7 / 10 |

RC-10 gate: required screens와 combined average가 8.0 미만이므로 product release candidate로 판정하지 않는다. RC-10은 RC-9 대비 개선됐지만, upgrades quick-buy와 store screenshot product framing에는 product-quality P1이 남아 있다.

## Before / After

| RC-9 P1 | Before Evidence | RC-10 Evidence | 판정 |
| --- | --- | --- | --- |
| quick-buy 기본 HTML 버튼 느낌 | `SCREEN_SCORECARD.md`, `390x844-upgrades-quick-buy.png` RC-9 점수 5.3 | carved mode stones, selected depth, filled pedestal, cost/CTA hierarchy | 개선, P1 남음 |
| daily reward가 toast/card 수준 | `390x844-daily-reward-claim.png` RC-9 점수 5.0 | home daily badge + dedicated reward sheet with Day/streak/reward/next preview | 개선, score gate 미달 |
| milestone이 긴 카드 리스트 | `390x844-collection-milestones.png` RC-9 점수 4.9 | 3-badge stamp board + claimed seal + reward sheet | 개선, score gate 미달 |
| prestige result util modal | `390x844-prestige-result.png` RC-9 점수 5.9 | ritual raster ceremony + gained/total/multiplier before-after/next goal | 해결 |
| store-facing internal/mock wording | `STORE_LISTING_DRAFT.md`, old store screenshot plan | public listing and screenshot source no longer expose mock/sandbox/internal wording | 문구 해결, screenshot framing P1 남음 |

## Remaining P1/P2/P3

- P1: upgrade shelf / quick-buy screen is improved but still below the 8.0 product gate.
- P1: store screenshot pack removes internal wording but gameplay panel framing is still too weak for the 8.0 store-facing gate.
- P2: daily reward sheet and milestone board are improved but still under 8.0 on independent rescore.
- P2/P3: server-verified calendar/push notification, stronger sticker album language, final device screenshots, and full ceremony animation remain follow-up work.
