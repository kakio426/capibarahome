# QA Report

기준일: 2026-05-09

## Final Command Results

```txt
npm run build
tsc -b && vite build
built successfully; Vite large chunk warning removed
```

```txt
npm test
Test Files  23 passed (23)
Tests       502 passed (502)
```

```txt
npm run test:e2e
37 passed
```

```txt
npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
7 passed
```

```txt
npx playwright test e2e/layout-regression.spec.ts --reporter=line
4 passed
```

```txt
npm run export:assets
exported platform asset candidates to platform-assets/
```

```txt
npm run cap:sync
npm run build && cap sync
built successfully; Android sync finished
```

```txt
npx cap doctor
Android looking great; installed Capacitor 7.6.2, latest 8.3.3
```

```txt
npx cap sync ios
failed as expected because ios platform has not been added; CocoaPods/Xcode setup is external blocker
```

```txt
npx cap add ios
failed because CocoaPods is not installed
```

```txt
./gradlew assembleDebug
failed before Gradle execution because Java Runtime is not installed
```

```txt
./gradlew lint
failed before Gradle execution because Java Runtime is not installed
```

```txt
git diff --check
passed
```

## P0 Reload/E2E Fix

Fresh E2E에서 `first-five-minute-playtest`, `save-import-export`, `upgrade-flow`가 reload 직후 하단 탭 클릭 timeout을 냈다.

Root cause:
- EPS가 있는 저장 데이터를 reload하면 짧은 reload gap도 오프라인 보상으로 계산되어 `오프라인 보상` modal/backdrop이 열릴 수 있었다.
- toast/modal layer가 남아 하단 탭 pointer event를 가로막아 실제 유저 플로우가 진행되지 않았다.

Fix:
- `GameConfig.offline.minSeconds = 60` 추가.
- `OfflineRewardManager.createOfflineReward`에서 60초 미만 또는 보상 1 미만이면 modal을 만들지 않음.
- toast를 `pointer-events: none`으로 변경.
- reload 이후 `오프라인 보상` dialog가 없어야 한다는 E2E assertion 추가.
- `offline.test.ts`, `rc1Rewards.test.ts`, 관련 Playwright flow를 업데이트.

검증:
- 당시 `npm test` 전체 479 tests 통과. RC-6 최종 기준은 485 tests 통과.
- 당시 `npm run test:e2e` 전체 21 tests 통과. RC-6 최종 기준은 22 tests 통과.

## Raster Art/CSS Production Pass

- 이전 SVG 중심 final art 선언은 실패로 재분류했고, 근거를 `ART_FAILURE_REVIEW.md`에 남겼다.
- 첫 번째 raster pass도 실패로 재분류했다. 핵심 PNG는 있었지만 흰 둥근 웹 카드와 generic app panel이 화면을 지배했기 때문이다.
- `scripts/generateVisualAssets.mjs`의 253개 SVG pack은 currency, tab, upgrade, badge 같은 보조 visual로 유지한다.
- built-in image generation과 후처리 workflow로 v2 PNG raster file 15개를 유지한다. 핵심 UI에서 직접 쓰는 후보는 integrated home hero background, 8 companion portraits, prestige ritual, shop reward banner, offline reward, store key visual이며, app icon candidate와 main capybara crop은 release/fallback 후보로 registry에 남겼다.
- `RasterAssetRegistry.ts`와 `RasterAssetImage.tsx`를 추가해 핵심 raster asset을 key 기반으로 연결했다.
- legacy visual fallback을 제거하고 `src/assets/builtinAssets.ts` fallback map으로 교체했다.
- RC-4에서 `layout.css`를 wood/parchment/orange lacquer HUD 중심의 통합 게임 UI stylesheet로 정리했고, RC-5에서 이를 `shell.css`, `hud.css`, `screens.css`, `effects.css` 책임 구조로 분리했다.
- 홈 hero는 `main-hero-background.png` 안의 통합 orchard/capybara scene이 주인공이 되도록 재구성했고, 별도 도형 overlay는 숨겼다.
- 앨범은 raster companion portrait를 sticker/companion card에 연결했다.
- 환생 `prestige-ritual.png`, 상점 `shop-reward-banner.png`, 오프라인 보상 `offline-reward.png`, store screenshot `store-key-visual.png`을 실제 화면/스크린샷 흐름에 연결했다.
- `visualAssetIntegrity.test.ts`는 253개 SVG 보조 asset, 게임 config coverage, 외부 image/href/url 부재, runtime visual styling banned pattern을 검증한다.
- `rasterAssetIntegrity.test.ts`를 추가해 required raster key, PNG magic bytes, file existence, 최소 파일 크기를 검증한다.
- `assetRegistryMatrix.test.ts`는 비대한 파일 크기 기준 대신 SVG 구조와 무결성 기준으로 변경했다.

