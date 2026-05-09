# Active Goal Completion Audit

기준일: 2026-05-09

## Objective Restatement

사용자 목표는 실제 실행 화면에서 발견된 UI/UX 깨짐을 끝까지 추적해, 주요 화면의 비율, 텍스트 가독성, CTA 조작성, 하단 탭/safe-area, modal, store screenshot까지 제품 화면처럼 완성하는 것이다.

완료 판정은 문서상 self-score나 테스트 통과만으로 하지 않는다. 실제 코드, 최신 screenshot, DOM/layout guard, 빌드/테스트 결과, 가능하면 실제 Android phone screenshot/video가 필요하다.

## Success Criteria

| Gate | Requirement | Evidence | Status |
| --- | --- | --- | --- |
| G1 | 주요 화면에서 P1 clipping/CTA overlap/tab occlusion 없음 | `e2e/layout-regression.spec.ts`, `qa-screenshots/*`, `VISUAL_QA.md` | 완료 후보 |
| G2 | Android WebView-like 320/360/393/412 viewport에서 한글/버튼/칩/modal/currency 잘림 없음 | `layout-regression.spec.ts`, `visual-regression.spec.ts`, `qa-screenshots/android-webview-*` | 완료 후보 |
| G3 | 업그레이드 quick-buy/shelf가 실제 screenshot 기준 깨져 보이지 않음 | `RC17_UPGRADE_CARD_UI_AUDIT.md`, `RC19_FULL_SCREEN_UI_UX_AUDIT.md`, `qa-screenshots/320x740-upgrades.png`, `qa-screenshots/android-webview-360x800-upgrades.png` | 완료 후보 |
| G4 | Prestige result modal이 320/390에서 reward/ribbon/CTA를 모두 보이고 조작 가능 | `RC19_FULL_SCREEN_UI_UX_AUDIT.md`, `qa-screenshots/320x740-prestige-result.png`, `qa-screenshots/390x844-prestige-result.png` | 완료 후보 |
| G5 | Save/export modal, daily reward, milestone, offline reward modal이 360/390 계열에서 조작 가능 | `layout-regression.spec.ts`, `qa-screenshots/390x844-save-modal.png`, `qa-screenshots/390x844-daily-reward-claim.png`, `qa-screenshots/390x844-collection-milestones.png`, `qa-screenshots/320x740-offline-reward.png` | 완료 후보 |
| G6 | Store screenshots public copy/framing이 internal wording 없이 최신 UI를 반영 | `store-screenshots/iphone-*.png`, `store-screenshots/android-*.png`, `STORE_SCREENSHOT_PLAN.md` | 완료 후보 |
| G7 | Android APK가 최신 UI 수정 후 재생성됨 | `android/app/build/outputs/apk/debug/app-debug.apk`, `android/app/build/outputs/apk/release/app-release.apk`, `RC19_FULL_SCREEN_UI_UX_AUDIT.md` | 완료 후보 |
| G8 | 실제 Android physical device screenshot/video 기반 재검증 | `device-qa/incoming/`, `device-qa/fixed/`, `DEVICE_QA_RESULTS_TEMPLATE.md` | 미완료 |
| G9 | 실제 기기 font scale, gesture nav, notch/safe-area, OEM WebView 차이 확인 | `DEVICE_QA_CHECKLIST.md`, physical QA result rows | 미완료 |

## Prompt-To-Artifact Checklist

| Explicit User Requirement | Artifact / Command / Evidence | Audit Result |
| --- | --- | --- |
| "실제로 돌려보니까 UI/UX 깨진 부분이 너무 많다" | `RC18_DEVICE_UI_BUG_AUDIT.md`, `RC19_FULL_SCREEN_UI_UX_AUDIT.md` | 실제 device capture는 아직 없음. WebView-like 위험은 선제 수정됨 |
| "제대로 될 때까지 검증" | `npm run build`, `npm test -- --run`, `npm run test:e2e`, `layout-regression`, `visual-regression`, `store-screenshot-pack`, `cap:sync`, Android Gradle debug/release build | 자동/스크린샷 검증 통과 |
| "모든 화면의 비율" | `visual-regression.spec.ts`가 home/upgrades/collection/prestige/shop/settings/save/offline/daily/milestone을 320/360/390/430/Android-like/desktop으로 재생성 | Playwright viewport 기준 완료 후보 |
| "완성도" | `VISUAL_QA.md`, `RC11_INDEPENDENT_RESCORE.md`, `RC17_UPGRADE_CARD_UI_AUDIT.md`, `RC19_FULL_SCREEN_UI_UX_AUDIT.md` | 내부 screenshot 기준 P1 없음, P2 polish 일부 남음 |
| "실제 폰에서 깨지는지" | `device-qa/incoming/` | 미완료. 폴더에는 `.gitkeep`만 있음 |

