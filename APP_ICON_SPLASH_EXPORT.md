# App Icon / Splash Export Notes

기준일: 2026-05-08

## 현재 후보 파일

| 용도 | 후보 |
| --- | --- |
| Raster app icon candidate | `src/assets/raster/release/app-icon-candidate.png` |
| SVG app icon candidate | `src/assets/generated/release/app-icon-final.svg` |
| SVG splash candidate | `src/assets/generated/release/splash-final.svg` |
| Store key visual candidate | `src/assets/raster/release/store-key-visual.png` |
| Store screenshot frame candidate | `src/assets/generated/release/store-screenshot-frame-final.svg` |

이 파일들은 제출용 원본 후보이지, Apple/Google 업로드가 완료된 asset set이 아니다.

## 공식 문서 기준

- Apple app icon workflow: https://developer.apple.com/help/app-store-connect/manage-app-information/add-an-app-icon
- Apple screenshot specifications: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/
- Google Play preview assets: https://support.google.com/googleplay/android-developer/answer/9866151

제출 직전에는 위 문서와 현재 Play Console/App Store Connect UI를 다시 확인한다.

## iOS 제출 전 필요한 작업

- Xcode asset catalog용 app icon set export
- App Store Connect marketing icon 포함 여부 확인
- icon alpha/rounded-corner 처리 정책 확인
- splash/launch screen 구성 결정
- notch/safe-area에서 launch screen crop 확인
- 실제 device 또는 simulator에서 icon/splash 흐림 여부 확인

현재 수행하지 않은 이유:

- Apple Developer account와 signing/provisioning이 없다.
- 최종 bundle id와 platform asset ownership 승인이 없다.

## Android 제출 전 필요한 작업

- Play Store app icon export. Google Play는 512 x 512 32-bit PNG with alpha, max 1024KB 기준을 요구한다.
- Android adaptive icon foreground/background export
- Android round icon 확인
- Splash screen background color와 foreground crop 확정
- Play Console feature graphic 필요 여부와 1024 x 500 export 준비
- 실제 Android device/WebView에서 gesture navigation과 bottom safe-area 확인

현재 수행하지 않은 이유:

- Google Play Console 계정과 package name, signing key가 없다.
- final art/legal approval이 없다.

## 현재 판정

아이콘/스플래시 source 후보는 있으나 platform export는 미완료다. 이는 내부 앱 기능 P1이 아니라 외부 제출 준비 blocker다.
