# Save Schema

저장은 JSON payload에 checksum을 붙인 뒤 Base64로 인코딩해 localStorage에 저장합니다. Base64는 암호화가 아닙니다.

## localStorage

- key: `capybara-butler-save`
- version: `GameConfig.save.version` = 4
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
  epsAtLastSave: string;
}
```

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
