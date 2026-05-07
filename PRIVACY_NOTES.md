# Privacy Notes

기준일: 2026-05-07

## 현재 구현 기준 결론

현재 RC-7 후보는 서버 계정, 원격 저장, 실제 광고 SDK, 실제 IAP SDK, 실제 analytics SDK를 포함하지 않는다. 게임 진행, 설정, 복귀 보상 상태는 로컬 저장소에만 보관된다.

이 문서는 실제 SDK를 추가하기 전 기준이다. 광고/IAP/analytics SDK를 붙이면 제출 전 반드시 다시 감사해야 한다.

## Local Save / Device Storage

| 항목 | 현재 상태 |
| --- | --- |
| 저장 위치 | Web: `localStorage`, Native packaging 후: Capacitor WebView storage |
| 저장 데이터 | 귤/황금 나뭇잎, 업그레이드/시설 레벨, 환생/누적 진행도, 퀘스트/업적/장식/동료 상태, daily reward streak/cooldown, D1/D3/D7 milestone claim, post-prestige goal step, 설정, 튜토리얼, monetization mock state, timestamps |
| 전송 여부 | 서버 전송 없음 |
| 계정 연결 | 없음 |
| 암호화 주장 | 하지 않음. Base64는 전송/복사 편의 포맷일 뿐 암호화가 아님 |
| 사용자 유의 | export save code에는 게임 진행 상태가 들어 있으므로 공개 공유는 권장하지 않음 |

## Analytics Mock

`AnalyticsManager`는 in-memory/console mock이다.

- 네트워크 요청 없음
- 외부 analytics SDK 없음
- 개인 식별자 생성/전송 없음
- store data safety 기준으로 현재 구현만 보면 개발자 서버가 수집하는 데이터 없음

실제 analytics SDK를 추가하면 privacy policy, opt-out/consent, data safety, ATT 판단을 다시 작성한다.

## Ads / IAP Mock

현재 광고와 IAP는 provider interface와 mock flow만 있다.

- Rewarded ad: mock provider로 성공/실패 이벤트만 시뮬레이션
- IAP: 개발 모드 샌드박스 수령 버튼만 제공
- 실제 결제 처리 없음
- 실제 광고 추적 SDK 없음
- real ad reward 또는 paid product로 스토어 문구를 과장하면 안 됨

실제 SDK 추가 시 추가 검토:

- 광고 식별자/추적 여부
- ATT prompt 필요 여부
- Play Data Safety 답변
- IAP restore purchase
- 환불/소비성 상품 정책

## Network Usage

현재 앱 코드의 게임 플레이 경로는 외부 API를 호출하지 않는다. Vite dev server는 개발 중 로컬 파일 제공용이며 store privacy disclosure의 원격 데이터 수집으로 보지 않는다.

## Device Permissions

현재 구현은 위치, 연락처, 사진, 파일, 카메라, 마이크 권한을 요청하지 않는다. 진동은 브라우저 `navigator.vibrate`가 지원되는 경우 설정 on 상태에서 짧게 호출한다.

## Draft Store Privacy Position

현재 mock-only web/native wrapper 후보 기준:

- Data collected by developer server: none
- Data stored on device: gameplay progress and settings
- Data linked to user: no
- Third-party tracking: no
- Real ads/IAP SDK: not integrated
- Privacy policy URL: 사용자가 제출 전 제공 필요
