# UI Layout Defect Audit

기준일: 2026-05-08

## 기준

RC-12에서는 문서 self-score 대신 실제 Playwright DOM 측정, viewport screenshot, store screenshot 파일 산출물을 완료 근거로 삼았다.

검증 viewport:

- 360x740
- 390x844
- 430x932
- desktop 1280x900 centered panel

P1 기준:

- 주요 CTA가 하단 탭에 가림
- 모달 확인/닫기 버튼이 viewport 밖에 있거나 클릭 불가
- critical label/button/cost/currency text clipping
- document horizontal overflow
- mobile input/textarea zoom risk
- store-facing screenshot/listing copy에 mock/internal/debug/test/provider/sandbox 계열 표현 노출

## 자동 검사 추가

새 파일:

- `e2e/layout-regression.spec.ts`

강화된 helper:

- `expectNoCriticalTextClipping`
- `expectVisibleWithinViewport`
- `expectClearOfBottomDock`
- `expectModalActionUsable`

Store screenshot pack 강화:

- public screenshot copy 금지어 검사
- screenshot heading/subtitle clipping 검사
- screenshot 파일 존재/크기 검사

## 발견 및 수정

| 화면 | 결함 | 심각도 | 수정 | 근거 |
| --- | --- | --- | --- | --- |
| 앨범 D1/D3/D7 milestone board | desktop centered panel에서 `황금 숲 단골` CTA가 하단 tab dock과 약 3px 겹침 | P1 | `.content-shell` bottom padding과 `scroll-padding`을 safe-area 기준으로 증대 | `e2e/layout-regression.spec.ts` 4 viewport passed |
| 저장 Export/Import modal | save code textarea font-size가 16px 미만이라 iOS focus zoom risk | P1 | `.save-code-textarea`, `.save-import-textarea`를 16px로 보정하고 wrapping/scroll 정책 유지 | layout regression textarea font-size assertion passed |
| visual screenshot evidence | 기존 `fullPage` screenshot이 fixed bottom nav를 긴 페이지 하단 콘텐츠 위에 합성해 실제 viewport보다 더 나쁜 occlusion artifact를 만들 수 있음 | P2 | `visual-regression.spec.ts`를 viewport screenshot 기준으로 전환 | regenerated `qa-screenshots/*` |
| upgrades quick-buy evidence | viewport screenshot 전환 후 이전 scroll offset 때문에 quick-buy board 상단이 잘린 상태로 캡처됨 | P2 | `upgrades-quick-buy` 캡처를 max-buy shelf/CTA 중심으로 재프레이밍 | `qa-screenshots/360x740-upgrades-quick-buy.png`, `qa-screenshots/390x844-upgrades-quick-buy.png` |
| store screenshots | public copy lint와 file/crop existence 자동 검사가 없었음 | P2 | `store-screenshot-pack.spec.ts`에 forbidden copy, text clipping, file size guard 추가 | `npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line`: 2 passed |

## 화면별 판정

| 화면 | 판정 | 세부 |
| --- | --- | --- |
| 홈 | 통과 | currency/tap/daily badge critical text clipping 없음. 첫 viewport 하단에 다음 stats panel 일부가 보일 수 있으나 CTA/텍스트 P1 occlusion은 아님 |
| 업그레이드 / quick-buy | 통과 | quick-buy mode는 `upgrades.png`에서, max-buy shelf CTA는 `upgrades-quick-buy.png`에서 확인. 360px CTA/tab 충돌 없음 |
| 환생 | 통과 | 환생 CTA와 진행률/배율 표시 clipping 없음 |
| 환생 결과 modal | 통과 | ceremony art, 획득/보유/배율, confirm CTA가 viewport 안에 있음 |
| 상점 | 통과 | reward banner와 상품 CTA 가로 overflow 없음. 실제 SDK 연결 전 store-facing screenshot에는 상점 화면을 직접 노출하지 않음 |
| 설정 | 통과 | toggle row, segmented control, action button clipping 없음. Toast는 pointer-events none이고 CTA 클릭을 막지 않음 |
| 저장 export/import modal | 통과 | 16px textarea, code scroll/wrap, copy button, confirm CTA viewport 안에 있음 |
| 오프라인 보상 modal | 통과 | reward art, amount, CTA viewport 안에 있음 |
| daily reward sheet | 통과 | Day/streak/reward/next preview와 CTA viewport 안에 있음 |
| D1/D3/D7 milestone board | 통과 | badge title/reward/CTA critical text clipping 없음. 긴 설명은 의도적 compact ellipsis로 P2 허용 |
| 앨범 / 컬렉션 | 통과 | sticker ledger/card surfaces overflow 없음. 하단 dock과 critical CTA overlap 없음 |
| store screenshot 10장 | 통과 | iPhone/Android candidate 10장 생성, public copy 금지어 0개, heading/subtitle clipping 없음 |

## 재생성 screenshot evidence

- `qa-screenshots/360x740-home.png`
- `qa-screenshots/360x740-upgrades-quick-buy.png`
- `qa-screenshots/390x844-upgrades-quick-buy.png`
- `qa-screenshots/390x844-settings.png`
- `qa-screenshots/390x844-save-modal.png`
- `qa-screenshots/390x844-daily-reward-claim.png`
- `qa-screenshots/390x844-collection-milestones.png`
- `qa-screenshots/390x844-prestige-result.png`
- `qa-screenshots/390x844-offline-reward.png`
- `store-screenshots/iphone-01-home.png` ... `store-screenshots/iphone-05-reward.png`
- `store-screenshots/android-01-home.png` ... `store-screenshots/android-05-reward.png`

## 남은 P2/P3

- Home first viewport에서 다음 stats panel 일부가 dock 뒤로 보일 수 있다. 주요 CTA/텍스트는 아니므로 P2 visual composition observation으로 남긴다.
- Milestone badge 설명은 360/390에서 compact ellipsis를 사용한다. title/reward/CTA는 유지되어 P2 copy density로 분류한다.
- 물리 iPhone/Android safe-area, keyboard, WebView storage persistence는 실제 device QA 전까지 외부 검증 항목이다.

## 판정

RC-12 자동 layout regression과 수동 screenshot 확인 기준으로 내부 P1 layout defect는 현재 발견되지 않는다. 실제 App Store/Google Play 제출 완료는 아니며, 물리 기기 QA와 계정/서명/정책 URL은 외부 제출 준비 항목이다.
