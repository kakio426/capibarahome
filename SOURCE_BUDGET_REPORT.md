# Source Budget Report

기준일: 2026-05-05

이번 재검증은 `src` 전체 LOC를 구현 규모로 보지 않는다. Generated SVG, generated registry, 반복 config, docs, screenshots, build output, `node_modules`를 제외하고 순수 handwritten gameplay/UI/system/test 규모를 따로 계산했다.

## 측정 명령

```txt
find src/app src/core src/game src/state src/systems src/ui -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) | sort | xargs wc -l | tail -1
find src/tests e2e -type f \( -name '*.ts' -o -name '*.tsx' \) ! -path 'src/tests/generated/*' | sort | xargs wc -l | tail -1
find src/config -type f \( -name '*.ts' -o -name '*.tsx' \) | sort | xargs wc -l | tail -1
find src/assets/generated -type f | sort | xargs wc -l | tail -1
find src/tests/generated -type f \( -name '*.ts' -o -name '*.tsx' \) | sort | xargs wc -l | tail -1
find src/app src/core src/game src/state src/systems src/ui src/tests e2e -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) ! -path 'src/tests/generated/*' | sort | xargs wc -c | tail -1
```

## 재검증 결과

| 항목 | LOC/bytes | 감사 판정 |
| --- | ---: | --- |
| 순수 handwritten runtime 구현 `src/app src/core src/game src/state src/systems src/ui` | 6,374 LOC | 실제 gameplay/UI/system 구현 규모 |
| 순수 handwritten unit/E2E tests `src/tests e2e` excluding generated matrix | 2,186 LOC | 실제 사람이 작성한 검증 규모 |
| 순수 handwritten gameplay/UI/system/test 합계 | 8,560 LOC | 이번 감사의 기준값 |
| 반복 config `src/config` | 2,529 LOC | 콘텐츠/오디오 데이터이므로 구현 LOC에서 분리 |
| generated SVG/asset registry `src/assets/generated` | 11,076 LOC | visual asset 산출물이므로 구현 LOC에서 분리 |
| generated matrix tests `src/tests/generated` | 5,718 LOC | 항목별 스냅샷 검증으로 인정하되 handwritten test LOC에서 분리 |
| handwritten runtime+test byte size | 305,451 bytes | docs/build/assets 제외 기준 |

## 콘텐츠 수량 재검증

| 항목 | 현재 config/asset | 실제 연결 판정 |
| --- | ---: | --- |
| 업그레이드/시설 | 30종 | 30종 모두 비용, 구매, tap/EPS 수식, UI, 저장에 연결 |
| 퀘스트 | 50종 | 50종 모두 조건, 보상, 친밀도, UI, 저장에 연결 |
| 업적 | 40종 | 40종 모두 UI/save/claim reward에 연결, 귤/황금잎/친밀도/장식/영구 배율 보상 포함 |
| 장식 컬렉션 | 25종 | 25종 모두 UI/save/equip에 연결, 홈 visual class와 연결 |
| 성장 구간 | 5개 | 5개 모두 unlock, 홈 톤, 목표, 콘텐츠 gating에 연결 |
| 카피바라 캐릭터 | 8마리 | 8마리 모두 앨범/친밀도/퀘스트/고유 passive ability에 연결 |
| 수제 SVG 파일 | 245개 | icons 61, items 158, mascots 5, portraits 8, release 8, tiers 5 |
| registry asset key | 234개 | `assetRegistryMatrix.test.ts`가 registry 구조와 SVG 무결성 검증 |

## 판단

순수 handwritten 구현은 약 6.4K LOC, handwritten 검증까지 합치면 약 8.6K LOC다. 이번 art pass에서 SVG 산출물은 더 가볍고 직접 관리 가능한 형태로 재작성되었기 때문에, 이전처럼 generated LOC 자체를 구현 규모 근거로 쓰지 않는다. 남은 리스크는 final commissioned art, 실제 파일 기반 사운드, 실제 광고/IAP SDK, 물리 기기 QA 쪽으로 분리한다.
