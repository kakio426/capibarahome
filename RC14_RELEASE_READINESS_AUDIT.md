# RC-14 Release Readiness Audit

기준일: 2026-05-09

## 결론

RC-14는 "native release build 직전 준비와 physical QA packet 정리" 단계다. 실제 App Store / Google Play 제출 완료가 아니다.

내부에서 개선한 것:

- Vite large chunk warning 제거
- JS bundle을 명확한 runtime/config/UI/vendor chunk로 분리
- SVG registry를 JS data URI 인라인 대신 파일 asset으로 배출
- Google Play feature graphic 후보 `1024 x 500` 생성
- store screenshot pack에 feature graphic dimension guard 추가
- Android/iOS native 환경 blocker를 명령어 결과 기준으로 분리
- physical device QA checklist와 결과 템플릿을 표 형태로 정리

외부에서 필요한 것:

- Apple Developer Program 계정
- Google Play Console 계정
- Android JDK 설치
- Android release keystore/signing
- CocoaPods 설치와 iOS native project 생성
- iOS signing certificate / provisioning profile
- privacy policy URL / support URL
- age rating / export compliance 답변
- 실제 광고/IAP SDK와 상품 ID 사용 여부 확정
- final art rights/legal approval
- 물리 iPhone/Android QA 실행

## 공식 문서 확인

2026-05-09에 아래 공식 문서를 확인했다.

| 범위 | 공식 문서 |
| --- | --- |
| Apple screenshot 규격 | https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/ |
| Apple App Review Guidelines | https://developer.apple.com/app-store/review/guidelines/ |
| Apple app icon workflow | https://developer.apple.com/help/app-store-connect/manage-app-information/add-an-app-icon |
| Google Play preview assets | https://support.google.com/googleplay/android-developer/answer/9866151?hl=en-EN |
| Capacitor Android | https://capacitorjs.com/docs/android |
| Capacitor iOS | https://capacitorjs.com/docs/ios |
| Capacitor `cap sync` | https://capacitorjs.com/docs/cli/commands/sync |
| Capacitor icons/splash | https://capacitorjs.com/docs/guides/splash-screens-and-icons |
| Capacitor Android deployment | https://capacitorjs.com/docs/android/deploying-to-google-play |

확인한 기준:

- Apple은 App Store Connect에서 기기별 screenshot 규격과 review guideline 기준을 최신 UI와 함께 확인해야 한다.
- Google Play feature graphic은 `1024 x 500` 후보가 필요하다.
- Capacitor Android/iOS shell은 `cap sync` 이후 native IDE, signing, platform tooling이 필요하다.
- 실제 업로드, signing, review metadata는 계정과 법적/정책 입력 없이는 완료할 수 없다.

## RC-13 정합성 확인

| 항목 | RC-13 문서 | RC-14 실제 확인 |
| --- | --- | --- |
| Git baseline | `bf465fb fix: prepare rc13 native shell and final layout polish` | 일치, clean에서 시작 |
| Android shell | 존재 | `android/`, `android/app/build.gradle`, `AndroidManifest.xml`, `strings.xml` 확인 |
| iOS shell | 없음 | `ios/` 없음, CocoaPods 미설치로 `npx cap add ios` 실패 |
| Platform assets | 존재 | `platform-assets/ios`, `platform-assets/android`, `platform-assets/splash` 확인 |
| Store screenshots | 10장 | iPhone 5장, Android 5장 + RC-14 feature graphic 후보 추가 |
| Layout P1 | 없음 | `layout-regression.spec.ts` 4 passed, representative screenshots 수동 확인 |

## RC-14 Release Readiness 판정

| 범위 | 판정 | 근거 |
| --- | --- | --- |
| Web build readiness | 통과 | `npm run build` success, Vite large chunk warning 제거 |
| Android shell readiness | 부분 완료 | Capacitor doctor는 Android OK. Gradle build는 Java runtime 미설치로 실행 불가 |
| iOS shell readiness | 외부 차단 | Xcode는 있으나 CocoaPods 미설치로 `npx cap add ios` 실패 |
| Store screenshot readiness | 통과 후보 | 10장 screenshot guard + feature graphic dimension guard |
| Store metadata readiness | 준비 후보 | `STORE_METADATA_PACKAGE.md` updated; URL/account/legal inputs external |
| Physical QA readiness | 준비 후보 | checklist/result template 제공. 실제 기기 실행은 미수행 |
| Actual store submission | 미완료 | 계정, signing, URLs, 실제 SDK, physical QA 부재 |

## Decision

RC-14는 제출 준비 패키지를 강화한 상태다. Android/iOS native release build 자체는 Java/CocoaPods/signing 환경이 필요하므로 완료로 주장하지 않는다. 내부 UI/layout P1은 자동/수동 확인에서 발견되지 않았고, 남은 native/store 항목은 P2/P3 또는 external blocker로 분류한다.