## Art/Visual Documentation

- `ART_DIRECTION.md`: 감정 키워드, 금지 키워드, 팔레트, 형태 언어, 캐릭터/시설/UI 원칙, QA gate.
- `ASSET_PRODUCTION_BRIEF.md`: SVG 보조 pack과 raster core art pack을 분리한 asset mapping, registry/test contract, 교체 원칙.
- `FINAL_ASSET_BRIEF.md`, `FINAL_ART_AUDIT.md`: raster key visual 제작/연결 범위와 before/after QA evidence.
- `VISUAL_QA.md`: 화면별 첫인상, 캐릭터성, 보상감, placeholder 냄새, 양산형 앱 UI 냄새, 모바일 가독성, 텍스트 잘림, 버튼 터치성, 화면 밀도, 경쟁작 대비 부족한 점을 표로 기록.

## RC-4 Game UI Skin & Interaction Polish

- v2 raster art는 유지했다. `src/assets/raster`는 15 PNG / 19M 상태를 유지한다.
- 설정 토글을 browser checkbox에서 carved wood/orange custom switch로 교체했다.
- 세이브 modal에 `Export 코드 복사` action을 추가해 실제 export/import 사용성을 높였다.
- save/import textarea, modal close button, disabled button, segmented control, toast를 wood/parchment/orange HUD skin에 맞게 보강했다.
- toast가 settings header를 덮지 않도록 `data-toast-visible` 상태와 content offset을 추가했다.
- 강화 pass에서 `RC4_UI_SKIN_AUDIT.md`를 추가해 `home/upgrades/settings/save-modal/collection`을 P1/P2로 재분류했다.
- 성장/업그레이드 화면은 카드 리스트에서 garden workbench/facility shelf 구조로 재구성했다. `.upgrade-card` E2E selector는 유지하고, tool slot, shelf rail, cost plaque, carved buy button, level/effect plaques로 재스킨했다.
- 설정 화면은 `집사 장부`와 `정원 관리 서랍` heading, custom switch, ledger action button으로 정리해 일반 form row 느낌을 줄였다.
- 세이브 modal은 `save-vault-modal`과 sealed code row, vault code slot으로 바꿔 util dialog 대신 보관함/봉인 장부 느낌으로 재구성했다.
- 컬렉션 summary metric과 progress는 sticker-book ledger stamp와 carved groove progress로 보강했다.
- interaction polish: purchase pulse, error toast shake, prestige ready glow, active tab pop을 추가했고 `effectsEnabled=false` 및 reduced motion media query를 존중한다.
- `visual-regression.spec.ts` 단독 4 viewport 통과 후 settings/save/upgrade/collection/offline screenshots를 수동 확인했다. `store-screenshot-pack.spec.ts`도 단독 통과 후 store save/home/album 후보를 확인했다.

## RC-5 CSS Debt & Component System Pass

- v2 raster art와 RC-4 wood/parchment/orange HUD 방향은 유지했다. 새 raster asset은 추가하지 않았다.
- `src/ui/styles/layout.css`를 3,021줄 단일 stylesheet에서 4줄 import manifest로 축소했다.
- runtime CSS를 `tokens.css`, `global.css`, `shell.css`, `hud.css`, `screens.css`, `effects.css` 책임으로 분리했다.
- E2E 안정성을 위해 기존 `.btn`, `.panel`, `.modal`, `.upgrade-card`, `.bottom-tabs` selectors는 유지하고, `.ui-button`, `.ui-panel`, `.ui-modal`, `.ui-ledger-row`, `.ui-progress-groove`, `.ui-tab-dock`, `.ui-shelf-card`, `.ui-sticker-ledger`, `.ui-code-slot`을 병행 적용했다.
- 성장 화면은 tool slot pedestal/icon centering, cost/buy plaque hierarchy, mobile inline buy row를 보강했다.
- 설정 화면은 ledger/drawer 느낌을 유지하면서 토글 row와 segmented controls를 common HUD classes로 안정화했다.
- 세이브 modal은 vault/code-slot classes, scroll-safe textareas, 복사 action을 유지했다.
- 앨범 summary는 sticker-ledger/stamp cue와 groove progress를 강화했다.
- CSS split 직후 screen header가 low-contrast parchment로 회귀한 문제를 screenshot에서 발견했고, `screens.css`에서 dark wood plaque를 재고정한 뒤 screenshots를 다시 생성했다.
- `visualAssetIntegrity.test.ts` runtime visual styling audit에 새 CSS 파일들을 모두 포함했다.
- `RC5_CSS_COMPONENT_AUDIT.md`에 baseline audit, selector/line metrics, screen 판정, 남은 P2/P3를 기록했다.

