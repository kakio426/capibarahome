# Visual QA

기준일: 2026-05-06

## Summary

이번 visual gate는 PNG 파일 존재가 아니라 390x844 첫 화면이 실제 모바일 idle game처럼 보이는지를 기준으로 다시 봤다. 이전 raster pass는 핵심 이미지를 넣었어도 흰 둥근 카드와 웹앱 패널 언어가 화면을 지배해 실패로 재분류했다. v2 pass에서는 핵심 raster illustration을 교체하고 `layout.css`를 나무/귤/잎/집사 도구 테마의 game HUD skin으로 다시 정리했다.

Current evidence:

```txt
npx playwright test e2e/visual-regression.spec.ts --reporter=line
4 passed, 52 screenshots regenerated

npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line
2 passed, 10 store screenshots regenerated
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
| UI skin | 실패. 카드/패널/버튼이 generic app 느낌 | 통과. wood/parchment/orange lacquer HUD로 교체 | `src/ui/styles/layout.css` |
| Store screenshot | 부분 실패. 앱 캡처 포장 느낌이 강함 | 통과. key visual background + gameplay panel + store copy 구성 | `store-screenshots/iphone-01-home.png` |
| 설정/저장 util 냄새 | 부분 실패 | 부분 통과. 게임 skin은 적용됐지만 긴 코드 box 자체는 기능형 UI라 P3 polish로 남김 | `qa-screenshots/390x844-save-modal.png` |

## Screen-by-Screen Review

| Screen | v2 판정 | 확인 내용 | 경쟁작 대비 남은 부족점 |
| --- | --- | --- | --- |
| 홈 | 완료 | 카피바라와 귤 정원이 숫자보다 먼저 보이고, tap CTA/재화 HUD/하단 탭이 같은 wood HUD skin으로 통일됨 | Cats & Soup 같은 hand-drawn idle animation depth는 P2 |
| 성장 | 완료 | spreadsheet형 white list에서 parchment/wood tool card로 이동. 구매 가능/불가능, 비용, 효과가 즉시 구분됨 | Egg, Inc.식 quick-buy 반복 조작 최적화는 P2 |
| 앨범 | 완료 | v2 companion portrait 8종과 orchard room background가 보이고, 카드도 game shelf 톤으로 정리됨 | 방 꾸미기 자유 배치와 staged reveal은 P2 |
| 환생 | 완료 | golden leaf ritual raster scene이 계산보다 먼저 보임. 예상 보상/진행률/확인 flow가 명확함 | ritual animation과 reset ceremony는 P2 |
| 상점 | 완료 | reward banner가 mock shop을 게임 상점처럼 잡아주고, 실제 결제 오해 문구는 없음 | 실제 광고/IAP SDK 연결 전까지 sandbox |
| 오프라인 보상 | 완료 | harvest/rest raster illustration과 보상 숫자가 모달 첫 시선으로 들어옴 | 장시간 복귀 chest opening animation은 P2 |
| 설정/저장 | 완료 | tab/modal/textarea가 모바일에서 잘리지 않고 export/import 사용법이 보임 | native save/restore와 final code panel polish는 P3 |
| 튜토리얼 | 완료 | 첫 사용자가 터치/성장/보상 흐름을 막히지 않고 볼 수 있음 | 단계별 mascot animation은 P3 |

## RC-4 Interaction Polish

| 대상 | 이전 잔여 문제 | RC-4 조치 | Evidence |
| --- | --- | --- | --- |
| 설정 토글 | 브라우저 checkbox처럼 보여 game HUD skin과 충돌 | carved rectangular switch, ON/OFF label, wood/orange thumb으로 교체 | `src/ui/components/Toggle.tsx`, `qa-screenshots/390x844-settings.png` |
| Toast | settings screenshot에서 screen header를 덮어 정보 위계가 깨짐 | `data-toast-visible` content offset과 carved toast banner 적용 | `AppShell.tsx`, `qa-screenshots/390x844-settings.png` |
| 세이브 modal | export/import code box가 기능형 form처럼 보이고 복사 action이 없음 | parchment ledger textarea와 `Export 코드 복사` action 추가 | `SaveImportExportModal.tsx`, `qa-screenshots/390x844-save-modal.png` |
| Modal close/action | 기본 util dialog 느낌 일부 잔존 | close button, disabled button, modal frame shadow를 wood HUD로 보강 | `layout.css`, `qa-screenshots/390x844-save-modal.png`, `qa-screenshots/390x844-offline-reward.png` |
| 업그레이드/카드/탭바 | v2 pass에서 해결됐지만 RC-4 회귀 확인 필요 | visual-regression 4 viewport 재생성 후 수동 확인 | `qa-screenshots/390x844-upgrades.png`, `qa-screenshots/390x844-settings.png` |

## Manual Spot Check

- `qa-screenshots/390x844-home.png`: 첫인상은 웹 대시보드가 아니라 모바일 게임 home scene이다. 큰 흰 카드가 주인공이 되지 않는다.
- `qa-screenshots/390x844-upgrades.png`: 아직 목록 구조지만 parchment/wood skin, icon plinth, orange CTA가 적용되어 개발자 UI 냄새는 P0가 아니다.
- `qa-screenshots/390x844-collection.png`: portrait sticker room과 companion card가 보이며, 캐릭터 구분력이 이전보다 확실하다.
- `qa-screenshots/390x844-prestige.png`: golden leaf ritual art가 화면 성격을 결정한다.
- `qa-screenshots/390x844-shop.png`: reward banner와 상품 shelf가 mock provider 화면을 서비스 화면으로 보이게 한다.
- `qa-screenshots/390x844-settings.png`: browser checkbox가 사라지고 custom ON/OFF switch가 적용됐으며 toast가 제목을 가리지 않는다.
- `qa-screenshots/390x844-save-modal.png`: export code copy action과 ledger textarea가 추가되어 실제 복구 사용성이 좋아졌다.
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

내부 P0/P1 visual blocker는 현재 없음으로 본다. 남은 항목은 final commissioned art ownership/legal approval, 실제 app icon/adaptive icon/splash export, 물리 기기 store screenshot 재촬영, 더 깊은 idle animation/chest reveal처럼 제출 전 또는 출시 후 polish에 해당한다.
