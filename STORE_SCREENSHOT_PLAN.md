# Store Screenshot Plan

기준일: 2026-05-08

스토어용 후보 스크린샷은 QA screenshot과 분리해 `store-screenshots/`에 생성한다. Playwright spec은 `e2e/store-screenshot-pack.spec.ts`이며, 별도 치트 UI 없이 seed save만 사용한다. v2 raster/HUD pass에서 `src/assets/raster/release/store-key-visual.png`를 full-screen key art background로 연결하고, 그 위에 gameplay panel과 store copy를 얹어 단순 앱 캡처가 아니라 store-facing 구성으로 재생성했다. RC-10에서는 public copy에서 비공개 구현/검증 표현을 제거하고, home/upgrade/milestone/prestige/reward 순간 중심으로 재구성했다. RC-11에서는 phone panel scale/crop, upgrade shelf scroll framing, milestone/prestige/reward close framing을 보정했고 `RC11_INDEPENDENT_RESCORE.md` 기준 store screenshot pack은 8.1이다. RC-12에서는 public copy 금지어, heading/subtitle clipping, generated file size guard를 Playwright에 추가했다.

## 후보 목록

| 파일 | 기기 계열 | 화면 | 카피 | 상태 |
| --- | --- | --- | --- | --- |
| `store-screenshots/iphone-01-home.png` | iPhone 6.7형 후보 | 홈 | 귤 정원에서 시작하는 포근한 성장 | RC-12 검증 완료 |
| `store-screenshots/iphone-02-upgrade.png` | iPhone 6.7형 후보 | 업그레이드 | 한 번에 쑥쑥 키우는 업그레이드 작업대 | RC-12 검증 완료 |
| `store-screenshots/iphone-03-milestone.png` | iPhone 6.7형 후보 | 복귀 배지 | 복귀할수록 채워지는 정원 배지 | RC-12 검증 완료 |
| `store-screenshots/iphone-04-prestige.png` | iPhone 6.7형 후보 | 환생 ceremony | 황금 나뭇잎으로 새 계절을 여세요 | RC-12 검증 완료 |
| `store-screenshots/iphone-05-reward.png` | iPhone 6.7형 후보 | 복귀 보상 | 돌아오면 기다리는 귤 보상 | RC-12 검증 완료 |
| `store-screenshots/android-01-home.png` | Android phone 후보 | 홈 | 귤 정원에서 시작하는 포근한 성장 | RC-12 검증 완료 |
| `store-screenshots/android-02-upgrade.png` | Android phone 후보 | 업그레이드 | 한 번에 쑥쑥 키우는 업그레이드 작업대 | RC-12 검증 완료 |
| `store-screenshots/android-03-milestone.png` | Android phone 후보 | 복귀 배지 | 복귀할수록 채워지는 정원 배지 | RC-12 검증 완료 |
| `store-screenshots/android-04-prestige.png` | Android phone 후보 | 환생 ceremony | 황금 나뭇잎으로 새 계절을 여세요 | RC-12 검증 완료 |
| `store-screenshots/android-05-reward.png` | Android phone 후보 | 복귀 보상 | 돌아오면 기다리는 귤 보상 | RC-12 검증 완료 |

## 사용 제한

- 현재 이미지는 store submission 후보 pack이지만 최종 제출 전 실제 iOS/Android simulator 또는 물리 기기에서 다시 캡처해야 한다.
- RC-12 후보 치수는 iPhone `1290 x 2796`, Android `1080 x 1920`이다.
- 공개 스토어 스크린샷에는 구현 방식, 검증 방식, 비공개 준비 상태 문구를 넣지 않는다.
- RC-12에서 Korean copy 금지어, text clipping, screenshot file size guard를 자동화했다. 최종 제출 전에는 실제 store 기기 프레임, 플랫폼별 해상도, final exported icon/splash 기준으로 다시 캡처한다.
