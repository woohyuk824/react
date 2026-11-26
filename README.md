# 테스트메모

React + Vite + TypeScript 메모 웹앱. PWA(웹 설치)와 Capacitor(Android/iOS 앱)로 바로 내보낼 수 있다.

## 명령

| 명령 | 내용 |
| --- | --- |
| `npm run dev` | 개발 서버 (http://localhost:5173) |
| `npm run build` | 웹 빌드 → `dist/` (PWA 포함) |
| `npm run app:apk` | 웹 빌드 + 동기화 + Android 디버그 APK 생성 |
| `npm run app:android` | 웹 빌드 + 동기화 + Android Studio 열기 |

APK 위치: `android/app/build/outputs/apk/debug/app-debug.apk`

## 구성

- 저장: `@capacitor/preferences` (웹은 localStorage, 앱은 기기 저장소)
- 앱 ID: `kr.catchu.testmemo` (`capacitor.config.ts`)
- Android 빌드 JDK: `android/gradle.properties`의 `org.gradle.java.home` (JDK 21)
- iOS: `npx cap add ios` 후 macOS + Xcode에서 빌드 (Windows에서는 불가)
