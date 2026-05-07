# Performance QA

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

## Bundle / Asset Audit

| 항목 | RC-8 결과 |
| --- | --- |
| `dist` total | 15M |
| `dist/assets` total | 15M |
| runtime PNG payload | 12 files / 14M |
| runtime JS chunk | 1.1M |
| runtime CSS | 68K |
| source raster pack | 15 PNG / 19M |

RC-8 removed release-only `store-key-visual.png`, `app-icon-candidate.png`, and `main-capybara-character.png` from the runtime raster registry. Vite's JS large chunk warning remains and is classified as P2 because build/E2E/screenshot verification passes and the remaining optimization needs route-level code splitting or deeper registry splitting.

## Command Results

```txt
npm test
23 files passed, 502 tests passed
```

```txt
npm run test:e2e
32 passed
```

```txt
npm run cap:sync
build passed, Capacitor sync finished
```

## Manual/Physical Device Gap

No physical iPhone/Android FPS profiling was performed in this environment. Before store submission:

- Profile on a low-end Android device.
- Profile on at least one iPhone target.
- Confirm touch spam does not drop interaction responsiveness.
- Confirm WebView storage survives app termination in native wrapper.
- Confirm no memory growth after 10 minutes of idle play.
