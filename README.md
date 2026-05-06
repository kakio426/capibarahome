# 카피바라 집사기

모바일 브라우저 우선으로 만든 Vite + React + TypeScript 방치형 클리커 게임입니다. 유저는 카피바라 집사가 되어 귤을 모으고, 업그레이드를 구매하고, 환생으로 황금 나뭇잎 영구 배율을 얻습니다.

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
- v2 raster home/prestige/shop/offline/store key visual 후보, wood/parchment/orange game HUD skin, store screenshot 후보 10장
- RC-4 interaction polish: custom settings switches, save export copy action, modal/toast/card HUD polish
- RC-3 playtest pass: 첫 환생 33분 목표, 1/5/15/30/120분 밸런스 checkpoint, 실제 5분권 E2E
- `STORY_BIBLE.md`와 연결된 8마리 카피바라 캐릭터/짧은 인게임 대사
- 환생과 황금 나뭇잎 영구 배율
- localStorage 저장/로드, checksum, Base64 export/import, migration
- 오프라인 보상 모달
- 설정, 튜토리얼 3단계, 이펙트 on/off, file-ready audio slot과 WebAudio fallback/mute 연결
- 광고 보상 mock, IAP mock provider 인터페이스
- `?debug=1`에서만 열리는 개발 모드 전용 디버그 패널
- Vitest 기반 시뮬레이션 테스트
- Playwright 기반 모바일 브라우저 플로우 테스트
- Capacitor iOS/Android 패키징 준비 config
- `NATIVE_BUILD_GUIDE.md`, `DEVICE_QA_CHECKLIST.md`, `ASSET_CREDITS.md`, `AUDIO_ASSET_PLAN.md`
- `ART_DIRECTION.md`, `ASSET_PRODUCTION_BRIEF.md`, `VISUAL_QA.md`
- balance simulation과 source budget report
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

`capacitor.config.ts`와 scripts는 준비되어 있습니다. 네이티브 프로젝트를 실제로 만들려면 사용자가 개발자 계정, 서명 정보, 로컬 Xcode/Android Studio 환경을 준비한 뒤 아래를 실행합니다.

```bash
npx cap add ios
npx cap add android
npm run cap:sync
```

제출 전 체크리스트는 `RELEASE_CHECKLIST.md`를 기준으로 확인합니다.
