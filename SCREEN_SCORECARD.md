# RC-9 Screen Scorecard

기준일: 2026-05-07

이 점수표는 자동 테스트 통과 여부가 아니라, 최신 RC-8 스크린샷을 처음 보는 사용자가 "계속 플레이하고 싶다 / 돈을 써도 이상하지 않다"고 느낄 가능성을 기준으로 매겼다.

RC-9에서 최신 앱을 다시 실행한 증거:

```txt
npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
6 passed (1.2m)
```

이 실행으로 360x740, 390x844, 430x932, desktop 1280x900 QA screenshot과 iPhone/Android store screenshot 후보를 다시 생성한 뒤 수동으로 확인했다.

점수 기준:

- 8.0 이상: store release candidate 화면으로 볼 수 있음
- 7.0-7.9: beta/polish 필요
- 6.0-6.9: 기능은 있으나 상용 게임 감각 부족
- 5.0-5.9: P1/P2 개선 없이는 RC 주장 위험
- 4.9 이하: P1 must-fix

## Score Table

| Screen | Evidence | Visual | Interaction | Progression | Reward feel | Info hierarchy | Mobile ergonomics | Avg | RC-9 판정 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Home first view | `qa-screenshots/390x844-home.png`, `390x844-home-daily-available.png` | 8.0 | 7.0 | 6.0 | 6.0 | 6.5 | 7.0 | 6.8 | P2 |
| Upgrades / quick-buy | `390x844-upgrades-quick-buy.png`, `360x740-upgrades-quick-buy.png` | 5.0 | 5.5 | 7.0 | 5.0 | 5.0 | 4.5 | 5.3 | P1 |
| Collection / album | `390x844-collection.png`, `390x844-collection-claim-ready.png` | 6.5 | 5.0 | 6.0 | 5.0 | 5.5 | 5.5 | 5.6 | P1 |
| Prestige | `390x844-prestige.png` | 7.5 | 6.0 | 7.0 | 6.0 | 7.0 | 7.0 | 6.8 | P2 |
| Prestige result | `390x844-prestige-result.png` | 5.8 | 5.5 | 7.0 | 5.0 | 6.0 | 6.0 | 5.9 | P1 |
| Shop | `390x844-shop.png` | 7.0 | 5.5 | 5.5 | 6.5 | 6.0 | 5.5 | 6.0 | P2 |
| Settings | `390x844-settings.png` | 6.5 | 6.0 | 5.0 | 4.0 | 6.5 | 6.5 | 5.8 | P2 |
| Save modal | `390x844-save-modal.png`, `360x740-save-modal.png` | 6.2 | 6.0 | 4.0 | 3.5 | 5.0 | 5.8 | 5.1 | P2 |
| Daily reward state | `390x844-daily-reward-claim.png`, `390x844-home-daily-cooldown.png` | 5.5 | 5.5 | 5.5 | 4.5 | 4.5 | 4.5 | 5.0 | P1 |
| D1/D3/D7 milestone | `390x844-collection-milestones.png`, `390x844-milestone-claim.png` | 5.5 | 4.5 | 6.0 | 4.5 | 5.0 | 4.0 | 4.9 | P1 |
| Offline reward | `390x844-offline-reward.png`, `360x740-offline-reward.png` | 7.0 | 6.5 | 6.0 | 7.0 | 6.5 | 6.5 | 6.6 | P2 |
| Store screenshots | `store-screenshots/iphone-*.png`, `android-*.png` | 6.5 | 4.0 | 5.0 | 4.5 | 4.5 | 6.0 | 5.1 | P1 |
| Desktop centered panel | `desktop-1280x900-upgrades-quick-buy.png` | 6.5 | 5.0 | 6.0 | 5.0 | 5.0 | 7.0 | 5.8 | P2 |

## Overall Score

| Metric | Score |
| --- | ---: |
| Gameplay screen average | 5.9 / 10 |
| Store screenshot average | 5.1 / 10 |
| Combined RC-9 average | 5.8 / 10 |

RC-9 rule: average가 8 미만이면 release candidate로 보지 않는다. 현재 평균은 5.8이므로 **제품 품질 기준 release candidate가 아니다**.

## Highest-Risk Screens

1. `390x844-upgrades-quick-buy.png`: quick-buy segmented control이 기본 브라우저 버튼처럼 보이고, tool slot이 빈 목재 슬롯처럼 보이며, 360px에서는 구매 CTA 하단이 탭바에 묻힌다.
2. `390x844-daily-reward-claim.png`: daily reward가 화면 위계의 주인공이 아니라 흐린 카드와 toast로 끝난다. 일부 상단 텍스트가 sticky header 아래에서 잘린다.
3. `390x844-collection-milestones.png`: D1/D3/D7 milestone이 sticker book 보상이라기보다 긴 카드 리스트이며, 하단 claim button이 tab dock에 걸친다.
4. `store-screenshots/iphone-04-shop.png`: store screenshot에 `mock provider` 같은 개발/검증 문구가 직접 노출된다.
5. `store-screenshots/iphone-03-prestige.png`: subtitle line-break가 `수 있습니다`를 `수 있습니 / 다`로 쪼개어 store-facing polish가 낮다.
