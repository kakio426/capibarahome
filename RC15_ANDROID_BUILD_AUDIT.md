# RC-15 Android Build Audit

기준일: 2026-05-09

## Native Config

| 항목 | 결과 | 판정 |
| --- | --- | --- |
| Android folder | `android/` exists | 통과 |
| Namespace | `com.capybarabutler.game` | 통과 |
| applicationId | `com.capybarabutler.game` | 통과 |
| App label | `카피바라 집사기` | 통과 |
| versionCode / versionName | `1` / `1.0` | 제출 전 최종 확정 필요 |
| minSdk / targetSdk / compileSdk | `23` / `35` / `35` | 통과 |
| Permission | `android.permission.INTERNET` only | 통과 |
| Orientation | not locked in manifest | device QA에서 정책 확인 필요 |
| Launcher activity exported | `true` for main launcher | 통과 |
| Icon/adaptive icon | native candidate resources exist | P2 asset polish remains |
| Splash | native splash PNG candidates exist | P2 density/final art polish remains |
| Release signingConfig | not configured | external signing blocker |
| Android keystore | not provided | external signing blocker |

## Build Commands

RC-15 initially tried JDK 17 because it is a common Android baseline. That failed:

```txt
cd android && ./gradlew assembleDebug
Execution failed for task ':capacitor-android:compileDebugJavaWithJavac'.
error: invalid source release: 21
```

This was classified as an environment/JDK mismatch, not a game code blocker. After installing and exporting JDK 21:

```txt
cd android && ./gradlew assembleDebug
BUILD SUCCESSFUL in 26s
```

APK:

```txt
android/app/build/outputs/apk/debug/app-debug.apk
size: 19M
```

Lint:

```txt
cd android && ./gradlew lint
BUILD SUCCESSFUL
```

The first lint run reported a manifest order warning, which was fixed by moving `uses-permission` before `application`.

## Remaining Android Lint Warnings

Lint passes with warnings only. Remaining items are not RC-15 code blockers:

| Warning group | Classification | Reason |
| --- | --- | --- |
| AndroidX dependency newer versions available | P3 | Capacitor generated project can be upgraded in a separate dependency pass |
| Capacitor-generated unused resources | P3 | Generated shell resources; no runtime failure |
| Launcher icon square/round/monochrome warnings | P2 asset readiness | Current icon is a candidate; final adaptive/monochrome icon needs design approval |
| Splash density/duplicate warnings | P2 asset readiness | Candidate splash works for shell, final platform export should be checked on device |

## Release Readiness

RC-15 기준 debug build만 verified였고 release signing은 intentionally not configured 상태였다. RC-16에서 이 항목은 local signed release rehearsal로 갱신됐다.

External requirements before Google Play upload:

- Google Play Console account
- final package name approval
- production Android upload keystore
- Play App Signing enrollment / upload key registration
- final icon/adaptive/monochrome/splash approval
- privacy/support URL
- physical Android QA

## Decision

Android native debug build readiness is verified by a real Gradle `assembleDebug` artifact. RC-16 added local rehearsal release signing and verified signed release APK/AAB generation. Remaining Android production release blockers are Play Console account, production upload key, Play App Signing enrollment, final asset approval, privacy/support URL, and physical device QA.
