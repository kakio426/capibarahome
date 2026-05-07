# Asset Production Brief

기준일: 2026-05-05

## 제작 방식

현재 RC asset pack은 외부 CDN, 상용 아이콘팩, 경쟁작 이미지, 스톡 이미지를 쓰지 않는다. 보조 아이콘/아이템은 `scripts/generateVisualAssets.mjs`가 게임 config와 직접 작성한 SVG drawing helper를 기반으로 생성한다. 핵심 감정/캐릭터/스토어 이미지는 built-in image generation으로 만든 PNG를 후처리해 `src/assets/raster/`에 두고, `RasterAssetRegistry`와 `RasterAssetImage`로 실제 UI에 연결한다.

이전 SVG 중심 final art pass와 첫 raster pass는 실패로 재분류했다. 첫 raster pass는 PNG가 있어도 흰 둥근 카드와 웹앱 패널이 화면을 지배했다. SVG는 currency, tab, upgrade, badge, decoration 같은 보조 visual 역할로 낮추고, 홈/앨범/환생/상점/오프라인/스토어의 주인공 이미지는 v2 raster 후보와 game HUD skin으로 처리한다.

## 총량

| 범주 | 수량 | 경로 |
| --- | ---: | --- |
| Icons | 61 | `src/assets/generated/icons/*.svg` |
| Items | 158 | `src/assets/generated/items/*.svg` |
| Mascots | 5 | `src/assets/generated/mascots/*.svg` |
| Portraits | 8 | `src/assets/generated/portraits/*.svg` |
| Release/final candidates | 16 | `src/assets/generated/release/*.svg` |
| Tier backgrounds | 5 | `src/assets/generated/tiers/*.svg` |
| Total SVG files | 253 | `src/assets/generated/` |
| Raster PNG files | 15 | `src/assets/raster/**/*.png` |

## 필수 Asset Mapping

| 요구 asset | 현재 산출물 | 크기/용도 |
| --- | --- | --- |
| 메인 hero background | `src/assets/raster/home/main-hero-background.png` | 홈 수확 scene |
| 메인 카피바라 crop candidate | `src/assets/raster/home/main-capybara-character.png` | app icon/fallback candidate. 홈 v2는 integrated hero scene을 우선 사용 |
| mascot 기본 | `mascots/mascot-default.svg` | 평상시 홈 |
| mascot 기쁨 | `mascots/mascot-happy.svg` | 구매/보상 반응 |
| mascot 졸림 | `mascots/mascot-sleepy.svg` | idle 상태 |
| mascot 귤 먹기 | `mascots/mascot-eating.svg` | 수확/tap 반응 |
| mascot 환생 축하 | `mascots/mascot-celebrate.svg` | 환생/큰 보상 |
| 귤 currency icon | `icons/orange.svg` | HUD, 보상, cost |
| 황금 나뭇잎 currency icon | `icons/leaf.svg` | 환생, 영구 재화 |
| 카피바라 portrait 8종 | `src/assets/raster/companions/capybara-{id}.png` | 앨범 sticker/동료 카드 |
| 성장 구간 배경 5종 | `tiers/tier-yard.svg`, `tier-storehouse.svg`, `tier-onsen.svg`, `tier-bamboo_garden.svg`, `tier-golden_forest.svg` | 홈/진행 구간 visual |
| 업그레이드/시설 30종 | `items/{upgradeId}.svg`, `icons/{iconKey}.svg` | 성장 탭, 구매 카드 |
| 퀘스트/업적 badge set | `items/{questId}.svg`, `items/{achievementId}.svg`, 관련 `icons/*.svg` | 앨범, 보상 수령 |
| 장식 25종 | `items/{decorationId}.svg`, 관련 `icons/*.svg` | 앨범, 홈 장식 |
| 환생 ritual visual | `src/assets/raster/release/prestige-ritual.png` | 환생 화면 key visual |
| 상점 reward banner | `src/assets/raster/release/shop-reward-banner.png` | 상점 상단 festival banner |
| 오프라인 복귀 visual | `src/assets/raster/release/offline-reward.png` | 오프라인 보상 modal |
| Store key visual | `src/assets/raster/release/store-key-visual.png` | store screenshot hero background |
| 앱 아이콘 | `src/assets/raster/release/app-icon-candidate.png`, 보조 SVG draft files | 제출 전 PNG/adaptive icon export 필요 |
| Splash | `release/splash-final.svg`, `release/splash-rc2.svg`, `release/splash-draft.svg` | 제출 전 플랫폼별 export 필요 |
| Store frame | `release/store-screenshot-frame-final.svg`, `release/store-screenshot-frame-rc2.svg`, `release/qa-screenshot-frame.svg` | store 후보/QA 보조 frame |

## Registry/Test Contract

- `GeneratedAssetRegistry.ts`는 242 registry key를 제공한다. 파일 수 253과 key 수가 다른 이유는 일부 item/icon이 같은 semantic key를 공유하고, UI registry는 게임 content key 우선으로 연결하기 때문이다.
- `RasterAssetRegistry.ts`는 runtime gameplay raster keys를 제공한다. Home, collection, prestige, shop, offline modal은 이 registry를 통해 PNG를 직접 참조한다. RC-8부터 store screenshot key visual, app icon candidate, main capybara crop은 runtime bundle에 넣지 않고 source/release candidate 파일로 유지한다. Store screenshot flow는 `e2e/store-screenshot-pack.spec.ts`가 source PNG를 직접 읽는다.
- `src/tests/generated/assetRegistryMatrix.test.ts`는 registry key, SVG root, `aria-label`, 외부 image/href/url 부재, 깨진 문자 부재를 검증한다.
- `src/tests/visualAssetIntegrity.test.ts`는 253개 파일 수와 balance/story/quest/achievement/decoration/tier/release coverage를 별도로 검증한다.
- `src/tests/rasterAssetIntegrity.test.ts`는 required raster keys, PNG magic bytes, file existence, 최소 file size를 검증한다.

## 교체 원칙

- Final art를 교체할 때 같은 key와 대략적인 aspect ratio를 유지한다.
- Bitmap으로 교체할 경우 `RasterAssetRegistry` key contract를 유지하고 lazy loading/저작권 기록을 갱신한다.
- 외부 파일을 추가하면 `ASSET_CREDITS.md`, `PRIVACY_NOTES.md`, `NATIVE_BUILD_GUIDE.md`, `STORE_SCREENSHOT_PLAN.md`를 같이 업데이트한다.

## 남은 Art Risk

현재 pack은 RC 제출 후보 검증용 직접 제작 SVG auxiliary pack + generated v2 raster core art pack이다. 실제 스토어 출시 전에는 commissioned/final art 소유권과 법무 검토, platform app icon/adaptive icon/splash export, 물리 기기 store screenshot 재촬영이 P1 external readiness로 남아 있다.
