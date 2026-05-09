# Spec Coverage

기준일: 2026-05-09

상태 기준: `완료`는 실제 구현 파일과 테스트, E2E, screenshot, build 산출물 중 하나 이상의 근거가 있을 때만 사용한다. RC-9 독립 감사에서는 product-quality P1이 존재해 release candidate no-go였고, RC-10 integrity pass에서 previous 8.2 self-score를 7.7 no-go로 보정했다. RC-11에서 남은 upgrade quick-buy/shelf와 store screenshot framing P1을 좁게 수정했고, `RC11_INDEPENDENT_RESCORE.md` 기준 combined average는 8.1이다. RC-12에서는 새 self-score 없이 DOM layout regression과 viewport screenshot으로 글자 잘림/CTA 겹침/modal 조작 불가/store public copy P1을 검증했다. RC-13에서는 Android native shell, platform asset export 후보, 공식 문서 확인, 강화된 layout/store dimension guard를 추가했다. RC-14에서는 Vite large chunk warning 제거, Google Play feature graphic 후보, Android/iOS native environment audit, physical QA packet을 추가했다. RC-15에서는 JDK 21/Android SDK/CocoaPods 설치, Android debug APK build/lint, iOS shell add/sync를 실제 명령으로 검증했다. RC-16에서는 local rehearsal key로 signed release APK/AAB 생성과 verification을 검증했다. 실제 App Store/Google Play 제출 완료는 외부 계정/production signing/법무/실기기 QA가 없어 완료로 판단하지 않는다.

## Release Gate

| 요구사항 | 상태 | 근거 |
| --- | --- | --- |
| `AGENTS.md`, `PROJECT_SPEC.md` 선확인 | 완료 | 구현 전 확인 및 `PROJECT_SPEC.md` RC spec으로 교체 |
| 원본 0-26 요구사항 누락 방지 | 완료 | `REQUIREMENTS_TRACE.md` |
| 경쟁작 벤치마크 | 완료 | `COMPETITOR_BENCHMARK.md` |
| gap backlog와 P0/P1 해결 | 완료 | RC-10 no-go 보정 후 RC-11 independent rescore 기준 product-quality P1 해소: upgrade 8.1, store screenshots 8.1, combined 8.1. RC-12 layout regression 기준 주요 viewport P1 없음 |
| release blocker 분리 | 완료 | `RELEASE_BLOCKERS.md` |
| `npm run build` | 완료 | `tsc -b && vite build`, success |
| `npm test` | 완료 | Vitest 23 files, 502 tests passed |
| `npm run test:e2e` | 완료 | Playwright 37 tests passed |
| Capacitor packaging prep | 완료 | `capacitor.config.ts`, scripts, Android/iOS native shell, `npm run cap:sync` success, Android `assembleDebug`/`lint` success, RC-16 local signed `assembleRelease`/`bundleRelease` success, iOS `cap add`/`sync` success. iOS simulator build, production signing, store upload는 external blocker |
| 실제 스토어 업로드 미수행 | 완료 | 계정/인증서/프로비저닝 미제공. `RELEASE_CHECKLIST.md`와 `RELEASE_BLOCKERS.md`에 사용자 작업으로 분리 |

## Core Scope

