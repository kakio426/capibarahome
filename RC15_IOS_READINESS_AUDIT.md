# RC-15 iOS Readiness Audit

기준일: 2026-05-09

## Toolchain

| 항목 | 결과 | 판정 |
| --- | --- | --- |
| Xcode | `Xcode 26.4.1`, build `17E202` | installed |
| xcode-select | `/Applications/Xcode.app/Contents/Developer` | installed |
| CocoaPods | `1.16.2` | installed in RC-15 |
| iOS platform folder | `ios/` generated | shell ready |
| Capacitor iOS sync | `npx cap sync ios` passed | shell sync ready |
| `npx cap doctor` | iOS looking great | Capacitor-level pass |

## iOS Shell Evidence

Generated files include:

- `ios/App/App.xcodeproj/project.pbxproj`
- `ios/App/App.xcworkspace/contents.xcworkspacedata`
- `ios/App/App/AppDelegate.swift`
- `ios/App/App/Info.plist`
- `ios/App/Podfile`
- `ios/App/Podfile.lock`
- `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
- `ios/App/App/Assets.xcassets/Splash.imageset/`

`ios/.gitignore` excludes generated build output, Pods, copied web assets, generated Capacitor config, and Cordova plugin output.

## App Identity Candidate

| 항목 | 결과 |
| --- | --- |
| Bundle ID candidate | `com.capybarabutler.game` |
| Display Name candidate | `카피바라 집사기` |
| Marketing version | `1.0` |
| Build number | `1` |

These are candidates. Final App Store Connect bundle ID and display metadata must be approved by the user before submission.

## Xcode Verification

`xcodebuild -list -workspace ios/App/App.xcworkspace` recognized the workspace and schemes:

- `App`
- `Capacitor`
- `CapacitorCordova`
- `Pods-App`

The command also reported a local CoreSimulator issue:

```txt
CoreSimulator is out of date. Current version (1051.49.0) is older than build version (1051.50.0).
```

Attempted simulator build:

```bash
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' build CODE_SIGNING_ALLOWED=NO
```

Result:

```txt
exit code 70
Unable to find a destination matching generic/platform=iOS Simulator
iOS 26.4 is not installed. Please download and install the platform from Xcode > Settings > Components.
```

This is an environment blocker, not a game code blocker. Signing/provisioning was not reached.

## Remaining iOS Blockers

| Blocker | Classification |
| --- | --- |
| Xcode CoreSimulator/iOS platform component mismatch | environment blocker |
| Apple Developer Program account | account blocker |
| signing certificate / provisioning profile | account/signing blocker |
| final Bundle ID registration | account blocker |
| App Store privacy/support URLs | external submission blocker |
| physical iPhone QA | external QA blocker |
| final AppIcon/LaunchScreen approval | asset blocker |

## Decision

iOS native shell readiness is verified at the Capacitor/CocoaPods sync level. Native build/run is still blocked by the local Xcode simulator platform mismatch and future signing/account requirements. RC-15 does not claim iOS store submission completion.
