# Google Play Release Checklist

기준일: 2026-05-09

## Current RC-16 Status

| 항목 | 상태 |
| --- | --- |
| Android applicationId | `com.capybarabutler.game` candidate |
| Debug APK | generated |
| Local signed release APK | generated with local rehearsal key |
| Local signed release AAB | generated with local rehearsal key |
| Play Console upload | not performed |
| Play App Signing enrollment | user-provided external step |
| Production upload key | not created in repo; user must create and secure |

## Key Policy

- App signing key: Google Play App Signing manages/signs distributed APKs after enrollment.
- Upload key: used by the developer to sign AAB uploads to Play Console.
- RC-16 key: `local-upload-test`, for local rehearsal only.
- The local rehearsal key must not be used as the final production upload key unless the user intentionally decides that outside this repo workflow.

## Before Internal Testing Track Upload

| 항목 | Owner | Status |
| --- | --- | --- |
| Google Play Console account | User | required |
| Final applicationId/package name | User | confirm `com.capybarabutler.game` or change before release |
| Production upload keystore | User | required |
| Production keystore backup | User | required |
| Play App Signing setup | User | required |
| Signed production AAB | User/Codex after key provided | pending |
| Privacy policy URL | User | required |
| Support URL | User | required |
| Data Safety form | User | required |
| Age rating questionnaire | User | required |
| Ads/IAP declarations | User | required if real SDK/products are added |
| Feature graphic | User final approval | candidate exists |
| Screenshots | User final approval/device check | candidates exist |
| Physical device QA | User | required before public rollout |

## Release Notes Draft

```txt
카피바라와 함께 귤 정원을 키우는 첫 번째 테스트 릴리스입니다.
- 터치와 자동 생산으로 귤을 모으는 기본 성장 루프
- 업그레이드 작업대, 복귀 보상, 배지, 환생 시스템
- 저장/불러오기, 오프라인 보상, 설정 기능
```

## Production Build Runbook

1. Create a production upload keystore outside Git.
2. Back it up securely.
3. Copy `android/keystore.properties.example` to `android/keystore.properties`.
4. Fill in production key values locally only.
5. Run:

```bash
npm run build
npm run cap:sync
npx cap sync android
cd android
./gradlew clean
./gradlew bundleRelease
```

6. Upload `android/app/build/outputs/bundle/release/app-release.aab` to an internal testing track.
7. Install from Play internal testing and run `DEVICE_QA_CHECKLIST.md`.

## Decision

Google Play internal testing is structurally reachable after a production upload key and Play Console setup are provided. RC-16 does not perform Play Console upload.
