# Expanded Completion Audit

기준일: 2026-05-05

## Objective Restatement

현재 목표는 단순 작동 앱이 아니라 경쟁작 옆에 놓아도 빈약해 보이지 않는 모바일 idle game RC로 확장하는 것이다. 의미 없는 filler 없이 실제 콘텐츠, 스토리, 디자인, 손맛, 밸런스 시뮬레이션, 테스트, source budget 측정을 추가해야 한다.

## Prompt-to-Artifact Checklist

| 요구사항 | 상태 | 증거 |
| --- | --- | --- |
| filler 금지 | 완료 | 기능/자산/테스트가 UI와 검증에 연결됨. `SOURCE_BUDGET_REPORT.md`에 측정 근거 기록 |
| 업그레이드/시설 30종 이상 | 완료 | `BalanceConfig.ts`, `contentConfig.test.ts` |
| 각 업그레이드 고유 이름/설명/비용/효과/unlock/UI copy | 완료 | `BalanceConfig.ts`, `contentConfig.test.ts` |
| unlock tier와 초중후반 단계 | 완료 | `ProgressionConfig.ts`, tier field in `BalanceConfig.ts` |
| 성장 구간 5개 이상 | 완료 | `ProgressionConfig.ts` |
| 구간별 배경/시설/unlock 메시지/목표 | 완료 | `ProgressionConfig.ts`, `MainGameScreen.tsx`, `layout.css` |
| 퀘스트/업적/컬렉션 40개 이상 | 완료 | `QuestConfig.ts`, `AchievementConfig.ts`, `DecorationConfig.ts`, album screen |
| config 기반 콘텐츠와 테스트 검증 | 완료 | `contentConfig.test.ts` |
| `STORY_BIBLE.md` | 완료 | `STORY_BIBLE.md` |
| 세계관 요약/집사 설정 | 완료 | `STORY_BIBLE.md`, `StoryConfig.ts` |
| 카피바라 8마리 | 완료 | `StoryConfig.ts`, `STORY_BIBLE.md`, 고유 passive ability |
| 성장 구간/환생/튜토리얼/오프라인/업그레이드/업적 대사 | 완료 | `StoryConfig.ts`, `AchievementConfig.ts`, `BalanceConfig.ts`, `AppShell.tsx` |
| 홈/업그레이드/환생/상점/설정/튜토리얼/오프라인 polish | 완료 | 6탭 모바일 UI, album/quest/decor screen, visual assets, screenshots |
| achievement/collection 화면 | 완료 | `CollectionScreen.tsx`, quest board, companions, abilities, decorations, reward claim badge board |
| 성장 구간별 background visual | 완료 | tier CSS variables/classes in `layout.css` |
| mascot visual 5상태 | 완료 | `mascot-default/happy/sleepy/eating/celebrate`, `VisualAssetIcon` |
| 귤/황금 나뭇잎/시설 icon set | 완료 | 직접 제작 SVG 245개, `scripts/generateVisualAssets.mjs`, `src/assets/generated`, `VisualAssetIcon.tsx` |
| app icon/splash 초안 | 완료 | `app-icon-rc2.svg`, `splash-rc2.svg`, `store-screenshot-frame-rc2.svg` |
| 터치 feedback/숫자/구매/환생/offline/unlock/achievement effects | 완료 | touch transform, floating text, particles, toast, WebAudio, quest/achievement/decoration feedback |
| effect cap와 설정 반영 | 완료 | `AppShell.tsx`, `ParticleLayer`, settings |
| `BALANCE_SIMULATION.md` | 완료 | `BALANCE_SIMULATION.md` |
| 자동 시뮬레이션 | 완료 | `BalanceSimulator.ts`, `balanceSimulation.test.ts` |
| 1분/5분/30분/2시간/첫 환생/환생 후 30분/ad/offline 검증 | 완료 | `balanceSimulation.test.ts`, `BALANCE_SIMULATION.md` |
| 콘텐츠 config 유효성 테스트 | 완료 | `contentConfig.test.ts` |
| 중복 id/name 테스트 | 완료 | `contentConfig.test.ts` |
| unlock 조건 테스트 | 완료 | `contentConfig.test.ts` |
| 모든 업그레이드 구매 가능성 테스트 | 완료 | `contentConfig.test.ts` |
| 모든 achievement 조건 테스트 | 완료 | `contentConfig.test.ts` |
| save/load 후 콘텐츠 상태 유지 | 완료 | `contentConfig.test.ts`, `save.test.ts` |
| debug 없는 신규 유저 E2E | 완료 | `new-user-flow.spec.ts` |
| debug 기반 장기 성장 QA E2E | 완료 | `debug-cheat-flow.spec.ts` |
| 모바일 screenshot QA | 완료 | `visual-regression.spec.ts`, `qa-screenshots/`, `store-screenshot-pack.spec.ts`, `store-screenshots/` |
| `SOURCE_BUDGET_REPORT.md` | 완료 | generated/config/docs 제외 기준으로 재감사 |
| handwritten runtime 구현 규모 | 완료 | 6,374 LOC |
| handwritten tests/E2E 규모 | 완료 | 2,186 LOC |
| generated/config LOC 분리 | 완료 | generated SVG/registry 11,076 LOC, generated tests 5,718 LOC, config 2,529 LOC |
| 스토리/콘텐츠가 실제 UI와 연결 | 완료 | 홈, 튜토리얼, offline modal, achievement collection/toast, upgrade unlock copy |

## Command Evidence

```txt
npm run build: passed
npm test: 20 files / 469 tests passed
npm run test:e2e: 21 passed
npm run cap:sync: passed
```

## Final Audit Decision

내부 production release candidate 목표는 완료로 판단한다. P0/P1 미완료, 검증 불가, 문서 불일치, 모바일 주요 화면 깨짐, 저장/환생/오프라인 보상 blocking issue는 남아 있지 않다. 실제 App Store / Google Play 제출 완료는 아니며, 개발자 계정, signing, 실제 SDK, final art, 물리 기기 QA는 사용자 제공 후 별도 진행해야 한다.
