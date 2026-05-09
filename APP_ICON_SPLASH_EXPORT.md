# App Icon / Splash Export Notes

기준일: 2026-05-09

## 현재 후보 파일

| 용도 | 후보 |
| --- | --- |
| Raster app icon source | `src/assets/raster/release/app-icon-candidate.png` |
| SVG app icon support source | `src/assets/generated/release/app-icon-final.svg` |
| SVG splash source | `src/assets/generated/release/splash-final.svg` |
| Store key visual source | `src/assets/raster/release/store-key-visual.png` |
| Store screenshot frame support source | `src/assets/generated/release/store-screenshot-frame-final.svg` |
| Platform export output | `platform-assets/` |

이 파일들은 제출용 후보이지, Apple/Google 업로드가 완료된 asset set이 아니다.

## 공식 문서 기준

2026-05-09 확인:

- Apple app icon workflow: https://developer.apple.com/help/app-store-connect/manage-app-information/add-an-app-icon
- Apple screenshot specifications: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/
- Google Play preview assets: https://support.google.com/googleplay/android-developer/answer/9866151?hl=en-EN
- Capacitor splash/icon guide: https://capacitorjs.com/docs/guides/splash-screens-and-icons

제출 직전에는 위 문서와 현재 Play Console/App Store Connect UI를 다시 확인한다.

## RC-13 Export Output

`npm run export:assets`가 생성한다.

| 범위 | 출력 |
| --- | --- |
| Source copies | `platform-assets/source/app-icon-1024.png`, `store-key-visual.png`, `splash-final.svg` |
| iOS app icon set | `platform-assets/ios/AppIcon.appiconset/` |
| iOS marketing icon | `platform-assets/ios/AppIcon.appiconset/AppIcon-1024x1024@1x-ios-marketing.png` |
| Android launcher icons | `platform-assets/android/res/mipmap-*/ic_launcher.png` |
| Android round icons | `platform-assets/android/res/mipmap-*/ic_launcher_round.png` |
| Android foreground candidates | `platform-assets/android/res/mipmap-*/ic_launcher_foreground.png` |
| Android launcher background | `platform-assets/android/res/values/ic_launcher_background.xml` |
| Splash candidates | `platform-assets/splash/portrait-*.png` |
| Android native res update | `android/app/src/main/res/mipmap-*` |

검증한 파일:

| 파일 | 상태 |
| --- | --- |
| `platform-assets/source/app-icon-1024.png` | 1024 x 1024, no alpha |
| `platform-assets/ios/AppIcon.appiconset/AppIcon-1024x1024@1x-ios-marketing.png` | 1024 x 1024, no alpha |
| `platform-assets/android/res/mipmap-xxxhdpi/ic_launcher.png` | 192 x 192, no alpha |
| `platform-assets/android/res/mipmap-xxxhdpi/ic_launcher_foreground.png` | 432 x 432, no alpha |
| `platform-assets/splash/portrait-xxhdpi.png` | 1080 x 1920, no alpha |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` | 192 x 192, no alpha |

## Tooling Note

Capacitor 공식 guide는 `@capacitor/assets` 사용을 권장한다. 이번 환경에서는 `npm install -D @capacitor/assets`가 `sharp`/libvips 다운로드 timeout으로 실패했고 package 파일은 변경되지 않았다. RC-13은 macOS `/usr/bin/sips` 기반 fallback script를 사용한다.

## 남은 제출 전 작업

- iOS `ios/` project 생성 후 Xcode asset catalog 반영 확인
- Android adaptive icon foreground/background를 final art로 분리
- Play Console feature graphic `1024 x 500` 후보 생성
- Splash screen safe-area crop을 iPhone/Android device 또는 simulator에서 확인
- 최종 commissioned art / 권리 확인
- 플랫폼별 icon/splash가 흐릿하거나 잘리지 않는지 실기기 확인

## 판정

RC-13에서 platform export 후보는 생성됐다. 다만 final art/legal approval, iOS project, official asset tool verification, physical device QA가 남아 있으므로 실제 제출 완료 asset set으로 주장하지 않는다.
