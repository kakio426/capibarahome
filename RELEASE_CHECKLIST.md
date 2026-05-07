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
- [x] Handwritten implementation scale recorded (`runtime 9,388 LOC`, `handwritten tests/E2E 3,235 LOC`)
- [x] Content integration audit completed in `CONTENT_INTEGRATION_AUDIT.md`
- [x] Visual defects audit completed in `VISUAL_DEFECTS.md`
- [x] RC-1 product-feel hardening completed: companion passive, achievement claim rewards, long-term goal, WebAudio feedback
- [x] Direct art direction pass completed: integrated `layout.css`, 253 hand-authored SVG auxiliary files, mascot/tier/item/release support pack
- [x] V2 raster/HUD art pass completed after rejecting the first raster pass: integrated home hero background, 8 companion portraits, prestige ritual, shop banner, offline reward, store key visual, app icon candidate, wood/parchment/orange game UI skin
- [x] RC-4 Game UI Skin & Interaction Polish completed: upgrade workbench/shelf cards, settings ledger/drawer, save vault modal, custom settings switches, save export copy action, carved modal/toast/disabled control polish, refreshed visual/store screenshots
- [x] RC-4 visual audit completed in `RC4_UI_SKIN_AUDIT.md`
- [x] RC-5 CSS Debt & Component System Pass completed: `layout.css` import manifest, `shell/hud/screens/effects` split, `.ui-*` skin classes, upgrade/settings/save/album P2/P3 polish, refreshed visual/store screenshots
- [x] RC-5 CSS/component audit completed in `RC5_CSS_COMPONENT_AUDIT.md`
- [x] RC-6 Product Feel pass completed: quick-buy 1/10/max, purchase/reward/prestige/album reveal, touch feel variation, D1/D3/D7 retention plan
- [x] RC-6 audit and retention docs completed in `RC6_PRODUCT_FEEL_AUDIT.md` and `RETENTION_PLAN.md`
- [x] RC-7 Retention Systems pass completed: daily reward, D1/D3/D7 milestone badges, post-prestige goal chain, save v5 migration, retention E2E/screenshots
- [x] RC-7 audit completed in `RC7_RETENTION_SYSTEM_AUDIT.md`
- [x] RC-8 Release Candidate Bug Bash completed: save v5 regression, daily+offline same return, prestige goal reload, quick-buy reload, long-session stress, localStorage/pagehide fallback, WebView CSS readiness, bundle asset audit
- [x] RC-8 audit completed in `RC8_RELEASE_CANDIDATE_AUDIT.md` and `BUNDLE_ASSET_AUDIT.md`
- [x] Visual asset integrity tests added for SVG count, raster PNG integrity, coverage, external-reference bans, runtime visual styling audit
- [x] Art production docs added: `ART_DIRECTION.md`, `ASSET_PRODUCTION_BRIEF.md`
- [x] RC-2 audio readiness completed: file-ready audio slots and synthetic WebAudio fallback
- [x] RC-2/Final store screenshot pack generated: 10 raster key art + gameplay composition candidates in `store-screenshots/`
- [x] Native/store compliance docs added: asset credits, audio plan, native guide, device QA checklist
- [x] RC-3 playtest/balance pass completed: first prestige 33m target, 1/5/15/30/120 minute checkpoint report
- [x] RC-3 bug bash completed: save migration, corrupt import, rapid tap, duplicate rewards, prestige save/load, mute persistence
- [x] RC-3 first five-minute real-user E2E added without debug shortcuts
- [x] RC-3 store screenshot polish completed: album crop, prestige multiplier, save copy rechecked
- [x] Save/import failure paths do not crash the app
- [x] Offline reward, prestige, save/load, export/import flows tested
- [x] Visual screenshots captured for 360x740, 390x844, 430x932, desktop
- [x] RC-6 screenshots captured for quick-buy mode, album claim-ready state, prestige result, and offline reward reveal
- [x] RC-7 screenshots captured for daily reward available/cooldown/claim, D1/D3/D7 milestone ledger/claim, and post-prestige goal state
- [x] RC-8 visual/device readiness flow confirms 360px save modal bounds, toast click safety, and repeated tab clickability

## Capacitor Prep

- [x] `capacitor.config.ts` created
- [x] `@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`, `@capacitor/android` installed
- [x] Scripts added: `cap:sync`, `cap:open:ios`, `cap:open:android`
- [x] Capacitor CLI available: `npx cap --version`
- [x] `npm run cap:sync` completes for web assets
- [x] `NATIVE_BUILD_GUIDE.md` documents temporary app id/package values and icon/splash paths
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
- Store screenshots selected from real device/simulator frames, using `store-screenshots/` as current candidates
- Commissioned/final art ownership and legal approval for production store submission
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
