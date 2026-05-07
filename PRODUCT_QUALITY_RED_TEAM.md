# RC-9 Product Quality Red-Team Audit

기준일: 2026-05-07

## Verdict

**현재 빌드는 엔지니어링 안정성은 RC에 가깝지만, 제품 품질 기준으로는 release candidate가 아니다.**

이 판단은 build/test/E2E 통과를 부정하는 것이 아니다. RC-8의 save v5, retention, offline reward, prestige, quick-buy 회귀 검증은 의미가 있다. 다만 최신 스크린샷을 처음 보는 교사/학생/일반 모바일 유저 관점에서는 업그레이드, 리텐션 보상, milestone, store screenshot 쪽이 아직 "상용 idle game"보다 "잘 꾸민 웹앱"에 가깝다.

RC-9 screen 평균: `5.8 / 10`

RC-9 기준: 평균 8 미만이면 release candidate로 보지 않는다.

## Evidence Used

- Branch: `rc3-playtest-bug-bash`
- Latest commit inspected: `68f8cc3 test: harden rc8 release readiness`
- Latest app execution during RC-9:
  - `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`
  - Result: `6 passed (1.2m)`
  - This launched the current app through Playwright's Vite dev server and regenerated the current QA/store screenshots.
- Screenshot evidence:
  - `qa-screenshots/360x740-*.png`
  - `qa-screenshots/390x844-*.png`
  - `qa-screenshots/430x932-*.png`
  - `qa-screenshots/desktop-1280x900-*.png`
  - `store-screenshots/iphone-*.png`
  - `store-screenshots/android-*.png`
- Docs cross-checked:
  - `QA_REPORT.md`
  - `VISUAL_QA.md`
  - `SPEC_COVERAGE.md`
  - `RELEASE_BLOCKERS.md`
  - `RELEASE_CHECKLIST.md`
  - `RETENTION_PLAN.md`
  - `PLAYTEST_REPORT.md`
  - `SAVE_SCHEMA.md`
  - `PERFORMANCE_QA.md`
  - `SOURCE_BUDGET_REPORT.md`
  - `NATIVE_BUILD_GUIDE.md`
  - `DEVICE_QA_CHECKLIST.md`

## Prompt-To-Artifact Checklist

| Requirement | Evidence | RC-9 status |
| --- | --- | --- |
| No feature/code changes | Only docs and regenerated screenshot artifacts changed; no `src/` code edits | Satisfied |
| Run latest app and inspect 360/390/430/desktop screenshots | Playwright visual/store screenshot flow `6 passed`; images inspected manually | Satisfied |
| Inspect home/upgrades/collection/prestige/shop/settings/save/daily/milestone/offline/store | Reflected in `SCREEN_SCORECARD.md` and P1/P2 findings | Satisfied |
| Judge by time/money-worthy product quality, not tests | Verdict and scorecard explicitly ignore tests as quality proxy | Satisfied |
| Compare against Cats & Soup, Egg Inc., Cookie Clicker, AdVenture Capitalist polish bar | Competitor quality bar section and gap framing | Satisfied |
| Score each screen across six categories | `SCREEN_SCORECARD.md` table | Satisfied |
| Average under 8 means not release candidate | Combined score `5.8 / 10`; No-go verdict | Satisfied |
| Classify gaps P0/P1/P2/P3 | `TOP_30_PRODUCT_GAPS.md`, `RELEASE_REALITY_CHECK.md` | Satisfied |
| Do not say internal P0/P1 none when P1 exists | RC-9 says P1 exists and calls previous docs contradictory | Satisfied |
| Audit QA/Release/Spec contradictions | `RELEASE_REALITY_CHECK.md` | Satisfied |
| Do not use source/code/generated asset counts as quality evidence | Explicitly rejected in "Tests Pass But Product Is Weak" | Satisfied |
| Provide five named deliverables | All five files created | Satisfied |
| Do not mark goal complete | No goal complete action taken in RC-9 | Satisfied |

## Competitor Quality Bar

이 감사는 경쟁작을 복제하지 않는다. 기준만 빌린다.

- Cats & Soup: 첫 화면 캐릭터/시설/분위기와 보상 수집 감정이 화면을 지배한다.
- Egg, Inc.: 농장 성장, 투자 판단, prestige가 빠르게 읽힌다.
- Cookie Clicker: 숫자 성장과 클릭 보상감이 즉시 이해된다.
- AdVenture Capitalist: 구매 가능성, 수익 변화, 반복 구매 판단이 매우 빠르다.

