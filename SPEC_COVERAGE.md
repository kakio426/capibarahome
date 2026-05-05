# Spec Coverage

기준일: 2026-05-05

상태 기준: `완료`는 실제 구현 파일과 테스트, E2E, screenshot, build 산출물 중 하나 이상의 근거가 있을 때만 사용한다. 기존 RC 요구사항과 확장 목표의 P0/P1 blocking issue는 현재 없음으로 판단한다.

## Release Gate

| 요구사항 | 상태 | 근거 |
| --- | --- | --- |
| `AGENTS.md`, `PROJECT_SPEC.md` 선확인 | 완료 | 구현 전 확인 및 `PROJECT_SPEC.md` RC spec으로 교체 |
| 원본 0-26 요구사항 누락 방지 | 완료 | `REQUIREMENTS_TRACE.md` |
| 경쟁작 벤치마크 | 완료 | `COMPETITOR_BENCHMARK.md` |
| gap backlog와 P0/P1 해결 | 완료 | `PRODUCTION_GAP_BACKLOG.md` |
| release blocker 분리 | 완료 | `RELEASE_BLOCKERS.md` |
| `npm run build` | 완료 | `tsc -b && vite build`, success |
| `npm test` | 완료 | Vitest 21 files, 479 tests passed |
| `npm run test:e2e` | 완료 | Playwright 21 tests passed |
| Capacitor packaging prep | 완료 | `capacitor.config.ts`, scripts, `npm run cap:sync` success |
| 실제 스토어 업로드 미수행 | 완료 | 계정/인증서/프로비저닝 미제공. `RELEASE_CHECKLIST.md`와 `RELEASE_BLOCKERS.md`에 사용자 작업으로 분리 |

## Core Scope

| 요구사항 | 상태 | 구현 근거 | 검증 근거 |
| --- | --- | --- | --- |
| 중앙 밸런스 config | 완료 | `GameConfig.ts`, `BalanceConfig.ts`, `MonetizationConfig.ts` | `balance.test.ts` |
| BigNumberLite | 완료 | `core/BigNumberLite.ts` | `balance.test.ts` |
| RAF 게임 루프 | 완료 | `GameLoop.ts`, display update throttle, visibility handling | `gameLoop.test.ts` |
| 터치 수익 | 완료 | `GameActions.tapOrange`, `MainGameScreen` | `new-user-flow.spec.ts` |
| EPS 자동 수익 | 완료 | `GameEngine.advanceGameState`, `GameSelectors` | `gameLoop.test.ts`, `upgrade-flow.spec.ts` |
| 업그레이드 | 완료 | `UpgradeManager.ts`, `UpgradePanel.tsx`, 30 upgrade/facility items | `upgrade.test.ts`, `contentConfig.test.ts`, `upgrade-flow.spec.ts` |
| 진행 목표/컬렉션 | 완료 | `selectNextUpgradeGoal`, `selectQuestBoard`, `selectCollectionDashboard`, companion ability, achievement reward claim, home/album UI | `progression.test.ts`, `questManager.test.ts`, `collectionManager.test.ts`, `rc1Rewards.test.ts`, `rc1-product-feel.spec.ts` |
| 환생 | 완료 | `PrestigeManager.ts`, `PrestigePanel.tsx` | `prestige.test.ts`, `prestige-flow.spec.ts` |
| 저장/로드 | 완료 | `SaveManager.ts`, localStorage, checksum, Base64 | `save.test.ts`, `save-import-export.spec.ts` |
| 오프라인 보상 | 완료 | `OfflineRewardManager.ts`, return modal | `offline.test.ts`, `offline-reward.spec.ts` |
| 설정 | 완료 | `SettingsManager.ts`, `SettingsModal.tsx`, sound mute 연결 | `settings.test.ts`, `settings-tutorial.spec.ts`, `rc1-product-feel.spec.ts` |
| 튜토리얼 | 완료 | `TutorialManager.ts`, `TutorialOverlay.tsx`, target highlight | `tutorial.test.ts`, `settings-tutorial.spec.ts` |
| 광고/IAP mock provider | 완료 | `AdsManager.ts`, `IAPManager.ts`, `MonetizationEventManager.ts` | `monetization.test.ts`, `monetization-mock.spec.ts` |
| 디버그 도구 | 완료 | `DebugManager.ts`, `?debug=1` gated panel | `debug-cheat-flow.spec.ts` |
| analytics mock | 완료 | `AnalyticsManager.ts` | unit/E2E action flows |
| 에셋 파이프라인 | 완료 | `AssetManager.ts`, `builtinAssets.ts`, `scripts/generateVisualAssets.mjs`, 253 hand-authored SVG auxiliary files, `RasterAssetRegistry.ts`, `RasterAssetImage.tsx`, 15 raster PNG files | `assetRegistryMatrix.test.ts`, `visualAssetIntegrity.test.ts`, `rasterAssetIntegrity.test.ts`, screenshots |
| release QA | 완료 | `QA_REPORT.md`, `VISUAL_QA.md`, `PERFORMANCE_QA.md`, `RELEASE_BLOCKERS.md` | final command outputs |

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
| mascot visual 5상태 | 완료 | `MainGameScreen.tsx`, `layout.css`, `AssetConfig.ts`, `src/assets/generated/mascots/` |
| app icon/splash/store art 후보 | 완료 | `src/assets/raster/release/app-icon-candidate.png`, `store-key-visual.png`; splash/frame SVG 후보는 `src/assets/generated/release/`에 보조 후보로 유지 |
| balance simulation | 완료 | `BalanceSimulator.ts`, `balanceSimulation.test.ts`, `BALANCE_SIMULATION.md` |
| source budget report | 완료 | `SOURCE_BUDGET_REPORT.md` |
| source budget 재검증 | 완료 | handwritten runtime 6,721 LOC, handwritten tests/E2E 2,285 LOC, generated/config/docs 제외 기준 `SOURCE_BUDGET_REPORT.md` |

