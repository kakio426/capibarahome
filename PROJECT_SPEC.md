# 카피바라 집사기 Production Release Candidate Master Spec

## 0. 최상위 원칙

이 문서는 “카피바라 집사기”를 단순 MVP가 아니라 모바일 idle/clicker 경쟁작과 비교 가능한 production release candidate 수준으로 완성하기 위한 명세다.

절대로 빠지는 과정이 있어서는 안 된다. 기존 마스터 프롬프트의 0-26번 요구사항은 모두 유효하며, 구현 전 `REQUIREMENTS_TRACE.md`에 원본 요구사항 전체를 매핑한다.

매핑 규칙:
- 원본 각 섹션/요구사항을 `완료 / 부분 완료 / 미완료 / 검증 불가`로 추적한다.
- 매핑되지 않은 원본 요구사항은 자동으로 P0 이슈다.
- 문서상 완료 선언은 근거가 아니다.
- 실제 코드, 테스트, 브라우저 화면, 스크린샷, 빌드 산출물만 완료 근거로 인정한다.

## 1. 역할

너는 다음 역할을 동시에 수행한다.

- 시니어 게임 클라이언트 개발자
- 방치형 게임 밸런스 디자이너
- 모바일 UI/UX 디자이너
- QA 엔지니어
- release readiness 담당자

목표는 웹/모바일 브라우저에서 실행 가능한 귀여운 톤의 카피바라 방치형 클리커 게임 “카피바라 집사기”를 완성하는 것이다.

## 2. 제품 품질 기준

목표 품질은 “상용 게임 프로토타입”을 넘어 “스토어 제출 후보 release candidate”다.

단, 실제 App Store / Google Play 제출 완료라고 주장하지 않는다. 개발자 계정, signing, privacy policy URL, 실제 SDK, 실제 기기 QA는 사용자가 제공해야 한다.

완료 기준:
- 빌드 에러 0개
- TypeScript 에러 0개
- 자동 테스트 통과
- Playwright E2E 통과
- 주요 모바일 해상도 screenshot QA 통과
- 신규 유저 -> 터치 -> 업그레이드 -> 저장/로드 -> 오프라인 보상 -> 환생 -> export/import -> 설정/튜토리얼 -> 광고/IAP mock 플로우 검증
- 경쟁작 대비 P0/P1 gap 없음
- 남은 리스크는 `QA_REPORT.md`, `RELEASE_BLOCKERS.md`에 기록

## 3. 경쟁작 벤치마크

구현 전에 `COMPETITOR_BENCHMARK.md`를 작성한다.

최소 비교 대상:
- Cats & Soup
- Egg, Inc.
- AdVenture Capitalist
- Cookie Clicker

비교 항목:
- 첫 화면 인상
- 핵심 터치/idle 루프 손맛
- 숫자 성장 가독성
- 업그레이드 UI
- 장기 목표/환생 구조
- 오프라인 보상 UX
- 수집/꾸미기/보상감
- 상점/광고/IAP 구조
- 모바일 레이아웃 polish
- 튜토리얼/온보딩
- 저장/복구 신뢰성
- 성능/애니메이션 안정성
- 앱스토어 제출 준비도

경쟁작을 복제하지 않는다. 에셋, 문구, UI를 베끼지 말고 구조적 품질 기준만 벤치마크한다.

## 4. 고정 기술 스택

- Framework: Vite + React + TypeScript
- State: Zustand 또는 lightweight external store
- Styling: CSS Modules 또는 plain CSS
- Test: Vitest
- E2E: Playwright
- Number System: BigNumberLite 직접 구현 또는 decimal 계열
- Packaging prep: 필요 시 Capacitor
- Target: 모바일 브라우저 우선, desktop에서는 중앙 모바일 패널

기본 viewport:
- 360x740
- 390x844
- 430x932
- 1280x900 desktop centered panel

## 5. 필수 산출물

실행 파일:
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `src/main.tsx`
- `src/App.tsx`

문서:
- `README.md`
- `DEVELOPER_GUIDE.md`
- `BALANCE_GUIDE.md`
- `SAVE_SCHEMA.md`
- `QA_REPORT.md`
- `REQUIREMENTS_TRACE.md`
- `SPEC_COVERAGE.md`
- `COMPETITOR_BENCHMARK.md`
- `PRODUCTION_GAP_BACKLOG.md`
- `ART_DIRECTION.md`
- `ASSET_PRODUCTION_BRIEF.md`
- `VISUAL_QA.md`
- `PERFORMANCE_QA.md`
- `RELEASE_CHECKLIST.md`
- `RELEASE_BLOCKERS.md`
- `STORE_LISTING_DRAFT.md`
- `PRIVACY_NOTES.md`

## 6. 필수 폴더 구조

기존 원본 명세의 `src/` 구조를 유지한다.

추가로 아래를 둔다.

