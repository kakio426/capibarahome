# RC-18 Device UI Bug Audit

기준일: 2026-05-09

## Scope

RC-18은 새 게임 기능을 추가하지 않고 Android physical device / Android WebView에서 재발하기 쉬운 한글 폰트 깨짐, 줄높이 잘림, CTA/하단 탭 충돌, safe-area, 작은 폭 viewport 문제를 선제적으로 보강한 pass다.

`device-qa/incoming/` 안의 실제 기기 screenshot/video를 먼저 확인했다. 현재 폴더에는 placeholder `.gitkeep`만 있고, 제출된 실제 기기 evidence는 없다.

> 실제 기기 screenshot이 아직 제공되지 않았으므로, Android WebView에서 흔히 발생하는 font/layout 위험을 선제적으로 수정하고, 사용자가 다시 캡처해야 할 checklist를 제공한다.

## Evidence Folders

- `device-qa/incoming/`: 사용자가 넣을 실제 폰 screenshot/video 원본
- `device-qa/annotated/`: 문제 영역 표시본
- `device-qa/fixed/`: 수정 후 재촬영본

## Device Bug Table

| ID | Device | OS version | APK type | Screen | Screenshot/video path | Symptom | Severity | Suspected cause | Fix | Verification screenshot | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RC18-001 | Android physical device TBD | TBD | Debug/Release APK | All common UI text | `device-qa/incoming/` empty | 실제 기기 캡처 미제공. Android WebView에서 한글 fallback/line-height/font-weight가 tight할 위험 | P2 proactive | 원격 font 없음은 좋지만, 칩/버튼/탭 일부가 `line-height: 1` 또는 heavy weight에 가까움 | Korean-safe system fallback stack, button/input line-height, critical chip/button/tab/modal line-height hardening | `qa-screenshots/android-webview-360x800-home.png`, layout regression font-scale 110/120% | 완료 후보, physical retest 필요 |
| RC18-002 | Android physical device TBD | TBD | Debug/Release APK | Bottom tab / content | `device-qa/incoming/` empty | gesture nav / software nav bar에서 bottom dock과 CTA가 가까워질 위험 | P2 proactive | content bottom padding과 safe-area reserve가 Android navigation area에서 부족할 수 있음 | content shell bottom padding/scroll-padding 증대, `max()` safe-area guard, 320px mobile rule 추가 | `qa-screenshots/320x740-upgrades-quick-buy.png`, `qa-screenshots/android-webview-360x800-upgrades-quick-buy.png` | 완료 후보, physical retest 필요 |
| RC18-003 | Android physical device TBD | TBD | Debug/Release APK | Upgrade cards | `device-qa/incoming/` empty | 320/360px에서 upgrade chip, cost, CTA text가 세로로 눌리거나 겹칠 위험 | P2 proactive | 작은 chip/button의 tight line-height, button padding misread 가능성 | upgrade chips/meta/cost/button line-height/min-height 보강, 320px-specific card/grid/button tuning | `qa-screenshots/320x740-upgrades-quick-buy.png`, layout regression Android-ish viewports | 완료 후보, physical retest 필요 |
| RC18-004 | Android physical device TBD | TBD | Debug/Release APK | Save/export modal | `device-qa/incoming/` empty | 긴 save code와 textarea가 Android keyboard/input focus에서 밀릴 위험 | P2 proactive | dense code area와 modal actions | 기존 textarea 16px guard 유지, modal/action clipping 검사에 Android font guard 추가 | `qa-screenshots/390x844-save-modal.png` | 완료 후보, physical retest 필요 |
| RC18-005 | Android physical device TBD | TBD | Debug/Release APK | Diagnostics | n/a | 실제 폰에서 viewport/DPR/safe-area/userAgent/font stack을 즉석 확인하기 어려움 | P3 tooling | 디바이스별 WebView 차이 | `?deviceQa=1` 진단 overlay 추가. 일반 사용자 화면에는 노출되지 않음 | manual URL: `index.html?deviceQa=1` or app URL `?deviceQa=1` | 완료 |

## Code Changes

