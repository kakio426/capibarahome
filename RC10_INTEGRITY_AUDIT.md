# RC-10 Integrity Audit

기준일: 2026-05-07

## Purpose

이 문서는 이전 "RC-10 완료/커밋/푸시" 보고와 실제 git 상태가 불일치한 문제를 정리하기 위한 감사 기록이다. 결론부터 말하면, 감사 시작 시점의 `HEAD`는 여전히 RC-8 커밋 `68f8cc3`에 있었고 RC-9/RC-10 코드, 문서, 스크린샷은 staged/unstaged/untracked 상태로 남아 있었다. 따라서 그 시점에서 RC-10 완료 또는 push 완료라고 말하면 안 됐다.

## Current Git State At Audit Start

```txt
git status --short --branch
## rc3-playtest-bug-bash...origin/rc3-playtest-bug-bash
 M PRIVACY_NOTES.md
 M QA_REPORT.md
 M RELEASE_BLOCKERS.md
 M RELEASE_CHECKLIST.md
 M SPEC_COVERAGE.md
 M STORE_LISTING_DRAFT.md
 M STORE_SCREENSHOT_PLAN.md
 M VISUAL_QA.md
 M e2e/retention-flow.spec.ts
 M e2e/store-screenshot-pack.spec.ts
 M e2e/visual-regression.spec.ts
 M src/ui/screens/CollectionScreen.tsx
 M src/ui/screens/MainGameScreen.tsx
 M src/ui/screens/PrestigePanel.tsx
 M src/ui/styles/hud.css
 M src/ui/styles/screens.css
 M store-screenshots/android-01-home.png
 D store-screenshots/android-02-album.png
 D store-screenshots/android-03-prestige.png
 D store-screenshots/android-04-shop.png
 D store-screenshots/android-05-save.png
 M store-screenshots/iphone-01-home.png
 D store-screenshots/iphone-02-album.png
 D store-screenshots/iphone-03-prestige.png
 D store-screenshots/iphone-04-shop.png
 D store-screenshots/iphone-05-save.png
?? PRODUCT_QUALITY_RED_TEAM.md
?? RC10_FIX_SCOPE.md
?? RC10_SCREEN_SCORECARD.md
?? RC9_FIX_PLAN.md
?? RELEASE_REALITY_CHECK.md
?? SCREEN_SCORECARD.md
?? TOP_30_PRODUCT_GAPS.md
?? store-screenshots/android-02-upgrade.png
?? store-screenshots/android-03-milestone.png
?? store-screenshots/android-04-prestige.png
?? store-screenshots/android-05-reward.png
?? store-screenshots/iphone-02-upgrade.png
?? store-screenshots/iphone-03-milestone.png
?? store-screenshots/iphone-04-prestige.png
?? store-screenshots/iphone-05-reward.png
```

추가로 `qa-screenshots/`의 360x740, 390x844, 430x932, desktop 1280x900 screenshot PNG 다수가 modified 상태였다. 이는 visual regression spec으로 재생성된 RC-10 evidence이며, 문서와 함께 커밋해야 하는 generated evidence로 분류한다.

```txt
git log --oneline --decorate -8
68f8cc3 (HEAD -> rc3-playtest-bug-bash, origin/rc3-playtest-bug-bash) test: harden rc8 release readiness
eb97aaa feat: add rc7 retention systems
31e91cd feat: improve rc6 product feel and retention
c8c8d72 feat: stabilize rc5 game ui css system
ca9f6dd feat: harden rc4 game ui skin
42db619 feat: polish rc4 game hud interactions
f2b8c87 feat: add v2 raster game art pass
af65a6d feat: add raster final art pass
```

## Changed Tracked Files

- Product/release docs: `PRIVACY_NOTES.md`, `QA_REPORT.md`, `RELEASE_BLOCKERS.md`, `RELEASE_CHECKLIST.md`, `SPEC_COVERAGE.md`, `STORE_LISTING_DRAFT.md`, `STORE_SCREENSHOT_PLAN.md`, `VISUAL_QA.md`
- E2E evidence generation: `e2e/retention-flow.spec.ts`, `e2e/store-screenshot-pack.spec.ts`, `e2e/visual-regression.spec.ts`
- RC-10 UI code: `src/ui/screens/CollectionScreen.tsx`, `src/ui/screens/MainGameScreen.tsx`, `src/ui/screens/PrestigePanel.tsx`, `src/ui/styles/hud.css`, `src/ui/styles/screens.css`
- QA screenshots: RC-10 regenerated `qa-screenshots/*.png` for mobile and desktop viewports
- Store screenshots: home images modified and old album/prestige/shop/save screenshots deleted as part of the RC-10 pack rename

