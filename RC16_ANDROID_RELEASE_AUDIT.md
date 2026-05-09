# RC-16 Android Release Audit

기준일: 2026-05-09

## Scope

RC-16은 Android signed release rehearsal이다. 실제 production upload key, Google Play Console 업로드, Play App Signing 등록, 실제 배포는 수행하지 않았다.

## Official Docs Checked

2026-05-09에 아래 공식 문서를 확인했다.

| 범위 | 공식 문서 |
| --- | --- |
| Android app signing | https://developer.android.com/studio/publish/app-signing |
| Google Play App Signing | https://support.google.com/googleplay/android-developer/answer/9842756 |
| Android command-line build | https://developer.android.com/build/building-cmdline |
| Android App Bundle | https://developer.android.com/guide/app-bundle |

## Baseline

| 항목 | 결과 |
| --- | --- |
| Branch | `rc3-playtest-bug-bash` |
| Baseline commit | `fe80f85 fix: verify rc15 native toolchain and android build` |
| Initial status | clean, tracking `origin/rc3-playtest-bug-bash` |
| Java | OpenJDK `21.0.11` via Homebrew `openjdk@21` for Gradle |
| Gradle | `8.11.1` |
| Android folder | `android/` exists |

## Android Config

| 항목 | 결과 |
| --- | --- |
| namespace / applicationId | `com.capybarabutler.game` |
| app label | `카피바라 집사기` |
| versionCode / versionName | `1` / `1.0` |
| minSdk / targetSdk / compileSdk | `23` / `35` / `35` |
| permissions | `android.permission.INTERNET`; AndroidX generated dynamic receiver permission appears in built manifest |
| release debuggable | `false`; no `android:debuggable` attribute in release manifest dump |
| release signing config before RC-16 | not configured |
| release signing config after RC-16 | local rehearsal signing config loaded from ignored `android/keystore.properties` |

## Changes

- Added `android/keystore.properties.example` with placeholder values only.
- Updated `android/.gitignore` so `.jks`, `.keystore`, `keystore.properties`, release signing property files, password files, and `android/keystores/` are ignored.
- Updated `android/app/build.gradle` to load release signing secrets from `android/keystore.properties`.
- Release Gradle tasks now fail with a clear message if `android/keystore.properties` is missing or incomplete.
- Generated a local-only rehearsal key at `android/keystores/local-upload-test.jks`.
- Verified the missing-secret failure path by temporarily moving `android/keystore.properties`; `./gradlew assembleRelease` failed with `Missing android/keystore.properties...`.

## Security Gate

`git ls-files | grep -E '\.jks|\.keystore|keystore.properties|release-signing.properties'` returns only `android/keystore.properties.example`, which is a placeholder template. No tracked secret `.jks`, `.keystore`, real `keystore.properties`, or release signing property file exists. The local rehearsal `.jks` and `android/keystore.properties` are ignored and are not commit candidates.

## Decision

Android release signing structure is ready for local rehearsal. It is not a production signing setup. A production upload key, secure backup, Google Play App Signing enrollment, and Play Console upload remain user-controlled external steps.
