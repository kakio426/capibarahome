# Store Listing Draft

기준일: 2026-05-09

## App Name

카피바라 집사기

## Subtitle

귤 정원을 키우는 방치형 클리커

## Short Description

카피바라에게 귤을 주고 정원을 키우며, 업그레이드와 환생으로 매일 조금씩 성장하는 모바일 idle/clicker 게임입니다.

## Full Description

카피바라 집사기는 귀여운 카피바라와 함께 귤 정원을 키우는 방치형 클리커 게임입니다. 화면을 터치해 귤을 모으고, 바구니와 창고, 온천, 대나무 정원 같은 시설을 업그레이드하면 초당 귤 생산량이 늘어납니다.

잠시 쉬었다 돌아오면 오프라인 보상을 받을 수 있고, 충분히 성장하면 환생으로 황금 나뭇잎을 얻어 다음 회차를 더 빠르게 시작할 수 있습니다.

매일 돌아오면 복귀 보상과 D1/D3/D7 정원 배지를 받을 수 있고, 첫 환생 뒤에는 다음 장기 목표 장부가 이어집니다.

앨범에서는 8마리 카피바라 친구, 퀘스트, 업적, 장식을 확인합니다. 각 친구의 친밀도와 능력 보너스가 터치 수익, 자동 생산, 오프라인 보상, 퀘스트 보상에 영향을 주어 장기 목표를 이어갑니다.

이 초안은 공개 스토어 문구 기준이다. 실제 광고, 결제, 계정, 서버 기능을 제공한다고 오해될 표현은 넣지 않는다.

## Key Features

- 터치로 귤 수확
- 초당 귤 자동 생산
- 업그레이드/시설 성장
- 황금 나뭇잎 환생 시스템
- 오프라인 보상
- 일일 복귀 보상과 D1/D3/D7 배지
- 8마리 카피바라 친구와 앨범
- 퀘스트, 업적, 장식 보상
- 저장/불러오기와 export/import
- 튜토리얼, 설정, 효과음/이펙트 토글

## Keywords

카피바라, 방치형, 클리커, 귤, 귀여운 게임, idle, clicker, capybara, casual, offline reward, collection, prestige

## Age Rating Notes

- 폭력/공포/선정성 없음
- 실제 도박 없음
- 현재 빌드에는 실제 결제와 실제 광고 SDK 없음
- 향후 실제 IAP/광고가 들어가면 App Store/Google Play 등급 설문과 disclosure를 다시 작성

## URL Placeholders

- Support URL: `https://example.com/support` 사용자가 제출 전 실제 URL 제공 필요
- Privacy Policy URL: `https://example.com/privacy` 사용자가 제출 전 실제 URL 제공 필요
- Marketing URL: 선택

## Screenshot Pack

스토어용 후보는 `store-screenshots/`에 생성한다. 상세 목록은 `STORE_SCREENSHOT_PLAN.md`를 기준으로 관리한다. RC-11 기준 공개 문구의 비공개 구현 표현은 제거되어 있고, screenshot framing은 `RC11_INDEPENDENT_RESCORE.md`에서 8.1로 보정됐다. RC-13에서는 `STORE_METADATA_PACKAGE.md`로 공개 카피와 사용자 제공 metadata gap을 분리했고, screenshot pack에 public copy 금지어/문구 잘림/file-size/dimension guard를 추가했다. 최종 제출 전에는 실제 기기/시뮬레이터 frame, 최종 icon/splash, 법무 승인 기준으로 다시 확정한다.

추천 공개 순서:

1. 홈: 귤 정원에서 시작하는 포근한 성장
2. 업그레이드: 한 번에 쑥쑥 키우는 업그레이드 작업대
3. 복귀 배지: 복귀할수록 채워지는 정원 배지
4. 환생: 황금 나뭇잎으로 새 계절을 여세요
5. 보상: 돌아오면 기다리는 귤 보상

현재 생성 파일:

- `store-screenshots/iphone-01-home.png`
- `store-screenshots/iphone-02-upgrade.png`
- `store-screenshots/iphone-03-milestone.png`
- `store-screenshots/iphone-04-prestige.png`
- `store-screenshots/iphone-05-reward.png`
- `store-screenshots/android-01-home.png`
- `store-screenshots/android-02-upgrade.png`
- `store-screenshots/android-03-milestone.png`
- `store-screenshots/android-04-prestige.png`
- `store-screenshots/android-05-reward.png`

## Submission Notes

- 실제 App Store/Google Play 제출 완료로 주장하지 않는다.
- 실제 광고/IAP SDK가 붙기 전에는 real paid product 또는 real rewarded ad 제공으로 표현하지 않는다.
- 최종 store listing은 사용자의 법적 이름, support/privacy URL, 실제 SDK 상태, age rating 답변을 반영해 다시 확정한다.
- 광고/IAP 구현 상태 같은 비공개 주석은 `PRIVACY_NOTES.md`, `RELEASE_BLOCKERS.md`, `NATIVE_BUILD_GUIDE.md`에만 기록하고 공개 설명/스크린샷 문구에는 노출하지 않는다.
