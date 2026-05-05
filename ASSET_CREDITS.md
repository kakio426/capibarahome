# Asset Credits

기준일: 2026-05-05

## 현재 사용 자산

| 범위 | 경로 | 출처/제작 방식 | 라이선스 상태 |
| --- | --- | --- | --- |
| 게임 아이콘/아이템/배지 SVG | `src/assets/generated/icons/`, `items/`, `tiers/`, `mascots/` | 프로젝트 내부 수제 SVG 생성 스크립트 `scripts/generateVisualAssets.mjs` | 외부 에셋 미사용. 최종 제출 전 사용자 법무/소유권 검토 필요 |
| 카피바라 8마리 portrait | `src/assets/generated/portraits/` | 동일 생성 스크립트 기반, 캐릭터별 소품/표정/색감으로 구분 | 외부 에셋 미사용. 최종 일러스트 교체 가능 |
| RC-2 앱 아이콘 초안 | `src/assets/generated/release/app-icon-rc2.svg` | 프로젝트 내부 SVG 생성 | 제출용 최종 PNG 변환/법무 검토 필요 |
| RC-2 splash 초안 | `src/assets/generated/release/splash-rc2.svg` | 프로젝트 내부 SVG 생성 | 제출 전 플랫폼별 크기 export 필요 |
| Store screenshot frame 초안 | `src/assets/generated/release/store-screenshot-frame-rc2.svg` | 프로젝트 내부 SVG 생성 | Playwright store screenshot pack 보조 프레임 |
| CSS scene/particles/floating text | `src/ui/styles/layout.css` | 프로젝트 내부 CSS 도형/효과 | 외부 에셋 미사용 |

## 외부 리소스 사용 여부

- 외부 이미지 CDN, 상용 아이콘팩, 경쟁작 이미지, 스톡 이미지는 사용하지 않았다.
- 경쟁작 벤치마크는 구조와 품질 기준 참고용이며 에셋/문구/UI를 복제하지 않았다.
- 현재 자산은 release candidate용 직접 제작 art pack이다. 실제 스토어 제출 전 final bespoke character art, app icon PNG, adaptive icon, splash image를 확정해야 한다.

## 교체 지점

- UI 아이콘/카드는 `VisualAssetIcon`과 `GeneratedAssetRegistry`를 통해 연결된다.
- 새 파일 기반 자산으로 교체할 때는 `scripts/generateVisualAssets.mjs` 또는 `src/assets/generated/GeneratedAssetRegistry.ts`의 key를 유지하면 UI 코드를 크게 바꾸지 않아도 된다.
- 네이티브 icon/splash export는 `NATIVE_BUILD_GUIDE.md`를 따른다.
