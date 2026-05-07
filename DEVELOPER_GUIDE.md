# Developer Guide

## 구조

```txt
src/
  app/          AppShell, routes
  assets/       AssetManager, generated SVG registry, builtin CSS fallback
  config/       모든 밸런스, 저장, 튜토리얼, 수익화, 오디오 설정
  core/         BigNumberLite, 수식, formatter, time helper
  game/         GameLoop, GameEngine, selectors, actions, types
  state/        lightweight store, initial state, migrations
  systems/      Save, Offline, Prestige, Upgrade, Quest, Collection, Retention, CompanionBonus, ProgressionReward, Tutorial, Settings, Sound, Ads, IAP, Analytics, Debug
  ui/           components, screens, effects, styles
  tests/        Vitest 시뮬레이션 테스트
```

## CSS / UI Skin 구조

Runtime CSS는 `src/main.tsx`에서 `tokens.css`, `global.css`, `layout.css` 순서로 import합니다. `layout.css`는 직접 스타일을 담지 않고 아래 파일을 불러오는 manifest입니다.

```txt
src/ui/styles/
  tokens.css   shared color/spacing/radius/motion tokens
  global.css   reset/base/body/root typography
  layout.css   shell/hud/screens/effects import manifest
  shell.css    app frame, top header, content shell, bottom tab dock
  hud.css      reusable button, panel, modal, toggle, progress, plaque, toast, vault/reward HUD skin
  screens.css  home, upgrade, album, prestige, shop, settings, save, tutorial, debug screen layout
  effects.css  floating text, particles, purchase pulse, tab pop, glow, reduced-motion handling
```

기존 E2E selector 안정성을 위해 `.btn`, `.panel`, `.modal`, `.upgrade-card`, `.bottom-tabs` 같은 legacy classes는 유지합니다. 새 skin system은 같은 요소에 `.ui-button`, `.ui-panel`, `.ui-modal`, `.ui-ledger-row`, `.ui-progress-groove`, `.ui-tab-dock`, `.ui-shelf-card`, `.ui-sticker-ledger`, `.ui-code-slot`을 병행 부여합니다. 새 화면을 추가할 때는 legacy selector를 복사하기보다 가능한 한 `.ui-*` class를 먼저 붙이고, 화면 고유 배치만 `screens.css`에 추가합니다.

## 게임 루프

`GameLoop`는 `requestAnimationFrame` 기반입니다. `setInterval`로 핵심 생산 계산을 돌리지 않습니다.

- `GameLoop.tick`에서 `clampDelta(delta, GameConfig.loop.maxDeltaMs)` 적용
- `document.visibilityState === "hidden"`이면 생산 tick을 건너뜀
- 실제 EPS 계산은 `GameEngine.advanceGameState`
- 표시와 React 렌더링은 store snapshot을 구독하는 UI가 담당
- 홈의 다음 목표, 오늘 할 일, 컬렉션은 `GameSelectors.selectNextUpgradeGoal`, `selectQuestBoard`, `selectCollectionDashboard`, `selectCollectionBadges`, `selectPrestigeProgress`에서 파생합니다.

## 상태 관리

`src/state/useGameStore.ts`는 `useSyncExternalStore` 기반 lightweight store입니다.

- `getGameState()`로 현재 상태 조회
- `setGameState()`로 불변 상태 교체
- UI는 `useGameStore(selector)`로 구독
- 게임 액션은 `GameActions`가 Manager를 호출한 뒤 store에 반영

## Manager 역할

- `UpgradeManager`: 구매 가능 여부, 1/10/max quick-buy 비용 계획, 레벨 증가, 음수 재화 방지
- `PrestigeManager`: 환생 가능 여부, 보상 계산, 초기화 범위 관리
- `SaveManager`: JSON payload, checksum, Base64 export/import, localStorage
- `OfflineRewardManager`: 저장 시 EPS 기준 복귀 보상 계산과 claim, 카피바라 오프라인 보너스 반영
- `TutorialManager`: 3단계 튜토리얼 진행/완료/재시작
- `SettingsManager`: 설정 변경 순수 함수
- `AdsManager`, `IAPManager`: 추후 실제 SDK 교체 가능한 provider 인터페이스
- `MonetizationEventManager`: 광고/IAP 결과를 게임 상태에 반영
- `AchievementManager`: 40개 achievement 조건 판정, unlock/claim state, 실제 보상 지급, collection view model 관리
- `QuestManager`: 50개 quest 조건 판정, 보상 수령, 동료 친밀도와 passive 보상 반영
- `CollectionManager`: 카피바라 카드, 고유 능력 표시, 장식 해금/배치, 앨범 summary view model 관리
- `CompanionBonusManager`: 8마리 카피바라 친밀도 레벨을 tap/EPS/offline/quest/achievement/decoration/prestige 보너스로 집계
- `RetentionManager`: 20시간 daily reward, 48시간 streak reset, D1/D3/D7 milestone, post-prestige goal chain claim/preview 관리
- `ProgressionRewardManager`: 5개 성장 구간 unlock 기록, unlock toast, 장기 목표 상태 관리
- `AnalyticsManager`: in-memory/console mock 이벤트 기록
- `SoundManager`: `AudioConfig`의 file-ready slot을 재생하고 파일이 없으면 WebAudio fallback tone 사용
- `DebugManager`: 개발 모드 전용 상태 조작