## RC-6 Product Feel, Game Juice & Retention Pass

- RC-5 CSS split과 v2 raster art는 유지했다. 새 raster asset 대량 추가나 save schema 변경은 하지 않았다.
- `UpgradeManager.calculateUpgradePurchasePlan`을 추가해 `1개 / 10개 / 최대` quick-buy를 BigNumber 기반으로 계산한다.
- `UpgradePanel`에 quick-buy segmented control, 구매 가능 count, 구매 후 Lv chip, batch cost plaque를 추가했다.
- 구매 성공/실패는 기존 sound에 haptic hook을 더했고, 실패 toast/shake는 주요 클릭을 막지 않는다.
- 터치 floating text는 위치/색/크기 variation을 갖되 기존 cap을 유지한다.
- 오프라인 reward modal에 staged return copy, basket lid cue, reward count plaque를 추가했다.
- 환생 실행 후 `새 계절 시작` result panel을 띄워 획득 황금 나뭇잎, 총 보유량, 새 배율, 다음 목표를 보여준다.
- 앨범/퀘스트/업적 claim 뒤 sticker stamp/reveal banner가 표시된다.
- `BalanceSimulator.ts`에 첫 10초와 D1/D3/D7 retention checkpoint를 추가했고, `RETENTION_PLAN.md`에 D0/D1/D3/D7 목표를 기록했다.
- Unit coverage 추가: 10개 구매, 최대 구매, 부족 상태, maxLevel cap, BigNumber 큰 수치 max-buy, D1/D3/D7 retention checkpoint.
- E2E coverage 추가: quick-buy 10/max, offline reveal selectors, prestige result panel, album reveal banner, effects-off state.

## RC-7 Retention Systems Pass

- Save schema를 version 5로 올리고 `retention` state를 추가했다.
- `RetentionConfig.ts`가 daily reward table, D1/D3/D7 milestone, post-prestige goal chain reward를 중앙 관리한다.
- `RetentionManager.ts`가 daily eligibility/claim, streak reset, milestone claim, post-prestige goal progression을 BigNumber 기반으로 처리한다.
- 홈에 복귀 보상/환생 이후 목표 compact panel을 추가했고, 앨범에 D1/D3/D7 복귀 배지 ledger를 추가했다.
- 환생 result panel은 generic next target 대신 post-prestige goal chain의 다음 목표를 표시한다.
- DebugManager에는 `일일 보상 가능`, `리텐션 3일`, `리텐션 7일`, `마일스톤 초기화`, `환생 목표 +1`을 추가했으며 `?debug=1`에서만 노출된다.
- `BalanceSimulator.ts`는 D1/D3/D7 checkpoint에서 daily/milestone/post-prestige goal claim을 자동 처리해 retention reward가 경제를 깨지 않는지 회귀 검증한다.
- Unit coverage 추가: daily eligibility/claim/duplicate, streak reset, D1/D3/D7 milestone duplicate guard, post-prestige goal step, save/load retention, corrupted retention migration.
- E2E coverage 추가: 신규 유저 retention panel, D1 daily claim/reload cooldown, D3/D7 milestone claim/reload persistence, first prestige 후 goal chain, debug retention helpers 격리.

## RC-8 Release Candidate Bug Bash & Device Readiness Prep

