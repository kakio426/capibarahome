# Competitor Benchmark

기준일: 2026-05-04

범위는 구조적 품질 기준 비교다. 경쟁작의 에셋, 문구, UI를 복제하지 않고, 모바일 idle/clicker release candidate가 갖춰야 할 품질 기준만 추출했다.

## Sources

- Cats & Soup: Google Play `https://play.google.com/store/apps/details?id=com.hidea.cat&hl=en_US`, App Store `https://apps.apple.com/us/app/cats-soup-relaxing-cozy-games/id1581431235`
- Egg, Inc.: Google Play `https://play.google.com/store/apps/details?id=com.auxbrain.egginc&hl=en_US`, App Store `https://apps.apple.com/us/app/egg-inc/id993492744`
- AdVenture Capitalist: Hyper Hippo official page `https://hyperhippo.com/games/adventure-capitalist/`, Google Play `https://play.google.com/store/apps/details?id=com.kongregate.mobile.adventurecapitalist.google&hl=en_US`
- Cookie Clicker: official web `https://orteil.dashnet.org/cookieclicker/`, Steam `https://store.steampowered.com/app/1454400/Cookie_Clicker/`

## Comparison Matrix

| 항목 | 경쟁작에서 확인한 기준 | 카피바라 집사기 상태 | 판정 |
| --- | --- | --- | --- |
| 첫 화면 인상 | Cats & Soup은 캐릭터/시설 분위기가 즉시 보이고, Egg, Inc.는 농장 시뮬레이션 장면이 핵심 루프를 설명한다. | 큰 카피바라 터치 영역, 재화, EPS, 다음 목표, 정원 컬렉션을 첫 화면에 배치했다. | P1 해결 |
| 핵심 터치/idle 루프 손맛 | Cookie Clicker와 AdVenture Capitalist는 클릭/진행바/구매 반응이 명확하다. | 터치 즉시 귤 지급, floating text, particle cap, RAF EPS 루프가 있다. | 완료 |
| 숫자 성장 가독성 | Cookie Clicker류는 큰 숫자와 축약 표기가 핵심이다. | BigNumberLite와 short/scientific 포맷을 제공한다. | 완료 |
| 업그레이드 UI | AdVenture Capitalist/Egg, Inc.는 구매 가능성, 수익 영향, 다음 투자 판단이 빠르게 보인다. | 업그레이드 요약, 구매 가능 chip, 현재 터치/EPS, 효과 meta를 추가했다. | P1 해결 |
| 장기 목표/환생 구조 | Egg, Inc.는 prestige가 장기 루프의 중심이며 Cookie Clicker도 legacy/perma-upgrade가 강하다. | 환생 진행률, 예상 황금 나뭇잎, 영구 배율과 홈 mini progress가 있다. | 완료 |
| 오프라인 보상 UX | 모바일 idle 게임은 복귀 즉시 보상 확인이 중요하다. | 복귀 시 오프라인 보상 모달, cap/efficiency, 중복 지급 방지 테스트가 있다. | 완료 |
| 수집/꾸미기/보상감 | Cats & Soup은 캐릭터/복장/시설/미니룸 보상감이 강하다. | 정원 컬렉션 badge를 추가해 초반 보상감을 보강했다. 실제 꾸미기는 P2로 남김. | P1 해결, P2 잔여 |
| 상점/광고/IAP 구조 | Cats & Soup/Egg, Inc.는 ads/IAP가 있지만 실제 결제/광고로 명확히 분리된다. | mock provider, 샌드박스 수령, 출시 준비 문구, reward chip을 적용했다. | P1 해결 |
| 모바일 레이아웃 polish | 스토어급 게임은 작은 폭에서 탭/카드/모달이 안정적이어야 한다. | 360/390/430/desktop screenshot E2E와 overflow check가 있다. | 완료 |
| 튜토리얼/온보딩 | 핵심 행동을 짧게 안내하고 UI를 가려서는 안 된다. | 3단계 튜토리얼, target highlight, 재시작 설정, E2E가 있다. | 완료 |
| 저장/복구 신뢰성 | Cookie Clicker Steam은 cloud save 같은 신뢰성을 강조한다. 웹 RC는 최소한 로컬 저장/복구가 견고해야 한다. | checksum, migration, export/import, 손상 데이터 안전 실패를 구현했다. | 완료 |
| 성능/애니메이션 안정성 | 모바일 idle 게임은 장시간 켜둬도 loop/listener가 누수되면 안 된다. | RAF, delta clamp, hidden 처리, effect cap, cleanup이 있다. | 완료 |
| 앱스토어 제출 준비도 | 경쟁작은 실제 계정/SDK/스토어 메타/기기 QA가 끝난 상태다. | Capacitor prep과 listing/privacy/checklist는 있으나 실제 계정/SDK/기기 QA는 사용자 작업이다. | P2 잔여 |

## Product Direction

- 차별점: “카피바라 집사 + 귤 정원”을 가볍고 따뜻한 모바일 idle 루프로 압축한다.
- RC 기준: 첫 화면에서 탭, 수익, 다음 목표, 수집 보상이 동시에 보인다.
- 복제 금지: 경쟁작의 캐릭터, 시설, 문구, monetization placement는 가져오지 않는다.
- 남은 확장 방향: 실제 bitmap asset, 사운드, 꾸미기 room, cloud sync, 실제 SDK 연결은 release 이후 단계로 분리한다.