```txt
e2e/
  new-user-flow.spec.ts
  upgrade-flow.spec.ts
  save-import-export.spec.ts
  offline-reward.spec.ts
  prestige-flow.spec.ts
  settings-tutorial.spec.ts
  monetization-mock.spec.ts
  debug-cheat-flow.spec.ts
  visual-regression.spec.ts

qa-screenshots/
docs/
```

## 7. 핵심 게임 요구사항

게임 제목: 카피바라 집사기

재화:
- 일반 재화: 귤
- 영구 재화: 황금 나뭇잎
- 광고 버프: 귤 수확 축제

반드시 구현:
- 터치 수익
- EPS 자동 수익
- 업그레이드 5종 이상
- 환생
- 저장/로드
- 오프라인 보상
- export/import
- saveVersion migration
- 설정
- 튜토리얼
- 광고/IAP mock provider
- analytics mock
- debug 도구
- 모바일 UI polish

## 8. 핵심 수식

모든 수식은 `GameConfig.ts` 또는 `BalanceConfig.ts`에서 중앙 관리한다.

```txt
tapGain = baseTapGain x tapUpgradeMultiplier x prestigeMultiplier x adMultiplier
eps = sum(generatorBaseEPS x generatorLevel x generatorMultiplier)
      x globalMultiplier
      x prestigeMultiplier
      x adMultiplier
cost(level) = baseCost x growthRate ^ level
goldenLeavesGain = floor(sqrt(totalLifetimeOranges / prestigeRequirement))
prestigeMultiplier = 1 + goldenLeaves x goldenLeafPower
offlineReward = epsAtLastSave x cappedOfflineSeconds x offlineEfficiency
```

## 9. BigNumber 요구사항

일반 number만으로 장기 성장 수치를 처리하지 않는다.

`BigNumberLite` 필수 메서드:
- `add`
- `subtract`
- `multiply`
- `divide`
- `pow`
- `compare`
- `gte`
- `lt`
- `floor`
- `toNumberSafe`
- `toString`
- `format`

표기:
- `999`
- `1.23K`
- `45.6M`
- `7.89B`
- `1.23e45`

## 10. 개발 마일스톤

각 마일스톤은 다음 순서를 따른다.

1. 구현
2. 관련 테스트 작성
3. 테스트 실행
4. 버그 수정
5. 문서 반영
6. 스크린샷 또는 QA 근거 기록
7. 다음 단계 진행

### M0. 프로젝트 초기화

- Vite + React + TypeScript 세팅
- 기본 폴더 구조 생성
- `npm run dev`
- `npm run build`
- `npm test`
- 모바일 중앙 정렬 레이아웃
- debug 도구

DebugManager:
- 귤 지급
- 황금 나뭇잎 지급
- 저장 초기화
- 강제 저장
- 강제 오프라인 시뮬레이션
- 튜토리얼 초기화
- 광고 버프 적용
- 환생 가능 상태 만들기

### M1. 경쟁작 벤치마크와 제품 방향

- `COMPETITOR_BENCHMARK.md`
- `PRODUCTION_GAP_BACKLOG.md`
- P0/P1 gap 정의
- 카피바라 집사기의 차별점 정의

### M2. 아키텍처와 밸런스 중앙화

- `GameConfig.ts`
- `BalanceConfig.ts`
- `TutorialConfig.ts`
- `AssetConfig.ts`
- `MonetizationConfig.ts`
- `BigNumberLite.ts`
- `formatNumber.ts`
- `gameMath.ts`

테스트:
- 비용 증가
- 터치 수익
- EPS
- BigNumber
- 숫자 포맷

### M3. 코어 게임 루프

- RAF 기반 `GameLoop.ts`
- delta time 계산
- delta clamp
- visibility hidden 처리
- React re-render 최소화
- 터치/클릭 즉시 반응
- EPS와 UI 표시 일치

단순 `setInterval` 메인 게임 루프 금지.

### M4. 디자인 시스템과 에셋 파이프라인

- `tokens.css`
- `global.css`
- `layout.css`
- Button, Panel, Modal, Toggle, CurrencyDisplay, ProgressBar
- `AssetManager.ts`
- `builtinAssets.ts`
- hand-authored generated SVG registry
- 카피바라/귤 visual
- floating text
- particle cap
- 이펙트 on/off

경쟁작 대비 “개발자 UI처럼 보임”은 P1 이슈다.

### M5. 업그레이드 시스템

- 터치 업그레이드
- 자동 생산 시설
- 전체 생산량 증가 업그레이드
- 구매 가능/불가능 상태
- 비용 증가
- 레벨 표시
- 효과 표시
- 구매 후 즉시 갱신
- 음수 재화 방지

### M6. 환생 시스템

- 환생 가능 여부
- 예상 황금 나뭇잎
- 영구 배율
- 확인 모달
- 환생 실행
- 일반 진행도 초기화
- 영구 재화 유지
- 환생 직후 save/load 일관성

### M7. 저장/오프라인/import/export

저장 방식:

```txt
JSON payload
-> saveVersion
-> checksum
-> Base64 encoding
-> localStorage
```

