# RC-15 Toolchain Audit

기준일: 2026-05-09

## Scope

RC-15는 새 게임 기능 추가가 아니라 native toolchain 설치/검증 pass다. 실제 App Store / Google Play 제출 완료가 아니다.

## Official Docs Checked

2026-05-09에 아래 공식 문서를 확인했다.

| 범위 | 공식 문서 |
| --- | --- |
| Android Gradle Plugin 8.7 release | https://developer.android.com/build/releases/agp-8-7-0-release-notes |
| Gradle Java compatibility | https://docs.gradle.org/current/userguide/compatibility.html |
| Capacitor Android | https://capacitorjs.com/docs/android |
| Capacitor iOS | https://capacitorjs.com/docs/ios |
| Capacitor splash/icons | https://capacitorjs.com/docs/guides/splash-screens-and-icons |
| CocoaPods getting started | https://guides.cocoapods.org/using/getting-started.html |
| Apple Xcode | https://developer.apple.com/xcode/ |
| App Store Connect help | https://developer.apple.com/help/app-store-connect/ |

## Git Baseline

| 항목 | 결과 |
| --- | --- |
| Branch | `rc3-playtest-bug-bash` |
| Baseline commit | `750df66 fix: prepare rc14 native build and device qa package` |
| Initial status | clean, tracking `origin/rc3-playtest-bug-bash` |

## Initial Toolchain State

| 항목 | RC-15 시작 상태 |
| --- | --- |
| Node | `v24.14.1` |
| npm | `11.11.0` |
| Capacitor CLI | `7.6.2` |
| Java | missing: `Unable to locate a Java Runtime` |
| `JAVA_HOME` | empty |
| Homebrew | `5.1.7` |
| Ruby / gem | system Ruby `2.6.10`, gem `3.0.3.1` |
| CocoaPods | missing: `pod: command not found` |
| Xcode | `Xcode 26.4.1`, build `17E202` |
| xcode-select | `/Applications/Xcode.app/Contents/Developer` |
| Android SDK env | `ANDROID_HOME` / `ANDROID_SDK_ROOT` empty |
| Android platform | `android/` present |
| iOS platform | `ios/` missing |

## Installed During RC-15

Homebrew로 아래 도구를 설치했다. `sudo`, Apple ID login, keychain, signing certificate, Android keystore 생성은 수행하지 않았다.

| Tool | Result | Notes |
| --- | --- | --- |
| `openjdk@17` | installed `17.0.19` | initial Android build failed because Capacitor Android compile requested Java source release 21 |
| `openjdk@21` | installed `21.0.11` | used for Gradle/Android build verification |
| `android-commandlinetools` | installed | SDK root: `/opt/homebrew/share/android-commandlinetools` |
| Android SDK packages | installed | `platform-tools 37.0.0`, `platforms;android-35`, `build-tools;35.0.0`, Gradle also installed `build-tools;34.0.0` |
| `cocoapods` | installed `1.16.2` | used by `npx cap add ios` / `npx cap sync ios` |

Homebrew install commands completed the actual installs, but Homebrew cleanup emitted `undefined method 'to_sym' for nil` and returned exit code 1. This was not a tool installation failure; follow-up version/build commands confirmed all tools were usable.

## Current Shell Setup Used For Verification

```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="/opt/homebrew/share/android-commandlinetools"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
```

`/usr/libexec/java_home -V` still does not list the Homebrew JDK because no sudo symlink was created. This is not a build blocker when `JAVA_HOME` is exported. If the user wants macOS Java wrappers to discover it globally, they must decide whether to run the Homebrew caveat command manually.

## Post-Install Toolchain State

| 항목 | 결과 |
| --- | --- |
| `java -version` | OpenJDK `21.0.11` with RC-15 `JAVA_HOME` |
| `pod --version` | `1.16.2` |
| `sdkmanager --version` | `20.0` |
| Android SDK packages | Build Tools 34/35, Platform Tools 37, Android 35 platform |
| `cd android && ./gradlew --version` | Gradle `8.11.1`, launcher JVM `21.0.11` |
| `npx cap doctor` | Android looking great, iOS looking great; installed Capacitor 7.6.2, latest 8.3.3 |

## Blocker Classification

| Blocker | Status | Classification |
| --- | --- | --- |
| Missing Java runtime | Resolved for current shell | Environment blocker cleared by Homebrew JDK 21 |
| Missing Android SDK | Resolved for current shell | Environment blocker cleared by command-line tools and Android 35 packages |
| Missing CocoaPods | Resolved | Environment blocker cleared by Homebrew CocoaPods |
| macOS `java_home` cannot discover Homebrew JDK | Remaining | Environment P3; document shell export or optional user-managed symlink |
| Homebrew cleanup bug | Remaining | Environment P3; installs verified, not a code blocker |
| Xcode CoreSimulator/iOS platform mismatch | Remaining | Environment blocker for simulator/native iOS build |
| Apple/Google accounts, signing, keystore, URLs | Remaining | External submission blockers |

## Decision

Android debug build readiness is now verified with JDK 21 and Android SDK 35. iOS native shell creation and sync are verified with CocoaPods, but simulator/native iOS build is blocked by local Xcode/iOS platform component mismatch and later by signing/account requirements. No RC-15 game code blocker was found.
