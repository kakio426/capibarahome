# Content Integration Audit

기준일: 2026-05-05

이 문서는 완료 선언을 믿지 않고 config 항목이 실제 UI, unlock, save/load, test, 플레이 영향에 연결됐는지 재검증한 결과다. generated SVG와 generated matrix test는 존재 근거로는 인정하지만, 순수 구현 규모 산정에는 제외한다.

## Summary

| Category | Config count | Actually connected | Content inflation 판정 | Notes |
| --- | ---: | ---: | --- | --- |
| 업그레이드/시설 | 30 | 30 | 없음 | 구매/비용/수익 수식에 직접 연결 |
| 퀘스트 | 50 | 50 | 없음 | 보상 수령, 친밀도, 장식 unlock에 연결 |
| 업적 | 40 | 40 | 없음 | claim reward, toast, 영구 multiplier, 친밀도/장식 보상에 연결 |
| 장식 | 25 | 25 | 수정 후 없음 | 감사 중 CSS 미연결 11개를 홈 장면 효과로 보강 |
| 카피바라 | 8 | 8 | 없음 | friendship/story collection과 고유 passive ability가 실제 수식에 연결 |
| 성장 구간 | 5 | 5 | 없음 | unlock gate, hero tone, next goal에 연결 |

## Content Inflation Findings

- 장식 25개 중 11개는 감사 시작 시 장착 UI와 저장은 있었지만 홈 장면 전용 CSS가 없어 카드 컬렉션 이상의 체감이 약했다. 이번 감사에서 `decor-sunny-yard`, `decor-basket-corner`, `decor-nap-mat`, `decor-crate-lane`, `decor-cart-stop`, `decor-towel-rack`, `decor-snack-counter`, `decor-wind-chime`, `decor-leaf-plaque`, `decor-leaf-path`, `decor-compost-greenhouse`의 hero visual을 추가했다.
- 업적 40개는 RC-1에서 claim reward가 추가되어 귤/황금잎/친밀도/장식/영구 multiplier가 실제 state에 반영된다. 남은 개선 후보는 staged chest reveal과 연출 깊이다.
- 카피바라 8마리는 RC-1에서 개별 passive ability가 추가되어 터치/EPS/오프라인/퀘스트/업적/장식/환생 수식에 반영된다. 남은 개선 후보는 방 꾸미기 자유도와 character animation이다.


## Upgrades And Facilities

