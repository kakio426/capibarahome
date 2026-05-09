# Performance QA

기준일: 2026-05-09

## Implemented Performance Protections

- RAF-based game loop instead of `setInterval`
- Delta clamp via `GameConfig.loop.maxDeltaMs`
- Display update throttling via `GameConfig.loop.displayUpdateMs`
- `document.visibilityState` handling to avoid background production ticks
- Floating text capped to 18 visible items
- Particle list capped to 36 visible items
- Audio layer uses file-ready slots with short WebAudio fallback envelopes and skips playback when sound mute is enabled
- Generated SVG auxiliary assets use normal image loading and raster core art is routed through `RasterAssetImage`
- Game calculations run outside React render loops
- Store uses `useSyncExternalStore`
- Event listeners are cleaned up on `AppShell` unmount
- RC-8 page lifecycle save uses `pagehide` and hidden `visibilitychange`
- RC-8 WebView CSS readiness uses safe-area variables, `100dvh`, `touch-action: manipulation`, and 16px input/textarea controls to avoid iOS zoom
- RC-8 runtime raster registry excludes store-only PNG candidates so they do not ship in `dist`
- RC-13 Android shell keeps QA/store artifacts out of runtime web imports; platform candidates live in `platform-assets/` and Android launcher res
- RC-14 Vite build uses `assetsInlineLimit: 0` and manual chunks so generated SVG registry URLs no longer create a large JS chunk

## Automated Checks

| Check | Status | Evidence |
| --- | --- | --- |
| 1 second EPS simulation | 완료 | `src/tests/gameLoop.test.ts` |
| tap gain simulation | 완료 | `src/tests/gameLoop.test.ts` |
| delta clamp | 완료 | `src/tests/gameLoop.test.ts` |
| hidden tab RAF guard | 완료 | `src/tests/gameLoop.test.ts` |
| 150 rapid taps without negative/corrupt state | 완료 | `src/tests/rc3BugBash.test.ts` |
| no horizontal overflow on target viewports | 완료 | `e2e/visual-regression.spec.ts` |
| heavy visual screens render in mobile profile | 완료 | `npm run test:e2e` |
| store screenshot pack renders high-resolution compositions | 완료 | `e2e/store-screenshot-pack.spec.ts`, 10 PNG outputs |
| 2 hour long-session simulation | 완료 | `src/tests/rc8ReleaseBugBash.test.ts` |
| 8 hour offline cap | 완료 | `src/tests/rc8ReleaseBugBash.test.ts` |
| 500 rapid taps | 완료 | `src/tests/rc8ReleaseBugBash.test.ts` |
| quick-buy repeat stress | 완료 | `src/tests/rc8ReleaseBugBash.test.ts` |
| save/load repeated 20 times | 완료 | `src/tests/rc8ReleaseBugBash.test.ts` |
| RAF visibility listener cleanup | 완료 | `src/tests/rc8ReleaseBugBash.test.ts` |
| 360px save modal bounds after settings toggles | 완료 | `e2e/rc8-release-bug-bash.spec.ts` |
| RC-13/RC-14 critical text/data marker clipping | 완료 | `e2e/layout-regression.spec.ts` |
| RC-13/RC-14 store screenshot PNG dimension guard | 완료 | `e2e/store-screenshot-pack.spec.ts` |
| RC-14 Google Play feature graphic dimension guard | 완료 | `e2e/store-screenshot-pack.spec.ts` |

## Bundle / Asset Audit

| 항목 | RC-14 결과 |
| --- | --- |
| `dist` total | 16M |
| `dist/assets` total | 16M |
| runtime PNG payload | 12 files / 14M |
| largest runtime JS chunk | 188.60K |
| runtime CSS | 78.98K |
| source raster pack | 15 PNG / 19M |
| platform asset candidates | 20M |
| Android web asset copy | 16M |

RC-8 removed release-only `store-key-visual.png`, `app-icon-candidate.png`, and `main-capybara-character.png` from the runtime raster registry. RC-13 generated platform assets outside runtime web imports. RC-14 removed Vite's JS large chunk warning by externalizing SVG assets and splitting vendor/config/runtime/UI chunks. Remaining P2 performance work is runtime PNG payload reduction, which requires visual/device QA before conversion.

## Command Results

```txt
npm test
23 files passed, 502 tests passed
```

```txt
npm run test:e2e
37 passed
```

```txt
npm run cap:sync
build passed, Capacitor sync finished for Android shell
```

```txt
npx playwright test e2e/layout-regression.spec.ts --reporter=line
4 passed
```

## Manual/Physical Device Gap

No physical iPhone/Android FPS profiling was performed in this environment. Before store submission:

- Profile on a low-end Android device.
- Profile on at least one iPhone target.
- Confirm touch spam does not drop interaction responsiveness.
- Confirm WebView storage survives app termination in native wrapper.
- Confirm no memory growth after 10 minutes of idle play.
