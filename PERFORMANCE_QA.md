# Performance QA

## Implemented Performance Protections

- RAF-based game loop instead of `setInterval`
- Delta clamp via `GameConfig.loop.maxDeltaMs`
- Display update throttling via `GameConfig.loop.displayUpdateMs`
- `document.visibilityState` handling to avoid background production ticks
- Floating text capped to 18 visible items
- Particle list capped to 36 visible items
- Audio layer uses file-ready slots with short WebAudio fallback envelopes and skips playback when sound mute is enabled
- Generated SVG visual assets use normal image loading and are lazy-loaded in reusable icon components
- Game calculations run outside React render loops
- Store uses `useSyncExternalStore`
- Event listeners are cleaned up on `AppShell` unmount

## Automated Checks

| Check | Status | Evidence |
| --- | --- | --- |
| 1 second EPS simulation | 완료 | `src/tests/gameLoop.test.ts` |
| tap gain simulation | 완료 | `src/tests/gameLoop.test.ts` |
| delta clamp | 완료 | `src/tests/gameLoop.test.ts` |
| no horizontal overflow on target viewports | 완료 | `e2e/visual-regression.spec.ts` |
| heavy visual screens render in mobile profile | 완료 | `npm run test:e2e` |
| store screenshot pack renders high-resolution compositions | 완료 | `e2e/store-screenshot-pack.spec.ts`, 10 PNG outputs |

## Command Results

```txt
npm test
18 files passed, 454 tests passed
```

```txt
npm run test:e2e
19 passed
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
