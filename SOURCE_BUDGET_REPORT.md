# Source Budget Report

기준일: 2026-05-05

이번 재검증은 이전의 `src` 전체 LOC를 그대로 구현 규모로 보지 않는다. `generated`, SVG registry, 반복 config, docs, screenshots, build output, `node_modules`를 제외하고 순수 handwritten gameplay/UI/system/test 규모를 따로 계산했다.

## 측정 명령

```txt
find src/app src/core src/game src/state src/systems src/ui -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) | sort | xargs wc -l | tail -1
find src/tests e2e -type f \( -name '*.ts' -o -name '*.tsx' \) ! -path 'src/tests/generated/*' | sort | xargs wc -l | tail -1
find src/config -type f \( -name '*.ts' -o -name '*.tsx' \) | sort | xargs wc -l | tail -1
find src/assets/generated -type f | sort | xargs wc -l | tail -1
find src/tests/generated -type f \( -name '*.ts' -o -name '*.tsx' \) | sort | xargs wc -l | tail -1
```

## 재검증 결과

| 항목 | LOC | 감사 판정 |
| --- | ---: | --- |
| 순수 handwritten runtime 구현 `src/app src/core src/game src/state src/systems src/ui` | 6,374 | 실제 gameplay/UI/system 구현 규모 |
| 순수 handwritten unit/E2E tests `src/tests e2e` excluding generated matrix | 1,418 | 실제 사람이 작성한 검증 규모 |
| 순수 handwritten gameplay/UI/system/test 합계 | 7,792 | 이번 감사의 기준값 |
| 반복 config `src/config` | 2,424 | 콘텐츠 데이터이므로 구현 LOC에서 제외 |
| generated SVG/asset registry `src/assets/generated` | 40,966 | visual asset 산출물이므로 구현 LOC에서 제외 |
| generated matrix tests `src/tests/generated` | 4,746 | 항목별 스냅샷 검증으로 인정하되 handwritten test LOC에서 제외 |
| handwritten runtime+test byte size | 269,980 bytes | docs/build/assets 제외 기준 |

## 콘텐츠 수량 재검증

| 항목 | 현재 config | 실제 연결 판정 |
| --- | ---: | --- |
| 업그레이드/시설 | 30종 | 30종 모두 비용, 구매, tap/EPS 수식, UI, 저장에 연결 |
| 퀘스트 | 50종 | 50종 모두 조건, 보상, 친밀도, UI, 저장에 연결 |
| 업적 | 40종 | 40종 모두 UI/save/claim reward에 연결, 귤/황금잎/친밀도/장식/영구 배율 보상 포함 |
| 장식 컬렉션 | 25종 | 25종 모두 UI/save/equip에 연결, 감사 중 11종 hero visual 보강 |
| 성장 구간 | 5개 | 5개 모두 unlock, 홈 톤, 목표, 콘텐츠 gating에 연결 |
| 카피바라 캐릭터 | 8마리 | 8마리 모두 앨범/친밀도/퀘스트/고유 passive ability에 연결 |

## 판단

이전의 `src` 54K LOC 주장은 generated SVG와 generated matrix test 비중이 커서 실제 구현 규모 근거로 쓰기 어렵다. 순수 handwritten 구현은 약 6.4K LOC, handwritten 검증까지 합치면 약 7.8K LOC다. RC-1에서 업적 claim reward와 카피바라 passive ability를 실제 수식/저장/UI/test에 연결했으므로, 남은 collection motivation 리스크는 final art/더 깊은 방 꾸미기/연출 확장 쪽으로 이동했다.
