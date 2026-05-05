# Balance Simulation

기준일: 2026-05-05

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
4 tests passed
```

## Simulation Rules

- 기본 입력: 1.2 taps/sec
- 기본 tick: 5초
- 자동 구매: 현재 해금되고 구매 가능한 가장 저렴한 업그레이드를 반복 구매
- 수익 계산: `selectTapGain`, `selectEps` 사용
- 카피바라 passive, 업적 claim 영구 배율, 장식 EPS 보너스는 selector 경유로 반영
- 광고 버프: `adBoostActive` option으로 2배 수익 반영
- 환생 후 성장: `startingGoldenLeaf` option으로 영구 배율 반영
- 오프라인 보상 상한: `GameConfig.offline.maxSeconds` 8시간 기준으로 계산

## Required Checkpoints

| 요구 항목 | 자동 검증 |
| --- | --- |
| 첫 1분 | checkpoint 생성 및 해금 업그레이드 수 확인 |
| 첫 5분 | checkpoint 생성 |
| 첫 30분 | checkpoint 생성 |
| 첫 2시간 | checkpoint 생성 및 업그레이드 보유량 증가 확인 |
| 첫 환생까지 예상 시간 | `firstPrestigeSeconds`, `firstPrestigeLabel` 계산 |
| 환생 후 30분 | 첫 환생 도달 시 `postPrestigeThirtyMinuteCheckpoint` 생성 |
| 환생 후 성장 속도 | `startingGoldenLeaf: "5"` 결과가 fresh보다 빠른지 확인 |
| 광고 버프 적용 시 변화 | `adBoostActive: true` 결과가 normal보다 큰지 확인 |
| 오프라인 보상 상한 | 8시간 cap reward 문자열 계산 |

## Balance Decision

현재 RC-1은 초반에 손으로 시작하고, 자동 생산 시설이 바로 붙으며, 업적 보상 claim과 카피바라 passive가 중반 이후 수익/오프라인/환생 흐름을 보강한다. 실제 출시 전에는 물리 기기 플레이와 첫 환생까지 실제 체감 시간이 필요하므로, 시뮬레이션은 “자동 회귀 검증”으로 사용하고 최종 밸런스 확정 근거로 단독 사용하지 않는다.
