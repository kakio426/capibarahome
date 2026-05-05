# Art Failure Review

기준일: 2026-05-05

## 판정 기록

첫 raster pass는 실패로 간주한다. PNG 파일이 연결되어 있다는 사실은 완료 근거가 아니다. 390x844 screenshot을 기준으로 보면 핵심 일러스트 일부는 professional mobile game 방향에 가까워졌지만, 전체 화면의 첫인상은 여전히 rounded web app card, pale dashboard panel, CSS/SVG icon UI가 지배했다.

P0 visual defect 기준:
- 핵심 화면에서 흰 rounded card가 가장 먼저 보이는 경우
- 버튼/탭/재화 표시가 기본 웹 버튼이나 pill chip처럼 보이는 경우
- 업그레이드/상점/설정이 game HUD가 아니라 SaaS list/card layout처럼 읽히는 경우
- 핵심 아트가 화면 배경/장소로 작동하지 못하고 카드 안 이미지처럼 갇히는 경우
- SVG icon이 핵심 감정/캐릭터/보상 이미지를 대신하는 경우

기준 screenshot:
- Home: `qa-screenshots/390x844-home.png`
- Upgrade: `qa-screenshots/390x844-upgrades.png`
- Album: `qa-screenshots/390x844-collection.png`, `qa-screenshots/390x844-collection-companions.png`
- Prestige: `qa-screenshots/390x844-prestige.png`
- Shop: `qa-screenshots/390x844-shop.png`
- Offline reward: `qa-screenshots/390x844-offline-reward.png`
- Settings/save: `qa-screenshots/390x844-settings.png`, `qa-screenshots/390x844-save-modal.png`

## Screen Failure Notes

| 화면 | 실패 원인 | P0 수정 방향 |
| --- | --- | --- |
| 홈 | hero art는 좋아졌지만 상단 재화 카드와 하단 흰 통계 카드가 더 웹앱처럼 보인다. 카피바라는 카드 안 이미지로 갇혀 있고, 저장 버튼/탭바도 기본 rounded UI에 가깝다. | hero를 나무 frame 안의 playable scene처럼 만들고, 재화/통계/CTA를 나무/귤/잎 HUD skin으로 바꾼다. 흰 카드 계층을 제거한다. |
| 업그레이드 | spreadsheet upgrade list에 가깝다. 큰 흰 카드, pill chip, 흐린 icon이 구매 손맛을 죽인다. | 목재 상점 선반/도구 카드 skin으로 변경한다. cost/effect/level은 carved plaque, 구매 버튼은 orange lacquer button으로 보이게 한다. |
| 앨범 | sticker room preview는 생겼지만 아래가 여전히 metric grid와 rounded cards라 collection room보다 dashboard로 읽힌다. | parchment album page, photo slot, stamp, ribbon tab으로 전환한다. companion portrait는 sticker/photo처럼 frame 처리한다. |
| 환생 | ritual raster art는 좋지만 큰 rounded calculation panel이 감정선을 끊는다. | 황금잎 의식 altar frame, carved stone/wood plaques, progress ribbon으로 재구성한다. |
| 상점 | banner raster art는 좋지만 아래 상품은 여전히 white product card다. “광고 보상 받기” 버튼도 일반 CTA처럼 보인다. | market stall shelf, chest, wooden price plaque, mock reward label로 바꾼다. 실제 결제로 오해되는 copy는 유지 금지. |
| 오프라인 보상 | illustration은 있지만 modal frame이 util dialog처럼 보인다. | reward chest/modal을 parchment + wood frame + orange glow로 바꾸고, claim button을 game reward button으로 바꾼다. |
| 설정/save | 기능은 안정적이나 설정 화면이 흰 form/card로 보인다. | 집사 장부/나무 서랍 UI처럼 보이는 settings skin으로 변경한다. export/import는 scroll-safe parchment code box로 유지한다. |
| store screenshot | key art 배경은 좋아졌지만 gameplay panel 자체가 흰 카드 UI라 store composition 안에서도 앱 UI 냄새가 남는다. | store screenshot은 새 HUD skin이 반영된 gameplay capture를 포함해야 한다. |

## Asset Failure Notes

- 기존 raster art는 방향은 맞지만 screen skin과 결합되지 못했다.
- 새 pass에서는 핵심 art를 professional mobile game illustration v2로 다시 생성하고, UI는 CSS 도형 조합이 아니라 game HUD texture/skin으로 보여야 한다.
- SVG는 currency/tab/upgrade small icon 보조 용도에만 남긴다. 핵심 emotional image는 PNG raster로 유지한다.

## Acceptance Gate

390x844 home screenshot을 처음 봤을 때 “웹앱 카드 안에 그림을 넣었다”가 아니라 “모바일 idle game 화면”으로 읽혀야 한다. 이 gate를 통과하지 못하면 build/test가 통과해도 완료가 아니다.

## V2 Remediation Link

이 실패 기록을 기준으로 v2 pass에서 home hero를 integrated orchard/capybara raster scene으로 교체했고, `layout.css`를 wood/parchment/orange game HUD skin으로 재정리했다. 최신 판정은 `VISUAL_QA.md`와 `FINAL_ART_AUDIT.md`에 기록한다.