| Item | Config | UI exposure | Unlock condition | Save/load | Test evidence | Actual gameplay impact | Audit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| soft_paw / 말랑 앞발 | yes | UpgradePanel + home next-goal | none | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| butler_gloves / 집사 장갑 | yes | UpgradePanel + home next-goal | lifetimeOranges:100 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| orange_spoon / 귤 스푼 | yes | UpgradePanel + home next-goal | lifetimeOranges:1000 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| sorting_rhythm / 분류 리듬 | yes | UpgradePanel + home next-goal | lifetimeOranges:5000 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| warm_towel / 온천 수건 | yes | UpgradePanel + home next-goal | lifetimeOranges:25000 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| citrus_recipe / 귤 간식 레시피 | yes | UpgradePanel + home next-goal | lifetimeOranges:75000 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| bamboo_touch / 대나무 손길 | yes | UpgradePanel + home next-goal | lifetimeOranges:400000 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| festival_clap / 축제 박수 | yes | UpgradePanel + home next-goal | lifetimeOranges:1200000 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| golden_leaf_polish / 황금잎 손질 | yes | UpgradePanel + home next-goal | goldenLeaf:1 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| memory_butler / 기억의 집사술 | yes | UpgradePanel + home next-goal | prestiges:2 | upgrade level persisted | upgrade/contentConfig/matrix | tap gain multiplier | connected |
| orange_basket / 귤 바구니 | yes | UpgradePanel + EPS summary | none | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| nap_mat / 낮잠 평상 | yes | UpgradePanel + EPS summary | lifetimeOranges:80 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| shade_parasol / 그늘 파라솔 | yes | UpgradePanel + EPS summary | lifetimeOranges:300 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| tiny_watering_path / 작은 물길 | yes | UpgradePanel + EPS summary | lifetimeOranges:1000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| wooden_crate_line / 나무 상자 줄 | yes | UpgradePanel + EPS summary | lifetimeOranges:5000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| fragrance_storehouse / 향기 창고 | yes | UpgradePanel + EPS summary | lifetimeOranges:12000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| sorting_table / 귤 분류대 | yes | UpgradePanel + EPS summary | lifetimeOranges:25000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| cart_stop / 수레 정류장 | yes | UpgradePanel + EPS summary | lifetimeOranges:45000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| warm_pond / 따뜻한 온천 | yes | UpgradePanel + EPS summary | lifetimeOranges:75000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| steam_towel_rack / 김나는 수건걸이 | yes | UpgradePanel + EPS summary | lifetimeOranges:150000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| snack_counter / 귤 간식대 | yes | UpgradePanel + EPS summary | lifetimeOranges:300000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| mineral_stream / 미네랄 물줄기 | yes | UpgradePanel + EPS summary | lifetimeOranges:600000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| bamboo_cart / 대나무 카트 | yes | UpgradePanel + EPS summary | lifetimeOranges:1200000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| wind_chime_bridge / 바람종 다리 | yes | UpgradePanel + EPS summary | lifetimeOranges:2200000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| orange_lantern_road / 귤 등불길 | yes | UpgradePanel + EPS summary | lifetimeOranges:4000000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| butler_toolbox / 집사 도구함 | yes | UpgradePanel + EPS summary | lifetimeOranges:7500000 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| golden_forest_path / 황금 숲길 | yes | UpgradePanel + EPS summary | goldenLeaf:1 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| leaf_compost_house / 잎새 퇴비장 | yes | UpgradePanel + EPS summary | goldenLeaf:3 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| moon_orange_observatory / 달귤 관측소 | yes | UpgradePanel + EPS summary | prestiges:2 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |
| season_memory_gate / 계절 기억문 | yes | UpgradePanel + EPS summary | prestiges:3 | generator level persisted | upgrade/contentConfig/matrix | EPS production | connected |

## Quests

