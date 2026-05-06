# Visual QA

기준일: 2026-05-06

## Summary

이번 visual gate는 PNG 파일 존재가 아니라 390x844 첫 화면과 정보형 화면이 실제 모바일 idle game처럼 보이는지를 기준으로 다시 봤다. 이전 raster pass는 핵심 이미지를 넣었어도 흰 둥근 카드와 웹앱 패널 언어가 화면을 지배해 실패로 재분류했다. v2 pass에서는 핵심 raster illustration을 교체했고, 이번 RC-4 hardening pass에서는 성장/설정/세이브/앨범 하단 정보 UI까지 wood/parchment/orange game HUD skin으로 묶었다.

Current evidence:

```txt
npx playwright test e2e/visual-regression.spec.ts --reporter=line
4 passed, 52 screenshots regenerated

npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line
2 passed, 10 store screenshots regenerated

npm run test:e2e
21 passed, includes visual/store screenshot regeneration
```

Current asset baseline:

```txt
src/assets/raster: 15 PNG files / 19M
src/assets/generated: 253 SVG auxiliary files
qa-screenshots: 88 PNG files including archived before shots
store-screenshots: 10 PNG candidates
```

## Before/After Judgment

| Gate | 이전 raster pass 판정 | v2 pass 판정 | 근거 |
| --- | --- | --- | --- |
| 390x844 home first impression | 실패. 핵심 이미지는 있었지만 흰 카드형 웹앱 UI가 먼저 보임 | 통과. 통합 orchard raster scene, carved header, wood tab dock, dark currency plaques가 먼저 읽힘 | `qa-screenshots/390x844-home.png` |
| Core art quality | 실패. 일부 화면이 CSS/SVG/flat-vector 보조물처럼 보임 | 통과. home/prestige/shop/offline/store/companion에 professional raster 후보 연결 | `src/assets/raster/**/*.png`, `rasterAssetIntegrity.test.ts` |
| UI skin | 실패. 카드/패널/버튼이 generic app 느낌 | 통과. wood/parchment/orange lacquer HUD로 교체하고 upgrade shelf, ledger settings, save vault까지 확장 | `src/ui/styles/layout.css`, `RC4_UI_SKIN_AUDIT.md` |
| Store screenshot | 부분 실패. 앱 캡처 포장 느낌이 강함 | 통과. key visual background + gameplay panel + store copy 구성 | `store-screenshots/iphone-01-home.png` |
| 설정/저장 util 냄새 | 부분 실패 | 통과. 설정은 집사 장부/서랍, 저장은 보관함 봉인 코드와 금고 modal로 재스킨. 긴 export code 자체는 기능상 남는 P3 | `qa-screenshots/390x844-settings.png`, `qa-screenshots/390x844-save-modal.png` |

## Screen-by-Screen Review

| Screen | v2 판정 | 확인 내용 | 경쟁작 대비 남은 부족점 |
| --- | --- | --- | --- |
| 홈 | 완료 | 카피바라와 귤 정원이 숫자보다 먼저 보이고, tap CTA/재화 HUD/하단 탭이 같은 wood HUD skin으로 통일됨 | Cats & Soup 같은 hand-drawn idle animation depth는 P2 |
| 성장 | 완료 | 카드 리스트에서 garden workbench / facility shelf 구조로 이동. 왼쪽 tool slot, shelf rail, cost plaque, 구매 버튼, 레벨/효과 plaque가 게임 재료처럼 읽힘 | Egg, Inc.식 quick-buy 반복 조작 최적화는 P2 |
| 앨범 | 완료 | v2 companion portrait 8종과 orchard room background가 보이고, 카드도 game shelf 톤으로 정리됨 | 방 꾸미기 자유 배치와 staged reveal은 P2 |
| 환생 | 완료 | golden leaf ritual raster scene이 계산보다 먼저 보임. 예상 보상/진행률/확인 flow가 명확함 | ritual animation과 reset ceremony는 P2 |
| 상점 | 완료 | reward banner가 mock shop을 게임 상점처럼 잡아주고, 실제 결제 오해 문구는 없음 | 실제 광고/IAP SDK 연결 전까지 sandbox |
| 오프라인 보상 | 완료 | harvest/rest raster illustration과 보상 숫자가 모달 첫 시선으로 들어옴 | 장시간 복귀 chest opening animation은 P2 |
| 설정/저장 | 완료 | 설정은 집사 장부/정원 관리 서랍, 세이브는 보관함/봉인 코드/금고 modal로 보이며 모바일에서 잘리지 않음 | native save/restore와 export code 길이 자체의 시각 부담은 P3 |
| 튜토리얼 | 완료 | 첫 사용자가 터치/성장/보상 흐름을 막히지 않고 볼 수 있음 | 단계별 mascot animation은 P3 |

## RC-4 Interaction Polish

