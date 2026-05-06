# QA Report

기준일: 2026-05-06

## Final Command Results

```txt
npm run build
tsc -b && vite build
built successfully; Vite large chunk warning remains for bundled raster assets
```

```txt
npm test
Test Files  21 passed (21)
Tests       479 passed (479)
```

```txt
npm run test:e2e
21 passed (1.5m)
```

```txt
npm run cap:sync
npm run build && cap sync
built successfully; Sync finished
```

```txt
git diff --check
passed
```

## P0 Reload/E2E Fix

Fresh E2E에서 `first-five-minute-playtest`, `save-import-export`, `upgrade-flow`가 reload 직후 하단 탭 클릭 timeout을 냈다.

Root cause:
- EPS가 있는 저장 데이터를 reload하면 짧은 reload gap도 오프라인 보상으로 계산되어 `오프라인 보상` modal/backdrop이 열릴 수 있었다.
- toast/modal layer가 남아 하단 탭 pointer event를 가로막아 실제 유저 플로우가 진행되지 않았다.

Fix:
- `GameConfig.offline.minSeconds = 60` 추가.
- `OfflineRewardManager.createOfflineReward`에서 60초 미만 또는 보상 1 미만이면 modal을 만들지 않음.
- toast를 `pointer-events: none`으로 변경.
- reload 이후 `오프라인 보상` dialog가 없어야 한다는 E2E assertion 추가.
- `offline.test.ts`, `rc1Rewards.test.ts`, 관련 Playwright flow를 업데이트.

검증:
- `npm test` 전체 479 tests 통과.
- `npm run test:e2e` 전체 21 tests 통과.

## Raster Art/CSS Production Pass

- 이전 SVG 중심 final art 선언은 실패로 재분류했고, 근거를 `ART_FAILURE_REVIEW.md`에 남겼다.
- 첫 번째 raster pass도 실패로 재분류했다. 핵심 PNG는 있었지만 흰 둥근 웹 카드와 generic app panel이 화면을 지배했기 때문이다.
- `scripts/generateVisualAssets.mjs`의 253개 SVG pack은 currency, tab, upgrade, badge 같은 보조 visual로 유지한다.
- built-in image generation과 후처리 workflow로 v2 PNG raster file 15개를 유지한다. 핵심 UI에서 직접 쓰는 후보는 integrated home hero background, 8 companion portraits, prestige ritual, shop reward banner, offline reward, store key visual이며, app icon candidate와 main capybara crop은 release/fallback 후보로 registry에 남겼다.
- `RasterAssetRegistry.ts`와 `RasterAssetImage.tsx`를 추가해 핵심 raster asset을 key 기반으로 연결했다.
- legacy visual fallback을 제거하고 `src/assets/builtinAssets.ts` fallback map으로 교체했다.
- RC-4에서 `layout.css`를 wood/parchment/orange lacquer HUD 중심의 통합 게임 UI stylesheet로 정리했고, RC-5에서 이를 `shell.css`, `hud.css`, `screens.css`, `effects.css` 책임 구조로 분리했다.
- 홈 hero는 `main-hero-background.png` 안의 통합 orchard/capybara scene이 주인공이 되도록 재구성했고, 별도 도형 overlay는 숨겼다.
- 앨범은 raster companion portrait를 sticker/companion card에 연결했다.
- 환생 `prestige-ritual.png`, 상점 `shop-reward-banner.png`, 오프라인 보상 `offline-reward.png`, store screenshot `store-key-visual.png`을 실제 화면/스크린샷 흐름에 연결했다.
- `visualAssetIntegrity.test.ts`는 253개 SVG 보조 asset, 게임 config coverage, 외부 image/href/url 부재, runtime visual styling banned pattern을 검증한다.
- `rasterAssetIntegrity.test.ts`를 추가해 required raster key, PNG magic bytes, file existence, 최소 파일 크기를 검증한다.
- `assetRegistryMatrix.test.ts`는 비대한 파일 크기 기준 대신 SVG 구조와 무결성 기준으로 변경했다.

## Art/Visual Documentation

- `ART_DIRECTION.md`: 감정 키워드, 금지 키워드, 팔레트, 형태 언어, 캐릭터/시설/UI 원칙, QA gate.
- `ASSET_PRODUCTION_BRIEF.md`: SVG 보조 pack과 raster core art pack을 분리한 asset mapping, registry/test contract, 교체 원칙.
- `FINAL_ASSET_BRIEF.md`, `FINAL_ART_AUDIT.md`: raster key visual 제작/연결 범위와 before/after QA evidence.
- `VISUAL_QA.md`: 화면별 첫인상, 캐릭터성, 보상감, placeholder 냄새, 양산형 앱 UI 냄새, 모바일 가독성, 텍스트 잘림, 버튼 터치성, 화면 밀도, 경쟁작 대비 부족한 점을 표로 기록.