Debug panel은 개발 모드에서도 기본 노출하지 않습니다. `/?debug=1`로 접근해야 표시됩니다. 실제 유저 E2E는 debug panel을 사용하지 않고, `debug-cheat-flow.spec.ts`만 이 경로를 사용합니다.

## 업그레이드 추가

1. `src/config/BalanceConfig.ts`의 `tapUpgrades` 또는 `generators`에 항목을 추가합니다.
2. 비용은 `baseCost`, `growthRate`, 효과는 `tapMultiplierPerLevel` 또는 `baseEps/generatorMultiplier`로 정의합니다.
3. UI와 구매 로직은 `UpgradeManager.getUpgradeViewModels`가 자동 반영합니다.
4. 신규 효과 타입이 필요하면 `gameMath.ts`와 `UpgradeManager`에만 확장합니다.

RC-6부터 업그레이드 구매 UI는 `1개 / 10개 / 최대` 모드를 지원합니다. 새 업그레이드가 `maxLevel`을 가진다면 `calculateUpgradePurchasePlan`이 남은 레벨까지만 계산하는지 `upgrade.test.ts`에 케이스를 추가해야 합니다.

각 업그레이드는 `tier`, `icon`, `unlock`, `unlockLabel`, `uiCopy`를 가져야 합니다. `contentConfig.test.ts`가 누락과 중복을 막습니다.

## Achievement 추가

1. `src/config/AchievementConfig.ts`에 id/name/description/tier/icon/condition/rewardText/toast/collectionLine을 추가합니다.
2. `src/config/AchievementRewardConfig.ts`에서 claim 보상을 확인합니다. tier 기본 귤 보상은 자동 적용되지만, 황금 나뭇잎/친밀도/영구 배율/장식 보상은 여기서 추가합니다.
3. 새 condition type이 필요하면 `AchievementManager.ts`의 condition 판정, progress, current text를 함께 확장합니다.
4. 저장이 필요한 claim state를 늘릴 경우 `GameTypes`, `initialState`, `SaveManager`, `migrations.ts`, `SAVE_SCHEMA.md`를 같이 수정합니다.

## Quest / Decoration 추가

1. 퀘스트는 `src/config/QuestConfig.ts`에 추가합니다. id/title/instruction/helperLine/completionLine/capybaraId/condition/reward가 필수입니다.
2. 장식은 `src/config/DecorationConfig.ts`에 추가합니다. slot/tier/name/flavorLine/visualClass/unlock이 필수입니다.
3. 새 condition 또는 unlock type이 필요하면 `QuestManager.ts` 또는 `CollectionManager.ts`의 판정과 progress text를 함께 확장합니다.
4. `node scripts/generateVisualAssets.mjs`로 SVG registry를 갱신하고, `node scripts/generateReleaseMatrixTests.mjs`로 snapshot matrix test를 갱신합니다.

## Visual Asset Pipeline