- 새 save schema는 추가하지 않고 v5를 유지했다.
- `SaveManager`에 localStorage unavailable fallback과 throwing storage safe failure guard를 추가했다.
- `AppShell`은 `beforeunload` 외에 `pagehide`, hidden `visibilitychange`에서도 silent save를 수행한다.
- WebView viewport를 위해 safe-area top/bottom CSS 변수, `100dvh`, iOS input zoom 방지, touch-action 보강을 적용했다.
- `RasterAssetRegistry`에서 runtime UI가 쓰지 않는 `store-key-visual.png`, `app-icon-candidate.png`, `main-capybara-character.png`를 제외했다. 파일은 release/source candidate로 유지하고 integrity test에서 별도 검증한다.
- `RC8_RELEASE_CANDIDATE_AUDIT.md`와 `BUNDLE_ASSET_AUDIT.md`를 추가했다.
- Full E2E 중 desktop visual screenshot set이 30초 기본 timeout을 초과해 한 번 실패했다. 기능 결함은 아니며, visual screenshot spec은 의도적으로 많은 화면을 저장하므로 timeout을 60초로 조정했다. RC-8 당시 `visual-regression.spec.ts` 단독 4 passed 및 전체 `npm run test:e2e` 32 passed로 재검증했다. 현재 RC-14 전체 결과는 상단 Final Command Results의 37 passed가 기준이다.
- Unit/stress coverage 추가: v1/v2/v3/v4 -> v5 migration, corrupted v5 retention recovery, offline+daily 같은 복귀 세션, daily/milestone export/import, post-prestige goal save/load, max-buy safety cap, large retention reward formatting, localStorage unavailable fallback, 2시간 simulation, 8시간 offline cap, rapid tap 500회, quick-buy 반복, save/load 20회, RAF listener cleanup.
- E2E coverage 추가: D1 daily+offline 같은 세션, first prestige goal claim/reload, quick-buy max save/reload, 360px settings/save modal overflow, 반복 탭 전환.

## RC-9 Reality Check / RC-10 Product UI Fix

- RC-9 독립 감사에서 product-quality 기준 release candidate no-go로 재분류했다. 평균 점수는 5.8/10이었고, 업그레이드 quick-buy, daily reward, D1/D3/D7 milestone, prestige result, store screenshot/listing이 P1이었다.
- RC-9 문서는 삭제하거나 완화하지 않고 before audit 근거로 유지한다.
- RC-10에서는 새 save schema나 대형 기능을 추가하지 않고 P1 화면만 수정했다.
- 업그레이드 quick-buy는 carved mode stones, selected depth, filled pedestal, cost/CTA hierarchy로 재구성했다.
- Daily reward는 홈 hero 안의 compact badge와 dedicated reward sheet를 추가했다. claim 후 toast만으로 끝나지 않고 Day, streak, reward amount, next reward preview가 보인다.
- D1/D3/D7 milestone은 3-badge stamp board와 seal overlay, badge reward sheet로 바꿨다.
- Prestige result는 ritual raster crop, gained/total leaves, multiplier before/after, next goal을 한 ceremony panel에 묶었다.
- Store screenshot pack은 home/upgrade/milestone/prestige/reward 순간으로 재구성했고, public/store-facing copy에서 mock/sandbox/internal wording을 제거했다.
- RC-10 screenshot 재생성 결과:
  - `npx playwright test e2e/visual-regression.spec.ts --reporter=line`: 4 passed
  - `npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line`: 2 passed
- RC-10 integrity pass에서 기존 `RC10_SCREEN_SCORECARD.md`의 8.2 self-score를 독립 재감사했다. `RC10_INDEPENDENT_RESCORE.md` 기준 corrected combined average는 7.7/10이며, upgrade quick-buy 7.2와 store screenshots 7.5는 product-quality P1으로 남는다. 따라서 RC-10은 방향성 개선은 맞지만 product release candidate gate는 no-go다.

## RC-11 Narrow P1 Kill Pass

