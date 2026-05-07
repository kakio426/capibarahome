# RC-9 Top 30 Product Gaps

기준일: 2026-05-07

Severity 기준:

- P0: 사용/저장/결제 오해/주요 flow를 막는 blocker
- P1: release candidate로 주장하면 안 되는 product-quality blocker
- P2: RC 이후 polish 또는 device readiness risk
- P3: nice-to-have

| # | Severity | Area | Gap | Evidence | RC-10 direction |
| ---: | --- | --- | --- | --- | --- |
| 1 | P1 | Upgrades | quick-buy `1개/10개/최대`가 기본 HTML 버튼처럼 보임 | `390x844-upgrades-quick-buy.png` | custom carved segmented selector로 교체 |
| 2 | P1 | Upgrades | 360px에서 upgrade buy row가 tab dock에 묻혀 CTA 위계가 무너짐 | `360x740-upgrades-quick-buy.png` | sticky in-card buy shelf 또는 bottom-safe padding 재설계 |
| 3 | P1 | Upgrades | tool slot이 빈 목재 구멍처럼 보이고 icon이 바닥에 붙음 | `390x844-upgrades-quick-buy.png` | illustrated tool pedestal / filled slot visual |
| 4 | P1 | Upgrades | card가 작업대라기보다 긴 text/info card로 읽힘 | `390x844-upgrades-quick-buy.png` | title/cost/effect hierarchy compacting |
| 5 | P1 | Daily reward | daily reward claim이 toast + disabled card로 끝나 reward moment가 약함 | `390x844-daily-reward-claim.png` | dedicated daily reward reveal modal/sheet |
| 6 | P1 | Daily reward | daily/goal panel이 first view에서 보이지 않아 D1 return reason이 숨음 | `390x844-home-daily-available.png` | home hero 안에 compact daily badge/goal chip 배치 |
| 7 | P1 | Daily reward | screenshot에서 상단 텍스트가 sticky header 밑에 잘려 보임 | `390x844-daily-reward-claim.png` | scroll anchor/header offset correction |
| 8 | P1 | Milestones | D1/D3/D7 milestone이 sticker collection보다 card list로 읽힘 | `390x844-collection-milestones.png` | stamp sheet / badge board layout |
| 9 | P1 | Milestones | milestone claim/reload 후 받은 상태가 즉시 강하게 구분되지 않음 | `390x844-milestone-claim.png` | claimed stamp overlay and reward recap |
| 10 | P1 | Milestones | third milestone action area가 tab dock과 충돌함 | `390x844-collection-milestones.png` | bottom-safe action spacing |
| 11 | P1 | Store screenshot | `mock provider` 문구가 store screenshot에 노출됨 | `store-screenshots/iphone-04-shop.png` | customer-facing copy로 전면 교체 |
| 12 | P1 | Store screenshot | subtitle 줄바꿈이 한 글자 단위로 깨짐 | `store-screenshots/iphone-03-prestige.png` | store copy width/font/line-height 재작업 |
| 13 | P1 | Store listing | listing draft에 mock provider가 feature처럼 적혀 있음 | `STORE_LISTING_DRAFT.md` | public listing과 internal notes 분리 |
| 14 | P1 | Docs | `internal P0/P1 none` 문서가 product-quality P1과 충돌 | `RELEASE_BLOCKERS.md`, `VISUAL_QA.md`, `SPEC_COVERAGE.md` | RC-10 after-fix 기준으로 문서 재정렬 |
| 15 | P1 | Prestige result | 환생 결과가 ceremony라기보다 util modal임 | `390x844-prestige-result.png` | ritual art reuse, golden leaf reveal, next-goal ceremony |
| 16 | P2 | Home | top currency plaques and header consume too much vertical space | `390x844-home.png` | compact HUD variant for 360/390 |
| 17 | P2 | Home | progression/stat grid below hero looks like dashboard cards | `390x844-home.png`, `390x844-home-progression.png` | orchard ledger/stamp visual treatment |
| 18 | P2 | Collection | quest/achievement sections still resemble task dashboard | `390x844-collection.png` | album spread layout with tabs/stamps |
| 19 | P2 | Collection | claim-ready screenshot does not visibly show a satisfying claim state | `390x844-collection-claim-ready.png` | claim-ready highlight/reveal state screenshot |
| 20 | P2 | Settings | large rows are usable but still form-like | `390x844-settings.png` | tighter ledger drawer, grouped visual toggles |
| 21 | P2 | Save modal | export code dominates the modal and feels utility-heavy | `390x844-save-modal.png` | collapse/export capsule, copy-first UX |
| 22 | P2 | Save modal | 360px code field is dense and difficult to inspect | `360x740-save-modal.png` | scroll hint, monospace scaling, copied state |
| 23 | P2 | Offline reward | modal is strong, but large top dimmed empty area reduces impact | `390x844-offline-reward.png` | center reward sheet or add return scene header |
| 24 | P2 | Shop | lower product card is cut by tab dock | `390x844-shop.png` | bottom-safe shop list spacing |
| 25 | P2 | Shop | mock/sandbox nature is correct internally but weak as player fantasy | `390x844-shop.png` | in-game "festival" framing while preserving no-real-payment clarity |
| 26 | P2 | Store screenshots | gameplay phone panel is small and often shows weak screens | `store-screenshots/iphone-*.png` | crop closer to gameplay and select stronger moments |
| 27 | P2 | Store screenshots | all store images share similar composition, lowering perceived variety | `store-screenshots/iphone-*.png` | 5 distinct compositions: tap, upgrade, album, prestige, return reward |
| 28 | P2 | Audio | WebAudio fallback exists, but final licensed sound is absent | `AUDIO_ASSET_PLAN.md` | final audio pack and device testing |
| 29 | P2 | Device QA | physical iOS/Android storage/FPS/thermal not verified | `DEVICE_QA_CHECKLIST.md` | device matrix before submission |
| 30 | P2 | Bundle | large runtime JS/raster payload remains | `PERFORMANCE_QA.md`, `BUNDLE_ASSET_AUDIT.md` | route-level splitting or asset lazy loading |

