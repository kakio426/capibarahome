# Audio Asset Plan

기준일: 2026-05-05

## 구현 상태

`src/config/AudioConfig.ts`가 사운드 슬롯, 파일 경로, fallback tone, 라이선스 상태를 중앙 관리한다. `SoundManager`는 `fileSrc`가 있으면 실제 오디오 파일을 재생하고, 없으면 WebAudio tone으로 fallback한다.

현재 실제 음원 파일은 포함하지 않았다. 모든 store-critical 슬롯은 자체 WebAudio `synthetic_tone` 상태이며, 최종 제출 전 라이선스가 명확한 짧은 효과음으로 교체해야 한다.

## 필수 사운드 슬롯

| 슬롯 | UI 이벤트 | 현재 상태 | 최종 음원 요구 |
| --- | --- | --- | --- |
| `tap` | 카피바라 터치 수확 | WebAudio fallback | 40-80ms, 부드러운 과일 pop |
| `purchase` | 업그레이드/IAP mock 성공 | WebAudio fallback | 90-150ms, 밝은 수령음 |
| `achievement` | 업적 보상 수령 | WebAudio fallback | 150-220ms, 작은 fanfare |
| `quest` | 퀘스트 보상 수령 | WebAudio fallback | 120-180ms, achievement보다 가벼움 |
| `offlineReward` | 오프라인 보상 수령 | WebAudio fallback | 150-250ms, 바구니/수확 느낌 |
| `prestige` | 환생 완료 | WebAudio fallback | 220-420ms, 황금 보상감 |
| `error` | 구매 실패/import 실패 등 | WebAudio fallback | 80-140ms, 낮고 거슬리지 않음 |
| `navigation` | 하단 탭 이동 | WebAudio fallback | 40-80ms, 작은 tick |
| `ad` | rewarded ad mock 성공 | WebAudio fallback | 선택 슬롯, 광고 버프 수령음 |

## 라이선스 요구사항

- CC0, 자체 제작, 또는 프로젝트에 명시적으로 양도된 효과음만 사용한다.
- CC-BY를 사용할 경우 저작자 표시 위치를 `ASSET_CREDITS.md`와 앱 내/스토어 고지에 반영해야 한다.
- 실제 광고/IAP SDK와 사운드 SDK를 추가하면 `PRIVACY_NOTES.md`와 store disclosure를 재감사한다.

## 검증

- `src/tests/audio.test.ts`가 필수 슬롯 존재, fallback tone, mute/music mute 상태 연결을 검증한다.
- 설정의 효과음 mute는 `SoundManager.setSoundMuted`, 배경음 mute는 `SoundManager.setMusicMuted`에 연결되어 있다.
