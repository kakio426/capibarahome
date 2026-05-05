# Release Checklist

## Web Release Candidate

- [x] Production build passes with `npm run build`
- [x] Unit/simulation tests pass with `npm test`
- [x] Mobile E2E suite passes with `npm run test:e2e`
- [x] Debug panel hidden by default and isolated behind `?debug=1`
- [x] Store-facing copy avoids claiming real paid IAP completion
- [x] Original 0-26 requirements mapped in `REQUIREMENTS_TRACE.md`
- [x] Competitor benchmark completed in `COMPETITOR_BENCHMARK.md`
- [x] P0/P1 production gaps tracked and closed in `PRODUCTION_GAP_BACKLOG.md`
- [x] Release blockers separated in `RELEASE_BLOCKERS.md`
- [x] Story bible added and connected to UI/config
- [x] Balance simulation added and tested
- [x] Source budget re-audited without generated/config/docs/screenshots/build output
- [x] Handwritten implementation scale recorded (`runtime 6,374 LOC`, `handwritten tests/E2E 1,418 LOC`)
- [x] Content integration audit completed in `CONTENT_INTEGRATION_AUDIT.md`
- [x] Visual defects audit completed in `VISUAL_DEFECTS.md`
- [x] RC-1 product-feel hardening completed: companion passive, achievement claim rewards, long-term goal, WebAudio feedback
- [x] Save/import failure paths do not crash the app
- [x] Offline reward, prestige, save/load, export/import flows tested
- [x] Visual screenshots captured for 360x740, 390x844, 430x932, desktop

## Capacitor Prep

- [x] `capacitor.config.ts` created
- [x] `@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`, `@capacitor/android` installed
- [x] Scripts added: `cap:sync`, `cap:open:ios`, `cap:open:android`
- [x] Capacitor CLI available: `npx cap --version`
- [x] `npm run cap:sync` completes for web assets
- [ ] Native platform folders generated with `npx cap add ios` and `npx cap add android`
- [ ] iOS project opened and signed in Xcode
- [ ] Android project opened and signed in Android Studio

Native folders are intentionally not generated here because Apple/Google developer account details, signing certificates, provisioning profiles, and local store-submission choices were not provided.

## User Must Provide Before Store Upload

- Apple Developer Program account
- Google Play Console account
- Bundle ID/package name confirmation
- App icon final assets
- Splash screen final assets
- Store screenshots selected from real device/simulator frames
- Privacy policy URL
- Support URL
- Age rating answers
- Export compliance answers
- App Tracking Transparency decision if real ad SDKs are added
- Real IAP product IDs and store metadata if paid products ship
- Real ad SDK provider decision if rewarded ads ship

## Final Manual Checks Before Submission

- Run on at least one physical iPhone and one Android device
- Confirm offline reward after app background/termination
- Confirm local save survives app restart
- Confirm no debug panel in release build
- Confirm all store screenshots match current UI
- Confirm privacy notes match every real SDK added after this RC