- `scripts/generateVisualAssets.mjs`는 config의 id/icon/tier/capybara key를 읽어 `src/assets/generated` 아래 직접 제작 SVG assets와 `GeneratedAssetRegistry.ts`를 생성합니다.
- UI 보조 아이콘/카드는 `VisualAssetIcon.tsx`를 사용합니다. asset key가 없으면 `builtinAssets.ts`의 CSS fallback key로 안전하게 렌더링합니다.
- 핵심 감정/캐릭터/스토어 이미지는 `src/assets/raster/RasterAssetRegistry.ts`와 `RasterAssetImage.tsx`를 사용합니다.
- RC-8부터 runtime gameplay에서 쓰지 않는 store key visual, app icon candidate, main capybara crop은 `RasterAssetRegistry`에 넣지 않습니다. 해당 파일은 source/release candidate로 유지하고 `rasterAssetIntegrity.test.ts`에서 별도 검증합니다.
- asset 무결성은 `src/tests/visualAssetIntegrity.test.ts`, `src/tests/rasterAssetIntegrity.test.ts`, generated matrix test가 함께 검증합니다.
- final art를 받으면 같은 registry key와 aspect ratio를 유지한 채 SVG/PNG 파일만 교체하면 UI와 테스트 연결을 유지할 수 있습니다.
- Raster release candidate assets는 `src/assets/raster/home/main-hero-background.png`, `main-capybara-character.png`, `src/assets/raster/companions/capybara-*.png`, `src/assets/raster/release/prestige-ritual.png`, `shop-reward-banner.png`, `offline-reward.png`, `store-key-visual.png`, `app-icon-candidate.png`에 있습니다. Runtime registry에는 실제 게임 화면에서 쓰는 home/companion/prestige/shop/offline PNG만 포함합니다. SVG release draft files도 보조/비교용으로 유지합니다.

## Audio Pipeline

- `src/config/AudioConfig.ts`는 tap/purchase/achievement/quest/offlineReward/prestige/error/navigation/ad 슬롯을 정의합니다.
- `SoundManager.play(slot)`은 `fileSrc`가 있으면 실제 파일을 재생하고, 없으면 WebAudio tone을 사용합니다.
- 최종 효과음 파일을 추가할 때는 `fileSrc`와 라이선스 상태를 갱신하고 `AUDIO_ASSET_PLAN.md`, `ASSET_CREDITS.md`를 같이 수정합니다.
- `audio.test.ts`가 필수 슬롯과 mute/music mute 상태 연결을 검증합니다.

## Store Screenshot Pipeline

`e2e/store-screenshot-pack.spec.ts`는 QA screenshot과 별도로 `store-screenshots/`에 iPhone/Android 후보 PNG를 생성합니다. 일반 유저 플로우와 동일하게 debug shortcut을 사용하지 않고, deterministic save fixture만 사용합니다.

현재 store 후보 10장은 raster store key visual + gameplay composition pass 이후 다시 생성했으며 `VISUAL_QA.md`, `FINAL_ART_AUDIT.md`, `STORE_SCREENSHOT_PLAN.md`에 기록한다.

## Balance Playtest Pipeline

`BalanceSimulator.ts`는 10초/1분/5분/15분/30분/2시간, 첫 환생, 환생 후 30분, D1/D3/D7 retention checkpoint를 기록합니다. RC-7부터 long-run checkpoint에서는 daily reward, milestone, post-prestige goal reward도 자동 claim합니다. RC-6 기준 첫 환생 가능 시간은 33분 0초이며, 자세한 playtest 판정은 `PLAYTEST_REPORT.md`, `RETENTION_PLAN.md`, `BALANCE_SIMULATION.md`를 기준으로 봅니다.

## 재화 추가

1. `GameConfig.currency`에 재화 메타를 추가합니다.
2. `GameTypes.GameState.currencies`와 `SavePayload`를 확장합니다.
3. `migrations.ts`에서 기존 세이브 기본값을 채웁니다.
4. UI 표시 컴포넌트는 `CurrencyDisplay`를 재사용합니다.

## 광고/IAP provider 연결

`RewardedAdProvider`, `IAPProvider` 인터페이스를 구현한 뒤 `GameActions.watchRewardedAd(provider)` 또는 `GameActions.purchaseMockProduct(productId, provider)`에 주입하면 됩니다. 실제 결제 완료와 mock 성공 문구는 분리해서 유지해야 합니다.

## Capacitor 연결

`capacitor.config.ts`는 `dist`를 `webDir`로 사용합니다.

```bash
npm run build
npx cap add ios
npx cap add android
npm run cap:sync
```

네이티브 폴더 생성 이후에는 iOS/Android별 서명, icon/splash, privacy manifest, store product 연결을 각 플랫폼 프로젝트에서 마무리해야 합니다.

## 디버그 패널

개발 모드에서 `/?debug=1`로 접근할 때만 노출됩니다.

- 귤 1,000 지급
- 귤 1,000,000 지급
- 황금 나뭇잎 지급
- 강제 저장
- 오프라인 2시간 시뮬레이션
- 튜토리얼 초기화
- 광고 버프 강제 적용
- 환생 가능 상태 만들기
- 일일 보상 가능 상태 만들기
- 리텐션 3일/7일 시뮬레이션
- 복귀 마일스톤 초기화
- 환생 목표 단계 이동
- 저장 초기화
