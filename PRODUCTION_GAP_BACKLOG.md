# Production Gap Backlog

기준일: 2026-05-05

우선순위 기준:
- P0: release candidate 판정을 막는 blocking issue
- P1: 경쟁작 대비 즉시 허술해 보이는 핵심 제품 품질 issue
- P2: 실제 스토어 출시 전에는 필요하지만 현재 계정/에셋/SDK가 없어 남기는 issue
- P3: 출시 후 확장/라이브 운영 issue

## P0

| Gap | 상태 | 조치/근거 |
| --- | --- | --- |
| 원본 0-26 요구사항 누락 가능성 | 해결 | `REQUIREMENTS_TRACE.md`, `SPEC_COVERAGE.md` |
| 실제 유저 E2E가 debug shortcut에 의존 | 해결 | debug는 `e2e/debug-cheat-flow.spec.ts`에서만 사용 |
| 저장/로드/오프라인/환생 blocking bug | 해결 | unit + E2E coverage |
| 모바일 주요 화면 overflow | 해결 | `visual-regression.spec.ts` overflow assertion |
| 완료 선언의 LOC/config inflation 위험 | 해결 | `SOURCE_BUDGET_REPORT.md`, `CONTENT_INTEGRATION_AUDIT.md` 재감사 |

## P1

| Gap | 경쟁작 대비 문제 | 조치 | 상태 |
| --- | --- | --- | --- |
| 저장 모달 긴 코드 표시 | 모바일에서 내보내기 코드가 잘린 것처럼 보여 실제 복구 사용성이 낮음 | save textarea 전용 scroll/monospace/크기 적용 | 해결 |
| 하단 탭 라벨 파손 | 360px에서 `업그레이드`가 줄바꿈되어 개발자 UI 느낌 | visible label `성장`, aria-label `업그레이드` 유지 | 해결 |
| toast가 카드 내용 가림 | reward toast가 상점 상품 설명과 버튼을 덮어 구매/보상 UX 저하 | compact toast + 2.4초 auto dismiss | 해결 |
| 장식 content inflation | 장식 25개 중 11개가 장착 후 홈 hero visual 변화 없음 | 누락 class 11개 hero CSS 추가 | 해결 |
| 첫 화면 장기 목표 부족 | Cats & Soup/Egg, Inc.처럼 다음 행동과 보상감이 첫 화면에서 약함 | 홈에 today quest, next goal, collection shelf, prestige mini progress 추가 | 해결 |
| 업그레이드 화면이 기능 목록처럼 보임 | AdVenture Capitalist식 빠른 구매 판단 계층 부족 | 구매 가능 summary, ready chip, tap/EPS 지표, 효과 meta 추가 | 해결 |
| 상점이 mock/dev 느낌 | 실제 서비스 화면처럼 보이지 않고 테스트 문구가 강함 | reward chip, boost status, sandbox copy로 정리 | 해결 |
| 콘텐츠 config-only 위험 | 수량만 늘고 UI/저장/게임 효과가 약할 수 있음 | `CONTENT_INTEGRATION_AUDIT.md`에서 항목별 UI/save/test/impact 확인 | 해결 |
| Collection reward/장기 메타 부족 | 친구/업적이 단순 앨범처럼 보여 장기 동기가 약함 | 8명 passive ability, 친밀도 보너스, 홈 장기 목표, 구간 unlock toast 추가 | 해결 |
| 업적 보상감 약함 | 업적이 단순 체크리스트처럼 보여 수령 손맛이 약함 | 40개 업적 claim reward, 보상 버튼, toast, 영구 multiplier/친밀도/장식 보상 추가 | 해결 |
| 실제 사운드 피드백 없음 | tap/purchase/reward가 조용해 게임 반응감이 약함 | WebAudio lightweight 효과음과 mute 연결 | 해결 |
| 카피바라 능력치 부재 | 8마리 캐릭터가 기능적으로 구분되지 않음 | 각 캐릭터별 passive ability와 앨범 표시, 수식 반영 | 해결 |

## P2

| Gap | 남은 이유 | 제출 전 필요 작업 |
| --- | --- | --- |
| Cats & Soup 수준의 visual warmth | 현재는 CSS/generated SVG RC asset이며 bespoke hand-drawn animation은 아님 | final character bitmap, richer idle animation, store screenshot art direction |
| Collection motivation의 깊이 | RC-1에서 능력/보상은 생겼지만 방 꾸미기 자유도와 staged reveal은 제한적 | album reward chest, room layout expansion, set collection animation |
| Reward feel의 연출 깊이 | claim 보상은 실제 지급되지만 chest/opening animation은 없음 | milestone chest, staged reveal, stronger haptics/audio mix |
| Long-term goal depth | 첫 환생 전후 목표는 보이지만 시즌/도감 완성/시설 배치 메타는 없음 | season collection, decoration set bonus, late-game narrative milestones |
| 실제 파일 기반 사운드/BGM | WebAudio 효과음은 있으나 라이선스 확정 음원이 없음 | 효과음/BGM 파일과 라이선스 기록 |
| 실제 광고/IAP SDK | provider와 계정/상품 ID 미제공 | AdMob/AppLovin 등 광고 SDK, App Store/Play Billing 상품 연결 |
| 실제 기기 성능 QA | 물리 기기 접근/제출 계정 없음 | iPhone/Android physical QA, thermal/background/offline 확인 |

## P3

- 라이브 이벤트/시즌 운영
- A/B balance tuning
- localization 확장
- accessibility 고도화
- cloud sync

## Current Gate

재감사와 RC-1 hardening 중 발견한 내부 P1은 코드/CSS/테스트/E2E로 수정했다. 남은 항목은 final art, 실제 SDK, 물리 기기 QA, 더 깊은 수집 연출처럼 외부 준비나 추가 제품 확장에 가까운 P2/P3이다. 현재 감사 기준에서 P0/P1 release blocker는 없다.
