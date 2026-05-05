# Art Failure Review

기준일: 2026-05-05

## 판단 기준

이 리뷰는 이전 `final art replacement pass`를 실패로 본다. 실패 원인은 asset 수량이 아니라 화면 인상이다. SVG가 많이 있어도 핵심 감정, 캐릭터, 공간감, 보상감이 raster game art처럼 보이지 않으면 final art 후보가 아니다.

기준 screenshot:
- Home: `qa-screenshots/390x844-home.png`
- Album: `qa-screenshots/390x844-collection.png`, `qa-screenshots/390x844-collection-companions.png`
- Prestige: `qa-screenshots/390x844-prestige.png`
- Shop: `qa-screenshots/390x844-shop.png`

## Screen Failure Notes

| 화면 | 왜 final game art로 부족했는가 | 필요한 방향 |
| --- | --- | --- |
| 홈 | 카피바라와 정원이 주인공이어야 하는데 숫자 카드와 HUD panel이 먼저 읽혔다. SVG scene은 깔끔하지만 수제 벡터 프로토타입처럼 보였고, 수확 행위가 실제 정원 안에서 일어나는 느낌이 약했다. | raster orchard scene을 full hero로 깔고, main capybara PNG를 중심에 배치한다. 숫자는 floating HUD로 낮추고 보상 가능 상태는 scene badge로 표현한다. |
| 앨범 | portrait 수는 있었지만 list/grid 카드 UI가 강해서 collection room이나 sticker book의 수집 감각이 부족했다. 친구들이 살아 있는 캐릭터라기보다 같은 틀의 asset item처럼 보였다. | 8 companion portrait PNG를 실제 sticker처럼 배치하고, 앨범 상단을 collection room/sticker book preview로 만든다. |
| 환생 | 수치와 진행률이 화면 중심이고, golden leaf ritual은 보조 이미지처럼 들어갔다. 리셋의 감정과 축제감보다 계산 패널 인상이 강했다. | prestige ritual raster illustration을 큰 scene으로 사용하고, 배율/보상 수치는 scene 아래 의사결정 정보로 낮춘다. |
| 상점 | mock 안전 문구는 좋지만 SaaS card/product list 구조가 남아 게임 상점의 보상 선반, chest, festival banner 느낌이 약했다. | shop reward banner PNG를 상단 핵심 visual로 사용하고 product list는 offer shelf처럼 보이게 다듬는다. |

## Raster Production Workflow

이번 pass는 built-in image generation으로 만든 PNG 원본을 workspace에 복사하고, 필요한 후처리를 거쳤다.

Source location:
`/Users/yubyeongju/.codex/generated_images/019de88f-93f0-7a82-9c16-cf85a0c4768c/`

Workspace raster assets:
- `src/assets/raster/home/main-hero-background.png`
- `src/assets/raster/home/main-capybara-character.png`
- `src/assets/raster/companions/capybara-{momo,narin,dami,biro,podo,soda,ruru,hanul}.png`
- `src/assets/raster/release/prestige-ritual.png`
- `src/assets/raster/release/shop-reward-banner.png`
- `src/assets/raster/release/offline-reward.png`
- `src/assets/raster/release/store-key-visual.png`
- `src/assets/raster/release/app-icon-candidate.png`

후처리:
- main capybara는 flat chroma-key PNG에서 alpha PNG로 변환했다.
- companion sheet는 4x2 sheet에서 8개 square portrait로 crop/resize했다.
- app icon candidate는 1024x1024 PNG로 resize했다.

## Current Gate

SVG는 계속 currency, tab, upgrade, small badge 같은 보조 icon에 쓴다. Home hero, main character, companion portraits, prestige, shop, offline reward, store key visual, app icon candidate는 raster asset으로 교체한다.
