# Asset Production Brief

기준일: 2026-05-05

## 제작 방식

현재 RC asset pack은 외부 CDN, 상용 아이콘팩, 경쟁작 이미지, 스톡 이미지를 쓰지 않는다. `scripts/generateVisualAssets.mjs`가 게임 config와 직접 작성한 SVG drawing helper를 기반으로 `src/assets/generated/` 아래 asset을 생성한다. UI는 `GeneratedAssetRegistry`와 `VisualAssetIcon`으로 key 기반 연결을 유지하므로, 추후 final SVG/bitmap으로 교체할 때 같은 key를 유지하면 된다.

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

## 필수 Asset Mapping

| 요구 asset | 현재 산출물 | 크기/용도 |
| --- | --- | --- |
| 메인 카피바라 hero | `release/main-hero-final.svg`, `mascots/mascot-default.svg` 외 상태별 mascot | 홈 수확 key visual + 상태 mascot |
| mascot 기본 | `mascots/mascot-default.svg` | 평상시 홈 |
| mascot 기쁨 | `mascots/mascot-happy.svg` | 구매/보상 반응 |
| mascot 졸림 | `mascots/mascot-sleepy.svg` | idle 상태 |
| mascot 귤 먹기 | `mascots/mascot-eating.svg` | 수확/tap 반응 |
| mascot 환생 축하 | `mascots/mascot-celebrate.svg` | 환생/큰 보상 |
| 귤 currency icon | `icons/orange.svg` | HUD, 보상, cost |
| 황금 나뭇잎 currency icon | `icons/leaf.svg` | 환생, 영구 재화 |
| 카피바라 portrait 8종 | `portraits/capybara-{id}.svg` | 앨범/동료 카드 |
| 성장 구간 배경 5종 | `tiers/tier-yard.svg`, `tier-storehouse.svg`, `tier-onsen.svg`, `tier-bamboo_garden.svg`, `tier-golden_forest.svg` | 홈/진행 구간 visual |
| 업그레이드/시설 30종 | `items/{upgradeId}.svg`, `icons/{iconKey}.svg` | 성장 탭, 구매 카드 |
| 퀘스트/업적 badge set | `items/{questId}.svg`, `items/{achievementId}.svg`, 관련 `icons/*.svg` | 앨범, 보상 수령 |
| 장식 25종 | `items/{decorationId}.svg`, 관련 `icons/*.svg` | 앨범, 홈 장식 |
| 환생 ritual visual | `release/prestige-ritual-final.svg` | 환생 화면 key visual |
| 상점 reward banner | `release/shop-reward-banner-final.svg` | 상점 상단 festival banner |
| 오프라인 복귀 visual | `release/offline-return-final.svg` | 오프라인 보상 modal |
| Store key visual | `release/store-key-visual-final.svg` | store screenshot hero overlay |
| 앱 아이콘 | `release/app-icon-final.svg`, `release/app-icon-rc2.svg`, `release/app-icon-draft.svg` | 제출 전 PNG/adaptive icon export 필요 |
| Splash | `release/splash-final.svg`, `release/splash-rc2.svg`, `release/splash-draft.svg` | 제출 전 플랫폼별 export 필요 |
| Store frame | `release/store-screenshot-frame-final.svg`, `release/store-screenshot-frame-rc2.svg`, `release/qa-screenshot-frame.svg` | store 후보/QA 보조 frame |

## Registry/Test Contract

- `GeneratedAssetRegistry.ts`는 242 registry key를 제공한다. 파일 수 253과 key 수가 다른 이유는 일부 item/icon이 같은 semantic key를 공유하고, UI registry는 게임 content key 우선으로 연결하기 때문이다.
- `src/tests/generated/assetRegistryMatrix.test.ts`는 registry key, SVG root, `aria-label`, 외부 image/href/url 부재, 깨진 문자 부재를 검증한다.
- `src/tests/visualAssetIntegrity.test.ts`는 253개 파일 수와 balance/story/quest/achievement/decoration/tier/release coverage를 별도로 검증한다.

## 교체 원칙

- Final art를 넣을 때 같은 key와 대략적인 viewBox 비율을 유지한다.
- Bitmap으로 교체할 경우 registry 또는 `AssetManager`에서 key contract를 유지하고 lazy loading/저작권 기록을 갱신한다.
- 외부 파일을 추가하면 `ASSET_CREDITS.md`, `PRIVACY_NOTES.md`, `NATIVE_BUILD_GUIDE.md`, `STORE_SCREENSHOT_PLAN.md`를 같이 업데이트한다.

## 남은 Art Risk

현재 pack은 RC 제출 후보 검증용 수제 SVG다. 실제 스토어 출시 전에는 final app icon PNG/adaptive icon, final splash, 더 풍부한 idle animation, 스토어 홍보용 bespoke bitmap art를 별도 제작하는 것이 P2로 남아 있다.