## Current Verification Snapshot

마지막 RC19 검증 결과:

- `npm run build`: pass
- `npm test -- --run`: pass, 23 files / 502 tests
- `npm run test:e2e`: pass, 46 tests
- `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: pass, 10 tests
- `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: pass, 10 tests
- `npm run export:assets`: pass
- `npm run cap:sync`: pass
- `npx cap sync android`: pass
- Android `assembleDebug assembleRelease`: pass
- `git diff --check`: pass

## Manual Screenshot Spot Check

| Screenshot | Result |
| --- | --- |
| `qa-screenshots/320x740-home.png` | 핵심 tap CTA와 currency HUD는 보이고 조작 가능. 하단 장부 일부가 bottom dock 뒤에 이어지는 것은 P2 scroll composition 후보 |
| `qa-screenshots/320x740-upgrades.png` | RC19 이후 quick-buy 세로 스택/빈 레일 P1 해소. 첫 card의 cost/CTA는 분리됨 |
| `qa-screenshots/390x844-save-modal.png` | Export/import textarea와 CTA가 modal 안에 유지됨. iOS zoom risk guard는 textarea 16px 이상으로 커버 |
| `qa-screenshots/390x844-daily-reward-claim.png` | Reward moment와 CTA가 modal 안에서 명확함 |
| `qa-screenshots/390x844-collection-milestones.png` | D1/D3/D7 badge board와 claim CTA visible. 아래 quest card가 bottom dock 근처로 이어지는 것은 P2 scroll composition 후보 |
| `qa-screenshots/390x844-prestige-result.png` | RC19 이후 reward summary/ribbon/next goal/CTA가 partial clip 없이 보임 |
| `store-screenshots/iphone-02-upgrade.png` | RC19 이후 upgrade shelf와 quick-buy workbench가 store shot에서 세로 스택 없이 보임 |
| `store-screenshots/android-05-reward.png` | Public copy와 reward modal framing이 store-facing 상태 |

## Missing Or Weakly Verified Requirements

1. 실제 Android phone screenshot/video가 아직 없다.
   - `device-qa/incoming/`은 `.gitkeep`만 포함한다.
   - 따라서 physical device에서 발견된 특정 깨짐이 완전히 재현/수정됐다고 말할 수 없다.

2. Android vendor WebView, system font scale, gesture navigation bar, display cutout은 자동 emulation만으로 완전 검증할 수 없다.
   - 현재 320/360/393/412 viewport와 110/120% root font scaling guard는 방어층이지만 physical proof가 아니다.

3. 일부 긴 scroll 화면은 현재 조작 대상이 아닌 다음 card가 bottom dock 아래로 이어져 보인다.
   - CTA occlusion은 아니므로 P1은 아니지만, 더 고급스러운 scroll fade/section ending treatment는 P2 polish다.

## Completion Decision

현재 상태는 Playwright/DOM/screenshot/Android build 기준으로 내부 P1 UI layout defect가 발견되지 않는 "완료 후보"다. 그러나 원래 objective가 실제 실행 화면의 깨짐 해결을 요구하고, 실제 Android physical device screenshot/video가 아직 없기 때문에 goal complete로 처리하지 않는다.

다음 완료 조건:

1. 새 APK를 실제 Android 폰에 설치한다.
2. `DEVICE_QA_CHECKLIST.md` 기준으로 최소 홈, 업그레이드, 저장 modal, daily reward, milestone, prestige result, offline reward, 설정, 하단 탭/safe-area를 캡처한다.
3. 캡처 파일을 `device-qa/incoming/` 또는 `device-qa/fixed/`에 넣는다.
4. 발견된 P1/P2를 `RC18_DEVICE_UI_BUG_AUDIT.md` 또는 후속 audit에 기록하고 수정/재검증한다.
