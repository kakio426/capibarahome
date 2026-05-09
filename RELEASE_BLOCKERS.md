# Release Blockers

기준일: 2026-05-09

## Internal RC Blockers

| 항목 | 상태 | 근거 |
| --- | --- | --- |
| TypeScript/build 실패 | 없음 | `npm run build` 통과 |
| unit/simulation test 실패 | 없음 | `npm test` 23 files / 502 tests passed |
| E2E 실패 | 없음 | `npm run test:e2e` 37 passed |
| 실제 유저 플로우 debug 의존 | 없음 | debug는 `e2e/debug-cheat-flow.spec.ts`에 격리 |
| 모바일 overflow/주요 화면 깨짐 | 없음 | `visual-regression.spec.ts` viewport screenshot/overflow 검증 및 `layout-regression.spec.ts` critical clipping/CTA overlap 검증 통과 |
| 저장/환생/오프라인 보상 blocking issue | 없음 | unit + E2E coverage |
| 문서 불일치 | 없음 | RC-10 integrity pass에서 previous 8.2 self-score를 보정했고, RC-11에서 scoped P1 해소 후 `RC11_INDEPENDENT_RESCORE.md`, `SPEC_COVERAGE.md`, `QA_REPORT.md`, `VISUAL_QA.md`, `RELEASE_CHECKLIST.md`, `RELEASE_BLOCKERS.md`를 최신 기준으로 재정렬 |
| content inflation P1 | 없음 | `CONTENT_INTEGRATION_AUDIT.md`, 누락 decoration hero visual 11개 수정 |
| visual defect P1 | 없음 | `VISUAL_DEFECTS.md`, save modal/tab/toast 수정 |
| RC-1 reward feel P1 | 없음 | companion passive, achievement claim reward, long-term goal, WebAudio mute, RC-1 tests/E2E 추가 |
| direct art/CSS readiness P1 | 없음 | 첫 raster pass 실패 기록 후 v2 HUD/raster pass 적용, `layout.css` 통합 정리, 253 SVG auxiliary files, 15 raster PNG core/release assets, `visualAssetIntegrity.test.ts`, `rasterAssetIntegrity.test.ts`, art direction docs |
| RC-4 webapp control smell P1 | 없음 | upgrade workbench/shelf cards, settings ledger/drawer, save vault modal, custom settings switch, save export copy action, carved modal/toast/disabled controls, refreshed visual/store screenshots |
| RC-5 CSS/component debt P1 | 없음 | `layout.css` import manifest, `shell/hud/screens/effects` split, `.ui-*` skin system, visualAssetIntegrity runtime CSS coverage, refreshed visual/store screenshots |
| RC-6 product feel P1 | 없음 | quick-buy 1/10/max, BigNumber purchase plan tests, reward/prestige/album reveal, D1/D3/D7 retention docs, RC-6 E2E assertions |
| RC-7 retention P1 | 없음 | daily reward, D1/D3/D7 milestone, post-prestige goal chain, save v5 migration, duplicate guard, retention E2E/screenshots |
| RC-8 release bug bash P1 | 없음 | save v5 regression, offline+daily same session, prestige goal reload, quick-buy reload, long-session stress, localStorage/pagehide fallback, safe-area/WebView prep, bundle audit |
| RC-3 playtest/balance/bug bash P1 | 없음 | 첫 환생 33분, 실제 5분권 E2E, migration/corrupt import/rapid tap/reward duplicate tests, store screenshot 재감사 |
| RC-9 product-quality P1 | 해결 | RC-9 `PRODUCT_QUALITY_RED_TEAM.md`와 `SCREEN_SCORECARD.md`는 before audit로 보존. RC-10 no-go 보정 이후 RC-11에서 남은 upgrade/store P1을 좁게 수정했고 `RC11_INDEPENDENT_RESCORE.md` 기준 combined 8.1 |
| RC-10 product-quality score gate | no-go 보존 | `RC10_INDEPENDENT_RESCORE.md` 기준 combined 7.7 no-go 기록은 삭제하지 않는다. 이는 RC-11 전 상태의 before evidence다 |
| RC-11 scoped product-quality score gate | 없음 | upgrade quick-buy/shelf 8.1, store screenshots 8.1, combined 8.1. daily/milestone은 8.0 near gate로 P2 polish 후보 |
| RC-12 layout/submission readiness P1 | 없음 | `UI_LAYOUT_DEFECT_AUDIT.md`, `RC12_SUBMISSION_READINESS_AUDIT.md`, `e2e/layout-regression.spec.ts` 4 passed, store screenshot public copy/file/clipping guards |
| RC-13 final UI/native prep P1 | 없음 | `RC13_VISUAL_REGRESSION_AUDIT.md`, `RC13_INDEPENDENT_RESCORE.md`, strengthened `layout-regression.spec.ts` 4 passed, store screenshot dimension guard, Android shell/sync evidence |
| RC-14 native build/layout/bundle P1 | 없음 | `RC14_RELEASE_READINESS_AUDIT.md`, `RC14_NATIVE_BUILD_AUDIT.md`, `RC14_BUNDLE_OPTIMIZATION_AUDIT.md`; Vite large chunk warning removed, layout regression 4 passed, visual/store screenshot 7 passed, feature graphic guard added. Android Gradle/iOS shell blockers are environment/external |
| RC-15 native toolchain/build P1 | 없음 | JDK 21, Android command-line tools, Android SDK 35, CocoaPods installed; Android `assembleDebug` and `lint` passed; iOS `cap add/sync` passed. Remaining iOS simulator/platform and signing/account items are environment/external blockers |
| RC-16 Android signed release rehearsal P1 | 없음 | Local rehearsal signing config, ignored `android/keystore.properties`, ignored `local-upload-test.jks`, `assembleRelease`, `bundleRelease`, `apksigner`, `jarsigner`, and `bundletool validate` passed. Production upload key/Play Console remain external |

