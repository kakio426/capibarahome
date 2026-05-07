# Visual QA

기준일: 2026-05-07

## Summary

이번 visual gate는 PNG 파일 존재가 아니라 390x844 첫 화면과 정보형 화면이 실제 모바일 idle game처럼 보이는지를 기준으로 다시 봤다. 이전 raster pass는 핵심 이미지를 넣었어도 흰 둥근 카드와 웹앱 패널 언어가 화면을 지배해 실패로 재분류했다. v2 pass에서는 핵심 raster illustration을 교체했고, RC-4 hardening pass에서는 성장/설정/세이브/앨범 하단 정보 UI까지 wood/parchment/orange game HUD skin으로 묶었다. RC-5에서는 이 방향을 유지하면서 `layout.css` 후반 override 의존을 분리하고 reusable `.ui-*` game skin system으로 안정화했다. RC-6에서는 quick-buy, reward reveal, prestige result, album claim reveal을 추가했고, RC-7에서는 daily reward, D1/D3/D7 badge ledger, post-prestige goal chain을 같은 HUD skin 안에 넣었다. RC-8에서는 safe-area/360px modal/device-readiness regression을 추가 점검했다. RC-9 독립 감사에서는 product-quality P1이 남아 release candidate no-go로 재분류했고, RC-10 구현 후 integrity pass에서 기존 8.2 self-score를 독립 재검토해 combined 7.7로 보정했다. 현재 RC-10은 방향은 개선됐지만 product release candidate gate는 no-go다.

Current evidence:

```txt
npx playwright test e2e/visual-regression.spec.ts --reporter=line
4 passed, 88 QA screenshots regenerated

npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line
2 passed, 10 store screenshots regenerated

npm run test:e2e
32 passed, includes visual/store screenshot regeneration and RC-8 release bug bash flow
```

Current asset baseline:

```txt
src/assets/raster: 15 PNG files / 19M
runtime dist PNG assets: 12 files / 14M
src/assets/generated: 253 SVG auxiliary files
qa-screenshots: 88 current PNG files plus archived before shots
store-screenshots: 10 PNG candidates
```

## Before/After Judgment

| Gate | 이전 raster pass 판정 | v2 pass 판정 | 근거 |
| --- | --- | --- | --- |
| 390x844 home first impression | 실패. 핵심 이미지는 있었지만 흰 카드형 웹앱 UI가 먼저 보임 | 통과. 통합 orchard raster scene, carved header, wood tab dock, dark currency plaques가 먼저 읽힘 | `qa-screenshots/390x844-home.png` |
| Core art quality | 실패. 일부 화면이 CSS/SVG/flat-vector 보조물처럼 보임 | 통과. home/prestige/shop/offline/store/companion에 professional raster 후보 연결 | `src/assets/raster/**/*.png`, `rasterAssetIntegrity.test.ts` |
| UI skin | 실패. 카드/패널/버튼이 generic app 느낌 | 통과. wood/parchment/orange lacquer HUD로 교체하고 upgrade shelf, ledger settings, save vault까지 확장. RC-5에서 CSS를 `shell/hud/screens/effects`로 분리하고 `.ui-*` skin classes를 적용 | `src/ui/styles/layout.css`, `src/ui/styles/shell.css`, `src/ui/styles/hud.css`, `src/ui/styles/screens.css`, `RC4_UI_SKIN_AUDIT.md`, `RC5_CSS_COMPONENT_AUDIT.md` |
| Store screenshot | 부분 실패. 앱 캡처 포장 느낌이 강함 | 부분 통과. key visual background + gameplay panel + store copy 구성은 좋아졌지만 gameplay panel이 작고 약한 화면이 남음 | `store-screenshots/iphone-01-home.png`, `RC10_INDEPENDENT_RESCORE.md` |
| 설정/저장 util 냄새 | 부분 실패 | 통과. 설정은 집사 장부/서랍, 저장은 보관함 봉인 코드와 금고 modal로 재스킨. 긴 export code 자체는 기능상 남는 P3 | `qa-screenshots/390x844-settings.png`, `qa-screenshots/390x844-save-modal.png` |

## Screen-by-Screen Review

