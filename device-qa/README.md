# Device QA Evidence Intake

이 폴더는 실제 Android/iOS 기기에서 찍은 UI/UX 증거를 모으는 곳이다.

현재 자동 Playwright/DOM/Android build 기준 내부 P1은 발견되지 않았지만, active goal은 실제 기기에서 보인 깨짐 해결이므로 물리 기기 screenshot/video가 들어오기 전에는 완료로 보지 않는다.

## Folders

- `incoming/`: 사용자가 새로 넣은 원본 screenshot/video
- `annotated/`: 문제 위치를 표시한 분석본
- `fixed/`: 수정 후 재촬영한 retest evidence

## Android ADB Helper

Android 기기를 USB debugging으로 연결한 뒤:

```bash
npm run device:qa:devices
npm run device:qa:install
npm run device:qa:launch
npm run device:qa:info
```

각 화면으로 직접 이동한 뒤:

```bash
npm run device:qa:capture -- home
npm run device:qa:capture -- upgrades-quick-buy
npm run device:qa:capture -- save-modal
npm run device:qa:capture -- daily-reward
npm run device:qa:capture -- milestone-board
npm run device:qa:capture -- prestige-result
npm run device:qa:capture -- settings
npm run device:qa:record -- upgrades-scroll 12
npm run device:qa:record -- tap-and-modal-flow 15
```

## Minimum Evidence Set

반드시 필요한 화면:

- Home first viewport
- Upgrade quick-buy first and second card
- Save code vault modal
- Daily reward sheet
- D1/D3/D7 milestone board
- Prestige result modal
- Offline reward modal
- Settings
- Bottom tab/safe-area area
- Android font scale 110% or 120% if the device supports it

## What Counts As P1

- 한글 글자 깨짐 또는 위아래 잘림
- 가격/레벨/보상 숫자 잘림
- CTA가 bottom tab 또는 gesture area에 가림
- modal 확인/닫기 버튼 클릭 불가
- 버튼 내부 텍스트 눌림/겹침
- 저장 코드가 화면을 밀어냄
- 실제 Android WebView에서 Playwright screenshot과 다른 심각한 font/layout 깨짐

캡처를 추가한 뒤에는 해당 파일 경로를 `DEVICE_QA_RESULTS_TEMPLATE.md`에 기록한다.
