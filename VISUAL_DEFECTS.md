# Visual Defects

기준일: 2026-05-05

검토 대상은 `qa-screenshots/`의 Playwright screenshot 36개다. contact sheet로 전체 구도를 확인하고, 360x740/430x932/desktop의 저장 모달, 상점, 업그레이드, 앨범, 홈 화면을 개별 확대 검토했다.

## Result

| ID | Severity | Area | Finding | Fix | Status |
| --- | --- | --- | --- | --- | --- |
| V-001 | P1 | Save import/export modal | 360x740에서 Export 코드 textarea가 너무 커 긴 저장 코드가 모달 안에서 잘린 것처럼 보이고 Import 영역과 시각적으로 충돌했다. | save textarea에 전용 monospace 크기, 고정 scroll 영역, import/export aria label 적용 | 해결 |
| V-002 | P1 | Bottom navigation | 360x740에서 `업그레이드` 탭 라벨이 두 줄로 부서져 하단 탭이 학생용 게임 UI보다 개발자 앱처럼 보였다. | visible label을 `성장`으로 줄이고 aria-label은 `업그레이드`로 유지 | 해결 |
| V-003 | P1 | Toast | toast가 자동으로 사라지지 않고 상점 카드 위를 넓게 덮어 상품 설명과 버튼을 가렸다. | 2.4초 자동 dismiss, compact ellipsis toast로 축소 | 해결 |
| V-004 | P1 | Decoration feedback | 장식 25개 중 11개는 장착해도 홈 hero 장면에 전용 visual class 효과가 없어 collection content inflation처럼 보였다. | 누락된 11개 decoration class에 hero visual CSS 추가 | 해결 |
| V-005 | P2 | Album density | 360x740 앨범 화면은 퀘스트, 친구, 장식, 업적을 한 화면에 담아 정보 밀도가 높다. 텍스트 잘림은 없지만 Cats & Soup 수준의 따뜻한 수집 동기는 아직 약하다. | 이번 범위에서는 유지, 향후 collection reward/chest/room layout로 개선 | 남음 |
| V-006 | P2 | Placeholder feel | generated SVG와 CSS capybara는 RC placeholder로는 동작하지만, 상용 출시용 bespoke art/animation 수준은 아니다. | final bitmap/icon/splash asset 교체 필요 | 남음 |
| V-007 | P2 | Reward feel | 업적은 자동 unlock + toast + 배지 중심이라 퀘스트 보상보다 손맛이 약하다. | 업적 claim reward 또는 album reward chest 후보로 backlog 반영 | 남음 |

## 36 Screenshot Review

| Screen set | Result |
| --- | --- |
| `360x740-*` | 주요 텍스트는 읽히며 horizontal overflow 없음. 저장 모달/하단 탭/toast 결함 수정 후 재촬영. |
| `390x844-*` | 홈, 성장, 앨범, 환생, 상점, 설정, 저장 모달 모두 터치 영역과 텍스트 가독성 유지. |
| `430x932-*` | 중앙 패널 느낌과 modal scroll이 안정적. 저장 모달은 긴 코드가 전용 scroll 영역에 갇힘. |
| `desktop-1280x900-*` | 모바일 패널 중앙 정렬 정상. 과도한 full desktop stretch 없음. |

## Competitive Visual Judgment

첫 화면은 큰 capybara tap target, currency tiles, today quest, next goal, collection shelf로 단순 MVP보다 낫다. 다만 Cats & Soup처럼 손으로 그린 캐릭터 애니메이션, 깊은 공간감, 장식 배치 보상감은 아직 없다. 이 항목은 내부 RC blocker가 아니라 final store art/reward expansion 전 P2 리스크로 둔다.