| Item | Config | UI exposure | Unlock condition | Save/load | Test evidence | Actual gameplay impact | Audit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| welcome_first_orange / 첫 귤 건네기 | yes | Album quest board + home featured quest | totalTaps:1 | claimed state persisted | questManager/contentConfig/matrix | claim +12 oranges, +3 friendship | connected |
| welcome_soft_paw / 말랑 앞발 마련 | yes | Album quest board + home featured quest | upgradeLevel:soft_paw:1 | claimed state persisted | questManager/contentConfig/matrix | claim +40 oranges, +4 friendship | connected |
| welcome_first_basket / 자동 바구니 놓기 | yes | Album quest board + home featured quest | generatorLevel:orange_basket:1 | claimed state persisted | questManager/contentConfig/matrix | claim +90 oranges, +4 friendship | connected |
| welcome_steady_ten / 손끝 리듬 만들기 | yes | Album quest board + home featured quest | totalTaps:10 | claimed state persisted | questManager/contentConfig/matrix | claim +120 oranges, +3 friendship | connected |
| yard_first_100 / 작은 바구니 채우기 | yes | Album quest board + home featured quest | totalOranges:100 | claimed state persisted | questManager/contentConfig/matrix | claim +160 oranges, +3 friendship | connected |
| yard_nap_mat / 낮잠 평상 준비 | yes | Album quest board + home featured quest | generatorLevel:nap_mat:1 | claimed state persisted | questManager/contentConfig/matrix | claim +240 oranges, +4 friendship | connected |
| yard_parasol / 그늘 자리 만들기 | yes | Album quest board + home featured quest | generatorLevel:shade_parasol:1 | claimed state persisted | questManager/contentConfig/matrix | claim +360 oranges, +4 friendship | connected |
| yard_spoon / 귤 스푼 찾기 | yes | Album quest board + home featured quest | upgradeLevel:orange_spoon:1 | claimed state persisted | questManager/contentConfig/matrix | claim +520 oranges, +4 friendship | connected |
| yard_water_path / 작은 물길 열기 | yes | Album quest board + home featured quest | generatorLevel:tiny_watering_path:1 | claimed state persisted | questManager/contentConfig/matrix | claim +800 oranges, +5 friendship | connected |
| yard_one_thousand / 천 귤 표지판 | yes | Album quest board + home featured quest | totalOranges:1000 | claimed state persisted | questManager/contentConfig/matrix | claim +1200 oranges, +5 friendship | connected |
| yard_tap_100 / 마당 단골 되기 | yes | Album quest board + home featured quest | totalTaps:100 | claimed state persisted | questManager/contentConfig/matrix | claim +1500 oranges, +5 friendship | connected |
| storehouse_open / 귤 창고 문 열기 | yes | Album quest board + home featured quest | totalOranges:5000 | claimed state persisted | questManager/contentConfig/matrix | claim +3200 oranges, +6 friendship | connected |
| storehouse_crate_line / 나무 상자 줄 맞추기 | yes | Album quest board + home featured quest | generatorLevel:wooden_crate_line:1 | claimed state persisted | questManager/contentConfig/matrix | claim +5200 oranges, +6 friendship | connected |
| storehouse_rhythm / 분류 리듬 익히기 | yes | Album quest board + home featured quest | upgradeLevel:sorting_rhythm:1 | claimed state persisted | questManager/contentConfig/matrix | claim +7400 oranges, +6 friendship | connected |
| storehouse_fragrance / 향기 창고 채우기 | yes | Album quest board + home featured quest | generatorLevel:fragrance_storehouse:1 | claimed state persisted | questManager/contentConfig/matrix | claim +9800 oranges, +7 friendship | connected |
| storehouse_25k / 향기로운 선반 | yes | Album quest board + home featured quest | totalOranges:25000 | claimed state persisted | questManager/contentConfig/matrix | claim +16000 oranges, +7 friendship | connected |
| storehouse_sorting_table / 분류대 가동 | yes | Album quest board + home featured quest | generatorLevel:sorting_table:1 | claimed state persisted | questManager/contentConfig/matrix | claim +22000 oranges, +7 friendship | connected |
| storehouse_cart_stop / 수레 정류장 세우기 | yes | Album quest board + home featured quest | generatorLevel:cart_stop:1 | claimed state persisted | questManager/contentConfig/matrix | claim +30000 oranges, +8 friendship | connected |
| storehouse_total_levels / 창고 운영표 작성 | yes | Album quest board + home featured quest | totalGeneratorLevels:20 | claimed state persisted | questManager/contentConfig/matrix | claim +42000 oranges, +8 friendship | connected |
| onsen_open / 온천 초대장 받기 | yes | Album quest board + home featured quest | totalOranges:75000 | claimed state persisted | questManager/contentConfig/matrix | claim +58000 oranges, +9 friendship | connected |
| onsen_warm_pond / 따뜻한 온천 데우기 | yes | Album quest board + home featured quest | generatorLevel:warm_pond:1 | claimed state persisted | questManager/contentConfig/matrix | claim +82000 oranges, +9 friendship | connected |
| onsen_towel_touch / 온천 수건 건네기 | yes | Album quest board + home featured quest | upgradeLevel:warm_towel:1 | claimed state persisted | questManager/contentConfig/matrix | claim +110000 oranges, +9 friendship | connected |
| onsen_towel_rack / 수건걸이 정리 | yes | Album quest board + home featured quest | generatorLevel:steam_towel_rack:1 | claimed state persisted | questManager/contentConfig/matrix | claim +150000 oranges, +10 friendship | connected |
| onsen_snack_recipe / 귤 간식 연구 | yes | Album quest board + home featured quest | upgradeLevel:citrus_recipe:1 | claimed state persisted | questManager/contentConfig/matrix | claim +190000 oranges, +10 friendship | connected |
| onsen_snack_counter / 간식대 차리기 | yes | Album quest board + home featured quest | generatorLevel:snack_counter:1 | claimed state persisted | questManager/contentConfig/matrix | claim +260000 oranges, +11 friendship | connected |
| onsen_eps_1k / 천 귤 흐름 만들기 | yes | Album quest board + home featured quest | eps:1000 | claimed state persisted | questManager/contentConfig/matrix | claim +360000 oranges, +11 friendship | connected |
| onsen_300k / 따뜻한 오후 | yes | Album quest board + home featured quest | totalOranges:300000 | claimed state persisted | questManager/contentConfig/matrix | claim +420000 oranges, +12 friendship | connected |
| bamboo_open / 대나무 정원 진입 | yes | Album quest board + home featured quest | totalOranges:1200000 | claimed state persisted | questManager/contentConfig/matrix | claim +900000 oranges, +13 friendship | connected |
| bamboo_touch / 대나무 손길 익히기 | yes | Album quest board + home featured quest | upgradeLevel:bamboo_touch:1 | claimed state persisted | questManager/contentConfig/matrix | claim +1300000 oranges, +13 friendship | connected |
| bamboo_cart / 대나무 카트 첫 운행 | yes | Album quest board + home featured quest | generatorLevel:bamboo_cart:1 | claimed state persisted | questManager/contentConfig/matrix | claim +1700000 oranges, +14 friendship | connected |
| bamboo_wind_bridge / 바람종 다리 연결 | yes | Album quest board + home featured quest | generatorLevel:wind_chime_bridge:1 | claimed state persisted | questManager/contentConfig/matrix | claim +2400000 oranges, +14 friendship | connected |
| bamboo_festival_clap / 축제 박자 맞추기 | yes | Album quest board + home featured quest | upgradeLevel:festival_clap:1 | claimed state persisted | questManager/contentConfig/matrix | claim +3200000 oranges, +15 friendship | connected |
| bamboo_lantern / 귤 등불길 밝히기 | yes | Album quest board + home featured quest | generatorLevel:orange_lantern_road:1 | claimed state persisted | questManager/contentConfig/matrix | claim +4600000 oranges, +15 friendship | connected |
| bamboo_toolbox / 집사 도구함 점검 | yes | Album quest board + home featured quest | generatorLevel:butler_toolbox:1 | claimed state persisted | questManager/contentConfig/matrix | claim +6200000 oranges, +16 friendship | connected |
| bamboo_eps_100k / 대나무 급류 | yes | Album quest board + home featured quest | eps:100000 | claimed state persisted | questManager/contentConfig/matrix | claim +9000000 oranges, +16 friendship | connected |
| bamboo_total_levels / 정원 운영표 확장 | yes | Album quest board + home featured quest | totalGeneratorLevels:120 | claimed state persisted | questManager/contentConfig/matrix | claim +11000000 oranges, +17 friendship | connected |
| golden_open / 황금 숲 입구 보기 | yes | Album quest board + home featured quest | totalOranges:25000000 | claimed state persisted | questManager/contentConfig/matrix | claim +18000000 oranges, +18 friendship | connected |
| golden_first_prestige / 첫 계절 넘기기 | yes | Album quest board + home featured quest | prestiges:1 | claimed state persisted | questManager/contentConfig/matrix | claim +26000000 oranges, +20 friendship | connected |
| golden_leaf_path / 황금 숲길 걷기 | yes | Album quest board + home featured quest | generatorLevel:golden_forest_path:1 | claimed state persisted | questManager/contentConfig/matrix | claim +32000000 oranges, +20 friendship | connected |
| golden_leaf_polish / 황금잎 손질 | yes | Album quest board + home featured quest | upgradeLevel:golden_leaf_polish:1 | claimed state persisted | questManager/contentConfig/matrix | claim +36000000 oranges, +20 friendship | connected |
| golden_five_leaves / 다섯 잎새 묶기 | yes | Album quest board + home featured quest | goldenLeaf:5 | claimed state persisted | questManager/contentConfig/matrix | claim +42000000 oranges, +22 friendship | connected |
| golden_compost / 잎새 퇴비장 열기 | yes | Album quest board + home featured quest | generatorLevel:leaf_compost_house:1 | claimed state persisted | questManager/contentConfig/matrix | claim +52000000 oranges, +22 friendship | connected |
| golden_memory_touch / 기억의 손길 | yes | Album quest board + home featured quest | upgradeLevel:memory_butler:1 | claimed state persisted | questManager/contentConfig/matrix | claim +64000000 oranges, +24 friendship | connected |
| golden_observatory / 달귤 관측 | yes | Album quest board + home featured quest | generatorLevel:moon_orange_observatory:1 | claimed state persisted | questManager/contentConfig/matrix | claim +78000000 oranges, +24 friendship | connected |
| golden_memory_gate / 계절 기억문 열기 | yes | Album quest board + home featured quest | generatorLevel:season_memory_gate:1 | claimed state persisted | questManager/contentConfig/matrix | claim +98000000 oranges, +28 friendship | connected |
| release_ad_festival / 수확 축제 리허설 | yes | Album quest board + home featured quest | adBoostActive | claimed state persisted | questManager/contentConfig/matrix | claim +5000 oranges, +8 friendship | connected |
| release_shop_gift / 특별 상자 점검 | yes | Album quest board + home featured quest | purchasedProducts:1 | claimed state persisted | questManager/contentConfig/matrix | claim +12000 oranges, +8 friendship | connected |
| release_album_first / 앨범 첫 장 확인 | yes | Album quest board + home featured quest | achievementUnlocked:first_orange | claimed state persisted | questManager/contentConfig/matrix | claim +1000 oranges, +6 friendship | connected |
| release_album_basket / 자동 생산 기록 붙이기 | yes | Album quest board + home featured quest | achievementUnlocked:basket_1 | claimed state persisted | questManager/contentConfig/matrix | claim +1600 oranges, +6 friendship | connected |
| release_export_ready / 운영 후보 점검 | yes | Album quest board + home featured quest | prestiges:3 | claimed state persisted | questManager/contentConfig/matrix | claim +120000000 oranges, +30 friendship | connected |