기존 `COMPETITOR_BENCHMARK.md`의 공식/스토어 공개 source 기준:

- Cats & Soup: `https://play.google.com/store/apps/details?id=com.hidea.cat&hl=en_US`, `https://apps.apple.com/us/app/cats-soup-relaxing-cozy-games/id1581431235`
- Egg, Inc.: `https://play.google.com/store/apps/details?id=com.auxbrain.egginc&hl=en_US`, `https://apps.apple.com/us/app/egg-inc/id993492744`
- AdVenture Capitalist: `https://hyperhippo.com/games/adventure-capitalist/`
- Cookie Clicker: `https://orteil.dashnet.org/cookieclicker/`

## What Is Working

- Home key art is the strongest part of the product. The capybara/orange orchard visual is warm, readable, and clearly game-like.
- Save v5, localStorage fallback, pagehide/visibility save, offline reward, quick-buy, retention duplicate guards, and migration coverage are serious engineering work.
- Bottom tab dock, top header, carved buttons, and parchment panels now share a consistent visual language.
- Offline reward modal has the best reward moment among secondary screens.
- The project has enough screenshot coverage to support real visual review.

## P1 Product Gaps

| Area | P1 issue | Evidence | Why it blocks RC |
| --- | --- | --- | --- |
| Upgrades | Quick-buy control still looks like default web buttons; tool slot looks empty; 360px hides lower buy area behind tab dock | `390x844-upgrades-quick-buy.png`, `360x740-upgrades-quick-buy.png` | Upgrade screen is the core idle game loop. If this looks like a web form/card list, users will not perceive the game as premium. |
| Daily reward | Daily reward is not a reward moment. It is largely a faded card + toast and can sit below the first viewport | `390x844-daily-reward-claim.png`, `390x844-home-daily-available.png` | D1 retention depends on emotional payoff, not just saved state. |
| Milestones | D1/D3/D7 badges read like large text cards. Claim state/reveal is ambiguous and lower actions collide with tab dock | `390x844-collection-milestones.png`, `390x844-milestone-claim.png` | Long-term retention rewards do not feel collectible. |
| Store screenshots | Store screenshot copy exposes internal implementation wording: `mock provider`, sandbox validation, and awkward line breaks | `iphone-03-prestige.png`, `iphone-04-shop.png`, `STORE_LISTING_DRAFT.md` | Store-facing assets must sell the player fantasy, not development readiness. |
| Documentation reality | `RELEASE_BLOCKERS.md`, `VISUAL_QA.md`, `SPEC_COVERAGE.md` say internal P0/P1 none, but RC-9 finds P1 product-quality blockers | those docs + screenshots | The release record is too optimistic and would mislead future work. |

## P2 Product Gaps

- Settings no longer looks like browser checkboxes, but it remains a large settings form rather than a compact in-game ledger.
- Save modal is visually themed but still dominated by dense export code. It is usable, not delightful.
- Home first viewport gives excellent art but pushes daily/goal/progression context below the visible area.
- Prestige result panel is functional but not ceremonial. It does not reuse the stronger ritual raster art.
- Store gameplay panels are too small and often show the weakest information screens instead of the strongest game moments.
- Real audio files, haptic profiling, and physical-device FPS/thermal checks remain external or P2 readiness items.

## Tests Pass But Product Is Weak

| Passing evidence | Why it is insufficient |
| --- | --- |
| `npm test` 502 tests passed | Tests prove math/state guards, not whether a reward feels good. |
| `npm run test:e2e` 32 passed | E2E proves flows are clickable, not whether the screen earns user trust. |
| Screenshot files generated | File existence and overflow assertions do not prove premium visual hierarchy. |
| 253 SVG / 15 PNG asset pack | Asset count is not quality evidence. The current P1 gaps are layout/reward/composition issues. |
| "Internal P0/P1 none" in release docs | The statement conflicts with RC-9 screen review under product-quality criteria. |

## RC Decision

**No-go as product release candidate.**

Recommended next phase: `RC-10 Product UI & Reward Moment Fix Pass`, focused only on P1 product gaps. Do not add new systems until upgrade, reward, milestone, and store-facing presentation are fixed.
