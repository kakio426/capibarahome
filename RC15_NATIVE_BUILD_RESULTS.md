# RC-15 Native Build Results

기준일: 2026-05-09

## Commands

| Command | Result |
| --- | --- |
| `npm run build` | passed |
| `npm test` | 23 files / 502 tests passed |
| `npm run test:e2e` | 37 passed |
| `npx playwright test e2e/layout-regression.spec.ts --reporter=line` | 4 passed |
| `npx playwright test e2e/visual-regression.spec.ts e2e/store-screenshot-pack.spec.ts --reporter=line` | 7 passed |
| `npm run export:assets` | passed |
| `npm run cap:sync` | passed for Android and iOS |
| `npx cap sync android` | passed |
| `npx cap sync ios` | passed |
| `npx cap doctor` | Android looking great, iOS looking great |
| `cd android && ./gradlew assembleDebug` with JDK 17 | failed: `invalid source release: 21` |
| `cd android && ./gradlew assembleDebug` with JDK 21 | passed |
| `cd android && ./gradlew lint` | passed with warnings |
| `xcodebuild -list -workspace ios/App/App.xcworkspace` | workspace/schemes detected; CoreSimulator warning |
| `xcodebuild ... iphonesimulator ... CODE_SIGNING_ALLOWED=NO` | failed: missing/out-of-date iOS simulator platform |

## Artifacts

| Artifact | Path |
| --- | --- |
| Android debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` |
| APK size | `19M` |
| Android lint report | `android/app/build/reports/lint-results-debug.html` |
| Android lint text report | `android/app/build/reports/lint-results-debug.txt` |
| iOS workspace | `ios/App/App.xcworkspace` |
| iOS project | `ios/App/App.xcodeproj` |
| Store screenshots | `store-screenshots/iphone-*.png`, `store-screenshots/android-*.png` |
| Google Play feature graphic | `store-screenshots/google-play-feature-graphic.png` |

## Screenshot Spot Check

Representative screenshots were opened manually after Playwright regeneration:

- `qa-screenshots/360x740-home.png`
- `qa-screenshots/390x844-upgrades-quick-buy.png`
- `qa-screenshots/390x844-save-modal.png`
- `qa-screenshots/390x844-collection-milestones.png`
- `qa-screenshots/390x844-prestige-result.png`
- `qa-screenshots/390x844-daily-reward-claim.png`
- `store-screenshots/iphone-02-upgrade.png`
- `store-screenshots/android-05-reward.png`
- `store-screenshots/google-play-feature-graphic.png`

No P1 text clipping, CTA/bottom-dock overlap, modal clickability issue, or public mock/internal/debug wording was found in the spot check.

## Failure Classification

| Failure | Classification | Action |
| --- | --- | --- |
| JDK 17 `invalid source release: 21` | environment blocker | resolved by installing/using JDK 21 |
| Homebrew cleanup exit code 1 | environment P3 | installs verified; document rather than block |
| `xcodebuild` simulator build exit 70 | environment blocker | user must install matching iOS platform/CoreSimulator component in Xcode Settings > Components |
| Release signing absent | external signing blocker | user must provide keystore/certificates/profiles |

## Decision

Android debug build is verified. iOS native shell is verified through Capacitor/CocoaPods sync, but simulator/native iOS build remains environment-blocked. Store submission remains incomplete until account, signing, URL, final asset, and physical-device QA items are supplied.
