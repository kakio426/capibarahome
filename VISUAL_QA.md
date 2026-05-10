# Visual QA

기준일: 2026-05-09

## Summary

이번 visual gate는 PNG 파일 존재가 아니라 390x844 첫 화면과 정보형 화면이 실제 모바일 idle game처럼 보이는지를 기준으로 다시 봤다. 이전 raster pass는 핵심 이미지를 넣었어도 흰 둥근 카드와 웹앱 패널 언어가 화면을 지배해 실패로 재분류했다. v2 pass에서는 핵심 raster illustration을 교체했고, RC-4 hardening pass에서는 성장/설정/세이브/앨범 하단 정보 UI까지 wood/parchment/orange game HUD skin으로 묶었다. RC-5에서는 이 방향을 유지하면서 `layout.css` 후반 override 의존을 분리하고 reusable `.ui-*` game skin system으로 안정화했다. RC-6에서는 quick-buy, reward reveal, prestige result, album claim reveal을 추가했고, RC-7에서는 daily reward, D1/D3/D7 badge ledger, post-prestige goal chain을 같은 HUD skin 안에 넣었다. RC-8에서는 safe-area/360px modal/device-readiness regression을 추가 점검했다. RC-9 독립 감사에서는 product-quality P1이 남아 release candidate no-go로 재분류했고, RC-10 구현 후 integrity pass에서 기존 8.2 self-score를 독립 재검토해 combined 7.7로 보정했다. RC-11에서는 남은 P1 두 개만 좁게 수정했고, `RC11_INDEPENDENT_RESCORE.md` 기준 combined 8.1로 scoped product-quality P1을 해소했다. RC-12에서는 self-score를 추가하지 않고 DOM layout regression과 viewport screenshot으로 글자 잘림, CTA/tab overlap, modal 조작 불가, store copy 금지어를 검증했다. RC-13에서는 Android native shell 준비와 함께 `[data-ui-critical]` clipping, toast non-blocking, store screenshot dimension guard를 추가했고, home stats와 milestone board의 남은 P2 composition을 좁게 보강했다. RC-14에서는 동일한 layout/store guard를 재실행했고 Google Play feature graphic 1024x500 guard를 추가했다. RC-17에서는 업그레이드 카드 하단 레일이 cost/CTA를 덮어 보이는 시각 P1을 별도 수술했고, DOM clipping뿐 아니라 실제 360/390/430/store screenshot 기준으로 재확인했다.

Current evidence:

```txt
npx playwright test e2e/visual-regression.spec.ts --reporter=line
4 passed, viewport QA screenshots regenerated

npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line
2 passed, 10 store screenshots regenerated with public copy/file guards

npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
6 passed, RC-12 visual/store evidence regenerated

npm run test:e2e
36 passed, RC-12 당시 visual/store screenshot regeneration and layout regression 포함

npx playwright test e2e/layout-regression.spec.ts --reporter=line
4 passed, critical clipping/CTA/tab/modal/textarea checks

npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
6 passed, RC-13 screenshot/store evidence regenerated after copy/layout polish

npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
7 passed, RC-14 screenshot/store evidence regenerated with feature graphic guard

npx playwright test e2e/layout-regression.spec.ts --reporter=line
4 passed, RC-17 upgrade-card geometry guard included

npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
7 passed, RC-17 upgrade/store screenshots regenerated after card surgery

npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
11 passed, RC-19 playability screenshots regenerated including device QA overlay and store screenshot pack

npx playwright test e2e/layout-regression.spec.ts --reporter=line
10 passed, RC-19 CTA center hitbox/top-overlay/bottom-dock guards included
```

Current asset baseline:

```txt
src/assets/raster: 15 PNG files / 19M
runtime dist PNG assets: 12 files / 14M
src/assets/generated: 253 SVG auxiliary files
qa-screenshots: 88 current PNG files plus archived before shots
store-screenshots: 10 PNG candidates plus Google Play feature graphic candidate
```

## Before/After Judgment

| Gate | 이전 raster pass 판정 | v2 pass 판정 | 근거 |
| --- | --- | --- | --- |
| 390x844 home first impression | 실패. 핵심 이미지는 있었지만 흰 카드형 웹앱 UI가 먼저 보임 | 통과. 통합 orchard raster scene, carved header, wood tab dock, dark currency plaques가 먼저 읽힘 | `qa-screenshots/390x844-home.png` |
| Core art quality | 실패. 일부 화면이 CSS/SVG/flat-vector 보조물처럼 보임 | 통과. home/prestige/shop/offline/store/companion에 professional raster 후보 연결 | `src/assets/raster/**/*.png`, `rasterAssetIntegrity.test.ts` |
| UI skin | 실패. 카드/패널/버튼이 generic app 느낌 | 통과. wood/parchment/orange lacquer HUD로 교체하고 upgrade shelf, ledger settings, save vault까지 확장. RC-5에서 CSS를 `shell/hud/screens/effects`로 분리하고 `.ui-*` skin classes를 적용 | `src/ui/styles/layout.css`, `src/ui/styles/shell.css`, `src/ui/styles/hud.css`, `src/ui/styles/screens.css`, `RC4_UI_SKIN_AUDIT.md`, `RC5_CSS_COMPONENT_AUDIT.md` |
| Store screenshot | 부분 실패. 앱 캡처 포장 느낌이 강함 | 통과. RC-11에서 phone panel scale/crop, upgrade shelf framing, milestone/prestige/reward modal close framing, public copy line-break를 재조정해 store pack 8.1로 보정 | `store-screenshots/iphone-01-home.png`, `store-screenshots/iphone-02-upgrade.png`, `RC11_INDEPENDENT_RESCORE.md` |
| 설정/저장 util 냄새 | 부분 실패 | 통과. 설정은 집사 장부/서랍, 저장은 보관함 봉인 코드와 금고 modal로 재스킨. 긴 export code 자체는 기능상 남는 P3 | `qa-screenshots/390x844-settings.png`, `qa-screenshots/390x844-save-modal.png` |

