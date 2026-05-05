# Privacy Notes

## Current Data Handling

The current release-candidate code stores game progress locally in browser/app storage.

- Save location: localStorage for web, Capacitor WebView storage after native packaging
- Save contents: currencies, upgrade levels, generators, settings, tutorial state, monetization mock state, timestamps
- No account login
- No server sync
- No personal information collection
- No location access
- No contacts/photos/files access
- No real analytics network requests

## Analytics

`AnalyticsManager` is a mock in-memory/console logger. It does not transmit data to a server.

If a real analytics SDK is added later, update:

- Privacy policy
- Store data safety answers
- Consent/opt-out behavior if required
- `PRIVACY_NOTES.md`

## Ads and IAP

Ads and IAP are currently mock/provider interfaces only.

- Rewarded ad flow is simulated
- IAP purchase flow is simulated in development builds
- No real payment is processed
- No ad tracking SDK is included

If real ad or IAP SDKs are added, update store disclosure and ATT/data safety answers before submission.

## Save Export/Import

Exported save codes include gameplay state. Base64 is used for transport formatting only and is not encryption. Users should not share save codes publicly if they consider their progress private.

## Draft Store Privacy Position

For the current mock-only web/native wrapper candidate:

- Data collected: none by developer server
- Data stored on device: gameplay progress and settings
- Data linked to user: no
- Third-party tracking: no

This must be reviewed again after any real SDK integration.
