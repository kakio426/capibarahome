# Visual QA

기준일: 2026-05-05

## Summary

Playwright visual flow captured 52 QA screenshots for 360x740, 390x844, 430x932, and desktop 1280x900 central panel. Store screenshot flow generated 10 promotional candidates under `store-screenshots/`. 이번 pass는 단순 기능 존재가 아니라 교사/학생이 첫 화면과 모달, 상점, 환생, 앨범, 오프라인 보상을 봤을 때 실제 모바일 게임 서비스처럼 느끼는지를 기준으로 확인했다.

Commands:

```txt
npx playwright test e2e/visual-regression.spec.ts --reporter=line
npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line
npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
```

Latest standalone result:

```txt
visual-regression: 4 passed
store-screenshot-pack: 2 passed
combined final-art visual/store check: 6 passed
```

Manual final screenshot spot check:
- `qa-screenshots/390x844-home.png`: 카피바라/귤 정원이 숫자 카드보다 먼저 읽히는 scene 중심 화면으로 확인.
- `qa-screenshots/390x844-collection.png`: companion raster portraits가 sticker room처럼 노출되는 앨범 화면으로 확인.
- `qa-screenshots/390x844-prestige.png`: golden leaf ritual raster scene이 계산 패널보다 먼저 읽히는 환생 화면으로 확인.
- `store-screenshots/iphone-01-home.png`: raster key art full-screen background 위에 gameplay panel/copy가 얹힌 store-facing composition으로 확인.

## Art/UI Fixes From Final Audit

| Issue | Status | Evidence |
| --- | --- | --- |
| CSS가 누적 override처럼 보일 위험 | 해결 | `layout.css` 전면 재정리, runtime visual banned-pattern audit |
| 외부/임시 visual fallback 의존 | 해결 | `builtinAssets.ts`, `scripts/generateVisualAssets.mjs`, 253 SVG auxiliary files, 18 raster PNG files |
| 홈 key visual 부족 | 해결 | `main-hero-background.png`, `main-capybara-character.png`, `qa-screenshots/390x844-home.png` |
| 환생/상점/오프라인 보상이 util 화면처럼 보일 위험 | 해결 | `prestige-ritual.png`, `shop-reward-banner.png`, `offline-reward.png`, refreshed screenshots |
| 홈 카피바라가 보상/CTA보다 약하게 보이는 문제 | 해결 | `.hero-raster-background`, `.hero-raster-character`, `.scene-reward-badge`, refreshed `qa-screenshots/360x740-home.png` |
| reload 직후 오프라인 모달/toast가 탭 클릭을 가로막음 | 해결 | offline min 60s, reward < 1 차단, toast pointer-events none, reload E2E assertion |
| 상점/환생 screenshot에 toast 잔상이 남음 | 해결 | seeded visual flow에서 안정화 대기 후 capture |
| 환생 progress label 대비 부족 | 해결 | `.prestige-card .progress-label` contrast 보강 |
| generated matrix가 비대한 파일 크기를 품질로 오판 | 해결 | SVG 구조/외부 참조/깨진 문자 무결성 기준으로 변경 |
| store 후보가 단순 앱 캡처처럼 보일 위험 | 해결 | iPhone/Android 후보 10장, raster store key visual full-screen background + gameplay panel + copy 구성 |

## Screen-by-Screen Review

| Screen | 첫인상 | 캐릭터성 | 보상감 | placeholder 냄새 | 양산형 앱 UI 냄새 | 모바일 가독성 | 텍스트 잘림 | 버튼 터치성 | 화면 밀도 | 경쟁작 대비 부족한 점 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 홈 | 카피바라/귤/다음 목표가 즉시 보임 | raster orchard와 main capybara character가 중심 | 터치 CTA, scene reward badge, floating text, 목표/컬렉션 shelf | 낮음 | 낮음 | 360/390/430 통과 | 없음 | CTA 44px 이상 | 적정 | final idle animation은 아직 P2 |
| 성장 | 구매 가능/비용/효과가 게임 상점처럼 보임 | 아이템 SVG가 시설 차이를 만듦 | 구매 가능 상태와 효과 meta 확인 | 낮음 | 중간 이하 | 통과 | 없음 | 카드 버튼 안정 | 다소 높지만 스캔 가능 | 장기적으로 quick-buy polish 가능 |
| 앨범 | 캐릭터/장식/업적 분리 | raster companion sticker room과 8 portrait로 구분 | 보상 claim/친밀도/능력 표시 | 낮음 | 낮음 | 1열 companion card로 통과 | 없음 | claim 버튼 안정 | 풍부함 | 방 꾸미기 자유도는 P2 |
| 환생 | 황금잎 보상 축제 톤 | raster ritual scene | 예상 잎/배율/progress가 명확 | 낮음 | 낮음 | 통과 | 없음 | 확인 버튼 안정 | 적정 | 환생 연출 animation은 P2 |
| 상점 | mock임을 유지하면서 게임 상점처럼 구성 | raster reward banner 사용 | 광고 버프/샌드박스 보상 상태 표시 | 낮음 | 낮음 | 통과 | 없음 | 상품 버튼 안정 | 적정 | 실제 SDK 연결 전까지 sandbox |
| 설정/세이브 | 기능적이지만 게임 톤 유지 | 작은 visual asset과 warm panel | export/import/reset 흐름 명확 | 낮음 | 중간 이하 | modal scroll 통과 | 없음 | 위험 행동 확인 | 적정 | native 저장 QA는 실기기 필요 |
| 튜토리얼 | 첫 사용자가 막히지 않음 | highlighted target과 mascot tone | 다음 행동을 짧게 안내 | 낮음 | 낮음 | 360px 통과 | 없음 | 이전/다음/건너뛰기 안정 | 낮음 | 단계별 animation은 P2 |
| 오프라인 보상 | 복귀 보상이 즉시 이해됨 | raster harvest/rest illustration 사용 | claim modal로 보상감 있음 | 낮음 | 낮음 | 통과 | 없음 | 수령 버튼 안정 | 적정 | 장시간 복귀 chest animation은 P2 |

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

현재 화면은 내부 수제 SVG 253개를 보조 icon pack으로 유지하면서, 핵심 감정/캐릭터/스토어 이미지는 18개 raster PNG 후보로 교체한 release candidate 수준이다. 다만 commissioned art 소유권/법무 확정, platform icon/adaptive icon/splash export, 실제 device store screenshot 재촬영은 제출 전 P1 external art readiness로 남긴다.
