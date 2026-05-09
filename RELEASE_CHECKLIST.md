# Release Checklist

## Web Release Candidate

- [x] Production build passes with `npm run build`
- [x] Unit/simulation tests pass with `npm test`
- [x] Mobile E2E suite passes with `npm run test:e2e`
- [x] Debug panel hidden by default and isolated behind `?debug=1`
- [x] Store-facing copy avoids claiming real paid IAP completion
- [x] Store-facing copy/screenshots avoid mock/sandbox/internal readiness wording after RC-10 cleanup
- [x] Original 0-26 requirements mapped in `REQUIREMENTS_TRACE.md`
- [x] Competitor benchmark completed in `COMPETITOR_BENCHMARK.md`
- [x] P0/P1 production gaps tracked and closed in `PRODUCTION_GAP_BACKLOG.md`; RC-10 no-go is preserved and RC-11 scoped rescore clears remaining product P1
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
- [x] RC-9 independent product-quality audit preserved as before evidence: no-go, 5.8 average, P1 blockers listed in `PRODUCT_QUALITY_RED_TEAM.md`, `SCREEN_SCORECARD.md`, `TOP_30_PRODUCT_GAPS.md`, `RC9_FIX_PLAN.md`, `RELEASE_REALITY_CHECK.md`
- [x] RC-10 Product UI & Reward Moment Fix implementation completed and evidence generated
- [x] RC-10 Product UI score gate no-go preserved. Integrity pass corrected the previous 8.2 self-score to combined 7.7 in `RC10_INDEPENDENT_RESCORE.md`
- [x] RC-11 Narrow P1 Kill pass completed: upgrade quick-buy/shelf 8.1, store screenshots 8.1, combined 8.1 in `RC11_INDEPENDENT_RESCORE.md`
- [x] RC-12 Layout Defect Kill pass completed: `UI_LAYOUT_DEFECT_AUDIT.md`, viewport visual screenshots, critical clipping/CTA/tab/modal Playwright checks, save textarea 16px guard
- [x] RC-12 store submission readiness package completed as prep docs: `RC12_SUBMISSION_READINESS_AUDIT.md`, `APP_ICON_SPLASH_EXPORT.md`, `STORE_METADATA_PACKAGE.md`
- [x] RC-13 native/store prep completed: Android Capacitor shell generated, `platform-assets/` icon/splash candidates exported, official submission docs checked, strengthened layout/store screenshot guards
- [x] RC-13 audits completed: `RC13_SUBMISSION_AUDIT.md`, `RC13_NATIVE_READINESS_AUDIT.md`, `RC13_VISUAL_REGRESSION_AUDIT.md`, `RC13_INDEPENDENT_RESCORE.md`
- [x] RC-14 native release build readiness and bundle pass completed: Android/iOS environment blockers separated, Vite large chunk warning removed, Google Play feature graphic candidate generated, physical QA packet prepared
- [x] RC-14 audits completed: `RC14_RELEASE_READINESS_AUDIT.md`, `RC14_NATIVE_BUILD_AUDIT.md`, `RC14_BUNDLE_OPTIMIZATION_AUDIT.md`, `RC14_DEVICE_QA_PACKET.md`, `RC14_INDEPENDENT_RESCORE.md`
- [x] Visual asset integrity tests added for SVG count, raster PNG integrity, coverage, external-reference bans, runtime visual styling audit
- [x] Art production docs added: `ART_DIRECTION.md`, `ASSET_PRODUCTION_BRIEF.md`
- [x] RC-2 audio readiness completed: file-ready audio slots and synthetic WebAudio fallback
- [x] RC-10 store screenshot pack generated: home, upgrade, milestone, prestige ceremony, reward moments for iPhone/Android in `store-screenshots/`
- [x] Store screenshot pack product-quality gate passed for RC-11. Public/internal wording is clean and gameplay panel framing is 8.1 on independent rescore
- [x] Store screenshot pack RC-12 automated guard added: public screenshot copy forbidden terms, heading/subtitle clipping, generated file size
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
- [x] RC-12 layout regression confirms 360/390/430/desktop critical text, CTA/bottom dock clearance, modal action clickability, save textarea zoom safety
- [x] RC-13 layout regression adds `data-ui-critical` clipping, toast non-blocking, home tap CTA guard, and store screenshot PNG dimension guard
- [x] RC-14 store guard validates Google Play feature graphic `1024 x 500`

## Capacitor Prep

- [x] `capacitor.config.ts` created
- [x] `@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`, `@capacitor/android` installed
- [x] Scripts added: `cap:sync`, `cap:open:ios`, `cap:open:android`
- [x] Capacitor CLI available: `npx cap --version`
- [x] `npm run cap:sync` completes for web assets
- [x] `NATIVE_BUILD_GUIDE.md` documents temporary app id/package values, Android shell, iOS blocker, icon/splash paths
- [x] Android native platform folder generated with `npx cap add android`
- [x] Android native resources updated with launcher icon candidates
- [x] Platform asset candidates exported with `npm run export:assets`
- [x] Google Play feature graphic candidate exported with `npm run export:assets`
- [ ] iOS native platform folder generated with `npx cap add ios` after CocoaPods/Xcode environment is ready
- [ ] iOS project opened and signed in Xcode
- [ ] Android project opened and signed in Android Studio
- [ ] Android JDK installed and `./gradlew assembleDebug` / `./gradlew lint` completed
- [ ] Android release keystore configured and signed AAB generated

Android native shell is generated and synced. Android Gradle build is blocked on this machine by missing Java runtime. iOS native shell is not generated because `npx cap add ios` failed without CocoaPods. Apple/Google developer account details, signing certificates, provisioning profiles, keystore, and final store submission choices are still user-provided.

## User Must Provide Before Store Upload

- Apple Developer Program account
- Google Play Console account
- Bundle ID/package name confirmation
- Android JDK / Java runtime
- App icon final art approval and adaptive foreground/background if replacing current candidates
- Splash screen final art approval
- Store screenshots selected from real device/simulator frames, using `store-screenshots/` as current candidates
- Google Play feature graphic selected or replaced from `store-screenshots/google-play-feature-graphic.png`
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
