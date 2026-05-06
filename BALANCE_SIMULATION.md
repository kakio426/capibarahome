# Balance Simulation

기준일: 2026-05-06

자동 시뮬레이션 구현 위치:

- `src/systems/BalanceSimulator.ts`
- `src/tests/balanceSimulation.test.ts`

검증 명령:

```txt
npm test
```

현재 테스트 결과:

```txt
balanceSimulation.test.ts
6 tests passed
```

## Simulation Rules

- 기본 입력: 1.2 taps/sec
- 기본 RC-3 playtest tick: 15초
- 자동 구매: 현재 해금되고 구매 가능한 가장 저렴한 업그레이드를 tick당 최대 4회 구매
- 자동 보상: 완료된 퀘스트/업적 보상 claim과 해금 장식 배치를 유저 유지 행동으로 반영
- 수익 계산: `selectTapGain`, `selectEps` 사용
- 카피바라 passive, 업적 claim 영구 배율, 장식 EPS 보너스는 selector 경유로 반영
- 광고 버프: `adBoostActive` option으로 2배 수익 반영
- 환생 후 성장: `startingGoldenLeaf` option으로 영구 배율 반영
- 오프라인 보상 상한: `GameConfig.offline.maxSeconds` 8시간 기준으로 계산

## Required Checkpoints

| 요구 항목 | 자동 검증 |
| --- | --- |
| 첫 10초 | checkpoint 생성 및 첫 구매 후보 확인 |
| 첫 1분 | checkpoint 생성 및 해금 업그레이드 수 확인 |
| 첫 5분 | checkpoint 생성 |
| 첫 15분 | checkpoint 생성 |
| 첫 30분 | checkpoint 생성 |
| 첫 2시간 | checkpoint 생성 및 업그레이드 보유량 증가 확인 |
| 첫 환생까지 예상 시간 | `firstPrestigeSeconds`, `firstPrestigeLabel` 계산 |
| 환생 후 30분 | 첫 환생 도달 시 `postPrestigeThirtyMinuteCheckpoint` 생성 |
| D1/D3/D7 retention | 1일차/3일차/7일차 checkpoint 생성 |
| 환생 후 성장 속도 | `startingGoldenLeaf: "5"` 결과가 fresh보다 빠른지 확인 |
| 광고 버프 적용 시 변화 | `adBoostActive: true` 결과가 normal보다 큰지 확인 |
| 오프라인 보상 상한 | 8시간 cap reward 문자열 계산 |

## RC-6 Playtest Output

| 구간 | 누적 귤 | EPS | 보상 상태 | 다음 목표 |
| --- | ---: | ---: | --- | --- |
| 10초 | 3.15K | 0 | 퀘스트 6, 업적 5, 장식/동료 루프 노출 | 귤 바구니 구매 가능 |
| 1분 | 12.9K | 1 | 퀘스트 9, 업적 8, 장식 3 배치 | 말랑 앞발 구매 가능 |
| 5분 | 195K | 29 | 퀘스트 15, 업적 14, 장식 4 배치 | 낮잠 평상 구매 가능 |
| 15분 | 14.8M | 630 | 퀘스트 23, 업적 23, 장식 6 배치 | 귤 분류대 구매 가능 |
| 30분 | 22.6M | 9.4K | 퀘스트 30, 업적 25, 장식 6 배치 | 귤 스푼 목표까지 241K |
| 2시간 | 2.15B | 2.9M | 퀘스트 38, 업적 29, 장식 8 배치 | 환생 가능, 황금 나뭇잎 10개 |

첫 환생 가능 시간은 33분 0초다. 환생 가능 직전 상태는 누적 47.8M 귤, EPS 10.6K, 황금 나뭇잎 1개 예상이다.

## Retention Assumption Output

| 구간 | 누적 귤 | EPS | 구매 레벨 | 보상 상태 | 환생 예상 |
| --- | ---: | ---: | ---: | --- | ---: |
| 1일차 복귀 | 935B | 99.8M | 1,152 | 퀘스트 39, 업적 보상 30 | 212 |
| 3일차 목표 | 634T | 6.56B | 2,189 | 퀘스트 39, 업적 보상 30 | 5.54K |
| 7일차 목표 | 3.79Qa | 11.1B | 2,388 | 퀘스트 39, 업적 보상 30 | 13.5K |

## Balance Decision

RC-3에서 prestige requirement를 `25,000,000`으로 상향했다. 기존 1M 기준은 모든 보상을 적극 수령하는 유저에게 첫 환생을 너무 빨리 열었고, 30분 플레이 목표가 사라지는 문제가 있었다. 현재 값은 첫 5분 보상 밀도는 유지하면서 첫 환생을 30-60분 목표권에 둔다.
