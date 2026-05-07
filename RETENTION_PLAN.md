# Retention Plan

기준일: 2026-05-07

## Scope

RC-7의 리텐션 목표는 RC-6에서 문서로만 남긴 D1/D3/D7 복귀 이유를 실제 저장되는 게임 시스템으로 일부 구현하는 것이다. 서버, 계정, push notification, 실제 결제/IAP는 포함하지 않는다.

## D0 첫 세션

| 구간 | 목표 | 현재 구현된 보상 |
| --- | --- | --- |
| 첫 10초 | 터치하면 즉시 귤이 늘고, 첫 구매 후보가 보인다 | tap gain, varied floating text, particle cap, 첫 quest/achievement unlock |
| 첫 1분 | 첫 업그레이드와 첫 자동 생산을 구매한다 | 말랑 앞발, 귤 바구니, 초반 quest/achievement 보상 |
| 첫 5분 | 업그레이드/퀘스트/앨범/장식/동료 중 여러 루프를 경험한다 | first five-minute E2E, claim reward, companion passive, decoration placement |
| 첫 15분 | 자동 생산과 다음 구간 목표를 따라간다 | 다음 목표 panel, progression tier unlock, upgrade shelf |
| 첫 30-40분 | 첫 환생 직전의 긴장감을 만든다 | 첫 환생 33분 simulation target, prestige progress, ready glow |

## D1 복귀 목표

- 목표: 오프라인 보상과 별개로 오늘의 복귀 보상을 받고, D1 복귀 배지를 수령해 다음날 다시 올 이유를 확인한다.
- 현재 구현: 오프라인 reward modal, 20시간 cooldown daily reward, D1 milestone badge, duplicate claim guard, 홈 retention panel.
- 검증: `retention.test.ts`, `retention-flow.spec.ts`, `visual-regression.spec.ts`의 `home-daily-available`, `daily-reward-claim`, `collection-milestones`.

## D3 중기 목표

- 목표: 꾸준한 집사 배지를 수령하고, 소량 황금 나뭇잎 보상으로 장기 성장 루프를 확인한다.
- 현재 구현: D3 milestone badge, Day 3 daily reward golden leaf, album retention badge ledger, milestone claim reveal.
- 검증: `retention.test.ts` D3 duplicate guard, `retention-flow.spec.ts` D3 claim/reload persistence.

## D7 장기 목표

- 목표: 황금 숲 단골 배지를 수령하고, 첫 주 복귀를 장기 목표 배지로 남긴다.
- 현재 구현: D7 milestone badge, Day 7 daily reward, 7일 이후 반복되는 Day 7 reward table, collection ledger.
- 검증: `retention.test.ts` D7 golden leaf reward, `retention-flow.spec.ts`, `qa-screenshots/390x844-collection-milestones.png`.

## 현재 구현된 보상

- quick-buy `1개 / 10개 / 최대`
- 구매 성공 shelf pulse와 구매 후 레벨 chip
- 구매 실패 shake/toast와 haptic guard
- 터치 floating text 위치/크기/색상 variation
- 오프라인 보상 staged reveal
- 환생 결과 panel
- 앨범/업적/퀘스트 claim reveal banner
- effects off/reduced motion 존중
- RC-7 daily reward:
  - 기준: local calendar day 대신 timestamp 기반 20시간 cooldown
  - reset: 마지막 claim 이후 48시간 초과 시 streak 1일차로 reset
  - loop: 1~7일 보상 후 Day 7 reward 반복
  - Day 1/2/4/5/6: 현재 EPS 기반 귤 보상과 최소 보장 귤
  - Day 3/7: 귤 + 소량 황금 나뭇잎
- RC-7 milestone:
  - D1 정원 복귀자
  - D3 꾸준한 집사
  - D7 황금 숲 단골
- RC-7 post-prestige goal chain:
  - 첫 환생 완료
  - 황금 나뭇잎 2개 보유
  - 환생 후 말랑 앞발 Lv.10
  - 환생 후 귤 바구니 Lv.10
  - 두 번째 환생 가능 상태

## 아직 없는 보상

| 항목 | 우선순위 | 이유 |
| --- | --- | --- |
| 서버 검증 daily calendar | P2 external | 현재는 timestamp cooldown 기반 local reward이며 날짜 조작 완전 방어는 목표가 아님 |
| push notification / re-engagement | P2 external | 플랫폼 정책, 계정/동의, 실제 native integration 필요 |
| companion room 자유 배치 | P3 | collection feel 강화 과제이며 core RC blocker는 아님 |
| 실제 음원 파일 | P3 external | 현재는 WebAudio fallback tone. 최종 사운드 라이선스가 필요 |

## 후속 개선

- P2: 14일/30일 milestone, seasonal stamp sheet, 복귀 reward presentation 강화.
- P2: 첫 환생 이후 goal chain을 두 번째 환생 이후 단계까지 확장.
- P3: album sticker placement와 companion room decoration 확대.
- P3 external: 실제 디바이스 notification/re-engagement 정책 검토.
