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

## 환생

```txt
goldenLeavesGain = floor(sqrt(totalLifetimeOranges / prestigeRequirement) x companionPrestigeGainMultiplier)
prestigeMultiplier = 1 + goldenLeaves x goldenLeafPower
```

현재 첫 환생 기준은 누적 귤 `1,000,000`입니다.

## 오프라인 보상

```txt
offlineReward = epsAtLastSave x cappedOfflineSeconds x offlineEfficiency x companionOfflineMultiplier
cappedOfflineSeconds = min(elapsedSeconds, 28800)
```

최대 8시간까지 보상합니다. 저장 시점의 EPS를 기준으로 하므로 재접속 후 중복 지급을 막기 쉽습니다.

## 초반 5분 목표

- 첫 1분 안에 `말랑 앞발` 또는 `귤 바구니` 구매 가능
- 2분 안에 자동 생산 체감
- 5분 안에 두 번째 생산 시설 접근

## 첫 환생 목표

현재 설정은 테스트와 프로토타입 체감 우선입니다. 실제 출시 밸런스에서는 첫 환생 목표 시간을 30-60분 사이로 맞추는 것을 권장합니다.

## RC-1 보상 루프

- 8마리 카피바라는 친밀도 레벨에 따라 터치, EPS, 오프라인, 퀘스트 귤, 퀘스트 친밀도, 업적 귤, 장식 EPS, 환생 잎 보너스를 제공합니다.
- 40개 업적은 `AchievementRewardConfig.ts`에서 기본 tier 귤 보상을 받고, 일부 핵심 업적은 황금 나뭇잎/친밀도/영구 multiplier/장식 해금 보상을 추가로 받습니다.
- 홈의 장기 목표는 첫 환생 전후로 문구가 바뀌며, 업적 보상 8개와 장식 3개 배치를 후속 목표로 노출합니다.

## 테스트용 가속

개발 모드에서 `/?debug=1`로 접근한 뒤 Debug 패널의 `귤 1,000,000`, `환생 가능`, `오프라인 2시간` 버튼을 사용합니다. 실제 유저 E2E에서는 이 기능을 사용하지 않습니다.
