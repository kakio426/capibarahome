# Device QA Checklist

기준일: 2026-05-09

실제 물리 기기 또는 시뮬레이터에서 제출 전 확인해야 할 항목이다. 현재 환경에서는 Playwright 브라우저, Android Capacitor shell/sync, platform asset 후보 export까지만 자동 검증했다.

## Automated Browser Coverage Before Device QA

- [x] 360x740 / 390x844 / 430x932 / desktop screenshot and overflow checks
- [x] RC-12 layout regression: critical text clipping, CTA/bottom dock overlap, modal action clickability, save textarea 16px zoom guard
- [x] Store screenshot pack public copy forbidden terms, heading/subtitle clipping, generated file size guard
- [x] RC-13 store screenshot PNG dimension guard: iPhone 1290x2796, Android 1080x1920
- [x] RC-13 `data-ui-critical` clipping and toast non-blocking checks
- [x] 360x740 save modal bounds check after settings toggles
- [x] daily reward + offline reward same return session E2E
- [x] first prestige goal claim + reload E2E
- [x] quick-buy max + save/reload E2E
- [x] repeated tab switching clickability E2E
- [x] 2 hour simulation, 8 hour offline cap, 500 rapid taps, quick-buy stress, save/load 20x unit tests
- [x] `npm run cap:sync` web asset sync
- [x] Android native shell generated and synced
- [x] Platform icon/splash candidates exported to `platform-assets/`

자동화는 Chromium/Playwright와 Android Capacitor sync 기준이다. 실제 iOS Safari, iOS native WebView, Android Chrome, Android native WebView의 keyboard, notch, gesture navigation, storage persistence는 아래 physical QA가 필요하다.

## iPhone Safari / iOS WebView

- [ ] 360-430px급 폭에서 홈/성장/앨범/환생/상점/설정이 잘리지 않음
- [ ] notch/safe-area에서 헤더와 하단 탭이 가려지지 않음
- [ ] 터치 연타 시 floating text/particle이 과도하게 누적되지 않음
- [ ] background 후 foreground 복귀 시 오프라인 보상 모달 표시
- [ ] 앱 강제 종료 후 WebView storage 저장 유지
- [ ] 효과음 mute, 배경음 mute가 즉시 반영
- [ ] 세로 고정 또는 회전 정책 확정
- [ ] CocoaPods/Xcode 설치 후 `npx cap add ios`, `npm run cap:sync`, Xcode open 확인

## Android Chrome / Android WebView

- [ ] Android Studio에서 `android/` project 열기
- [ ] release variant signing key/keystore 연결
- [ ] 360x740 저해상도에서 텍스트 clipping 없음
- [ ] 저사양 Android에서 터치 spam 후 UI 응답성 유지
- [ ] background/foreground 후 EPS와 오프라인 보상 중복 지급 없음
- [ ] localStorage/WebView storage가 앱 재시작 후 유지
- [ ] back button 정책 확인: 앱 종료, 모달 닫기, 탭 이동 중 택일
- [ ] Android safe-area/gesture navigation bar와 하단 탭 충돌 없음
- [ ] 효과음 mute, 배경음 mute가 WebView에서도 동작

## 공통 제출 전 체크

- [ ] release build에서 `?debug=1` 없이는 debug panel이 보이지 않음
- [ ] 실제 광고 SDK 추가 시 네트워크/권한/ATT disclosure 재확인
- [ ] 실제 IAP 추가 시 sandbox purchase와 restore purchase QA
- [ ] privacy policy URL과 support URL이 유효
- [ ] store screenshot이 현재 UI와 일치
- [ ] store screenshot이 플랫폼별 요구 해상도와 파일 정책에 맞게 최종 export됨
- [ ] 앱 아이콘과 splash가 플랫폼 규격에서 흐릿하지 않음
- [ ] Android adaptive icon foreground/background가 final art 기준으로 자연스럽게 보임
- [ ] 10분 idle 상태에서 메모리 증가/발열 문제가 없음