## Achievements

| Item | Config | UI exposure | Unlock condition | Save/load | Test evidence | Actual gameplay impact | Audit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| first_orange / 첫 귤 인사 | yes | Home shelf + Album badges | totalTaps:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| ten_taps / 손끝 예열 | yes | Home shelf + Album badges | totalTaps:10 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| hundred_taps / 마당 단골 | yes | Home shelf + Album badges | totalTaps:100 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| thousand_taps / 귤 박자 장인 | yes | Home shelf + Album badges | totalTaps:1000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| first_100_oranges / 작은 바구니 | yes | Home shelf + Album badges | totalOranges:100 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| first_1k_oranges / 천 귤 마당 | yes | Home shelf + Album badges | totalOranges:1000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| storehouse_5k / 창고 열쇠 | yes | Home shelf + Album badges | totalOranges:5000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| fragrant_25k / 향기로운 선반 | yes | Home shelf + Album badges | totalOranges:25000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| onsen_75k / 온천 김 | yes | Home shelf + Album badges | totalOranges:75000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| onsen_300k / 따뜻한 오후 | yes | Home shelf + Album badges | totalOranges:300000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| bamboo_1m / 백만 귤 정원 | yes | Home shelf + Album badges | totalOranges:1000000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| bamboo_5m / 대나무 운반망 | yes | Home shelf + Album badges | totalOranges:5000000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| golden_25m / 황금 숲 입구 | yes | Home shelf + Album badges | totalOranges:25000000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| soft_paw_1 / 말랑 첫걸음 | yes | Home shelf + Album badges | upgradeLevel:soft_paw:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| soft_paw_10 / 앞발 숙련 | yes | Home shelf + Album badges | upgradeLevel:soft_paw:10 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| basket_1 / 첫 자동 바구니 | yes | Home shelf + Album badges | generatorLevel:orange_basket:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| basket_25 / 바구니 행렬 | yes | Home shelf + Album badges | generatorLevel:orange_basket:25 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| storehouse_first / 상자 정리 시작 | yes | Home shelf + Album badges | generatorLevel:wooden_crate_line:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| onsen_first / 첫 온천 손님 | yes | Home shelf + Album badges | generatorLevel:warm_pond:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| bamboo_cart_first / 대나무 첫 운행 | yes | Home shelf + Album badges | generatorLevel:bamboo_cart:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| toolbox_first / 도구함 개방 | yes | Home shelf + Album badges | generatorLevel:butler_toolbox:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| gold_path_first / 황금 숲 첫길 | yes | Home shelf + Album badges | generatorLevel:golden_forest_path:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| tap_suite_20 / 손맛 세트 | yes | Home shelf + Album badges | totalUpgradeLevels:20 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| tap_suite_100 / 집사 손끝 | yes | Home shelf + Album badges | totalUpgradeLevels:100 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| generator_suite_20 / 시설 세트 | yes | Home shelf + Album badges | totalGeneratorLevels:20 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| generator_suite_120 / 정원 운영표 | yes | Home shelf + Album badges | totalGeneratorLevels:120 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| eps_10 / 초당 열 귤 | yes | Home shelf + Album badges | eps:10 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| eps_1k / 천 귤 흐름 | yes | Home shelf + Album badges | eps:1000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| eps_100k / 대나무 급류 | yes | Home shelf + Album badges | eps:100000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| eps_1m / 백만 귤 물결 | yes | Home shelf + Album badges | eps:1000000 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| first_leaf / 첫 황금 나뭇잎 | yes | Home shelf + Album badges | goldenLeaf:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| five_leaf / 다섯 잎새 | yes | Home shelf + Album badges | goldenLeaf:5 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| first_prestige / 첫 계절 넘김 | yes | Home shelf + Album badges | prestiges:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| third_prestige / 세 번째 계절 | yes | Home shelf + Album badges | prestiges:3 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| ad_festival / 수확 축제 시작 | yes | Home shelf + Album badges | adBoostActive | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| sandbox_gift / 특별 상자 확인 | yes | Home shelf + Album badges | purchasedProducts:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| sandbox_shelf / 상점 선반 점검 | yes | Home shelf + Album badges | purchasedProducts:2 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| all_yard_core / 마당 기본 세트 | yes | Home shelf + Album badges | generatorLevel:tiny_watering_path:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| late_game_marker / 기억문 앞에서 | yes | Home shelf + Album badges | generatorLevel:season_memory_gate:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |
| memory_touch_first / 기억 손길 | yes | Home shelf + Album badges | upgradeLevel:memory_butler:1 | unlockedAt persisted | contentConfig/matrix | toast + collection badge, no claim currency | weak-impact |

