# Playtest Report

기준일: 2026-05-07

목표: RC-2 main 상태에서 실제 유저가 30분 이상 플레이할 때 진행, 보상, 저장, 오프라인, 환생, 성능 리스크가 없는지 확인하고 P0/P1 gap을 줄인다.

## Simulation Model

- 구현: `src/systems/BalanceSimulator.ts`
- 검증: `src/tests/balanceSimulation.test.ts`
- 입력: 1.2 taps/sec, 15초 tick
- 구매 cadence: tick당 최대 4회 구매
- 자동 처리: 실제 유저가 수령할 보상에 해당하는 퀘스트/업적 claim, 해금 장식 배치
- 금지: DebugManager shortcut 미사용

## Checkpoints

| 구간 | 귤 | 누적 귤 | EPS | 터치 | 구매/해금 | 보상/앨범 | 다음 목표 |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| 1분 | 12.4K | 12.9K | 1 | 11 | 16레벨, 10개 해금 | 퀘스트 9, 업적 8, 장식 3 배치 | 말랑 앞발 구매 가능 |
| 5분 | 174K | 195K | 29 | 79 | 80레벨, 16개 해금 | 퀘스트 15, 업적 14, 장식 4 배치 | 낮잠 평상 구매 가능 |
| 15분 | 13.4M | 14.8M | 630 | 723 | 239레벨, 24개 해금 | 퀘스트 23, 업적 23, 장식 6 배치 | 귤 분류대 구매 가능 |
| 30분 | 74.9K | 22.6M | 9.4K | 3.76K | 403레벨, 24개 해금 | 퀘스트 30, 업적 25, 장식 6 배치 | 귤 스푼 목표까지 241K |
| 2시간 | 14.5M | 2.15B | 2.9M | 58.5K | 798레벨, 24개 해금 | 퀘스트 38, 업적 29, 장식 8 배치 | 환생 가능, 황금 나뭇잎 10개 |

## First Prestige

- 첫 환생 가능: 33분 0초
- 당시 상태: 누적 47.8M 귤, EPS 10.6K, 터치 3.92K, 황금 나뭇잎 1개
- 환생 후 30분: 누적 93M 귤, EPS 20.5K, 황금 나뭇잎 2개 예상

판정: 첫 환생이 5분대까지 당겨지던 기존 시뮬레이션은 “모든 구매를 즉시 반복 구매하는 봇 플레이”였다. RC-3에서 tick당 구매 cadence를 제한하고 prestige requirement를 25M으로 상향해 30-60분 목표권에 들어왔다.

## Manual-Style E2E

새 파일: `e2e/first-five-minute-playtest.spec.ts`

검증:
- 신규 유저 탭/퀘스트/업적 claim
- 말랑 앞발, 귤 바구니 구매
- 앞발 도장길 장식 배치
- 모모 companion bonus 표시
- visibility hidden/visible 이벤트 후 홈 조작 지속
- 강제 저장 후 reload 유지
- 5분권 seed return session의 오프라인 보상 1회 claim
- Debug panel 부재

## Bug Bash Result

새 파일: `src/tests/rc3BugBash.test.ts`

검증:
- v1/v2/v3 save migration
- corrupted import / checksum mismatch
- double-click purchase 음수 방지
- rapid tapping 150회
- offline reward duplicate claim 방지
- quest/achievement reward duplicate claim 방지
- prestige 후 save/load
- sound/music mute persistence
- long number formatting
- hidden tab RAF behavior는 `src/tests/gameLoop.test.ts`에 추가

## Balance Decision

- `GameConfig.prestige.requirement`: `1,000,000` -> `25,000,000`
- DebugManager의 `makePrestigeReady`는 하드코딩된 1M 대신 config requirement를 사용한다.
- 첫 5분은 upgrade/quest/album/decoration/companion 중 2개 이상이 아니라 5개 이상을 경험한다.
- 30분까지 다음 목표가 끊기지 않고, 33분에 첫 prestige가 열린다.

## RC-6 Product Feel Recheck

기준일: 2026-05-06

RC-6은 밸런스 대폭 리셋 없이 조작감과 반복 구매 편의를 강화했다. `BalanceSimulator.ts`에는 첫 10초와 D1/D3/D7 retention checkpoint가 추가됐고, quick-buy 자체는 실제 유저 편의 기능으로 추가하되 자동 시뮬레이션의 기존 구매 cadence는 유지했다.