## Screen-by-Screen Review

| Screen | v2 판정 | 확인 내용 | 경쟁작 대비 남은 부족점 |
| --- | --- | --- | --- |
| 홈 | 완료 | 카피바라와 귤 정원이 숫자보다 먼저 보이고, tap CTA/재화 HUD/하단 탭이 같은 wood HUD skin으로 통일됨 | Cats & Soup 같은 hand-drawn idle animation depth는 P2 |
| 성장 | 완료 | RC-11에서 quick-buy를 작업대 레버 장치로 재스킨하고, filled pedestal/icon centering, current/effect/next level/cost/CTA 위계, 360px focused shelf capture를 보강했다. 독립 재점수 8.1로 upgrade shelf P1을 해소했다 | card compactness와 richer purchase ceremony는 P2 |
| 앨범 | 완료 | v2 companion portrait 8종과 orchard room background가 보이고, 카드도 game shelf 톤으로 정리됨. RC-6 claim reveal banner로 보상 순간이 강화됨 | 방 꾸미기 자유 배치는 P3 |
| 환생 | 완료 | golden leaf ritual raster scene이 계산보다 먼저 보임. RC-10 result ceremony는 ritual art crop, 획득 잎, 보유량, 배율 before/after, 다음 목표를 하나의 보상 순간으로 묶었다 | full ritual animation은 P3 |
| 상점 | 완료 | reward banner가 mock shop을 게임 상점처럼 잡아주고, 실제 결제 오해 문구는 없음 | 실제 광고/IAP SDK 연결 전까지 sandbox |
| 오프라인 보상 | 완료 | harvest/rest raster illustration과 보상 숫자가 모달 첫 시선으로 들어옴. RC-6 basket/chest reveal cue와 reward count plaque 추가 | 장시간 복귀 count-up numeric animation은 P3 |
| 설정/저장 | 완료 | 설정은 집사 장부/정원 관리 서랍, 세이브는 보관함/봉인 코드/금고 modal로 보이며 모바일에서 잘리지 않음 | native save/restore와 export code 길이 자체의 시각 부담은 P3 |
| 튜토리얼 | 완료 | 첫 사용자가 터치/성장/보상 흐름을 막히지 않고 볼 수 있음 | 단계별 mascot animation은 P3 |
| 리텐션 | 완료 | RC-10에서 홈 daily badge와 dedicated reward sheet, D1/D3/D7 stamp board, milestone reward sheet를 추가했고 RC-11 재점수에서 daily/milestone 모두 8.0 gate를 넘겼다 | 서버 검증 calendar/push notification은 P2 external, reward moment/sticker board polish는 P2 |

## RC-4 Interaction Polish

| 대상 | 이전 잔여 문제 | RC-4 조치 | Evidence |
| --- | --- | --- | --- |
| 성장/업그레이드 | 카드 리스트/스프레드시트처럼 읽힘 | garden workbench shelf, tool slot, shelf rail, cost plaque, short hierarchy 적용 | `UpgradePanel.tsx`, `qa-screenshots/390x844-upgrades.png` |
| 설정 토글 | 브라우저 checkbox처럼 보여 game HUD skin과 충돌 | carved rectangular switch, ON/OFF label, wood/orange thumb으로 교체 | `src/ui/components/Toggle.tsx`, `qa-screenshots/390x844-settings.png` |
| Toast | settings screenshot에서 screen header를 덮어 정보 위계가 깨짐 | `data-toast-visible` content offset과 carved toast banner 적용 | `AppShell.tsx`, `qa-screenshots/390x844-settings.png` |
| 세이브 modal | export/import code box가 기능형 form처럼 보이고 복사 action이 없음 | save vault frame, sealed code row, parchment textarea와 `Export 코드 복사` action 추가 | `SaveImportExportModal.tsx`, `qa-screenshots/390x844-save-modal.png` |
| Modal close/action | 기본 util dialog 느낌 일부 잔존 | close button, disabled button, modal frame shadow를 wood HUD로 보강 | `hud.css`, `screens.css`, `qa-screenshots/390x844-save-modal.png`, `qa-screenshots/390x844-offline-reward.png` |
| 앨범 하단 지표/progress | metric grid/progress bar가 generic control처럼 남음 | sticker-book ledger stamp와 carved groove progress로 보강 | `qa-screenshots/390x844-collection.png` |
| Interaction feedback | 구매/오류/환생/tabs feedback이 정적임 | purchase pulse, error toast shake, prestige ready glow, tab active pop 추가. effects off/reduced motion 존중 | `AppShell.tsx`, `effects.css`, `hud.css` |

## RC-5 CSS Component Pass