## Source Budget Audit Gate

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| generated/config/docs 제외 구현량 | 기록 완료 | runtime 9,388 LOC, handwritten tests/E2E 3,235 LOC |
| 이전 대형 `src` LOC 주장 | 완료 근거로 사용 금지 | generated SVG/registry 11,533 LOC와 generated tests 5,846 LOC는 별도 분리 |
| 콘텐츠 실제 연결성 | 통과 | 30 upgrades/facilities, 50 quests, 40 achievements with claim rewards, 25 decorations, 8 capybaras with passive abilities, 5 tiers 항목별 감사 |

## External Store Submission Blockers

아래는 실제 App Store / Google Play 제출 전 사용자가 제공해야 하는 항목이다. 현재 프로젝트의 내부 P0/P1은 아니지만, 실제 제출 완료를 막는 외부 blocker다.

- Apple Developer Program 계정
- Google Play Console 계정
- Bundle ID / package name 최종 확정
- macOS `java_home` optional symlink or persistent shell export for Homebrew JDK 21 if the user wants Java available outside this terminal
- Xcode iOS platform/CoreSimulator component update. RC-15 `xcodebuild` failed because CoreSimulator was out of date and iOS 26.4 platform was not installed
- iOS signing certificate / provisioning profile
- Android production upload signing key. RC-16 generated only a local rehearsal key; it is not a final production key
- Google Play App Signing enrollment / upload key registration
- commissioned/final art ownership and legal approval
- final adaptive icon foreground/background art and final splash approval. 현재 `platform-assets/` 후보와 Android launcher res 후보는 있음
- Google Play feature graphic final approval. 현재 `store-screenshots/google-play-feature-graphic.png` 후보는 있음
- privacy policy URL
- support URL
- age rating answers
- export compliance answers
- 실제 광고 SDK 선택 및 privacy disclosure
- 실제 IAP product IDs, pricing, store metadata
- 물리 iPhone/Android 기기 QA
- 서버 검증 daily calendar, push notification, 계정 기반 복귀 보상 동기화

## Decision

기술/검증 기준의 내부 P0/P1 blocker는 현재 발견되지 않았다. RC-10 integrity pass에서 previous `8.2 / 10` self-score를 `7.7 / 10` no-go로 보정한 기록은 before evidence로 보존한다. RC-11에서는 남은 product-quality P1인 upgrade quick-buy/shelf와 store screenshot framing을 좁게 수정했고, `RC11_INDEPENDENT_RESCORE.md` 기준 combined average는 `8.1 / 10`이다. RC-14에서는 Vite large chunk warning을 제거하고, layout regression과 store screenshot/feature graphic guard를 통과했다. RC-15에서는 Android debug APK build와 lint, iOS shell add/sync까지 검증했다. RC-16에서는 local rehearsal key로 signed release APK/AAB 생성을 검증했다. 실제 스토어 제출 완료로 주장하지 않는다. Xcode simulator platform mismatch, production signing, Play App Signing enrollment, store 계정, privacy/support URL, commissioned/final art ownership, real audio files, SDK, 물리 기기 QA, 서버 검증 calendar/push notification은 external readiness blocker로 남긴다.
