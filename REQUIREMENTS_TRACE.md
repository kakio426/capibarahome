# Requirements Trace

기준일: 2026-05-05

이 문서는 교체 전 `PROJECT_SPEC.md` 원본 0-26번 요구사항을 production RC 명세와 실제 구현 근거에 매핑한다. 상태는 문서 선언이 아니라 코드, 테스트, E2E, 스크린샷, 빌드 산출물 기준으로 판단한다.

## Assumptions

- 실제 Apple/Google 개발자 계정, 인증서, 프로비저닝, privacy policy URL, 실제 광고/IAP SDK가 없으므로 네이티브 제출 완료가 아니라 제출 준비 산출물까지만 완료로 본다.
- final store art와 사운드 파일은 아직 제공되지 않았으므로 generated SVG/CSS RC visual assets, WebAudio 효과음, 교체 가능한 manager/component 구조를 완료 근거로 본다.
- 긴 진행 시간이 필요한 오프라인/환생 E2E는 checksum save fixture로 시작하지만, 실제 유저 플로우에서는 debug shortcut을 사용하지 않는다.
- Base64 export/import는 이동 가능한 저장 코드 형식이며 암호화로 설명하지 않는다.

## Original 0-26 Mapping

| 원본 섹션 | 핵심 요구사항 | 상태 | 실제 근거 |
| --- | --- | --- | --- |
| 0. 역할 | 게임 클라이언트, 밸런스, QA 역할 통합 | 완료 | `PROJECT_SPEC.md`, `QA_REPORT.md`, 구현/테스트/문서 산출물 |
| 1. 고정 기술 스택 | Vite + React + TS, plain CSS, Vitest, Playwright, BigNumberLite | 완료 | `package.json`, `src/core/BigNumberLite.ts`, `playwright.config.ts` |
| 2. 최종 산출물 | 필수 실행 파일, README/개발/밸런스/세이브/QA 문서, 핵심 테스트 | 완료 | `README.md`, `DEVELOPER_GUIDE.md`, `BALANCE_GUIDE.md`, `SAVE_SCHEMA.md`, `QA_REPORT.md`, `src/tests/*` |
| 3. 권장 폴더 구조 | app/config/core/game/state/systems/ui/tests 구조 | 완료 | `src/` 구조, `e2e/` 분리 |
| 4. 개발 진행 원칙 | 구현, 테스트, 버그 수정, 완료 기준, QA 기록 | 완료 | `QA_REPORT.md`, `SPEC_COVERAGE.md`, test/build/e2e 실행 결과 |
| 5. 게임 콘셉트 | 카피바라 집사, 귤, 황금 나뭇잎, 귤 수확 축제 | 완료 | `GameConfig.ts`, `MonetizationConfig.ts`, 홈/상점 UI |
| 6. 핵심 수식 | tapGain, EPS, cost, prestige, offline 공식 중앙 관리 | 완료 | `GameConfig.ts`, `BalanceConfig.ts`, `gameMath.ts`, `balance.test.ts` |
| 7. 숫자 시스템 | BigNumberLite 필수 메서드와 포맷 | 완료 | `BigNumberLite.ts`, `balance.test.ts` |
| 8. M0 초기화/디버그 | Vite 세팅, 모바일 레이아웃, debug manager | 완료 | `AppShell.tsx`, `DebugManager.ts`, `debug-cheat-flow.spec.ts` |
| 9. M1 아키텍처/밸런스 | 중앙 config, BigNumber, gameMath 테스트 | 완료 | `src/config/*`, `src/core/*`, `src/tests/balance.test.ts` |
| 10. M2 게임 루프 | RAF, delta clamp, visibility, 터치 즉시 반응 | 완료 | `GameLoop.ts`, `GameEngine.ts`, `gameLoop.test.ts`, `new-user-flow.spec.ts` |
| 11. M3 디자인/에셋 | tokens/global/layout, UI components, AssetManager, floating/particle cap | 완료 | `src/ui/styles/*`, `AssetManager.ts`, `ParticleLayer.tsx`, screenshots |
| 12. M4 업그레이드 | 5종 이상, 구매 상태, 비용/효과/레벨, 음수 방지 | 완료 | 30개 업그레이드/시설, `UpgradeManager.ts`, `UpgradePanel.tsx`, `upgrade.test.ts` |
| 13. M5 환생 | 가능 여부, 보상, 배율, 확인 모달, 세이브 일관성 | 완료 | `PrestigeManager.ts`, `PrestigePanel.tsx`, `prestige.test.ts`, `prestige-flow.spec.ts` |
| 14. M6 저장/오프라인 | checksum, Base64, migration, offline modal, export/import | 완료 | `SaveManager.ts`, `OfflineRewardManager.ts`, `migrations.ts`, E2E |
| 15. M7 설정/튜토리얼 | 설정 토글, 사운드 manager, 3단계 튜토리얼 | 완료 | `SettingsManager.ts`, WebAudio `SoundManager.ts`, `TutorialManager.ts`, E2E |
| 16. M8 수익화 | Ads/IAP provider, mock flow, 실제 결제 오해 금지 | 완료 | `AdsManager.ts`, `IAPManager.ts`, `MonetizationEventManager.ts`, `monetization-mock.spec.ts` |
| 17. M9 분석/QA/성능 | analytics mock, QA 시나리오, 성능 기준 | 완료 | `AnalyticsManager.ts`, `QA_REPORT.md`, `PERFORMANCE_QA.md`, E2E |
| 18. M10 문서화 | README, 개발, 밸런스, 세이브, QA 문서 | 완료 | 필수 문서와 release 문서 최신화 |
| 19. UI 화면 구성 | 홈/업그레이드/환생/상점/설정 | 완료 | 홈/업그레이드/환생/앨범/상점/설정, `AppShell.tsx`, screenshots |
| 20. UX 디테일 | 성공/실패 안내, 부드러운 수치/이펙트, 위험 확인, 44px 터치 | 완료 | `layout.css`, actions toast, modal confirmations, E2E |
| 21. 에러 처리 | storage/save/import/mock/BigNumber 오류 안전 처리 | 완료 | `SaveManager.ts`, `GameActions.ts`, monetization tests |
| 22. 테스트 명령어 | dev/build/test/watch scripts | 완료 | `package.json` |
| 23. 금지 사항 | hardcode 수치, setInterval loop, number-only, versionless save 등 금지 | 완료 | config/math/save/RAF 구조와 tests |
| 24. 최종 완료 조건 | build/test/user flows/docs | 완료 | `npm run build`, `npm test`, `npm run test:e2e`, docs |
| 25. 개발 우선순위 | 핵심 loop/tap/EPS/upgrade/prestige/save/offline/UI/tests/docs 우선 | 완료 | `SPEC_COVERAGE.md`, 구현 산출물 |
| 26. 최종 지시 | 마일스톤별 구현/테스트/문서/보고 | 완료 | 본 trace, coverage, QA, release 문서 |

