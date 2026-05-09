# Native Build Guide

기준일: 2026-05-09

## 현재 준비 상태

Capacitor web/native 준비는 RC-15 기준 아래 상태다.

| 항목 | 상태 |
| --- | --- |
| Config | `capacitor.config.ts` |
| Web output | `dist` |
| App name candidate | `카피바라 집사기` |
| Bundle/package id candidate | `com.capybarabutler.game` |
| Android shell | `android/` 생성됨 |
| iOS shell | `ios/` 생성됨 |
| Web/native sync | `npm run cap:sync`, `npx cap sync android`, `npx cap sync ios` |
| Platform assets | `platform-assets/`, Android launcher res candidates |
| Android Gradle build | JDK 21로 `assembleDebug` / `lint` 통과 |
| Android debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` |
| iOS simulator/native build | Xcode CoreSimulator/iOS platform component mismatch로 차단 |
| Google Play feature graphic | `store-screenshots/google-play-feature-graphic.png` |

현재 값은 제출 후보 placeholder다. 실제 App Store / Google Play 제출 전 사용자가 bundle id, package name, signing, developer account를 확정해야 한다.

## RC-13 Native Shell 결과

```bash
npx cap add android
```

결과: 성공. `android/` native shell 생성.

```bash
npx cap add ios
```

결과: 실패. CocoaPods가 설치되어 있지 않아 `ios/` platform을 추가하지 못했다. 이는 내부 앱 기능 결함이 아니라 로컬 iOS build 환경 blocker다.

```bash
npx cap sync android
```

결과: 성공.

```bash
npx cap doctor
```

결과: Android ready. 현재 설치된 Capacitor는 7.6.2이고 최신 8.3.3이 표시되므로, major upgrade는 별도 P3 검토로 남긴다.

## RC-14 Native Build Readiness 결과

```bash
./gradlew assembleDebug
```

결과: 실패. 현재 머신에 Java Runtime이 없어 Gradle을 시작하지 못했다.

```bash
./gradlew lint
```

결과: 실패. 동일하게 Java Runtime 미설치가 원인이다.

```bash
npx cap sync ios
```

결과: 실패. `ios/` platform이 아직 추가되지 않았다.

```bash
npx cap add ios
```

결과: 실패. CocoaPods 미설치가 원인이다.

위 실패는 현재 환경 blocker다. 코드 blocker로 단정하지 않는다.

## RC-15 Native Toolchain 결과

Homebrew로 설치/확인한 도구:

```bash
brew install openjdk@17 android-commandlinetools cocoapods
brew install openjdk@21
```

`openjdk@17`은 설치됐지만 Android build가 `invalid source release: 21`로 실패했다. 실제 Gradle 검증은 JDK 21로 진행한다.

현재 셸에서 사용하는 환경:

```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="/opt/homebrew/share/android-commandlinetools"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
```

Android SDK 설치:

```bash
yes | sdkmanager --sdk_root="$ANDROID_HOME" --licenses
sdkmanager --sdk_root="$ANDROID_HOME" "platform-tools" "platforms;android-35" "build-tools;35.0.0"
```

검증 결과:

```bash
npm run build
npm run cap:sync
npx cap sync android
cd android && ./gradlew assembleDebug
cd android && ./gradlew lint
```

결과:

- `assembleDebug`: 통과
- APK: `android/app/build/outputs/apk/debug/app-debug.apk` (`19M`)
- `lint`: 통과, warning only
- manifest permission order warning은 RC-15에서 수정
- 남은 warning은 dependency freshness, generated resource, launcher icon/splash final asset polish로 분류

iOS:

```bash
npx cap add ios
npx cap sync ios
npx cap doctor
```

결과:

- `ios/` 생성 성공
- CocoaPods install/sync 성공
- Capacitor doctor: Android/iOS looking great
- `xcodebuild -list -workspace ios/App/App.xcworkspace`는 schemes를 인식
- simulator build는 CoreSimulator out-of-date 및 iOS 26.4 platform missing으로 실패. Xcode Settings > Components에서 matching iOS platform 설치/업데이트 필요

## Android Shell Evidence

- `android/app/build.gradle`
- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/java/com/capybarabutler/game/MainActivity.java`
- `android/app/src/main/assets/public/` generated locally by `cap sync` and ignored from git as copied web output
- `android/app/src/main/res/mipmap-*`

## RC-8/RC-13 WebView Readiness

- `index.html` viewport는 `viewport-fit=cover`를 사용한다.
- CSS는 `--safe-top`, `--safe-bottom`, `100dvh`, `touch-action: manipulation`, `overscroll-behavior`를 적용한다.
- input/textarea는 iOS 자동 zoom 방지를 위해 16px 이상으로 유지한다.
- `layout-regression.spec.ts`는 save export/import textarea font-size와 modal action clickability를 자동 확인한다.
- content shell은 하단 safe-area/tab dock을 고려한 bottom padding과 scroll-padding을 사용한다.
- 저장은 interval/action 외에 `beforeunload`, `pagehide`, hidden `visibilitychange`에서 silent save를 수행한다.
- localStorage 접근이 실패하면 앱 crash 대신 volatile session fallback 또는 safe failure로 처리한다.
- WebAudio/vibration은 unsupported/permission failure에서 safe no-op으로 유지한다.

주의: 위 항목은 WebView 준비 코드이며 실제 iOS/Android persistence, notch, gesture navigation, audio gesture behavior는 native project 생성 후 물리 기기 또는 simulator에서 확인해야 한다.

