# Device QA Checklist

기준일: 2026-05-09

이 문서는 제출 전 실제 물리 기기에서 실행할 QA 체크리스트다. RC-18 환경에서는 Playwright, Capacitor sync, Android debug/release rehearsal build, Android WebView-like 320/360/393/412 layout regression, 110/120% font scaling guard까지 자동 검증했고, 물리 기기 QA는 수행하지 않았다. 실제 결과는 `DEVICE_QA_RESULTS_TEMPLATE.md`에 기록한다.

## Automated Coverage Before Physical QA

| 범위 | 상태 | 근거 |
| --- | --- | --- |
| 320/360/390/430/Android-ish/desktop layout regression | 완료 후보 | `npx playwright test e2e/layout-regression.spec.ts --reporter=line` 10 passed |
| Visual screenshot regeneration | 완료 | `npx playwright test e2e/visual-regression.spec.ts ...` |
| Store screenshot pack guard | 완료 | public forbidden copy, heading/subtitle clipping, iPhone/Android dimensions |
| Google Play feature graphic guard | 완료 | `store-screenshots/google-play-feature-graphic.png` 1024x500 |
| Web build | 완료 | `npm run build`, Vite large chunk warning removed |
| Android Capacitor shell | 완료 후보 | `android/` exists, `npx cap doctor` Android OK |
| Android Gradle build | 완료 후보 | JDK 21, `./gradlew assembleDebug`, `./gradlew lint` 통과 |
| Android debug APK | 완료 후보 | `android/app/build/outputs/apk/debug/app-debug.apk` |
| iOS native shell | 완료 후보 | `npx cap add ios`, `npx cap sync ios`, `npx cap doctor` 통과 |
| iOS simulator/native build | 환경 차단 | CoreSimulator out-of-date, iOS 26.4 platform missing |
| Device QA diagnostics overlay | 완료 | 앱 URL에 `?deviceQa=1` 추가 시 viewport/DPR/visualViewport/safe-bottom/font stack/userAgent 표시 |

## Physical QA Matrix

| Device | OS version | Browser/WebView | Build source | Test scenario | Expected result | Actual result | Pass/Fail | Screenshot/video path | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | Android WebView | Debug APK | 첫 실행 | 홈/튜토리얼이 잘리고 겹치지 않음 | 미실행 | 미실행 | TBD | APK: `android/app/build/outputs/apk/debug/app-debug.apk` |
| TBD | TBD | Android WebView | Debug APK | 폰트 확대 110%/120% | 버튼/탭/칩/가격/모달 글자가 위아래로 잘리지 않음 | 미실행 | 미실행 | TBD | Android 설정 글자 크기 변경 후 확인 |
| TBD | TBD | Android WebView | Debug APK | 320~360px급 좁은 화면 | home CTA, upgrade first/second CTA, save modal action이 하단 탭/gesture area에 가려지지 않음 | 미실행 | 미실행 | TBD | 작은 화면 또는 display size 확대 |
| TBD | TBD | Android WebView | Debug APK | `?deviceQa=1` 진단 overlay | viewport/DPR/visualViewport/safe-bottom/font stack/userAgent가 표시되고 일반 실행에서는 표시되지 않음 | 미실행 | 미실행 | TBD | screenshot을 `device-qa/incoming/`에 저장 |
| TBD | TBD | Android WebView | Debug APK | 터치 100회 | 귤 증가, particle cap, UI 멈춤 없음 | 미실행 | 미실행 | TBD | low-end device 포함 |
| TBD | TBD | Android WebView | Debug APK | quick-buy 1/10/max | 비용/레벨/CTA 정상, 음수 재화 없음 | 미실행 | 미실행 | TBD | 성장 탭 |
| TBD | TBD | Android WebView | Debug APK | 저장/새로고침 | 진행도 유지 | 미실행 | 미실행 | TBD | app restart 포함 |
| TBD | TBD | Android WebView | Debug APK | 앱 백그라운드/복귀 | 오프라인 보상 1회 표시, 중복 없음 | 미실행 | 미실행 | TBD | 2분 이상 대기 |
| TBD | TBD | Android/iOS WebView | Native build | 오프라인 보상 | 수령 후 reload에도 중복 지급 없음 | 미실행 | 미실행 | TBD | localStorage persistence |
| TBD | TBD | Android/iOS WebView | Native build | daily reward | claim/cooldown/streak 저장 | 미실행 | 미실행 | TBD | date spoofing 방어는 범위 외 |
| TBD | TBD | Android/iOS WebView | Native build | milestone claim | D1/D3/D7 중복 지급 없음 | 미실행 | 미실행 | TBD | reload 후 상태 유지 |
| TBD | TBD | Android/iOS WebView | Native build | 환생 | result panel/배율/저장 일관성 | 미실행 | 미실행 | TBD | first prestige flow |
| TBD | TBD | Android/iOS WebView | Native build | export/import | code 복사/붙여넣기, 실패 안내 crash 없음 | 미실행 | 미실행 | TBD | keyboard/textarea |
| TBD | TBD | Android/iOS WebView | Native build | 설정 토글 | effects/sound/music/vibration 즉시 반영 | 미실행 | 미실행 | TBD | toast non-blocking |
| TBD | TBD | Android/iOS WebView | Native build | 사운드 mute | muted 상태에서 no-op, crash 없음 | 미실행 | 미실행 | TBD | WebAudio gesture |
| TBD | TBD | Android/iOS WebView | Native build | safe-area/notch | 헤더/탭/CTA가 시스템 영역에 가려지지 않음 | 미실행 | 미실행 | TBD | notch/gesture nav |
| TBD | TBD | Android WebView | Debug APK | Android back button | 정책대로 모달 닫기/앱 종료 동작 | 미실행 | 미실행 | TBD | 정책 확정 필요 |
| TBD | TBD | iOS Safari/WebView | Web/native build | input focus | textarea focus에서 iOS zoom/가림 없음 | 미실행 | 미실행 | TBD | 16px guard 확인 |
| TBD | TBD | Android WebView | Debug APK | 저사양 Android 스크롤/터치 지연 | 10분 사용 후 조작 가능 | 미실행 | 미실행 | TBD | perf observation |
| TBD | TBD | Android/iOS WebView | Native build | 10분 방치 발열/배터리 관찰 | 과열/과도한 배터리 소모 없음 | 미실행 | 미실행 | TBD | device temperature note |

## 제출 전 최소 조합

- iPhone notch 기기 1대
- Android 360px급 저해상도 기기 1대
- Android 중급/저사양 기기 1대
- 가능하면 iOS Safari와 iOS native WebView 모두 확인
- 가능하면 Android Chrome과 Android native WebView 모두 확인

## 판정

RC-18은 Android physical QA를 실행할 수 있는 checklist/result template과 device evidence folder까지 준비했다. 실제 물리 기기 실행은 아직 없으므로 제출 전 external QA blocker로 남긴다.
