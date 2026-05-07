# Save Schema

저장은 JSON payload에 checksum을 붙인 뒤 Base64로 인코딩해 localStorage에 저장합니다. Base64는 암호화가 아닙니다.

## localStorage

- key: `capybara-butler-save`
- version: `GameConfig.save.version` = 5
- auto save interval: `GameConfig.save.autoSaveIntervalMs`

Capacitor native wrapper에서도 같은 WebView storage 계층을 사용합니다. 실제 native packaging 이후에는 iOS/Android에서 앱 삭제, 업데이트, 강제 종료 후 저장 유지 동작을 별도로 확인해야 합니다.

## Payload

```ts
{
  version: number;
  checksum: string;
  createdAt: number;
  updatedAt: number;
  lastSavedAt: number;
  currencies: {
    orange: string;
    goldenLeaf: string;
  };
  lifetime: {
    totalOrangesEarned: string;
    totalTaps: number;
    totalPrestiges: number;
  };
  upgrades: Record<string, number>;
  generators: Record<string, number>;
  settings: {
    effectsEnabled: boolean;
    soundMuted: boolean;
    musicMuted: boolean;
    vibrationEnabled: boolean;
    numberFormat: "short" | "scientific";
  };
  tutorial: {
    completed: boolean;
    step: number;
  };
  monetization: {
    adBoostUntil: number | null;
    purchasedProductIds: string[];
  };
  achievements: {
    unlockedIds: string[];
    claimedRewardIds: string[];
    lastUnlockedId: string | null;
  };
  quests: {
    claimedIds: string[];
    lastClaimedId: string | null;
  };
  companions: {
    friendshipById: Record<string, number>;
    highlightedId: string | null;
  };
  decorations: {
    equippedBySlot: Record<string, string>;
  };
  progression: {
    unlockedTierIds: string[];
    lastUnlockedTierId: string | null;
  };
  retention: {
    firstPlayedAt: number;
    lastDailyClaimAt: number | null;
    dailyStreak: number;
    claimedMilestones: Record<string, boolean>;
    postPrestigeGoalStep: number;
  };
  epsAtLastSave: string;
}
```

## Version 5 변경점

- `retention.firstPlayedAt`
- `retention.lastDailyClaimAt`
- `retention.dailyStreak`
- `retention.claimedMilestones`
- `retention.postPrestigeGoalStep`

RC-7에서 일일 복귀 보상, D1/D3/D7 복귀 배지, 첫 환생 이후 goal chain을 저장하기 위해 추가했습니다. 구버전 save는 `createdAt` 기준의 `firstPlayedAt`, `null` daily claim, streak `0`, known milestone false, post-prestige step `0`으로 migration합니다. 손상된 retention timestamp는 앱이 죽지 않도록 안전값으로 보정합니다.

## Version 4 변경점

- `achievements.claimedRewardIds`
- `progression.unlockedTierIds`
- `progression.lastUnlockedTierId`

구버전 save에는 업적 보상 수령 상태와 성장 구간 unlock 기록이 없으므로 migration에서 빈 보상 배열, 기본 `yard` unlock, `null` last tier를 채웁니다.

## Version 3 변경점

- `quests.claimedIds`
- `quests.lastClaimedId`
- `companions.friendshipById`
- `companions.highlightedId`
- `decorations.equippedBySlot`

구버전 save에는 퀘스트/동료/장식 필드가 없으므로 migration에서 빈 배열, 빈 object, 기본 `sunny_yard` 장식을 채웁니다.

## Version 2 변경점

- `achievements.unlockedIds`
- `achievements.lastUnlockedId`

구버전 save에는 achievement 필드가 없으므로 migration에서 빈 배열과 `null`을 기본값으로 채웁니다.

## Version 1 기준

초기 save는 currency/lifetime/upgrades/generators/settings/tutorial/monetization/epsAtLastSave 중심입니다. `settings.vibrationEnabled`, `settings.numberFormat`, `monetization.purchasedProductIds`, achievement/quest/companion/decoration/progression 필드가 없을 수 있습니다.

RC-3 bug bash와 RC-7 save tests에서 v1/v2/v3 payload를 checksum 포함 import하고 현재 v5 state로 안전하게 변환되는지 검증합니다.

## Checksum

`SaveManager`는 checksum 필드를 제외한 payload를 key 정렬 stringify한 뒤 FNV-1a 기반 checksum을 계산합니다. Import 시 checksum이 다르면 거부하고 앱은 유지됩니다.

## Migration

`src/state/migrations.ts`에서 낮은 버전 payload를 현재 버전으로 변환합니다. 새 필드를 추가할 때는 기본값을 여기에 넣어야 합니다.

## Export/Import

- Export: 현재 상태를 payload로 만들고 checksum을 붙인 뒤 Base64 문자열로 반환
- Import: Base64 decode, JSON parse, checksum 검증, migration, state 변환
- 실패: `ImportResult.ok === false`와 오류 메시지 반환. UI는 앱을 죽이지 않고 메시지를 표시합니다.

## 손상 데이터 처리

아래 경우 모두 안전 실패로 처리합니다.

- Base64 문자열 오류
- JSON parse 오류
- checksum 불일치
- 지원하지 않는 미래 saveVersion
- 숫자 파싱 실패
- 손상된 retention state