| Screen | v2 판정 | 확인 내용 | 경쟁작 대비 남은 부족점 |
| --- | --- | --- | --- |
| 홈 | 완료 | 카피바라와 귤 정원이 숫자보다 먼저 보이고, tap CTA/재화 HUD/하단 탭이 같은 wood HUD skin으로 통일됨 | Cats & Soup 같은 hand-drawn idle animation depth는 P2 |
| 성장 | 부분 완료 | RC-10에서 quick-buy를 carved mode stones로 바꾸고, selected depth/aria state, tool pedestal, cost/CTA hierarchy를 재조정했다. 일반 카드 리스트보다 garden workbench / facility shelf로 읽히지만 360/390 screenshot 기준 긴 정보 카드와 CTA/tab 밀도 문제가 남아 8.0 gate를 넘지 못했다 | upgrade shelf/product gate P1 |
| 앨범 | 완료 | v2 companion portrait 8종과 orchard room background가 보이고, 카드도 game shelf 톤으로 정리됨. RC-6 claim reveal banner로 보상 순간이 강화됨 | 방 꾸미기 자유 배치는 P3 |
| 환생 | 완료 | golden leaf ritual raster scene이 계산보다 먼저 보임. RC-10 result ceremony는 ritual art crop, 획득 잎, 보유량, 배율 before/after, 다음 목표를 하나의 보상 순간으로 묶었다 | full ritual animation은 P3 |
| 상점 | 완료 | reward banner가 mock shop을 게임 상점처럼 잡아주고, 실제 결제 오해 문구는 없음 | 실제 광고/IAP SDK 연결 전까지 sandbox |
| 오프라인 보상 | 완료 | harvest/rest raster illustration과 보상 숫자가 모달 첫 시선으로 들어옴. RC-6 basket/chest reveal cue와 reward count plaque 추가 | 장시간 복귀 count-up numeric animation은 P3 |
| 설정/저장 | 완료 | 설정은 집사 장부/정원 관리 서랍, 세이브는 보관함/봉인 코드/금고 modal로 보이며 모바일에서 잘리지 않음 | native save/restore와 export code 길이 자체의 시각 부담은 P3 |
| 튜토리얼 | 완료 | 첫 사용자가 터치/성장/보상 흐름을 막히지 않고 볼 수 있음 | 단계별 mascot animation은 P3 |
| 리텐션 | 부분 완료 | RC-10에서 홈 daily badge와 dedicated reward sheet, D1/D3/D7 stamp board, milestone reward sheet를 추가해 toast/card 수준에서 보상 순간으로 격상했다. 독립 재점수에서는 daily 7.9, milestone 7.8로 8.0 gate 미만이다 | 서버 검증 calendar/push notification은 P2 external, reward moment/sticker board polish는 P2 |

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

## Manual Spot Check

- `qa-screenshots/390x844-home.png`: 첫인상은 웹 대시보드가 아니라 모바일 게임 home scene이다. 큰 흰 카드가 주인공이 되지 않는다.
- `qa-screenshots/390x844-upgrades.png`: 일반 rounded card list보다는 작업대 선반, tool slot, cost plaque, 구매/대기 버튼으로 읽힌다. 다만 quick-buy 상태의 독립 재점수는 7.2로, 긴 정보 카드와 모바일 CTA 밀도 때문에 product-quality P1이 남는다.
- `qa-screenshots/390x844-collection.png`: portrait sticker room과 companion card가 보이며, score grid/progress도 sticker ledger/groove 방향으로 보정됐다.
- `qa-screenshots/390x844-prestige.png`: golden leaf ritual art가 화면 성격을 결정한다.
- `qa-screenshots/390x844-shop.png`: reward banner와 상품 shelf가 개발자용 제어판이 아니라 게임 상점 화면으로 보이게 한다.
- `qa-screenshots/390x844-settings.png`: browser checkbox가 사라지고 custom ON/OFF switch가 적용됐으며 toast가 제목을 가리지 않는다.
- `qa-screenshots/390x844-save-modal.png`: export code copy action, sealed code row, vault frame이 적용되어 util dialog 냄새가 줄었고 실제 복구 사용성도 유지된다.
- `store-screenshots/iphone-01-home.png`: store-facing key art와 gameplay panel이 함께 보여 단순 앱 캡처 수준에서는 벗어났다. 그러나 store pack 전체는 gameplay panel scale/framing이 약해 보정 점수 7.5로 남는다.

## Viewports

| Viewport | Status | Evidence |
| --- | --- | --- |
| 360x740 | 완료 | `qa-screenshots/360x740-*.png` |
| 390x844 | 완료 | `qa-screenshots/390x844-*.png` |
| 430x932 | 완료 | `qa-screenshots/430x932-*.png` |
| Desktop 1280x900 central panel | 완료 | `qa-screenshots/desktop-1280x900-*.png` |

## Screenshot Evidence

| Screen | Screenshot Examples |
| --- | --- |
| Home + tutorial | `qa-screenshots/390x844-home-tutorial.png` |
| Home after tutorial | `qa-screenshots/390x844-home.png`, `qa-screenshots/360x740-home.png` |
| Home progression/collection | `qa-screenshots/390x844-home-progression.png` |
| Home daily reward available/cooldown | `qa-screenshots/390x844-home-daily-available.png`, `qa-screenshots/390x844-home-daily-cooldown.png` |
| Daily reward claim | `qa-screenshots/390x844-daily-reward-claim.png` |
| Home post-prestige goal | `qa-screenshots/390x844-home-post-prestige-goal.png` |
| Upgrade cards | `qa-screenshots/390x844-upgrades.png` |
| Quick-buy mode | `qa-screenshots/390x844-upgrades-quick-buy.png` |
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

## Remaining Visual Risk

RC-10 integrity pass 기준으로 기술적 visual overflow P0/P1은 없지만, product-quality visual P1은 남아 있다. `RC10_INDEPENDENT_RESCORE.md`가 previous 8.2 self-score를 combined 7.7로 보정했으며, upgrade quick-buy는 7.2, store screenshots는 7.5다. 따라서 현재 상태를 product release candidate로 부르지 않는다. 남은 P1은 upgrade shelf/quick-buy와 store screenshot framing이고, 남은 P2/P3는 daily reward sheet polish, milestone sticker-board polish, server-verified calendar/push notification, companion room 자유 배치, 더 긴 offline count-up animation, export/import code의 본질적 밀도, final commissioned art ownership/legal approval, 실제 app icon/adaptive icon/splash export, 물리 기기 store screenshot 재촬영이다.