## Untracked Files

- RC-9 before-audit docs: `PRODUCT_QUALITY_RED_TEAM.md`, `SCREEN_SCORECARD.md`, `TOP_30_PRODUCT_GAPS.md`, `RC9_FIX_PLAN.md`, `RELEASE_REALITY_CHECK.md`
- RC-10 result docs: `RC10_FIX_SCOPE.md`, `RC10_SCREEN_SCORECARD.md`
- New store screenshot names: `store-screenshots/iphone-02-upgrade.png`, `iphone-03-milestone.png`, `iphone-04-prestige.png`, `iphone-05-reward.png`, Android equivalents

## Deleted Store Screenshot Files

- `store-screenshots/iphone-02-album.png`
- `store-screenshots/iphone-03-prestige.png`
- `store-screenshots/iphone-04-shop.png`
- `store-screenshots/iphone-05-save.png`
- `store-screenshots/android-02-album.png`
- `store-screenshots/android-03-prestige.png`
- `store-screenshots/android-04-shop.png`
- `store-screenshots/android-05-save.png`

## New Store Screenshot Files

- `store-screenshots/iphone-02-upgrade.png`
- `store-screenshots/iphone-03-milestone.png`
- `store-screenshots/iphone-04-prestige.png`
- `store-screenshots/iphone-05-reward.png`
- `store-screenshots/android-02-upgrade.png`
- `store-screenshots/android-03-milestone.png`
- `store-screenshots/android-04-prestige.png`
- `store-screenshots/android-05-reward.png`

`e2e/store-screenshot-pack.spec.ts`, `STORE_SCREENSHOT_PLAN.md`, `VISUAL_QA.md`, `STORE_LISTING_DRAFT.md`가 모두 새 이름을 기준으로 정렬되어 있으므로 rename은 의도된 변경으로 분류한다.

## Classification

| 분류 | 항목 | 판단 |
| --- | --- | --- |
| 유지할 변경 | RC-9 before-audit 문서 | 삭제 금지. RC-10 전 no-go evidence로 보존 |
| 유지할 변경 | RC-10 UI/code/E2E/docs | RC-10 구현 결과로 유지하되 점수는 독립 재감사로 보정 |
| 커밋해야 할 변경 | `qa-screenshots/`, `store-screenshots/` | 문서가 참조하는 visual evidence이므로 커밋 대상 |
| 커밋해야 할 변경 | old store screenshot deletion and new filename additions | RC-10 store screenshot pack 재구성에 따른 의도된 교체 |
| 삭제/복구해야 할 변경 | 없음 | 현재 발견된 변경은 RC-9/RC-10 작업 산출물 또는 evidence |
| regenerate artifact | screenshot PNG 전체 | 커밋 대상. 재검증 명령이 다시 생성할 수 있으나 문서 evidence와 일치해야 함 |

## RC-9 / RC-10 Document Integrity

- `PRODUCT_QUALITY_RED_TEAM.md`, `SCREEN_SCORECARD.md`, `TOP_30_PRODUCT_GAPS.md`, `RC9_FIX_PLAN.md`, `RELEASE_REALITY_CHECK.md`는 RC-9 before audit로 남아 있다.
- `RC10_FIX_SCOPE.md`, `RC10_SCREEN_SCORECARD.md`는 RC-10 작업 결과 문서로 남아 있다.
- 이 감사에서 `RC10_INDEPENDENT_RESCORE.md`를 추가해 8.2 자기평가를 독립 보정한다.
- RC-9 문서는 삭제하거나 완화하지 않는다.

## Store Copy Integrity

`STORE_LISTING_DRAFT.md`의 공개 설명, feature list, screenshot copy에는 `mock`, `sandbox`, `internal`, `dev`, `test` 같은 store-facing 부적절 문구가 없다. 광고/IAP 구현 상태 caveat는 submission notes/privacy/release docs 영역에만 분리되어 있다. Store screenshot image 자체에도 내부 개발자 문구는 보이지 않는다.

## Decision

이번 감사의 우선순위는 코드 새 기능 추가가 아니라 워킹트리 정합성과 제품 품질 근거 정직성이다. 따라서 RC-10 구현물과 evidence는 커밋하되, `RC10_SCREEN_SCORECARD.md`의 8.2 통과 선언은 `RC10_INDEPENDENT_RESCORE.md` 기준으로 보정해야 한다.
