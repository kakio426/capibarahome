# QA Report

기준일: 2026-05-05

## 최종 명령 결과

```txt
npm run build
tsc -b && vite build
89 modules transformed
built successfully
```

```txt
npm test
Test Files  18 passed (18)
Tests       454 passed (454)
```

```txt
npm run test:e2e
Running 19 tests using 5 workers
19 passed
```

```txt
npm run cap:sync
npm run build && cap sync
90 modules transformed
built successfully
Sync finished
```

## RC-2 Native Store Readiness & Presentation Polish

- Visible emoji placeholder를 currency/product/offline reward UI에서 제거하고 generated visual asset 기반 아이콘으로 교체했다.
- 카피바라 8마리 portrait에 머리띠, 안경, 스카프, 모자 등 캐릭터별 소품을 추가해 앨범 구분력을 높였다.
- `app-icon-rc2.svg`, `splash-rc2.svg`, `store-screenshot-frame-rc2.svg` 초안을 생성하고 `ASSET_CREDITS.md`에 출처/라이선스 상태를 기록했다.
- `AudioConfig.ts`와 file-ready `SoundManager`를 추가해 tap/purchase/achievement/quest/offlineReward/prestige/error/navigation/ad 슬롯을 실제 파일로 교체 가능하게 만들었다.
- `store-screenshots/`에 iPhone/Android store 후보 10장을 생성했고, QA screenshot과 분리했다.
- `NATIVE_BUILD_GUIDE.md`, `DEVICE_QA_CHECKLIST.md`, `AUDIO_ASSET_PLAN.md`, `STORE_SCREENSHOT_PLAN.md`를 추가했다.

## RC-1 Product Feel Hardening

- 8마리 카피바라에 고유 passive ability를 추가하고 친밀도 레벨에 따라 tap/EPS/offline/quest/achievement/decoration/prestige 보너스를 실제 계산에 반영했다.
- 40개 업적은 `AchievementRewardConfig.ts` 기반 claim reward를 갖는다. 기본 tier 귤 보상에 더해 핵심 업적은 황금 나뭇잎, 친밀도, 장식, 영구 multiplier를 지급한다.
- 홈에 첫 환생 전/후 장기 목표를 추가하고, 5개 성장 구간에 unlock 기록/보상 설명/visual 변화 설명/toast를 연결했다.
- WebAudio 기반 tap/purchase/error/achievement/prestige/offlineReward/ad 효과음을 추가하고, RC-2에서 file-ready audio slot과 설정 mute state를 연결했다.
- 홈 hero, 환생, 앨범 능력/보상 카드를 시각 보강했고 2열 동료 카드의 가독성 문제를 1열 카드로 수정했다.

## 이번 감사에서 확인한 것

- `SOURCE_BUDGET_REPORT.md`를 generated/config/docs 제외 기준으로 재작성했다.
- 순수 handwritten runtime 구현은 6,467 LOC, handwritten tests/E2E는 1,678 LOC로 산정했다.
- 이전의 54K `src` LOC는 generated SVG/registry와 generated matrix test 비중이 커서 실제 구현 규모 근거로 쓰지 않도록 정정했다.
- `CONTENT_INTEGRATION_AUDIT.md`를 추가해 30 upgrades/facilities, 50 quests, 40 achievements, 25 decorations, 8 capybaras, 5 tiers의 UI/save/test/play impact를 항목별 검증했다.
- 장식 25개 중 홈 hero visual class가 없던 11개를 CSS로 보강했다.
- `VISUAL_DEFECTS.md`를 추가하고 Playwright screenshot 기준 P1 visual defects를 기록했다. 현재 QA 스크린샷은 48개, store 후보 스크린샷은 10개다.
- 저장 modal, 하단 탭 줄바꿈, toast overlay를 수정했다.

## 자동 테스트 커버리지

