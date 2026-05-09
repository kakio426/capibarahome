# RC-15 Independent Rescore

기준일: 2026-05-09

RC-15 점수는 자동 테스트 수나 문서 수가 아니라 실제 native toolchain/build evidence와 blocker clarity를 기준으로 한다.

| 항목 | 점수 | 분류 | 근거 |
| --- | ---: | --- | --- |
| Android toolchain readiness | 8.4 | pass | JDK 21, Android command-line tools, SDK 35, Gradle 8.11.1 verified |
| Android debug build readiness | 8.7 | pass | `assembleDebug` passed, APK generated at `android/app/build/outputs/apk/debug/app-debug.apk` |
| Android release readiness | 7.4 | P2/external | native config OK, but release keystore/signing/final icon warnings/physical QA remain |
| iOS toolchain readiness | 7.7 | environment blocker | Xcode and CocoaPods installed, but CoreSimulator/iOS platform mismatch blocks simulator build |
| iOS shell readiness | 8.1 | pass candidate | `npx cap add ios`, `npx cap sync ios`, `npx cap doctor` passed |
| Native smoke test readiness | 8.2 | pass candidate | runbooks updated; Android APK available; iOS needs Xcode platform/signing |
| Store submission readiness | 7.8 | external blocker | metadata/screenshots/assets ready candidates, but URLs/accounts/signing/legal/physical QA absent |
| Remaining external blocker clarity | 8.6 | pass | blockers separated into environment/account/code/asset/external QA |

## Internal Code Blocker Check

No RC-15 internal code blocker remains after fixing Android manifest permission order. Android lint still has non-fatal warnings around dependency freshness, generated resources, final launcher icon shape/monochrome, and splash density. These are P2/P3 or external asset readiness items.

## UI/Layout Spot Score

Representative regenerated screenshots remained at RC-14/RC-13 quality:

| Screen | Score | Notes |
| --- | ---: | --- |
| Home 360x740 | 8.1 | no CTA/tab occlusion |
| Upgrades quick-buy 390x844 | 8.1 | no bottom dock overlap; quick-buy shelf remains game-skinned |
| Save modal 390x844 | 8.0 | code area scroll/wrap intact, actions clickable |
| Milestones 390x844 | 8.0 | no CTA/tab overlap |
| Prestige result 390x844 | 8.2 | ceremony remains readable |
| Store screenshots | 8.1 | no public internal/mock wording; dimensions guarded |

## Decision

RC-15 clears the Android debug build environment blocker and the iOS shell generation blocker. It does not clear iOS simulator/build signing, Android release signing, final store asset approval, or physical device QA. Product UI P1 did not regress in automated or manual screenshot checks.