| 구간 | 귤 | 누적 귤 | EPS | 터치 | 구매/해금 | 보상/앨범 | 다음 목표 |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| 첫 10초 | 3.08K | 3.15K | 0 | 5 | 4레벨, 7개 해금 | 퀘스트 6, 업적 5, 장식/동료 루프 노출 | 귤 바구니 구매 가능 |
| 첫 1분 | 12.4K | 12.9K | 1 | 11 | 16레벨, 10개 해금 | 퀘스트 9, 업적 8 | 말랑 앞발 구매 가능 |
| 첫 5분 | 174K | 195K | 29 | 79 | 80레벨, 16개 해금 | 퀘스트 15, 업적 14, 장식 4 배치 | 낮잠 평상 구매 가능 |
| 첫 15분 | 13.4M | 14.8M | 630 | 723 | 239레벨, 24개 해금 | 퀘스트 23, 업적 23 | 귤 분류대 구매 가능 |
| 첫 30분 | 74.9K | 22.6M | 9.4K | 3.76K | 403레벨, 24개 해금 | 퀘스트 30, 업적 25 | 귤 스푼 목표까지 241K |
| 첫 환생 | - | 47.8M | 10.6K | 3.92K | 환생 가능 | 황금 나뭇잎 1개 | 새 계절 시작 |
| 환생 후 30분 | - | 93M | 20.5K | - | 재성장 | 황금 나뭇잎 2개 예상 | 다음 환생 준비 |

Retention assumption checkpoint:

| 구간 | 누적 귤 | EPS | 구매 레벨 | 보상 진행 | 환생 예상 |
| --- | ---: | ---: | ---: | --- | ---: |
| 1일차 복귀 | 935B | 99.8M | 1,152 | 퀘스트 39, 업적 보상 30 | 212 |
| 3일차 목표 | 634T | 6.56B | 2,189 | 퀘스트 39, 업적 보상 30 | 5.54K |
| 7일차 목표 | 3.79Qa | 11.1B | 2,388 | 퀘스트 39, 업적 보상 30 | 13.5K |

RC-6 implemented feel changes:

- Upgrade quick-buy mode: `1개`, `10개`, `최대`.
- Touch floating text position/size/color variation with the existing cap.
- Purchase success level chip, short shelf pulse, failure shake/toast.
- Offline reward staged reveal with basket/chest cue.
- Prestige result panel showing gained leaves, total leaves, new multiplier, next goal.
- Album/quest/achievement claim reveal banner.
- Sound and haptic hooks for tap/purchase/fail/claim/offline/prestige, respecting mute and vibration settings.

## RC-7 Retention Systems Recheck

기준일: 2026-05-07

RC-7은 RC-6에서 문서화만 했던 장기 복귀 보상을 실제 시스템으로 추가했다. Save schema는 version 5로 상승했고, 기존 save migration과 corrupted retention state 복구 테스트를 추가했다.

구현된 리텐션 루프:

- Daily reward: 20시간 cooldown, 48시간 초과 시 streak reset, 1~7일 루프, Day 3/7 황금 나뭇잎 포함.
- D1/D3/D7 milestone: `정원 복귀자`, `꾸준한 집사`, `황금 숲 단골` 배지와 중복 claim 방지.
- Post-prestige goal chain: 첫 환생 완료 이후 5단계 목표를 홈과 환생 result panel에 노출.
- UI: 홈 retention panel, 앨범 복귀 배지 ledger, debug-only retention helpers.

Balance simulator는 이제 장기 checkpoint에서 daily/milestone/post-prestige goal claim도 자동 처리한다. `balanceSimulation.test.ts`는 D1/D3/D7 checkpoint가 계속 생성되고 업그레이드/환생 progression이 깨지지 않는지 검증한다. 보상은 EPS-minute 기반과 최소 보장값을 함께 사용해 초반에는 체감되고 장기에는 경제를 압도하지 않도록 제한했다.

RC-7 E2E 확인:

- 신규 유저 홈에서 retention panel이 깨지지 않음.
- seeded D1 daily reward claim 후 reload 시 cooldown 유지.
- seeded D3/D7 milestone claim 후 reload 시 받은 상태 유지.
- 첫 환생 후 result panel과 홈에서 post-prestige goal chain 표시.
- debug retention helpers는 `?debug=1` 전용 spec에서만 검증.

Remaining playtest risks are P2/P3 only: server-verified calendar/push notification, deeper companion room free-placement, longer offline numeric count-up, real audio files, and physical-device retention/thermal checks.

## RC-8 Release Candidate Bug Bash Recheck

기준일: 2026-05-07

RC-8은 새 성장 콘텐츠를 늘리지 않고 제출 전 회귀 가능성이 큰 save/retention/offline/prestige/quick-buy/WebView/bundle 영역을 다시 검증했다.

추가 자동 검증:

- v1/v2/v3/v4 save를 현재 v5 retention state로 migration.
- corrupted v5 retention fields safe recovery.
- D1 daily reward와 2시간 offline reward가 같은 복귀 세션에서 동시에 처리되어도 중복 지급/충돌 없음.
- daily reward, D7 milestone, post-prestige goal claim이 export/import/reload 후 중복 지급되지 않음.
- quick-buy max safety cap과 0회 disabled 상태 확인.
- 2시간 long-session simulation, 8시간 offline cap, rapid tap 500회, quick-buy 반복, save/load 20회, RAF visibility listener cleanup.
- Playwright normal flow에서 daily+offline same session, first prestige goal claim/reload, quick-buy max save/reload, 360px save modal bounds, repeated tab switching 검증.

판정: 내부 P0/P1 playtest/regression blocker는 없다. 실제 저사양 Android/iPhone thermal/FPS, WebView storage persistence, notification/re-engagement는 물리 기기와 플랫폼 계정 준비 후 별도 확인한다.
