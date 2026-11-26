# UI_TutorialDrawing 동작 사양 (웹 재현용)

출처: catchu_client `Assets/_Scripts/UI/Popup/UI_TutorialDrawing.cs` 및 헬퍼. 2026-11-26 읽기 전용 조사.
DOTween 기본 이징 = OutQuad (`Resources/DOTweenSettings.asset`). 좌표 = 캔버스 px, 기준 1080×2160.

## 0. 전체 흐름
1. 네이티브 스플래시: 검정 화면 (Unity 로고 off, Android blackSquare.png, iOS 이미지 없음)
2. 스플래시 영상 `_Video/Video_Splash.mp4` (H.264 1080×1920 30fps 4.086s, AAC, 3.17MB)
   - cover(중앙 크롭), 무반복, 끝 프레임 정지, 탭/스킵 없음
   - 종료 후 알파 1→0 0.5s OutQuad → is_splash=false
   - 튜토리얼은 스플래시 아래에서 이미 생성됨 (조이스틱 자동 왕복 3s 후 시작 → 스플래시 걷힐 때 이미 움직일 수 있음)
   - UI_IntroMotion 은 2026-11-18 커밋 0fd5aee1a 이후 호출되지 않음 (재현 불필요)
3. 튜토리얼 COR_Intro: 1프레임 대기 → is_splash false 대기 → 상품 진입 → 전광판 → 골드 샤인 루프 → 토스트 → Draw 안내
4. Draw 클릭 → 집게 → 확대 전환 → 결과 영상 → 상품 공개 → 1.2s → Order(상품 받기) 안내
5. 상품 받기 / Skip → (Unity) IsTutorial=1 저장, UI_LoginMain. (웹) 스토어 이동
   - iOS https://apps.apple.com/kr/app/id1512653202
   - Android https://play.google.com/store/apps/details?id=com.KLP.RZG
   - PC: 두 스토어 선택 창 (임시 결정)

## 1. Init 상태
- GO_Result, GO_Delivery, GO_NavbarVisual off. Skip 버튼 on. Button_Count off. 모든 버튼 잠금(Skip 제외).
- Text_DrawTicket = "2장"
- 데이터: DataSO.asset drawTutorialResult 8세트 중 랜덤 1. 더미 5 = list_nine[0..4].
  결과 = main+list_vip+list_nine 중 V/SV/SSV 랜덤 (현재 데이터상 항상 list_vip 2개 중 하나). 없으면 main.
- 이미지 URL: https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/{id}.png (고유 96개)

## 2. 상품 진입 (COR_EntryProducts)
- 더미 i(0..4): 시작 y-160, 알파 0. 시작 지연 i·0.08s.
- 위치 → 원위치 0.45s OutCubic, 알파 0→1 0.25s (OutQuad).

## 3. 전광판 PlayMainWinnerBanner.InitTutorial
- 데이터(하드코딩): 캐치회원 890000 60분 전 / 행운회원 1500000 12분 전 / 캐치유회원 350000 3분 전
- 행: "{nick} 님 {n,###}원 당첨" + 시각 HH:mm(현재-N분). 간격 28, 텍스트 높이 56, 배너 높이 64, 폭 info+time+64 (최대 min(800, 부모폭-96)), 넘치면 닉네임 … (최소 3글자)
- 등장: scale 0→1 0.2s OutBack + 알파 0→1 0.2s
- 롤링 5s: 현재 y 0→-64 0.16s InCubic + 알파→0 0.16s / 폭 0.12s OutSine / 다음 y +64→0 0.2s OutCubic + 알파 0→1 0.2s
- 입력 차단 없음(raycast off)

## 4. 토스트 PlayToastUpTracked("무료 뽑기를 체험해 보세요", "(체험 상품은 랜덤하게 배치됩니다)", Purple, posY 248)
- 배경 `_Images/Content/Toast/Image_GradientToastPurple.png`, 제목 TrueShadow #C1B4FD a0.8, minHeight 224, y=248
- 본문 bold 52 / 부제 medium 40 (코드 주석 기준, 프리팹 확인 필요)
- 0.1s 대기 → scaleX 0→1 0.2s → 1.5s 유지 → 알파 1→0 0.2s → 파괴 (총 ≈2.0s). 튜토리얼은 최대 6s 대기.