## Decorations

| Item | Config | UI exposure | Unlock condition | Save/load | Test evidence | Actual gameplay impact | Audit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| sunny_yard / 햇살 마당 | yes | Album card + equip button + hero class | default | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| orange_basket_corner / 귤 바구니 코너 | yes | Album card + equip button + hero class | questClaimed:welcome_first_basket | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| soft_paw_stamp / 앞발 도장길 | yes | Album card + equip button + hero class | achievementUnlocked:soft_paw_1 | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| nap_mat_set / 낮잠 평상 세트 | yes | Album card + equip button + hero class | questClaimed:yard_nap_mat | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| watering_rill / 작은 물길 | yes | Album card + equip button + hero class | questClaimed:yard_water_path | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| storehouse_sign / 창고 이름표 | yes | Album card + equip button + hero class | questClaimed:storehouse_open | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| crate_lane / 상자 운반길 | yes | Album card + equip button + hero class | questClaimed:storehouse_crate_line | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| fragrance_shelf / 향기 선반 | yes | Album card + equip button + hero class | questClaimed:storehouse_25k | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| cart_stop_flag / 수레 정류장 깃발 | yes | Album card + equip button + hero class | questClaimed:storehouse_cart_stop | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| onsen_mist / 온천 김 | yes | Album card + equip button + hero class | questClaimed:onsen_open | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| warm_pond_stones / 온천 돌담 | yes | Album card + equip button + hero class | questClaimed:onsen_warm_pond | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| towel_rack_corner / 수건걸이 코너 | yes | Album card + equip button + hero class | questClaimed:onsen_towel_rack | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| snack_counter_table / 귤 간식대 | yes | Album card + equip button + hero class | questClaimed:onsen_snack_counter | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| bamboo_gate / 대나무 문 | yes | Album card + equip button + hero class | questClaimed:bamboo_open | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| bamboo_cart_track / 카트 바퀴길 | yes | Album card + equip button + hero class | questClaimed:bamboo_cart | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| wind_chime_bridge / 바람종 다리 | yes | Album card + equip button + hero class | questClaimed:bamboo_wind_bridge | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| orange_lanterns / 귤 등불 | yes | Album card + equip button + hero class | questClaimed:bamboo_lantern | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| festival_ribbon / 수확 축제 리본 | yes | Album card + equip button + hero class | questClaimed:release_ad_festival | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| golden_forest_arch / 황금 숲 아치 | yes | Album card + equip button + hero class | questClaimed:golden_open | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| first_leaf_plaque / 첫 황금잎 표본 | yes | Album card + equip button + hero class | achievementUnlocked:first_leaf | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| golden_leaf_path / 황금잎 산책길 | yes | Album card + equip button + hero class | questClaimed:golden_leaf_path | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| compost_greenhouse / 잎새 퇴비 온실 | yes | Album card + equip button + hero class | questClaimed:golden_compost | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| moon_observatory / 달귤 관측 하늘 | yes | Album card + equip button + hero class | questClaimed:golden_observatory | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| memory_gate_halo / 계절 기억문 후광 | yes | Album card + equip button + hero class | questClaimed:golden_memory_gate | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |
| release_stamp_board / 출시 점검 보드 | yes | Album card + equip button + hero class | questClaimed:release_export_ready | unlocked/equipped persisted | collectionManager/contentConfig/matrix | hero visual + cosmetic scene change | connected cosmetic |

