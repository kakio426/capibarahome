# RC-13 Submission Audit

기준일: 2026-05-09

## 결론

RC-13 상태는 "native shell / store submission prep package 정리 완료 후보"다. 실제 App Store / Google Play 제출 완료가 아니다.

내부에서 완료한 것:

- Android Capacitor shell 생성
- Android web asset sync
- Android launcher icon 후보를 native res에 반영
- iOS AppIcon.appiconset 후보 export
- Android icon/adaptive foreground 후보 export
- Splash 후보 PNG export
- Store screenshot 후보 10장 재생성 및 dimension guard 통과
- layout regression에 `[data-ui-critical]`, toast pointer-events, store screenshot dimension guard 추가
- 마일스톤 배지 visible copy를 짧게 정리해 360/390px ellipsis 부담 완화

외부에서 필요한 것:

- Apple Developer Program 계정
- Google Play Console 계정
- iOS signing certificate / provisioning profile
- Android release keystore
- 최종 bundle id / package name 승인
- privacy policy URL / support URL
- age rating / export compliance 답변
- 실제 광고/IAP SDK와 상품 ID 사용 여부
- final commissioned art 권리 확인
- 물리 iPhone/Android QA

## 공식 문서 확인

2026-05-09에 아래 공식 문서를 확인했다.

| 범위 | 공식 문서 |
| --- | --- |
| Apple screenshot 규격 | https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/ |
| Apple App Review Guidelines | https://developer.apple.com/app-store/review/guidelines/ |
| Apple app icon workflow | https://developer.apple.com/help/app-store-connect/manage-app-information/add-an-app-icon |
| Google Play preview assets | https://support.google.com/googleplay/android-developer/answer/9866151?hl=en-EN |
| Capacitor icons/splash | https://capacitorjs.com/docs/guides/splash-screens-and-icons |
| Capacitor `cap add` | https://capacitorjs.com/docs/cli/commands/add |
| Capacitor `cap sync` | https://capacitorjs.com/docs/cli/commands/sync |

확인한 기준:

- Apple은 6.9형 iPhone portrait 후보에 `1290 x 2796`을 허용한다.
- Apple App Review는 제출 전 crash/bug 테스트, 정확한 metadata, on-device 안정성, 권리 확보, placeholder 제거를 요구한다.
- Google Play phone screenshot 후보는 9:16 portrait `1080 x 1920`을 권장 범위로 충족한다. 현재 Android screenshot은 24-bit PNG, no alpha 후보로 생성된다.
- Google Play feature graphic `1024 x 500`은 아직 별도 final export가 없다. P2/external store asset으로 남긴다.
- Capacitor 공식 guide는 `@capacitor/assets` 사용을 권장한다. 이번 환경에서는 `sharp`/libvips 다운로드 timeout으로 설치하지 못했고, macOS `sips` 기반 fallback export script를 사용했다.

## Submission Package 상태

| 항목 | 상태 | 근거 |
| --- | --- | --- |
| Web build | 완료 | `npm run build` success, Vite large chunk warning은 P2 |
| Android shell | 완료 후보 | `android/`, `android/app/build.gradle`, `AndroidManifest.xml`, `strings.xml` 생성 |
| iOS shell | 환경 차단 | `npx cap add ios`가 CocoaPods 미설치로 실패. `ios/` 폴더 없음 |
| Capacitor config | 완료 | `appId: com.capybarabutler.game`, `appName: 카피바라 집사기`, `webDir: dist` |
| Android sync | 완료 | `npx cap sync android` success, `npm run cap:sync` 대상 |
| iOS sync | 환경 차단 | iOS platform이 추가되지 않아 `npx cap sync ios` 불가 |
| Icon candidates | 완료 후보 | `platform-assets/ios/AppIcon.appiconset/`, `platform-assets/android/res/mipmap-*` |
| Splash candidates | 부분 완료 | `platform-assets/splash/portrait-*.png`; final native launch/safe-area QA 필요 |
| Store screenshots | 완료 후보 | iPhone 5장 `1290 x 2796`, Android 5장 `1080 x 1920` |
| Public listing copy | 완료 후보 | `STORE_LISTING_DRAFT.md`, `STORE_METADATA_PACKAGE.md` |
| Privacy/support URL | 외부 차단 | 사용자가 실제 URL 제공 필요 |
| Signing/upload | 외부 차단 | 계정/인증서/keystore 미제공 |

## 판정

내부 구현/문서/스크린샷 기준의 제출 준비 패키지는 RC-13에서 한 단계 올라갔다. 다만 iOS native project는 CocoaPods/Xcode 환경이 필요하고, 실제 업로드에는 계정/서명/URL/법무/실기기 QA가 필요하다. 따라서 "스토어 제출 준비 패키지 정리 완료 후보"로만 표현한다.