Base64를 암호화라고 설명하지 않는다.

필수:
- 자동 저장
- 주요 액션 저장 예약
- beforeunload 저장
- 오프라인 보상 모달
- checksum 검증
- 손상 save 안전 실패
- migration
- export/import UI

### M8. 설정/튜토리얼/사운드

설정:
- 이펙트 on/off
- 효과음 음소거
- 배경음 음소거
- 진동 on/off
- 숫자 표기 방식
- 튜토리얼 다시 보기
- 저장 데이터 초기화

튜토리얼:
- 3단계
- 처음 유저 자동 표시
- 다음/이전/건너뛰기
- 완료 저장
- 특정 UI 강조
- 모바일에서 잘리지 않음

### M9. 수익화 mock interface

- `AdsManager.ts`
- `IAPManager.ts`
- `MonetizationEventManager.ts`
- provider interface
- rewarded ad mock
- IAP mock
- 성공/실패 이벤트
- analytics 기록
- 실제 결제로 오해될 문구 금지

### M10. QA, E2E, 성능

Vitest:
- balance
- upgrade
- prestige
- save
- offline
- tutorial
- settings
- monetization
- game loop

Playwright:
- 실제 유저 플로우는 debug shortcut 미사용
- debug는 별도 `debug-cheat-flow.spec.ts`에서만 사용
- 주요 모바일 viewport screenshot 생성

성능:
- 60fps에 가깝게 동작
- particle/floating text cap
- RAF 중복 생성 없음
- listener cleanup
- hidden tab 최적화

### M11. 문서화

- README
- DEVELOPER_GUIDE
- BALANCE_GUIDE
- SAVE_SCHEMA
- QA_REPORT
- VISUAL_QA
- PERFORMANCE_QA
- RELEASE_CHECKLIST
- RELEASE_BLOCKERS
- STORE_LISTING_DRAFT
- PRIVACY_NOTES

### M12. Release hardening pass

최소 3회 polish pass를 수행한다.

1. Visual polish pass
2. Economy/balance pass
3. QA/reliability pass

각 pass마다:
- 경쟁작 대비 gap 확인
- 코드 수정
- screenshot 확인
- build/test/e2e 실행
- 문서 갱신

## 11. UI 필수 화면

하단 탭:
- 홈
- 업그레이드
- 환생
- 상점
- 설정

홈:
- 현재 귤
- 황금 나뭇잎
- EPS
- 터치당 수익
- 카피바라 터치 영역

업그레이드:
- 터치 업그레이드
- 생산 시설
- 구매 상태

환생:
- 누적 귤
- 환생 진행률
- 예상 황금 나뭇잎
- 현재 영구 배율
- 환생 버튼

상점:
- 광고 보상
- 광고 버프 남은 시간
- mock IAP 상품

설정:
- 토글
- export/import
- 저장 초기화
- 튜토리얼 다시 보기

## 12. UX 필수 디테일

- 구매 성공 반응
- 구매 실패 안내
- 숫자 증가 부드럽게 표시
- 환생 가능 강조
- 오프라인 보상 즉시 모달
- 설정 즉시 적용
- import 실패 친절한 오류
- 위험 행동 확인 모달
- 모바일 버튼 터치 영역 44px 이상

## 13. 에러 처리

앱이 죽으면 안 되는 상황:
- localStorage 실패
- 손상 save
- saveVersion 불일치
- import 문자열 오류
- 숫자 파싱 실패
- 광고 mock 실패
- IAP mock 실패
- config 누락
- BigNumber edge case

## 14. 금지 사항

- 게임 수치 컴포넌트 하드코딩
- 메인 게임 루프 `setInterval`
- 일반 number만으로 장기 수치 처리
- saveVersion 없는 저장
- Base64를 암호화라고 설명
- 광고/IAP와 게임 코어 강결합
- 환생 시 영구 재화 초기화
- import 실패 시 crash
- 무제한 particle
- 테스트 없이 다음 마일스톤 진행
- 문서 없이 기능만 구현
- 경쟁작 에셋/문구/UI 복제

## 15. 최종 검증 명령

반드시 실행:

```bash
npm run build
npm test
npm run test:e2e
```

Capacitor를 추가한 경우:

```bash
npm run cap:sync
```

## 16. 최종 보고

최종 응답에는 반드시 포함한다.

- 완료된 기능
- 경쟁작 대비 좋아진 점
- 경쟁작 대비 아직 부족한 점
- 테스트 결과
- E2E 결과
- 시각 QA 결과
- 주요 파일 구조
- P0/P1 해결 내역
- 남은 P2/P3
- 실제 앱스토어 제출 전 사용자가 해야 할 일
- 남은 리스크

질문이 필요한 부분은 합리적인 기본값으로 결정하고 진행하라. 단, 결정한 가정은 `README.md`, `QA_REPORT.md`, `REQUIREMENTS_TRACE.md`에 기록하라.
