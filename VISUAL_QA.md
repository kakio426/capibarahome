# Visual QA

기준일: 2026-05-05

## Summary

Playwright visual flow captured 48 current QA screenshots for 360x740, 390x844, 430x932, and desktop 1280x900 central panel. RC-2 also generated 10 store screenshot candidates under `store-screenshots/`. RC-1 before screenshots are archived under `qa-screenshots/rc1-before/`. This pass manually reviewed screenshots for text clipping, touch area, dense cards, developer UI feel, placeholder feel, reward visibility, and store presentation quality.

Command:

```txt
npx playwright test e2e/visual-regression.spec.ts
npx playwright test e2e/store-screenshot-pack.spec.ts
```

Result:

```txt
4 passed
48 screenshots written to qa-screenshots/
2 passed
10 screenshots written to store-screenshots/
```

## Fixes From Visual Audit

| Issue | Status | Evidence |
| --- | --- | --- |
| Save export code looked clipped on 360px modal | 해결 | `SaveImportExportModal.tsx`, `.save-code-textarea`, refreshed `qa-screenshots/360x740-save-modal.png` |
| Bottom `업그레이드` tab wrapped awkwardly | 해결 | visible label `성장`, aria-label `업그레이드`, refreshed mobile screenshots |
| Toast covered shop card content | 해결 | compact toast + auto dismiss, refreshed `qa-screenshots/360x740-shop.png` |
| 11 decoration classes did not alter home hero | 해결 | `layout.css` hero visual rules for missing decoration classes |
| Home hero still felt flat/static | 해결 | CSS scene layer with trees, facility, pond, oranges, refreshed `qa-screenshots/390x844-home.png` |
| Prestige panel looked too plain | 해결 | custom golden tree/path visual, refreshed `qa-screenshots/390x844-prestige.png` |
| Album reward/ability information was not visible enough | 해결 | achievement claim rewards, companion ability cards, `collection-rewards` and `collection-abilities` screenshots |
| Companion cards were too cramped in 2 columns | 해결 | mobile central panel companion grid changed to 1 column for readable ability text |
| Currency/product/offline UI still used emoji placeholders | 해결 | `CurrencyDisplay`, `MonetizationPanel`, offline reward modal now use generated assets and text units |
| 8 capybara portraits looked too similar | 해결 | generated portrait accessory pass in `scripts/generateVisualAssets.mjs` |
| Store screenshot home title wrapped awkwardly and toast appeared | 해결 | store screenshot copy shortened, toast hidden in store composition, refreshed `iphone-01-home.png` |

## Viewports

| Viewport | Status | Evidence |
| --- | --- | --- |
| 360x740 | 완료 | `qa-screenshots/360x740-*.png` |
| 390x844 | 완료 | `qa-screenshots/390x844-*.png` |
| 430x932 | 완료 | `qa-screenshots/430x932-*.png` |
| Desktop 1280x900 central panel | 완료 | `qa-screenshots/desktop-1280x900-*.png` |

## Screen Coverage

| Screen | Status | Screenshot Examples |
| --- | --- | --- |
| Home + tutorial | 완료 | `390x844-home-tutorial.png` |
| Home after tutorial | 완료 | `390x844-home.png` |
| Home progression/collection | 완료 | `390x844-home-progression.png` |
| Upgrade cards | 완료 | `390x844-upgrades.png` |
| Album / quest / collection | 완료 | `390x844-collection.png` |
| Album companion abilities | 완료 | `390x844-collection-abilities.png` |
| Album achievement rewards | 완료 | `390x844-collection-rewards.png` |
| Prestige | 완료 | `390x844-prestige.png` |
| Shop | 완료 | `390x844-shop.png` |
| Settings | 완료 | `390x844-settings.png` |
| Save import/export modal | 완료 | `390x844-save-modal.png` |

## Store Screenshot Candidates

| Candidate | Status | Evidence |
| --- | --- | --- |
| iPhone home | 완료 | `store-screenshots/iphone-01-home.png` |
| iPhone album | 완료 | `store-screenshots/iphone-02-album.png` |
| iPhone prestige | 완료 | `store-screenshots/iphone-03-prestige.png` |
| iPhone shop | 완료 | `store-screenshots/iphone-04-shop.png` |
| iPhone save/settings | 완료 | `store-screenshots/iphone-05-save.png` |
| Android home | 완료 | `store-screenshots/android-01-home.png` |
| Android album | 완료 | `store-screenshots/android-02-album.png` |
| Android prestige | 완료 | `store-screenshots/android-03-prestige.png` |
| Android shop | 완료 | `store-screenshots/android-04-shop.png` |
| Android save/settings | 완료 | `store-screenshots/android-05-save.png` |

## Remaining Visual Risk

현재 화면은 RC-2 후보로 읽을 수 있는 보상/능력/장기 목표와 store screenshot pack을 갖췄지만, Cats & Soup 수준의 bespoke hand-drawn animation과 final commissioned store art는 아직 아니다. 물리 기기 screenshot QA와 final character/store art 교체는 실제 제출 전 필요하다.