## RC-4 Game UI Skin & Interaction Polish

- v2 raster art는 유지했다. `src/assets/raster`는 15 PNG / 19M 상태를 유지한다.
- 설정 토글을 browser checkbox에서 carved wood/orange custom switch로 교체했다.
- 세이브 modal에 `Export 코드 복사` action을 추가해 실제 export/import 사용성을 높였다.
- save/import textarea, modal close button, disabled button, segmented control, toast를 wood/parchment/orange HUD skin에 맞게 보강했다.
- toast가 settings header를 덮지 않도록 `data-toast-visible` 상태와 content offset을 추가했다.
- 강화 pass에서 `RC4_UI_SKIN_AUDIT.md`를 추가해 `home/upgrades/settings/save-modal/collection`을 P1/P2로 재분류했다.
- 성장/업그레이드 화면은 카드 리스트에서 garden workbench/facility shelf 구조로 재구성했다. `.upgrade-card` E2E selector는 유지하고, tool slot, shelf rail, cost plaque, carved buy button, level/effect plaques로 재스킨했다.
- 설정 화면은 `집사 장부`와 `정원 관리 서랍` heading, custom switch, ledger action button으로 정리해 일반 form row 느낌을 줄였다.
- 세이브 modal은 `save-vault-modal`과 sealed code row, vault code slot으로 바꿔 util dialog 대신 보관함/봉인 장부 느낌으로 재구성했다.
- 컬렉션 summary metric과 progress는 sticker-book ledger stamp와 carved groove progress로 보강했다.
- interaction polish: purchase pulse, error toast shake, prestige ready glow, active tab pop을 추가했고 `effectsEnabled=false` 및 reduced motion media query를 존중한다.
- `visual-regression.spec.ts` 단독 4 viewport 통과 후 settings/save/upgrade/collection/offline screenshots를 수동 확인했다. `store-screenshot-pack.spec.ts`도 단독 통과 후 store save/home/album 후보를 확인했다.

## RC-5 CSS Debt & Component System Pass

- v2 raster art와 RC-4 wood/parchment/orange HUD 방향은 유지했다. 새 raster asset은 추가하지 않았다.
- `src/ui/styles/layout.css`를 3,021줄 단일 stylesheet에서 4줄 import manifest로 축소했다.
- runtime CSS를 `tokens.css`, `global.css`, `shell.css`, `hud.css`, `screens.css`, `effects.css` 책임으로 분리했다.
- E2E 안정성을 위해 기존 `.btn`, `.panel`, `.modal`, `.upgrade-card`, `.bottom-tabs` selectors는 유지하고, `.ui-button`, `.ui-panel`, `.ui-modal`, `.ui-ledger-row`, `.ui-progress-groove`, `.ui-tab-dock`, `.ui-shelf-card`, `.ui-sticker-ledger`, `.ui-code-slot`을 병행 적용했다.
- 성장 화면은 tool slot pedestal/icon centering, cost/buy plaque hierarchy, mobile inline buy row를 보강했다.
- 설정 화면은 ledger/drawer 느낌을 유지하면서 토글 row와 segmented controls를 common HUD classes로 안정화했다.
- 세이브 modal은 vault/code-slot classes, scroll-safe textareas, 복사 action을 유지했다.
- 앨범 summary는 sticker-ledger/stamp cue와 groove progress를 강화했다.
- CSS split 직후 screen header가 low-contrast parchment로 회귀한 문제를 screenshot에서 발견했고, `screens.css`에서 dark wood plaque를 재고정한 뒤 screenshots를 다시 생성했다.
- `visualAssetIntegrity.test.ts` runtime visual styling audit에 새 CSS 파일들을 모두 포함했다.
- `RC5_CSS_COMPONENT_AUDIT.md`에 baseline audit, selector/line metrics, screen 판정, 남은 P2/P3를 기록했다.

## 자동 테스트 커버리지

- 밸런스 계산: 비용 증가, 터치 수익, EPS, BigNumber, format.
- 콘텐츠 config: 30개 업그레이드/시설, 50개 quest, 40개 achievement, 25개 decoration, 5개 tier, 8개 character.
- 퀘스트/컬렉션: 동료 친밀도, 장식 배치, 보상 수령 중복 방지.
- Release matrix: 242 registry asset key와 158 content record 연결성.
- Visual asset integrity: 253 SVG auxiliary files, 15 raster PNG files, 외부 참조 없음, runtime visual styling audit.
- 저장/불러오기: 동일 상태 복구, 손상 Base64, checksum 불일치, v1/v2/v3 migration.
- 오프라인 보상, 환생, 튜토리얼, 설정, 광고/IAP mock.
- RC reward loops: companion passive, achievement claim reward, permanent multiplier, progression unlock, sound mute.
- RC bug bash: rapid taps, duplicate reward guards, prestige save/load, mute persistence, long number formatting.
- balance simulation: 1분/5분/15분/30분/2시간 checkpoint, 첫 환생, 환생 후 30분, 광고 버프.