## Design Requirements

| 요구사항 | 상태 | 근거 |
| --- | --- | --- |
| 첫 화면부터 실제 게임처럼 보임 | 완료 | v2 raster orchard/capybara integrated scene, carved header, wood currency plaques, next goal, 장기 목표, prestige mini progress, collection shelf, screenshots |
| 임시 개발자 UI 숨김 | 완료 | Debug panel hidden by default, only `?debug=1` in dev |
| 360x740 / 390x844 / 430x932 / desktop 중앙 패널 | 완료 | `visual-regression.spec.ts`, 52 screenshots |
| 버튼/탭/모달/카드/상점/설정/튜토리얼 polish | 완료 | `layout.css`, screenshots, visual QA |
| 직접 제작 visual asset | 완료 | 253 generated SVG auxiliary icon/quest/badge/decor/tier assets, 15 raster PNG core/release assets, v2 game HUD skin, `ART_FAILURE_REVIEW.md`, `ASSET_PRODUCTION_BRIEF.md`, `FINAL_ASSET_BRIEF.md` |
| Playwright screenshots | 완료 | `qa-screenshots/` 52 current PNG files, `store-screenshots/` 10 store 후보 PNG files, `qa-screenshots/rc1-before/` archive |
| Visual QA document | 완료 | `VISUAL_QA.md` |

## E2E Split

| 필수 E2E 파일 | 상태 | Debug shortcut 사용 여부 |
| --- | --- | --- |
| 신규 유저 플로우 | 완료: `e2e/new-user-flow.spec.ts` | 사용 안 함 |
| 업그레이드 플로우 | 완료: `e2e/upgrade-flow.spec.ts` | 사용 안 함 |
| 저장/로드 및 export/import | 완료: `e2e/save-import-export.spec.ts` | 사용 안 함 |
| 오프라인 보상 | 완료: `e2e/offline-reward.spec.ts` | 사용 안 함, 저장 fixture 사용 |
| 환생 | 완료: `e2e/prestige-flow.spec.ts` | 사용 안 함, 저장 fixture 사용 |
| 설정/튜토리얼 | 완료: `e2e/settings-tutorial.spec.ts` | 사용 안 함 |
| 광고/IAP mock | 완료: `e2e/monetization-mock.spec.ts` | 사용 안 함 |
| 모바일 레이아웃 스크린샷 | 완료: `e2e/visual-regression.spec.ts` | 사용 안 함 |
| debug/cheat QA | 완료: `e2e/debug-cheat-flow.spec.ts` | 별도 `?debug=1`에서만 사용 |
| RC-1 제품 감각 플로우 | 완료: `e2e/rc1-product-feel.spec.ts` | 사용 안 함 |
| RC-2 store screenshot pack | 완료: `e2e/store-screenshot-pack.spec.ts` | 사용 안 함, store용 seed save fixture 사용 |
| RC-3 first five-minute playtest | 완료: `e2e/first-five-minute-playtest.spec.ts` | 사용 안 함, 실제 유저 플로우와 저장/오프라인 복귀 분리 |

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
| 기존 문서 최신화 | 완료 | README/DEVELOPER/BALANCE/SAVE/QA/PLAYTEST updated |

## P0/P1 Blockers

기존 RC 및 확장 목표 기준의 내부 P0/P1 `미완료`, `검증 불가`, 문서 불일치, 모바일 주요 화면 깨짐, 저장/환생/오프라인 보상 blocking issue 없음. 실제 스토어 제출 완료를 막는 외부 계정/서명/commissioned art 소유권/platform icon export/실기기 QA 항목은 `RELEASE_BLOCKERS.md`에 P1 external readiness로 별도 분리했다.