| 대상 | 이전 잔여 문제 | RC-4 조치 | Evidence |
| --- | --- | --- | --- |
| 성장/업그레이드 | 카드 리스트/스프레드시트처럼 읽힘 | garden workbench shelf, tool slot, shelf rail, cost plaque, short hierarchy 적용 | `UpgradePanel.tsx`, `qa-screenshots/390x844-upgrades.png` |
| 설정 토글 | 브라우저 checkbox처럼 보여 game HUD skin과 충돌 | carved rectangular switch, ON/OFF label, wood/orange thumb으로 교체 | `src/ui/components/Toggle.tsx`, `qa-screenshots/390x844-settings.png` |
| Toast | settings screenshot에서 screen header를 덮어 정보 위계가 깨짐 | `data-toast-visible` content offset과 carved toast banner 적용 | `AppShell.tsx`, `qa-screenshots/390x844-settings.png` |
| 세이브 modal | export/import code box가 기능형 form처럼 보이고 복사 action이 없음 | save vault frame, sealed code row, parchment textarea와 `Export 코드 복사` action 추가 | `SaveImportExportModal.tsx`, `qa-screenshots/390x844-save-modal.png` |
| Modal close/action | 기본 util dialog 느낌 일부 잔존 | close button, disabled button, modal frame shadow를 wood HUD로 보강 | `layout.css`, `qa-screenshots/390x844-save-modal.png`, `qa-screenshots/390x844-offline-reward.png` |
| 앨범 하단 지표/progress | metric grid/progress bar가 generic control처럼 남음 | sticker-book ledger stamp와 carved groove progress로 보강 | `qa-screenshots/390x844-collection.png` |
| Interaction feedback | 구매/오류/환생/tabs feedback이 정적임 | purchase pulse, error toast shake, prestige ready glow, tab active pop 추가. effects off/reduced motion 존중 | `AppShell.tsx`, `layout.css` |

## Manual Spot Check

- `qa-screenshots/390x844-home.png`: 첫인상은 웹 대시보드가 아니라 모바일 게임 home scene이다. 큰 흰 카드가 주인공이 되지 않는다.
- `qa-screenshots/390x844-upgrades.png`: 일반 rounded card list가 아니라 작업대 선반, tool slot, cost plaque, 구매/대기 버튼으로 읽힌다. 내부 P1은 해소됐다.
- `qa-screenshots/390x844-collection.png`: portrait sticker room과 companion card가 보이며, score grid/progress도 sticker ledger/groove 방향으로 보정됐다.
- `qa-screenshots/390x844-prestige.png`: golden leaf ritual art가 화면 성격을 결정한다.
- `qa-screenshots/390x844-shop.png`: reward banner와 상품 shelf가 mock provider 화면을 서비스 화면으로 보이게 한다.
- `qa-screenshots/390x844-settings.png`: browser checkbox가 사라지고 custom ON/OFF switch가 적용됐으며 toast가 제목을 가리지 않는다.
- `qa-screenshots/390x844-save-modal.png`: export code copy action, sealed code row, vault frame이 적용되어 util dialog 냄새가 줄었고 실제 복구 사용성도 유지된다.
- `store-screenshots/iphone-01-home.png`: store-facing key art와 gameplay panel이 함께 보여 단순 앱 캡처 수준에서 벗어났다.

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
| Upgrade cards | `qa-screenshots/390x844-upgrades.png` |
| Album / quest / collection | `qa-screenshots/390x844-collection.png` |
| Album companion abilities | `qa-screenshots/390x844-collection-abilities.png` |
| Album achievement rewards | `qa-screenshots/390x844-collection-rewards.png` |
| Prestige | `qa-screenshots/390x844-prestige.png` |
| Shop | `qa-screenshots/390x844-shop.png`, `qa-screenshots/360x740-shop.png` |
| Offline reward modal | `qa-screenshots/390x844-offline-reward.png`, `qa-screenshots/360x740-offline-reward.png` |
| Settings | `qa-screenshots/390x844-settings.png` |
| Save import/export modal | `qa-screenshots/390x844-save-modal.png`, `qa-screenshots/360x740-save-modal.png` |

## Store Screenshot Candidates

| Candidate | Status | Evidence |
| --- | --- | --- |
| iPhone home | 완료 | `store-screenshots/iphone-01-home.png` |
| iPhone album | 완료 | `store-screenshots/iphone-02-album.png` |
| iPhone prestige | 완료 | `store-screenshots/iphone-03-prestige.png` |
| iPhone shop | 완료 | `store-screenshots/iphone-04-shop.png` |
| iPhone save/settings | 완료 | `store-screenshots/iphone-05-save.png` |
| Android home | 완료 | `store-screenshots/android-01-home.png` |
| Android album | 완료 | `store-screenshots/android-02-album.png` |
| Android prestige | 완료 | `store-screenshots/android-03-prestige.png` |
| Android shop | 완료 | `store-screenshots/android-04-shop.png` |
| Android save/settings | 완료 | `store-screenshots/android-05-save.png` |

## Remaining Visual Risk

내부 P0/P1 visual blocker는 현재 없음으로 본다. 남은 항목은 P2/P3로 분리한다: companion list의 더 깊은 sticker-book reveal, Egg, Inc.식 quick-buy 반복 조작, chest opening/offline reward animation, final commissioned art ownership/legal approval, 실제 app icon/adaptive icon/splash export, 물리 기기 store screenshot 재촬영.
