# RC20 First 10 Minutes Flow

Date: 2026-05-10 KST

## Flow Goals

| Time | Player Question | RC20 Answer |
| --- | --- | --- |
| First 5 seconds | What do I press? | The capybara/orange scene and large `귤 주기` CTA are the dominant first screen. |
| First 30 seconds | Did I get anything? | Orange count updates immediately, floating text/burst feedback appears, and tap gain is shown. |
| First 1 minute | What should I buy? | Next-action panel points to the first growth purchase instead of shop/IAP. |
| First 3 minutes | What changed after buying? | Growth screen shows level/effect before/after deltas and a purchase result banner. |
| First 5 minutes | What else can I claim? | Reward/daily/album claim moments use sheets or banners rather than only toast. |
| First 10 minutes | What is the larger goal? | Next-action logic keeps pointing to growth, album rewards, EPS, or first prestige progression. |

## Next-Action Rules

The home panel should show one clear recommendation:

- tap a few more times if the first tactile reward is not established;
- buy the first available growth item when it is affordable;
- guide to growth if an upgrade will unlock EPS or meaningful tap gain;
- guide to album/reward only when a claimable reward exists;
- guide to prestige only when it is relevant;
- avoid shop/IAP in the first core progression path.

## Verification

| Check | Evidence |
| --- | --- |
| Home CTA visible and clickable | `e2e/playability-reboot.spec.ts` |
| Ten taps increase oranges and show feedback | `e2e/playability-reboot.spec.ts` |
| First upgrade purchase shows before/after | `e2e/playability-reboot.spec.ts` |
| Quick-buy max remains clickable | `e2e/playability-reboot.spec.ts` |
| Reward sheet states what was earned | `qa-screenshots/390x844-reward-sheet.png` |
| Bottom nav does not block core CTA | `e2e/layout-regression.spec.ts` |

## Remaining Physical QA

The first 10 minutes must still be replayed on a real Android phone with the RC20 APK. Required checks are listed in `DEVICE_QA_CHECKLIST.md`.
