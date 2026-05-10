# 카피바라 집사기

모바일 브라우저 우선으로 만든 Vite + React + TypeScript 방치형 클리커 게임입니다. 유저는 카피바라 집사가 되어 귤을 모으고, 성장을 구매하고, 환생으로 황금 나뭇잎 영구 배율을 얻습니다. RC20 기준 UI는 기존 장식형 카드 HUD를 제품 관점에서 재부팅해 밝은 귤 정원, 큰 터치 장면, 한 번에 하나의 다음 행동, 명확한 보상 피드백을 우선합니다.

## 실행

```bash
npm install
npm run dev
npm run build
npm test
npm run test:watch
npm run test:e2e
npm run cap:sync
```

개발 서버 기본 주소는 `http://127.0.0.1:5173/`입니다.

## 주요 기능

- RAF 기반 게임 루프와 delta clamp
- 터치/클릭 즉시 귤 수익 지급
- EPS 자동 생산
- config 기반 업그레이드/시설 30종, 성장 구간 5개
- achievement/collection 40종과 저장되는 achievement state
- 퀘스트 50종, 장식 25종, 카피바라 동료 친밀도/고유 passive ability와 별도 앨범 화면
- 40개 업적 보상 claim UX: 귤, 황금 나뭇잎, 장식 해금, 친밀도, 영구 multiplier
- 5개 성장 구간별 unlock toast, 보상 설명, 홈 장기 목표
- 직접 제작한 SVG auxiliary asset pack 253개와 핵심 raster PNG art pack 15개 연결
- v2 raster home/prestige/shop/offline/store key visual 후보와 RC20 bright citrus garden UI, store screenshot 후보 10장
- RC20 product reboot: `MobileGameShell`, `TopHud`, `BottomNav`, `GameButton`, `GamePanel`, `RewardSheet`, `ActionToast`, `RewardBurst` 기반의 모바일 게임 UI 구조
- RC20 first-session flow: 홈의 큰 카피바라/귤 터치 장면, 한 가지 next-action CTA, 성장 구매 전후 delta, reward sheet screenshot evidence
- RC-4 interaction polish: upgrade workbench/shelf UI, settings ledger/drawer, save vault modal, custom settings switches, save export copy action, modal/toast/card HUD polish
- RC-5 CSS component pass: `layout.css` import manifest, `shell/hud/screens/effects` split, reusable `.ui-*` game skin classes, upgrade/settings/save/album polish
- RC-6 product feel pass: quick-buy `1개/10개/최대`, purchase/offline/prestige/album reveal, touch variation
- RC-7 retention systems pass: 20시간 daily reward, D1/D3/D7 복귀 배지, 첫 환생 이후 goal chain, save version 5 migration
- RC-8 release bug bash: save v5/WebView/pagehide/localStorage fallback, daily+offline same-session regression, quick-buy/prestige reload regression, long-session stress, bundle asset audit
- RC-12 submission readiness/layout pass: critical text clipping, CTA/tab overlap, modal action clickability, store screenshot public copy guard, icon/splash/metadata readiness docs
- RC-13 native shell/submission prep pass: Android Capacitor shell, platform icon/splash candidates, strengthened layout/store dimension guards, final UI defect sweep
- RC-3 playtest pass: 첫 환생 33분 목표, 1/5/15/30/120분 밸런스 checkpoint, 실제 5분권 E2E
- `STORY_BIBLE.md`와 연결된 8마리 카피바라 캐릭터/짧은 인게임 대사
- 환생과 황금 나뭇잎 영구 배율
- localStorage 저장/로드, checksum, Base64 export/import, migration, retention claim state
- localStorage unavailable safe fallback, `pagehide`/hidden visibility save
- 오프라인 보상 모달
- 설정, 튜토리얼 3단계, 이펙트 on/off, file-ready audio slot과 WebAudio fallback/mute 연결
- 광고 보상 mock, IAP mock provider 인터페이스
- `?debug=1`에서만 열리는 개발 모드 전용 디버그 패널
- Vitest 기반 시뮬레이션 테스트
- Playwright 기반 모바일 브라우저 플로우 테스트
- Capacitor iOS/Android 패키징 준비 config
- `NATIVE_BUILD_GUIDE.md`, `DEVICE_QA_CHECKLIST.md`, `APP_ICON_SPLASH_EXPORT.md`, `STORE_METADATA_PACKAGE.md`, `ASSET_CREDITS.md`, `AUDIO_ASSET_PLAN.md`
- `ART_DIRECTION.md`, `ASSET_PRODUCTION_BRIEF.md`, `VISUAL_QA.md`
- balance simulation, `RETENTION_PLAN.md`, `RC7_RETENTION_SYSTEM_AUDIT.md`, `RC8_RELEASE_CANDIDATE_AUDIT.md`, `RC12_SUBMISSION_READINESS_AUDIT.md`, `RC13_SUBMISSION_AUDIT.md`, `RC13_NATIVE_READINESS_AUDIT.md`, `RC13_VISUAL_REGRESSION_AUDIT.md`, `UI_LAYOUT_DEFECT_AUDIT.md`, `BUNDLE_ASSET_AUDIT.md`, source budget report
- `PLAYTEST_REPORT.md` 기반 RC-3 bug bash와 store screenshot 재점검
- expanded completion audit