## Icon/Splash Export

명령:

```bash
npm run export:assets
```

생성:

- `platform-assets/source/app-icon-1024.png`
- `platform-assets/ios/AppIcon.appiconset/`
- `platform-assets/android/res/mipmap-*`
- `platform-assets/android/res/values/ic_launcher_background.xml`
- `platform-assets/splash/portrait-*.png`
- `platform-assets/google-play/feature-graphic.png`
- `store-screenshots/google-play-feature-graphic.png`
- `android/app/src/main/res/mipmap-*` launcher icon 후보 갱신

`@capacitor/assets` 설치는 `sharp`/libvips 다운로드 timeout으로 실패했다. RC-13은 macOS `sips` fallback script를 사용한다. 최종 제출 전 공식 asset tool 또는 designer export를 다시 확인한다.

## Native 프로젝트 실행 절차

Android:

```bash
npm install
npm run export:assets
npm run build
export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
export ANDROID_HOME="/opt/homebrew/share/android-commandlinetools"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$JAVA_HOME/bin:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
npm run cap:sync
npx cap sync android
cd android && ./gradlew assembleDebug
cd android && ./gradlew lint
npm run cap:open:android
```

Debug APK install example after connecting a device:

```bash
adb devices
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

ADB helper workflow:

```bash
npm run device:qa:devices
npm run device:qa:install
npm run device:qa:launch
npm run device:qa:info
npm run device:qa:capture -- home
```

The helper writes device info and screenshots to `device-qa/incoming/`. If `adb` is not on PATH, it automatically checks the RC-15 command-line tools path `/opt/homebrew/share/android-commandlinetools/platform-tools/adb`, or you can run with `ADB=/path/to/adb`.

Local release rehearsal after RC-16:

```bash
cp android/keystore.properties.example android/keystore.properties
# Fill android/keystore.properties locally. Do not commit it.
cd android && ./gradlew assembleRelease
cd android && ./gradlew bundleRelease
```

RC-16 verified a local-only signed release APK and AAB:

- `android/app/build/outputs/apk/release/app-release.apk`
- `android/app/build/outputs/bundle/release/app-release.aab`

The RC-16 local key is a rehearsal upload key only. Play Console upload should use a production upload key chosen and backed up by the user.

Production Android upload key runbook:

```bash
mkdir -p android/keystores
keytool -genkeypair \
  -storetype PKCS12 \
  -keyalg RSA \
  -keysize 4096 \
  -validity 10000 \
  -alias YOUR_PRODUCTION_UPLOAD_ALIAS \
  -keystore android/keystores/YOUR_PRODUCTION_UPLOAD_KEY.jks
cp android/keystore.properties.example android/keystore.properties
```

Then edit ignored `android/keystore.properties`:

```properties
storeFile=keystores/YOUR_PRODUCTION_UPLOAD_KEY.jks
storePassword=YOUR_SECRET
keyAlias=YOUR_PRODUCTION_UPLOAD_ALIAS
keyPassword=YOUR_SECRET
```

Build:

```bash
npm run build
npm run cap:sync
npx cap sync android
cd android
./gradlew clean
./gradlew bundleRelease
```

Upload candidate:

```txt
android/app/build/outputs/bundle/release/app-release.aab
```

Warnings:

- Never commit `android/keystore.properties`, `.jks`, `.keystore`, `*.storepass`, or `*.keypass`.
- Losing the production upload key can block future updates unless Play App Signing upload key reset is available and approved.
- Enroll/use Google Play App Signing in Play Console and keep the app signing key/upload key distinction clear.
- Start with an internal testing track before any public rollout.

iOS:

```bash
brew install cocoapods
npm run build
npx cap add ios
npm run cap:sync
npx cap sync ios
npm run cap:open:ios
```

iOS shell generation is complete in RC-15. Next native run/build steps need matching Xcode iOS platform components, Apple Developer Program, signing certificate, and provisioning profile.

## Required Native Tooling To Install

- JDK 21 or compatible Java runtime for current Capacitor Android compile target. RC-15 uses Homebrew `openjdk@21`.
- Android Studio optional for IDE/device workflow; command-line SDK tools are installed at `/opt/homebrew/share/android-commandlinetools`.
- `bundletool 1.18.3` installed in RC-16 for AAB validation.
- CocoaPods installed as Homebrew `cocoapods 1.16.2`.
- Xcode command line tools installed, but Xcode iOS platform/CoreSimulator component update is still required for simulator build.
- Apple Developer signing identity
- Production Android upload keystore

## Store 제출 전 사용자가 제공해야 하는 항목

- Apple Developer Program 계정
- Google Play Console 계정
- 최종 bundle id/package name
- iOS signing certificate와 provisioning profile
- Production Android upload signing key/keystore
- Google Play App Signing enrollment
- privacy policy URL
- support URL
- 실제 IAP product id, 가격, 국가별 판매 설정
- 실제 rewarded ad SDK 선택 시 데이터 처리/ATT 답변

## 현재 release blocker

Android native debug build와 iOS native shell/sync는 RC-15에서 확인됐다. RC-16에서는 local rehearsal signed release APK/AAB 생성과 검증까지 확인했다. 실제 스토어 제출 자체는 계정, production signing, Play App Signing, 정책 URL, 실제 SDK/상품 설정, matching Xcode iOS platform, 물리 기기 QA가 없어 수행하지 않았다. 이는 `RELEASE_BLOCKERS.md`에 외부 blocker로 기록한다.