| 요구사항 | 상태 | 구현 근거 | 검증 근거 |
| --- | --- | --- | --- |
| 중앙 밸런스 config | 완료 | `GameConfig.ts`, `BalanceConfig.ts`, `MonetizationConfig.ts` | `balance.test.ts` |
| BigNumberLite | 완료 | `core/BigNumberLite.ts` | `balance.test.ts` |
| RAF 게임 루프 | 완료 | `GameLoop.ts`, display update throttle, visibility handling | `gameLoop.test.ts` |
| 터치 수익 | 완료 | `GameActions.tapOrange`, `MainGameScreen` | `new-user-flow.spec.ts` |
| EPS 자동 수익 | 완료 | `GameEngine.advanceGameState`, `GameSelectors` | `gameLoop.test.ts`, `upgrade-flow.spec.ts` |
| 업그레이드 | 완료 | `UpgradeManager.ts`, `UpgradePanel.tsx`, 30 upgrade/facility items, RC-6 quick-buy `1개/10개/최대` | `upgrade.test.ts`, `contentConfig.test.ts`, `upgrade-flow.spec.ts` |
| 진행 목표/컬렉션 | 완료 | `selectNextUpgradeGoal`, `selectQuestBoard`, `selectCollectionDashboard`, companion ability, achievement reward claim, home/album UI | `progression.test.ts`, `questManager.test.ts`, `collectionManager.test.ts`, `rc1Rewards.test.ts`, `rc1-product-feel.spec.ts` |
| 리텐션 시스템 | 완료 | `RetentionConfig.ts`, `RetentionManager.ts`, daily reward, D1/D3/D7 milestone, post-prestige goal chain, home/album UI, save v5 retention state | `retention.test.ts`, `retention-flow.spec.ts`, `visual-regression.spec.ts` |
| 환생 | 완료 | `PrestigeManager.ts`, `PrestigePanel.tsx`, RC-6 result panel | `prestige.test.ts`, `prestige-flow.spec.ts` |
| 저장/로드 | 완료 | `SaveManager.ts`, localStorage, volatile fallback, checksum, Base64, pagehide/visibility save | `save.test.ts`, `rc8ReleaseBugBash.test.ts`, `save-import-export.spec.ts` |
| 오프라인 보상 | 완료 | `OfflineRewardManager.ts`, return modal, RC-6 staged reward reveal | `offline.test.ts`, `offline-reward.spec.ts` |
| 설정 | 완료 | `SettingsManager.ts`, `SettingsModal.tsx`, sound mute 연결 | `settings.test.ts`, `settings-tutorial.spec.ts`, `rc1-product-feel.spec.ts` |
| 튜토리얼 | 완료 | `TutorialManager.ts`, `TutorialOverlay.tsx`, target highlight | `tutorial.test.ts`, `settings-tutorial.spec.ts` |
| 광고/IAP mock provider | 완료 | `AdsManager.ts`, `IAPManager.ts`, `MonetizationEventManager.ts` | `monetization.test.ts`, `monetization-mock.spec.ts` |
| 디버그 도구 | 완료 | `DebugManager.ts`, `?debug=1` gated panel | `debug-cheat-flow.spec.ts` |
| analytics mock | 완료 | `AnalyticsManager.ts` | unit/E2E action flows |
| 에셋 파이프라인 | 완료 | `AssetManager.ts`, `builtinAssets.ts`, `scripts/generateVisualAssets.mjs`, 253 hand-authored SVG auxiliary files, `RasterAssetRegistry.ts`, `RasterAssetImage.tsx`, 15 raster PNG files | `assetRegistryMatrix.test.ts`, `visualAssetIntegrity.test.ts`, `rasterAssetIntegrity.test.ts`, screenshots |
| release QA | 완료 | `QA_REPORT.md`, `VISUAL_QA.md`, `PERFORMANCE_QA.md`, `RELEASE_BLOCKERS.md`, `RC8_RELEASE_CANDIDATE_AUDIT.md`, `BUNDLE_ASSET_AUDIT.md` | final command outputs |

## Expanded Content Scope

