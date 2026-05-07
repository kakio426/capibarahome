# RC-9 Release Reality Check

기준일: 2026-05-07

## Decision

현재 프로젝트는 **engineering release candidate 후보**에는 가깝지만, **product release candidate**로는 아직 부족하다.

자동 테스트, E2E, migration, WebView fallback, screenshot generation은 강하다. 그러나 RC-9 독립 감사 기준에서는 사용자가 실제로 시간을 쓰고, 다음날 다시 오고, 돈을 써도 이상하지 않다고 느낄 화면 품질이 평균 8점에 미치지 못한다.

RC-9에서는 현재 앱을 Playwright/Vite dev server로 다시 실행해 visual/store screenshot flow를 수행했다.

```txt
npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
6 passed (1.2m)
```

## Current Claim vs RC-9 Finding

| Existing claim | Source | RC-9 finding | Severity |
| --- | --- | --- | --- |
| 내부 P0/P1 release blocker 없음 | `RELEASE_BLOCKERS.md` | 제품 품질 P1이 남아 있다: upgrade quick-buy, daily reward, milestone, store screenshot copy | P1 contradiction |
| 성장 화면은 card-list P1 해소 | `VISUAL_QA.md`, `RELEASE_BLOCKERS.md` | `390x844-upgrades-quick-buy.png`와 `360x740-upgrades-quick-buy.png`는 segmented control이 기본 웹 버튼처럼 보이고, tool slot/CTA hierarchy가 약함 | P1 contradiction |
| 리텐션 blocker 없음 | `QA_REPORT.md`, `VISUAL_QA.md` | daily reward와 milestone은 저장/중복 방지는 되지만 보상 순간이 약하고 첫 화면 가시성이 낮음 | P1 contradiction |
| Store screenshot 후보 완료 | `VISUAL_QA.md`, `RELEASE_CHECKLIST.md` | `iphone-04-shop.png`에 `mock provider`가 직접 노출되고, `iphone-03-prestige.png`는 문장 줄바꿈이 깨짐 | P1 contradiction |
| Visual screenshots captured means visual gate done | `SPEC_COVERAGE.md` | screenshot generation은 근거지만 품질 판정은 아님. RC-9 평균 5.8/10 | P1 process gap |

## Release Readiness Split

| Dimension | Status | Reality |
| --- | --- | --- |
| Build/TypeScript | Good | RC-8 기준 통과 |
| Unit/simulation tests | Good | 502 tests passed |
| E2E | Good | 32 passed |
| Save v5 migration/import/export | Good | Regression coverage exists |
| Offline + daily same session | Good | RC-8 coverage exists |
| WebView readiness code | Good but not device-proven | Safe-area/localStorage/pagehide safeguards exist; physical device QA still required |
| Core visual art direction | Partial | Home/offline/shop/prestige art direction is strong, but information screens lag |
| Reward moment | Weak | Daily/milestone/prestige result rely too much on static panels/toasts |
| Store-facing readiness | Weak | Current screenshots/listing still include developer/internal language |
| Product RC | No | Average screen score is below 8 and multiple P1 gaps remain |

## Internal P0/P1 Status After RC-9

P0: none found in screenshot/doc audit.

P1:

- Upgrade screen presentation and 360px ergonomics.
- Daily reward visibility and reward feeling.
- D1/D3/D7 milestone collection/reveal feeling.
- Store screenshot/listing customer-facing polish.
- Existing release docs overstate internal P0/P1 closure.

Therefore RC-9 should not update the project to "internal P0/P1 none" until RC-10 fixes are implemented and screenshots are re-scored.

## External Submission Blockers Still Valid

These remain external and are not newly introduced by RC-9:

- Apple Developer Program account
- Google Play Console account
- signing/provisioning/keystore
- final bundle/package id
- privacy policy URL
- support URL
- age rating/export compliance
- physical iPhone/Android QA
- real ad/IAP SDK and store product IDs if those ship
- commissioned/final art ownership and legal approval
- final app icon/adaptive icon/splash export
