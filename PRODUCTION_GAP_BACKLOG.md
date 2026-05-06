# Production Gap Backlog

기준일: 2026-05-06

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
| 이모지/placeholder UI 잔존 | 스토어 후보에서 개발 중 화면처럼 보일 수 있음 | currency/product/offline 표시를 직접 제작 asset 기반으로 교체, visible emoji 제거 | 해결 |
| 어설픈 CSS override 누적 위험 | 화면이 부분별로 덧칠된 대학생 PPT/양산형 앱처럼 보일 수 있음 | 첫 raster pass 실패 후 `layout.css`를 wood/parchment/orange game HUD skin으로 재정리, runtime visual banned-pattern audit, 253개 SVG auxiliary pack과 15개 raster core/release art pack 연결 | 해결 |
| asset pack이 파일 수만 많고 실제 게임용인지 불명확 | 학생/교사가 보는 첫 화면에서 캐릭터성, 보상감, 구간 진행감이 약할 수 있음 | `ART_FAILURE_REVIEW.md`, `ASSET_PRODUCTION_BRIEF.md`, `visualAssetIntegrity.test.ts`, `rasterAssetIntegrity.test.ts`, visual/store screenshots로 검증 | 해결 |
| 화면 단위 final key visual 부족 | 홈/환생/상점/오프라인 보상이 기능 패널처럼 보여 앱스토어 제출 후보 인상이 약함 | v2 `main-hero-background.png`, `prestige-ritual.png`, `shop-reward-banner.png`, `offline-reward.png` 직접 제작/연결, 52 QA screenshots 재생성 | 해결 |
| store screenshot final art 결합 부족 | 홍보 이미지가 단순 앱 캡처처럼 보여 설치 유도력이 약함 | raster `store-key-visual.png`를 Playwright store composition에 연결하고 iPhone/Android 후보 10장 재생성 | 해결 |
| 8마리 portrait 구분력 부족 | 앨범에서 색만 다른 카드처럼 보일 수 있음 | portrait generator에 캐릭터별 소품 추가 | 해결 |
| 스토어 screenshot 부재 | QA screenshot만으로는 제출 후보 presentation을 판단하기 어려움 | iPhone/Android store screenshot pack 10장 생성 | 해결 |
| audio 파일 교체 경로 부재 | WebAudio tone에서 실제 음원으로 넘어갈 연결 지점이 없음 | `AudioConfig.ts` 슬롯과 `fileSrc` pipeline 추가 | 해결 |
| 첫 환생이 너무 빠르게 열릴 위험 | 초반 보상을 적극 수령하면 환생이 5분권으로 당겨져 30분 플레이 목표가 무너짐 | 구매 cadence simulation과 prestige requirement `25M` 조정, 첫 환생 33분 기록 | 해결 |
| 실제 5분권 유저 플로우 검증 부족 | 단위 테스트만으로 보상/저장/장식/동료 루프의 실제 사용성을 판단하기 어려움 | `first-five-minute-playtest.spec.ts` 추가, debug 없이 reward/save/deco/companion/offline 검증 | 해결 |
| store 후보 이미지 세부 polish 부족 | album crop, prestige `e0` 표기, save copy 길이가 제출 후보 인상을 낮춤 | store screenshot spec과 `PrestigePanel` formatting 보정 후 10장 재생성/검수 | 해결 |
| 설정/세이브 control이 웹앱처럼 보일 위험 | 브라우저 checkbox, util textarea, toast overlap이 game HUD skin을 깨뜨릴 수 있음 | RC-4에서 custom settings switch, export code copy action, ledger textarea, carved toast/modal/disabled controls로 보강 | 해결 |

## P2

| Gap | 남은 이유 | 제출 전 필요 작업 |
| --- | --- | --- |
| Cats & Soup 수준의 visual warmth | 현재는 v2 generated raster core art와 직접 제작 SVG auxiliary pack이며 bespoke hand-drawn animation은 아님 | commissioned/final art ownership and legal approval, richer idle animation, physical device store screenshot art direction |
| Collection motivation의 깊이 | RC-1에서 능력/보상은 생겼지만 방 꾸미기 자유도와 staged reveal은 제한적 | album reward chest, room layout expansion, set collection animation |
| Reward feel의 연출 깊이 | claim 보상은 실제 지급되지만 chest/opening animation은 없음 | milestone chest, staged reveal, stronger haptics/audio mix |
| Long-term goal depth | 첫 환생 전후 목표는 보이지만 시즌/도감 완성/시설 배치 메타는 없음 | season collection, decoration set bonus, late-game narrative milestones |
| 실제 파일 기반 사운드/BGM | 파일 교체 pipeline은 있으나 라이선스 확정 음원이 없음 | 효과음/BGM 파일과 라이선스 기록 |
| 실제 광고/IAP SDK | provider와 계정/상품 ID 미제공 | AdMob/AppLovin 등 광고 SDK, App Store/Play Billing 상품 연결 |
| 실제 기기 성능 QA | 물리 기기 접근/제출 계정 없음 | iPhone/Android physical QA, thermal/background/offline 확인 |

## P3

- 라이브 이벤트/시즌 운영
- A/B balance tuning
- localization 확장
- accessibility 고도화
- cloud sync

## Current Gate

재감사, reward hardening, playtest/balance/bug bash, direct art/CSS pass, 첫 raster pass 실패 재분류, v2 raster/HUD art pass, RC-4 Game UI Skin & Interaction Polish 중 발견한 내부 P1은 코드/CSS/테스트/E2E로 수정했다. 남은 항목은 commissioned/final art ownership, 실제 SDK, 물리 기기 QA, 더 깊은 수집 연출처럼 외부 준비나 추가 제품 확장에 가깝다. 현재 감사 기준에서 내부 P0/P1 release blocker는 없다.
