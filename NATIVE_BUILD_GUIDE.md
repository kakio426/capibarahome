# Native Build Guide

기준일: 2026-05-08

## 현재 준비 상태

Capacitor 설정과 npm scripts는 준비되어 있다.

- Config: `capacitor.config.ts`
- Web output: `dist`
- App name placeholder: `카피바라 집사기`
- Bundle/package id placeholder: `com.capybarabutler.game`
- Sync command: `npm run cap:sync`

현재 iOS/Android native platform folders는 생성하지 않았다. 실제 signing/provisioning, bundle id 확정, Xcode/Android Studio 제출 설정 없이 native folders를 커밋하면 이후 수정 비용이 커질 수 있어 현재 RC에서는 readiness 문서화와 `cap sync` 검증까지만 수행한다.

## RC-8/RC-12 WebView Readiness

- `index.html` viewport는 `viewport-fit=cover`를 사용한다.
- CSS는 `--safe-top`, `--safe-bottom`, `100dvh`, `touch-action: manipulation`, `overscroll-behavior`를 적용한다.
- input/textarea는 iOS 자동 zoom 방지를 위해 16px 이상으로 유지한다.
- RC-12 layout regression은 save export/import textarea font-size가 16px 이상인지 자동 확인한다.
- RC-12 content shell은 하단 safe-area/tab dock을 고려한 bottom padding과 scroll-padding을 사용한다.
- 저장은 interval/action 외에 `beforeunload`, `pagehide`, hidden `visibilitychange`에서 silent save를 수행한다.
- localStorage 접근이 실패하면 앱 crash 대신 volatile session fallback 또는 safe failure로 처리한다.
- WebAudio/vibration은 unsupported/permission failure에서 safe no-op으로 유지한다.

주의: 위 항목은 WebView 준비 코드이며 실제 iOS/Android persistence, notch, gesture navigation, audio gesture behavior는 native project 생성 후 기기에서 확인해야 한다.

## Native 프로젝트 생성 절차

사용자가 bundle id, signing, 개발자 계정을 확정한 뒤 실행한다.

```bash
npm install
npm run build
npx cap add ios
npx cap add android
npm run cap:sync
```

그 다음:

```bash
npm run cap:open:ios
npm run cap:open:android
```

## Icon/Splash 연결

현재 초안 소스:

- App icon candidate: `src/assets/raster/release/app-icon-candidate.png`
- Splash candidate: `src/assets/generated/release/splash-final.svg`
- Store screenshot frame candidate: `src/assets/generated/release/store-screenshot-frame-final.svg`
- Store key visual candidate: `src/assets/raster/release/store-key-visual.png`

RC-8부터 app icon/store key visual/main capybara crop 후보는 runtime `dist` bundle에 넣지 않는다. 파일은 source/release candidate로 유지하고, store screenshot Playwright flow가 source file을 직접 읽는다.

제출 전 해야 할 일:

- iOS app icon PNG set 생성
- Android adaptive icon foreground/background 생성
- Android round icon 확인
- Splash screen 이미지와 배경색 확정
- App Store / Play Console screenshot 규격별 PNG export

세부 export gap과 공식 문서 링크는 `APP_ICON_SPLASH_EXPORT.md`와 `RC12_SUBMISSION_READINESS_AUDIT.md`에 분리했다.

## Store 제출 전 사용자가 제공해야 하는 항목

- Apple Developer Program 계정
- Google Play Console 계정
- 최종 bundle id/package name
- iOS signing certificate와 provisioning profile
- Android signing key/keystore
- privacy policy URL
- support URL
- 실제 IAP product id, 가격, 국가별 판매 설정
- 실제 rewarded ad SDK 선택 시 데이터 처리/ATT 답변

## 현재 release blocker

실제 스토어 제출 자체는 계정, 서명, 정책 URL, 실제 SDK/상품 설정이 없어 수행하지 않았다. 이는 `RELEASE_BLOCKERS.md`에 외부 blocker로 기록한다.
