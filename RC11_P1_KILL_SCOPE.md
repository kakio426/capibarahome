# RC-11 Narrow P1 Kill Scope

기준일: 2026-05-07

## Goal

RC-11은 새 기능 추가가 아니라 RC-10 independent rescore에서 남은 P1 두 개만 제거하는 좁은 pass다.

## RC-10 Remaining P1

| P1 | RC-10 score | Evidence | RC-11 target |
| --- | ---: | --- | --- |
| Upgrade quick-buy / shelf | 7.2 | `qa-screenshots/390x844-upgrades-quick-buy.png`, `qa-screenshots/360x740-upgrades-quick-buy.png` | >= 8.0 |
| Store screenshot framing | 7.5 | `store-screenshots/iphone-*.png`, `store-screenshots/android-*.png` | >= 8.0 |

## Screens In Scope

- Upgrade quick-buy and first upgrade shelf card
- Store screenshot composition and public copy framing
- Minimal supporting polish for daily reward and milestone screenshot readability

## Explicitly Out Of Scope

- Save schema changes
- New gameplay systems
- New large raster assets
- New monetization, SDK, account, push, or server features
- RC-9/RC-10 audit deletion or score softening
- Quality claims based on test count, asset count, LOC, or document count

## Completion Criteria

- `RC11_INDEPENDENT_RESCORE.md` scores upgrade quick-buy >= 8.0.
- `RC11_INDEPENDENT_RESCORE.md` scores store screenshots >= 8.0.
- Combined average >= 8.0.
- Public store screenshot/listing copy has zero mock/sandbox/internal/dev/test/debug/provider wording.
- 360x740 upgrade CTA is not visually buried under the tab dock.
- If any target remains below 8.0, release candidate remains no-go and `RELEASE_BLOCKERS.md` must say so.

## Screenshot Evidence To Regenerate

- `qa-screenshots/360x740-upgrades-quick-buy.png`
- `qa-screenshots/390x844-upgrades-quick-buy.png`
- `qa-screenshots/430x932-upgrades-quick-buy.png`
- `qa-screenshots/desktop-1280x900-upgrades-quick-buy.png`
- `qa-screenshots/390x844-daily-reward-claim.png`
- `qa-screenshots/390x844-collection-milestones.png`
- `qa-screenshots/390x844-milestone-claim.png`
- `qa-screenshots/390x844-prestige-result.png`
- `store-screenshots/iphone-01-home.png` through `iphone-05-reward.png`
- `store-screenshots/android-01-home.png` through `android-05-reward.png`