| 대상 | RC-4 잔여 리스크 | RC-5 조치 | Evidence |
| --- | --- | --- | --- |
| CSS 구조 | `layout.css` 3,021줄과 후반 override 의존 | `layout.css`를 import manifest로 축소하고 `shell.css`, `hud.css`, `screens.css`, `effects.css`로 책임 분리 | `RC5_CSS_COMPONENT_AUDIT.md`, `src/ui/styles/` |
| 공통 UI skin | 기존 `.btn`, `.panel`, `.modal` 중심이라 재사용 단위가 불명확 | `.ui-button`, `.ui-panel`, `.ui-modal`, `.ui-ledger-row`, `.ui-progress-groove`, `.ui-tab-dock`, `.ui-shelf-card`, `.ui-sticker-ledger`, `.ui-code-slot` 병행 적용 | `Button.tsx`, `Panel.tsx`, `Modal.tsx`, `Toggle.tsx`, `ProgressBar.tsx`, `UpgradePanel.tsx`, `SaveImportExportModal.tsx` |
| 성장 screen | tool slot이 빈 CSS plinth처럼 보일 수 있음 | pedestal/shadow/icon centering 조정, cost/buy plaque inline hierarchy 유지 | `qa-screenshots/390x844-upgrades.png`, `qa-screenshots/360x740-upgrades.png` |
| 설정/세이브 | 화면별 one-off ledger/vault CSS | ledger row/toggle/vault/code slot을 common HUD classes로 안정화 | `qa-screenshots/390x844-settings.png`, `qa-screenshots/390x844-save-modal.png` |
| 앨범 | metric grid 느낌 잔존 | sticker-ledger/stamp strip, groove progress treatment 강화 | `qa-screenshots/390x844-collection.png` |
| Regression fix | CSS split 직후 screen header가 low-contrast parchment로 회귀 | `screens.css`에서 dark wood header plaque를 재고정하고 screenshots 재생성 | `qa-screenshots/390x844-upgrades.png`, `qa-screenshots/390x844-settings.png` |

## RC-6 Product Feel Pass

| 대상 | RC-5 잔여 리스크 | RC-6 조치 | Evidence |
| --- | --- | --- | --- |
| 반복 구매 | 단일 구매만 있어 mid-game 반복 조작이 피곤함 | `1개 / 10개 / 최대` quick-buy, BigNumber purchase plan, 구매 후 Lv chip | `UpgradeManager.ts`, `UpgradePanel.tsx`, `upgrade.test.ts`, `qa-screenshots/390x844-upgrades-quick-buy.png` |
| 터치 손맛 | floating text가 반복적으로 같은 위치/색으로 보임 | 위치/색/크기 variation, touch press feedback, particle cap 유지 | `AppShell.tsx`, `FloatingTextLayer.tsx`, `effects.css` |
| 오프라인 보상 | 정적 reward modal 느낌 | staged return copy, basket lid cue, reward count plaque | `qa-screenshots/390x844-offline-reward.png`, `offline-reward.spec.ts` |
| 환생 결과 | toast만으로는 강해진 느낌이 약함 | result panel with gained leaves, total leaves, new multiplier, next target | `qa-screenshots/390x844-prestige-result.png`, `prestige-flow.spec.ts` |
| 앨범/업적 claim | 버튼/토스트 위주 보상 | sticker stamp/reveal banner and claimable glow | `qa-screenshots/390x844-collection-claim-ready.png`, `first-five-minute-playtest.spec.ts` |
| motion settings | 연출 off에서 animation이 남을 수 있음 | effects-off/reduced motion animation disable coverage 확장 | `effects.css`, `settings-tutorial.spec.ts` |

## RC-7 Retention Pass

| 대상 | RC-6 잔여 리스크 | RC-7 조치 | Evidence |
| --- | --- | --- | --- |
| Daily reward | 문서화만 있고 실제 claim/cooldown 없음 | 20시간 cooldown daily reward, 48시간 reset, save version 5 retention state | `RetentionManager.ts`, `retention.test.ts`, `qa-screenshots/390x844-home-daily-available.png` |
| D1/D3/D7 milestone | 장기 복귀 badge/reward가 없음 | 앨범 복귀 배지 ledger, claim/reload persistence, duplicate guard | `qa-screenshots/390x844-collection-milestones.png`, `retention-flow.spec.ts` |
| Post-prestige goal | 환생 후 다음 목표가 generic copy에 가까움 | 5단계 goal chain, home panel, prestige result next-goal copy | `qa-screenshots/390x844-home-post-prestige-goal.png`, `prestige-flow.spec.ts` |
| UI regression | 새 retention UI가 웹 카드처럼 보일 위험 | 기존 wood/parchment/orange HUD panel, stamp, reward plaque, progress groove 재사용 | `screens.css`, `hud.css`, `effects.css` |

## RC-8 Device Readiness Visual Pass

| 대상 | RC-8 리스크 | RC-8 확인 | Evidence |
| --- | --- | --- | --- |
| 360px save modal | safe-area/input zoom/padding 변경 후 modal이 하단 탭과 충돌할 수 있음 | 360x740에서 settings toggle 후 save modal bounding box와 horizontal overflow를 확인 | `e2e/rc8-release-bug-bash.spec.ts`, `qa-screenshots/360x740-save-modal.png` |
| retention panel density | daily/goal panel이 홈 tap loop를 밀어낼 수 있음 | home daily available/cooldown/post-prestige screenshots 재생성 | `qa-screenshots/390x844-home-daily-available.png`, `qa-screenshots/390x844-home-post-prestige-goal.png` |
| toast click safety | toast가 주요 클릭을 막을 수 있음 | quick-buy/settings/tap flow 후 클릭 가능성 확인 | `e2e/rc8-release-bug-bash.spec.ts` |
| repeated tab dock | 탭 전환 중 active state나 pointer layer가 남을 수 있음 | 24회 tab switching 후 home tap CTA visible/clickable 확인 | `e2e/rc8-release-bug-bash.spec.ts` |

## RC-10 Product UI & Reward Moment Pass

RC-9는 product-quality 기준으로 release candidate no-go였고 평균 점수는 5.8이었다. RC-10에서는 새 기능을 늘리지 않고 RC-9 P1만 고쳤다.