## E2E Coverage

실제 유저 E2E는 debug shortcut을 사용하지 않는다. Debug는 `e2e/debug-cheat-flow.spec.ts`에서만 사용한다.

| 파일 | 상태 | 비고 |
| --- | --- | --- |
| `e2e/new-user-flow.spec.ts` | 완료 | 튜토리얼, 터치, 앨범 퀘스트 보상, 첫 업그레이드, 홈 목표/컬렉션 |
| `e2e/upgrade-flow.spec.ts` | 완료 | 구매 가능/불가능 상태, reload blocker regression |
| `e2e/save-import-export.spec.ts` | 완료 | 저장, reload, export, reset, import |
| `e2e/offline-reward.spec.ts` | 완료 | 복귀 보상, 중복 지급 방지 |
| `e2e/prestige-flow.spec.ts` | 완료 | 환생 실행과 영구 재화 유지 |
| `e2e/settings-tutorial.spec.ts` | 완료 | 설정, 튜토리얼 재시작 |
| `e2e/monetization-mock.spec.ts` | 완료 | 광고 보상, IAP 샌드박스 보상 |
| `e2e/visual-regression.spec.ts` | 완료 | 360/390/430/desktop screenshots, overflow check |
| `e2e/store-screenshot-pack.spec.ts` | 완료 | iPhone/Android store screenshot 후보 10장 |
| `e2e/debug-cheat-flow.spec.ts` | 완료 | `?debug=1` 격리와 장기 성장 QA |
| `e2e/rc1-product-feel.spec.ts` | 완료 | 업적 보상 claim, 카피바라 passive 표시/수익, sound mute, 장기 목표 |
| `e2e/first-five-minute-playtest.spec.ts` | 완료 | debug 없이 5분권 실제 플레이 보상/저장/장식/동료/복귀 검증 |

## 시각 QA

- Playwright visual flow가 52개 current screenshot을 갱신했다. `qa-screenshots/` 전체에는 archived before shots를 포함해 88개 PNG가 있다.
- Store 후보 10개를 `store-screenshots/`에 갱신했다.
- 360x740, 390x844, 430x932, desktop 1280x900 중앙 패널에서 overflow assertion 통과.
- 홈 v2 raster orchard/capybara integrated scene, 앨범 raster sticker portraits, 환생 ritual raster, 상점 reward banner raster, 오프라인 보상 raster, save modal 긴 code scroll을 재확인했다.
- Store 후보 10개는 raster store key visual을 full-screen background로 두고 gameplay panel/copy를 얹는 구성으로 재생성했다.
- CSS audit: runtime visual files에서 temporary override marker, generic UI marker, external asset fallback marker를 제거했고, RC-5 이후 `shell/hud/screens/effects` 파일도 audit 대상에 포함했다.
- RC-4 추가 수동 판정: `390x844-upgrades.png`는 더 이상 spreadsheet/list/card layout로 보지 않는다. `390x844-settings.png`는 browser form UI가 아니며, `390x844-save-modal.png`는 save vault/ledger UI로 보인다.
- RC-5 추가 수동 판정: `390x844-upgrades.png`, `390x844-settings.png`, `390x844-save-modal.png`, `390x844-collection.png`, `desktop-1280x900-upgrades.png`, store save screenshot을 확인했다. 내부 P0/P1 visual regression은 없음.

## Source Budget Gate

- handwritten runtime implementation: 7,781 LOC.
- handwritten tests/E2E: 2,289 LOC.
- pure handwritten gameplay/UI/system/test total: 10,070 LOC.
- excluded config: 2,529 LOC.
- excluded generated SVG/registry: 11,533 LOC.
- excluded generated matrix tests: 5,846 LOC.
- generated SVG files: 253.
- registry asset keys: 242.
- raster PNG files: 15, 19M total.
- handwritten runtime+test byte size: 345,234 bytes.

## 남은 리스크

- 실제 물리 디바이스 60fps/thermal profiling은 수행하지 않았다.
- 실제 commissioned/final art ownership, 라이선스 확정 사운드, 광고 SDK/IAP SDK는 연결하지 않았다.
- 실제 Apple/Google 개발자 계정, 인증서, 프로비저닝, 스토어 업로드는 수행하지 않았다.
- commissioned art 소유권/법무 확정, platform icon/adaptive icon/splash export, 실제 device store screenshot 재촬영은 제출 전 P1 external art readiness로 남는다.
