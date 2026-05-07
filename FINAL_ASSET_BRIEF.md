# Final Asset Brief

기준일: 2026-05-05

## 제작 결정

이전 SVG 중심 pass와 첫 raster pass는 실패로 본다. 첫 raster pass는 PNG가 있어도 UI가 흰 rounded web card 중심이라 모바일 게임 화면으로 보이지 않았다. 이번 v2 pass는 built-in image generation으로 생성한 PNG를 workspace에 복사하고, crop/resize 후 `RasterAssetRegistry`로 실제 UI에 연결한다. SVG는 currency, tab, small badge 같은 보조 icon으로만 남긴다.

## Final 후보 Asset Set

| Asset | Key | 경로 | 실제 연결 |
| --- | --- | --- | --- |
| 메인 hero background | `main-hero-background` | `src/assets/raster/home/main-hero-background.png` | 홈 수확 scene |
| 메인 카피바라 crop candidate | `main-capybara-character` | `src/assets/raster/home/main-capybara-character.png` | registry fallback/app icon 후보. 홈 v2는 integrated hero scene 우선 |
| 카피바라 8마리 portrait | `companion-{id}` | `src/assets/raster/companions/capybara-{id}.png` | 앨범 sticker/companion card |
| 귤 currency icon | `orange` | `src/assets/generated/icons/orange.svg` | currency display |
| 황금 나뭇잎 currency icon | `leaf` | `src/assets/generated/icons/leaf.svg` | currency display/prestige |
| 성장 구간 보조 배경 | `tier-*` | `src/assets/generated/tiers/*.svg` | 보조 icon/background only |
| 환생 의식 key visual | `prestige-ritual-raster` | `src/assets/raster/release/prestige-ritual.png` | 환생 화면 key scene |
| 상점 보상 배너 | `shop-reward-banner-raster` | `src/assets/raster/release/shop-reward-banner.png` | 상점 feature banner |
| 오프라인 보상 illustration | `offline-reward-raster` | `src/assets/raster/release/offline-reward.png` | 오프라인 보상 modal |
| 업그레이드/시설 icon set | config item keys | `src/assets/generated/items/*.svg` | 성장/퀘스트/장식 카드 |
| 퀘스트/업적 badge set | quest/achievement keys | `src/assets/generated/items/*.svg` | 앨범/업적 shelf |
| 앱 아이콘 후보 | source/release candidate | `src/assets/raster/release/app-icon-candidate.png` | release asset 후보. RC-8부터 runtime registry 제외 |
| Store screenshot key visual | source/store screenshot candidate | `src/assets/raster/release/store-key-visual.png` | Playwright store screenshot key art. RC-8부터 runtime registry 제외 |

## Asset 제작 원칙

- 핵심 감정 asset은 PNG raster로 둔다.
- 단순 도형 반복 대신 foreground/midground/background를 분리한다.
- 모든 final key visual은 카피바라, 귤, 황금잎, 시설/정원 맥락 중 최소 2개 이상을 포함한다.
- Store screenshot용 asset은 앱 캡처를 보조하는 marketing key visual로 쓰이며, UI와 분리된 독립 그래픽이어야 한다.
- 기존 경쟁작의 화면/문구/에셋을 복제하지 않는다.

## Integration Gate

- 문서에만 있는 asset은 실패다.
- `main-hero-background`, `prestige-ritual-raster`, `shop-reward-banner-raster`, `offline-reward-raster`는 실제 React UI에서 직접 참조해야 한다. `main-capybara-character`, `store-key-visual.png`, `app-icon-candidate.png`는 RC-8부터 runtime registry가 아니라 release/source candidate와 Playwright store screenshot source로 유지한다.
- `rasterAssetIntegrity.test.ts`는 final raster key 존재와 PNG file integrity를 검증해야 한다.

## 남은 External Art

이번 pass는 generated v2 raster release candidate asset과 custom game HUD skin이다. 실제 스토어 제출 전 commissioned art 소유권/법무 확정, platform icon/splash export, 실제 store device frame polish는 P1 external art readiness로 남긴다.