## New RC Additions

| 추가 요구사항 | 상태 | 근거 |
| --- | --- | --- |
| 경쟁작 벤치마크 | 완료 | `COMPETITOR_BENCHMARK.md` |
| gap backlog와 P0/P1 수정 | 완료 | `PRODUCTION_GAP_BACKLOG.md`, 홈 목표/컬렉션, 업그레이드 요약, 상점 polish, RC-1 reward feel fixes |
| 최소 3회 polish pass | 완료 | `PRODUCTION_GAP_BACKLOG.md` pass log |
| release blockers 문서 | 완료 | `RELEASE_BLOCKERS.md` |
| E2E 파일명 재정렬 | 완료 | `e2e/save-import-export.spec.ts`, `offline-reward.spec.ts`, `settings-tutorial.spec.ts`, `monetization-mock.spec.ts`, `visual-regression.spec.ts` |
| RC-1 collection reward 강화 | 완료 | `CompanionBonusManager.ts`, `StoryConfig.ts`, `CollectionScreen.tsx`, `rc1Rewards.test.ts`, `rc1-product-feel.spec.ts` |
| RC-1 achievement reward 강화 | 완료 | `AchievementRewardConfig.ts`, `AchievementManager.ts`, album claim UI, unit/E2E |
| RC-1 long-term meta 강화 | 완료 | `ProgressionRewardManager.ts`, `ProgressionConfig.ts`, `MainGameScreen.tsx`, balance simulation |
| RC-1 sound feedback | 완료 | WebAudio `SoundManager.ts`, settings mute state, unit/E2E |
| RC-2 final visual asset pass | 완료 | generated portrait accessories, `app-icon-rc2.svg`, `splash-rc2.svg`, `store-screenshot-frame-rc2.svg`, emoji UI 제거 |
| RC-2 store screenshot pack | 완료 | `e2e/store-screenshot-pack.spec.ts`, `store-screenshots/` 10 PNG 후보, `STORE_SCREENSHOT_PLAN.md` |
| RC-2 audio readiness | 완료 | `AudioConfig.ts`, file-ready `SoundManager.ts`, `audio.test.ts`, `AUDIO_ASSET_PLAN.md` |
| RC-2 native/store compliance docs | 완료 | `NATIVE_BUILD_GUIDE.md`, `DEVICE_QA_CHECKLIST.md`, `ASSET_CREDITS.md`, `PRIVACY_NOTES.md`, `STORE_LISTING_DRAFT.md` |
| RC-3 playtest/balance bug bash | 완료 | `PLAYTEST_REPORT.md`, `BalanceSimulator.ts`, `balanceSimulation.test.ts`, `rc3BugBash.test.ts`, `first-five-minute-playtest.spec.ts` |
| RC-3 store screenshot polish | 완료 | album crop, prestige multiplier formatting, save screenshot copy 수정, `store-screenshots/` 10장 재생성 |

## Trace Gate

매핑되지 않은 원본 요구사항 없음. 현재 P0/P1 `미완료`, `부분 완료`, `검증 불가` 항목 없음.
