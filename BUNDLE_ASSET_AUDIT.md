# Bundle Asset Audit

기준일: 2026-05-08

## Build Output Snapshot

RC-12 build 기준:

```txt
dist: 15M
dist/assets: 15M
dist PNG assets: 12 files / 14M
dist JS asset: index-DvH7_6MF.js 1.165M
dist CSS asset: index-pmQvQBpk.css 77.69K
src/assets/raster: 15 PNG files / 19M
store-screenshots: 32M
qa-screenshots: 188M
```

Largest runtime assets:

| Asset | Size | Runtime reason |
| --- | ---: | --- |
| `offline-reward-*.png` | 2.3M | Offline reward modal key art |
| `shop-reward-banner-*.png` | 2.2M | Shop reward banner |
| `main-hero-background-*.png` | 2.2M | Home and album scene |
| `prestige-ritual-*.png` | 2.1M | Prestige screen key art |
| companion portraits | 611K-706K each | Album companion sticker/ability UI |
| `index-*.js` | 1.1M | Current single app chunk with generated config/asset URL registries |

## RC-8 Optimization

Before RC-8, `RasterAssetRegistry` forced three release-only PNG candidates into `dist`:

- `src/assets/raster/release/store-key-visual.png`
- `src/assets/raster/release/app-icon-candidate.png`
- `src/assets/raster/home/main-capybara-character.png`

These files are not needed by runtime gameplay. Store screenshot generation reads `store-key-visual.png` directly from `src`, and app icon/crop candidates are source/release prep artifacts.

RC-8 removed those keys from the runtime registry and updated `rasterAssetIntegrity.test.ts` so:

- Runtime PNG registry still validates all in-game raster assets.
- Release-only PNG files still exist and pass PNG magic-byte/size checks.
- Store screenshot flow remains source-file based and unchanged.

Result: runtime `dist/assets` no longer emits `store-key-visual`, `app-icon-candidate`, or `main-capybara-character` PNGs.

## Remaining Warning

`npm run build` still reports Vite's large chunk warning for `index-*.js`:

```txt
Some chunks are larger than 500 kB after minification
```

RC-12 does not treat this as an internal P0/P1 blocker because:

- TypeScript build passes.
- Visual and store screenshots render.
- Runtime PNG payload was reduced without quality loss.
- The remaining JS chunk is mainly app/config/generated registry code and can be split later with route-level code splitting.
- RC-12 scope prioritized layout regression/device readiness over route-level code splitting because splitting screens would require another full visual/E2E revalidation cycle.

Current classification: P2 performance optimization.

## Deferred Optimizations

| Item | Priority | Reason |
| --- | --- | --- |
| Route-level dynamic imports | P2 | Could split album/shop/prestige/settings screens, but needs full screenshot/E2E revalidation |
| WebP/AVIF conversion | P2 | Needs browser/Capacitor/device compatibility and visual QA before replacing PNG |
| Companion portrait lazy module split | P3 | Images already load lazily; JS registry split would add complexity |
| Generated SVG registry split | P3 | SVG files are small individually; not a release blocker |

## Store/QA Artifacts

`qa-screenshots/` and `store-screenshots/` are committed QA artifacts, not runtime bundle assets. Their large folder size does not affect web/native app bundle size.
