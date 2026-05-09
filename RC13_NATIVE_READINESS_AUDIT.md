# RC-13 Native Readiness Audit

기준일: 2026-05-09

## Capacitor Config

```txt
appId: com.capybarabutler.game
appName: 카피바라 집사기
webDir: dist
bundledWebRuntime: false
server.androidScheme: https
```

위 값은 제출 후보 placeholder다. 최종 bundle/package id는 사용자가 확정해야 한다.

## Native Shell 결과

| 명령 | 결과 | 판정 |
| --- | --- | --- |
| `npx cap add android` | success | Android shell 생성 |
| `npx cap add ios` | failed: CocoaPods is not installed | 환경 차단, external |
| `npx cap sync android` | success | Android web asset sync 완료 |
| `npx cap sync ios` | failed: iOS platform has not been added | iOS shell 미생성에 따른 예상 실패 |
| `npx cap doctor` | Android looking great, Capacitor 7.6.2 installed / 8.3.3 latest | Android 준비 OK, Capacitor major upgrade는 P3 검토 |

Android shell evidence:

- `android/app/build.gradle`
- `android/app/src/main/AndroidManifest.xml`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/java/com/capybarabutler/game/MainActivity.java`
- `android/app/src/main/assets/public/` generated locally by `cap sync` and ignored from git as copied web output
- Default Android example tests were patched to `com.capybarabutler.game` package/assertion so they no longer carry the template package name.

## Platform Asset Export

`npm run export:assets`를 추가했고, macOS `/usr/bin/sips` 기반으로 platform 후보를 생성한다.

출력:

- Source copies: `platform-assets/source/`
- iOS app icon set: `platform-assets/ios/AppIcon.appiconset/`
- Android icon candidates: `platform-assets/android/res/mipmap-*/`
- Android launcher background: `platform-assets/android/res/values/ic_launcher_background.xml`
- Splash candidates: `platform-assets/splash/portrait-*.png`
- Android native res update: `android/app/src/main/res/mipmap-*`

검증:

| 파일 | 크기/상태 |
| --- | --- |
| `platform-assets/source/app-icon-1024.png` | 1024 x 1024, no alpha |
| `platform-assets/ios/AppIcon.appiconset/AppIcon-1024x1024@1x-ios-marketing.png` | 1024 x 1024, no alpha |
| `platform-assets/android/res/mipmap-xxxhdpi/ic_launcher.png` | 192 x 192, no alpha |
| `platform-assets/android/res/mipmap-xxxhdpi/ic_launcher_foreground.png` | 432 x 432, no alpha |
| `platform-assets/splash/portrait-xxhdpi.png` | 1080 x 1920, no alpha |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` | 192 x 192, no alpha |

주의:

- Android adaptive foreground 후보는 현재 non-alpha source에서 생성된다. 최종 adaptive icon은 foreground/background 분리 art가 필요하다.
- Capacitor 공식 `@capacitor/assets`는 `sharp`/libvips 다운로드 timeout으로 설치하지 못했다. fallback export는 제출 후보 생성용이며, 최종 제출 전 공식 도구 또는 designer export로 재검증해야 한다.

## Native/WebView Readiness

코드 기준 준비:

- `viewport-fit=cover`
- safe-area CSS variables
- `100dvh`
- bottom tab/content padding
- `pagehide` / hidden `visibilitychange` save
- localStorage unavailable fallback
- WebAudio/vibration safe no-op
- input/textarea 16px zoom guard

남은 external/device QA:

- 실제 iOS WebView notch/keyboard/gesture navigation
- 실제 Android gesture navigation/back button
- release signing/provisioning/keystore
- App Store Connect / Play Console upload
- real ad/IAP SDK 추가 시 privacy and review notes

## 판정

Android native shell은 RC-13에서 생성/동기화됐다. iOS native shell은 CocoaPods/Xcode 환경이 없어 생성하지 못했다. 이는 내부 앱 기능 P1이 아니라 제출 환경 external blocker다.
