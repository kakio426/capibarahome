# Art Direction

기준일: 2026-05-06

## North Star

`카피바라 집사기`는 “React 앱에 귀여운 그림을 붙인 화면”이 아니라, 작은 모바일 idle game처럼 보여야 한다. 390x844 첫 화면에서 사용자는 카드 UI를 읽기 전에 귤 정원, 카피바라, 수확 버튼, 보상 상태를 먼저 느껴야 한다.

목표 reference quality:
- Cats & Soup: 따뜻한 hand-painted 공간감, 캐릭터성, 보상 연출
- Egg, Inc.: 숫자 성장의 즉시성, 큰 터치 영역, 명확한 경제 HUD
- Cookie Clicker: 핵심 행동이 화면의 주인공인 구조

경쟁작의 에셋/문구/UI를 복제하지 않는다. 기준은 polish와 정보 위계다.

## Art Pillars

| Pillar | Required Feeling | Implementation Direction |
| --- | --- | --- |
| Cozy orchard | 실제 귤 정원에 들어온 느낌 | painted orchard background, harvest stall, water/stone/wood detail |
| Character warmth | 도형 얼굴이 아닌 살아 있는 카피바라 | fur texture, cheek volume, clear snout, expressive eyes, props |
| Butler craft | 집사가 정원을 돌보는 손맛 | gloves, basket, ledger, wooden tools, brass trims |
| Reward glow | 수확/광고/환생 보상감 | orange/golden leaf glow, chest, ribbon, stamp, sparkle restraint |
| Game HUD skin | 웹 카드가 아니라 게임 UI | wood frame, parchment fill, carved plaques, leaf tabs, orange lacquer buttons |

## P0 Visual Bans

- large white rounded web cards as the dominant visual
- generic pill chips without game material treatment
- flat vector/CSS/SVG shapes used as core emotional art
- Figma placeholder rectangles/circles/capsules
- dashboard/spreadsheet upgrade list
- modal that looks like a util dialog instead of reward/game ledger
- store screenshots that are app captures with marketing copy only

## Raster Art Requirements

Core raster assets must be professional mobile game illustration candidates:
- home hero: integrated scene with capybara, orchard, harvest stall, depth, no UI text
- key visual: store-facing illustration with big composition and readable characters
- companion portraits: 8 distinct capybaras with props, expression, fur, silhouette
- prestige scene: golden leaf ritual, altar, orchard, warm glow, no calculation UI
- shop banner: harvest market stall, reward chest, shopkeeper capybara, no real-payment implication
- offline reward: return harvest scene, basket/chest/oranges, calm reward mood

SVG remains acceptable only for small auxiliary icons, not for core emotion.

## UI Skin Rules

| Component | Required Skin |
| --- | --- |
| App top bar | dark orchard canopy / carved sign board, not plain header |
| Save button | lacquered wood/orange button with bevel and dark underside |
| Currency HUD | wooden or parchment plaques pinned over scene, icon medallions, compact |
| Primary button | orange lacquer / fruit crate button, thick lower shadow, high contrast |
| Secondary button | parchment/leaf button with carved border |
| Tab bar | wooden dock with individual carved slots and leaf/orange active state |
| Upgrade card | shop shelf/workbench card, left icon medallion, cost plaque, material depth |
| Modal | parchment scroll or save vault in wood frame, reward glow for positive modal |
| Progress | ribbon or carved groove, not generic thin web progress |
| Metric tiles | small plaques, not standalone white rounded cards |

## Screen Direction

| Screen | Direction |
| --- | --- |
| Home | one playable orchard scene. HUD overlays must feel attached to the scene. Below-scene panels should be parchment/wood plaques, not cards. |
| Upgrades | market/workbench shelf. The user should feel they are buying tools/facilities, not reading a table. |
| Album | sticker book / collection room. Portraits are framed photos/stickers with stamps and ribbons. |
| Prestige | golden leaf ritual. Calculation is a support layer on carved plaques. |
| Shop | harvest festival stall. Rewarded ad mock remains clearly sandboxed but visually rewarding. |
| Offline reward | chest/basket return scene. Claim action is a game reward, not a form submit. |
| Settings | butler ledger / garden drawer. Toggles and save/import controls are organized as game settings, not admin settings. |

## QA Review Rubric

For every screenshot:
- Does the first read look like a mobile game, not a website?
- Is the largest visual signal an illustrated place/character/reward?
- Are cards/buttons/tabs using wood/parchment/orange/leaf material cues?
- Is any white rounded rectangle dominating the screen? If yes, P0.
- Does any core emotional visual look SVG/CSS/flat-vector? If yes, P0.
- Would the screen look acceptable beside Cats & Soup / Egg, Inc. / Cookie Clicker screenshots as an idle game candidate? If not, document the gap and fix or mark blocker.

## Current Gate

The previous raster pass did not pass because the UI skin still read as white rounded web cards. The v2 pass replaced the core scene language with integrated raster scenes. The RC-4 hardening pass extends the same wood/parchment/orange HUD skin into upgrade shelves, settings ledger/drawer, save vault modal, sticker-book metrics, carved progress, tab dock, toast, and interaction feedback. Current completion evidence is in `RC4_UI_SKIN_AUDIT.md`, `VISUAL_QA.md`, `QA_REPORT.md`, `SPEC_COVERAGE.md`, `RELEASE_CHECKLIST.md`, and `RELEASE_BLOCKERS.md`.
