# Final Art Audit

기준일: 2026-05-05

## Audit 기준

이번 pass의 기준은 "작동하는 RC UI"가 아니라 "앱스토어에서 보고 설치하고 싶은 모바일 idle game 화면"이다. 이전 SVG 중심 pass는 asset 수량은 늘렸지만 final game art로 보기에는 실패였다. 이번 pass는 핵심 감정/캐릭터/스토어 이미지를 PNG raster asset으로 교체하고, SVG는 보조 icon 역할로 낮춘다.

## Before Raster Pass Screen Audit

| 화면 | 현재 시각 품질 | placeholder 냄새 | generic app UI 냄새 | 게임 화면으로 보이는지 | 경쟁작 대비 부족한 점 | 개선 항목 |
| --- | --- | --- | --- | --- | --- | --- |
| 홈 | 카피바라와 수확 CTA는 보이나 배경/시설이 아직 CSS scene 조각 중심 | 낮음-중간 | 중간 | HUD에 가까움 | 공간감, key visual, 수확 행위의 주인공성 부족 | P1: main hero final key visual을 홈 수확 영역에 연결 |
| 성장/업그레이드 | 구매 정보는 좋지만 카드 목록 인상이 남음 | 낮음 | 중간 | 게임 상점 일부 | 구매 가능 항목의 축제감/티어감 부족 | P1: 구매 가능 카드, tier lane, icon plinth 강화 |
| 앨범/컬렉션 | 8 portrait와 보상 claim은 있으나 섹션이 정보 패널처럼 이어짐 | 낮음 | 중간 | 게임 도감 일부 | 친구/장식/업적의 수집 경험 차이와 stage feel 부족 | P1: raster companion sticker room 연결 |
| 환생 | 황금잎 의미는 보이나 CSS tree 중심 | 중간 | 낮음-중간 | 보상 계산 화면에 가까움 | 의식/축제 key visual과 리셋의 감정 부족 | P1: prestige ritual key visual 연결 |
| 상점 | mock 문구는 안전하지만 banner visual이 부족함 | 낮음 | 중간 | 기능 상점에 가까움 | 광고 보상/패키지 보상의 설득력 있는 visual 부족 | P1: shop reward banner 연결 |
| 설정/세이브 | 기능적으로 안정적 | 낮음 | 중간 | 게임 톤 유지 | export/import code가 여전히 util modal 중심 | P2: code box 가독성/게임 톤 polish |
| 오프라인 보상 | 귤 바구니 icon과 작은 과일 파티클로 이해 가능 | 중간 | 낮음 | 보상 modal 일부 | 복귀 보상 chest/수확 scene 감정 부족 | P1: offline return illustration 연결 |
| 스토어 스크린샷 | 카피는 있으나 앱 캡처형 구도와 큰 빈 여백이 남음 | 낮음 | 중간 | store 후보이나 final marketing key visual 부족 | 캐릭터/key visual과 화면의 결합이 약함 | P1: final key visual/frame overlay로 10장 재생성 |

## After Raster Pass Screen Audit

| 화면 | 변경 결과 | 판정 | 남은 리스크 |
| --- | --- | --- | --- |
| 홈 | raster orchard background와 transparent main capybara character가 hero 영역의 중심이 되도록 재구성했다. 숫자는 scene overlay/HUD로 낮췄다. | 내부 P1 해결 | idle animation depth는 P2 |
| 앨범/컬렉션 | companion portrait PNG를 sticker room과 companion card에 연결해 list/grid 인상을 낮췄다. | 내부 P1 해결 | 자유 배치형 room decorating은 P2 |
| 환생 | golden leaf ritual PNG가 상단 key scene이 되고 계산 정보는 의사결정 패널로 내려갔다. | 내부 P1 해결 | ritual animation은 P2 |
| 상점 | reward banner PNG와 offer shelf 구성을 연결했고 실제 결제로 오해될 문구는 피했다. | 내부 P1 해결 | 실제 SDK 연결 전까지 sandbox |
| 오프라인 보상 | harvest/rest PNG가 modal 상단을 차지해 복귀 보상감이 명확해졌다. | 내부 P1 해결 | long-return chest animation은 P2 |
| 스토어 스크린샷 | raster store key visual을 full-screen background로 쓰고 gameplay panel/copy를 얹어 10장을 재생성했다. | 내부 P1 해결 | 실제 device/simulator frame 재촬영은 P1 external readiness |

## Raster Replacement Result