## 5. 안내 COR_Guide(next, button)
- Draw: 즉시 활성(샤인) → 0.5s → 0.8s → 글로우+손가락
- Order: 0.5s → 활성(샤인) → 0.8s → 글로우+손가락
- 글로우 색 (151,101,255). 손가락 300×300, 위치(중앙 앵커): Draw (-90,-415), Order (-80,-718)
- 손가락 알파 0→1 0.3s. 루프: y = lowerY + 20·(1-v), v 0→1 0.8s InOutSine yoyo 무한. 글로우 진행값 = v.

## 6. 활성화 샤인 PlayButtonActivationShine (0.4s Linear)
- 잠금 스프라이트 → 활성 스프라이트로 좌상→우하 대각 와이프, 경계 금색 띠
  pos=(dot(uv,d)-min(0,dx)-min(0,dy))/(|dx|+|dy|), d=(sin45·w,-cos45·h)
  edge=lerp(-.15,1.15,p); reveal=1-smoothstep(edge-.035,edge+.035,pos)
  shine=1-smoothstep(0,.09,|pos-edge|); rgb+=(1,.76,.32)·shine·.8

## 7. 버튼 글로우 TutorialButtonGlow
- soft TrueShadow size40 Normal, core size10 Additive. soft색=지정, core=lerp(지정,흰,0.55)
- SetIntensity(i): soft a=.95i, core a=i, 버튼 조명 셰이더 _Intensity=i
  L=dot(rgb,(.2126,.7152,.0722)); neon=glow·(.48+L·.75); lit=1-(1-rgb)(1-neon·i·.8); out=lerp(rgb,lit,i)
- Draw/Order 는 자동 펄스 없음(손가락 진행값으로만)

## 8. 버튼 눌림 PlayButtonPress
- 스프라이트 (기본/눌림/잠금)
  - Draw: `_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButton{,Select,Lock}.png`
  - Order: `_Images/Content/Draw/Image_DrawResultButton{,Select,Lock}.png`
- 라벨 y: Draw 8→-2, Order 10→0 (pointerDown -10, pointerUp 복귀)
- 효과음 `_Sound/Play/Common/Sound_PlaySelect.wav` (0.348s, vol 1)

## 9. 조이스틱·집게 DrawingJoyStick
- 스프라이트 `.../Theme/Main/Image_DrawJoyStick.png` 서브 5개 (좌강/좌약/중/우약/우강)
- 수동: 로컬 x<-30 좌, >30 우, |x|>100 강. 300px/s, 범위 ±400. 손 떼면 중앙.
- 진자(매 프레임, 1/120 서브스텝, 프레임 최대 0.1s):
  swingSpeed -= (속도-이전속도)·0.18 (clamp ±180); swingSpeed += (-45·angle - 4·swingSpeed)·dt; angle += swingSpeed·dt;
  |angle|>25 → clamp, swingSpeed *= -0.35. ClawHand rotZ = 기본+angle
- 벽(수동 이력 있음, ±400 첫 접촉): swingSpeed += side·84, ScreenWallImpact(side)
- 자동 왕복: 수동 없음 + 3s 무입력 → x≥0 이면 +400 아니면 -400 으로 180px/s InOutSine, 이후 끝↔끝 4.444s InOutSine 무한
- SetPlayMotion(true): 정지, 진자 0, 회전 복원

## 10. 화면 흔들림 ScreenWallImpact (0.28s Linear)
- r=cos(5πv)(1-v)²·impact; x=7r px, y=1.5r px, rotZ=0.18r°

## 11. 뽑기 COR_Draw
1. 집게 스프라이트 clawOpen, 효과음 `_Sound/Play/Drawing/Sound_DrawMove.wav` (1.1s, vol .5)
2. RT_ClawDown y -600, 0.55s InQuad
3. clawClosed, 0.25s 대기
4. 확대 전환 DrawingResultTransition (아래)
5. GO_Machine off, 결과 영상 재생, 첫 프레임 표시 후 전환 캡처 제거
6. 영상 종료 → 상품 이미지 로드(최대 8s) → 등급 아이콘/브랜드/이름/가격("n,###원")
   정보 위치: Brand 부모, Price 부모 = 기본 + (0,-124)
7. 공개(COR_RevealProduct) → 1.2s → Order 안내

