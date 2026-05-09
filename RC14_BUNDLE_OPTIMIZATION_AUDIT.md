# RC-14 Bundle Optimization Audit

기준일: 2026-05-09

## Before

RC-13 build snapshot:

```txt
dist: 15M
dist/assets: 15M
dist PNG assets: 12 files / 14M
JS: index-DZPMoALW.js 1.165M
CSS: index-BhnYB42g.css 78.98K
Vite warning: Some chunks are larger than 500 kB after minification
```

Root cause:

- runtime PNG assets were already trimmed in RC-8.
- remaining large warning came mainly from `GeneratedAssetRegistry.ts`.
- 242 SVG assets under the generated registry were being inlined into JS data URLs, creating an `803K` `generated-assets` chunk after the first manual chunk attempt.

## RC-14 Changes

Code changes:

- `vite.config.ts`
  - added `build.assetsInlineLimit = 0`
  - added explicit Rollup manual chunks:
    - `react-vendor`
    - `vendor`
    - `game-config`
    - `game-runtime`
    - `generated-assets`
    - `ui`
- `game-core` and `game-systems` were merged into `game-runtime` to avoid circular manual chunk warning.

Asset export changes:

- `scripts/exportPlatformAssets.mjs` now generates:
  - `platform-assets/google-play/feature-graphic.png`
  - `store-screenshots/google-play-feature-graphic.png`
- Both are `1024 x 500` PNG candidates.

E2E guard:

- `e2e/store-screenshot-pack.spec.ts` now validates the Google Play feature graphic candidate dimension and file size.

## After

RC-14 build snapshot:

```txt
dist: 16M
dist/assets: 16M
dist PNG assets: 12 files / 14M
dist SVG assets: 242 files
largest JS chunk: react-vendor-CJ7CSe-k.js 188.60K
generated-assets-C4GgzOaS.js: 19.45K
Vite large chunk warning: removed
```

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

Largest runtime assets remain raster PNG:

| Asset type | Size / status |
| --- | --- |
| offline reward PNG | 2.3M |
| shop reward banner PNG | 2.2M |
| main hero background PNG | 2.2M |
| prestige ritual PNG | 2.1M |
| companion portrait PNGs | 611K-706K each |

## Tradeoff

`assetsInlineLimit = 0` shifts SVG payload from JS data URLs into separate hashed SVG files. This slightly increases `dist` folder file count and total disk size, but improves JS parse/transfer profile and removes the Vite large chunk warning without changing gameplay UI or image quality.

## Remaining P2/P3

| Item | Priority | Reason |
| --- | --- | --- |
| WebP/AVIF runtime raster conversion | P2 | Could reduce 14M PNG payload, but needs iOS/Android WebView visual QA before replacement |
| Route-level lazy loading | P3 | JS warning is resolved; remaining startup payload is mostly visual PNG assets |
| Runtime raster art compression | P2 | Lossless/visually safe compression should be tested against screenshot QA and physical devices |
| Feature graphic final design | P2/external | Current `1024 x 500` graphic is a candidate crop from key art. Final store marketing approval remains user/legal/art direction item |

## 판정

RC-14 fixed the previous Vite large chunk warning with code and measured output. Remaining bundle work is raster payload optimization, which is P2 because it can affect visual quality and requires physical device QA.