- RC-10 no-go 문서와 보정 점수는 before evidence로 유지했다.
- 새 기능, save schema, 대형 raster asset 추가 없이 남은 P1 두 개만 수정했다.
- 업그레이드 quick-buy/shelf는 작업대 레버 장치, selected depth/glow/notch, filled pedestal, first card hierarchy, 360px focused shelf screenshot으로 보강했다.
- Store screenshot pack은 phone panel scale/crop, upgrade shelf scroll framing, milestone/prestige/reward close framing, public Korean copy line-break를 재조정했다.
- Full E2E 첫 재실행에서 quick-buy 보조 라벨 때문에 `최대` exact accessible name selector가 실패했다. 시각 보조 라벨은 유지하고 `aria-label`을 기존 값으로 복구한 뒤 관련 E2E와 전체 E2E를 재실행했다.
- `RC11_INDEPENDENT_RESCORE.md` 기준 upgrade quick-buy 8.1, store screenshots 8.1, daily reward 8.0, milestone 8.0, prestige result 8.2, combined 8.1이다.
- RC-11 screenshot 재생성 결과:
  - `npx playwright test e2e/visual-regression.spec.ts --reporter=line`: 4 passed
  - `npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line`: 2 passed
  - `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: 6 passed
- RC-11 기준 scoped product-quality P1은 해소됐다. daily/milestone reward moment는 8.0 근처이므로 P2 polish 후보로 남긴다.

## RC-12 Store Submission Readiness + Layout Defect Kill Pass

- 새 기능, save schema, 대형 asset 추가 없이 layout/readiness 회귀만 좁게 점검했다.
- `UI_LAYOUT_DEFECT_AUDIT.md`와 `RC12_SUBMISSION_READINESS_AUDIT.md`를 추가해 실제 screenshot/DOM/build evidence 기준으로 P1/P2를 재분류했다.
- `e2e/layout-regression.spec.ts`를 추가해 360x740, 390x844, 430x932, desktop 1280x900에서 horizontal overflow, critical text clipping, bottom tab/CTA overlap, modal action clickability, save textarea 16px 이상을 검증한다.
- `e2e/helpers.ts`에 `expectNoCriticalTextClipping`, `expectVisibleWithinViewport`, `expectClearOfBottomDock`, `expectModalActionUsable` helper를 추가했다.
- `e2e/store-screenshot-pack.spec.ts`는 public screenshot copy 금지어, heading/subtitle clipping, screenshot file size guard를 추가했다.
- 발견/수정한 P1:
  - desktop centered panel에서 D7 milestone `황금 숲 단골` CTA가 하단 tab dock과 약 3px 겹치던 문제를 `.content-shell` bottom padding/scroll-padding 증대로 수정.
  - save export/import textarea가 16px 미만이라 iOS focus zoom risk가 있던 문제를 16px로 보정하고 wrapping/scroll 정책을 유지.
- 발견/수정한 P2:
  - 기존 fullPage visual screenshot이 fixed bottom nav를 긴 페이지 하단에 합성해 실제 viewport보다 더 나쁜 occlusion artifact를 만들 수 있어 viewport screenshot으로 전환.
  - `upgrades-quick-buy` screenshot scroll offset을 max-buy shelf/CTA 중심으로 재조정.
- RC-12 targeted verification:
  - `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: 4 passed
  - `npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line`: 2 passed
  - `npx playwright test e2e/visual-regression.spec.ts --reporter=line`: 4 passed
  - `npm run test:e2e`: 36 passed
  - `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: 6 passed
- Store submission readiness package:
  - `APP_ICON_SPLASH_EXPORT.md`: icon/splash source 후보와 platform export gap 정리
  - `STORE_METADATA_PACKAGE.md`: 공개 listing copy, screenshot order, URL/age rating/user-provided 항목 정리
  - `RC12_SUBMISSION_READINESS_AUDIT.md`: 실제 제출 완료가 아니라 제출 준비 패키지 정리 완료로 판정

## RC-13 Native Shell, Store Submission Prep, Final UI Defect Sweep

- 새 게임 기능, save schema, 대형 raster asset은 추가하지 않았다.
- 공식 문서 확인 결과는 `RC13_SUBMISSION_AUDIT.md`에 2026-05-09 기준 링크와 함께 기록했다.
- `npx cap add android`로 Android native shell을 생성했고 `android/app/build.gradle`, `AndroidManifest.xml`, `strings.xml`, `MainActivity.java`가 준비됐다.
- `npx cap add ios`는 CocoaPods 미설치로 실패했다. iOS shell 미생성은 내부 앱 결함이 아니라 Xcode/CocoaPods 환경 external blocker로 분류한다.
- `npm run export:assets`를 추가해 `platform-assets/`에 iOS AppIcon.appiconset, Android icon candidates, splash PNG candidates를 생성하고 Android native res launcher icons를 갱신했다.
- `@capacitor/assets` 설치는 `sharp`/libvips 다운로드 timeout으로 실패했고 package 파일은 변경되지 않았다. macOS `sips` 기반 fallback script를 사용했다.
- Layout regression을 강화해 `data-ui-critical` clipping, home tap CTA visibility, toast non-blocking, store screenshot PNG dimensions를 검사한다.
- Home lower stats panel을 wood ledger skin으로 보강했고, D1/D3/D7 milestone visible description을 짧게 줄여 360/390px ellipsis 부담을 낮췄다.
- RC-13 targeted verification:
  - `npm run build`: success, Vite large chunk warning remains for `index-DZPMoALW.js`
  - `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: 4 passed
  - `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: 6 passed
  - `npm run export:assets`: success
  - `npx cap sync android`: success
  - `npx cap doctor`: success, Android looking great; installed Capacitor 7.6.2 vs latest 8.3.3 noted as P3
  - `npx cap sync ios`: failed as expected because iOS platform is not added after CocoaPods-blocked `cap add ios`
- 내부 UI P1은 `RC13_VISUAL_REGRESSION_AUDIT.md`와 `RC13_INDEPENDENT_RESCORE.md` 기준 발견되지 않았다. Native/submission readiness는 external blocker 때문에 실제 제출 완료로 보지 않는다.

## RC-14 Native Release Build Readiness, Bundle Optimization, Physical QA Package

- 새 게임 기능, save schema, 대형 gameplay asset은 추가하지 않았다.
- 공식 문서 확인 결과는 `RC14_RELEASE_READINESS_AUDIT.md`에 2026-05-09 기준 링크와 함께 기록했다.
- `vite.config.ts`에 `assetsInlineLimit: 0`과 manual chunk split을 추가해 Vite large chunk warning을 제거했다.
- JS output은 single `1.165M` chunk에서 largest `react-vendor 188.60K`, `game-config 70.20K`, `game-runtime 53.36K`, `ui 40.46K`, `generated-assets 19.45K` 구조로 분리됐다.
- `scripts/exportPlatformAssets.mjs`가 Google Play feature graphic 후보 `1024 x 500`을 `platform-assets/google-play/feature-graphic.png`와 `store-screenshots/google-play-feature-graphic.png`에 생성한다.
- `e2e/store-screenshot-pack.spec.ts`에 feature graphic dimension/file-size guard를 추가했다.
- Android native config 점검 결과 `applicationId`, namespace, label, min/target/compile SDK, version, INTERNET permission만 사용하는 상태를 확인했다.
- `npx cap doctor`는 Android ready를 보고했다.
- `./gradlew assembleDebug`와 `./gradlew lint`는 Java Runtime 미설치로 Gradle 시작 전에 실패했다. 앱 코드 blocker가 아니라 환경 blocker로 분류한다.
- Xcode는 설치돼 있지만 CocoaPods가 없어 `npx cap add ios`가 실패했고, `npx cap sync ios`는 iOS platform 미생성으로 실패했다.
- `DEVICE_QA_CHECKLIST.md`를 표 형태로 재작성하고 `DEVICE_QA_RESULTS_TEMPLATE.md`, `RC14_DEVICE_QA_PACKET.md`를 추가했다. 실제 물리 기기 QA는 미실행이다.
- RC-14 targeted verification:
  - `npm run build`: success, Vite large chunk warning removed
  - `npm test`: 23 files / 502 tests passed
  - `npm run test:e2e`: 37 passed
  - `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: 4 passed
  - `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: 7 passed
  - `npm run export:assets`: success
  - `npm run cap:sync`: success, Android sync finished
  - `npx cap sync android`: success
  - `git diff --check`: passed
- 내부 UI/layout P1은 `RC14_INDEPENDENT_RESCORE.md` 기준 발견되지 않았다. Android Gradle, iOS shell, signing, store URLs, physical QA는 external blocker로 남긴다.

## 자동 테스트 커버리지

- 밸런스 계산: 비용 증가, 터치 수익, EPS, BigNumber, format.
- 콘텐츠 config: 30개 업그레이드/시설, 50개 quest, 40개 achievement, 25개 decoration, 5개 tier, 8개 character.
- 퀘스트/컬렉션: 동료 친밀도, 장식 배치, 보상 수령 중복 방지.
- Release matrix: 242 registry asset key와 158 content record 연결성.
- Visual asset integrity: 253 SVG auxiliary files, 15 raster PNG files, 외부 참조 없음, runtime visual styling audit.
- 저장/불러오기: 동일 상태 복구, 손상 Base64, checksum 불일치, v1/v2/v3 migration.
- 오프라인 보상, 환생, 튜토리얼, 설정, 광고/IAP mock.
- RC reward loops: companion passive, achievement claim reward, permanent multiplier, progression unlock, sound mute.
- RC bug bash: rapid taps, duplicate reward guards, prestige save/load, mute persistence, long number formatting.
- balance simulation: 10초/1분/5분/15분/30분/2시간 checkpoint, 첫 환생, 환생 후 30분, D1/D3/D7 retention rewards, 광고 버프.

## E2E Coverage

실제 유저 E2E는 debug shortcut을 사용하지 않는다. Debug는 `e2e/debug-cheat-flow.spec.ts`에서만 사용한다.

| 파일 | 상태 | 비고 |
| --- | --- | --- |
| `e2e/new-user-flow.spec.ts` | 완료 | 튜토리얼, 터치, 앨범 퀘스트 보상, 첫 업그레이드, 홈 목표/컬렉션 |
| `e2e/upgrade-flow.spec.ts` | 완료 | 구매 가능/불가능 상태, quick-buy 10/max, reload blocker regression |
| `e2e/save-import-export.spec.ts` | 완료 | 저장, reload, export, reset, import |
| `e2e/offline-reward.spec.ts` | 완료 | 복귀 보상, staged reveal, 중복 지급 방지 |
| `e2e/prestige-flow.spec.ts` | 완료 | 환생 실행, result panel, 영구 재화 유지 |
| `e2e/settings-tutorial.spec.ts` | 완료 | 설정, effects-off state, 튜토리얼 재시작 |
| `e2e/monetization-mock.spec.ts` | 완료 | 광고 보상, IAP 샌드박스 보상 |
| `e2e/visual-regression.spec.ts` | 완료 | 360/390/430/desktop screenshots, overflow check |
| `e2e/store-screenshot-pack.spec.ts` | 완료 | iPhone/Android store screenshot 후보 10장 |
| `e2e/layout-regression.spec.ts` | 완료 | 360/390/430/desktop critical clipping, CTA/tab overlap, modal clickability, textarea zoom risk |
| `e2e/debug-cheat-flow.spec.ts` | 완료 | `?debug=1` 격리와 장기 성장 QA |
| `e2e/rc1-product-feel.spec.ts` | 완료 | 업적 보상 claim, 카피바라 passive 표시/수익, sound mute, 장기 목표 |
| `e2e/first-five-minute-playtest.spec.ts` | 완료 | debug 없이 5분권 실제 플레이 보상/reveal/저장/장식/동료/복귀 검증 |
| `e2e/retention-flow.spec.ts` | 완료 | debug 없이 daily reward, D3/D7 milestone, post-prestige goal chain 검증 |
| `e2e/rc8-release-bug-bash.spec.ts` | 완료 | daily+offline 동시 복귀, prestige goal reload, quick-buy reload, 360px modal, 반복 tab 전환 |

## 시각 QA

- Playwright visual flow가 88개 current screenshot을 갱신한다. `qa-screenshots/` 전체에는 archived before shots와 RC-7/RC-8 daily/milestone/post-prestige/device-readiness screenshots가 포함된다.
- Store 후보 10개를 `store-screenshots/`에 갱신했다.
- 360x740, 390x844, 430x932, desktop 1280x900 중앙 패널에서 overflow assertion 통과.
- 홈 v2 raster orchard/capybara integrated scene, 앨범 raster sticker portraits, 환생 ritual raster, 상점 reward banner raster, 오프라인 보상 raster, save modal 긴 code scroll을 재확인했다.
- Store 후보 10개는 raster store key visual을 full-screen background로 두고 gameplay panel/copy를 얹는 구성으로 재생성했다.
- CSS audit: runtime visual files에서 temporary override marker, generic UI marker, external asset fallback marker를 제거했고, RC-5 이후 `shell/hud/screens/effects` 파일도 audit 대상에 포함했다.
- RC-4 추가 수동 판정: `390x844-upgrades.png`는 더 이상 spreadsheet/list/card layout로 보지 않는다. `390x844-settings.png`는 browser form UI가 아니며, `390x844-save-modal.png`는 save vault/ledger UI로 보인다.
- RC-5 추가 수동 판정: `390x844-upgrades.png`, `390x844-settings.png`, `390x844-save-modal.png`, `390x844-collection.png`, `desktop-1280x900-upgrades.png`, store screenshot 후보를 확인했다. 당시 내부 P0/P1 visual regression은 없음.
- RC-6 추가 산출물 확인: `390x844-upgrades-quick-buy.png`, `390x844-collection-claim-ready.png`, `390x844-prestige-result.png`, `390x844-offline-reward.png`가 생성됐고 390x844 viewport screenshot artifact dimension과 파일 크기를 확인했다. 내부 P0/P1 gameplay feel blocker는 없음.
- RC-7 추가 산출물 확인: `390x844-home-daily-available.png`, `390x844-home-daily-cooldown.png`, `390x844-daily-reward-claim.png`, `390x844-home-post-prestige-goal.png`, `390x844-collection-milestones.png`, `390x844-milestone-claim.png`가 생성됐고 360/390/430/desktop overflow assertion을 통과했다. 내부 P0/P1 retention blocker는 없음.
- RC-8 추가 회귀 확인: 360x740 save modal bounding box가 viewport 안에 남고, toast는 pointer event를 막지 않으며, repeated tab switching 뒤 홈 tap CTA가 유지된다. 내부 P0/P1 device-readiness blocker는 없음.
- RC-12 추가 layout 확인: `layout-regression.spec.ts`가 4 viewport에서 critical text clipping, horizontal overflow, bottom dock/CTA overlap, modal action clickability, save textarea 16px 이상을 검증한다. `visual-regression.spec.ts`는 실제 viewport screenshot으로 전환해 fixed bottom nav fullPage artifact를 제거했다. 내부 P1 layout defect는 현재 발견되지 않는다.
- RC-13 추가 layout/native 확인: `layout-regression.spec.ts`에 `[data-ui-critical]` clipping, toast non-blocking, home tap CTA visibility를 추가했고 4 passed. Store screenshot pack은 PNG magic/dimension guard를 추가해 iPhone 1290x2796, Android 1080x1920을 검증한다. Android native shell은 생성/동기화됐고, iOS는 CocoaPods 미설치로 external blocker다.

## Source Budget Gate

- handwritten runtime implementation: 9,388 LOC.
- handwritten tests/E2E: 3,235 LOC.
- pure handwritten gameplay/UI/system/test total: 12,623 LOC.
- excluded config: 2,684 LOC.
- excluded generated SVG/registry: 11,533 LOC.
- excluded generated matrix tests: 5,846 LOC.
- generated SVG files: 253.
- registry asset keys: 242.
- raster PNG files: 15, 19M total.
- handwritten runtime+test byte size: 439,730 bytes.
- runtime `dist/assets` PNG payload: 12 files / 14M after excluding release-only raster candidates from the runtime registry.

## 남은 리스크

- 실제 물리 디바이스 60fps/thermal/retention clock profiling은 수행하지 않았다.
- 서버 검증 daily calendar, push notification, 날짜 조작 완전 방어는 RC-7 범위가 아니다.
- 실제 commissioned/final art ownership, 라이선스 확정 사운드, 광고 SDK/IAP SDK는 연결하지 않았다.
- 실제 Apple/Google 개발자 계정, 인증서, 프로비저닝, 스토어 업로드는 수행하지 않았다.
- commissioned art 소유권/법무 확정, final adaptive icon foreground/background art, 실제 device store screenshot 재촬영은 제출 전 external art readiness로 남는다.
- Vite JS chunk warning은 `BUNDLE_ASSET_AUDIT.md` 기준 P2 performance optimization으로 남긴다.
- RC-11 independent rescore 기준 scoped product-quality P1은 해소됐다: upgrade quick-buy/shelf 8.1, store screenshot framing 8.1, combined 8.1.
- RC-13 layout regression 기준 주요 모바일 viewport에서 글자 잘림, CTA/탭 겹침, modal 조작 불가 P1은 발견되지 않았다. 실제 App Store/Google Play 제출 완료로는 보고하지 않으며 외부 제출 준비 항목은 `RELEASE_BLOCKERS.md`, `RC13_SUBMISSION_AUDIT.md`, `RC13_NATIVE_READINESS_AUDIT.md`에 분리한다.
