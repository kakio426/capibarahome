# Store Metadata Package

기준일: 2026-05-09

## Public Listing Copy

App name:

카피바라 집사기

Subtitle:

귤 정원을 키우는 방치형 클리커

Short description:

카피바라에게 귤을 주고 정원을 키우며, 업그레이드와 환생으로 매일 조금씩 성장하는 모바일 idle/clicker 게임입니다.

Screenshot order:

1. 귤 정원에서 시작하는 포근한 성장
2. 한 번에 쑥쑥 키우는 업그레이드 작업대
3. 복귀할수록 채워지는 정원 배지
4. 황금 나뭇잎으로 새 계절을 여세요
5. 돌아오면 기다리는 귤 보상

Public copy lint:

`e2e/store-screenshot-pack.spec.ts`에서 공개 screenshot copy 금지어, heading/subtitle clipping, PNG dimension, feature graphic dimension을 자동 검사한다. RC-14 기준 공개 카피는 통과했다.

## Store Screenshot Files

| 파일 | 용도 | 상태 |
| --- | --- | --- |
| `store-screenshots/iphone-01-home.png` | iPhone home | 후보 생성 |
| `store-screenshots/iphone-02-upgrade.png` | iPhone upgrade shelf | 후보 생성 |
| `store-screenshots/iphone-03-milestone.png` | iPhone milestone badge | 후보 생성 |
| `store-screenshots/iphone-04-prestige.png` | iPhone prestige ceremony | 후보 생성 |
| `store-screenshots/iphone-05-reward.png` | iPhone return reward | 후보 생성 |
| `store-screenshots/android-01-home.png` | Android home | 후보 생성 |
| `store-screenshots/android-02-upgrade.png` | Android upgrade shelf | 후보 생성 |
| `store-screenshots/android-03-milestone.png` | Android milestone badge | 후보 생성 |
| `store-screenshots/android-04-prestige.png` | Android prestige ceremony | 후보 생성 |
| `store-screenshots/android-05-reward.png` | Android return reward | 후보 생성 |
| `store-screenshots/google-play-feature-graphic.png` | Google Play feature graphic | 후보 생성 |

Dimensions:

- iPhone 후보: 1290 x 2796
- Android 후보: 1080 x 1920
- Google Play feature graphic 후보: 1024 x 500

## Metadata Draft Inputs

Keywords:

카피바라, 방치형, 클리커, 귤, 귀여운 게임, idle, clicker, capybara, casual, offline reward, collection, prestige

Age rating notes:

- 폭력/공포/선정성 없음
- 실제 도박 없음
- 실제 결제/광고 SDK를 붙일 경우 rating/disclosure 재작성 필요

URLs:

- Privacy Policy URL: 사용자가 제공 필요
- Support URL: 사용자가 제공 필요
- Marketing URL: 선택

## Store Submission Metadata Checklist

| 항목 | 현재 후보 | 제출 전 필요 |
| --- | --- | --- |
| App name | 카피바라 집사기 | 최종 승인 |
| Subtitle / short description | 귤 정원을 키우는 방치형 클리커 | 플랫폼별 글자 수 최종 확인 |
| Full description | 위 public copy 기반 | App Store Connect / Play Console 입력 전 최종 교정 |
| Keywords | 카피바라, 방치형, 클리커, 귤 등 | Apple keyword length 최종 조정 |
| Category | Games / Casual 또는 Simulation 후보 | 사용자가 플랫폼별 확정 |
| Age rating | 폭력/공포/선정성 없음 후보 | 실제 questionnaire 답변 필요 |
| Privacy data collection | local save 중심, 실제 SDK 미연결 | 실제 SDK 추가 시 재작성 |
| Support URL | 없음 | 사용자가 제공 |
| Privacy policy URL | 없음 | 사용자가 제공 |
| Ads/IAP | 현재 실제 SDK 미연결 | 실제 SDK/상품 ID 결정 시 metadata 갱신 |
| Screenshot set | iPhone 5장, Android 5장 후보 | 실제 store upload 전 simulator/device 재확인 |
| Feature graphic | `google-play-feature-graphic.png` 후보 | final art approval 필요 |
| App icon/splash | `platform-assets/` 후보 | final art/legal approval 필요 |
| Final art rights | 자체 제작 후보 기준 | 권리/소유권 확인 필요 |
| Android debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` | physical device QA 필요 |
| Android local signed release APK | `android/app/build/outputs/apk/release/app-release.apk` | local rehearsal only, production key 필요 |
| Android local signed release AAB | `android/app/build/outputs/bundle/release/app-release.aab` | Google Play upload에는 production upload key / Play Console setup 필요 |
| iOS shell | `ios/App/App.xcworkspace` | Xcode platform component, signing, provisioning 필요 |

## Not Included Yet

- Apple/Google developer account data
- Final bundle/package id approval
- Pricing/availability
- Real IAP product metadata
- Real ad SDK disclosures
- Privacy URL/support URL
- Age rating questionnaire final answers
- Export compliance answers
- Legal owner name and contact data
- Physical device QA results
- Production Android upload keystore / iOS signing data
- Google Play App Signing enrollment
- Physical device QA results
- Matching Xcode iOS platform/CoreSimulator component for simulator/native iOS build

## 판정

Public copy와 screenshot/feature graphic 후보는 준비됐고, RC-16에서 Android local signed release APK/AAB 생성까지 확인됐다. 실제 store upload metadata package는 사용자 계정/URL/법적 답변/production signing/Play App Signing/실기기 QA를 받은 뒤 확정해야 한다. RC-16은 제출 준비 패키지 정리와 local release signing rehearsal 상태이며 실제 업로드 완료가 아니다.
