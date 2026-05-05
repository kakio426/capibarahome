# Release Blockers

기준일: 2026-05-05

## Internal RC Blockers

| 항목 | 상태 | 근거 |
| --- | --- | --- |
| TypeScript/build 실패 | 없음 | `npm run build` 통과 |
| unit/simulation test 실패 | 없음 | `npm test` 21 files / 479 tests passed |
| E2E 실패 | 없음 | `npm run test:e2e` 21 passed |
| 실제 유저 플로우 debug 의존 | 없음 | debug는 `e2e/debug-cheat-flow.spec.ts`에 격리 |
| 모바일 overflow/주요 화면 깨짐 | 없음 | `visual-regression.spec.ts` screenshot/overflow 검증 통과 |
| 저장/환생/오프라인 보상 blocking issue | 없음 | unit + E2E coverage |
| 문서 불일치 | 없음 | source budget 재감사 기준으로 `SPEC_COVERAGE.md`, `QA_REPORT.md`, `VISUAL_QA.md`, `RELEASE_CHECKLIST.md` 갱신 |
| content inflation P1 | 없음 | `CONTENT_INTEGRATION_AUDIT.md`, 누락 decoration hero visual 11개 수정 |
| visual defect P1 | 없음 | `VISUAL_DEFECTS.md`, save modal/tab/toast 수정 |
| RC-1 reward feel P1 | 없음 | companion passive, achievement claim reward, long-term goal, WebAudio mute, RC-1 tests/E2E 추가 |
| direct art/CSS readiness P1 | 없음 | 첫 raster pass 실패 기록 후 v2 HUD/raster pass 적용, `layout.css` 통합 정리, 253 SVG auxiliary files, 15 raster PNG core/release assets, `visualAssetIntegrity.test.ts`, `rasterAssetIntegrity.test.ts`, art direction docs |
| RC-3 playtest/balance/bug bash P1 | 없음 | 첫 환생 33분, 실제 5분권 E2E, migration/corrupt import/rapid tap/reward duplicate tests, store screenshot 재감사 |

## Source Budget Audit Gate

| 항목 | 판정 | 근거 |
| --- | --- | --- |
| generated/config/docs 제외 구현량 | 기록 완료 | runtime 6,721 LOC, handwritten tests/E2E 2,285 LOC |
| 이전 대형 `src` LOC 주장 | 완료 근거로 사용 금지 | generated SVG/registry 11,533 LOC와 generated tests 5,846 LOC는 별도 분리 |
| 콘텐츠 실제 연결성 | 통과 | 30 upgrades/facilities, 50 quests, 40 achievements with claim rewards, 25 decorations, 8 capybaras with passive abilities, 5 tiers 항목별 감사 |

## External Store Submission Blockers

아래는 실제 App Store / Google Play 제출 전 사용자가 제공해야 하는 항목이다. 현재 프로젝트의 내부 P0/P1은 아니지만, 실제 제출 완료를 막는 외부 blocker다.

- Apple Developer Program 계정
- Google Play Console 계정
- Bundle ID / package name 최종 확정
- iOS signing certificate / provisioning profile
- Android signing key
- commissioned/final art ownership and legal approval
- platform-exported app icon / splash / final store screenshot selection. 현재 raster app icon candidate, raster store key visual, store 후보 pack은 있음
- privacy policy URL
- support URL
- age rating answers
- export compliance answers
- 실제 광고 SDK 선택 및 privacy disclosure
- 실제 IAP product IDs, pricing, store metadata
- 물리 iPhone/Android 기기 QA

## Decision

현재 감사 기준에서 내부 P0/P1 release blocker는 없다. 실제 스토어 제출 완료로 주장하지 않으며, commissioned/final art ownership, real audio files, SDK, signing, platform icon/splash export, 물리 기기 QA는 P1 external readiness blocker로 남긴다.
