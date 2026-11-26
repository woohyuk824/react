# Unity 대조 픽셀 검수 (2026-11-26)

기준: `catchu_client_sub` 에디터(원본과 프리팹·스크립트 해시 동일)의 **Edit 모드 프리뷰 씬**에서
UI_TutorialDrawing 프리팹을 1080×2160 RenderTexture 로 렌더(씬·에셋 저장 없음, Play/로그인 없음).
웹: `?auto&nosplash&set=0&snap=<상태>` 로 같은 상태를 애니메이션 없이 만든 뒤 1080×2160 헤드리스 캡처.

| 상태 | 결과 |
|---|---|
| machine (기계 화면) | 문구 위치·크기 1~3px 이내. 남은 차이는 앞판 노멀 조명 경계 샘플링(평균색·대비 0~2 차이) |
| result (결과 화면) | 브랜드·가격·이름·상품 받기 1~3px 이내, 전체 diff 0.7% |
| glow (안내 글로우) | 버튼 내부 조명 셰이더 픽셀 동일, 외곽 글로우 채널 차 ≤15 |
| wipe (활성화 샤인 50%) | 사실상 동일 |
| gold15/50/85 (더미 금빛 샤인) | 사실상 동일 |
| ui (전광판 + 토스트) | 동일 (배너 폭 625.7, 토스트 위치 일치) |

이번에 찾아 고친 Unity 기준값
- Pretendard TMP 에셋 `normalSpacingOffset -2.5` → 자간 -0.025em (글자 크기는 그대로)
- 토스트 문구 Italic(fontStyle 2), italicStyle 15 → 기울기 0.15
- 전광판 인스턴스 오버라이드: 문구 Medium 40, 시각 Regular 36
- GO_PlayInfo VerticalLayoutGroup + ContentSizeFitter → 버튼 문구 위치
- 글로우 core 블렌드 Screen, 샤인 각도 45°(PlayMainShine.Angle), 활성화 샤인 0.4s
- SurfaceFx 노멀: 인코딩 값 블러(재정규화 없음), 쌍선형 2회
- 색 공간 Gamma(m_ActiveColorSpace 0) — 웹과 동일

픽셀 대조하지 못한 것 (코드 대조만)
- 결과 상품 휘어짐·샤인 셰이더(PlayMainDrawingProductSway): Edit 프리뷰에서 텍스처가 바인딩되지 않아 렌더 실패 → 셰이더 코드 한 줄씩 대조
- 결과 광원 파티클, 금박 컨페티, 확대·블러 전환, 영상 재생, 사운드: 시간 연출이라 정적 대조 불가
