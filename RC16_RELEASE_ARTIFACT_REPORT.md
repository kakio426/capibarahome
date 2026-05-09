# RC-16 Release Artifact Report

기준일: 2026-05-09

## Build Commands

All Android native build commands used Homebrew JDK 21:

```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="/opt/homebrew/share/android-commandlinetools"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
```

| Command | Result |
| --- | --- |
| `npm run build` | passed |
| `npm run cap:sync` | passed |
| `npx cap sync android` | passed |
| `cd android && ./gradlew clean` | passed |
| `cd android && ./gradlew assembleDebug` | passed |
| `cd android && ./gradlew lint` | passed |
| `cd android && ./gradlew assembleRelease` | passed |
| `cd android && ./gradlew bundleRelease` | passed |

## Artifacts

| Artifact | Path | Size | Git status |
| --- | --- | ---: | --- |
| Debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` | 19M | ignored |
| Signed release APK | `android/app/build/outputs/apk/release/app-release.apk` | 18M | ignored |
| Signed release AAB | `android/app/build/outputs/bundle/release/app-release.aab` | 18M | ignored |

## APK Verification

`apksigner verify --verbose --print-certs` on `app-release.apk`:

| 항목 | 결과 |
| --- | --- |
| Verifies | yes |
| v1 scheme | true |
| v2 scheme | true |
| v3/v3.1/v4 | false / false / false |
| Signer | local rehearsal certificate |
| Key algorithm / size | RSA / 4096 |

The APK verifier emitted metadata warnings for unsigned `META-INF` dependency metadata entries. The release APK still verifies with v1/v2 signing. This is recorded as P3 investigation, not a release rehearsal blocker.

## AAB Verification

| Tool | Result |
| --- | --- |
| `jarsigner -verify app-release.aab` | `jar verified`; self-signed local certificate warning expected |
| `bundletool version` | `1.18.3` |
| `bundletool validate --bundle=app-release.aab` | exit code 0; bundle information printed |
| `bundletool dump manifest --bundle=app-release.aab --module=base` | package/version/permission/icon manifest values readable |

`bundletool validate` emitted Java/protobuf deprecation warnings under Homebrew's Java runtime. It did not fail validation.

## Manifest / Metadata Check

| 항목 | 결과 |
| --- | --- |
| package | `com.capybarabutler.game` |
| versionCode / versionName | `1` / `1.0` |
| minSdk / targetSdk / compileSdk | `23` / `35` / `35` |
| label | `카피바라 집사기` |
| icon / roundIcon | connected to launcher resources |
| debuggable | no release manifest `android:debuggable`; Gradle release build sets `debuggable false` |
| permissions | `android.permission.INTERNET` plus AndroidX generated dynamic receiver permission |

## Decision

Local signed release APK and signed release AAB generation is verified. These artifacts are not committed and are not production-signed. Google Play upload remains unperformed.