| 요구사항 | 상태 | 근거 |
| --- | --- | --- |
| 업그레이드/시설 30종 이상 | 완료 | `BalanceConfig.ts`, `contentConfig.test.ts` |
| 각 업그레이드 고유 이름/설명/비용/효과/unlock/UI copy | 완료 | `BalanceConfig.ts`, `contentConfig.test.ts` |
| 성장 구간 5개 이상 | 완료 | `ProgressionConfig.ts`, `ProgressionRewardManager.ts`, home UI |
| 구간별 배경/대표 시설/unlock 메시지/목표 | 완료 | `ProgressionConfig.ts`, `MainGameScreen.tsx`, unlock toast/reward copy |
| achievement/collection 40개 이상 | 완료 | `AchievementConfig.ts`, `AchievementRewardConfig.ts`, claim UI, home collection shelf, `contentConfig.test.ts`, `rc1Rewards.test.ts` |
| 퀘스트 40개 이상 | 완료 | `QuestConfig.ts`, album quest board, `questManager.test.ts` |
| 장식 컬렉션 | 완료 | `DecorationConfig.ts` 25종, `CollectionManager.ts`, album decoration board, hero visual class |
| story bible | 완료 | `STORY_BIBLE.md`, `StoryConfig.ts` |
| 카피바라 8마리 | 완료 | `StoryConfig.ts`, `STORY_BIBLE.md`, 8 unique passive abilities |
| mascot visual 5상태 | 완료 | `MainGameScreen.tsx`, split CSS skin files, `AssetConfig.ts`, `src/assets/generated/mascots/` |
| app icon/splash/store art 후보 | 완료 | `src/assets/raster/release/app-icon-candidate.png`, `store-key-visual.png`; `platform-assets/ios/AppIcon.appiconset`, Android icon candidates, splash PNG candidates, Google Play feature graphic candidate |
| balance simulation | 완료 | `BalanceSimulator.ts`, `balanceSimulation.test.ts`, `BALANCE_SIMULATION.md`, `RETENTION_PLAN.md` |
| source budget report | 완료 | `SOURCE_BUDGET_REPORT.md` |
| source budget 재검증 | 완료 | handwritten runtime 9,388 LOC, handwritten tests/E2E 3,235 LOC, generated/config/docs 제외 기준 `SOURCE_BUDGET_REPORT.md` |

## Design Requirements

| 요구사항 | 상태 | 근거 |
| --- | --- | --- |
| 첫 화면부터 실제 게임처럼 보임 | 완료 | v2 raster orchard/capybara integrated scene, carved header, wood currency plaques, next goal, 장기 목표, prestige mini progress, collection shelf, screenshots |
| 임시 개발자 UI 숨김 | 완료 | Debug panel hidden by default, only `?debug=1` in dev |
| 360x740 / 390x844 / 430x932 / desktop 중앙 패널 | 완료 | `visual-regression.spec.ts` viewport screenshots, `layout-regression.spec.ts` critical clipping/CTA/modal checks |
| 버튼/탭/모달/카드/상점/설정/튜토리얼 polish | 완료 | split CSS system in `layout.css`, `shell.css`, `hud.css`, `screens.css`, `effects.css`; `.ui-*` skin classes, custom `Toggle`, upgrade shelf/workbench, RC-6 quick-buy, RC-7 retention panels, settings ledger, save vault modal, save export copy action, reward/prestige/album reveal screenshots, visual QA |
| 직접 제작 visual asset | 완료 | 253 generated SVG auxiliary icon/quest/badge/decor/tier assets, 15 raster PNG core/release assets, v2 game HUD skin, `ART_FAILURE_REVIEW.md`, `ASSET_PRODUCTION_BRIEF.md`, `FINAL_ASSET_BRIEF.md` |
| Playwright screenshots | 완료 | `qa-screenshots/` 88 current PNG files, `store-screenshots/` 10 store 후보 PNG files, `qa-screenshots/rc1-before/` archive |
| Visual QA document | 완료 | `VISUAL_QA.md` |

## E2E Split

