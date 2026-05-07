# Store Screenshot Plan

기준일: 2026-05-07

스토어용 후보 스크린샷은 QA screenshot과 분리해 `store-screenshots/`에 생성한다. Playwright spec은 `e2e/store-screenshot-pack.spec.ts`이며, debug shortcut 없이 seed save만 사용한다. v2 raster/HUD pass에서 `src/assets/raster/release/store-key-visual.png`를 full-screen key art background로 연결하고, 그 위에 gameplay panel과 store copy를 얹어 단순 앱 캡처가 아니라 store-facing 구성으로 재생성했다. RC-10에서는 public copy에서 mock/sandbox/internal wording을 제거하고, home/upgrade/milestone/prestige/reward 순간 중심으로 재구성했다. 다만 RC-10 integrity pass의 독립 재점수는 store screenshot pack을 7.5로 보정했으므로, 현재 파일들은 최종 제출본이 아니라 다음 crop/scale polish 대상 후보로 본다.

## 후보 목록

| 파일 | 기기 계열 | 화면 | 카피 | 상태 |
| --- | --- | --- | --- | --- |
| `store-screenshots/iphone-01-home.png` | iPhone 6.7형 후보 | 홈 | 귤 정원이 바로 살아나요 | 생성 완료 |
| `store-screenshots/iphone-02-upgrade.png` | iPhone 6.7형 후보 | 업그레이드 | 도구 선반을 빠르게 채우세요 | 생성 완료 |
| `store-screenshots/iphone-03-milestone.png` | iPhone 6.7형 후보 | 복귀 배지 | 돌아올 때마다 찍히는 배지 | 생성 완료 |
| `store-screenshots/iphone-04-prestige.png` | iPhone 6.7형 후보 | 환생 ceremony | 황금 나뭇잎 의식 | 생성 완료 |
| `store-screenshots/iphone-05-reward.png` | iPhone 6.7형 후보 | 복귀 보상 | 오늘의 보상이 기다려요 | 생성 완료 |
| `store-screenshots/android-01-home.png` | Android phone 후보 | 홈 | 귤 정원이 바로 살아나요 | 생성 완료 |
| `store-screenshots/android-02-upgrade.png` | Android phone 후보 | 업그레이드 | 도구 선반을 빠르게 채우세요 | 생성 완료 |
| `store-screenshots/android-03-milestone.png` | Android phone 후보 | 복귀 배지 | 돌아올 때마다 찍히는 배지 | 생성 완료 |
| `store-screenshots/android-04-prestige.png` | Android phone 후보 | 환생 ceremony | 황금 나뭇잎 의식 | 생성 완료 |
| `store-screenshots/android-05-reward.png` | Android phone 후보 | 복귀 보상 | 오늘의 보상이 기다려요 | 생성 완료 |

## 사용 제한

- 현재 이미지는 store submission 후보 pack이지만 최종 제출 전 실제 iOS/Android simulator 또는 물리 기기에서 다시 캡처해야 한다.
- 공개 스토어 스크린샷에는 구현 방식, 검증 방식, 내부 준비 상태 문구를 넣지 않는다.
- RC-10에서 Korean line break와 gameplay panel moment selection을 재점검했다. 최종 제출 전에는 실제 store 기기 프레임, 플랫폼별 해상도, final exported icon/splash 기준으로 다시 캡처한다.
