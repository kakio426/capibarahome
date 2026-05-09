# Bundle Asset Audit

기준일: 2026-05-09

## Build Output Snapshot

RC-14 build 기준:

```txt
dist: 16M
dist/assets: 16M
dist PNG assets: 12 files / 14M
dist SVG assets: 242 files
largest JS chunk: react-vendor-CJ7CSe-k.js 188.60K
largest app chunk: game-config-CPeLDAHW.js 70.20K
CSS asset: ui-BhnYB42g.css 78.98K
Vite large chunk warning: 없음
src/assets/raster: 15 PNG files / 19M
store-screenshots: 32M
qa-screenshots: 184M
platform-assets: 20M
android/app/src/main/res: 1.3M
```

Largest runtime assets:

| Asset | Size | Runtime reason |
| --- | ---: | --- |
| `offline-reward-*.png` | 2.3M | Offline reward modal key art |
| `shop-reward-banner-*.png` | 2.2M | Shop reward banner |
| `main-hero-background-*.png` | 2.2M | Home and album scene |
| `prestige-ritual-*.png` | 2.1M | Prestige screen key art |
| companion portraits | 611K-706K each | Album companion sticker/ability UI |

JS chunks:

| Chunk | Size |
| --- | ---: |
| `react-vendor-CJ7CSe-k.js` | 188.60K |
| `game-config-CPeLDAHW.js` | 70.20K |
| `game-runtime-CY62HQiz.js` | 53.36K |
| `ui-DU0edwza.js` | 40.46K |
| `generated-assets-C4GgzOaS.js` | 19.45K |
| `index-CH54AEzr.js` | 6.81K |
| `vendor-7OC5HNn7.js` | 3.61K |

## RC-8 Runtime Raster Optimization

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

## RC-14 Chunk Optimization

RC-13 still reported:

```txt
Some chunks are larger than 500 kB after minification
index-DZPMoALW.js 1.165M
```

RC-14 root cause:

- generated SVG registry entries were being inlined as JS data URLs.
- first manual chunk attempt split the app but left `generated-assets` at `803K`.

RC-14 fix:

- `vite.config.ts` sets `build.assetsInlineLimit = 0`.
- Rollup manual chunks split vendor, config, runtime, UI, and generated asset registry URL code.
- `game-core` and `game-systems` are grouped as `game-runtime` to avoid circular manual chunk warnings.

Measured result:

- Vite large chunk warning removed.
- largest JS chunk reduced from `1.165M` to `188.60K`.
- `generated-assets` reduced from `803K` to `19.45K`.
- SVGs now emit as 242 hashed files instead of being embedded in JS.

Tradeoff:

- `dist` increases from `15M` to `16M` and file count grows because SVGs are external files.
- This is acceptable for RC-14 because it reduces JS parse/transfer pressure without degrading visual quality.

## RC-14 Store Asset Export

`npm run export:assets` now also generates:

- `platform-assets/google-play/feature-graphic.png`
- `store-screenshots/google-play-feature-graphic.png`

Both are `1024 x 500` PNG candidates. `e2e/store-screenshot-pack.spec.ts` validates file size and dimensions.

## Remaining P2/P3 Optimizations

| Item | Priority | Reason |
| --- | --- | --- |
| Runtime PNG WebP/AVIF conversion | P2 | Could reduce 14M PNG payload, but requires iOS/Android WebView compatibility and visual QA |
| Lossless PNG compression | P2 | Safe candidate, but should be done with screenshot diff/device QA |
| Route-level dynamic imports | P3 | JS warning is solved; remaining largest payload is raster imagery |
| Companion portrait lazy module split | P3 | Images already load lazily as `<img loading="lazy">`; registry JS is now small |
| Final Google Play feature graphic design | P2/external | Current feature graphic is key-art crop candidate, final store approval remains user/art/legal item |

## Store/QA Artifacts

`qa-screenshots/`, `store-screenshots/`, and `platform-assets/` are committed QA/submission-prep artifacts, not runtime web imports. Their large folder size does not affect the shipped web/native runtime bundle.

## 판정

RC-14 resolved the Vite large chunk warning with measured output. Remaining bundle work is visual raster payload optimization and final store graphic approval, which are P2/P3 because they can affect quality and require physical-device verification.
