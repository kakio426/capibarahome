# RC-14 Independent Rescore

기준일: 2026-05-09

점수는 자동 테스트 개수나 문서량이 아니라 최신 screenshot, DOM layout checks, native command evidence, build output 기준이다. 실제 물리 기기 QA와 store upload는 수행하지 않았다.

## Scorecard

| 항목 | 점수 | 판정 | 근거 |
| --- | ---: | --- | --- |
| Android native readiness | 7.4 | external blocker | Android shell/config/icon 후보는 있음. `npx cap doctor`는 Android OK. `./gradlew assembleDebug`/`lint`는 Java runtime 미설치로 실패 |
| iOS readiness | 6.8 | external blocker | Xcode는 있으나 CocoaPods 미설치로 `npx cap add ios` 실패, `ios/` folder 없음 |
| Bundle/asset readiness | 8.2 | P1 없음, P2 raster payload | Vite large chunk warning 제거, largest JS 188.60K, feature graphic 후보 생성. Runtime PNG 14M은 P2 |
| Physical QA readiness | 8.0 | packet ready, execution external | `RC14_DEVICE_QA_PACKET.md`, `DEVICE_QA_RESULTS_TEMPLATE.md` 작성. 실제 기기 실행은 미수행 |
| Store metadata readiness | 8.0 | P1 없음, external inputs | public copy/screenshot order/feature graphic 후보 정리. URL/account/legal inputs 필요 |
| Store screenshots | 8.2 | P1 없음 | iPhone/Android 10장 + feature graphic guard, public forbidden copy guard |
| Home | 8.1 | P1 없음 | `360x740-home.png`, `390x844-home.png`; CTA/tab 겹침 없음 |
| Upgrades | 8.1 | P1 없음 | `360x740-upgrades-quick-buy.png`, `390x844-upgrades-quick-buy.png`; quick-buy shelf 유지 |
| Daily/milestone | 8.0 | P2 polish | reward sheet와 milestone board는 조작 가능/가독성 통과, richer reward animation은 P2 |
| Save/settings modal | 8.0 | P3 density | save textarea 16px, modal action clickable. export code density는 기능상 남음 |

Internal UI/product-quality average: 8.1.

Native/submission readiness average including external blockers: 7.8.

## P1 여부

내부 UI/layout/store screenshot P1: 발견하지 않음.

External/native blocker:

- Java runtime 미설치로 Android Gradle build 미완료
- CocoaPods 미설치로 iOS shell 미생성
- signing/provisioning/keystore/URLs/legal/device QA 부재

## 남은 P2/P3

- Runtime PNG payload 14M의 WebP/AVIF 또는 lossless compression 검토
- physical iPhone/Android safe-area, storage persistence, audio gesture QA
- Android back button UX 정책 확정
- final adaptive icon foreground/background art
- final store feature graphic art approval
- real ad/IAP SDK 추가 시 privacy/ATT/review metadata 재검토

## 판정

RC-14는 내부 UI/layout과 bundle warning 기준으로 한 단계 개선됐다. 그러나 native release build와 실제 store submission은 환경/서명/계정/실기기 QA가 필요하므로 "제출 준비 패키지 정리"로만 표현한다.