| 대상 | RC-9 P1 | RC-10 조치 | Score/Evidence |
| --- | --- | --- | --- |
| 업그레이드 quick-buy | 기본 HTML 버튼, 빈 tool slot, CTA/tab 충돌 | carved mode stones, selected depth, filled pedestal, cost/CTA hierarchy, 360px safe padding | 보정 7.2, P1 남음, `RC10_INDEPENDENT_RESCORE.md`, `qa-screenshots/390x844-upgrades-quick-buy.png` |
| Daily reward | toast/card 수준, 첫 viewport 보상 약함 | hero daily badge, reward sheet, Day/streak/reward/next preview | 보정 7.9, 8.0 gate 미달, `qa-screenshots/390x844-daily-reward-claim.png` |
| D1/D3/D7 milestones | 긴 카드 리스트, claimed state 약함 | 3-badge stamp board, seal overlay, badge reward sheet | 보정 7.8, 8.0 gate 미달, `qa-screenshots/390x844-collection-milestones.png`, `qa-screenshots/390x844-milestone-claim.png` |
| Prestige result | util modal 느낌 | ritual art ceremony, gained/total leaves, before/after multiplier, next goal | 보정 8.2, 통과, `qa-screenshots/390x844-prestige-result.png` |
| Store screenshots | internal/mock wording, 약한 순간 선택 | home/upgrade/milestone/prestige/reward 5장으로 재구성, 공개 문구에서 mock/sandbox/internal 제거 | 보정 7.5, store framing P1 남음, `store-screenshots/iphone-*.png`, `store-screenshots/android-*.png` |

## RC-11 Narrow P1 Kill Pass

RC-11은 RC-10 no-go 기록을 삭제하지 않고, 남은 P1 두 개만 좁게 수정했다.

| 대상 | RC-10 보정 점수 | RC-11 조치 | RC-11 점수/Evidence |
| --- | ---: | --- | --- |
| 업그레이드 quick-buy/shelf | 7.2 | carved mode stones를 작업대 레버 장치로 강화, selected depth/glow/notch, filled pedestal, cost/CTA safe capture, shelf hierarchy 조정 | 8.1, `qa-screenshots/360x740-upgrades-quick-buy.png`, `qa-screenshots/390x844-upgrades-quick-buy.png` |
| Store screenshots | 7.5 | phone panel scale/crop 확대, upgrade shelf close framing, modal reward moment close framing, public Korean copy 정렬 | 8.1, `store-screenshots/iphone-02-upgrade.png`, `store-screenshots/android-02-upgrade.png` |
| Daily reward | 7.9 | 기존 reward sheet를 유지하고 regenerated evidence 기준 spacing/readability 재확인 | 8.0, `qa-screenshots/390x844-daily-reward-claim.png` |
| D1/D3/D7 milestones | 7.8 | badge board와 claim sheet를 유지하고 360/390 bottom-safe state 재확인 | 8.0, `qa-screenshots/390x844-collection-milestones.png`, `qa-screenshots/390x844-milestone-claim.png` |

RC-11 combined score: 8.1. Scoped product-quality P1은 해소됐고 남은 항목은 P2/P3 또는 외부 제출 준비다.

## RC-12 Layout Defect Kill Pass

RC-12는 새 visual self-score를 만들지 않고 실제 layout defect만 점검했다.

| 대상 | RC-12 발견 | 조치 | Evidence |
| --- | --- | --- | --- |
| D1/D3/D7 milestone board | desktop centered panel에서 `황금 숲 단골` CTA가 bottom dock과 약 3px 겹침 | content shell bottom padding/scroll-padding 증대 | `e2e/layout-regression.spec.ts` 4 passed, `qa-screenshots/desktop-1280x900-collection-milestones.png` |
| Save export/import modal | textarea font-size가 16px 미만이라 iOS focus zoom risk | save/import textarea 16px, line-height/wrap 유지 | `qa-screenshots/390x844-save-modal.png`, layout textarea assertion |
| Visual screenshot evidence | fullPage screenshot이 fixed dock artifact를 만들 수 있음 | viewport screenshot으로 전환 | regenerated `qa-screenshots/360x740-*.png`, `390x844`, `430x932`, `desktop` |
| Quick-buy evidence | viewport 전환 후 screenshot 상단 crop이 quick-buy board를 잘라 보일 수 있음 | max-buy shelf/CTA 중심으로 scroll framing 조정 | `qa-screenshots/360x740-upgrades-quick-buy.png`, `qa-screenshots/390x844-upgrades-quick-buy.png` |
| Store screenshot public copy | 금지어/파일 크기/heading clipping 자동 guard 없음 | `store-screenshot-pack.spec.ts`에 forbidden copy, clipping, file-size guard 추가 | `store-screenshots/iphone-*.png`, `store-screenshots/android-*.png` |

RC-12 기준 내부 P1 layout defect는 발견되지 않는다. 남은 것은 home 하단 stats panel composition, milestone 설명 ellipsis, runtime raster payload, physical device QA 같은 P2/P3 또는 외부 제출 준비 항목이다.

## RC-13 Final UI Defect Sweep

