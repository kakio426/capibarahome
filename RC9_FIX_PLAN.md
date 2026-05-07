# RC-9 Fix Plan For RC-10

기준일: 2026-05-07

RC-10의 목표는 새 기능 추가가 아니다. RC-9에서 발견된 product-quality P1을 고쳐 평균 화면 점수를 8에 가깝게 올리는 것이다.

## RC-10 Theme

**Product UI & Reward Moment Fix Pass**

Scope:

- Upgrade screen premiumization
- Daily/milestone/prestige reward ceremony
- Store-facing screenshot/listing cleanup
- Home retention visibility
- Existing release docs reality alignment

Do not:

- Add new save schema unless absolutely required
- Add large new content systems
- Replace v2 raster art direction wholesale
- Use test pass as visual-quality proof

## P1 Tasks

### 1. Upgrade Screen Rebuild

Problems:

- Quick-buy control looks like default web buttons.
- Tool slot looks empty.
- Mobile CTA can fall under the tab dock.
- Text hierarchy makes upgrade cards feel like UI cards, not a game workbench.

Implementation target:

- Replace `1개 / 10개 / 최대` with carved mode stones or rotating purchase dial.
- Make the selected buy mode visually integrated with the shelf.
- Move buy cost and buy CTA into a protected bottom-safe card region.
- Fill tool slot with stronger pedestal, icon scale, shadow, and upgrade type material.
- Reduce explanatory body text and make level/effect/cost the dominant scan targets.

Acceptance evidence:

- `qa-screenshots/360x740-upgrades-quick-buy.png`
- `qa-screenshots/390x844-upgrades-quick-buy.png`
- `qa-screenshots/desktop-1280x900-upgrades-quick-buy.png`
- RC-10 score: upgrades avg >= 8.0

### 2. Daily Reward Moment

Problems:

- Daily reward is mostly a disabled card/toast state.
- Return reason is not visible enough in the first home view.
- Header/scroll state can clip text in screenshot evidence.

Implementation target:

- Add a dedicated daily reward reveal sheet with Day number, streak, reward icon, count-up/static fallback, and next reward preview.
- Put a compact daily claim badge inside or immediately below the home hero so it appears in the first viewport when claimable.
- Preserve 20h cooldown and duplicate guard.
- Effects off/reduced motion must show a static reward state.

Acceptance evidence:

- `qa-screenshots/360x740-home-daily-available.png`
- `qa-screenshots/390x844-daily-reward-claim.png`
- `qa-screenshots/430x932-home-daily-cooldown.png`
- RC-10 score: daily reward avg >= 8.0

### 3. Milestone Badge Board

Problems:

- D1/D3/D7 badges read like cards, not collectibles.
- Claim state is ambiguous.
- Bottom action/content collides with tab dock.

Implementation target:

- Rebuild D1/D3/D7 as a stamp board or sticker sheet.
- Claimed state should show an obvious stamp/seal.
- Claim should open a small reward recap, not only toast.
- The full 3-badge board must fit or scroll cleanly at 360px with bottom-safe spacing.

Acceptance evidence:

- `qa-screenshots/360x740-collection-milestones.png`
- `qa-screenshots/390x844-milestone-claim.png`
- RC-10 score: milestone avg >= 8.0

### 4. Prestige Result Ceremony

Problems:

- Result modal is functional but not ceremonial.
- It does not reuse the strongest ritual art language.

Implementation target:

- Reuse or crop prestige ritual art in the result state.
- Make gained leaves, new multiplier, and next goal appear as a ceremony sequence or static ritual panel.
- Show "before -> after" multiplier in a more tactile game style.

Acceptance evidence:

- `qa-screenshots/390x844-prestige-result.png`
- RC-10 score: prestige result avg >= 8.0

### 5. Store-Facing Cleanup

Problems:

- Store screenshot and listing contain `mock provider` / sandbox / internal readiness language.
- Store copy line breaks are not controlled.
- Phone panel often shows weak information screens at small scale.

Implementation target:

- Split public store copy from internal submission notes.
- Public copy should describe "보상 상점" without claiming real IAP/ads.
- Move mock/IAP/ad caveats to `PRIVACY_NOTES.md` and internal submission notes.
- Recompose store screenshots around stronger moments:
  - home tap loop
  - upgraded shelf after fix
  - milestone badge reveal
  - prestige ceremony
  - offline/daily reward
- Fix line width and typography so Korean text does not break awkwardly.

Acceptance evidence:

- `store-screenshots/iphone-01-home.png`
- `store-screenshots/iphone-02-album.png`
- `store-screenshots/iphone-03-prestige.png`
- `store-screenshots/iphone-04-shop.png`
- `store-screenshots/iphone-05-save.png`
- Android equivalents
- No `mock provider` in public screenshot copy.

### 6. Release Docs Realignment

Problems:

- Existing docs claim internal P0/P1 none.
- RC-9 finds product-quality P1.

Implementation target after fixes:

- Update `QA_REPORT.md`, `VISUAL_QA.md`, `SPEC_COVERAGE.md`, `RELEASE_BLOCKERS.md`, and `RELEASE_CHECKLIST.md`.
- Include RC-9 before/after references.
- Do not claim P1 closed until screenshots score >= 8 and no store-facing internal copy remains.

## RC-10 Verification

Required:

- `npm run build`
- `npm test`
- `npm run test:e2e`
- `npm run cap:sync`
- `git diff --check`

Visual:

- Re-score `SCREEN_SCORECARD.md` or add `RC10_SCREEN_SCORECARD.md`.
- Inspect 360/390/430/desktop screenshots manually.
- Store screenshots must be visually checked, not only generated.

Done criteria:

- Combined score >= 8.0 or any remaining <8 screen is documented as non-RC.
- No internal P1 product-quality gaps.
- No store-facing mock/internal/developer wording.
- Upgrade, daily reward, milestone, and prestige result each score >= 8.0.

