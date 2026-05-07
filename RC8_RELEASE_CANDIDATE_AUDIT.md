# RC-8 Release Candidate Audit

기준일: 2026-05-07

## Scope

RC-8은 새 콘텐츠 추가가 아니라 release candidate bug bash와 device readiness prep이다. RC-7 retention systems, save v5, RC-6 quick-buy/product feel, RC-5 CSS component system, v2 raster art 방향은 유지한다.

## Severity Audit

| 항목 | RC-8 판정 | 근거 / 조치 |
| --- | --- | --- |
| save v5 migration/import/export | P0 risk resolved | `rc8ReleaseBugBash.test.ts`에서 v1/v2/v3/v4 -> v5 migration, corrupted v5 retention recovery, export/import cooldown 유지 검증 |
| daily/streak/milestone/post-prestige 중복 지급 | P0 risk resolved | daily duplicate, D7 duplicate, post-prestige step save/load guard 검증 |
| offline reward와 daily reward 동시 발생 | P1 risk resolved | 같은 복귀 세션에서 offline modal claim 후 daily claim/reload E2E 추가 |
| prestige 직후 save/load | P1 risk resolved | first prestige -> post-prestige goal claim -> reload E2E와 unit save/load 검증 |
| quick-buy max safety cap | P1 risk resolved | max plan safety cap, zero-quantity disabled state, quick-buy max save/reload E2E 추가 |
| long-session RAF loop/memory/listener cleanup | P1 risk resolved in automation scope | 2시간 simulation, 8시간 offline cap, rapid tap 500회, quick-buy 반복, save/load 20회, RAF visibility listener cleanup 테스트 |
| mobile viewport/safe area | P1 risk reduced | `100dvh`, `--safe-top`, `--safe-bottom`, page modal overflow E2E, visual screenshots 갱신 |
| touch responsiveness | P2 monitored | `touch-action: manipulation`, tap highlight 제거, rapid tap/stress 검증. 실제 저사양 기기 터치 latency는 외부 device QA |
| audio/vibration permission/fallback | P2 monitored | SoundManager는 실패 시 safe no-op, vibration try/catch 유지. 실제 WebView permission/gesture edge는 device QA |
| localStorage/WebView storage | P1 risk reduced | default storage fallback, throwing storage safe failure, pagehide/visibility hidden save 추가 |
| bundle size / raster loading | P2 known warning | runtime registry에서 store-only PNG와 unused crop을 분리해 dist PNG 15M로 감소. JS chunk warning은 남아 `BUNDLE_ASSET_AUDIT.md`에 기록 |
| screenshot/store asset readiness | P2 external | Playwright 후보는 최신 UI로 갱신. 실제 simulator/device frame 재촬영과 final icon/splash export는 사용자 제공 |
| native Capacitor readiness | P2 external | `npm run cap:sync` 검증 대상. native folders/signing은 계정/ID 확정 전 의도적으로 제외 |
| external blockers | External | Apple/Google 계정, signing, privacy/support URL, real SDK/IAP/ad, 물리 기기 QA |

## Implemented RC-8 Fixes

- `SaveManager`가 localStorage 접근 불가 환경에서 volatile session fallback을 사용하고, throwing storage는 앱 crash 없이 safe failure로 처리한다.
- `AppShell`이 `beforeunload`뿐 아니라 `pagehide`와 hidden `visibilitychange`에서도 silent save를 수행한다.
- WebView viewport를 위해 `100dvh`, safe-area top/bottom padding, iOS input zoom 방지용 16px input/textarea, touch-action 보강을 추가했다.
- `RasterAssetRegistry`에서 runtime UI가 쓰지 않는 `store-key-visual.png`, `app-icon-candidate.png`, `main-capybara-character.png`를 제외했다. 파일은 release/source candidate로 유지하고 integrity test에서 별도 검증한다.
- `visual-regression.spec.ts`는 screenshot-heavy QA flow라 desktop pass가 30초를 넘길 수 있어 spec timeout을 60초로 조정했다. 이후 단독 visual run과 full E2E가 통과했다.

## Excluded From RC-8

- Save schema version 변경. RC-8은 save v5를 유지한다.
- 실제 서버 calendar, push notification, account sync.
- 실제 ad/IAP SDK와 결제 상품.
- PNG WebP 전환. 품질/호환성/device QA 없이 진행하지 않는다.
- native platform folders 생성과 signing.

## Verification Targets

- `npm run build`
- `npm test`
- `npm run test:e2e`
- `npm run cap:sync`
- `git diff --check`

최종 fresh command 결과는 `QA_REPORT.md`와 `RELEASE_BLOCKERS.md`에 기록한다.