## 기본 가정

- IAP 샌드박스 보상은 개발 모드에서만 UI 버튼으로 실행합니다.
- 경쟁작 벤치마크는 공식 스토어/공식 사이트의 공개 정보를 구조적 품질 기준으로만 참고했고, 에셋/문구/UI는 복제하지 않았습니다.
- 현재 visual은 프로젝트 내부 수제 SVG auxiliary pack + generated v2 raster core art 후보이며, commissioned store art로 교체할 수 있도록 registry/component 구조를 둡니다. 스토어 후보 이미지는 `store-screenshots/`에 있습니다.
- 현재 효과음은 file-ready slot을 갖춘 WebAudio fallback입니다. 최종 음원 파일과 라이선스는 사용자가 제출 전 확정해야 합니다.
- E2E는 Playwright로 실행하며, 실제 유저 플로우와 debug/cheat 플로우를 분리했습니다.
- Base64는 저장 코드 전달 형식일 뿐 보안 암호화로 설명하지 않습니다.
- 실제 Apple/Google 계정, 인증서, 프로비저닝, 스토어 업로드는 수행하지 않았습니다.
- 구현 규모는 `SOURCE_BUDGET_REPORT.md`에서 generated/config/docs를 제외한 handwritten 기준으로 재검증했습니다.

## 화면

하단 탭은 `홈`, `성장`, `환생`, `앨범`, `상점`, `설정`으로 구성됩니다. `성장` 탭은 접근성 이름을 `업그레이드`로 유지합니다. 데스크톱에서도 중앙에 모바일 게임 패널로 표시되고, 모바일에서는 전체 화면 패널로 동작합니다.

## Capacitor

`capacitor.config.ts`와 scripts는 준비되어 있습니다. Android shell은 생성되어 있고 RC15/RC16에서 debug/release rehearsal build를 검증했습니다. iOS shell은 `npx cap add ios`와 sync까지 검증했지만, 실제 simulator/device build와 제출에는 Xcode platform, signing, Apple Developer 계정이 필요합니다. 플랫폼 asset 후보와 Google Play feature graphic 후보는 `npm run export:assets`로 `platform-assets/`와 `store-screenshots/`에 생성합니다.

```bash
npm run export:assets
npm run cap:sync
```

새 환경에서 iOS project를 만들려면 CocoaPods 설치 후 `npx cap add ios`를 실행해야 합니다.

제출 전 체크리스트는 `RELEASE_CHECKLIST.md`를 기준으로 확인합니다.

## RC20 Product Reboot Notes

- 기존 RC 문서의 P1 없음 선언은 RC20 제품 만족도의 완료 근거로 사용하지 않습니다.
- RC20은 game/core/state/systems/save/balance를 보존하고 `src/ui/layout`, `src/ui/primitives`, `src/ui/feedback`, `src/ui/styles/theme.css`, `components.css`, `app.css`를 추가해 표현 계층을 재정리했습니다.
- 실제 Android 폰 screenshot/video는 아직 `device-qa/incoming/`에 없으므로, 최종 제품 만족 판정은 새 APK 설치 후 물리 기기 재확인이 필요합니다.
