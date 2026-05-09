# Device QA Results Template

기준일: 2026-05-09

아래 표를 복사하지 말고 이 파일 안에 실제 결과를 직접 채운다. RC-19 작업 환경에서는 Android WebView-like viewport/font-scaling/playability 자동 검증과 Android APK 재생성까지 수행하지만, 물리 기기 QA는 수행하지 않았다.

| Device | OS version | Browser/WebView | Build source | Test scenario | Expected result | Actual result | Pass/Fail | Screenshot/video path | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  | 첫 실행 | 홈/튜토리얼이 잘리고 겹치지 않음 |  |  |  |  |
|  |  |  |  | Android 폰트 확대 110%/120% | 버튼/탭/칩/가격/모달 글자가 위아래로 잘리지 않음 |  |  |  | 설정 > 글자 크기 변경 |
|  |  |  |  | 320~360px급 좁은 화면/display size 확대 | home CTA, upgrade CTA, modal action이 하단 탭/gesture area에 가려지지 않음 |  |  |  |  |
|  |  |  |  | `?deviceQa=1` 진단 overlay | viewport/DPR/visualViewport/safe-bottom/font stack/userAgent/top-layer와 최근 20개 tap/click target log가 표시됨 |  |  |  | 일반 실행에서는 노출 금지 |
|  |  |  |  | 홈 터치 20회 | 귤 숫자가 즉시 증가하고 `+N 귤` feedback이 보이며 next-action panel이 다음 행동을 하나만 안내함 |  |  |  | RC-19 playability |
|  |  |  |  | 업그레이드 구매 1회 | 구매 후 result banner, 레벨/효과 delta, 비용/CTA 상태가 명확함 |  |  |  |  |
|  |  |  |  | quick-buy 최대 구매 | `최대 N회` CTA가 눌리고 레벨/효과/귤 변화가 보이며 음수 재화 없음 |  |  |  |  |
|  |  |  |  | 보상 claim | claim 후 reward banner/sheet가 보여 받은 보상이 즉시 이해됨 |  |  |  | quest/album/daily/milestone 중 하나 이상 |
|  |  |  |  | 터치 100회 | 귤 증가, particle cap, 멈춤 없음 |  |  |  |  |
|  |  |  |  | quick-buy 1/10/max | 비용/레벨/CTA 정상 |  |  |  |  |
|  |  |  |  | 저장/새로고침 | 진행도 유지 |  |  |  |  |
|  |  |  |  | 앱 백그라운드/복귀 | 오프라인 보상 중복 없음 |  |  |  |  |
|  |  |  |  | daily reward | claim/cooldown/streak 유지 |  |  |  |  |
|  |  |  |  | milestone claim | 중복 지급 없음 |  |  |  |  |
|  |  |  |  | 환생 | result panel/배율/save 일관 |  |  |  |  |
|  |  |  |  | export/import | 정상 복구, 실패 안내 crash 없음 |  |  |  |  |
|  |  |  |  | 설정 토글 | sound/effects/vibration 즉시 반영 |  |  |  |  |
|  |  |  |  | 하단 탭 반복 전환 | toast/modal/backdrop이 탭 전환을 막지 않음 |  |  |  |  |
|  |  |  |  | modal 열고 닫기 | 닫기/확인/취소 CTA가 화면 안에서 터치 가능 |  |  |  | daily/offline/prestige/save |
|  |  |  |  | 앱 종료 후 재실행 | 저장/claim/cooldown 상태가 유지되고 막힌 backdrop 없음 |  |  |  |  |
|  |  |  |  | 사운드 mute | mute 상태에서 no-op |  |  |  |  |
|  |  |  |  | safe-area/notch | 헤더/탭/CTA 가림 없음 |  |  |  |  |
|  |  |  |  | Android back button | 정책대로 동작 |  |  |  |  |
|  |  |  |  | iOS input focus | textarea zoom/가림 없음 |  |  |  |  |
|  |  |  |  | 저사양 Android 스크롤/터치 지연 | 조작 가능, 눈에 띄는 지연 없음 |  |  |  |  |
|  |  |  |  | 10분 방치 발열/배터리 | 과열/과소모 없음 |  |  |  |  |

## Attachments

| File path | Scenario | Notes |
| --- | --- | --- |
|  |  |  |

## Device QA Evidence Folders

- Incoming physical screenshots/videos: `device-qa/incoming/`
- Annotated issue screenshots/videos: `device-qa/annotated/`
- Fixed/retest screenshots/videos: `device-qa/fixed/`

## ADB Capture Commands

```bash
npm run device:qa:devices
npm run device:qa:install
npm run device:qa:launch
npm run device:qa:info
npm run device:qa:capture -- home
npm run device:qa:capture -- upgrades-quick-buy
npm run device:qa:capture -- save-modal
npm run device:qa:capture -- daily-reward
npm run device:qa:capture -- milestone-board
npm run device:qa:capture -- prestige-result
npm run device:qa:record -- upgrades-scroll 12
npm run device:qa:record -- tap-and-modal-flow 15
```

## Summary

- Pass:
- Fail:
- Blocked:
- Retest needed:

## Current Build Inputs

- Android debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Android signed rehearsal APK: `android/app/build/outputs/apk/release/app-release.apk`
- iOS workspace: `ios/App/App.xcworkspace`
- iOS simulator/native build note: matching iOS platform/CoreSimulator component must be installed in Xcode before simulator run.
