# Store Screenshot Plan

기준일: 2026-05-05

스토어용 후보 스크린샷은 QA screenshot과 분리해 `store-screenshots/`에 생성한다. Playwright spec은 `e2e/store-screenshot-pack.spec.ts`이며, debug shortcut 없이 seed save만 사용한다. Final art pass에서 `store-key-visual-final.svg`를 배경 key visual로 연결해 단순 앱 캡처가 아니라 store-facing 구성으로 재생성했다.

## 후보 목록

| 파일 | 기기 계열 | 화면 | 카피 | 상태 |
| --- | --- | --- | --- | --- |
| `store-screenshots/iphone-01-home.png` | iPhone 6.7형 후보 | 홈 | 카피바라 귤 정원 키우기 | 생성 완료 |
| `store-screenshots/iphone-02-album.png` | iPhone 6.7형 후보 | 앨범 | 8마리 친구와 정원 앨범 | 생성 완료 |
| `store-screenshots/iphone-03-prestige.png` | iPhone 6.7형 후보 | 환생 | 황금 나뭇잎으로 다음 회차 성장 | 생성 완료 |
| `store-screenshots/iphone-04-shop.png` | iPhone 6.7형 후보 | 상점 | 샌드박스 보상 상점 | 생성 완료 |
| `store-screenshots/iphone-05-save.png` | iPhone 6.7형 후보 | 설정/save modal | 저장, 복구, 오프라인 보상까지 | 생성 완료 |
| `store-screenshots/android-01-home.png` | Android phone 후보 | 홈 | 카피바라 귤 정원 키우기 | 생성 완료 |
| `store-screenshots/android-02-album.png` | Android phone 후보 | 앨범 | 8마리 친구와 정원 앨범 | 생성 완료 |
| `store-screenshots/android-03-prestige.png` | Android phone 후보 | 환생 | 황금 나뭇잎으로 다음 회차 성장 | 생성 완료 |
| `store-screenshots/android-04-shop.png` | Android phone 후보 | 상점 | 샌드박스 보상 상점 | 생성 완료 |
| `store-screenshots/android-05-save.png` | Android phone 후보 | 설정/save modal | 저장, 복구, 오프라인 보상까지 | 생성 완료 |

## 사용 제한

- 현재 이미지는 store submission 후보 pack이지만 최종 제출 전 실제 iOS/Android simulator 또는 물리 기기에서 다시 캡처해야 한다.
- 실제 광고/IAP SDK가 붙기 전에는 상점 스크린샷/문구가 mock provider 상태임을 과장하지 않는다.
- RC-3에서 album crop, prestige multiplier, save copy를 재점검했고, final art pass에서 store key visual/frame 후보를 연결했다. 최종 제출 전에는 실제 store 기기 프레임, 플랫폼별 해상도, final exported icon/splash 기준으로 다시 캡처한다.
