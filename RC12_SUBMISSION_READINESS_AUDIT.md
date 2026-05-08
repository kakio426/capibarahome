# RC-12 Submission Readiness Audit

기준일: 2026-05-08

## 결론

현재 상태는 "스토어 제출 준비 패키지 정리 완료"다. 실제 App Store / Google Play 제출 완료가 아니다.

완료된 것:

- Web build 산출물 생성
- Capacitor sync 가능한 web asset 준비
- Store listing draft와 metadata package 정리
- iPhone/Android store screenshot 후보 10장 생성
- UI layout regression 자동 검사 추가
- 주요 viewport screenshot 재생성
- 내부 P1 layout defect 수정

아직 사용자가 제공해야 하는 것:

- Apple Developer Program 계정
- Google Play Console 계정
- 최종 bundle id/package name 승인
- iOS signing certificate/provisioning profile
- Android signing key/keystore
- privacy policy URL
- support URL
- age rating / export compliance 답변
- 실제 광고/IAP SDK와 상품 ID를 사용할지 결정
- final app icon/splash/store art 권리 확인
- 물리 iPhone/Android QA

## 공식 규격 확인 기준

- Apple App Store Connect screenshot specifications: https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/
- Apple App Store Connect app icon workflow: https://developer.apple.com/help/app-store-connect/manage-app-information/add-an-app-icon
- Google Play preview asset requirements: https://support.google.com/googleplay/android-developer/answer/9866151

플랫폼 규격은 제출 시점에 다시 확인해야 한다. 이 문서는 2026-05-08에 공식 문서를 확인한 기준으로 작성했다.

## Current Package

| 항목 | 상태 | 근거 |
| --- | --- | --- |
| Web build | 완료 | `npm run build` passed. Vite large chunk warning은 P2 |
| Unit tests | 완료 | `npm test`: 23 files / 502 tests passed |
| E2E | 완료 | `npm run test:e2e`: 36 passed, RC-12 targeted layout/store/visual specs included |
| Capacitor config | 완료 | `capacitor.config.ts`, `webDir: dist`, app id placeholder `com.capybarabutler.game` |
| Store screenshots | 완료 후보 | `store-screenshots/iphone-*.png`, `store-screenshots/android-*.png` |
| Store metadata | 완료 후보 | `STORE_METADATA_PACKAGE.md`, `STORE_LISTING_DRAFT.md` |
| Privacy notes | 완료 후보 | local save/mock analytics/current SDK caveat in `PRIVACY_NOTES.md` |
| Icon/splash candidate | 부분 완료 | source candidates exist, platform export not done |
| Native platform folders | 미완료 | 계정/signing/bundle id 확정 전 생성 보류 |

## Store Screenshot Candidate Dimensions

| 파일군 | 생성 크기 | 상태 |
| --- | ---: | --- |
| `store-screenshots/iphone-*.png` | 1290 x 2796 | iPhone 6.7형 portrait 후보 |
| `store-screenshots/android-*.png` | 1080 x 1920 | Google Play phone screenshot 후보 |

Apple App Store Connect는 iPhone display class별 accepted screenshot size를 요구한다. 현재 iPhone 후보는 6.7형 portrait 후보 치수로 생성했다. 제출 직전 App Store Connect의 현재 accepted size와 실제 기기/시뮬레이터 capture 기준으로 다시 확인한다.

Google Play phone screenshot 후보는 1080 x 1920으로 생성했다. 최종 Play Console upload 전 PNG/JPEG format, file size, aspect/copy 정책을 다시 확인한다.

## Bundle / Asset

현재 build snapshot:

- `dist`: 15M
- `dist/assets`: 15M
- runtime PNG payload: 12 files / 약 14M
- JS chunk: `index-DvH7_6MF.js` 1.165M
- CSS: `index-pmQvQBpk.css` 77.69K

P2 유지:

- Vite large chunk warning
- PNG/WebP/AVIF 변환은 품질/Capacitor 호환성 검증 없이는 진행하지 않음
- route-level dynamic import는 가능하지만 RC-12 범위에서는 visual regression 리스크가 더 커서 보류

이미 해결된 점:

- runtime에 필요 없는 `store-key-visual.png`, `app-icon-candidate.png`, `main-capybara-character.png`는 RC-8에서 runtime registry에서 제외됨
- store screenshots와 QA screenshots는 committed evidence이며 runtime bundle에는 포함되지 않음

## RC-12 Layout Readiness

수정:

- content bottom safe padding/scroll-padding 증대
- save textarea 16px 보정
- visual screenshots viewport capture로 전환
- quick-buy screenshot framing 보정

검증:

- `npx playwright test e2e/layout-regression.spec.ts --reporter=line`: 4 passed
- `npx playwright test e2e/store-screenshot-pack.spec.ts --reporter=line`: 2 passed
- `npx playwright test e2e/visual-regression.spec.ts --reporter=line`: 4 passed

## 판정

내부 P1 layout/submission-readiness blocker는 현재 발견되지 않는다. 남은 것은 P2 성능 최적화 또는 외부 제출 준비 항목이다. 최종 명령 전체가 통과해야 RC-12 커밋 기준으로 확정한다.