- 밸런스 계산: 비용 증가, 터치 수익, EPS, BigNumber, format
- 콘텐츠 config: 30개 업그레이드/시설, 40개 achievement, 5개 tier, 8개 캐릭터, 중복 id/name, unlock, purchase 가능성
- 퀘스트/컬렉션: 50개 퀘스트, 25개 장식, 동료 친밀도, 장식 배치, 보상 수령 중복 방지
- Release matrix: generated visual assets와 content record의 asset/copy/reference 연결
- 진행 selector: 다음 목표, 컬렉션 badge, 환생 progress
- 저장/불러오기: 동일 상태 복구, 손상 Base64, checksum 불일치, 구버전 migration, achievement/quest/collection state 유지
- 오프라인 보상, 환생, 튜토리얼, 설정, 광고/IAP mock
- RC-1 reward loops: companion passive, achievement claim reward, permanent multiplier, progression unlock, sound mute
- RC-2 audio readiness: required slots, placeholder tone fallback, sound/music mute state
- balance simulation: 1분/5분/30분/2시간 checkpoint, 첫 환생, 환생 후 30분, 광고 버프, 환생 후 성장 비교

## E2E 커버리지

실제 유저 E2E는 debug shortcut을 사용하지 않는다. Debug는 `e2e/debug-cheat-flow.spec.ts`에서만 사용한다.

| 파일 | 상태 | 비고 |
| --- | --- | --- |
| `e2e/new-user-flow.spec.ts` | 완료 | 튜토리얼, 터치, 앨범 퀘스트 보상, 첫 업그레이드, 홈 목표/컬렉션, debug 부재 |
| `e2e/upgrade-flow.spec.ts` | 완료 | 구매 가능/불가능 상태 |
| `e2e/save-import-export.spec.ts` | 완료 | 저장, reload, export, reset, import |
| `e2e/offline-reward.spec.ts` | 완료 | 복귀 보상, 중복 지급 방지 |
| `e2e/prestige-flow.spec.ts` | 완료 | 환생 실행과 영구 재화 유지 |
| `e2e/settings-tutorial.spec.ts` | 완료 | 설정, 튜토리얼 재시작 |
| `e2e/monetization-mock.spec.ts` | 완료 | 광고 보상, IAP 샌드박스 보상 |
| `e2e/visual-regression.spec.ts` | 완료 | 360/390/430/desktop screenshots, overflow check |
| `e2e/store-screenshot-pack.spec.ts` | 완료 | iPhone/Android store screenshot 후보 10장, debug shortcut 미사용 |
| `e2e/debug-cheat-flow.spec.ts` | 완료 | `?debug=1` 격리와 장기 성장 QA |
| `e2e/rc1-product-feel.spec.ts` | 완료 | 업적 보상 claim, 카피바라 passive 표시/수익, sound mute, 장기 목표 |

## 시각 QA

- Playwright screenshot 48개를 `qa-screenshots/`에 갱신했고, store 후보 10개를 `store-screenshots/`에 생성했다. RC-1 이전 상태는 `qa-screenshots/rc1-before/`에 보관했다.
- 360x740, 390x844, 430x932, desktop 1280x900 중앙 패널에서 overflow assertion 통과.
- 저장 modal의 긴 Export 코드는 전용 scroll textarea 안에 머무른다.
- 하단 탭의 `업그레이드` visible label은 `성장`으로 줄여 360px 줄바꿈을 제거했고, aria-label은 유지했다.
- toast는 자동 dismiss되고 compact width로 줄어 상점 버튼을 덮지 않는다.
- 앨범/collection은 companion ability와 achievement reward claim을 표시한다. 390px에서 2열 companion card가 빽빽한 문제는 1열로 수정했다.
- Store 후보 대표 이미지는 iPhone home과 Android save modal을 직접 확인했고, 긴 제목 줄바꿈과 toast 노출 문제를 수정했다.

## Source Budget Gate

- handwritten runtime implementation: 6,467 LOC
- handwritten tests/E2E: 1,678 LOC
- pure handwritten gameplay/UI/system/test total: 8,145 LOC
- excluded config: 2,528 LOC
- excluded generated SVG/registry: 41,077 LOC
- excluded generated matrix tests: 4,746 LOC

## 남은 리스크

- 실제 물리 디바이스 60fps/thermal profiling은 수행하지 않았다.
- 실제 final 이미지/라이선스 확정 사운드/광고 SDK/IAP SDK는 연결하지 않았다.
- 실제 Apple/Google 개발자 계정, 인증서, 프로비저닝, 스토어 업로드는 수행하지 않았다.
- Cats & Soup 수준의 final bespoke art, character animation, 실제 음원/BGM, 실제 SDK와 물리 기기 QA는 스토어 제출 전 리스크다.
