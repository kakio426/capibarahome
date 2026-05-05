# Final Asset Brief

기준일: 2026-05-05

## 제작 결정

`imagegen` skill을 검토했지만, 현재 프로젝트는 `GeneratedAssetRegistry` key contract와 SVG 기반 test pipeline이 이미 UI와 E2E에 깊게 연결되어 있다. 이번 pass는 preview bitmap을 외부 위치에 두는 방식이 아니라 repo-native final 후보 SVG를 직접 제작하고, 실제 UI와 store screenshot generator에 연결하는 방식으로 진행한다.

## Final 후보 Asset Set

| Asset | Key | 경로 | 실제 연결 |
| --- | --- | --- | --- |
| 메인 카피바라 hero illustration | `main-hero-final` | `src/assets/generated/release/main-hero-final.svg` | 홈 수확 영역 background |
| Mascot 기본/기쁨/졸림/먹기/환생 축하 | `mascot-*` | `src/assets/generated/mascots/*.svg` | 홈 수확 mascot state |
| 카피바라 8마리 portrait | `capybara-{id}` | `src/assets/generated/portraits/*.svg` | 앨범 companion card |
| 귤 currency icon | `orange` | `src/assets/generated/icons/orange.svg` | currency display |
| 황금 나뭇잎 currency icon | `leaf` | `src/assets/generated/icons/leaf.svg` | currency display/prestige |
| 성장 구간 배경 5종 | `tier-*` | `src/assets/generated/tiers/*.svg` | 홈 hero/tier story background |
| 환생 의식 key visual | `prestige-ritual-final` | `src/assets/generated/release/prestige-ritual-final.svg` | 환생 화면 key panel |
| 상점 보상 배너 | `shop-reward-banner-final` | `src/assets/generated/release/shop-reward-banner-final.svg` | 상점 feature card |
| 오프라인 보상 illustration | `offline-return-final` | `src/assets/generated/release/offline-return-final.svg` | 오프라인 보상 modal |
| 업그레이드/시설 icon set | config item keys | `src/assets/generated/items/*.svg` | 성장/퀘스트/장식 카드 |
| 퀘스트/업적 badge set | quest/achievement keys | `src/assets/generated/items/*.svg` | 앨범/업적 shelf |
| 앱 아이콘 후보 | `app-icon-final` | `src/assets/generated/release/app-icon-final.svg` | release asset 후보 |
| Splash 후보 | `splash-final` | `src/assets/generated/release/splash-final.svg` | release asset 후보 |
| Store screenshot key visual | `store-key-visual-final` | `src/assets/generated/release/store-key-visual-final.svg` | Playwright store screenshot overlay |
| Store screenshot frame | `store-screenshot-frame-final` | `src/assets/generated/release/store-screenshot-frame-final.svg` | release asset 후보 |

## Asset 제작 원칙

- 단순 도형 반복 대신 foreground/midground/background를 분리한다.
- 모든 final key visual은 카피바라, 귤, 황금잎, 시설/정원 맥락 중 최소 2개 이상을 포함한다.
- Store screenshot용 asset은 앱 캡처를 보조하는 marketing key visual로 쓰이며, UI와 분리된 독립 그래픽이어야 한다.
- 기존 경쟁작의 화면/문구/에셋을 복제하지 않는다.

## Integration Gate

- 문서에만 있는 asset은 실패다.
- `main-hero-final`, `prestige-ritual-final`, `shop-reward-banner-final`, `offline-return-final`, `store-key-visual-final`은 실제 React UI 또는 Playwright store screenshot flow에서 직접 참조해야 한다.
- `visualAssetIntegrity.test.ts`는 final key asset 존재와 전체 SVG count를 검증해야 한다.

## 남은 External Art

이번 pass는 repo-native final 후보 asset이다. 실제 스토어 제출 전 final commissioned bitmap illustration, adaptive icon PNG, platform splash export, 실제 store device frame polish는 별도 P2로 남긴다.