| 대상 | RC-12 잔여 리스크 | RC-13 조치 | Evidence |
| --- | --- | --- | --- |
| Home lower stats | 다음 장부 panel이 generic stat card처럼 보일 수 있음 | `home-ledger-panel` wood ledger skin, dark plaques, section chip 적용 | `qa-screenshots/360x740-home.png`, `qa-screenshots/390x844-home.png` |
| Milestone board | 설명 ellipsis가 sticker-board polish를 약하게 함 | visible description을 `첫 복귀 기록`, `3일 복귀 기록`, `7일 복귀 기록`으로 축약 | `qa-screenshots/390x844-collection-milestones.png` |
| Critical text checks | selector 기반 clipping만으로 놓치는 공통 UI 가능성 | Button/Currency/Modal에 `data-ui-critical` 추가, layout regression helper 강화 | `e2e/layout-regression.spec.ts` 4 passed |
| Toast click safety | 설정 toast가 CTA를 막을 위험 | toast pointer-events non-blocking assertion 추가 | `e2e/helpers.ts`, `e2e/layout-regression.spec.ts` |
| Store crop/dimension | file size만으로는 crop dimension 회귀를 놓칠 수 있음 | PNG magic/width/height guard 추가 | `e2e/store-screenshot-pack.spec.ts`, store iPhone 1290x2796 / Android 1080x1920 |

RC-13 기준 내부 UI P1은 발견되지 않는다. Native/submission readiness는 `RC13_NATIVE_READINESS_AUDIT.md`와 `RC13_SUBMISSION_AUDIT.md`에 별도 분리한다.

## RC-14 Final Layout / Store Sweep

| 대상 | RC-14 확인 | Evidence |
| --- | --- | --- |
| 360px home | CTA, currency HUD, bottom tab collision 없음 | `qa-screenshots/360x740-home.png` 수동 확인 |
| 360px quick-buy | first/second shelf cost/CTA가 tab dock에 가려지지 않음 | `qa-screenshots/360x740-upgrades-quick-buy.png` 수동 확인 |
| Save modal | textarea 16px, code wrap, confirm CTA visible | `qa-screenshots/390x844-save-modal.png`, layout regression |
| Daily reward sheet | reward amount/next preview/CTA visible | `qa-screenshots/390x844-daily-reward-claim.png` |
| Milestone board | D1/D3/D7 badge board와 CTA visible | `qa-screenshots/390x844-collection-milestones.png` |
| Store screenshots | iPhone/Android 10장, public copy/dimensions guarded | `store-screenshots/iphone-*.png`, `store-screenshots/android-*.png` |
| Google Play feature graphic | 1024x500 PNG candidate 생성/검증 | `store-screenshots/google-play-feature-graphic.png` |

RC-14 기준 내부 UI P1은 발견되지 않는다. Native/device readiness는 `RC14_NATIVE_BUILD_AUDIT.md`와 `RC14_DEVICE_QA_PACKET.md`에 별도 분리한다.

## RC-17 Upgrade Card UI Surgery

RC-17은 새 기능이나 save schema 변경 없이 업그레이드 카드 내부 레이어만 좁게 수술했다. 자동 clipping 검사가 통과해도 실제 screenshot에서 하단 장식이 가격/CTA를 덮어 보이면 실패로 간주했다.

| 대상 | RC-17 전 문제 | RC-17 조치 | Evidence |
| --- | --- | --- | --- |
| 하단 shelf rail | 두꺼운 나무 레일이 cost/CTA tray를 덮거나 눌러 보임 | bottom rail pseudo-element 제거, left accent/top highlight로 이동, purchase tray full-width 분리 | `qa-screenshots/390x844-upgrades-quick-buy.png`, `qa-screenshots/360x740-upgrades-quick-buy.png` |
| Tool pedestal | 왼쪽 pedestal가 카드 공간을 과하게 차지 | `.upgrade-card-body`를 compact tool tile + copy column으로 분리, tool ratio guard <= 31% 추가 | `e2e/layout-regression.spec.ts`, `qa-screenshots/430x932-upgrades-quick-buy.png` |
| Badge 경쟁 | `마당`, `구매 가능`, `현재`, `효과`, `구매 후 Lv`가 모두 큰 버튼처럼 경쟁 | tier/status는 small status row, current/effect/result는 compact stat tags, family chip 숨김 | `src/ui/screens/UpgradePanel.tsx`, `src/ui/styles/screens.css` |
| Purchase tray | 비용과 `최대 N회` CTA가 카드 하단에 압착 | tray 최소 높이와 44px CTA 보장, cost/button overlap guard 추가 | `layout-regression.spec.ts` 4 passed |
| Store upgrade frame | store upgrade screenshot이 crowded shelf card를 보여줌 | iPhone/Android store screenshot 재생성, RC-17 shelf layout 반영 | `store-screenshots/iphone-02-upgrade.png`, `store-screenshots/android-02-upgrade.png` |

RC-17 기준 업그레이드 카드 시각 P1은 발견되지 않는다. 남은 항목은 richer purchase ceremony와 optional workbench animation 같은 P2/P3 polish다.

## RC-18 Android WebView Font / Safe-Area Sweep

RC-18은 실제 phone screenshot이 아직 없는 상태에서 Android WebView에서 흔히 발생하는 한글 줄높이/폰트 fallback/bottom navigation 충돌을 선제적으로 보강했다. 완료 근거는 self-score가 아니라 CSS 변경, layout regression, regenerated screenshots다.

| 대상 | RC-18 위험 | RC-18 조치 | Evidence |
| --- | --- | --- | --- |
| Korean font fallback | Android WebView에서 remote font 없이 weight/line-height가 뭉개지거나 세로 잘림 가능 | system-safe Korean stack, number stack, global line-height, critical UI line-height/min-height 보강 | `src/ui/styles/tokens.css`, `src/ui/styles/global.css`, layout font-scale guard |
| Bottom tab / gesture nav | 320/360px에서 CTA와 bottom dock이 가까워질 위험 | content bottom padding/scroll-padding 확대, safe-area `max()` guard, 320px media rule | `qa-screenshots/320x740-home.png`, `qa-screenshots/320x740-upgrades-quick-buy.png` |
| Upgrade card chips/cost/CTA | 작은 칩과 max-buy CTA가 Android font scaling에서 눌릴 위험 | upgrade chip/stat/cost/button line-height and min-height hardening, `data-ui-critical` 추가 | `qa-screenshots/android-webview-360x800-upgrades-quick-buy.png` |
| Save modal | dense export code / input focus risk | textarea 16px guard 유지, modal action clipping 검사 유지 | `qa-screenshots/390x844-save-modal.png` |
| Device diagnostics | 실제 폰에서 viewport/DPR/font stack 확인 어려움 | `?deviceQa=1` overlay 추가 | `src/app/AppShell.tsx` |

