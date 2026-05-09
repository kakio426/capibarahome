# RC-16 Signing Security Audit

기준일: 2026-05-09

## Policy

- No production keystore was created.
- The local `local-upload-test` keystore is only for release signing rehearsal.
- Keystore files, passwords, aliases, and key passwords must not be committed.
- Documentation must not contain the real local password.

## Files

| 파일 | Git 상태 | 설명 |
| --- | --- | --- |
| `android/keystore.properties.example` | tracked | placeholder-only template |
| `android/keystore.properties` | ignored | local secret file, not committed |
| `android/keystores/local-upload-test.jks` | ignored | local rehearsal keystore, not committed |
| `android/keystores/` | ignored | prevents accidental keystore tracking |
| `android/app/build/outputs/` | ignored | APK/AAB artifacts are not committed |

## Local Rehearsal Key

| 항목 | 값 |
| --- | --- |
| alias | `local-upload-test` |
| type | PKCS12 |
| algorithm | RSA |
| key size | 4096 |
| validity | 10000 days |
| SHA-256 fingerprint | `B3:12:AF:84:5C:32:04:26:10:F1:23:E2:40:BF:B9:1F:93:94:3A:1B:2F:2D:39:D1:19:98:F2:20:0A:4A:84:6E` |

The fingerprint is safe to record. Passwords are not recorded.

## Git Hygiene Verification

```txt
git status --short --ignored android/keystore.properties android/keystores/local-upload-test.jks
!! android/keystore.properties
!! android/keystores/
```

```txt
git ls-files | grep -E '\.jks|\.keystore|keystore.properties|release-signing.properties|storepass|keypass'
android/keystore.properties.example
```

The matched file is a placeholder template. No tracked secret `.jks`, `.keystore`, real `keystore.properties`, `release-signing.properties`, `*.storepass`, or `*.keypass` file exists.

## Missing Secret Failure Check

The local secret file was temporarily moved out of the way and `./gradlew assembleRelease` was rerun. The task failed before packaging with:

```txt
Missing android/keystore.properties. Copy android/keystore.properties.example, fill local secrets, and keep the real file out of git.
```

The secret file was restored after the check.

## Remaining External Security Work

- User must create and secure the production upload keystore.
- User must back up the production keystore outside the repo.
- User must enroll/use Google Play App Signing in Play Console.
- User must never replace the production key with the local rehearsal key.
