# RC-10 Product UI & Reward Moment Fix Scope

## 기준

RC-10은 RC-9 독립 감사의 product-quality P1을 실제 화면으로 고치는 패스다. 완료 근거는 파일 수, 테스트 수, 에셋 수가 아니라 최신 screenshot 재점수다.

완료 점수 기준:
- `RC10_SCREEN_SCORECARD.md` combined average 8.0 이상
- upgrades 8.0 이상
- daily reward 8.0 이상
- D1/D3/D7 milestone board 8.0 이상
- prestige result ceremony 8.0 이상
- store screenshots 8.0 이상

사용하지 않을 품질 근거:
- build/test 통과만으로 product quality 완료 주장
- 새 asset 수량 증가
- CSS 줄 수 증가
- 문서상 완료 선언
- RC-9 문서 삭제 또는 기준 완화

## RC-9 P1 목록

| 영역 | RC-9 판정 | RC-10 처리 |
| --- | --- | --- |
| 업그레이드 / quick-buy | P1. 기본 HTML 버튼, 긴 카드 리스트, 빈 tool slot, 360px CTA 충돌 | 이번 RC-10에서 수정 |
| Daily reward moment | P1. toast/disabled card 수준, 첫 viewport 보상 약함, claim 순간 부재 | 이번 RC-10에서 수정 |
| D1/D3/D7 milestone board | P1. badge/sticker가 아니라 긴 카드 리스트, claimed state 약함 | 이번 RC-10에서 수정 |
| Prestige result | P1. util modal 느낌, ritual art와 보상 정보 연결 약함 | 이번 RC-10에서 수정 |
| Store screenshots/listing | P1. internal/mock wording 노출, 약한 gameplay panel, 어색한 한국어 줄바꿈 | 이번 RC-10에서 수정 |
| Release docs reality alignment | P1. RC-9 P1 존재와 기존 "내부 P0/P1 없음" 문서 충돌 | 이번 RC-10에서 수정 |

## 이번 RC-10에서 고치지 않을 P2/P3

- 새 게임 모드, 새 경제 계층, 새 저장 스키마
- 실제 광고/IAP SDK 연결
- 실제 push notification, 서버 계정, 클라우드 저장
- commissioned final art 교체
- 실기기 iOS/Android 장시간 QA
- 완전한 anti-clock-tamper 보안

위 항목은 store 제출 전 사용자 제공 또는 후속 P2/P3로 유지한다.

## 구현 원칙

- RC-5 wood/parchment/orange HUD skin과 RC-6/RC-7 기능은 유지한다.
- 새 save schema를 만들지 않는다.
- 기존 E2E의 실제 유저 플로우를 debug shortcut으로 대체하지 않는다.
- public/store-facing copy에는 `mock`, `sandbox`, `internal`, `dev`, `test` 류 개발자 문구를 노출하지 않는다.
- reward moment는 claim 버튼을 누른 뒤 전용 sheet/modal로 확인 가능해야 한다.

## 화면별 목표

### Upgrades
- quick-buy를 carved mode stones / game segmented selector로 재스킨한다.
- selected mode는 시각적으로 즉시 구분되고 `aria-pressed`는 유지한다.
- tool slot은 filled pedestal로 보이고 icon은 중앙 배치한다.
- level/effect/cost/buy 가능성이 긴 설명보다 먼저 읽혀야 한다.
- 360x740에서 CTA가 tab dock에 묻히지 않아야 한다.

### Daily Reward
- 홈 첫 viewport에서 오늘 받을 보상 또는 cooldown badge가 보여야 한다.
- claim 후 toast만으로 끝내지 않고 전용 reward sheet를 연다.
- Day, streak, reward amount, next reward preview를 표시한다.
- effects off/reduced motion에서도 정적 reward sheet가 보인다.

### Milestones
- D1/D3/D7은 stamp board / sticker sheet처럼 보인다.
- claimed state는 seal/stamp overlay로 즉시 구분한다.
- claim 후 badge reveal sheet를 연다.
- 360px에서 3개 badge와 CTA가 tab dock에 묻히지 않아야 한다.

### Prestige Result
- prestige ritual art를 result ceremony에 연결한다.
- gained leaves, total leaves, multiplier before/after, next goal을 ceremony layout으로 보여준다.
- reduced motion 환경에서도 정적 ceremony panel이 보인다.

### Store
- 5장 구성은 강한 순간 중심으로 재구성한다.
- public copy에서 mock/sandbox/internal/dev/test 표현을 제거한다.
- Korean text는 단어 중간 줄바꿈을 피한다.
- phone panel은 gameplay를 알아볼 수 있는 크기로 조정한다.

## 완료 판정

RC-10 종료 시 `RC10_SCREEN_SCORECARD.md`에서 모든 필수 영역이 8.0 이상이고 평균 8.0 이상이어야 한다. 하나라도 8.0 미만이면 내부 P1이 남은 것으로 보고 release candidate라고 쓰지 않는다.