- `src/ui/styles/tokens.css`: Korean-safe system font stack과 number-safe stack 추가.
- `src/ui/styles/global.css`: global font-family, line-height, text-size-adjust, antialiasing, button/input baseline hardening.
- `src/ui/styles/shell.css`: bottom safe-area reserve 확대, tab label line-height/min-height, diagnostic overlay style.
- `src/ui/styles/hud.css`: common buttons, chips, modal title, cost plaque, buy button line-height/min-height hardening.
- `src/ui/styles/screens.css`: home currency/daily badge, quick-buy, upgrade chip/meta/purchase tray, 320px media rule hardening.
- `src/app/AppShell.tsx`: `?deviceQa=1` / dev debug mode에서만 viewport, visualViewport, DPR, safe bottom, font stack, userAgent overlay 표시.
- `src/ui/screens/UpgradePanel.tsx`: upgrade status/title/stat/cost에 stable `data-ui-critical` 추가.
- `e2e/layout-regression.spec.ts`: 320px 및 Android-ish viewports, Android text rendering guard, 110%/120% font scaling guard 추가.
- `e2e/visual-regression.spec.ts`: 320px 및 Android WebView screenshot viewports 추가.

## Added Layout Guards

- 320x740, 360x740, 390x844, 430x932, Android WebView-like 360x800 / 393x873 / 412x915, desktop centered panel.
- 주요 버튼/탭/칩/모달/currency/cost clipping 검사.
- nowrap label single-line guard for bottom tab, quick-buy labels, upgrade chips, upgrade stat small labels, currency values.
- bottom dock and first/second upgrade CTA overlap guard.
- modal action clickability.
- textarea 16px iOS/Android input zoom risk guard.
- root font-size 110% / 120% simulation for Android font scaling risk.

## Screenshot Evidence

- `qa-screenshots/320x740-home.png`
- `qa-screenshots/320x740-upgrades-quick-buy.png`
- `qa-screenshots/360x740-home.png`
- `qa-screenshots/360x740-upgrades-quick-buy.png`
- `qa-screenshots/390x844-save-modal.png`
- `qa-screenshots/390x844-daily-reward-claim.png`
- `qa-screenshots/390x844-collection-milestones.png`
- `qa-screenshots/390x844-prestige-result.png`
- `qa-screenshots/android-webview-360x800-home.png`
- `qa-screenshots/android-webview-360x800-upgrades.png`
- `qa-screenshots/android-webview-360x800-upgrades-quick-buy.png`
- `qa-screenshots/android-webview-412x915-settings.png`

## Manual Review

- 320x740 home: primary tap CTA and currency HUD are readable. Bottom tab does not block the active tap CTA.
- 320x740 upgrades quick-buy: first and second purchase trays have clear cost/CTA separation. The third partially visible card sits behind the dock during scroll, but no currently targeted CTA is blocked.
- Android WebView 360x800 upgrades quick-buy: upgrade card text, chips, cost, and CTA remain readable; purchase tray is not visually covered by shelf decoration.
- 390x844 save modal: title, close button, export/import code areas, copy/import/confirm actions remain visible and textareas keep 16px input size.
- Store screenshot Android upgrade: public copy contains no mock/internal/debug/test/provider/sandbox wording. Upgrade card is readable; remaining framing polish is P2.

## Validation Results

- `npm run build`: pass
- `npm test -- --run`: pass, 23 files / 502 tests
- `npm run test:e2e`: pass, 46 tests
- `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: pass, 10 tests
- `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line`: pass, 10 tests
- `npm run export:assets`: pass
- `npm run cap:sync`: pass
- `npx cap sync android`: pass
- `cd android && ./gradlew assembleDebug && ./gradlew assembleRelease`: first attempt failed because current shell had no Java/Android SDK environment. Rerun with `JAVA_HOME=/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home` and `ANDROID_HOME=/opt/homebrew/share/android-commandlinetools`: pass.
- `git diff --check`: pass

## APK Evidence

- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk` (`19M`, generated 2026-05-09 20:03 KST)
- Release rehearsal APK: `android/app/build/outputs/apk/release/app-release.apk` (`18M`, generated 2026-05-09 20:03 KST)

## Remaining Risk

- 실제 Android physical device screenshot/video는 아직 제공되지 않았다. RC-18은 physical evidence 기반 fix가 아니라 Android WebView risk hardening pass다.
- 사용자는 새 APK 설치 후 `DEVICE_QA_CHECKLIST.md`와 `DEVICE_QA_RESULTS_TEMPLATE.md`를 기준으로 실제 폰에서 재촬영해야 한다.
- Android vendor WebView, system font scaling, gesture navigation bar, display cutout behavior는 실제 기기에서만 최종 판정 가능하다.
