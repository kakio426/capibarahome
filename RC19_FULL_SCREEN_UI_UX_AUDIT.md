# RC-19 Full-Screen UI/UX Completion Audit

기준일: 2026-05-09

## Scope

RC-18 이후에도 실제 스크린샷을 사람 눈으로 다시 확인했다. 이번 pass는 새 기능 추가가 아니라 Playwright layout guard가 놓칠 수 있는 “시각적으로 깨져 보이는” 화면을 수정하는 데 한정했다.

`device-qa/incoming/`에는 아직 실제 Android phone screenshot/video가 없다. 따라서 이번 pass 역시 physical-device evidence 기반 완료가 아니라, 최신 APK 재생성 전 Android WebView-like screenshot과 store screenshot을 기준으로 한 추가 UI bug bash다.

## Findings And Fixes

| ID | Screen | Symptom | Severity | Cause | Fix | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| RC19-001 | Upgrades / quick-buy panel | 320px와 Android WebView 360x800에서 quick-buy `1개/10개/최대` 버튼이 세로로 쌓이고 빈 목재 레일이 크게 남아 “깨진 작업대”처럼 보임 | P1 visual | `.quick-buy-mode`가 `grid-template-columns`만 가지고 `display: grid`를 직접 보장하지 않았음 | `.quick-buy-mode { display: grid; }` 추가 | `qa-screenshots/320x740-upgrades.png`, `qa-screenshots/android-webview-360x800-upgrades.png`, `e2e/layout-regression.spec.ts` quick-buy dial geometry guard |
| RC19-002 | Prestige result modal | 390px/Android-ish 높이에서 `이전 x1 → 새 계절 x1.1` 리본이 하단 action 영역에 반쯤 잘려 보임 | P1 visual | result metric grid가 mobile rule에서 1열로 바뀌어 modal body 높이를 과도하게 차지함 | prestige result modal 전용 body class와 compact layout 추가, result grid는 result modal 안에서 3열 유지 | `qa-screenshots/320x740-prestige-result.png`, `qa-screenshots/390x844-prestige-result.png`, modal body partial-clip guard |
| RC19-003 | Store upgrade screenshot | iPhone/Android upgrade marketing screenshot에서 상단 gameplay panel 일부가 crop되어 public-facing 이미지가 덜 완성돼 보임 | P2 visual/store | store screenshot pack의 upgrade scroll anchor가 first card 기준이라 top HUD/summary 조각이 어색하게 남음 | upgrade store shot scroll anchor를 quick-buy panel 기준으로 조정 | `store-screenshots/iphone-02-upgrade.png`, `store-screenshots/android-02-upgrade.png` |

## Added Regression Guards

- Quick-buy mode dial guard:
  - 3개 버튼 존재
  - active `aria-pressed` 1개
  - panel height가 96px 이하
  - 버튼들이 같은 행에 있고 44px 이상 touch target 유지
- Prestige result modal partial-clip guard:
  - modal body 안에서 보이는 result ribbon/grid/lead가 ancestor overflow에 의해 반쯤 잘리지 않는지 검사

## Manual Screenshot Review

- `qa-screenshots/320x740-upgrades.png`: quick-buy mode가 세로 스택이 아니라 3분할 작업대 레버로 보이며, 빈 레일이 화면을 잡아먹지 않는다.
- `qa-screenshots/android-webview-360x800-upgrades.png`: Android-ish viewport에서도 quick-buy panel, first upgrade card, cost/CTA가 시각적으로 분리된다.
- `qa-screenshots/390x844-upgrades-quick-buy.png`: purchase tray와 bottom dock 사이에 현재 조작 대상 CTA 충돌이 없다.
- `qa-screenshots/390x844-prestige-result.png`: gained leaves, total leaves, multiplier, before/after ribbon, next goal이 하단 action에 가려지지 않는다.
- `qa-screenshots/320x740-prestige-result.png`: 320px에서도 result modal은 compact 3-column reward summary를 유지하고 CTA가 조작 가능하다.
- `store-screenshots/iphone-02-upgrade.png`: quick-buy workbench와 upgrade shelf가 public screenshot 안에서 세로 버튼/빈 레일 오류 없이 보인다.
- `store-screenshots/android-02-upgrade.png`: Android store screenshot도 동일한 composition을 유지한다.

## Targeted Verification

- `npm run build`: pass
- `npm test -- --run`: pass, 23 files / 502 tests
- `npm run test:e2e`: pass, 46 tests
- `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: pass, 10 tests
- `npx playwright test e2e/visual-regression.spec.ts --reporter=line`: pass, 7 tests
- `npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line`: pass, 3 tests
- `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: pass, 10 tests
- `npm run export:assets`: pass
- `npm run cap:sync`: pass
- `npx cap sync android`: pass
- `cd android && JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home ANDROID_HOME=/opt/homebrew/share/android-commandlinetools ANDROID_SDK_ROOT=/opt/homebrew/share/android-commandlinetools ./gradlew assembleDebug assembleRelease`: pass
- `git diff --check`: pass

## APK Evidence

- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk` (`19M`, generated 2026-05-09 21:10 KST)
- Release rehearsal APK: `android/app/build/outputs/apk/release/app-release.apk` (`18M`, generated 2026-05-09 21:10 KST)

## Remaining Risk

- 실제 Android physical device screenshot/video는 아직 없다. Android vendor WebView, system font scale, gesture navigation bar, display cutout 문제는 새 APK를 실제 기기에 설치한 뒤 확인해야 한다.
- Settings/home/collection은 현재 screenshot 기준 P1 clipping/CTA overlap은 없지만, 긴 scroll 화면에서는 하단 dock 뒤로 다음 콘텐츠가 일부 보일 수 있다. 현재 조작 대상 CTA가 가려지는 P1은 아니며, 더 자연스러운 scroll fade/pagination은 P2 polish다.
