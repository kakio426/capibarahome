# RC-10 Independent Re-Score

기준일: 2026-05-07

## Method

이 문서는 RC-10의 기존 `8.2 / 10` 자기평가를 그대로 믿지 않고, 최신 screenshot을 직접 다시 열어 독립적으로 재점수한 결과다. 자동 테스트 통과, 파일 수, asset 수, 구현량은 점수 근거로 쓰지 않았다.

검토한 주요 evidence:

- `qa-screenshots/390x844-upgrades-quick-buy.png`
- `qa-screenshots/360x740-upgrades-quick-buy.png`
- `qa-screenshots/390x844-daily-reward-claim.png`
- `qa-screenshots/390x844-collection-milestones.png`
- `qa-screenshots/360x740-collection-milestones.png`
- `qa-screenshots/390x844-milestone-claim.png`
- `qa-screenshots/390x844-prestige-result.png`
- `store-screenshots/iphone-01-home.png`
- `store-screenshots/iphone-02-upgrade.png`
- `store-screenshots/iphone-03-milestone.png`
- `store-screenshots/iphone-04-prestige.png`
- `store-screenshots/iphone-05-reward.png`
- Android store screenshot 5장

## Corrected Score Table

| Screen | Visual | Interaction | Progression | Reward feel | Info hierarchy | Mobile ergonomics | Avg | Corrected verdict |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Upgrades / quick-buy | 7.0 | 7.5 | 7.7 | 6.9 | 7.1 | 6.9 | 7.2 | P1 remains for RC-10 product gate |
| Daily reward moment | 7.8 | 7.8 | 8.1 | 8.0 | 7.9 | 7.8 | 7.9 | Improved, but below 8.0 score gate |
| D1/D3/D7 milestone | 7.9 | 7.8 | 8.1 | 7.9 | 7.6 | 7.5 | 7.8 | Improved, but below 8.0 score gate |
| Prestige result ceremony | 8.3 | 8.0 | 8.2 | 8.5 | 8.1 | 8.0 | 8.2 | Passes RC-10 score gate |
| Store screenshots | 7.6 | 7.2 | 7.7 | 7.8 | 7.5 | 7.3 | 7.5 | P1 remains for store-facing RC gate |

## Combined Score

| Metric | Previous RC-10 self score | Independent corrected score | Delta |
| --- | ---: | ---: | ---: |
| Upgrades / quick-buy | 8.1 | 7.2 | -0.9 |
| Daily reward moment | 8.2 | 7.9 | -0.3 |
| D1/D3/D7 milestone | 8.2 | 7.8 | -0.4 |
| Prestige result ceremony | 8.4 | 8.2 | -0.2 |
| Store screenshots | 8.2 | 7.5 | -0.7 |
| Combined average | 8.2 | 7.7 | -0.5 |

RC-10 independent result: **No-go as product release candidate**. The implementation is directionally better than RC-9, but the required average is below 8.0 and at least the upgrade and store screenshot gates still carry product-quality P1.

## Screen Findings

### Upgrades / Quick-Buy

What improved:

- The `1개 / 10개 / 최대` selector is no longer a plain browser segmented control.
- Selected state is visually clearer.
- Cost and CTA are visible at 360x740 and no longer fully buried by the tab dock.
- The shelf/pedestal direction is more game-like than RC-9.

Why it is not 8.0:

- The first upgrade still reads as a long decorated information card more than a compact tool shelf.
- The tall left pedestal has an empty-slot feel despite the small icon.
- The 360px screenshot places the CTA very close to the bottom tab dock and the card feels cramped.
- Reward feel for buying is not visible from the screenshot; the screen communicates calculation more than a satisfying shop interaction.

Corrected score: **7.2 / 10**.

### Daily Reward Moment

What improved:

- The claim flow now has a dedicated reward sheet instead of ending with toast only.
- Day/streak/reward/next reward are visible.
- Public copy is not developer-facing.

Why it is not clearly 8.0:

- The reward sheet is competent but still mostly a large parchment panel with icon/amount rows.
- The first screenshot shows heavy modal backdrop empty space above the sheet.
- The "moment" is readable, but not yet memorable enough to carry retention marketing by itself.

Corrected score: **7.9 / 10**.

### D1/D3/D7 Milestones

What improved:

- D1/D3/D7 are presented as a badge board instead of a plain list.
- Claim result has a stamp/seal overlay and reward recap.
- 360px does not hard-break or make the CTA impossible to use.

Why it is not clearly 8.0:

- On 360px, milestone card text uses truncation and the bottom content sits close to the tab dock.
- The board still has tall rectangular card rhythm; it is improved, but not fully a premium sticker album.
- Claimed/pending distinction is better in modal, but weaker on the board before claim.

Corrected score: **7.8 / 10**.

### Prestige Result Ceremony

What improved:

- Ritual raster art anchors the result panel.
- Gained leaves, total leaves, multiplier before/after, and next goal are visible in one ceremony layout.
- This is the strongest RC-10 screen and clears the 8.0 threshold.

Corrected score: **8.2 / 10**.

### Store Screenshots

What improved:

- The old album/prestige/shop/save pack was replaced with home/upgrade/milestone/prestige/reward moments.
- Public copy does not expose `mock`, `sandbox`, `internal`, `dev`, or `test` wording.
- Korean copy generally avoids awkward word-level breaks.

Why it is not 8.0:

- Several screenshots still feel like a strong background with a small gameplay panel placed on top.
- The gameplay panel is often too low or too small to clearly sell the UI moment at a glance.
- The upgrade screenshot inherits the upgrade screen weakness.
- Milestone/reward screenshots show modal moments, but the phone panel is blurred/dimmed enough that the product moment reads softer than the key art.

Corrected score: **7.5 / 10**.

## Official Correction

`RC10_SCREEN_SCORECARD.md`의 previous self-score `8.2`는 superseded로 본다. 이 독립 재점수가 현재 공식 RC-10 product-quality 판정이다.

## Remaining P1

- **P1: Upgrades quick-buy / upgrade shelf** below 8.0 release gate.
- **P1: Store screenshot product framing** below 8.0 release gate.

## Remaining P2/P3

- Daily reward sheet reward moment can be more memorable.
- Milestone badge board needs stronger sticker-book object language and less truncation on 360px.
- Store screenshot crop/scale/copy hierarchy needs another pass with gameplay panel readability as the first priority.
- Prestige ceremony could later add full animation, but it is not the current blocker.
