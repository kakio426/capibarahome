# RC-7 Retention System Audit

## Baseline

RC-6 shipped quick-buy, purchase feel, offline reward reveal, prestige result panel, album claim reveal, and a D0/D1/D3/D7 retention plan. The actual game state still had no timestamp-based daily reward system, no D1/D3/D7 claimable milestone rewards, and no post-prestige goal chain.

## Current D0/D1/D3/D7 Elements

| Area | Before RC-7 | Severity |
| --- | --- | --- |
| D0 first session | Tutorial, tap, upgrade, quest, album, first prestige target | P3 polish only |
| D1 return | Offline reward and documented plan only | P1 for this pass |
| D3 return | Documented milestone idea only | P1 for this pass |
| D7 return | Documented milestone idea only | P1 for this pass |
| Post-prestige next goal | Result panel showed a generic next target | P1 for this pass |

## Save Schema Need

RC-7 requires persistent claim/cooldown state, so save schema moves from version 4 to version 5.

Added state:

```ts
retention: {
  firstPlayedAt: number;
  lastDailyClaimAt: number | null;
  dailyStreak: number;
  claimedMilestones: Record<string, boolean>;
  postPrestigeGoalStep: number;
}
```

Migration rule: old saves receive safe defaults based on `createdAt`; corrupted/future timestamps are clamped; milestone records are sanitized to known D1/D3/D7 ids.

## P0/P1 Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Old save/import breakage | P0 | Version 5 migration, checksum compatibility, save tests |
| Duplicate reward payout | P0 | Claim guards for daily/milestone/post-prestige goal; unit tests |
| Daily reward economy inflation | P1 | EPS-minute reward with minimum floors; balance/playtest docs updated |
| Debug shortcut leaking into real user flow | P1 | Debug helpers only under `?debug=1`; normal E2E uses seeded saves, not debug panel |
| 360px UI overflow | P1 | Visual screenshots regenerated for daily, milestone, post-prestige states |

## RC-7 Implemented Scope

- 20-hour cooldown daily reward with 48-hour streak reset.
- 7-day looping reward table with BigNumber orange rewards and small golden leaf rewards on Day 3/7.
- D1/D3/D7 milestone badge rewards with duplicate-claim protection.
- Post-prestige goal chain:
  1. First prestige complete
  2. Hold 2 golden leaves
  3. Rebuild Soft Paw Lv.10
  4. Rebuild Orange Basket Lv.10
  5. Reach second-prestige-ready state
- Home retention panel for daily reward and post-prestige goal.
- Collection retention badge ledger.
- Debug-only retention helper buttons.
- Unit/E2E/visual QA coverage.

## Explicitly Excluded

- Server account sync.
- Push notification scheduling.
- Anti-cheat grade date manipulation defense.
- Real IAP/payment integration.
- New bottom tab for retention.
- Large new raster art batch.

## Status

Internal RC-7 P0/P1 retention blockers are resolved in implementation and must stay green through final build/test/e2e/cap verification. Remaining items are P2/P3 only and tracked in `RELEASE_BLOCKERS.md`.