RC-18 manual spot check:

- `qa-screenshots/320x740-home.png`: home CTA는 bottom dock에 가려지지 않고, currency HUD와 daily badge text가 세로로 잘리지 않는다.
- `qa-screenshots/320x740-upgrades-quick-buy.png`: first/second card의 cost와 CTA가 명확히 분리되고, 하단 탭과 실제 조작 대상 CTA 충돌이 없다.
- `qa-screenshots/android-webview-360x800-upgrades-quick-buy.png`: Android-ish viewport에서 chip/title/stat/description/purchase tray가 읽히며, 버튼 text가 눌려 보이지 않는다.
- `qa-screenshots/390x844-save-modal.png`: export/import modal의 close/copy/import/confirm action이 화면 안에 있고 textarea font-size 16px guard가 유지된다.

RC-18 기준 Playwright/DOM 기반 P1 layout defect는 발견되지 않는다. 단, 실제 Android phone screenshot/video는 아직 없으므로 physical QA는 external verification으로 남는다.

RC-19 manual spot check:

- `qa-screenshots/320x740-upgrades.png`: quick-buy `1개/10개/최대`가 세로로 쌓이던 visual P1을 수정했다. 현재는 3분할 작업대 레버로 보이고 큰 빈 목재 레일이 화면을 차지하지 않는다.
- `qa-screenshots/android-webview-360x800-upgrades.png`: Android-ish viewport에서 quick-buy panel과 first upgrade shelf가 분리되어 보이며, 버튼/칩/비용/CTA가 눌리거나 겹쳐 보이지 않는다.
- `qa-screenshots/390x844-prestige-result.png`: 환생 결과 modal의 before/after multiplier ribbon이 하단 action에 반쯤 잘려 보이지 않는다. reward summary는 result modal 안에서 compact 3-column layout을 유지한다.
- `qa-screenshots/320x740-prestige-result.png`: 320px에서도 reward summary, before/after ribbon, next goal copy, CTA가 한 화면 안에서 조작 가능하게 보인다.
- `store-screenshots/iphone-02-upgrade.png`, `store-screenshots/android-02-upgrade.png`: store upgrade shot의 quick-buy workbench가 최신 UI를 반영하고, public-facing 이미지에 vertical button stack이나 mock/internal/debug/test/provider/sandbox 문구가 없다.

RC-19 targeted verification:

