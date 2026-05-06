# Retention Plan

기준일: 2026-05-06

## Scope

RC-6의 리텐션 목표는 새 과금 구조나 save schema를 추가하는 것이 아니라, 현재 구현된 업그레이드/퀘스트/앨범/장식/동료/환생 루프가 첫날부터 7일차까지 어떤 목표로 이어지는지 명확히 만드는 것이다.

## D0 첫 세션

| 구간 | 목표 | 현재 구현된 보상 |
| --- | --- | --- |
| 첫 10초 | 터치하면 즉시 귤이 늘고, 첫 구매 후보가 보인다 | tap gain, varied floating text, particle cap, 첫 quest/achievement unlock |
| 첫 1분 | 첫 업그레이드와 첫 자동 생산을 구매한다 | 말랑 앞발, 귤 바구니, 초반 quest/achievement 보상 |
| 첫 5분 | 업그레이드/퀘스트/앨범/장식/동료 중 여러 루프를 경험한다 | first five-minute E2E, claim reward, companion passive, decoration placement |
| 첫 15분 | 자동 생산과 다음 구간 목표를 따라간다 | 다음 목표 panel, progression tier unlock, upgrade shelf |
| 첫 30-40분 | 첫 환생 직전의 긴장감을 만든다 | 첫 환생 33분 simulation target, prestige progress, ready glow |

## D1 복귀 목표

- 목표: 오프라인 보상을 받고, 환생 가능 상태와 다음 목표를 확인한다.
- 현재 구현: 오프라인 reward modal, staged basket reveal, reward count plaque, duplicate claim guard, prestige-ready state.
- Simulation: 1일차 가정에서 누적 `935B`, EPS `99.8M`, 환생 예상 `212` 황금 나뭇잎.

## D3 중기 목표

- 목표: 환생 반복으로 더 큰 배율 목표를 확인하고, 남은 장식/업적 보상을 회수한다.
- 현재 구현: post-prestige result panel, achievement/quest claim reveal, companion passive bonuses.
- Simulation: 3일차 가정에서 누적 `634T`, EPS `6.56B`, 환생 예상 `5.54K` 황금 나뭇잎.

## D7 장기 목표

- 목표: 황금 숲 구간과 장기 환생 보상을 바라보며 다음 콘텐츠 확장 여지를 남긴다.
- 현재 구현: long-term home panel, prestige target text, generated achievement/decor/companion collection.
- Simulation: 7일차 가정에서 누적 `3.79Qa`, EPS `11.1B`, 환생 예상 `13.5K` 황금 나뭇잎.

## 현재 구현된 RC-6 보강

- quick-buy `1개 / 10개 / 최대`
- 구매 성공 shelf pulse와 구매 후 레벨 chip
- 구매 실패 shake/toast와 haptic guard
- 터치 floating text 위치/크기/색상 variation
- 오프라인 보상 staged reveal
- 환생 결과 panel
- 앨범/업적/퀘스트 claim reveal banner
- effects off/reduced motion 존중

## 아직 없는 보상

| 항목 | 우선순위 | 이유 |
| --- | --- | --- |
| 실제 일일 로그인 보상 calendar | P2 | save schema와 migration을 동반하는 기능이라 RC-6에서는 문서화만 함 |
| D3/D7 milestone badge 지급 | P2 | 장기 리텐션에는 좋지만 현재 achievement schema 확장과 밸런스 재검증이 필요 |
| companion room 자유 배치 | P3 | collection feel 강화 과제이며 core RC blocker는 아님 |
| 실제 음원 파일 | P3 external | 현재는 WebAudio fallback tone. 최종 사운드 라이선스가 필요 |

## 후속 개선

- P2: save migration을 포함한 daily reward state 추가.
- P2: 첫 환생 이후 별도 goal chain과 D3/D7 milestone achievements 추가.
- P3: album sticker placement와 companion room decoration 확대.
- P3 external: 실제 디바이스 notification/re-engagement 정책 검토.