## Capybaras

| Item | Config | UI exposure | Unlock condition | Save/load | Test evidence | Actual gameplay impact | Audit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| momo / 모모 | yes | Album companion card | tier/quest friendship via 귤 바구니 | friendship/unlocked persisted | collectionManager/contentConfig/matrix | story/friendship collection, no stat bonus | weak-impact |
| narin / 나린 | yes | Album companion card | tier/quest friendship via 향기 창고 | friendship/unlocked persisted | collectionManager/contentConfig/matrix | story/friendship collection, no stat bonus | weak-impact |
| dami / 다미 | yes | Album companion card | tier/quest friendship via 따뜻한 온천 | friendship/unlocked persisted | collectionManager/contentConfig/matrix | story/friendship collection, no stat bonus | weak-impact |
| biro / 비로 | yes | Album companion card | tier/quest friendship via 대나무 카트 | friendship/unlocked persisted | collectionManager/contentConfig/matrix | story/friendship collection, no stat bonus | weak-impact |
| soda / 소다 | yes | Album companion card | tier/quest friendship via 귤 간식대 | friendship/unlocked persisted | collectionManager/contentConfig/matrix | story/friendship collection, no stat bonus | weak-impact |
| ruru / 루루 | yes | Album companion card | tier/quest friendship via 귤 등불길 | friendship/unlocked persisted | collectionManager/contentConfig/matrix | story/friendship collection, no stat bonus | weak-impact |
| hanul / 하늘 | yes | Album companion card | tier/quest friendship via 황금 숲길 | friendship/unlocked persisted | collectionManager/contentConfig/matrix | story/friendship collection, no stat bonus | weak-impact |
| podo / 포도 | yes | Album companion card | tier/quest friendship via 낮잠 평상 | friendship/unlocked persisted | collectionManager/contentConfig/matrix | story/friendship collection, no stat bonus | weak-impact |

## Progression Tiers

| Item | Config | UI exposure | Unlock condition | Save/load | Test evidence | Actual gameplay impact | Audit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| yard / 마당 | yes | Home hero + progression goal + locks | lifetimeOranges:0 | derived from lifetime oranges | contentConfig/selectors/visual | unlocks upgrades, quests, companions, decoration tone | connected |
| storehouse / 귤 창고 | yes | Home hero + progression goal + locks | lifetimeOranges:5000 | derived from lifetime oranges | contentConfig/selectors/visual | unlocks upgrades, quests, companions, decoration tone | connected |
| onsen / 온천 | yes | Home hero + progression goal + locks | lifetimeOranges:75000 | derived from lifetime oranges | contentConfig/selectors/visual | unlocks upgrades, quests, companions, decoration tone | connected |
| bamboo_garden / 대나무 정원 | yes | Home hero + progression goal + locks | lifetimeOranges:1200000 | derived from lifetime oranges | contentConfig/selectors/visual | unlocks upgrades, quests, companions, decoration tone | connected |
| golden_forest / 황금 숲 | yes | Home hero + progression goal + locks | lifetimeOranges:25000000 | derived from lifetime oranges | contentConfig/selectors/visual | unlocks upgrades, quests, companions, decoration tone | connected |
