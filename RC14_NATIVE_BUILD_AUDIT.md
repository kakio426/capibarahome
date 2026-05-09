# RC-14 Native Build Audit

기준일: 2026-05-09

## Environment

| 항목 | 결과 | 판정 |
| --- | --- | --- |
| Branch | `rc3-playtest-bug-bash` | 정상 |
| Baseline commit | `bf465fb fix: prepare rc13 native shell and final layout polish` | 정상 |
| Xcode | `Xcode 26.4.1`, build `17E202` | 설치됨 |
| CocoaPods | `pod not found` | iOS blocker |
| Java runtime | `Unable to locate a Java Runtime` | Android Gradle blocker |
| Capacitor installed | 7.6.2 | 동작, latest 8.3.3은 P3 upgrade 검토 |

## Capacitor Config

```txt
appId: com.capybarabutler.game
appName: 카피바라 집사기
webDir: dist
bundledWebRuntime: false
server.androidScheme: https
```

이 값은 제출 후보다. 실제 bundle/package id는 사용자가 최종 확정해야 한다.

## Android Readiness

| 항목 | 결과 | 판정 |
| --- | --- | --- |
| `android/` folder | 존재 | 완료 후보 |
| `applicationId` / namespace | `com.capybarabutler.game` | 일관 |
| App label | `카피바라 집사기` | 일관 |
| `minSdkVersion` | 23 | 정상 |
| `compileSdkVersion` | 35 | 정상 |
| `targetSdkVersion` | 35 | 정상 |
| `versionCode` / `versionName` | `1` / `1.0` | 제출 전 최종 확정 필요 |
| Orientation | manifest에 강제 고정 없음 | 실제 기기 QA에서 정책 확정 필요 |
| Exported activity | launcher activity `exported=true` | 정상 |
| Permissions | `android.permission.INTERNET` only | 불필요 permission 없음 |
| Launcher icons | `android/app/src/main/res/mipmap-*` 후보 존재 | 완료 후보 |
| Splash/theme | Capacitor core splashscreen dependency 있음 | device QA 필요 |

## Android Commands

| 명령 | 결과 | 분류 |
| --- | --- | --- |
| `npx cap doctor` | Android looking great | 통과 |
| `./gradlew assembleDebug` | Java Runtime 없음으로 실패 | 환경 blocker |
| `./gradlew lint` | Java Runtime 없음으로 실패 | 환경 blocker |

현재 실패는 앱 코드 blocker가 아니라 JDK 미설치에 따른 Gradle 실행 환경 blocker다. JDK 설치 후 아래 명령을 재실행해야 한다.

```bash
npm run build
npm run export:assets
npm run cap:sync
npx cap sync android
cd android && ./gradlew assembleDebug
cd android && ./gradlew lint
cd android && ./gradlew assembleRelease
cd android && ./gradlew bundleRelease
```

release upload에는 별도 Android keystore/signing config가 필요하다.

## iOS Readiness

| 항목 | 결과 | 판정 |
| --- | --- | --- |
| Xcode | 설치됨 | 준비됨 |
| CocoaPods | 미설치 | blocker |
| `ios/` folder | 없음 | blocker |
| `npx cap add ios` | CocoaPods 미설치로 실패 | 환경 blocker |
| `npx cap sync ios` | iOS platform 미생성으로 실패 | 예상 실패 |
| Bundle ID 후보 | `com.capybarabutler.game` | 사용자 확정 필요 |
| Display Name 후보 | `카피바라 집사기` | 사용자 확정 필요 |
| AppIcon 후보 | `platform-assets/ios/AppIcon.appiconset/` | 준비 후보 |

iOS shell 생성은 아래 환경 준비 후 다시 진행한다.

```bash
brew install cocoapods
npm run build
npx cap add ios
npm run cap:sync
npx cap sync ios
npm run cap:open:ios
```

이후 Xcode에서 signing certificate, provisioning profile, bundle id, AppIcon/Launch screen, privacy manifest 필요 여부를 확인해야 한다.

## Native P1 여부

내부 앱 코드 P1은 발견하지 않았다. 다만 Android Gradle build와 iOS shell 생성은 현재 로컬 환경 blocker 때문에 완료되지 않았으므로, native release build readiness는 external blocker가 남은 `부분 완료`다.
