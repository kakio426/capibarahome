# RC-13 Visual Regression Audit

기준일: 2026-05-09

## 기준

RC-13은 문서상 self-score가 아니라 실제 Playwright screenshot, DOM 측정, store screenshot dimension guard를 기준으로 봤다.

검증 viewport:

- 360x740
- 390x844
- 430x932
- desktop 1280x900 centered panel

P1 기준:

- 주요 CTA가 하단 탭에 가림
- 모달 확인/닫기 버튼이 클릭 불가
- 주요 가격/레벨/보상 숫자가 잘림
- document horizontal overflow
- store screenshot headline/subtitle crop
- 공개 screenshot/listing copy에 개발용 단어 노출

## 자동 검사 보강

RC-13에서 추가/강화한 검사:

- `data-ui-critical` 기반 text clipping 검사
- `CurrencyDisplay`, `Button`, `Modal` title/actions에 critical marker 추가
- toast가 CTA를 막지 않도록 pointer-events 검사
- home 첫 화면 tap CTA visibility guard
- store screenshot PNG magic byte와 width/height guard

실행 결과:

```txt
npx playwright test e2e/layout-regression.spec.ts --reporter=line
4 passed
```

```txt
npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
6 passed
```

## 수동 스크린샷 점검

| 화면 | 판정 | 근거 |
| --- | --- | --- |
| Home | P1 없음 | `qa-screenshots/360x740-home.png`, `qa-screenshots/390x844-home.png`; tap CTA와 currency HUD 가림 없음 |
| Upgrades / quick-buy | P1 없음 | `qa-screenshots/360x740-upgrades-quick-buy.png`, `qa-screenshots/390x844-upgrades-quick-buy.png`; first/second CTA가 dock과 충돌하지 않음 |
| Settings | P1 없음 | `qa-screenshots/390x844-settings.png`; custom toggle, segmented control, toast non-blocking |
| Save modal | P1 없음 | `qa-screenshots/390x844-save-modal.png`; 16px textarea, code wrap/scroll, confirm CTA visible |
| Daily reward sheet | P1 없음 | `qa-screenshots/390x844-daily-reward-claim.png`; reward amount/next preview/CTA visible |
| Milestone board | P1 없음 | `qa-screenshots/390x844-collection-milestones.png`; D1/D3/D7 visible copy shortened, CTA clear |
| Milestone claim | P1 없음 | `qa-screenshots/390x844-milestone-claim.png`; reward recap and CTA visible |
| Prestige result | P1 없음 | `qa-screenshots/390x844-prestige-result.png`; gained/owned/multiplier/CTA visible |
| Offline reward | P1 없음 | `qa-screenshots/390x844-offline-reward.png`; reward number and button visible |
| Store screenshots | P1 없음 | iPhone 5장, Android 5장 regenerated; headline/subtitle clipping and dimensions guarded |

## RC-13 수정

- Home lower stats를 generic stat cards에서 `home-ledger-panel` wood ledger skin으로 변경.
- Milestone visible description을 `첫 복귀 기록`, `3일 복귀 기록`, `7일 복귀 기록`으로 줄여 360/390px ellipsis 부담을 제거.
- Store screenshot pack에 PNG dimension guard를 추가해 iPhone `1290 x 2796`, Android `1080 x 1920` crop 회귀를 막음.
- Layout regression에 `[data-ui-critical]` clipping과 toast non-blocking 검사를 추가.

## 남은 P2/P3

- Home 장부 panel은 첫 화면 하단에서 일부 다음 section처럼 보일 수 있다. 주요 CTA/텍스트를 가리는 P1은 아니다.
- Daily/milestone reward는 8점대 gate는 넘지만 장기적으로 더 풍부한 animation/sound로 올릴 여지가 있다.
- Physical iPhone/Android safe-area, keyboard, storage persistence는 실제 기기 QA 전까지 external 검증 항목이다.

## 판정

RC-13 screenshot/DOM 기준 내부 UI P1은 발견되지 않았다. 남은 항목은 P2/P3 polish 또는 외부 device QA다.