| 필수 E2E 파일 | 상태 | Debug shortcut 사용 여부 |
| --- | --- | --- |
| 신규 유저 플로우 | 완료: `e2e/new-user-flow.spec.ts` | 사용 안 함 |
| 업그레이드 플로우 | 완료: `e2e/upgrade-flow.spec.ts`, quick-buy 10/max 포함 | 사용 안 함 |
| 저장/로드 및 export/import | 완료: `e2e/save-import-export.spec.ts` | 사용 안 함 |
| 오프라인 보상 | 완료: `e2e/offline-reward.spec.ts`, staged reveal 포함 | 사용 안 함, 저장 fixture 사용 |
| 환생 | 완료: `e2e/prestige-flow.spec.ts`, result panel 포함 | 사용 안 함, 저장 fixture 사용 |
| 설정/튜토리얼 | 완료: `e2e/settings-tutorial.spec.ts`, effects-off state 포함 | 사용 안 함 |
| 광고/IAP mock | 완료: `e2e/monetization-mock.spec.ts` | 사용 안 함 |
| 모바일 레이아웃 스크린샷 | 완료: `e2e/visual-regression.spec.ts` | 사용 안 함 |
| debug/cheat QA | 완료: `e2e/debug-cheat-flow.spec.ts` | 별도 `?debug=1`에서만 사용 |
| retention flow | 완료: `e2e/retention-flow.spec.ts` | 사용 안 함 |
| RC-1 제품 감각 플로우 | 완료: `e2e/rc1-product-feel.spec.ts` | 사용 안 함 |
| RC-2 store screenshot pack | 완료: `e2e/store-screenshot-pack.spec.ts` | 사용 안 함, store용 seed save fixture 사용 |
| RC-3/RC-6 first five-minute playtest | 완료: `e2e/first-five-minute-playtest.spec.ts`, claim reveal 포함 | 사용 안 함, 실제 유저 플로우와 저장/오프라인 복귀 분리 |
| RC-8 release bug bash | 완료: `e2e/rc8-release-bug-bash.spec.ts` | 사용 안 함, daily+offline, prestige goal reload, quick-buy reload, 360px modal, tab switching |
| RC-12 layout regression | 완료: `e2e/layout-regression.spec.ts` | 사용 안 함, critical text clipping, bottom nav/CTA overlap, modal clickability, textarea zoom risk |
| RC-13/RC-14 strengthened layout/store guard | 완료: `e2e/layout-regression.spec.ts`, `e2e/store-screenshot-pack.spec.ts` | 사용 안 함, `data-ui-critical` clipping, toast non-blocking, store PNG dimensions, Google Play feature graphic dimensions |

## Store Submission Artifacts

