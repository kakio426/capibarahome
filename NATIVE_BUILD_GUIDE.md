# Native Build Guide

기준일: 2026-05-09

## 현재 준비 상태

Capacitor web/native 준비는 RC-13 기준 아래 상태다.

| 항목 | 상태 |
| --- | --- |
| Config | `capacitor.config.ts` |
| Web output | `dist` |
| App name candidate | `카피바라 집사기` |
| Bundle/package id candidate | `com.capybarabutler.game` |
| Android shell | `android/` 생성됨 |
| iOS shell | CocoaPods 미설치로 미생성 |
| Web/native sync | `npm run cap:sync`, `npx cap sync android` |
| Platform assets | `platform-assets/`, Android launcher res candidates |

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
- `android/app/src/main/res/mipmap-*` launcher icon 후보 갱신

`@capacitor/assets` 설치는 `sharp`/libvips 다운로드 timeout으로 실패했다. RC-13은 macOS `sips` fallback script를 사용한다. 최종 제출 전 공식 asset tool 또는 designer export를 다시 확인한다.

## Native 프로젝트 실행 절차

Android:

```bash
npm install
npm run build
npm run export:assets
npm run cap:sync
npm run cap:open:android
```

iOS:

```bash
brew install cocoapods
npm run build
npx cap add ios
npm run cap:sync
npm run cap:open:ios
```

iOS 단계는 Xcode, CocoaPods, Apple Developer Program, signing certificate, provisioning profile이 필요하다.

## Store 제출 전 사용자가 제공해야 하는 항목

- Apple Developer Program 계정
- Google Play Console 계정
- 최종 bundle id/package name
- iOS signing certificate와 provisioning profile
- Android signing key/keystore
- privacy policy URL
- support URL
- 실제 IAP product id, 가격, 국가별 판매 설정
- 실제 rewarded ad SDK 선택 시 데이터 처리/ATT 답변

## 현재 release blocker

Android native shell은 준비됐지만 실제 스토어 제출 자체는 계정, 서명, 정책 URL, 실제 SDK/상품 설정이 없어 수행하지 않았다. iOS native shell은 CocoaPods/Xcode 환경이 없어 미생성이다. 이는 `RELEASE_BLOCKERS.md`에 외부 blocker로 기록한다.
