# Performance QA

## Implemented Performance Protections

- RAF-based game loop instead of `setInterval`
- Delta clamp via `GameConfig.loop.maxDeltaMs`
- Display update throttling via `GameConfig.loop.displayUpdateMs`
- `document.visibilityState` handling to avoid background production ticks
- Floating text capped to 18 visible items
- Particle list capped to 36 visible items
- WebAudio effects are short oscillator envelopes and skip playback when sound mute is enabled
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

## Command Results

```txt
npm test
17 files passed, 452 tests passed
```

```txt
npm run test:e2e
17 passed
```

## Manual/Physical Device Gap

No physical iPhone/Android FPS profiling was performed in this environment. Before store submission:

- Profile on a low-end Android device.
- Profile on at least one iPhone target.
- Confirm touch spam does not drop interaction responsiveness.
- Confirm WebView storage survives app termination in native wrapper.
- Confirm no memory growth after 10 minutes of idle play.