## 12. 확대 전환 DrawingResultTransition
- 화면 캡처 (축소비 min(.5, 1024/max(W,H))), 가우시안 블러 3 (soft), 12 (blurred)
- 0.3s: e=smoothstep(t); zoom=1+2e (최종 3배), 중심=집게 손;
  soft.a=smoothstep(clamp(2e)); blurred.a=smoothstep(clamp(2e-1)). 이후 정지 유지
- Finish: 영상 첫 프레임 직후 즉시 제거(페이드 없음)

## 13. 결과 영상 `_Video/Video_Drawing.mp4` (1080×1920 30fps 6.014s AAC, 3.65MB)
- 검정 배경 + cover. 첫 프레임까지 숨김. 첫 프레임에 소리 켜고 BGM 일시정지.
- UV 줌 5→1, 0.3s easeOutCubic (화면 중앙)
- 종료(끝 or 길이+5s): 끝 프레임 정지 → 알파 1-smoothstep(f/0.2) 0.2s → done
- 영상 중 Skip 숨김

## 14. 상품 공개 COR_RevealProduct
- 상품: 시작 y-160 알파 0 → 원위치 0.65s OutCubic, 알파 0→1 0.3s
- 글로우(RawImage_ProductGlow): 크기 상품×1.55, 알파 0→1 0.55s OutSine
- 이후 스키닝(셰이더 Mat_PlayMainProductMotion / PlayMainDrawingProductSway.shader):
  - 폭 1.12배, _Fit=1/1.12. u=(u-.5)/Fit+.5; u -= Bend·v² (아래 고정)
  - 첫 0.8s Linear: y+=sin(πp)·8, Bend=sin(2πp)(1-p)·.065
  - 이후 3.6s 루프: y+=sin(2πp)·10
  - 샤인 PlayMainShine: 1.4s Linear 진행 + 2s 휴지 무한. 색 (1,.88,.65) 폭 .09 강도 .8 방향 45°
    rgb += color·(1-smoothstep(0,.09,|pos-edge|))·.8, edge=lerp(-.15,1.15,prog)
- 골드 컨페티(GO_GoldConfetti): ParticleImage 자체는 타이머(입자 크기 0). 실제 금박은 자식 GoldConfettiGraphic 이 곡면 메시로 그림
  (조각 112, 시드 74209, 폭발 1450, 상승 1150, 4.8s, 크기×1.3, 낙하×3.7, 회전감쇠 .85, 깊이 .4, 리본 .8, Mat_ResultGoldFoil (1,.86,.6)).
  수식은 tutorial-inventory-assets.md 7.2 참고.

## 15. 더미 골드 샤인 SurfaceFx (GoldShine, 5.5s, 더미 1→5 순차 무한, 기계 화면에서만)
- 노멀: height=1-luma·a, Sobel, n=normalize(-5x,-5y,1), 5탭 가우시안 2회 (최대 512px)
- shine=(3,.16, cos-20°, sin-20°)
  n=normalize(n.xy, n.z+.15); r=reflect(-view,n); light=normalize(0,.6,.85)
  spec=pow(sat(dot(n,norm(light+view))),32); band=exp(-((r.x+.4r.y)/.18)²); diff=sat(dot(n,light))
  gold=(1,.76,.43)(.20+.36diff+.55band)+(1,.97,.87).55spec
  phase=min(floor(3p),2); lp=sat(3p-phase)
  sweep=lerp(-1.5,1.5,smoothstep(.08,.92,lp)); surface=1.45dot(uv-.5,dir)+.28dot(r.xy,dir)
  edge=smoothstep(sweep-.04,sweep+.04,surface); coat: phase0 1-edge / 1 / phase2 edge
  d=surface-sweep; glint=pow(sat(dot(n,norm(norm(-.6sweep,.35,1)+view))),24)
  shine=(1,.89,.6)(.55exp(-(d/.16)²)+exp(-(d/.0384)²)glint)·smoothstep(.02,.15,lp)(1-smoothstep(.85,.98,lp))·3
  rgb=lerp(rgb,gold,coat)+shine

## 16. 기타
- 등급 아이콘 `_Images/Icon/Icon_Grade{V,SV,SSV}.png`
- NumberFormat: {0:#,###}, 0 → "0"
- 사운드 설정 PlayerPrefs "sound"==0 이면 무음 (웹: 첫 터치 전 자동재생 제한)
