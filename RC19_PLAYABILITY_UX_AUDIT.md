# RC-19 Playability UX Audit

기준일: 2026-05-09

## Scope

RC-19는 새 기능, 새 스토어 준비, 새 대형 아트를 추가하지 않고 실제 Android 폰 플레이에서 미완성처럼 느껴질 수 있는 터치 신뢰성, 보상 명확성, 첫 10분 안내를 보강한 pass다.

`device-qa/incoming/`와 `device-qa/fixed/`를 먼저 확인했다. 현재 실제 Android phone screenshot/video는 제공되지 않았다.

> 실제 디바이스 증거가 아직 없으므로, 현재 코드와 Playwright screenshot, Android WebView 위험 패턴을 기준으로 선제 playability hardening을 수행한다. 이후 사용자는 새 APK로 실기기 재검증해야 한다.

## Playability Bug Table

| ID | Screen | Symptom | Severity | Evidence | Suspected cause | Fix | Verification | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RC19-001 | Home / first 10 minutes | 첫 세션에서 다음 행동이 quest, upgrade, daily, prestige 중 무엇인지 한 번에 읽히지 않을 수 있음 | P1 | `qa-screenshots/360x740-home.png`, code audit | 여러 panel이 각각 할 일을 말해 first-action priority가 약함 | hero 안에 compact `next-action-panel` 추가. 한 번에 하나의 next action, 얻는 것, CTA만 표시. Shop/IAP보다 tap/upgrade/album/prestige core loop 우선 | `e2e/playability-flow.spec.ts`, visual screenshots | 완료, physical retest 필요 |
| RC19-002 | Home tap | 터치 후 숫자는 오르지만 실제 Android에서 눌림/획득 체감이 약할 수 있음 | P1 | `MainGameScreen.tsx`, `FloatingTextLayer`, screenshot review | floating text가 배경 위에서 약하게 보일 수 있음 | floating text를 pill/banner 형태로 강화하고 tap CTA active feedback 유지. tap gain HUD와 next-action reward line에서 터치당 수익 노출 | `home tap gives immediate currency and floating feedback` E2E | 완료 후보 |
| RC19-003 | Upgrade quick-buy | 최대 구매 시 몇 회 구매되고 무엇이 증가하는지 purchase button만으로는 부족함 | P1 | `qa-screenshots/390x844-upgrades-quick-buy.png`, code audit | cost/CTA는 읽히지만 before/after numeric delta가 분리되어 있지 않음 | purchase tray에 `레벨 x -> y`, `터치/초당 before -> after` delta row 추가. 구매 성공 후 card-level result banner 표시 | `upgrade buy and quick-buy max show purchase result clearly`, `layout-regression.spec.ts` | 완료 |
| RC19-004 | Upgrade/scroll | toast active state에서 낮은 viewport의 노출 CTA가 bottom tab과 충돌할 위험 | P1 | RC-19 layout-regression initial failure | toast visible padding and taller purchase tray made partial lower-card CTA appear behind dock | toast content offset 축소, upgrade card compact mobile tuning, bottom-dock action-center guard 추가 | `npx playwright test e2e/layout-regression.spec.ts --reporter=line` 10 passed | 완료 |
| RC19-005 | Claimable quest / album | claim 후 toast만 보면 받은 보상이 약하게 느껴질 수 있음 | P1 | `CollectionScreen.tsx`, playability review | album reward moment is easy to miss if only toast is noticed | existing `album-reveal-banner`를 playability E2E로 고정하고 claimable reward clickability 확인 | `claimable quest reward gives visible reward feedback` E2E | 완료 후보 |
| RC19-006 | Daily reward / modal | reward sheet는 있으나 close/confirm이 toast/tab과 같이 있을 때 막힐 수 있음 | P0 risk / P1 UX | E2E audit | modal/toast/bottom tab z-index risk | modal action usability, toast pointer-events, tab switch after toast E2E 추가 | `daily reward modal and tab switching remain clickable around toast` | 완료 |
| RC19-007 | Device QA diagnosis | 실제 폰에서 “안 눌림” 제보 시 어떤 element가 tap target인지 파악하기 어려움 | P1 tooling | `RC18_DEVICE_UI_BUG_AUDIT.md` overlay had metrics only | overlay had viewport/font info but no event log | `?deviceQa=1` 또는 dev `?debug=1`에서만 최근 20개 pointer/click event, target tag/class/aria-label/data-qa, pointer 좌표, top layer 상태 표시 | `device QA overlay is debug-only and records tap targets`, `qa-screenshots/390x844-device-qa-overlay.png` | 완료 |
| RC19-008 | Buttons / tabs / modal actions | 자동 clipping 통과 후에도 top overlay or bottom dock can cover touch center | P0 risk | layout guard gap | previous guards checked text/box, not elementFromPoint at CTA center | critical action center `elementFromPoint` guard 추가. Visible actionable buttons must have unblocked center and >=40px hitbox; below-dock lower-card previews are excluded as non-exposed actions | `layout-regression.spec.ts` 10 passed | 완료 |
| RC19-009 | Disabled upgrade action | disabled state may look ambiguous when player lacks oranges | P1 | Playability audit | secondary disabled button could look merely inactive without reason | cost plaque keeps `귤 부족`, disabled state tested with no feedback mutation | `disabled upgrade action is visibly disabled and does not mutate state` | 완료 |

## Touch Target Audit

| Target | Result |
| --- | --- |
| 홈 귤 주기 | `capybara-touch` remains large, active press feedback, floating reward feedback, sound/haptic through `GameActions.tapOrange` |
| 저장 button | top-bar plaque visible; no new z-index changes |
| 하단 탭 6개 | `layout-regression` action center guard and tab switch playability flow pass |
| 업그레이드 구매 | `upgrade-buy-button` has 44px min height, no exposed CTA center behind dock, purchase result banner |
| quick-buy 1/10/max | `aria-pressed` retained; layout guard verifies 3 buttons and active mode |
| quest/achievement/milestone claim | quest reward playability E2E, milestone modal layout guard, 44px milestone button min-height |
| daily reward claim/close | reward sheet and close button clickable in playability E2E |
| 환생 confirm/result close | existing modal action guard retained |
| settings toggles/save modal | toast non-blocking and modal action guards retained |

## Verification

RC-19 final verification:

```txt
npm run build
success

npm test -- --run
23 files / 502 tests passed

npm run test:e2e
53 passed

npx playwright test e2e/playability-flow.spec.ts --reporter=line
6 passed

npx playwright test e2e/layout-regression.spec.ts --reporter=line
10 passed

npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line
11 passed

npm run export:assets
success

npm run cap:sync
success

npx cap sync android
success

cd android && JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home ANDROID_HOME=/opt/homebrew/share/android-commandlinetools ANDROID_SDK_ROOT=/opt/homebrew/share/android-commandlinetools ./gradlew assembleDebug assembleRelease
BUILD SUCCESSFUL

git diff --check
passed
```

Regenerated Android artifacts:

- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk` (`19M`, generated 2026-05-09 23:58 KST)
- Release rehearsal APK: `android/app/build/outputs/apk/release/app-release.apk` (`18M`, generated 2026-05-09 23:58 KST)

## Remaining Risk

- No actual Android phone screenshot/video was present in `device-qa/incoming/` or `device-qa/fixed/`.
- RC-19 fixes are code, DOM, Playwright, screenshot, and APK based. Android OEM WebView, gesture navigation, physical tap latency, font scale, and device-specific safe-area behavior still require physical retest.
- Active thread goal should not be marked complete until the user installs the regenerated APK and provides/pass-reports physical device evidence.
