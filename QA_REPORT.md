# QA Report

기준일: 2026-05-05

## Final Command Results

```txt
npm run build
tsc -b && vite build
built successfully
```

```txt
npm test
Test Files  20 passed (20)
Tests       477 passed (477)
```

```txt
npm run test:e2e
21 passed
```

```txt
npm run cap:sync
npm run build && cap sync
built successfully
Sync finished
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
- `npm test` 전체 477 tests 통과.
- `npm run test:e2e` 전체 21 tests 통과.

## Direct Art/CSS Production Pass

- `scripts/generateVisualAssets.mjs`를 직접 작성 SVG generator로 재작업했다.
- 총 253개 SVG를 생성했다: icons 61, items 158, mascots 5, portraits 8, release/final candidates 16, tiers 5.
- legacy visual fallback을 제거하고 `src/assets/builtinAssets.ts` fallback map으로 교체했다.
- `layout.css`를 누적 override가 아니라 통합 게임 UI stylesheet로 전면 정리했다.
- 홈 hero는 `main-hero-final` key visual과 `VisualAssetIcon assetKey={mascot-*}` 상태 mascot를 같이 사용한다.
- 환생 `prestige-ritual-final`, 상점 `shop-reward-banner-final`, 오프라인 보상 `offline-return-final`, store screenshot `store-key-visual-final`을 실제 화면/스크린샷 흐름에 연결했다.
- `visualAssetIntegrity.test.ts`를 추가해 253개 파일, 게임 config coverage, 외부 image/href/url 부재, runtime visual styling banned pattern을 검증한다.
- `assetRegistryMatrix.test.ts`는 비대한 파일 크기 기준 대신 SVG 구조와 무결성 기준으로 변경했다.

## Art/Visual Documentation

- `ART_DIRECTION.md`: 감정 키워드, 금지 키워드, 팔레트, 형태 언어, 캐릭터/시설/UI 원칙, QA gate.
- `ASSET_PRODUCTION_BRIEF.md`: 253개 SVG breakdown, 필수 asset mapping, registry/test contract, 교체 원칙.
- `FINAL_ASSET_BRIEF.md`, `FINAL_ART_AUDIT.md`: final key visual 제작/연결 범위와 before/after QA evidence.
- `VISUAL_QA.md`: 화면별 첫인상, 캐릭터성, 보상감, placeholder 냄새, 양산형 앱 UI 냄새, 모바일 가독성, 텍스트 잘림, 버튼 터치성, 화면 밀도, 경쟁작 대비 부족한 점을 표로 기록.

## 자동 테스트 커버리지

- 밸런스 계산: 비용 증가, 터치 수익, EPS, BigNumber, format.
- 콘텐츠 config: 30개 업그레이드/시설, 50개 quest, 40개 achievement, 25개 decoration, 5개 tier, 8개 character.
- 퀘스트/컬렉션: 동료 친밀도, 장식 배치, 보상 수령 중복 방지.
- Release matrix: 242 registry asset key와 158 content record 연결성.
- Visual asset integrity: 253 SVG files, 외부 참조 없음, runtime visual styling audit.
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

- Playwright screenshot 52개를 `qa-screenshots/`에 갱신했다.
- Store 후보 10개를 `store-screenshots/`에 갱신했다.
- 360x740, 390x844, 430x932, desktop 1280x900 중앙 패널에서 overflow assertion 통과.
- 홈 final key visual, 환생 ritual visual, 상점 reward banner, 오프라인 보상 visual, save modal 긴 code scroll을 재확인했다.
- CSS audit: runtime visual files에서 temporary override marker, generic UI marker, external asset fallback marker를 제거했다.

## Source Budget Gate

- handwritten runtime implementation: 6,366 LOC.
- handwritten tests/E2E: 2,225 LOC.
- pure handwritten gameplay/UI/system/test total: 8,591 LOC.
- excluded config: 2,529 LOC.
- excluded generated SVG/registry: 11,533 LOC.
- excluded generated matrix tests: 5,846 LOC.
- generated SVG files: 253.
- registry asset keys: 242.

## 남은 리스크

- 실제 물리 디바이스 60fps/thermal profiling은 수행하지 않았다.
- 실제 final 이미지/라이선스 확정 사운드/광고 SDK/IAP SDK는 연결하지 않았다.
- 실제 Apple/Google 개발자 계정, 인증서, 프로비저닝, 스토어 업로드는 수행하지 않았다.
- final bespoke hand-drawn animation, final app icon/adaptive icon/splash, 실제 store marketing bitmap art는 제출 전 P2로 남는다.