| 요구 항목 | Raster asset | 실제 연결 |
| --- | --- | --- |
| main hero background | `src/assets/raster/home/main-hero-background.png` | `MainGameScreen.tsx`, `.hero-raster-background` |
| main capybara character | `src/assets/raster/home/main-capybara-character.png` | `MainGameScreen.tsx`, `.hero-raster-character` |
| 8 companion portraits | `src/assets/raster/companions/capybara-*.png` | `CollectionScreen.tsx`, `.companion-portrait`, `.album-sticker` |
| prestige ritual illustration | `src/assets/raster/release/prestige-ritual.png` | `PrestigePanel.tsx`, `.prestige-visual` |
| shop reward banner | `src/assets/raster/release/shop-reward-banner.png` | `MonetizationPanel.tsx`, `.shop-banner-visual` |
| offline reward illustration | `src/assets/raster/release/offline-reward.png` | `AppShell.tsx`, offline reward modal |
| store key visual | `src/assets/raster/release/store-key-visual.png` | `e2e/store-screenshot-pack.spec.ts` |
| app icon candidate | `src/assets/raster/release/app-icon-candidate.png` | `RasterAssetRegistry`, release candidate asset |

## Dirty Screenshot 판단

시작 시 `qa-screenshots/*home*`, `qa-screenshots/*save-modal*`, `store-screenshots/*01-home*`, `store-screenshots/*05-save*` 16개 PNG가 dirty였다. 이는 이전 E2E screenshot run의 미세한 raster output 차이였고, 이번 pass에서 visual/store screenshot을 다시 생성해 보존했다.

## Previous SVG Pass Result

| 개선 항목 | 연결 asset/code | 검증 |
| --- | --- | --- |
| Home final key visual | `release/main-hero-final.svg`, `MainGameScreen.tsx`, `.hero-final-art` | 실패 판단: 수제 벡터 프로토타입 인상 |
| Prestige ritual visual | `release/prestige-ritual-final.svg`, `PrestigePanel.tsx` | 실패 판단: 계산 패널 인상이 더 강함 |
| Shop reward banner | `release/shop-reward-banner-final.svg`, `MonetizationPanel.tsx` | 실패 판단: game shop banner로 부족 |
| Offline reward illustration | `release/offline-return-final.svg`, `AppShell.tsx` | 실패 판단: 복귀 보상감 부족 |
| Store key visual/frame candidates | `release/store-key-visual-final.svg`, `app-icon-final.svg`, `splash-final.svg`, `store-screenshot-frame-final.svg` | 실패 판단: 앱 캡처 포장에 가까움 |
| Visual regression evidence | `e2e/visual-regression.spec.ts` | 52 QA screenshots, overflow assertions |
| Store screenshot evidence | `e2e/store-screenshot-pack.spec.ts` | 이후 raster key art + gameplay composition으로 재생성 |

## Before Evidence

- Home before: `qa-screenshots/390x844-home.png`
- Upgrade before: `qa-screenshots/390x844-upgrades.png`
- Prestige before: `qa-screenshots/390x844-prestige.png`
- Shop before: `qa-screenshots/390x844-shop.png`
- Save before: `qa-screenshots/390x844-save-modal.png`
- Store before: `store-screenshots/iphone-01-home.png`

## After Evidence

| 항목 | 상태 | 경로 |
| --- | --- | --- |
| Home after | 완료 | `qa-screenshots/390x844-home.png`, `qa-screenshots/360x740-home.png` |
| Upgrade after | 완료 | `qa-screenshots/390x844-upgrades.png`, `qa-screenshots/360x740-upgrades.png` |
| Prestige after | 완료 | `qa-screenshots/390x844-prestige.png`, `qa-screenshots/360x740-prestige.png` |
| Shop after | 완료 | `qa-screenshots/390x844-shop.png`, `qa-screenshots/360x740-shop.png` |
| Offline reward after | 완료 | `qa-screenshots/390x844-offline-reward.png`, `qa-screenshots/360x740-offline-reward.png` |
| Save modal after | 완료 | `qa-screenshots/390x844-save-modal.png`, `qa-screenshots/360x740-save-modal.png` |
| Store after | 완료 | `store-screenshots/iphone-01-home.png`, `store-screenshots/android-01-home.png` |

Latest validation:

```txt
npx playwright test e2e/visual-regression.spec.ts --reporter=line
4 passed

npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line
2 passed
```

## Final Judgment

SVG-only final art 선언은 폐기한다. 현재 후보는 generated raster art를 실제 UI에 연결한 release-candidate art pass다. 실제 스토어 제출 전 commissioned art 소유권/법무 확정, 플랫폼별 icon/splash export, 물리 기기 store screenshot 재촬영은 P1 external art readiness로 남긴다.
