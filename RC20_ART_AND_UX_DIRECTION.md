# RC20 Art And UX Direction

Date: 2026-05-10 KST

## Direction

RC20 resets the product feel from heavy wood/parchment UI to a bright citrus garden idle-game interface. The interface should feel like a playful mobile game first and a data UI second.

## Principles

| Principle | Implementation |
| --- | --- |
| Character first | Home is led by a large capybara/orange tap scene. |
| One action at a time | The next-action panel shows a single recommendation and one CTA. |
| Numbers before explanations | Growth and reward screens prioritize current gain, after gain, cost, and action. |
| Buttons must invite tapping | Primary CTAs are large, orange, raised, and at least 44px tall. |
| Reward moments must be visible | Touch, daily, offline, prestige, and purchase flows show burst/sheet/result feedback. |
| Minimize decorative competition | Chips and plaques are reduced; decorations cannot cover cost or CTA. |
| Android-first readability | Korean line-height, min-height, and touch-safe spacing are part of the visual direction. |

## Screen Direction

| Screen | RC20 Target |
| --- | --- |
| Home | Bright orchard stage, clear tap target, compact currencies, one next action. |
| Growth | Growth choices rather than spreadsheet/cards; cost tray and CTA separated. |
| Rewards | Shared reward sheet/burst language for earned moments. |
| Prestige | Ceremony/result panel with gained leaves, multiplier change, and next goal. |
| Collection | Keep as secondary progression; avoid turning into metric dashboards. |
| Shop | Reward shop tone, no mock/internal wording in public-facing surfaces. |
| Settings/Save | Light garden utility surfaces; clear inputs/buttons without developer labels. |

## Explicitly Avoided

- brown panel dominance;
- small badge/chip overload;
- dense form layouts;
- generic rounded-card list composition;
- hiding layout collisions with `overflow: hidden`;
- toast-only reward feedback;
- long visible Korean instructions when a short label plus aria/description works better.

## Asset Policy

No large new raster pack was added for RC20. Existing capybara/orange garden raster art remains the main product art. Quality is claimed through composition and interaction changes, not asset count.
