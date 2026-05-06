# Balance Guide

콘텐츠 확장 기준: 현재 업그레이드/시설은 30종이며, 5개 성장 구간(`마당`, `귤 창고`, `온천`, `대나무 정원`, `황금 숲`)에 tiered unlock으로 배치되어 있습니다.

모든 수치는 `src/config/GameConfig.ts`, `src/config/BalanceConfig.ts`, `src/config/MonetizationConfig.ts`에서 조정합니다.

## 터치 수익

```txt
tapGain = baseTapGain x tapUpgradeMultiplier x prestigeMultiplier x adMultiplier x companionTapMultiplier x claimedAchievementMultiplier
```

- `baseTapGain`: `GameConfig.tap.baseGain`
- 터치 업그레이드: `BalanceConfig.tapUpgrades`
- 황금 나뭇잎 배율: `1 + goldenLeaves x goldenLeafPower`
- 광고 버프 배율: `MonetizationConfig.rewardedAd.multiplier`

## EPS

```txt
eps = sum(generatorBaseEPS x generatorLevel)
      x globalMultiplier
      x prestigeMultiplier
      x adMultiplier
      x companionEpsMultiplier
      x decorationEpsMultiplier
      x claimedAchievementMultiplier
```

`butler_toolbox`는 자체 EPS도 제공하고, 레벨당 전체 자동 생산 배율도 올립니다. 이 의도는 초반 자동 생산 체감과 중반 배율 성장을 동시에 주기 위한 것입니다.

## 업그레이드 비용

```txt
cost(level) = baseCost x growthRate ^ level
```

결과는 `BigNumberLite.floor()`로 정수화합니다.

RC-6 quick-buy는 같은 cost 수식을 연속 합산한다.

- `1개`: 현재 레벨 1회 비용만 요구
- `10개`: 최대 레벨까지 남은 수량이 10개 미만이면 남은 수량만 구매, 그 외에는 10회 합산 비용을 모두 감당할 때만 구매
- `최대`: 현재 귤로 구매 가능한 레벨을 순차 계산하되 안전 loop cap을 둠
- 모든 계산은 `UpgradeManager.calculateUpgradePurchasePlan`과 `BigNumberLite`를 사용하며, 구매 후 음수 귤은 허용하지 않음

## 환생

```txt
goldenLeavesGain = floor(sqrt(totalLifetimeOranges / prestigeRequirement) x companionPrestigeGainMultiplier)
prestigeMultiplier = 1 + goldenLeaves x goldenLeafPower
```

현재 첫 환생 기준은 누적 귤 `25,000,000`입니다.

## 오프라인 보상

```txt
offlineReward = epsAtLastSave x cappedOfflineSeconds x offlineEfficiency x companionOfflineMultiplier
cappedOfflineSeconds = min(elapsedSeconds, 28800)
```

최대 8시간까지 보상합니다. 저장 시점의 EPS를 기준으로 하므로 재접속 후 중복 지급을 막기 쉽습니다.

RC reload QA 기준으로 60초 미만 복귀 또는 보상 1 미만은 오프라인 보상 modal을 만들지 않습니다. 이 규칙은 일반적인 새로고침/저장 확인 중 modal backdrop이 실제 유저 플로우를 막지 않게 하기 위한 제품 UX gate입니다.

## 초반 5분 목표

- 첫 10초 안에 터치 반응, floating text, 첫 구매 후보가 보여야 함
- 첫 1분 안에 `말랑 앞발` 또는 `귤 바구니` 구매 가능
- 2분 안에 자동 생산 체감
- 5분 안에 업그레이드, 퀘스트, 앨범 보상, 장식, 동료 보너스 중 2개 이상이 아니라 대부분을 경험
- 15분 전후 창고/온천 구간의 다음 시설 목표 노출

## 첫 환생 목표

RC-3 시뮬레이션 기준 첫 환생 가능 시간은 33분 0초입니다. 목표권은 30-60분이며, 이 범위를 벗어나면 `GameConfig.prestige.requirement`, 중반 시설 baseCost/baseEps, 퀘스트 보상량 순서로 조정합니다.

RC-6 playtest checkpoint:

| 구간 | 누적 귤 | EPS | 다음 목표 |
| --- | ---: | ---: | --- |
| 10초 | 3.15K | 0 | 귤 바구니 구매 가능 |
| 1분 | 12.9K | 1 | 말랑 앞발 구매 가능 |
| 5분 | 195K | 29 | 낮잠 평상 구매 가능 |
| 15분 | 14.8M | 630 | 귤 분류대 구매 가능 |
| 30분 | 22.6M | 9.4K | 귤 스푼 목표까지 241K |
| 첫 환생 | 47.8M | 10.6K | 황금 나뭇잎 1개 |
| 환생 후 30분 | 93M | 20.5K | 황금 나뭇잎 2개 예상 |

## RC-6 Retention Checkpoints

`BalanceSimulator.ts`는 D1/D3/D7 가정 checkpoint도 기록한다. 이 값은 장기 자동 플레이 기준의 방향 확인용이며, 실제 daily reward calendar는 아직 구현하지 않았다.

| 구간 | 누적 귤 | EPS | 환생 예상 |
| --- | ---: | ---: | ---: |
| 1일차 복귀 | 935B | 99.8M | 212 |
| 3일차 목표 | 634T | 6.56B | 5.54K |
| 7일차 목표 | 3.79Qa | 11.1B | 13.5K |

## RC-3 보상 루프

- 8마리 카피바라는 친밀도 레벨에 따라 터치, EPS, 오프라인, 퀘스트 귤, 퀘스트 친밀도, 업적 귤, 장식 EPS, 환생 잎 보너스를 제공합니다.
- 40개 업적은 `AchievementRewardConfig.ts`에서 기본 tier 귤 보상을 받고, 일부 핵심 업적은 황금 나뭇잎/친밀도/영구 multiplier/장식 해금 보상을 추가로 받습니다.
- 홈의 장기 목표는 첫 환생 전후로 문구가 바뀌며, 업적 보상 8개와 장식 3개 배치를 후속 목표로 노출합니다.

## 테스트용 가속

개발 모드에서 `/?debug=1`로 접근한 뒤 Debug 패널의 `귤 1,000,000`, `환생 가능`, `오프라인 2시간` 버튼을 사용합니다. `환생 가능` 버튼은 `GameConfig.prestige.requirement`를 기준으로 상태를 만든다. 실제 유저 E2E에서는 이 기능을 사용하지 않습니다.
