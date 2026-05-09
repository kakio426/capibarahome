# RC-14 Device QA Packet

기준일: 2026-05-09

## Purpose

이 문서는 사용자가 실제 iPhone/Android 기기에서 바로 QA를 실행할 수 있도록 만든 실행 패킷이다. 현재 환경에서는 물리 기기 QA를 수행하지 않았다. 따라서 아래 physical QA 항목은 `미실행`이며, 통과로 주장하지 않는다.

## Build Sources

| Build source | 준비 상태 | 실행 방법 |
| --- | --- | --- |
| Web preview | 준비 가능 | `npm run build && npm run dev` 또는 `npm run preview` 추가 후 사용 |
| Android debug shell | Java runtime 필요 | `npm run build && npm run cap:sync && cd android && ./gradlew assembleDebug` |
| Android release candidate | keystore/signing 필요 | `cd android && ./gradlew bundleRelease` 후 signing 설정 필요 |
| iOS native shell | CocoaPods/Xcode/signing 필요 | `brew install cocoapods && npx cap add ios && npm run cap:sync` |

## Required Physical Devices

| Device | Priority | Reason |
| --- | --- | --- |
| Small Android phone around 360px CSS width | P1 manual QA | bottom tab / modal / scroll safety |
| Mid Android phone | P1 manual QA | WebView/localStorage/back button |
| iPhone with notch | P1 manual QA | safe-area top/bottom, Safari/WebView keyboard |
| Older/low-end Android | P2 manual QA | scroll/tap delay, heat/battery observation |

## Physical QA Matrix

| Device | OS version | Browser/WebView | Build source | Test scenario | Expected result | Actual result | Pass/Fail | Screenshot/video path | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TBD | TBD | Android WebView | Android debug APK | 첫 실행 | 튜토리얼/홈이 잘리고 겹치지 않음 | 미실행 | 미실행 | TBD | Java/JDK 설치 후 APK 필요 |
| TBD | TBD | Android WebView | Android debug APK | 터치 100회 | 귤 수치 증가, particle cap 유지, UI 멈춤 없음 | 미실행 | 미실행 | TBD | 360px급 기기 포함 |
| TBD | TBD | Android WebView | Android debug APK | quick-buy 1/10/max | 비용/CTA/레벨이 겹치지 않고 구매 결과 저장 | 미실행 | 미실행 | TBD | `성장` 탭 |
| TBD | TBD | Android WebView | Android debug APK | 저장/새로고침 또는 앱 재시작 | localStorage/WebView storage 유지 | 미실행 | 미실행 | TBD | 앱 강제 종료 포함 |
| TBD | TBD | Android WebView | Android debug APK | 앱 백그라운드/복귀 | 오프라인 보상 중복 없이 표시 | 미실행 | 미실행 | TBD | 2분 이상 대기 |
| TBD | TBD | Android WebView | Android debug APK | daily reward | claim/cooldown/streak 저장 | 미실행 | 미실행 | TBD | 날짜 조작 보안은 범위 외 |
| TBD | TBD | Android WebView | Android debug APK | milestone claim | D1/D3/D7 중복 지급 없음 | 미실행 | 미실행 | TBD | reload 후 유지 |
| TBD | TBD | Android WebView | Android debug APK | 환생 | result panel, 배율, 저장 일관성 | 미실행 | 미실행 | TBD | 첫 환생 seeded/실제 진행 |
| TBD | TBD | Android WebView | Android debug APK | export/import | code 복사/붙여넣기, 실패 안내 | 미실행 | 미실행 | TBD | keyboard와 textarea 확인 |
| TBD | TBD | Android WebView | Android debug APK | 설정 토글 | sound/effects/vibration 즉시 반영 | 미실행 | 미실행 | TBD | toast가 CTA를 막지 않음 |
| TBD | TBD | Android WebView | Android debug APK | 사운드 mute | mute 상태에서 sound no-op | 미실행 | 미실행 | TBD | gesture unlock 확인 |
| TBD | TBD | Android WebView | Android debug APK | safe-area / gesture nav | 하단 탭과 시스템 nav가 충돌하지 않음 | 미실행 | 미실행 | TBD | gesture/3-button nav 모두 |
| TBD | TBD | Android WebView | Android debug APK | Android back button | 모달 닫기 또는 앱 종료 정책 확인 | 미실행 | 미실행 | TBD | 정책 결정 필요 |
| TBD | TBD | iOS Safari | Web build | 첫 실행 | safe-area와 iOS zoom risk 없음 | 미실행 | 미실행 | TBD | URL로 web smoke 가능 |
| TBD | TBD | iOS WebView | iOS native build | input focus | textarea focus 시 화면 확대/가림 없음 | 미실행 | 미실행 | TBD | CocoaPods/signing 필요 |
| TBD | TBD | Android WebView | Android debug APK | 저사양 스크롤/터치 지연 | 10분 사용 후 조작 가능 | 미실행 | 미실행 | TBD | battery/thermal note |
| TBD | TBD | Android/iOS WebView | Native build | 10분 방치 발열/배터리 | 과열/과도한 배터리 소모 없음 | 미실행 | 미실행 | TBD | 실제 기기 필요 |

## Automated Evidence Already Covered

| 범위 | 결과 |
| --- | --- |
| 360/390/430/desktop layout regression | `4 passed` |
| visual/store screenshot regeneration | `7 passed` with feature graphic guard |
| Vite build | large chunk warning removed |
| Capacitor doctor | Android looking great |
| Android Gradle | Java runtime blocker, not executed to completion |
| iOS sync | iOS platform/CocoaPods blocker |

## 사용자가 기록해야 할 산출물

- 실제 device name / OS version
- APK/AAB 또는 iOS build source
- pass/fail가 보이는 screenshot/video
- crash log 또는 console log
- storage persistence 결과
- notch/safe-area 결과
- 발열/배터리 관찰 메모

## 판정

RC-14는 physical QA를 실행 가능한 체크리스트와 결과 템플릿으로 정리했다. 실제 물리 기기에서 아직 실행하지 않았으므로 제출 전 external P1 manual QA로 남긴다.