| 산출물 | 상태 | 근거 |
| --- | --- | --- |
| `REQUIREMENTS_TRACE.md` | 완료 | 원본 0-26 매핑 |
| `COMPETITOR_BENCHMARK.md` | 완료 | 공식/스토어 공개 정보 기반 구조적 benchmark |
| `PRODUCTION_GAP_BACKLOG.md` | 완료 | P0/P1/P2 gap 분류 및 P0/P1 해결 기록 |
| `RELEASE_CHECKLIST.md` | 완료 | 제출 전 사용자 작업 포함 |
| `RELEASE_BLOCKERS.md` | 완료 | 내부 blocker와 외부 제출 blocker 분리 |
| `STORE_LISTING_DRAFT.md` | 완료 | 앱명, 설명, 키워드, 스크린샷 안내 |
| `PRIVACY_NOTES.md` | 완료 | localStorage/mock analytics/privacy notes |
| `ASSET_CREDITS.md` | 완료 | generated/CSS/SVG asset 출처와 라이선스 상태 |
| `ART_DIRECTION.md` | 완료 | 감정 키워드, 금지 키워드, 팔레트, 형태 언어, UI 원칙, QA gate |
| `ASSET_PRODUCTION_BRIEF.md` | 완료 | SVG auxiliary pack과 raster core art pack breakdown, registry/test contract, 교체 원칙 |
| `FINAL_ASSET_BRIEF.md` | 완료 | v2 raster key visual 제작 범위와 연결 gate |
| `FINAL_ART_AUDIT.md` | 완료 | SVG pass와 첫 raster pass 실패 판단, v2 HUD/raster before/after visual QA evidence |
| `AUDIO_ASSET_PLAN.md` | 완료 | audio slot/file replacement plan |
| `STORE_SCREENSHOT_PLAN.md` | 완료 | iPhone/Android store screenshot 후보 목록 |
| `NATIVE_BUILD_GUIDE.md` | 완료 | Capacitor readiness, icon/splash 경로, signing gap |
| `DEVICE_QA_CHECKLIST.md` | 완료 | iPhone/Android physical QA 항목 |
| `VISUAL_QA.md` | 완료 | screenshots and viewport audit |
| `PERFORMANCE_QA.md` | 완료 | RAF/effects/storage/perf checks |
| `RC4_UI_SKIN_AUDIT.md` | 완료 | home/upgrades/settings/save-modal/collection P1/P2 visual audit and CSS audit |
| `RC5_CSS_COMPONENT_AUDIT.md` | 완료 | CSS debt/component system audit, split stylesheet ownership, `.ui-*` skin classes, regenerated screenshots |
| `RC6_PRODUCT_FEEL_AUDIT.md` | 완료 | product feel severity audit, quick-buy P1 identification, reward/reveal/retention action plan |
| `RC7_RETENTION_SYSTEM_AUDIT.md` | 완료 | retention baseline, save v5 risk, implemented/excluded scope, P0/P1 mitigation |
| `RC8_RELEASE_CANDIDATE_AUDIT.md` | 완료 | release regression severity audit, WebView/storage/bundle/device readiness scope |
| `BUNDLE_ASSET_AUDIT.md` | 완료 | dist/runtime asset size, release-only raster exclusion, RC-14 large chunk warning removal, remaining raster payload P2 |
| `PRODUCT_QUALITY_RED_TEAM.md` | 완료 | RC-9 before audit, no-go 판정, P1 product-quality blocker 기록 |
| `SCREEN_SCORECARD.md` | 완료 | RC-9 screen scores, average 5.8, P1 target 근거 |
| `RC10_FIX_SCOPE.md` | 완료 | RC-10에서 고칠 P1과 제외할 P2/P3 범위 |
| `RC10_SCREEN_SCORECARD.md` | 완료 | RC-10 scorecard를 integrity pass에서 corrected 7.7 no-go 기준으로 보정 |
| `RC10_INTEGRITY_AUDIT.md` | 완료 | 이전 완료/커밋/푸시 보고와 실제 dirty worktree 불일치 기록 |
| `RC10_INDEPENDENT_RESCORE.md` | 완료 | RC-10 previous 8.2 self-score를 independent corrected 7.7로 보정, 남은 P1 기록 |
| `RC11_P1_KILL_SCOPE.md` | 완료 | RC-10에서 남은 upgrade/store P1만 좁게 수정하는 범위 기록 |
| `RC11_INDEPENDENT_RESCORE.md` | 완료 | RC-11 upgrade/store 재점수, combined 8.1, scoped product P1 해소 기록 |
| `UI_LAYOUT_DEFECT_AUDIT.md` | 완료 | RC-12 viewport별 글자 잘림, CTA/tab 겹침, modal 조작성, store screenshot copy 검사와 수정 기록 |
| `RC12_SUBMISSION_READINESS_AUDIT.md` | 완료 | 실제 제출 완료가 아닌 제출 준비 패키지 상태, 공식 규격 링크, 외부 blocker 분리 |
| `APP_ICON_SPLASH_EXPORT.md` | 완료 | icon/splash/source candidate와 platform export 필요 항목 기록 |
| `STORE_METADATA_PACKAGE.md` | 완료 | 공개 listing copy, screenshot order, URL/age rating/user-provided metadata gap 기록 |
| `RC13_SUBMISSION_AUDIT.md` | 완료 | 공식 Apple/Google/Capacitor 문서 확인, Android shell, iOS blocker, submission package 상태 |
| `RC13_NATIVE_READINESS_AUDIT.md` | 완료 | Android add/sync/doctor, iOS CocoaPods blocker, platform asset export evidence |
| `RC13_VISUAL_REGRESSION_AUDIT.md` | 완료 | final UI defect sweep, strengthened DOM/screenshot checks, remaining P2/P3 |
| `RC13_INDEPENDENT_RESCORE.md` | 완료 | internal UI average 8.1, native/submission external blockers 분리 |
| `RC14_RELEASE_READINESS_AUDIT.md` | 완료 | official docs, Android/iOS/build/store readiness, external blockers 분리 |
| `RC14_NATIVE_BUILD_AUDIT.md` | 완료 | Android config/build readiness, Java blocker, iOS CocoaPods blocker |
| `RC14_BUNDLE_OPTIMIZATION_AUDIT.md` | 완료 | Vite large chunk warning removal, JS chunk measurements, feature graphic export |
| `RC14_DEVICE_QA_PACKET.md` | 완료 | physical device QA matrix and execution packet |
| `DEVICE_QA_RESULTS_TEMPLATE.md` | 완료 | physical QA result 기록용 template |
| `RC14_INDEPENDENT_RESCORE.md` | 완료 | internal UI average 8.1, native/submission readiness external blockers 재분류 |
| `RC15_TOOLCHAIN_AUDIT.md` | 완료 | official toolchain docs, installed tools, env/account/code/asset blocker 분류 |
| `RC15_ANDROID_BUILD_AUDIT.md` | 완료 | Android debug APK, lint, manifest order fix, remaining asset/signing blockers |
| `RC15_IOS_READINESS_AUDIT.md` | 완료 | iOS shell add/sync, CocoaPods, xcodebuild scheme check, simulator platform blocker |
| `RC15_NATIVE_BUILD_RESULTS.md` | 완료 | build/test/e2e/cap/Gradle/iOS command results and artifact paths |
| `RC15_INDEPENDENT_RESCORE.md` | 완료 | Android/iOS/toolchain/store readiness rescore and remaining external blockers |
| `RC16_ANDROID_RELEASE_AUDIT.md` | 완료 | Android app signing official docs, local release signing config, current Android metadata |
| `RC16_RELEASE_ARTIFACT_REPORT.md` | 완료 | signed release APK/AAB artifact paths, sizes, `apksigner`, `jarsigner`, `bundletool` verification |
| `RC16_SIGNING_SECURITY_AUDIT.md` | 완료 | ignored keystore/secret policy, local key fingerprint, git hygiene evidence |
| `GOOGLE_PLAY_RELEASE_CHECKLIST.md` | 완료 | Play App Signing/upload key distinction, internal testing runbook, external checklist |
| `RC16_INDEPENDENT_RESCORE.md` | 완료 | Android signing/release AAB readiness rescore and external blockers |
| `RETENTION_PLAN.md` | 완료 | D0/D1/D3/D7 goals, daily/milestone/post-prestige rewards, remaining P2/P3 follow-ups |
| 기존 문서 최신화 | 완료 | README/DEVELOPER/BALANCE/SAVE/QA/PLAYTEST updated |

## P0/P1 Blockers

기술/기능 기준의 내부 P0/P1 `미완료`, `검증 불가`, 문서 불일치, 모바일 주요 화면 깨짐, 저장/환생/오프라인 보상 blocking issue는 현재 발견되지 않았다. RC-9 독립 감사와 RC-10 no-go 보정은 before evidence로 보존한다. RC-11에서 upgrade quick-buy/shelf 8.1, store screenshot framing 8.1, combined 8.1로 scoped product-quality P1을 해소했다. RC-14에서 layout regression과 store screenshot/feature graphic guard를 강화해 주요 viewport의 critical text clipping, CTA/tab overlap, modal action clickability, store public copy/dimension을 검증했다. RC-15에서 Android debug APK와 iOS shell/sync를 실제로 검증했고, RC-16에서 local signed release APK/AAB를 검증했다. 실제 스토어 제출 완료를 막는 외부 계정/production signing/Play App Signing/Xcode simulator platform/commissioned art 소유권/final adaptive icon/실기기 QA, 서버 검증 calendar/push notification 항목은 `RELEASE_BLOCKERS.md`에 external readiness로 별도 분리했다.