- `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: 10 passed
- `npx playwright test e2e/visual-regression.spec.ts --reporter=line`: 7 passed
- `npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line`: 3 passed

RC-20 scroll dock polish:

- `qa-screenshots/320x740-settings.png`: 긴 설정 화면 하단에서 다음 section label이 bottom dock과 날카롭게 충돌해 보이는 P2 scroll composition을 fade mask로 완화했다.
- `qa-screenshots/320x740-home.png`: home ledger section이 dock 아래로 직접 깔리는 느낌을 줄이고, scroll continuation이 의도된 화면 경계처럼 보이도록 조정했다.
- `qa-screenshots/390x844-collection-milestones.png`: milestone board 아래 quest card가 tab dock과 직접 충돌하지 않도록 content shell/dock geometry guard와 fade mask를 적용했다.
- `e2e/layout-regression.spec.ts`는 content shell bottom이 bottom tab top을 침범하지 않는지 모든 viewport에서 검사한다.
- `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: 10 passed
- `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: 10 passed

RC-21 copy and micro-layout polish:

- `qa-screenshots/320x740-settings.png`: 설정 subtitle을 짧게 줄여 320px에서 마지막 글자만 떨어지는 줄바꿈을 제거했다.
- `qa-screenshots/390x844-save-modal.png`: visible copy의 `Export/Import`를 제거하고 `저장 코드 보관함`, `내보내기 코드`, `가져오기 코드`, `보관 코드 복사`로 교체했다. save vault의 게임 UI tone은 유지하면서 개발자용 라벨을 줄였다.
- `qa-screenshots/320x740-upgrades-quick-buy.png`: 첫 업그레이드 설명 두 개를 짧게 다듬어 카드 설명이 좁은 폭에서 덜 답답하게 읽힌다.

## RC-19 Playability UX Visual Check

이번 RC-19 pass는 visual art polish가 아니라 playability visual feedback을 강화했다. 완료 근거는 self-score가 아니라 regenerated screenshots, DOM hitbox checks, and playability E2E다.

| 대상 | RC-19 전 위험 | RC-19 조치 | Evidence |
| --- | --- | --- | --- |
| Home first 10 minutes | 여러 panel이 동시에 말해 다음 행동이 약하게 느껴질 수 있음 | hero 하단에 compact `next-action-panel` 배치. 한 번에 하나의 행동, 얻는 것, CTA만 표시 | `qa-screenshots/360x740-home.png`, `qa-screenshots/390x844-home.png` |
| Tap reward feedback | floating text가 배경 위에서 약하게 보일 수 있음 | pill/banner floating text로 강화하고 `+1 귤` 보상 피드백을 E2E로 고정 | `e2e/playability-flow.spec.ts`, `qa-screenshots/390x844-device-qa-overlay.png` |
| Upgrade quick-buy reward clarity | max 구매 후 무엇이 얼마나 증가했는지 버튼만으로는 약함 | purchase tray에 `레벨 0 -> 49`, `터치 +0 -> 터치 +49` delta row와 구매 성공 result banner 추가 | `qa-screenshots/390x844-upgrades-quick-buy.png`, `qa-screenshots/360x740-upgrades-quick-buy.png` |
| Touch hitbox confidence | clipping 통과 후에도 overlay/dock이 CTA center를 막을 수 있음 | `elementFromPoint` 기반 visible CTA center guard 추가, toast/modal/bottom dock 충돌 검사 | `e2e/layout-regression.spec.ts` 10 passed |
| Device diagnosis | 실제 폰에서 “안 눌림” 제보 시 target 확인이 어려움 | debug-only `?deviceQa=1` overlay에 최근 20개 tap/click target log 추가 | `qa-screenshots/390x844-device-qa-overlay.png` |

RC-19 manual spot check:

- `qa-screenshots/360x740-home.png`: next-action panel은 hero 안에 들어가며 하단 탭이 CTA를 덮지 않는다. visible copy는 1개 목표 중심으로 유지된다.
- `qa-screenshots/390x844-upgrades-quick-buy.png`: 첫 업그레이드 카드의 레벨/효과 변화와 cost/CTA가 분리되어 보이고, max-buy 행동이 단순 버튼 묶음보다 “구매 결과”로 읽힌다.
- `qa-screenshots/390x844-daily-reward-claim.png`: reward sheet action button은 modal 안에서 충분한 터치 영역을 유지한다.
- `qa-screenshots/390x844-collection-milestones.png`: milestone claim CTA는 tab dock에 가려지지 않는다.
- `qa-screenshots/390x844-prestige-result.png`: 환생 결과 CTA와 배율 ribbon이 겹치지 않는다.
- `qa-screenshots/390x844-device-qa-overlay.png`: overlay는 debug-only 상태에서 viewport/top-layer/tap target을 보여준다. 일반 유저 화면에는 노출되지 않는다.

## Manual Spot Check

- `qa-screenshots/390x844-home.png`: 첫인상은 웹 대시보드가 아니라 모바일 게임 home scene이다. 큰 흰 카드가 주인공이 되지 않는다.
- `qa-screenshots/390x844-upgrades.png`: 일반 rounded card list보다는 작업대 선반, tool slot, cost plaque, 구매/대기 버튼으로 읽힌다.
- `qa-screenshots/390x844-upgrades-quick-buy.png`: RC-17 기준 하단 장식이 비용/CTA를 덮어 보이지 않고, tool tile/status/stat/purchase tray가 분리되어 first shelf card의 구매 행동이 2초 안에 읽힌다.
- `qa-screenshots/390x844-collection.png`: portrait sticker room과 companion card가 보이며, score grid/progress도 sticker ledger/groove 방향으로 보정됐다.
- `qa-screenshots/390x844-prestige.png`: golden leaf ritual art가 화면 성격을 결정한다.
- `qa-screenshots/390x844-shop.png`: reward banner와 상품 shelf가 개발자용 제어판이 아니라 게임 상점 화면으로 보이게 한다.
- `qa-screenshots/390x844-settings.png`: browser checkbox가 사라지고 custom ON/OFF switch가 적용됐으며 toast가 제목을 가리지 않는다.
- `qa-screenshots/390x844-save-modal.png`: 저장 코드 보관함 copy action, sealed code row, vault frame이 적용되어 util dialog 냄새가 줄었고 실제 복구 사용성도 유지된다.
- `store-screenshots/iphone-01-home.png`: store-facing key art와 gameplay panel이 함께 보여 단순 앱 캡처 수준에서는 벗어났다.
- `store-screenshots/iphone-02-upgrade.png`: RC-17 upgrade shelf 장면이 가까이 보이고 first shelf CTA가 도크나 장식에 묻히지 않는다.

## Viewports

| Viewport | Status | Evidence |
| --- | --- | --- |
| 320x740 | 완료 후보 | viewport screenshots in `qa-screenshots/320x740-*.png`, Android font/layout regression checks |
| 360x740 | 완료 | viewport screenshots in `qa-screenshots/360x740-*.png`, layout regression checks |
| Android WebView 360x800 | 완료 후보 | viewport screenshots in `qa-screenshots/android-webview-360x800-*.png`, layout regression checks |
| Android WebView 393x873 | 완료 후보 | layout regression checks |
| Android WebView 412x915 | 완료 후보 | viewport screenshots in `qa-screenshots/android-webview-412x915-*.png`, layout regression checks |
| 390x844 | 완료 | viewport screenshots in `qa-screenshots/390x844-*.png`, layout regression checks |
| 430x932 | 완료 | viewport screenshots in `qa-screenshots/430x932-*.png`, layout regression checks |
| Desktop 1280x900 central panel | 완료 | viewport screenshots in `qa-screenshots/desktop-1280x900-*.png`, layout regression checks |

## Screenshot Evidence

| Screen | Screenshot Examples |
| --- | --- |
| Home + tutorial | `qa-screenshots/390x844-home-tutorial.png` |
| Home after tutorial | `qa-screenshots/390x844-home.png`, `qa-screenshots/360x740-home.png` |
| 320px home | `qa-screenshots/320x740-home.png` |
| Home progression/collection | `qa-screenshots/390x844-home-progression.png` |
| Home daily reward available/cooldown | `qa-screenshots/390x844-home-daily-available.png`, `qa-screenshots/390x844-home-daily-cooldown.png` |
| Daily reward claim | `qa-screenshots/390x844-daily-reward-claim.png` |
| Home post-prestige goal | `qa-screenshots/390x844-home-post-prestige-goal.png` |
| Upgrade cards | `qa-screenshots/390x844-upgrades.png` |
| Quick-buy mode | `qa-screenshots/390x844-upgrades-quick-buy.png` |
| 320px / Android WebView quick-buy | `qa-screenshots/320x740-upgrades-quick-buy.png`, `qa-screenshots/android-webview-360x800-upgrades-quick-buy.png` |
| Album / quest / collection | `qa-screenshots/390x844-collection.png` |
| Album companion abilities | `qa-screenshots/390x844-collection-abilities.png` |
| Album achievement rewards | `qa-screenshots/390x844-collection-rewards.png` |
| Album claim-ready state | `qa-screenshots/390x844-collection-claim-ready.png` |
| Album retention milestones | `qa-screenshots/390x844-collection-milestones.png`, `qa-screenshots/390x844-milestone-claim.png` |
| Prestige | `qa-screenshots/390x844-prestige.png` |
| Prestige result | `qa-screenshots/390x844-prestige-result.png` |
| Shop | `qa-screenshots/390x844-shop.png`, `qa-screenshots/360x740-shop.png` |
| Offline reward modal | `qa-screenshots/390x844-offline-reward.png`, `qa-screenshots/360x740-offline-reward.png` |
| Settings | `qa-screenshots/390x844-settings.png` |
| Save import/export modal | `qa-screenshots/390x844-save-modal.png`, `qa-screenshots/360x740-save-modal.png` |

## Store Screenshot Candidates

| Candidate | Status | Evidence |
| --- | --- | --- |
| iPhone home | 완료 | `store-screenshots/iphone-01-home.png` |
| iPhone upgrade | 완료 | `store-screenshots/iphone-02-upgrade.png` |
| iPhone milestone | 완료 | `store-screenshots/iphone-03-milestone.png` |
| iPhone prestige ceremony | 완료 | `store-screenshots/iphone-04-prestige.png` |
| iPhone reward | 완료 | `store-screenshots/iphone-05-reward.png` |
| Android home | 완료 | `store-screenshots/android-01-home.png` |
| Android upgrade | 완료 | `store-screenshots/android-02-upgrade.png` |
| Android milestone | 완료 | `store-screenshots/android-03-milestone.png` |
| Android prestige ceremony | 완료 | `store-screenshots/android-04-prestige.png` |
| Android reward | 완료 | `store-screenshots/android-05-reward.png` |
| Google Play feature graphic | 완료 후보 | `store-screenshots/google-play-feature-graphic.png` |

## Remaining Visual Risk

RC-19 playability pass 기준 기술적 visual overflow P0/P1, CTA/tab occlusion P1, modal clickability P1, store public copy P1, visible CTA center blocking P0는 Playwright/DOM/screenshot 기준 발견되지 않았다. `RC14_INDEPENDENT_RESCORE.md`는 internal product UI average를 8.1로 기록한다. 남은 P2/P3는 daily reward sheet polish, milestone sticker-board polish, server-verified calendar/push notification, companion room 자유 배치, 더 긴 offline count-up animation, 저장 코드의 본질적 밀도, final commissioned art ownership/legal approval, final adaptive icon foreground/background, feature graphic final approval, 물리 기기 store screenshot 재촬영이다. 실제 Android phone screenshot/video는 아직 없으므로 physical-device UI 판정은 external verification으로 남는다.

## RC-20 Product Reboot Visual Reassessment

사용자가 실제 Android 폰 플레이 후 기존 UI/UX를 만족하지 못한다고 판단했으므로, 이전 "P1 없음" visual 선언은 RC20 제품 만족도 완료 근거로 사용하지 않는다. RC20은 기존 wood/parchment/orange skin을 방어하지 않고, 밝은 귤 정원 중심의 모바일 idle game UI로 핵심 shell/home/growth/reward feedback을 재구성했다.

| Screen | RC20 Result | Evidence |
| --- | --- | --- |
| Home | 큰 카피바라/귤 장면과 `귤 주기` CTA가 첫 시선이 되며, next-action은 한 가지 행동만 제시한다. | `qa-screenshots/360x740-home.png`, `qa-screenshots/390x844-home.png` |
| Growth / quick-buy | 장식 레일이 CTA를 덮던 카드 언어를 줄이고, 성장 선택지, level/effect delta, cost tray, CTA를 분리했다. | `qa-screenshots/360x740-upgrades-quick-buy.png`, `qa-screenshots/390x844-upgrades-quick-buy.png` |
| Reward sheet | daily/reward claim이 toast만으로 끝나지 않고 획득량/다음 보상 sheet로 보인다. | `qa-screenshots/390x844-reward-sheet.png`, `qa-screenshots/390x844-daily-reward-claim.png` |
| Save modal | toast가 modal title/action을 덮지 않도록 suppress되며, export/import controls는 mobile width 안에 유지된다. | `qa-screenshots/390x844-save-modal.png` |
| Settings | toast는 content title을 덮지 않는 compact status로 축소됐다. Save button 위를 잠깐 덮는 것은 P2로 남으며 pointer-events는 없다. | `qa-screenshots/390x844-settings.png` |
| Android-like viewports | 320/360/393/412/430 guard와 Android WebView-like screenshot set을 유지한다. | `qa-screenshots/android-webview-360x800-home.png`, `qa-screenshots/android-webview-360x800-upgrades.png` |

RC20 screenshot regeneration:

```txt
npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
11 passed
```

남은 visual gate는 실제 Android phone screenshot/video다. `device-qa/incoming/`이 비어 있으므로 physical-device visual verdict는 아직 완료로 보지 않는다.
