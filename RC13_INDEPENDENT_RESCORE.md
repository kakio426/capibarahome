# RC-13 Independent Rescore

기준일: 2026-05-09

점수는 자동 테스트 개수나 파일 수가 아니라 최신 screenshot, DOM layout checks, native readiness evidence 기준이다.

## Scorecard

| 항목 | 점수 | 판정 | 근거 |
| --- | ---: | --- | --- |
| Home | 8.1 | P1 없음 | `360x740-home.png`, `390x844-home.png`; lower stats를 wood ledger로 보강 |
| Upgrades / quick-buy | 8.1 | P1 없음 | `360x740-upgrades-quick-buy.png`, `390x844-upgrades-quick-buy.png`; RC-11 작업대/레버 gate 유지 |
| Daily reward | 8.0 | P1 없음, P2 polish | `390x844-daily-reward-claim.png`; reward sheet 명확, animation richness는 P2 |
| Milestones | 8.1 | P1 없음 | `390x844-collection-milestones.png`, `390x844-milestone-claim.png`; visible copy 단축으로 ellipsis 부담 개선 |
| Prestige result | 8.2 | P1 없음 | `390x844-prestige-result.png`; ritual art and multiplier result clear |
| Store screenshots | 8.1 | P1 없음 | iPhone/Android 10장, public copy/file/dimension guard |
| Save/export modal | 8.0 | P1 없음, P3 density | `390x844-save-modal.png`; code density는 기능상 남음 |
| Settings | 8.0 | P1 없음 | `390x844-settings.png`; form smell reduced, toast non-blocking |
| Native readiness | 7.2 | external blocker | Android shell created/synced; iOS blocked by CocoaPods/signing environment |
| Submission package readiness | 7.6 | external blocker | metadata/screenshots/icon candidates prepared; accounts/signing/URLs/device QA missing |

Combined product UI average excluding external native/submission blockers: 8.1.

Combined readiness average including external native/submission blockers: 7.8.

## 남은 P1 여부

내부 UI/product-quality P1: 없음.

External submission blocker: 있음. 실제 제출에는 Apple/Google 계정, iOS signing/provisioning, Android keystore, privacy/support URL, age rating/export compliance, final art rights, physical device QA가 필요하다.

## 판정

RC-13은 내부 UI defect sweep 기준으로는 P1이 남지 않았다. 하지만 native/submission readiness는 외부 환경 때문에 8점 미만이므로 "실제 제출 완료"가 아니라 "제출 준비 패키지 정리 완료 후보"로 표현한다.
