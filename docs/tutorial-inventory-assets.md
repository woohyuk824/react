# UI_TutorialDrawing.prefab 자산·레이아웃 인벤토리 (원본 덤프)

- 대상: `C:/Users/KLP/Desktop/Catchu/catchu_client/Assets/Resources/Prefabs/UI/Popup/UI_TutorialDrawing.prefab` (1,486,028 B, 963 YAML 문서: GameObject 216 / RectTransform 217 / MonoBehaviour 325 / CanvasRenderer 172 / Canvas 2 / CanvasGroup 30 / PrefabInstance 1)
- 조사 방식: 프리팹 YAML 직접 파싱 + Assets/Packages/Library/PackageCache의 .meta 31,402개로 guid 해석. 읽기 전용, 프로젝트 파일 수정 없음.
- 작성일: 2026-11-26, 브랜치 Feature/Profile 작업 트리 기준(커밋되지 않은 변경 포함).

## 0. 캔버스 / 기준 해상도

- 프리팹 루트 `UI_TutorialDrawing`: RectTransform size 1080x2160, anchor/pivot 0.5. Canvas(renderMode=2 WorldSpace로 저장, overrideSorting 0) + GraphicRaycaster. **프리팹 안에는 CanvasScaler 없음.**
- 런타임: `UIManager.SetCanvas` (Assets/_Scripts/Managers/UIManager.cs:51)가 `renderMode=ScreenSpaceCamera`, `overrideSorting=true`, `sizeDelta=(1080,2160)`, `localScale=1`로 덮어씀. 팝업은 `@UI_Root` 하위에 붙음.
- `Assets/MainScene.unity`의 `@UI_Canvases/@UI_Root` CanvasScaler: UiScaleMode=1(Scale With Screen Size), ReferenceResolution **1080x2160**, ScreenMatchMode=0(Match Width/Height), MatchWidthOrHeight=**0(폭 기준)**, RefPPU 100. Canvas renderMode=1(ScreenSpaceCamera), planeDistance 10. (`@UI_Blur`, `ScreenshotCanvas`도 1080x2160/match 0)
- 주의: `CanvasInsetManager.cs`가 SDK35 edge-to-edge 대응으로 referenceResolution을 런타임에 동적 조정함(상태바/내비게이션 바 인셋).
- 두 번째 Canvas: `.../Button_Inventory/GO_ReceiveEffect`(비활성) overrideSorting=1, sortingOrder=3000, additionalShaderChannels=31.

## 1. 계층 트리 (이름 [활성] anchorMin anchorMax anchoredPosition sizeDelta pivot / 회전·스케일은 기본값이 아닐 때만 | 컴포넌트)

좌표계: Unity UI(y 위쪽 +). size(0,…)는 앵커 스트레치 시 부모 대비 증감값. 스케일·회전 생략 = (1,1,1)/0.

```text
- UI_TutorialDrawing [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(1080,2160) pivot(0.5,0.5) | Canvas,GraphicRaycaster,UI_TutorialDrawing
  - Image_BG [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
  - GO_Machine [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(1080,2160) pivot(0.5,0.5) | CanvasRenderer,Image,Mask,CanvasGroup,BackdropFx,UILayerBlurStack
    - Button_PlayMy [on] aMin(0.5,1) aMax(0.5,1) pos(0,-184) size(978,1374) pivot(0.5,1) | CanvasRenderer,Image,Mask,Button
      - Image_Window [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(978,1374) pivot(0.5,0.5) | CanvasRenderer,Image
        - Motion [on] aMin(0,0) aMax(1,1) pos(0,173.5) size(102,20.9998) pivot(0.5,0.5) | CanvasRenderer,Image,Mask
          - RT_Claw [on] aMin(0.5,1) aMax(0.5,1) pos(-210,-412) size(380,380) pivot(0.5,1) | 
            - Image_Box [on] aMin(0.5,1) aMax(0.5,1) pos(0,428) size(428,428) pivot(0.5,1) | CanvasRenderer,Image
            - RT_ClawDown [on] aMin(0.5,1) aMax(0.5,1) pos(0,0) size(380,380) pivot(0.5,1) | 
              - Image_Line [on] aMin(0,0) aMax(0,0) pos(190,372.2) size(6,2160) pivot(0,0) | CanvasRenderer,Image
              - Particle [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) scale=(5.45403,5.45403,5.45403) | CanvasRenderer,ParticleImage
              - PI_Claw [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) scale=(3,3,3) | CanvasRenderer,ParticleImage
                - ParticleImage_ [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(10,0) size(100,100) pivot(0.5,0.5) rotQ=(0,0,-0.0871558,0.996195) euler=(0,0)z=-10 | CanvasRenderer,ParticleImage
                - ParticleImage_ [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(-10,0) size(100,100) pivot(0.5,0.5) rotQ=(0,0,0.0871558,0.996195) euler=(0,0)z=10 | CanvasRenderer,ParticleImage
                - ParticleImage_ [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,32) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
                - ParticleImage_ [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) rotQ=(0,0,-0.224951,0.97437) euler=(0,0)z=-26 | CanvasRenderer,ParticleImage
                  - ParticleImage_EndSlider [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(10,0) size(100,100) pivot(0.5,0.5) rotQ=(0,0,-0.0871558,0.996195) euler=(0,0)z=-10 | CanvasRenderer,ParticleImage
                  - ParticleImage_EndSlider [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(-10,0) size(100,100) pivot(0.5,0.5) rotQ=(0,0,0.0871558,0.996195) euler=(0,0)z=10 | CanvasRenderer,ParticleImage
                  - ParticleImage_EndPoint [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,32) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
                - ParticleImage_ [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) rotQ=(0,0,0.224951,0.97437) euler=(0,0)z=26 | CanvasRenderer,ParticleImage
                  - ParticleImage_EndSlider [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(10,0) size(100,100) pivot(0.5,0.5) rotQ=(0,0,-0.0871558,0.996195) euler=(0,0)z=-10 | CanvasRenderer,ParticleImage
                  - ParticleImage_EndSlider [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(-10,0) size(100,100) pivot(0.5,0.5) rotQ=(0,0,0.0871558,0.996195) euler=(0,0)z=10 | CanvasRenderer,ParticleImage
                  - ParticleImage_EndPoint [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,32) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
              - RT_ClawHand [on] aMin(0,1) aMax(0,1) pos(192.66,0) size(380,380) pivot(0.507,1) | 
                - PI_Claw [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,-175) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
                  - Particle Image [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
                - GO_ResultEvent [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,-233) size(286,286) pivot(0.5,0.5) | CanvasGroup,Button,CanvasRenderer,Image
                  - CG_Info [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasGroup
                    - RawImage [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,RawImage,Mask
                      - RT_Shine [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(-200,200) size(600,150) pivot(0.5,0.5) rotQ=(0,0,0.382683,0.92388) euler=(0,0)z=45 | CanvasRenderer,Image,FillGradientFilter
                    - Message [on] aMin(0.5,0) aMax(0.5,0) pos(0,30) size(220.15,54) pivot(0.5,0) | CanvasRenderer,Image,HorizontalLayoutGroup,ContentSizeFitter
                      - Text_Info [on] aMin(0,1) aMax(0,1) pos(110.075,-27) size(184.15,48) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI
                  - CG_Winner [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasGroup
                    - RawImage_Winner [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,RawImage
                    - Winner [on] aMin(0.5,0) aMax(0.5,0) pos(0,30) size(169.39,54) pivot(0.5,0) | CanvasRenderer,Image,HorizontalLayoutGroup,ContentSizeFitter
                      - CustomProfileImage [on] aMin(0,1) aMax(0,1) pos(18,-7) size(40,40) pivot(0,1) | Button,LayoutElement
                        - Mask [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,Mask
                          - ProfileBgImage [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,RawImage
                          - ProfileCharImage [on] aMin(0,0) aMax(1,1) pos(0,0) size(4,4) pivot(0.5,0.5) | CanvasRenderer,RawImage
                        - grade [OFF] aMin(1,0) aMax(1,0) pos(21.9,-6.3) size(50,50) pivot(1,0) | CanvasRenderer,Image
                        - GO_Mine [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) scale=(1.12,1.12,1) | CanvasRenderer,Image
                      - Text_Winner [on] aMin(0,1) aMax(0,1) pos(110.695,-27) size(81.39,48) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI
                      - Image [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement,FillGradientFilter
                - Image_Claw [on] aMin(0,1) aMax(0,1) pos(192.66,0) size(380,380) pivot(0.507,1) | CanvasRenderer,Image,ImageNormalFx
            - Image_Box [on] aMin(0.5,1) aMax(0.5,1) pos(0,428) size(428,428) pivot(0.5,1) | CanvasRenderer,Image
        - RawImage_Dummy03 [on] aMin(1,0) aMax(1,0) pos(-80,309) size(245,245) pivot(1,0) | CanvasRenderer,RawImage,CanvasGroup
        - RawImage_Dummy02 [on] aMin(0,0) aMax(0,0) pos(292,229) size(380,380) pivot(0,0) | CanvasRenderer,RawImage,CanvasGroup
        - RawImage_Dummy04 [on] aMin(0,0) aMax(0,0) pos(84,339) size(275,275) pivot(0,0) | CanvasRenderer,RawImage,CanvasGroup
        - RawImage_Dummy05 [on] aMin(1,0) aMax(1,0) pos(-46,241) size(255,255) pivot(1,0) | CanvasRenderer,RawImage,CanvasGroup
        - RawImage_Dummy01 [on] aMin(0,0) aMax(0,0) pos(44,204) size(315,315) pivot(0,0) | CanvasRenderer,RawImage,CanvasGroup
        - Image_Front [on] aMin(0.5,0) aMax(0.5,0) pos(0,0) size(984,397) pivot(0.5,0) | CanvasRenderer,Image,ImageNormalFx
        - Image_Glass [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
        - Image_TutorialInfo [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,-616) size(978,142) pivot(0.5,0.5) | CanvasRenderer,Image,UILayerBlur,CanvasGroup
        - RT_Guide [on] aMin(0.5,0) aMax(0.5,0) pos(0,142) size(978,108) pivot(0.5,1) | 
          - Text_Guide [on] aMin(0.5,1) aMax(0.5,1) pos(0,-28) size(0,52) pivot(0.5,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
    - Button_Count [on] aMin(1,0) aMax(1,0) pos(-96,398) size(172,172) pivot(1,0) | CanvasRenderer,Image,Button,TutorialButtonGlow,PlaySelectSound
      - Image_CountGlow [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(160,160) pivot(0.5,0.5) | CanvasRenderer,Image,TrueShadow,TrueShadow
      - Image_GuideShine [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement
      - Text_Count [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(0,60) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
    - Button_Draw [on] aMin(0.5,0) aMax(0.5,0) pos(0,180) size(600,600) pivot(0.5,0) | CanvasRenderer,Image,Button,TrueShadow,TrueShadow,TutorialButtonGlow,PlaySelectSound
      - Image_GuideShine [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement
      - Image [on] aMin(0,0) aMax(1,1) pos(0,0) size(-60,-400) pivot(0.5,0.5) | CanvasRenderer,Image
      - GO_PlayInfo [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,8) size(0,118) pivot(0.5,0.5) | VerticalLayoutGroup,ContentSizeFitter
        - Text_PlayInfo [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI,TextAnimator_TMP,LayoutElement
        - GO_PlayInfoTicket [OFF] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement,HorizontalLayoutGroup
          - RawImage_PlayInfoTicket [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,46) pivot(0.5,0.5) | CanvasRenderer,RawImage,LayoutElement
          - Text_DrawTicket [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,40) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI,LayoutElement
    - DrawingJoyStick [on] aMin(0,0) aMax(0,0) pos(48,397) size(252,252) pivot(0,0) | 
      - GO_DrawingJoyStick [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(252,252) pivot(0.5,0.5) | CanvasRenderer,Image,DrawingJoyStick
        - GO_DrawingJoyStickGuide [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | 
          - Image [on] aMin(0.5,0) aMax(0.5,0) pos(70,260) size(239,64) pivot(0.5,0) | CanvasRenderer,Image,TrueShadow,DOTweenAnimation
            - Text [on] aMin(0.5,1) aMax(0.5,1) pos(0,-2) size(190.1,52) pivot(0.5,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
          - Arrow [on] aMin(0,1) aMax(0,1) pos(12,-40) size(44,44) pivot(0,1) | 
            - Group [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(44,44) pivot(0.5,0.5) | 
              - Image [on] aMin(1,0.5) aMax(1,0.5) pos(0,0) size(19,44) pivot(1,0.5) | CanvasRenderer,Image,TrueShadow,CanvasGroup,DOTweenAnimation
              - Image (1) [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(19,44) pivot(0.5,0.5) | CanvasRenderer,Image,TrueShadow,CanvasGroup,DOTweenAnimation
              - Image (2) [on] aMin(0,0.5) aMax(0,0.5) pos(0,0) size(19,44) pivot(0,0.5) | CanvasRenderer,Image,TrueShadow,CanvasGroup,DOTweenAnimation
          - Arrow [on] aMin(1,1) aMax(1,1) pos(-12,-40) size(44,44) pivot(1,1) | 
            - Group [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(44,44) pivot(0.5,0.5) rotQ=(0,0,1,0) euler=(0,0)z=180 | 
              - Image [on] aMin(1,0.5) aMax(1,0.5) pos(0,0) size(19,44) pivot(1,0.5) | CanvasRenderer,Image,TrueShadow,CanvasGroup,DOTweenAnimation
              - Image (1) [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(19,44) pivot(0.5,0.5) | CanvasRenderer,Image,TrueShadow,CanvasGroup,DOTweenAnimation
              - Image (2) [on] aMin(0,0.5) aMax(0,0.5) pos(0,0) size(19,44) pivot(0,0.5) | CanvasRenderer,Image,TrueShadow,CanvasGroup,DOTweenAnimation
    - Button_Shop [on] aMin(1,0) aMax(1,0) pos(-61,380) size(240,240) pivot(1,0) | CanvasRenderer,Image,Button
    - <nested/stripped transform 8305339019458478509> (see PrefabInstance)
  - GO_Result [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(1080,2160) pivot(0.5,0.5) | CanvasRenderer,Image,CanvasGroup,Mask,UILayerBlurStack
    - CG_Page [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,48.5) size(972,1695) pivot(0.5,0.5) | RectMask2D
      - GO_LightEffect [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,385) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
        - PI_Light [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
        - Particle Image [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
        - Particle Image [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
      - CG_ProductInfo [on] aMin(0.5,1) aMax(0.5,1) pos(0,-903) size(972,304) pivot(0.5,1) | CanvasGroup
        - Text_Brand [on] aMin(0.5,1) aMax(0.5,1) pos(0,-8) size(0,48) pivot(0.5,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
          - RawImage_Grade [on] aMin(0,0.5) aMax(0,0.5) pos(0,0) size(64,64) pivot(0,0.5) | CanvasRenderer,RawImage
        - Text_Name [on] aMin(0.5,0) aMax(0.5,0) pos(0,0) size(876,112) pivot(0.5,0) | CanvasRenderer,TextMeshProUGUI
      - CG_Price [on] aMin(0.5,1) aMax(0.5,1) pos(0,-975) size(876,88) pivot(0.5,1) | CanvasGroup
        - Text_Price [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(0,88) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
    - CG_ButtonGroup [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasGroup
      - Button_Order [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,-921.76) size(772.414,778.24) pivot(0.5,0.5) | CanvasRenderer,Image,Button,TutorialButtonGlow,TrueShadow,TrueShadow,PlaySelectSound
        - Image_GuideShine [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement
        - Image [on] aMin(0,0) aMax(1,1) pos(0,0) size(-80,-400) pivot(0.5,0.5) | CanvasRenderer,Image
        - GO_PlayInfo [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,8.76) size(0,118) pivot(0.5,0.5) | VerticalLayoutGroup,ContentSizeFitter
          - Text_PlayInfo [on] aMin(0,0) aMax(0,0) pos(0,0) size(318,72) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI,TextAnimator_TMP,LayoutElement
          - GO_PlayInfoTicket [OFF] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement,HorizontalLayoutGroup
            - RawImage_PlayInfoTicket [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,46) pivot(0.5,0.5) | CanvasRenderer,RawImage,LayoutElement
            - Text_PlayInfoTicket [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,40) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI,LayoutElement
        - PlayButtonShine [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,Mask
          - RT_ButtonShine [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(-300,300) size(120,800) pivot(0.5,0.5) rotQ=(0,0,-0.382683,0.92388) euler=(0,0)z=-45 | CanvasRenderer,Image,FillGradientFilter
      - Button_OrderSide [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(368,-926) size(180,180) pivot(0.5,0.5) | CanvasRenderer,Image,Button,TrueShadow,TrueShadow,TutorialButtonGlow
        - Image_GuideShine [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement
      - Button_Retry [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(-368,-926) size(180,180) pivot(0.5,0.5) | CanvasRenderer,Image,Button
    - GO_ProductFXMask [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,230) size(978,1374) pivot(0.5,0.5) | RectMask2D
      - PI_GoldConfetti [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,155) size(1080,1600) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
        - GoldFoil [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,GoldConfettiGraphic
    - RawImage_ProductGlow [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,155) size(1116,1116) pivot(0.5,0.5) | CanvasRenderer,RawImage,CanvasGroup
    - GO_GoldConfetti [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,155) size(1080,1600) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
      - GoldFoil [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,GoldConfettiGraphic
    - RawImage_Product [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,385) size(720,720) pivot(0.5,0.5) | CanvasRenderer,RawImage,CanvasGroup,TrueShadow
    - RT_Multiple [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,385) size(720,720) pivot(0.5,0.5) | CanvasGroup
    - PI_EventConfetti [on] aMin(0.5,1) aMax(0.5,1) pos(0,100) size(0,0) pivot(0.5,1) rotQ=(0,0,1,0) euler=(0,0)z=180 | CanvasRenderer,ParticleImage,LayoutElement
    - PlayMainResultLog [on] aMin(0.5,1) aMax(0.5,1) pos(0,-184) size(972,132) pivot(0.5,1) | CanvasRenderer,Image,Mask
    - Image_ResultLogo [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(-372,1010) size(240,38) pivot(0.5,0.5) | CanvasRenderer,Image
    - RT_ResultListMask [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,-799) size(972,432) pivot(0.5,0) | CanvasGroup,RectMask2D
      - GO_DrawingResultProductInfo [OFF] aMin(0,0) aMax(1,0) pos(0,0) size(0,344) pivot(0.5,0) | CanvasRenderer,Image,ToggleGroup,PlayMainDrawingResultProductInfo,UILayerBlur
        - LoopScroll [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | LoopHorizontalScrollRect
          - Viewport [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
            - Content [on] aMin(0,1) aMax(0,1) pos(0,0) size(0,0) pivot(0,1) | CanvasRenderer,GridLayoutGroup,ContentSizeFitter,Image
          - Scrollbar Horizontal [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0,0) | Scrollbar
            - Sliding Area [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | 
              - Handle [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,0.5) | 
        - Image [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,OutlineFilter
  - GO_NavbarVisual [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(1080,2160) pivot(0.5,0.5) | 
    - GO_Navbar [on] aMin(0,0) aMax(1,0) pos(0,0) size(0,220) pivot(0.5,0) | CanvasRenderer,RoundedImage
      - RT_ButtonGroup [on] aMin(0.5,1) aMax(0.5,1) pos(0,0) size(1080,220) pivot(0.5,1) | HorizontalLayoutGroup
        - GO_NavbarButtonMarket [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,1) | CanvasRenderer,Image,Button
          - Toggle [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | Toggle
          - Image_Icon [on] aMin(0.5,1) aMax(0.5,1) pos(0,-52) size(85,85) pivot(0.5,1) | CanvasRenderer,Image
          - Text [on] aMin(0.5,1) aMax(0.5,1) pos(0,-120) size(0,44) pivot(0.5,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
        - GO_NavbarButtonCatchShop [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,1) | CanvasRenderer,Image,Button
          - Toggle [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | Toggle
          - Image_Icon [on] aMin(0.5,1) aMax(0.5,1) pos(0,-52) size(85,85) pivot(0.5,1) | CanvasRenderer,Image
          - Text [on] aMin(0.5,1) aMax(0.5,1) pos(0,-120) size(0,44) pivot(0.5,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
        - GO_NavbarButtonPlay [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,Button
          - Image_Icon [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,16) size(148,148) pivot(0.5,0.5) | CanvasRenderer,Image
        - GO_NavbarButtonRank [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,1) | CanvasRenderer,Image,Button
          - Toggle [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | Toggle
          - Image_Icon [on] aMin(0.5,1) aMax(0.5,1) pos(0,-52) size(85,85) pivot(0.5,1) | CanvasRenderer,Image
          - Text [on] aMin(0.5,1) aMax(0.5,1) pos(0,-120) size(0,44) pivot(0.5,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
        - Button_Inventory [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,0) pivot(0.5,1) | CanvasRenderer,Image,Button,TutorialButtonGlow
          - Image_GuideCircle [OFF] aMin(0.5,1) aMax(0.5,1) pos(0,-94.5) size(140,140) pivot(0.5,0.5) | CanvasRenderer,Image,TrueShadow,TrueShadow,LayoutElement
          - Toggle [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | Toggle
          - Image_Icon [on] aMin(0.5,1) aMax(0.5,1) pos(0,-52) size(85,85) pivot(0.5,1) | CanvasRenderer,Image,TrueShadow
            - Image_GuideShine [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement
            - GO_FirstJoinPresentGuide [OFF] aMin(0.5,0) aMax(0.5,0) pos(-27,83) size(238,82) pivot(0.5,0) scale=(0,0,0) | CanvasRenderer,Image,DOTweenAnimation,TrueShadow
          - Text [on] aMin(0.5,1) aMax(0.5,1) pos(0,-120) size(0,44) pivot(0.5,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
          - GO_ReceiveEffect [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage,Canvas
            - 1 [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
            - 2 [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
            - 3 [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(100,100) pivot(0.5,0.5) | CanvasRenderer,ParticleImage
      - GO_Lock [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
    - NavbarTransition [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | 
      - Image_Block [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
      - Image_EmptyMarket [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,CanvasGroup
        - Image_LoadingShine [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
        - Text_EmptyTitle [on] aMin(0,1) aMax(0,1) pos(48,-38) size(0,72) pivot(0,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
      - Image_EmptyCatchShop [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,CanvasGroup
        - Image_LoadingShine [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
      - Image_EmptyPlay [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,CanvasGroup
        - Image_LoadingShine [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
      - Image_EmptyRank [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,CanvasGroup
        - Image_LoadingShine [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
        - Text_EmptyTitle [on] aMin(0,1) aMax(0,1) pos(48,-38) size(0,72) pivot(0,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
      - Image_EmptyProfile [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,CanvasGroup
        - Image_LoadingShine [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
        - Text_EmptyTitle [on] aMin(0,1) aMax(0,1) pos(48,-38) size(0,72) pivot(0,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
  - GO_Delivery [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(1080,2160) pivot(0.5,0.5) | CanvasRenderer,Image,Mask
    - Scroll View [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | ScrollRect
      - Viewport [on] aMin(0,0) aMax(1,1) pos(0,-148) size(0,-408) pivot(0,1) | CanvasRenderer,Image,Mask
        - RT_Content [on] aMin(0.5,1) aMax(0.5,1) pos(0,0) size(1080,0) pivot(0.5,1) | VerticalLayoutGroup,ContentSizeFitter
          - Title [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,136) pivot(0.5,0.5) | 
            - Text [on] aMin(0,0.5) aMax(0,0.5) pos(48,0) size(0,54) pivot(0,0.5) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
          - Image (1) [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,12) pivot(0.5,1) | CanvasRenderer,Image
          - AddressTitle [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,140) pivot(0.5,0.5) | 
            - Text [on] aMin(0,0.5) aMax(0,0.5) pos(48,-16) size(200,50) pivot(0,0.5) | CanvasRenderer,TextMeshProUGUI
            - Text [on] aMin(1,0.5) aMax(1,0.5) pos(-48,-16) size(0,51) pivot(1,0.5) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
              - Image (1) [on] aMin(1,0.5) aMax(1,0.5) pos(0,0) size(56,56) pivot(1,0.5) | CanvasRenderer,Image
          - GO_Address [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,317) pivot(0.5,0.5) | 
            - Text [on] aMin(0,1) aMax(0,1) pos(48,-32) size(0,60) pivot(0,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
              - Text [on] aMin(1,0.5) aMax(1,0.5) pos(12,0) size(0,60) pivot(0,0.5) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
            - Text (1) [on] aMin(0,1) aMax(0,1) pos(48,-124) size(0,60) pivot(0,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
              - GameObject [on] aMin(1,0.5) aMax(1,0.5) pos(8,0) size(40,40) pivot(0,0.5) | 
                - Image (1) [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(6,6) pivot(0.5,0.5) | CanvasRenderer,Image
              - Text [on] aMin(1,0.5) aMax(1,0.5) pos(56,0) size(0,60) pivot(0,0.5) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
            - Text (2) [on] aMin(0,1) aMax(0,1) pos(48,-216) size(964,0) pivot(0,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
          - Image (2) [on] aMin(0,0) aMax(0,0) pos(0,0) size(0,12) pivot(0.5,1) | CanvasRenderer,Image
          - RT_Cell [on] aMin(0,1) aMax(0,1) pos(540,-851) size(1080,0) pivot(0.5,0.5) | VerticalLayoutGroup,ContentSizeFitter
            - Text_DeliveryHeading [on] aMin(0,1) aMax(0,1) pos(48,-60) size(600,60) pivot(0,1) | CanvasRenderer,TextMeshProUGUI,LayoutElement
      - Scrollbar Vertical [on] aMin(1,0) aMax(1,1) pos(0,0) size(0,0) pivot(1,1) | CanvasRenderer,Image,Scrollbar
        - Sliding Area [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | 
          - Handle [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
    - Image (1) [on] aMin(0.5,0) aMax(0.5,0) pos(0,0) size(1080,400) pivot(0.5,0) | CanvasRenderer,Image,FillGradientFilter
    - Buttons [on] aMin(0,0) aMax(1,0) pos(0,-300) size(0,690) pivot(0.5,0) | CanvasRenderer,Image
      - Button_Pay [on] aMin(0.5,0) aMax(0.5,0) pos(0,356) size(984,140) pivot(0.5,0) | CanvasRenderer,Image,Button,TrueShadow,TrueShadow,TutorialButtonGlow
        - Image_GuideShine [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,LayoutElement
        - Text [on] aMin(0,0) aMax(1,1) pos(0,0) size(-48,0) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI
    - GO_FingerPoint (Missing Prefab with guid: 13f794b97e812c041a575936ab6f0caf) [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,-954) size(1000,1000) pivot(0.5,0.5) | 
    - Image [on] aMin(0,1) aMax(1,1) pos(0,0) size(0,140) pivot(0.5,1) | CanvasRenderer,Image
      - Image (1) [OFF] aMin(0,0.5) aMax(0,0.5) pos(48,0) size(96,96) pivot(0,0.5) | CanvasRenderer,Image
      - Text [OFF] aMin(0.5,1) aMax(0.5,1) pos(0,-42) size(0,56) pivot(0.5,1) | CanvasRenderer,TextMeshProUGUI,ContentSizeFitter
  - Text_TutorialTitle [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,-407) size(700,100) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI
  - Button_TutorialSkip [on] aMin(1,1) aMax(1,1) pos(-68,-43) size(136,54) pivot(1,1) | CanvasRenderer,TextMeshProUGUI,Button
    - GO_SkipDot [on] aMin(0,0.5) aMax(0,0.5) pos(-17,0) size(10,10) pivot(0.5,0.5) | CanvasRenderer,Image
  - GO_Finger [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(300,300) pivot(0.5,0.5) | CanvasRenderer,Image,CanvasGroup,TrueShadow
  - GO_DeliveryDot [OFF] aMin(0.5,0.5) aMax(0.5,0.5) pos(-487,1010) size(10,10) pivot(0.5,0.5) | CanvasRenderer,Image
  - RT_TutorialTitle [OFF] aMin(1,1) aMax(1,1) pos(-192,-43) size(158,54) pivot(1,1) | HorizontalLayoutGroup
    - Image_TutorialDot [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(-126.5,0) size(10,10) pivot(0.5,0.5) | CanvasRenderer,Image
    - Text_TutorialLabel [on] aMin(1,1) aMax(1,1) pos(-178.5,-70) size(136,54) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI
  - GO_TutorialLogo [on] aMin(0,1) aMax(0,1) pos(48,-52) size(235,38) pivot(0,1) | CanvasRenderer,Image
```

- `<nested/stripped transform 8305339019458478509>` = PrefabInstance `GO_WinnerBanner` (원본 `Assets/Resources/Prefabs/UI/Other/PlayMainWinnerBanner.prefab`), 부모 `GO_Machine`. 오버라이드: anchor (0.5,1)/(0.5,1), pivot (0.5,0.5), sizeDelta (548.78, 64), anchoredPosition (0,-236), m_Name=GO_WinnerBanner, TMP 2개 m_ActiveFontFeatures[0]=1801810542('kern').
- `GO_Delivery/GO_FingerPoint (Missing Prefab with guid: 13f794b97e812c041a575936ab6f0caf)`: 원본 프리팹이 프로젝트에 없음(미해결). 자리표시 GameObject만 남아 있음, 컴포넌트 없음.

## 2. 컴포넌트 상세 (GameObject 경로별)

표기: Image type/color(#RRGGBB/a알파)/raycast/ppuMul(pixelsPerUnitMultiplier)/preserveAspect. TMP hAlign 1=Left 2=Center 4=Right, vAlign 256=Top 512=Middle 1024=Bottom 4096=Geometry, wrap 0=NoWrap 1=Normal, overflow 0=Overflow 1=Ellipsis 3=Truncate. Button transition 0=None 1=ColorTint 2=SpriteSwap. ContentSizeFitter 0=Unconstrained 2=PreferredSize. childAlign 0=UpperLeft 1=UpperCenter 4=MiddleCenter. ref 경로 뒤 fileID 21300000=단일 Sprite, 2800000=Texture2D.

```text
- /UI_TutorialDrawing [on]
  * Canvas renderMode=2 overrideSorting=0 sortingOrder=0 addlShaderChannels=0
  * GraphicRaycaster
      fields={m_BlockingMask: {m_Bits: 4294967295, serializedVersion: 2}, m_BlockingObjects: 0, m_IgnoreReversedGraphics: 1}
  * UI_TutorialDrawing
      fields={aniTime: 0.3, animationType: 4, camera_texture: {fileID: 0}, clawOpen: {fileID: 21300000, guid: 1a391ffa9835dd54cb09952275a13e46, type: 3}, closeType: 4, dummyFx: {fileID: 1596832008565985620, guid: f3fa26af7bec4ba48b9e527d835c91fc, type: 3}, graphicRaycaster: {fileID: 0}, layerType: 2, mat_productMotion: {fileID: 2100000, guid: 73df39a6676f39c408b1647c9d2f8ad0, type: 2}, objectSpace: {fileID: 0}, rawImage_Render: {fileID: 0}, raycastAlwaysOn: 0, resultVideo: {fileID: 32900000, guid: 603c2e0319563e04dbcdf9104b55999b, type: 3}}
      ref mat_productMotion -> Assets/_Material/Play/Mat_PlayMainProductMotion.mat (fileID 2100000)
      ref dummyFx -> Assets/_Effects/SurfaceFx/SurfaceFx_DrawingGoldShine.prefab (fileID 1596832008565985620)
      ref clawOpen -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawOpen.png (fileID 21300000)
      ref resultVideo -> Assets/_Video/Video_Drawing.mp4 (fileID 32900000)
- /UI_TutorialDrawing/Image_BG [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=1 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/Image_PlayMainEmpty.jpg (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine [on]
  * Image type=Simple color=#F1F0F4/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawBG.jpg (fileID 21300000)
  * Mask showMaskGraphic=1
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * BackdropFx
      fields={duration: 8, playOnEnable: 1, previewTarget: {fileID: 0}}
  * UILayerBlurStack
      fields={blurShader: {fileID: 4800000, guid: cc0cd8a2cef9280449cbf210e03e35fc, type: 3}, maxSize: 512, onChangeOnly: 0, panelShader: {fileID: 4800000, guid: dcda6cbd5f83bc844a8de0e7ce2a589b, type: 3}, updateRate: 30}
      ref panelShader -> Assets/_Effects/ScreenFx/Backdrop.shader (fileID 4800000)
      ref blurShader -> Assets/_Effects/ScreenFx/UILayerBlurFilter.shader (fileID 4800000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy [on]
  * Image type=Sliced color=#FFFFFF/a0.00392 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 80x80 - Clean.png (fileID 21300000)
  * Mask showMaskGraphic=0
  * Button interactable=0 transition=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInBG.jpg (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
  * Mask showMaskGraphic=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw [on]

- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/Image_Box [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawClawBox.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown [on]

- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/Image_Line [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawLine.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/Particle [OFF]
  * ParticleImage
      ref m_Material -> Assets/_Effects/UIEffect/UIEffect_CellLight/FlareUp.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_UpLightA.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw [OFF]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ [on]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ [on]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_EndSlider.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ [on]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider [on]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider [on]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndPoint [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_EndSlider.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ [on]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider [on]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider [on]
  * ParticleImage
      ref m_Material -> Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndPoint [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_EndSlider.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand [on]

- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/PI_Claw [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_Light.png (fileID 21300000)
      ref m_Texture -> UNRESOLVED guid 0000000000000000f000000000000000 (fileID 10300)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/PI_Claw/Particle Image [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_Star.png (fileID 21300000)
      ref m_Texture -> UNRESOLVED guid 0000000000000000f000000000000000 (fileID 10300)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent [OFF]
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * Button interactable=0 transition=0
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info [on]
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=0 ignoreParent=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/RawImage [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/AX/Default_Dummy.png (fileID 2800000)
  * Mask showMaskGraphic=1
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/RawImage/RT_Shine [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
  * FillGradientFilter
      fields={_blendMode: 0, _diagonalFlip: 0, _gradient: {atime0: 0, atime1: 26214, atime2: 32768, atime3: 39321, atime4: 65535, atime5: 65535, atime6: 0, atime7: 0, ctime0: 0, ctime1: 65535, ctime2: 65535, ctime3: 65535, ctime4: 65535, ctime5: 0, ctime6: 0, ctime7: 0, key0: {a: 0, b: 1, g: 1, r: 1}, key1: {a: 0.9019608, b: 1, g: 1, r: 1}, key2: {a: 1, b: 0.6, g: 0.6, r: 0.6}, key3: {a: 0.9019608, b: 0.6, g: 0.6, r: 0.6}, key4: {a: 0, b: 0.6, g: 0.6, r: 0.6}, key5: {a: 0, b: 0, g: 0, r: 0}, key6: {a: 0, b: 0, g: 0, r: 0}, key7: {a: 0, b: 0, g: 0, r: 0}, m_ColorSpace: 0, m_Mode: 0, m_NumAlphaKeys: 5, m_NumColorKeys: 2, serializedVersion: 2}, _gradientCenterX: 0, _gradientCenterY: 0, _gradientColorSpace: 0, _gradientDither: 0, _gradientLerp: 1, _gradientLinearAngle: 0, _gradientOffset: 0, _gradientRadius: 0.5, _gradientScale: 1, _gradientScaleCenter: 0.5, _gradientShape: 2, _gradientWrap: 0, _renderSpace: 0, _scrollSpeed: 0, _strength: 1}
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/Message [on]
  * Image type=Sliced color=#FBFBFB/a0.698 raycast=0 ppuMul=1.15 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 60x60 - Clean.png (fileID 21300000)
  * HorizontalLayoutGroup padding(L18 R18 T0 B0) spacing=12 childAlign=4 ctrlW=1 ctrlH=0 expW=1 expH=1
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/Message/Text_Info [on]
  * TextMeshProUGUI size=32 autoSize=0(18-72) style=0 color=#614AD8/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='상품 주인공은?'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner [on]
  * CanvasGroup alpha=0 interactable=1 blocksRaycasts=0 ignoreParent=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/RawImage_Winner [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/AX/Default_Dummy.png (fileID 2800000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner [on]
  * Image type=Sliced color=#FBFBFB/a0.698 raycast=0 ppuMul=1.15 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 60x60 - Clean.png (fileID 21300000)
  * HorizontalLayoutGroup padding(L18 R18 T0 B0) spacing=12 childAlign=4 ctrlW=1 ctrlH=0 expW=1 expH=1
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage [on]
  * Button interactable=0 transition=0
  * LayoutElement ignore=0 min=(40,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/Mask [on]
  * Image type=Sliced color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 1024x1024 - Clean.png (fileID 21300000)
  * Mask showMaskGraphic=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/Mask/ProfileBgImage [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Dummy/Dummy_ProfileBackgroun.png (fileID 2800000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/Mask/ProfileCharImage [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Dummy/Dummy_ProfileCharacter.png (fileID 2800000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/grade [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Image_Grade(Silver).png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/GO_Mine [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Image_ProfileMine.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/Text_Winner [on]
  * TextMeshProUGUI size=32 autoSize=0(18-72) style=0 color=#27262B/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='우승자'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/Image [on]
  * Image type=Sliced color=#FBFBFB/a1 raycast=0 ppuMul=1.15 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 60x60 - Stroke 2.png (fileID 21300000)
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
  * FillGradientFilter
      fields={_blendMode: 1, _diagonalFlip: 0, _gradient: {atime0: 0, atime1: 65535, atime2: 0, atime3: 0, atime4: 0, atime5: 0, atime6: 0, atime7: 0, ctime0: 0, ctime1: 32768, ctime2: 65535, ctime3: 65535, ctime4: 65535, ctime5: 0, ctime6: 0, ctime7: 0, key0: {a: 1, b: 0.84705883, g: 0.2901961, r: 0.38039216}, key1: {a: 1, b: 0.829066, g: 0.4025632, r: 0.8301887}, key2: {a: 0, b: 0.84705883, g: 0.2901961, r: 0.38039216}, key3: {a: 0, b: 0.1966714, g: 0.7230087, r: 0.8207547}, key4: {a: 0, b: 0.1966714, g: 0.7230087, r: 0.8207547}, key5: {a: 0, b: 0, g: 0, r: 0}, key6: {a: 0, b: 0, g: 0, r: 0}, key7: {a: 0, b: 0, g: 0, r: 0}, m_ColorSpace: 0, m_Mode: 0, m_NumAlphaKeys: 2, m_NumColorKeys: 3, serializedVersion: 2}, _gradientCenterX: 0, _gradientCenterY: 0, _gradientColorSpace: 0, _gradientDither: 0, _gradientLerp: 1, _gradientLinearAngle: 0, _gradientOffset: 0, _gradientRadius: 0.5, _gradientScale: 1, _gradientScaleCenter: 0.5, _gradientShape: 6, _gradientWrap: 1, _renderSpace: 0, _scrollSpeed: -1, _strength: 1}
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/Image_Claw [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClaw.png (fileID 21300000)
  * ImageNormalFx
      fields={lightDirection: {x: 0.15, y: 0.6, z: 0.4}, motion: 1, motionAmount: 0.5, motionDuration: 4, normalTemplate: {fileID: 2100000, guid: 75fc2cb7bbcc15d4d809f742df1c457c, type: 2}, normalTexture: {fileID: 0}, smoothTemplate: {fileID: 2100000, guid: 1bb777a92adad7046a4849e66a7c97de, type: 2}, strength: 1, template: {fileID: 2100000, guid: 1c7ac32c79d15f74fbbf6ff6f7ea24bc, type: 2}}
      ref template -> Assets/_Effects/SurfaceFx/Mat_ImageNormalFx.mat (fileID 2100000)
      ref normalTemplate -> Assets/_Effects/ProductFx/Mat_EnhancementInvertedNormal.mat (fileID 2100000)
      ref smoothTemplate -> Assets/_Effects/ScreenFx/Mat_Blur.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/Image_Box [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawClawBoxFront.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy03 [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy05.png (fileID 2800000)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy02 [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy01.png (fileID 2800000)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy04 [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy04.png (fileID 2800000)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy05 [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy03.png (fileID 2800000)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy01 [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy02.png (fileID 2800000)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Image_Front [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBG.png (fileID 21300000)
  * ImageNormalFx
      fields={lightDirection: {x: 0.15, y: 0.6, z: 0.4}, motion: 1, motionAmount: 0.5, motionDuration: 4, normalTemplate: {fileID: 2100000, guid: 75fc2cb7bbcc15d4d809f742df1c457c, type: 2}, normalTexture: {fileID: 2800000, guid: 2bf98e5ab1628cf4997f52f35accebee, type: 3}, smoothTemplate: {fileID: 2100000, guid: 1bb777a92adad7046a4849e66a7c97de, type: 2}, strength: 1, template: {fileID: 2100000, guid: 1c7ac32c79d15f74fbbf6ff6f7ea24bc, type: 2}}
      ref template -> Assets/_Effects/SurfaceFx/Mat_ImageNormalFx.mat (fileID 2100000)
      ref normalTemplate -> Assets/_Effects/ProductFx/Mat_EnhancementInvertedNormal.mat (fileID 2100000)
      ref smoothTemplate -> Assets/_Effects/ScreenFx/Mat_Blur.mat (fileID 2100000)
      ref normalTexture -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBGNormal.png (fileID 2800000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Image_Glass [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Effects/ScreenFx/GlassShine.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawingGlass.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Image_TutorialInfo [on]
  * Image type=Simple color=#171324/a1 raycast=0 ppuMul=1 preserveAspect=0
  * UILayerBlur
      fields={radius: 24, tint: 0.7}
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/RT_Guide [on]

- /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/RT_Guide/Text_Guide [on]
  * TextMeshProUGUI size=36 autoSize=0(18-72) style=0 color=#FFFFFF/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='지금 무료로 뽑기를 체험해 보세요!'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Machine/Button_Count [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=1 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButton.png (fileID 21300000)
  * Button interactable=0 transition=2
      ref m_SpriteState.m_PressedSprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButtonSelect.png (fileID 21300000)
  * TutorialButtonGlow
      fields={activationShader: {fileID: 4800000, guid: 5a394d664ed5dee42a9f165107b42b06, type: 3}, glowCore: {fileID: 3168148162707723947}, glowSoft: {fileID: 2498658813703611331}, guideCircle: {fileID: 0}, guideIcon: {fileID: 0}, iconGlow: {fileID: 0}, illuminatedMaterial: {fileID: 0}, shine: {fileID: 3279316520965998614}}
      ref activationShader -> Assets/_Effects/ScreenFx/DrawingThemeShine.shader (fileID 4800000)
  * PlaySelectSound
      fields={}
- /UI_TutorialDrawing/GO_Machine/Button_Count/Image_CountGlow [on]
  * Image type=Simple color=#000000/a0 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 96x96 - Clean.png (fileID 21300000)
  * TrueShadow (DISABLED) size=40 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#8C7CDD/a0.5 blend=0 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TrueShadow (DISABLED) size=10 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#F0D6FF/a0.9 blend=2 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
- /UI_TutorialDrawing/GO_Machine/Button_Count/Image_GuideShine [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Shaders/Material_TutorialGuideShine.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButton.png (fileID 21300000)
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Machine/Button_Count/Text_Count [on]
  * TextMeshProUGUI size=42 autoSize=0(18-72) style=0 color=#9686ED/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='1회'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Machine/Button_Draw [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=1 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButton.png (fileID 21300000)
  * Button interactable=0 transition=2
      ref m_SpriteState.m_PressedSprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButtonSelect.png (fileID 21300000)
      ref m_SpriteState.m_DisabledSprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButtonLock.png (fileID 21300000)
  * TrueShadow (DISABLED) size=40 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#8C7CDD/a0.5 blend=0 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TrueShadow (DISABLED) size=10 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#F0D6FF/a0.9 blend=2 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TutorialButtonGlow
      fields={activationShader: {fileID: 4800000, guid: 5a394d664ed5dee42a9f165107b42b06, type: 3}, glowCore: {fileID: 8661509239583440798}, glowSoft: {fileID: 7095865722580892171}, guideCircle: {fileID: 0}, guideIcon: {fileID: 0}, iconGlow: {fileID: 0}, illuminatedMaterial: {fileID: 2100000, guid: 8643a8889254c3d4aa103a4615eee1b0, type: 2}, shine: {fileID: 4947079513436448474}}
      ref activationShader -> Assets/_Effects/ScreenFx/DrawingThemeShine.shader (fileID 4800000)
      ref illuminatedMaterial -> Assets/_Shaders/Material_TutorialButtonIllumination.mat (fileID 2100000)
  * PlaySelectSound
      fields={}
- /UI_TutorialDrawing/GO_Machine/Button_Draw/Image_GuideShine [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Shaders/Material_TutorialGuideShine.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButton.png (fileID 21300000)
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Machine/Button_Draw/Image [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Machine/Button_Draw/GO_PlayInfo [on]
  * VerticalLayoutGroup padding(L0 R0 T0 B0) spacing=0 childAlign=4 ctrlW=1 ctrlH=1 expW=0 expH=0
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Machine/Button_Draw/GO_PlayInfo/Text_PlayInfo [on]
  * TextMeshProUGUI size=52 autoSize=0(18-52) style=0 color=#FFFFFF/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='무료 뽑기'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * TextAnimator_TMP
      fields={_text: <size=64>뽑기, animationLoop: 0, databaseActions: {fileID: 11400000, guid: cff5444ba2112e241bf8065e515b0349, type: 2}, databaseAppearances: {fileID: 11400000, guid: 2d6053f07661ccc43832bb9752097f79, type: 2}, databaseBehaviors: {fileID: 11400000, guid: 6e247599c8b925140bd58a13767a1337, type: 2}, defaultAppearancesTags: [], defaultBehaviorsTags: [], defaultDisappearancesTags: [], defaultTagsMode: 0, isResettingTimeOnNewText: 1, referenceFontSize: 10, styleSheet: {fileID: 0}, timeScale: 0, typewriterStartsAutomatically: 0, useDefaultDatabases: 1, useDefaultStyleSheet: 1, useDynamicScaling: 1}
      ref databaseBehaviors -> Assets/Plugins/Febucci/Text Animator/Data/Behaviors/Behaviors Database.asset (fileID 11400000)
      ref databaseAppearances -> Assets/Plugins/Febucci/Text Animator/Data/Appearances/Appearances Database.asset (fileID 11400000)
      ref databaseActions -> Assets/Plugins/Febucci/Text Animator/Data/Actions/Actions Database.asset (fileID 11400000)
  * LayoutElement ignore=0 min=(-1,72) pref=(220,72) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Machine/Button_Draw/GO_PlayInfo/GO_PlayInfoTicket [OFF]
  * Image type=Sliced color=#FFFFFF/a0.251 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 46x46 - Clean.png (fileID 21300000)
  * LayoutElement ignore=0 min=(-1,46) pref=(-1,-1) flex=(-1,-1)
  * HorizontalLayoutGroup padding(L16 R16 T0 B0) spacing=4 childAlign=4 ctrlW=1 ctrlH=0 expW=0 expH=1
- /UI_TutorialDrawing/GO_Machine/Button_Draw/GO_PlayInfo/GO_PlayInfoTicket/RawImage_PlayInfoTicket [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Icon/Item/Icon_TicketPlay.png (fileID 2800000)
  * LayoutElement ignore=0 min=(46,-1) pref=(46,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Machine/Button_Draw/GO_PlayInfo/GO_PlayInfoTicket/Text_DrawTicket [on]
  * TextMeshProUGUI size=28 autoSize=0(18-52) style=0 color=#3B3178/a0.6 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='2장'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
  * LayoutElement ignore=0 min=(-1,72) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick [on]

- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=1 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png (fileID 4943140)
  * DrawingJoyStick
      fields={arr_sprites: [{fileID: -1083894602, guid: f4e25dab65fe28a4aa2c4fdde0cd864d, type: 3}, {fileID: -1875154639, guid: f4e25dab65fe28a4aa2c4fdde0cd864d, type: 3}, {fileID: 4943140, guid: f4e25dab65fe28a4aa2c4fdde0cd864d, type: 3}, {fileID: 1229158672, guid: f4e25dab65fe28a4aa2c4fdde0cd864d, type: 3}, {fileID: -1625447057, guid: f4e25dab65fe28a4aa2c4fdde0cd864d, type: 3}], go_joystickGuide: {fileID: 340099190856321997}, is_introPlay: 0}
      ref arr_sprites[0] -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png (fileID -1083894602)
      ref arr_sprites[1] -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png (fileID -1875154639)
      ref arr_sprites[2] -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png (fileID 4943140)
      ref arr_sprites[3] -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png (fileID 1229158672)
      ref arr_sprites[4] -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png (fileID -1625447057)
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide [OFF]

- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Image [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawJoystickGuideBG.png (fileID 21300000)
  * TrueShadow size=16 spread=0 angle=90 dist=8 offset={'x': 4.768372e-07, 'y': -8} color=#46398E/a0.122 blend=0 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
  * DOTweenAnimation animType=1 targetType=5 dur=0.6 delay=0 ease=6 loops=-1 loopType=1 endV3={'x': 70, 'y': 250, 'z': 0} endF=0 endColor=#FFFFFF/a1 isRelative=0 isFrom=0 autoPlay=1
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Image/Text [on]
  * TextMeshProUGUI size=36 autoSize=0(18-72) style=0 color=#FFFFFF/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='좌우 이동하기'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow [on]

- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group [on]

- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image [on]
  * Image type=Simple color=#8673EA/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png (fileID 21300000)
  * TrueShadow size=6 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#986CFF/a0.6 blend=0 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * DOTweenAnimation animType=7 targetType=3 dur=0.6 delay=0.2 ease=6 loops=-1 loopType=1 endV3={'x': 0, 'y': 0, 'z': 0} endF=0 endColor=#FFFFFF/a1 isRelative=0 isFrom=0 autoPlay=1
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image (1) [on]
  * Image type=Simple color=#8673EA/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png (fileID 21300000)
  * TrueShadow size=6 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#986CFF/a0.6 blend=0 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * DOTweenAnimation animType=7 targetType=3 dur=0.6 delay=0.4 ease=6 loops=-1 loopType=1 endV3={'x': 0, 'y': 0, 'z': 0} endF=0 endColor=#FFFFFF/a1 isRelative=0 isFrom=0 autoPlay=1
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image (2) [on]
  * Image type=Simple color=#8673EA/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png (fileID 21300000)
  * TrueShadow size=6 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#986CFF/a0.6 blend=0 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * DOTweenAnimation animType=7 targetType=3 dur=0.6 delay=0.6 ease=6 loops=-1 loopType=1 endV3={'x': 0, 'y': 0, 'z': 0} endF=0 endColor=#FFFFFF/a1 isRelative=0 isFrom=0 autoPlay=1
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow [on]

- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group [on]

- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image [on]
  * Image type=Simple color=#8673EA/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png (fileID 21300000)
  * TrueShadow size=6 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#986CFF/a0.6 blend=0 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * DOTweenAnimation animType=7 targetType=3 dur=0.6 delay=0.2 ease=6 loops=-1 loopType=1 endV3={'x': 0, 'y': 0, 'z': 0} endF=0 endColor=#FFFFFF/a1 isRelative=0 isFrom=0 autoPlay=1
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image (1) [on]
  * Image type=Simple color=#8673EA/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png (fileID 21300000)
  * TrueShadow size=6 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#986CFF/a0.6 blend=0 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * DOTweenAnimation animType=7 targetType=3 dur=0.6 delay=0.4 ease=6 loops=-1 loopType=1 endV3={'x': 0, 'y': 0, 'z': 0} endF=0 endColor=#FFFFFF/a1 isRelative=0 isFrom=0 autoPlay=1
- /UI_TutorialDrawing/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image (2) [on]
  * Image type=Simple color=#8673EA/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png (fileID 21300000)
  * TrueShadow size=6 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#986CFF/a0.6 blend=0 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * DOTweenAnimation animType=7 targetType=3 dur=0.6 delay=0.6 ease=6 loops=-1 loopType=1 endV3={'x': 0, 'y': 0, 'z': 0} endF=0 endColor=#FFFFFF/a1 isRelative=0 isFrom=0 autoPlay=1
- /UI_TutorialDrawing/GO_Machine/Button_Shop [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=1 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/Image_PlayMainCoin.png (fileID 21300000)
  * Button interactable=0 transition=0
- /UI_TutorialDrawing/GO_Result [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawResult.jpg (fileID 21300000)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * Mask showMaskGraphic=1
  * UILayerBlurStack
      fields={blurShader: {fileID: 4800000, guid: cc0cd8a2cef9280449cbf210e03e35fc, type: 3}, maxSize: 512, onChangeOnly: 1, panelShader: {fileID: 4800000, guid: dcda6cbd5f83bc844a8de0e7ce2a589b, type: 3}, updateRate: 30}
      ref panelShader -> Assets/_Effects/ScreenFx/Backdrop.shader (fileID 4800000)
      ref blurShader -> Assets/_Effects/ScreenFx/UILayerBlurFilter.shader (fileID 4800000)
- /UI_TutorialDrawing/GO_Result/CG_Page [on]
  * RectMask2D padding={'x': 0, 'y': 0, 'z': 0, 'w': 0} softness={'x': 0, 'y': 0}
- /UI_TutorialDrawing/GO_Result/CG_Page/GO_LightEffect [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_SliderLight.png (fileID 21300000)
      ref m_Texture -> UNRESOLVED guid 0000000000000000f000000000000000 (fileID 10300)
- /UI_TutorialDrawing/GO_Result/CG_Page/GO_LightEffect/PI_Light [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_Ellipse.png (fileID 21300000)
      ref m_Texture -> UNRESOLVED guid 0000000000000000f000000000000000 (fileID 10300)
- /UI_TutorialDrawing/GO_Result/CG_Page/GO_LightEffect/Particle Image [on]
  * ParticleImage
      ref m_Material -> Assets/_Effects/UIEffect/UIEffect_SliderEnd/CircleRainbow 1.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_Light.png (fileID 21300000)
      ref m_Texture -> UNRESOLVED guid 0000000000000000f000000000000000 (fileID 10300)
- /UI_TutorialDrawing/GO_Result/CG_Page/GO_LightEffect/Particle Image [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_Star.png (fileID 21300000)
      ref m_Texture -> UNRESOLVED guid 0000000000000000f000000000000000 (fileID 10300)
- /UI_TutorialDrawing/GO_Result/CG_Page/CG_ProductInfo [on]
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Result/CG_Page/CG_ProductInfo/Text_Brand [on]
  * TextMeshProUGUI size=40 autoSize=0(18-72) style=0 color=#FBFBFB/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 72, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text=None
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Result/CG_Page/CG_ProductInfo/Text_Brand/RawImage_Grade [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/AX/Icon_GradeRandom.png (fileID 2800000)
- /UI_TutorialDrawing/GO_Result/CG_Page/CG_ProductInfo/Text_Name [on]
  * TextMeshProUGUI size=38 autoSize=0(18-72) style=0 color=#D1D1D1/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=1 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text=None
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
- /UI_TutorialDrawing/GO_Result/CG_Page/CG_Price [on]
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Result/CG_Page/CG_Price/Text_Price [on]
  * TextMeshProUGUI size=64 autoSize=0(18-72) style=0 color=#FFFFFF/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text=None
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup [on]
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=1 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawResultButton.png (fileID 21300000)
  * Button interactable=0 transition=2
      ref m_SpriteState.m_PressedSprite -> Assets/_Images/Content/Draw/Image_DrawResultButtonSelect.png (fileID 21300000)
      ref m_SpriteState.m_DisabledSprite -> Assets/_Images/Content/Draw/Image_DrawResultButtonLock.png (fileID 21300000)
  * TutorialButtonGlow
      fields={activationShader: {fileID: 4800000, guid: 5a394d664ed5dee42a9f165107b42b06, type: 3}, glowCore: {fileID: 4423762504035441027}, glowSoft: {fileID: 2645769723336477463}, guideCircle: {fileID: 0}, guideIcon: {fileID: 0}, iconGlow: {fileID: 0}, illuminatedMaterial: {fileID: 2100000, guid: 8643a8889254c3d4aa103a4615eee1b0, type: 2}, shine: {fileID: 3952918087781703473}}
      ref activationShader -> Assets/_Effects/ScreenFx/DrawingThemeShine.shader (fileID 4800000)
      ref illuminatedMaterial -> Assets/_Shaders/Material_TutorialButtonIllumination.mat (fileID 2100000)
  * TrueShadow (DISABLED) size=40 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#000000/a0.6 blend=0 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TrueShadow (DISABLED) size=10 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#000000/a0.6 blend=1 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * PlaySelectSound
      fields={}
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/Image_GuideShine [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Shaders/Material_TutorialGuideShine.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawResultButton.png (fileID 21300000)
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/Image [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo [on]
  * VerticalLayoutGroup padding(L0 R0 T0 B0) spacing=0 childAlign=4 ctrlW=1 ctrlH=1 expW=0 expH=0
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/Text_PlayInfo [on]
  * TextMeshProUGUI size=52 autoSize=0(18-52) style=0 color=#FFFFFF/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='상품 받기'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * TextAnimator_TMP
      fields={_text: <size=64>뽑기, animationLoop: 0, databaseActions: {fileID: 11400000, guid: cff5444ba2112e241bf8065e515b0349, type: 2}, databaseAppearances: {fileID: 11400000, guid: 2d6053f07661ccc43832bb9752097f79, type: 2}, databaseBehaviors: {fileID: 11400000, guid: 6e247599c8b925140bd58a13767a1337, type: 2}, defaultAppearancesTags: [], defaultBehaviorsTags: [], defaultDisappearancesTags: [], defaultTagsMode: 0, isResettingTimeOnNewText: 1, referenceFontSize: 10, styleSheet: {fileID: 0}, timeScale: 0, typewriterStartsAutomatically: 0, useDefaultDatabases: 1, useDefaultStyleSheet: 1, useDynamicScaling: 1}
      ref databaseBehaviors -> Assets/Plugins/Febucci/Text Animator/Data/Behaviors/Behaviors Database.asset (fileID 11400000)
      ref databaseAppearances -> Assets/Plugins/Febucci/Text Animator/Data/Appearances/Appearances Database.asset (fileID 11400000)
      ref databaseActions -> Assets/Plugins/Febucci/Text Animator/Data/Actions/Actions Database.asset (fileID 11400000)
  * LayoutElement ignore=0 min=(318,72) pref=(318,72) flex=(0,0)
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/GO_PlayInfoTicket [OFF]
  * Image type=Sliced color=#FFFFFF/a0.251 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 46x46 - Clean.png (fileID 21300000)
  * LayoutElement ignore=0 min=(-1,46) pref=(-1,-1) flex=(-1,-1)
  * HorizontalLayoutGroup padding(L16 R16 T0 B0) spacing=4 childAlign=4 ctrlW=1 ctrlH=0 expW=0 expH=1
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/GO_PlayInfoTicket/RawImage_PlayInfoTicket [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/Content/Image_Space.png (fileID 2800000)
  * LayoutElement ignore=0 min=(46,-1) pref=(46,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/GO_PlayInfoTicket/Text_PlayInfoTicket [on]
  * TextMeshProUGUI size=28 autoSize=0(18-52) style=0 color=#3B3178/a0.6 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text=None
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
  * LayoutElement ignore=0 min=(-1,72) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/PlayButtonShine [on]
  * Image type=Simple color=#FFFFFF/a0.00392 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Image_PlayButtonShineMask.png (fileID 21300000)
  * Mask showMaskGraphic=0
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Order/PlayButtonShine/RT_ButtonShine [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
  * FillGradientFilter
      fields={_blendMode: 0, _diagonalFlip: 0, _gradient: {atime0: 0, atime1: 32768, atime2: 65535, atime3: 0, atime4: 0, atime5: 0, atime6: 0, atime7: 0, ctime0: 0, ctime1: 65535, ctime2: 65535, ctime3: 65535, ctime4: 65535, ctime5: 0, ctime6: 0, ctime7: 0, key0: {a: 0, b: 1, g: 1, r: 1}, key1: {a: 0.5019608, b: 1, g: 1, r: 1}, key2: {a: 0, b: 0.1966714, g: 0.7230087, r: 0.8207547}, key3: {a: 0, b: 0.1966714, g: 0.7230087, r: 0.8207547}, key4: {a: 0, b: 0.1966714, g: 0.7230087, r: 0.8207547}, key5: {a: 0, b: 0, g: 0, r: 0}, key6: {a: 0, b: 0, g: 0, r: 0}, key7: {a: 0, b: 0, g: 0, r: 0}, m_ColorSpace: 0, m_Mode: 0, m_NumAlphaKeys: 3, m_NumColorKeys: 2, serializedVersion: 2}, _gradientCenterX: 0, _gradientCenterY: 0, _gradientColorSpace: 0, _gradientDither: 0, _gradientLerp: 1, _gradientLinearAngle: 0, _gradientOffset: 0, _gradientRadius: 0.5, _gradientScale: 1, _gradientScaleCenter: 0.5, _gradientShape: 1, _gradientWrap: 0, _renderSpace: 0, _scrollSpeed: 0, _strength: 1}
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_OrderSide [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=1 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawOrderButton.png (fileID 21300000)
  * Button interactable=0 transition=0
      ref m_SpriteState.m_PressedSprite -> Assets/_Images/Content/Draw/Image_DrawOrderButtonSelect.png (fileID 21300000)
      ref m_SpriteState.m_DisabledSprite -> Assets/_Images/Content/Draw/Image_DrawOrderButtonLock.png (fileID 21300000)
  * TrueShadow (DISABLED) size=40 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#8C7CDD/a0.5 blend=0 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TrueShadow (DISABLED) size=10 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#F0D6FF/a0.9 blend=2 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TutorialButtonGlow
      fields={activationShader: {fileID: 4800000, guid: 5a394d664ed5dee42a9f165107b42b06, type: 3}, glowCore: {fileID: 5710921838029417291}, glowSoft: {fileID: 6892091166576118727}, guideCircle: {fileID: 0}, guideIcon: {fileID: 0}, iconGlow: {fileID: 0}, illuminatedMaterial: {fileID: 2100000, guid: 8643a8889254c3d4aa103a4615eee1b0, type: 2}, shine: {fileID: 1674713256615083189}}
      ref activationShader -> Assets/_Effects/ScreenFx/DrawingThemeShine.shader (fileID 4800000)
      ref illuminatedMaterial -> Assets/_Shaders/Material_TutorialButtonIllumination.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_OrderSide/Image_GuideShine [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Shaders/Material_TutorialGuideShine.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawOrderButton.png (fileID 21300000)
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Result/CG_ButtonGroup/Button_Retry [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Draw/Image_DrawReButton.png (fileID 21300000)
  * Button interactable=0 transition=0
      ref m_SpriteState.m_PressedSprite -> Assets/_Images/Content/Draw/Image_DrawReButtonSelect.png (fileID 21300000)
      ref m_SpriteState.m_DisabledSprite -> Assets/_Images/Content/Draw/Image_DrawReButtonLock.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Result/GO_ProductFXMask [on]
  * RectMask2D padding={'x': 0, 'y': 0, 'z': 0, 'w': 0} softness={'x': 12, 'y': 24}
- /UI_TutorialDrawing/GO_Result/GO_ProductFXMask/PI_GoldConfetti [on]
  * ParticleImage
- /UI_TutorialDrawing/GO_Result/GO_ProductFXMask/PI_GoldConfetti/GoldFoil [on]
  * GoldConfettiGraphic
      fields={burstSpeed: 1450, cacheShape: 1, count: 112, depthScale: 0.4, duration: 4.8, fallResponse: 4, fallSpeedScale: 3.7, flutterScale: 0.5, m_Color: {a: 1, b: 1, g: 1, r: 1}, m_Maskable: 1, m_Material: {fileID: 2100000, guid: 1aa4ea28bedfb8040b54c9389b11d644, type: 2}, m_OnCullStateChanged: {m_PersistentCalls: {m_Calls: []}}, m_RaycastPadding: {w: 0, x: 0, y: 0, z: 0}, m_RaycastTarget: 0, meshSegments: 4, pieceScale: 1.3, ribbonLengthScale: 0.8, seed: 74209, source: {fileID: 3277542342638210161}, spinDamping: 0.85, upwardSpeed: 1150}
      ref m_Material -> Assets/_Effects/ParticleImage/GoldConfetti/Mat_ResultGoldFoil.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_Result/RawImage_ProductGlow [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Material -> Assets/_Effects/ParticleImage/GoldConfetti/Mat_ResultProductGlow.mat (fileID 2100000)
  * CanvasGroup alpha=0 interactable=0 blocksRaycasts=0 ignoreParent=0
- /UI_TutorialDrawing/GO_Result/GO_GoldConfetti [on]
  * ParticleImage
- /UI_TutorialDrawing/GO_Result/GO_GoldConfetti/GoldFoil [on]
  * GoldConfettiGraphic
      fields={burstSpeed: 1450, cacheShape: 1, count: 112, depthScale: 0.4, duration: 4.8, fallResponse: 4, fallSpeedScale: 3.7, flutterScale: 0.5, m_Color: {a: 1, b: 1, g: 1, r: 1}, m_Maskable: 1, m_Material: {fileID: 2100000, guid: 1aa4ea28bedfb8040b54c9389b11d644, type: 2}, m_OnCullStateChanged: {m_PersistentCalls: {m_Calls: []}}, m_RaycastPadding: {w: 0, x: 0, y: 0, z: 0}, m_RaycastTarget: 0, meshSegments: 4, pieceScale: 1.3, ribbonLengthScale: 0.8, seed: 74209, source: {fileID: 7676743896926354228}, spinDamping: 0.85, upwardSpeed: 1150}
      ref m_Material -> Assets/_Effects/ParticleImage/GoldConfetti/Mat_ResultGoldFoil.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_Result/RawImage_Product [on]
  * RawImage color=#000000/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/AX/Default_Dummy.png (fileID 2800000)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * TrueShadow size=0 spread=0.5 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#FFFFFF/a1 blend=0 inset=0 cutout=0 useCasterAlpha=0 ignoreCasterColor=1
- /UI_TutorialDrawing/GO_Result/RT_Multiple [on]
  * CanvasGroup alpha=0 interactable=1 blocksRaycasts=0 ignoreParent=0
- /UI_TutorialDrawing/GO_Result/PI_EventConfetti [on]
  * ParticleImage
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Result/PlayMainResultLog [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
  * Mask showMaskGraphic=0
- /UI_TutorialDrawing/GO_Result/Image_ResultLogo [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Logo/Image_CatchuLogo.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Result/RT_ResultListMask [on]
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * RectMask2D padding={'x': 0, 'y': 0, 'z': 0, 'w': 0} softness={'x': 0, 'y': 0}
- /UI_TutorialDrawing/GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo [OFF]
  * Image type=Simple color=#2B084A/a1 raycast=1 ppuMul=1 preserveAspect=0
  * ToggleGroup
      fields={m_AllowSwitchOff: 1}
  * PlayMainDrawingResultProductInfo
      fields={drawingResultProductInfoCell: {fileID: 4265348454883628348, guid: 2c59b90c638bb84499cde7dc3ed3c3fe, type: 3}, loopScroll: {fileID: 3102295558165450330}}
      ref drawingResultProductInfoCell -> Assets/Resources/Prefabs/UI/Cell/PlayMainDrawingResultProductInfoCell.prefab (fileID 4265348454883628348)
  * UILayerBlur
      fields={radius: 24, tint: 0.3}
- /UI_TutorialDrawing/GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo/LoopScroll [on]
  * LoopHorizontalScrollRect
      fields={SR: {fileID: 0}, m_Content: {fileID: 7295022698181253601}, m_DecelerationRate: 0.135, m_Elasticity: 0.1, m_Horizontal: 1, m_HorizontalScrollbar: {fileID: 7990304312008760992}, m_HorizontalScrollbarSpacing: 0, m_HorizontalScrollbarVisibility: 0, m_Inertia: 1, m_MovementType: 1, m_OnValueChanged: {m_PersistentCalls: {m_Calls: []}}, m_ScrollSensitivity: 1, m_Vertical: 0, m_VerticalScrollbar: {fileID: 0}, m_VerticalScrollbarSpacing: 0, m_VerticalScrollbarVisibility: 0, m_ViewBounds: {m_Center: {x: 0, y: 0, z: 0}, m_Extent: {x: 486, y: 172, z: 0}}, m_Viewport: {fileID: 4822670272084630678}, reverseDirection: 0, totalCount: 0}
- /UI_TutorialDrawing/GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo/LoopScroll/Viewport [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=1 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo/LoopScroll/Viewport/Content [on]
  * GridLayoutGroup padding(L48 R48 T40 B40) spacing={'x': 16, 'y': 0} childAlign=0 ctrlW=None ctrlH=None expW=None expH=None cell={'x': 264, 'y': 264} constraint=2/1 startAxis=0
  * ContentSizeFitter h=2 v=2
  * Image type=Simple color=#FFFFFF/a0 raycast=1 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo/LoopScroll/Scrollbar Horizontal [on]
  * Scrollbar
      fields={m_AnimationTriggers: {m_DisabledTrigger: Disabled, m_HighlightedTrigger: Highlighted, m_NormalTrigger: Normal, m_PressedTrigger: Pressed, m_SelectedTrigger: Selected}, m_Colors: {m_ColorMultiplier: 1, m_DisabledColor: {a: 0.5019608, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_FadeDuration: 0.1, m_HighlightedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}, m_NormalColor: {a: 1, b: 1, g: 1, r: 1}, m_PressedColor: {a: 1, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_SelectedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}}, m_Direction: 0, m_HandleRect: {fileID: 262670708278045041}, m_Interactable: 1, m_Navigation: {m_Mode: 3, m_SelectOnDown: {fileID: 0}, m_SelectOnLeft: {fileID: 0}, m_SelectOnRight: {fileID: 0}, m_SelectOnUp: {fileID: 0}, m_WrapAround: 0}, m_NumberOfSteps: 0, m_OnValueChanged: {m_PersistentCalls: {m_Calls: []}}, m_Size: 1, m_SpriteState: {m_DisabledSprite: {fileID: 0}, m_HighlightedSprite: {fileID: 0}, m_PressedSprite: {fileID: 0}, m_SelectedSprite: {fileID: 0}}, m_TargetGraphic: {fileID: 0}, m_Transition: 0, m_Value: 0.5}
- /UI_TutorialDrawing/GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo/LoopScroll/Scrollbar Horizontal/Sliding Area [on]

- /UI_TutorialDrawing/GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo/LoopScroll/Scrollbar Horizontal/Sliding Area/Handle [on]

- /UI_TutorialDrawing/GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo/Image [on]
  * Image type=Simple color=#8B799B/a1 raycast=0 ppuMul=1 preserveAspect=0
  * OutlineFilter
      fields={_blur: 0, _color: {a: 1, b: 0.60784316, g: 0.4745098, r: 0.54509807}, _direction: 1, _distanceShape: 2, _method: 1, _renderSpace: 0, _size: 1, _softness: 2, _sourceAlpha: 0, _strength: 1, _texture: {fileID: 0}, _textureOffset: {x: 0, y: 0}, _textureScale: {x: 1, y: 1}}
- /UI_TutorialDrawing/GO_NavbarVisual [on]

- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar [on]
  * RoundedImage
      fields={_borderThickness: 0.5, _cornerMode: 0, _distanceFalloff: 0, _roundingAmount: [0.152, 0.152, 0.152, 0.152], _roundingMode: 0, _selectedUnit: 0, _side: 0, _useHitboxInside: 0, _useHitboxOutside: 0, m_Color: {a: 0, b: 1, g: 1, r: 1}, m_FillAmount: 1, m_FillCenter: 1, m_FillClockwise: 1, m_FillMethod: 4, m_FillOrigin: 0, m_Maskable: 1, m_Material: {fileID: 0}, m_OnCullStateChanged: {m_PersistentCalls: {m_Calls: []}}, m_PixelsPerUnitMultiplier: 1, m_PreserveAspect: 0, m_RaycastPadding: {w: 0, x: 0, y: 0, z: 0}, m_RaycastTarget: 0, m_Sprite: {fileID: 0}, m_Type: 0, m_UseSpriteMesh: 0}
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup [on]
  * HorizontalLayoutGroup padding(L32 R32 T0 B0) spacing=0 childAlign=0 ctrlW=1 ctrlH=1 expW=1 expH=1
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonMarket [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
  * Button interactable=0 transition=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonMarket/Toggle [on]
  * Toggle
      fields={graphic: {fileID: 0}, m_AnimationTriggers: {m_DisabledTrigger: Disabled, m_HighlightedTrigger: Highlighted, m_NormalTrigger: Normal, m_PressedTrigger: Pressed, m_SelectedTrigger: Selected}, m_Colors: {m_ColorMultiplier: 1, m_DisabledColor: {a: 0.5019608, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_FadeDuration: 0.1, m_HighlightedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}, m_NormalColor: {a: 1, b: 1, g: 1, r: 1}, m_PressedColor: {a: 1, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_SelectedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}}, m_Group: {fileID: 0}, m_Interactable: 0, m_IsOn: 0, m_Navigation: {m_Mode: 3, m_SelectOnDown: {fileID: 0}, m_SelectOnLeft: {fileID: 0}, m_SelectOnRight: {fileID: 0}, m_SelectOnUp: {fileID: 0}, m_WrapAround: 0}, m_SpriteState: {m_DisabledSprite: {fileID: 0}, m_HighlightedSprite: {fileID: 0}, m_PressedSprite: {fileID: 0}, m_SelectedSprite: {fileID: 0}}, m_TargetGraphic: {fileID: 0}, m_Transition: 0, onValueChanged: {m_PersistentCalls: {m_Calls: []}}, toggleTransition: 1}
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonMarket/Image_Icon [on]
  * Image type=Simple color=#9B9EAD/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Icon/NavBar/Icon_NavbarMarket.png (fileID 21300000)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonMarket/Text [on]
  * TextMeshProUGUI size=32 autoSize=0(18-72) style=0 color=#9B9EAD/a0 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='쇼핑'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonCatchShop [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
  * Button interactable=0 transition=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonCatchShop/Toggle [on]
  * Toggle
      fields={graphic: {fileID: 0}, m_AnimationTriggers: {m_DisabledTrigger: Disabled, m_HighlightedTrigger: Highlighted, m_NormalTrigger: Normal, m_PressedTrigger: Pressed, m_SelectedTrigger: Selected}, m_Colors: {m_ColorMultiplier: 1, m_DisabledColor: {a: 0.5019608, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_FadeDuration: 0.1, m_HighlightedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}, m_NormalColor: {a: 1, b: 1, g: 1, r: 1}, m_PressedColor: {a: 1, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_SelectedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}}, m_Group: {fileID: 0}, m_Interactable: 0, m_IsOn: 0, m_Navigation: {m_Mode: 3, m_SelectOnDown: {fileID: 0}, m_SelectOnLeft: {fileID: 0}, m_SelectOnRight: {fileID: 0}, m_SelectOnUp: {fileID: 0}, m_WrapAround: 0}, m_SpriteState: {m_DisabledSprite: {fileID: 0}, m_HighlightedSprite: {fileID: 0}, m_PressedSprite: {fileID: 0}, m_SelectedSprite: {fileID: 0}}, m_TargetGraphic: {fileID: 0}, m_Transition: 0, onValueChanged: {m_PersistentCalls: {m_Calls: []}}, toggleTransition: 1}
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonCatchShop/Image_Icon [on]
  * Image type=Simple color=#9B9EAD/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Icon/NavBar/Icon_NavbarCatchShop.png (fileID 21300000)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonCatchShop/Text [on]
  * TextMeshProUGUI size=32 autoSize=0(18-72) style=0 color=#C6C8D3/a0 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='캐치샵'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonPlay [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
  * Button interactable=0 transition=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonPlay/Image_Icon [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Icon_PlayLogoSelect.png (fileID 21300000)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonRank [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
  * Button interactable=0 transition=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonRank/Toggle [on]
  * Toggle
      fields={graphic: {fileID: 0}, m_AnimationTriggers: {m_DisabledTrigger: Disabled, m_HighlightedTrigger: Highlighted, m_NormalTrigger: Normal, m_PressedTrigger: Pressed, m_SelectedTrigger: Selected}, m_Colors: {m_ColorMultiplier: 1, m_DisabledColor: {a: 0.5019608, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_FadeDuration: 0.1, m_HighlightedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}, m_NormalColor: {a: 1, b: 1, g: 1, r: 1}, m_PressedColor: {a: 1, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_SelectedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}}, m_Group: {fileID: 0}, m_Interactable: 0, m_IsOn: 0, m_Navigation: {m_Mode: 3, m_SelectOnDown: {fileID: 0}, m_SelectOnLeft: {fileID: 0}, m_SelectOnRight: {fileID: 0}, m_SelectOnUp: {fileID: 0}, m_WrapAround: 0}, m_SpriteState: {m_DisabledSprite: {fileID: 0}, m_HighlightedSprite: {fileID: 0}, m_PressedSprite: {fileID: 0}, m_SelectedSprite: {fileID: 0}}, m_TargetGraphic: {fileID: 0}, m_Transition: 0, onValueChanged: {m_PersistentCalls: {m_Calls: []}}, toggleTransition: 1}
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonRank/Image_Icon [on]
  * Image type=Simple color=#9B9EAD/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Icon/NavBar/Icon_NavBarRankLine.png (fileID 21300000)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonRank/Text [on]
  * TextMeshProUGUI size=32 autoSize=0(18-72) style=0 color=#9B9EAD/a0 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='랭킹'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=1 ppuMul=1 preserveAspect=0
  * Button interactable=0 transition=0
  * TutorialButtonGlow
      fields={activationShader: {fileID: 4800000, guid: 5a394d664ed5dee42a9f165107b42b06, type: 3}, glowCore: {fileID: 8942256056192308590}, glowSoft: {fileID: 8731505710202454806}, guideCircle: {fileID: 7706838543100633368}, guideIcon: {fileID: 7297899577366097841}, iconGlow: {fileID: 6488871530425140003}, illuminatedMaterial: {fileID: 2100000, guid: 8643a8889254c3d4aa103a4615eee1b0, type: 2}, shine: {fileID: 3012813574754789261}}
      ref activationShader -> Assets/_Effects/ScreenFx/DrawingThemeShine.shader (fileID 4800000)
      ref illuminatedMaterial -> Assets/_Shaders/Material_TutorialButtonIllumination.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_GuideCircle [OFF]
  * Image type=Simple color=#FFFFFF/a0.2 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 128x128 - Stroke 4.png (fileID 21300000)
  * TrueShadow (DISABLED) size=48 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#FFFFFF/a1 blend=0 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TrueShadow (DISABLED) size=20 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#FFFFFF/a1 blend=2 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Toggle [on]
  * Toggle
      fields={graphic: {fileID: 0}, m_AnimationTriggers: {m_DisabledTrigger: Disabled, m_HighlightedTrigger: Highlighted, m_NormalTrigger: Normal, m_PressedTrigger: Pressed, m_SelectedTrigger: Selected}, m_Colors: {m_ColorMultiplier: 1, m_DisabledColor: {a: 0.5019608, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_FadeDuration: 0.1, m_HighlightedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}, m_NormalColor: {a: 1, b: 1, g: 1, r: 1}, m_PressedColor: {a: 1, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_SelectedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}}, m_Group: {fileID: 0}, m_Interactable: 0, m_IsOn: 0, m_Navigation: {m_Mode: 3, m_SelectOnDown: {fileID: 0}, m_SelectOnLeft: {fileID: 0}, m_SelectOnRight: {fileID: 0}, m_SelectOnUp: {fileID: 0}, m_WrapAround: 0}, m_SpriteState: {m_DisabledSprite: {fileID: 0}, m_HighlightedSprite: {fileID: 0}, m_PressedSprite: {fileID: 0}, m_SelectedSprite: {fileID: 0}}, m_TargetGraphic: {fileID: 0}, m_Transition: 0, onValueChanged: {m_PersistentCalls: {m_Calls: []}}, toggleTransition: 1}
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_Icon [on]
  * Image type=Simple color=#9B9EAD/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Icon/NavBar/Icon_NavbarProfile.png (fileID 21300000)
  * TrueShadow (DISABLED) size=12 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#F0D6FF/a0.9 blend=2 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_Icon/Image_GuideShine [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Shaders/Material_TutorialGuideShine.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Icon/NavBar/Icon_NavbarProfile.png (fileID 21300000)
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_Icon/GO_FirstJoinPresentGuide [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Image_SignPresentGuide.png (fileID 21300000)
  * DOTweenAnimation animType=1 targetType=5 dur=0.6 delay=0 ease=6 loops=-1 loopType=1 endV3={'x': -27, 'y': 93, 'z': 0} endF=0 endColor=#FFFFFF/a1 isRelative=0 isFrom=0 autoPlay=0
  * TrueShadow size=12 spread=0 angle=90 dist=2 offset={'x': 1.192093e-07, 'y': -2} color=#767676/a0.161 blend=0 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Text [on]
  * TextMeshProUGUI size=32 autoSize=0(18-72) style=0 color=#9B9EAD/a0 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='내정보'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect [OFF]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_Circle89.png (fileID 21300000)
  * Canvas renderMode=2 overrideSorting=1 sortingOrder=3000 addlShaderChannels=31
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/1 [on]
  * ParticleImage
      ref m_Material -> Assets/JMO Assets/Cartoon FX/Materials/Misc/CFX2_Glow.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_Circle96.png (fileID 21300000)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/2 [on]
  * ParticleImage
      ref m_Material -> Assets/JMO Assets/Cartoon FX/Materials/Misc/CFX2_Glow.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/Effect/Effect_Circle96.png (fileID 21300000)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/3 [on]
  * ParticleImage
      ref m_Sprite -> Assets/_Images/Effect/Effect_4Star.png (fileID 21300000)
- /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/GO_Lock [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition [OFF]

- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_Block [on]
  * Image type=Simple color=#000000/a0 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyMarket [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Empty/Empty_Market.jpg (fileID -2298815002625413053)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyMarket/Image_LoadingShine [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Material/Mat_NavbarLoadingShine.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyMarket/Text_EmptyTitle [on]
  * TextMeshProUGUI size=52 autoSize=0(18-72) style=0 color=#383838/a1 hAlign=1 vAlign=256 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='쇼핑'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyCatchShop [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Empty/Empty_CatchShop.jpg (fileID -7492940890892979359)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyCatchShop/Image_LoadingShine [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Material/Mat_NavbarLoadingShine.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyPlay [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Empty/Empty_PlayMain.jpg (fileID -5354576370120167777)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyPlay/Image_LoadingShine [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Material/Mat_NavbarLoadingShine.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyRank [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Empty/Empty_Rank.jpg (fileID 6926914595497798009)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyRank/Image_LoadingShine [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Material/Mat_NavbarLoadingShine.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyRank/Text_EmptyTitle [on]
  * TextMeshProUGUI size=52 autoSize=0(18-72) style=0 color=#383838/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='랭킹'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyProfile [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Empty/Empty_Profile.jpg (fileID 7843544640241702285)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyProfile/Image_LoadingShine [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Material -> Assets/_Material/Mat_NavbarLoadingShine.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_NavbarVisual/NavbarTransition/Image_EmptyProfile/Text_EmptyTitle [on]
  * TextMeshProUGUI size=52 autoSize=0(18-72) style=0 color=#B6B0D5/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='내 정보'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Delivery [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
  * Mask showMaskGraphic=1
- /UI_TutorialDrawing/GO_Delivery/Scroll View [on]
  * ScrollRect
      fields={m_Content: {fileID: 8121726657677996540}, m_DecelerationRate: 0.135, m_Elasticity: 0.1, m_Horizontal: 0, m_HorizontalScrollbar: {fileID: 0}, m_HorizontalScrollbarSpacing: -3, m_HorizontalScrollbarVisibility: 2, m_Inertia: 1, m_MovementType: 1, m_OnValueChanged: {m_PersistentCalls: {m_Calls: []}}, m_ScrollSensitivity: 1, m_Vertical: 1, m_VerticalScrollbar: {fileID: 8687635912085628675}, m_VerticalScrollbarSpacing: 0, m_VerticalScrollbarVisibility: 2, m_Viewport: {fileID: 5481425494809956625}}
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport [on]
  * Image type=Sliced color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
  * Mask showMaskGraphic=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content [on]
  * VerticalLayoutGroup padding(L0 R0 T0 B252) spacing=0 childAlign=0 ctrlW=1 ctrlH=0 expW=1 expH=0
  * ContentSizeFitter h=0 v=2
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/Title [on]

- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/Title/Text [on]
  * TextMeshProUGUI size=45 autoSize=0(18-72) style=0 color=#1C1C1C/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='총 주문 상품 10건'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/Image (1) [on]
  * Image type=Simple color=#F7F7F7/a1 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle [on]

- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text [on]
  * TextMeshProUGUI size=45 autoSize=0(18-72) style=0 color=#1C1C1C/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='배송지 정보'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text [on]
  * TextMeshProUGUI size=36 autoSize=0(18-72) style=0 color=#999999/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 60, 'w': 0} raycast=0
      text='배송지 관리'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text/Image (1) [on]
  * Image type=Simple color=#999999/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Icon/Market/Icon_MarketMore.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address [on]

- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text [on]
  * TextMeshProUGUI size=46 autoSize=0(18-72) style=0 color=#614AD8/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='집'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text/Text [on]
  * TextMeshProUGUI size=36 autoSize=0(18-72) style=0 color=#999999/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='(기본 배송지)'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1) [on]
  * TextMeshProUGUI size=40 autoSize=0(18-72) style=0 color=#1C1C1C/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='캐치유'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1)/GameObject [on]

- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1)/GameObject/Image (1) [on]
  * Image type=Sliced color=#767676/a1 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 40x40 - Clean.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1)/Text [on]
  * TextMeshProUGUI size=40 autoSize=0(18-72) style=0 color=#1C1C1C/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='010-0000-0000'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (2) [on]
  * TextMeshProUGUI size=40 autoSize=0(18-72) style=0 color=#555555/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=3 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='서울특별시 00구 00대로'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
  * ContentSizeFitter h=0 v=2
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/Image (2) [on]
  * Image type=Simple color=#F7F7F7/a1 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/RT_Cell [on]
  * VerticalLayoutGroup padding(L0 R0 T162 B0) spacing=32 childAlign=1 ctrlW=0 ctrlH=0 expW=1 expH=0
  * ContentSizeFitter h=0 v=2
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Viewport/RT_Content/RT_Cell/Text_DeliveryHeading [on]
  * TextMeshProUGUI size=46 autoSize=0(18-72) style=0 color=#1C1C1C/a1 hAlign=1 vAlign=4096 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='배송 예정 상품 (10)'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Scrollbar Vertical [on]
  * Image type=Sliced color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
  * Scrollbar
      fields={m_AnimationTriggers: {m_DisabledTrigger: Disabled, m_HighlightedTrigger: Highlighted, m_NormalTrigger: Normal, m_PressedTrigger: Pressed, m_SelectedTrigger: Selected}, m_Colors: {m_ColorMultiplier: 1, m_DisabledColor: {a: 0.5019608, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_FadeDuration: 0.1, m_HighlightedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}, m_NormalColor: {a: 1, b: 1, g: 1, r: 1}, m_PressedColor: {a: 1, b: 0.78431374, g: 0.78431374, r: 0.78431374}, m_SelectedColor: {a: 1, b: 0.9607843, g: 0.9607843, r: 0.9607843}}, m_Direction: 2, m_HandleRect: {fileID: 4070474323758865331}, m_Interactable: 1, m_Navigation: {m_Mode: 3, m_SelectOnDown: {fileID: 0}, m_SelectOnLeft: {fileID: 0}, m_SelectOnRight: {fileID: 0}, m_SelectOnUp: {fileID: 0}, m_WrapAround: 0}, m_NumberOfSteps: 0, m_OnValueChanged: {m_PersistentCalls: {m_Calls: []}}, m_Size: 1, m_SpriteState: {m_DisabledSprite: {fileID: 0}, m_HighlightedSprite: {fileID: 0}, m_PressedSprite: {fileID: 0}, m_SelectedSprite: {fileID: 0}}, m_TargetGraphic: {fileID: 2452255378031463927}, m_Transition: 0, m_Value: 0}
- /UI_TutorialDrawing/GO_Delivery/Scroll View/Scrollbar Vertical/Sliding Area [on]

- /UI_TutorialDrawing/GO_Delivery/Scroll View/Scrollbar Vertical/Sliding Area/Handle [on]
  * Image type=Sliced color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
- /UI_TutorialDrawing/GO_Delivery/Image (1) [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
  * FillGradientFilter
      fields={_blendMode: 0, _diagonalFlip: 0, _gradient: {atime0: 0, atime1: 52428, atime2: 0, atime3: 0, atime4: 0, atime5: 0, atime6: 0, atime7: 0, ctime0: 0, ctime1: 65535, ctime2: 65535, ctime3: 49151, ctime4: 65535, ctime5: 0, ctime6: 0, ctime7: 0, key0: {a: 0, b: 1, g: 1, r: 1}, key1: {a: 1, b: 1, g: 1, r: 1}, key2: {a: 0, b: 0.5764706, g: 0.83137256, r: 1}, key3: {a: 0, b: 0.5700046, g: 0.1874332, r: 0.8490566}, key4: {a: 0, b: 0.1966714, g: 0.7230087, r: 0.8207547}, key5: {a: 0, b: 0, g: 0, r: 0}, key6: {a: 0, b: 0, g: 0, r: 0}, key7: {a: 0, b: 0, g: 0, r: 0}, m_ColorSpace: 0, m_Mode: 0, m_NumAlphaKeys: 2, m_NumColorKeys: 2, serializedVersion: 2}, _gradientCenterX: 0, _gradientCenterY: 0, _gradientColorSpace: 0, _gradientDither: 0, _gradientLerp: 2, _gradientLinearAngle: 0, _gradientOffset: 0, _gradientRadius: 0.5, _gradientScale: 1, _gradientScaleCenter: 0.5, _gradientShape: 2, _gradientWrap: 0, _renderSpace: 1, _scrollSpeed: 0, _strength: 1}
- /UI_TutorialDrawing/GO_Delivery/Buttons [on]
  * Image type=Simple color=#FFFFFF/a0 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Delivery/Buttons/Button_Pay [on]
  * Image type=Sliced color=#614AD8/a1 raycast=1 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Image_Button.png (fileID 21300000)
  * Button interactable=0 transition=0
  * TrueShadow (DISABLED) size=40 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#8C7CDD/a0.5 blend=0 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TrueShadow (DISABLED) size=10 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#F0D6FF/a0.9 blend=2 inset=0 cutout=1 useCasterAlpha=0 ignoreCasterColor=1
  * TutorialButtonGlow
      fields={activationShader: {fileID: 4800000, guid: 5a394d664ed5dee42a9f165107b42b06, type: 3}, glowCore: {fileID: 2258886495668831850}, glowSoft: {fileID: 1828863849489425773}, guideCircle: {fileID: 0}, guideIcon: {fileID: 0}, iconGlow: {fileID: 0}, illuminatedMaterial: {fileID: 2100000, guid: 8643a8889254c3d4aa103a4615eee1b0, type: 2}, shine: {fileID: 4250959007802914591}}
      ref activationShader -> Assets/_Effects/ScreenFx/DrawingThemeShine.shader (fileID 4800000)
      ref illuminatedMaterial -> Assets/_Shaders/Material_TutorialButtonIllumination.mat (fileID 2100000)
- /UI_TutorialDrawing/GO_Delivery/Buttons/Button_Pay/Image_GuideShine [OFF]
  * Image type=Sliced color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Material -> Assets/_Shaders/Material_TutorialGuideShine.mat (fileID 2100000)
      ref m_Sprite -> Assets/_Images/AX/Image_Button.png (fileID 21300000)
  * LayoutElement ignore=1 min=(-1,-1) pref=(-1,-1) flex=(-1,-1)
- /UI_TutorialDrawing/GO_Delivery/Buttons/Button_Pay/Text [on]
  * TextMeshProUGUI size=46 autoSize=0(18-72) style=0 color=#FFFFFF/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='배송받기'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
- /UI_TutorialDrawing/GO_Delivery/GO_FingerPoint (Missing Prefab with guid: 13f794b97e812c041a575936ab6f0caf) [on]

- /UI_TutorialDrawing/GO_Delivery/Image [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
- /UI_TutorialDrawing/GO_Delivery/Image/Image (1) [OFF]
  * Image type=Simple color=#1C1C1C/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Icon/Icon_BackArrow.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Delivery/Image/Text [OFF]
  * TextMeshProUGUI size=40 autoSize=0(18-72) style=0 color=#383838/a1 hAlign=1 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='주문/배송 조회'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
  * ContentSizeFitter h=2 v=0
- /UI_TutorialDrawing/Text_TutorialTitle [OFF]
  * TextMeshProUGUI size=42 autoSize=0(18-72) style=0 color=#A6A6A6/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='튜토리얼 뽑기'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Bold.asset (fileID 8375955215211718043)
- /UI_TutorialDrawing/Button_TutorialSkip [on]
  * TextMeshProUGUI size=40 autoSize=1(40-40) style=0 color=#AAAAAA/a1 hAlign=4 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=1
      text='튜토리얼'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
  * Button interactable=1 transition=0
- /UI_TutorialDrawing/Button_TutorialSkip/GO_SkipDot [on]
  * Image type=Simple color=#AAAAAA/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 96x96 - Clean.png (fileID 21300000)
- /UI_TutorialDrawing/GO_Finger [OFF]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/Content/Image_Finger.png (fileID 21300000)
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * TrueShadow size=20 spread=0 angle=90 dist=0 offset={'x': 0, 'y': 0} color=#FFFFFF/a0.5 blend=2 inset=0 cutout=0 useCasterAlpha=1 ignoreCasterColor=0
- /UI_TutorialDrawing/GO_DeliveryDot [OFF]
  * Image type=Simple color=#9582DD/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 96x96 - Clean.png (fileID 21300000)
- /UI_TutorialDrawing/RT_TutorialTitle [OFF]
  * HorizontalLayoutGroup padding(L0 R0 T0 B0) spacing=12 childAlign=4 ctrlW=0 ctrlH=0 expW=0 expH=0
- /UI_TutorialDrawing/RT_TutorialTitle/Image_TutorialDot [on]
  * Image type=Simple color=#AAAAAA/a1 raycast=0 ppuMul=1 preserveAspect=0
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 96x96 - Clean.png (fileID 21300000)
- /UI_TutorialDrawing/RT_TutorialTitle/Text_TutorialLabel [on]
  * TextMeshProUGUI size=40 autoSize=0(18-72) style=0 color=#AAAAAA/a1 hAlign=4 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=1 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='튜토리얼'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
- /UI_TutorialDrawing/GO_TutorialLogo [on]
  * Image type=Simple color=#FFFFFF/a1 raycast=0 ppuMul=1 preserveAspect=1
      ref m_Sprite -> Assets/_Images/Logo/Image_CatchuLogo.png (fileID 21300000)
```

## 3. 자산 표 (kind | path | used by | notes)

텍스처 notes: 원본 픽셀 크기, 포맷, 파일 크기, Sprite border(L,B,R,T = x,y,z,w), PPU. 모든 텍스처 기본/Android/iOS maxTextureSize=2048 → **2048 초과 원본은 Unity 런타임에서 축소됨**(Image_PlayMainEmpty 4320x2160, Image_DrawJoyStick 2560x512, Image_DrawClawLine 6x2160).

| kind | path | used by (GameObject :: 필드) | notes |
|---|---|---|---|
| ScriptableObject/TMP Font | `Assets/Fonts/New Folder/Pretendard-Bold.asset` | /GO_Delivery/Buttons/Button_Pay/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Buttons/Button_Pay/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Scroll View/Viewport/RT_Content/RT_Cell/Text_DeliveryHeading :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/RT_Cell/Text_DeliveryHeading :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Scroll View/Viewport/RT_Content/Title/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/Title/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Machine/Button_Count/Text_Count :: TextMeshProUGUI.m_fontAsset<br>/GO_Machine/Button_Count/Text_Count :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Machine/Button_Draw/GO_PlayInfo/Text_PlayInfo :: TextMeshProUGUI.m_fontAsset<br>/GO_Machine/Button_Draw/GO_PlayInfo/Text_PlayInfo :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Machine/Button_PlayMy/Image_Window/RT_Guide/Text_Guide :: TextMeshProUGUI.m_fontAsset<br>/GO_Machine/Button_PlayMy/Image_Window/RT_Guide/Text_Guide :: TextMeshProUGUI.m_sharedMaterial<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyMarket/Text_EmptyTitle :: TextMeshProUGUI.m_fontAsset<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyMarket/Text_EmptyTitle :: TextMeshProUGUI.m_sharedMaterial<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyProfile/Text_EmptyTitle :: TextMeshProUGUI.m_fontAsset<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyProfile/Text_EmptyTitle :: TextMeshProUGUI.m_sharedMaterial<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyRank/Text_EmptyTitle :: TextMeshProUGUI.m_fontAsset<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyRank/Text_EmptyTitle :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/Text_PlayInfo :: TextMeshProUGUI.m_fontAsset<br>/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/Text_PlayInfo :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Result/CG_Page/CG_Price/Text_Price :: TextMeshProUGUI.m_fontAsset<br>/GO_Result/CG_Page/CG_Price/Text_Price :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Result/CG_Page/CG_ProductInfo/Text_Brand :: TextMeshProUGUI.m_fontAsset<br>/GO_Result/CG_Page/CG_ProductInfo/Text_Brand :: TextMeshProUGUI.m_sharedMaterial<br>/Text_TutorialTitle :: TextMeshProUGUI.m_fontAsset<br>/Text_TutorialTitle :: TextMeshProUGUI.m_sharedMaterial | 39521168 B |
| ScriptableObject/TMP Font | `Assets/Fonts/New Folder/Pretendard-Medium.asset` | /Button_TutorialSkip :: TextMeshProUGUI.m_fontAsset<br>/Button_TutorialSkip :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Image/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Image/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1) :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1) :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/Message/Text_Info :: TextMeshProUGUI.m_fontAsset<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/Message/Text_Info :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/Text_Winner :: TextMeshProUGUI.m_fontAsset<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/Text_Winner :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Image/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Image/Text :: TextMeshProUGUI.m_sharedMaterial<br>/RT_TutorialTitle/Text_TutorialLabel :: TextMeshProUGUI.m_fontAsset<br>/RT_TutorialTitle/Text_TutorialLabel :: TextMeshProUGUI.m_sharedMaterial | 39522566 B |
| ScriptableObject/TMP Font | `Assets/Fonts/New Folder/Pretendard-Regular.asset` | /GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1)/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1)/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (2) :: TextMeshProUGUI.m_fontAsset<br>/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (2) :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Machine/Button_Draw/GO_PlayInfo/GO_PlayInfoTicket/Text_DrawTicket :: TextMeshProUGUI.m_fontAsset<br>/GO_Machine/Button_Draw/GO_PlayInfo/GO_PlayInfoTicket/Text_DrawTicket :: TextMeshProUGUI.m_sharedMaterial<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonCatchShop/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonCatchShop/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonMarket/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonMarket/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonRank/Text :: TextMeshProUGUI.m_fontAsset<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonRank/Text :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/GO_PlayInfoTicket/Text_PlayInfoTicket :: TextMeshProUGUI.m_fontAsset<br>/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/GO_PlayInfoTicket/Text_PlayInfoTicket :: TextMeshProUGUI.m_sharedMaterial<br>/GO_Result/CG_Page/CG_ProductInfo/Text_Name :: TextMeshProUGUI.m_fontAsset<br>/GO_Result/CG_Page/CG_ProductInfo/Text_Name :: TextMeshProUGUI.m_sharedMaterial | 39521681 B |
| Material | `Assets/Hovl Studio/Materials/_Additive.mat` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw :: ParticleImage.m_Material<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ :: ParticleImage.m_Material<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider :: ParticleImage.m_Material | 6746 B |
| Material | `Assets/JMO Assets/Cartoon FX/Materials/Misc/CFX2_Glow.mat` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/1 :: ParticleImage.m_Material<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/2 :: ParticleImage.m_Material | 1608 B |
| ScriptableObject/TMP Font | `Assets/Plugins/Febucci/Text Animator/Data/Actions/Actions Database.asset` | /GO_Machine/Button_Draw/GO_PlayInfo/Text_PlayInfo :: TextAnimator_TMP.databaseActions<br>/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/Text_PlayInfo :: TextAnimator_TMP.databaseActions | 664 B |
| ScriptableObject/TMP Font | `Assets/Plugins/Febucci/Text Animator/Data/Appearances/Appearances Database.asset` | /GO_Machine/Button_Draw/GO_PlayInfo/Text_PlayInfo :: TextAnimator_TMP.databaseAppearances<br>/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/Text_PlayInfo :: TextAnimator_TMP.databaseAppearances | 1016 B |
| ScriptableObject/TMP Font | `Assets/Plugins/Febucci/Text Animator/Data/Behaviors/Behaviors Database.asset` | /GO_Machine/Button_Draw/GO_PlayInfo/Text_PlayInfo :: TextAnimator_TMP.databaseBehaviors<br>/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/Text_PlayInfo :: TextAnimator_TMP.databaseBehaviors | 1306 B |
| Prefab | `Assets/Resources/Prefabs/UI/Cell/PlayMainDrawingResultProductInfoCell.prefab` | /GO_Result/RT_ResultListMask/GO_DrawingResultProductInfo :: PlayMainDrawingResultProductInfo.drawingResultProductInfoCell | 18891 B |
| Material | `Assets/_Effects/ParticleImage/GoldConfetti/Mat_ResultGoldFoil.mat` | /GO_Result/GO_GoldConfetti/GoldFoil :: GoldConfettiGraphic.m_Material<br>/GO_Result/GO_ProductFXMask/PI_GoldConfetti/GoldFoil :: GoldConfettiGraphic.m_Material | 1294 B |
| Material | `Assets/_Effects/ParticleImage/GoldConfetti/Mat_ResultProductGlow.mat` | /GO_Result/RawImage_ProductGlow :: RawImage.m_Material | 1229 B |
| Material | `Assets/_Effects/ProductFx/Mat_EnhancementInvertedNormal.mat` | /GO_Machine/Button_PlayMy/Image_Window/Image_Front :: ImageNormalFx.normalTemplate<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/Image_Claw :: ImageNormalFx.normalTemplate | 983 B |
| Shader | `Assets/_Effects/ScreenFx/Backdrop.shader` | /GO_Machine :: UILayerBlurStack.panelShader<br>/GO_Result :: UILayerBlurStack.panelShader | 2914 B |
| Shader | `Assets/_Effects/ScreenFx/DrawingThemeShine.shader` | /GO_Delivery/Buttons/Button_Pay :: TutorialButtonGlow.activationShader<br>/GO_Machine/Button_Count :: TutorialButtonGlow.activationShader<br>/GO_Machine/Button_Draw :: TutorialButtonGlow.activationShader<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory :: TutorialButtonGlow.activationShader<br>/GO_Result/CG_ButtonGroup/Button_Order :: TutorialButtonGlow.activationShader<br>/GO_Result/CG_ButtonGroup/Button_OrderSide :: TutorialButtonGlow.activationShader | 3385 B |
| Material | `Assets/_Effects/ScreenFx/GlassShine.mat` | /GO_Machine/Button_PlayMy/Image_Window/Image_Glass :: Image.m_Material | 1103 B |
| Material | `Assets/_Effects/ScreenFx/Mat_Blur.mat` | /GO_Machine/Button_PlayMy/Image_Window/Image_Front :: ImageNormalFx.smoothTemplate<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/Image_Claw :: ImageNormalFx.smoothTemplate | 907 B |
| Shader | `Assets/_Effects/ScreenFx/UILayerBlurFilter.shader` | /GO_Machine :: UILayerBlurStack.blurShader<br>/GO_Result :: UILayerBlurStack.blurShader | 1598 B |
| Material | `Assets/_Effects/SurfaceFx/Mat_ImageNormalFx.mat` | /GO_Machine/Button_PlayMy/Image_Window/Image_Front :: ImageNormalFx.template<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/Image_Claw :: ImageNormalFx.template | 1266 B |
| Prefab | `Assets/_Effects/SurfaceFx/SurfaceFx_DrawingGoldShine.prefab` |  :: UI_TutorialDrawing.dummyFx | 8388 B |
| Material | `Assets/_Effects/UIEffect/UIEffect_CellLight/FlareUp.mat` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/Particle :: ParticleImage.m_Material | 6481 B |
| Material | `Assets/_Effects/UIEffect/UIEffect_SliderEnd/CircleRainbow 1.mat` | /GO_Result/CG_Page/GO_LightEffect/Particle Image :: ParticleImage.m_Material | 6590 B |
| Texture/Sprite | `Assets/_Images/AX/Circles/Circle @ 1024x1024 - Clean.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/Mask :: Image.m_Sprite | 1024x1024 PNG, 17366 B, textureType=8 spriteMode=1, border={x: 512, y: 512, z: 512, w: 512}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Circles/Circle @ 128x128 - Stroke 4.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_GuideCircle :: Image.m_Sprite | 128x128 PNG, 1949 B, textureType=8 spriteMode=1, border={x: 64, y: 64, z: 64, w: 64}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Circles/Circle @ 40x40 - Clean.png` | /GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1)/GameObject/Image (1) :: Image.m_Sprite | 40x40 PNG, 538 B, textureType=8 spriteMode=1, border={x: 20, y: 20, z: 20, w: 20}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Circles/Circle @ 46x46 - Clean.png` | /GO_Machine/Button_Draw/GO_PlayInfo/GO_PlayInfoTicket :: Image.m_Sprite<br>/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/GO_PlayInfoTicket :: Image.m_Sprite | 46x46 PNG, 620 B, textureType=8 spriteMode=1, border={x: 23, y: 23, z: 23, w: 23}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Circles/Circle @ 60x60 - Clean.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/Message :: Image.m_Sprite<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner :: Image.m_Sprite | 60x60 PNG, 779 B, textureType=8 spriteMode=1, border={x: 30, y: 30, z: 30, w: 30}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Circles/Circle @ 60x60 - Stroke 2.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/Image :: Image.m_Sprite | 60x60 PNG, 967 B, textureType=8 spriteMode=1, border={x: 30, y: 30, z: 30, w: 30}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Circles/Circle @ 80x80 - Clean.png` | /GO_Machine/Button_PlayMy :: Image.m_Sprite | 80x80 PNG, 1044 B, textureType=8 spriteMode=1, border={x: 40, y: 40, z: 40, w: 40}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Circles/Circle @ 96x96 - Clean.png` | /Button_TutorialSkip/GO_SkipDot :: Image.m_Sprite<br>/GO_DeliveryDot :: Image.m_Sprite<br>/GO_Machine/Button_Count/Image_CountGlow :: Image.m_Sprite<br>/RT_TutorialTitle/Image_TutorialDot :: Image.m_Sprite | 96x96 PNG, 1111 B, textureType=8 spriteMode=1, border={x: 48, y: 48, z: 48, w: 48}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Default_Dummy.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/RawImage :: RawImage.m_Texture<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/RawImage_Winner :: RawImage.m_Texture<br>/GO_Result/RawImage_Product :: RawImage.m_Texture | 512x512 PNG, 6593 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Icon_GradeRandom.png` | /GO_Result/CG_Page/CG_ProductInfo/Text_Brand/RawImage_Grade :: RawImage.m_Texture | 512x512 PNG, 80226 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/AX/Image_Button.png` | /GO_Delivery/Buttons/Button_Pay :: Image.m_Sprite<br>/GO_Delivery/Buttons/Button_Pay/Image_GuideShine :: Image.m_Sprite | 140x140 PNG, 1247 B, textureType=8 spriteMode=1, border={x: 70, y: 70, z: 70, w: 70}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png` | /GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image (1) :: Image.m_Sprite<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image (2) :: Image.m_Sprite<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Arrow/Group/Image :: Image.m_Sprite | 19x44 PNG, 396 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawJoystickGuideBG.png` | /GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Image :: Image.m_Sprite | 239x64 PNG, 8565 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawOrderButton.png` | /GO_Result/CG_ButtonGroup/Button_OrderSide :: Image.m_Sprite<br>/GO_Result/CG_ButtonGroup/Button_OrderSide/Image_GuideShine :: Image.m_Sprite | 512x512 PNG, 294874 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawOrderButtonLock.png` | /GO_Result/CG_ButtonGroup/Button_OrderSide :: Button.m_SpriteState.m_DisabledSprite | 512x512 PNG, 181378 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawOrderButtonSelect.png` | /GO_Result/CG_ButtonGroup/Button_OrderSide :: Button.m_SpriteState.m_PressedSprite | 512x512 PNG, 242768 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawReButton.png` | /GO_Result/CG_ButtonGroup/Button_Retry :: Image.m_Sprite | 512x512 PNG, 295571 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawReButtonLock.png` | /GO_Result/CG_ButtonGroup/Button_Retry :: Button.m_SpriteState.m_DisabledSprite | 512x512 PNG, 182389 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawReButtonSelect.png` | /GO_Result/CG_ButtonGroup/Button_Retry :: Button.m_SpriteState.m_PressedSprite | 512x512 PNG, 242970 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawResultButton.png` | /GO_Result/CG_ButtonGroup/Button_Order :: Image.m_Sprite<br>/GO_Result/CG_ButtonGroup/Button_Order/Image_GuideShine :: Image.m_Sprite | 512x512 PNG, 69130 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawResultButtonLock.png` | /GO_Result/CG_ButtonGroup/Button_Order :: Button.m_SpriteState.m_DisabledSprite | 512x512 PNG, 41399 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Draw/Image_DrawResultButtonSelect.png` | /GO_Result/CG_ButtonGroup/Button_Order :: Button.m_SpriteState.m_PressedSprite | 512x512 PNG, 70028 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Icon_PlayLogoSelect.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonPlay/Image_Icon :: Image.m_Sprite | 512x512 PNG, 142676 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Image_Finger.png` | /GO_Finger :: Image.m_Sprite | 512x512 PNG, 124203 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Image_Grade(Silver).png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/grade :: Image.m_Sprite | 700x700 PNG, 53930 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Image_PlayButtonShineMask.png` | /GO_Result/CG_ButtonGroup/Button_Order/PlayButtonShine :: Image.m_Sprite | 512x512 PNG, 3210 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Image_ProfileMine.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/GO_Mine :: Image.m_Sprite | 512x512 PNG, 65593 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Image_SignPresentGuide.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_Icon/GO_FirstJoinPresentGuide :: Image.m_Sprite | 238x82 PNG, 6025 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/Image_Space.png` | /GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/GO_PlayInfoTicket/RawImage_PlayInfoTicket :: RawImage.m_Texture | 512x512 PNG, 1146 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/Image_PlayMainCoin.png` | /GO_Machine/Button_Shop :: Image.m_Sprite | 512x512 PNG, 104905 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/Image_PlayMainEmpty.jpg` | /Image_BG :: Image.m_Sprite | 4320x2160 JPEG, 5590282 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButton.png` | /GO_Machine/Button_Count :: Image.m_Sprite<br>/GO_Machine/Button_Count/Image_GuideShine :: Image.m_Sprite | 512x512 PNG, 265657 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButtonSelect.png` | /GO_Machine/Button_Count :: Button.m_SpriteState.m_PressedSprite | 512x512 PNG, 224484 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawBG.jpg` | /GO_Machine :: Image.m_Sprite | 1080x2160 JPEG, 1153980 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawClawBox.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/Image_Box :: Image.m_Sprite | 512x512 PNG, 25163 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawClawBoxFront.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/Image_Box :: Image.m_Sprite | 512x512 PNG, 20336 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy01.png` | /GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy02 :: RawImage.m_Texture | 512x512 PNG, 280671 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy02.png` | /GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy01 :: RawImage.m_Texture | 512x512 PNG, 300887 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy03.png` | /GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy05 :: RawImage.m_Texture | 512x512 PNG, 307262 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy04.png` | /GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy04 :: RawImage.m_Texture | 512x512 PNG, 148004 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy05.png` | /GO_Machine/Button_PlayMy/Image_Window/RawImage_Dummy03 :: RawImage.m_Texture | 512x512 PNG, 106827 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawResult.jpg` | /GO_Result :: Image.m_Sprite | 1024x2048 JPEG, 910185 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawingGlass.png` | /GO_Machine/Button_PlayMy/Image_Window/Image_Glass :: Image.m_Sprite | 978x1374 PNG, 107665 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButton.png` | /GO_Machine/Button_Draw :: Image.m_Sprite<br>/GO_Machine/Button_Draw/Image_GuideShine :: Image.m_Sprite | 512x512 PNG, 87364 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButtonLock.png` | /GO_Machine/Button_Draw :: Button.m_SpriteState.m_DisabledSprite | 512x512 PNG, 49656 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButtonSelect.png` | /GO_Machine/Button_Draw :: Button.m_SpriteState.m_PressedSprite | 512x512 PNG, 88026 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClaw.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/Image_Claw :: Image.m_Sprite | 512x512 PNG, 101520 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawLine.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/Image_Line :: Image.m_Sprite | 6x2160 PNG, 3873 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawOpen.png` |  :: UI_TutorialDrawing.clawOpen | 512x512 PNG, 90716 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png` | /GO_Machine/DrawingJoyStick/GO_DrawingJoyStick :: DrawingJoyStick.arr_sprites[0]<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick :: DrawingJoyStick.arr_sprites[1]<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick :: DrawingJoyStick.arr_sprites[2]<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick :: DrawingJoyStick.arr_sprites[3]<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick :: DrawingJoyStick.arr_sprites[4]<br>/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick :: Image.m_Sprite | 2560x512 PNG, 796356 B, textureType=8 spriteMode=2, border={x: 0, y: 0, z: 0, w: 0}, PPU=100, multi-sprite: Image_DrawJoyStick_0 rect(0,0,512,512); Image_DrawJoyStick_1 rect(512,0,512,512); Image_DrawJoyStick_2 rect(1024,0,512,512); Image_DrawJoyStick_3 rect(1536,0,512,512); Image_DrawJoyStick_4 rect(2048,0,512,512) |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInBG.jpg` | /GO_Machine/Button_PlayMy/Image_Window :: Image.m_Sprite | 978x1374 JPEG, 1142282 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBG.png` | /GO_Machine/Button_PlayMy/Image_Window/Image_Front :: Image.m_Sprite | 984x397 PNG, 805685 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBGNormal.png` | /GO_Machine/Button_PlayMy/Image_Window/Image_Front :: ImageNormalFx.normalTexture | 1994x789 PNG, 2631133 B, textureType=0 spriteMode=0, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Dummy/Dummy_ProfileBackgroun.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/Mask/ProfileBgImage :: RawImage.m_Texture | 512x512 PNG, 2179 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Dummy/Dummy_ProfileCharacter.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/CustomProfileImage/Mask/ProfileCharImage :: RawImage.m_Texture | 512x512 PNG, 43804 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_4Star.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/3 :: ParticleImage.m_Sprite | 64x64 PNG, 2439 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_Circle89.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect :: ParticleImage.m_Sprite | 512x512 PNG, 73359 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_Circle96.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/1 :: ParticleImage.m_Sprite<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/2 :: ParticleImage.m_Sprite | 512x512 PNG, 47014 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_Ellipse.png` | /GO_Result/CG_Page/GO_LightEffect/PI_Light :: ParticleImage.m_Sprite | 512x513 PNG, 74271 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_EndSlider.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ :: ParticleImage.m_Sprite<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndPoint :: ParticleImage.m_Sprite | 564x622 PNG, 27760 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_Light.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/PI_Claw :: ParticleImage.m_Sprite<br>/GO_Result/CG_Page/GO_LightEffect/Particle Image :: ParticleImage.m_Sprite | 513x513 PNG, 53278 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_SliderEnd.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw :: ParticleImage.m_Sprite<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ :: ParticleImage.m_Sprite<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider :: ParticleImage.m_Sprite | 512x512 PNG, 87093 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_SliderLight.png` | /GO_Result/CG_Page/GO_LightEffect :: ParticleImage.m_Sprite | 512x512 PNG, 79693 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_Star.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/PI_Claw/Particle Image :: ParticleImage.m_Sprite<br>/GO_Result/CG_Page/GO_LightEffect/Particle Image :: ParticleImage.m_Sprite | 512x512 PNG, 25890 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Effect/Effect_UpLightA.png` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/Particle :: ParticleImage.m_Sprite | 1024x1024 PNG, 31992 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Empty/Empty_CatchShop.jpg` | /GO_NavbarVisual/NavbarTransition/Image_EmptyCatchShop :: Image.m_Sprite | 1080x2160 JPEG, 110577 B, textureType=8 spriteMode=2, border={x: 0, y: 0, z: 0, w: 0}, PPU=100, multi-sprite: Empty_CatchShop_0 rect(0,0,1080,2160) |
| Texture/Sprite | `Assets/_Images/Empty/Empty_Market.jpg` | /GO_NavbarVisual/NavbarTransition/Image_EmptyMarket :: Image.m_Sprite | 1080x2160 JPEG, 273308 B, textureType=8 spriteMode=2, border={x: 0, y: 0, z: 0, w: 0}, PPU=100, multi-sprite: Empty_Market_0 rect(0,0,1080,2160) |
| Texture/Sprite | `Assets/_Images/Empty/Empty_PlayMain.jpg` | /GO_NavbarVisual/NavbarTransition/Image_EmptyPlay :: Image.m_Sprite | 1080x2160 JPEG, 1227406 B, textureType=8 spriteMode=2, border={x: 0, y: 0, z: 0, w: 0}, PPU=100, multi-sprite: Empty_PlayMain_0 rect(0,0,1080,2160) |
| Texture/Sprite | `Assets/_Images/Empty/Empty_Profile.jpg` | /GO_NavbarVisual/NavbarTransition/Image_EmptyProfile :: Image.m_Sprite | 1080x2160 JPEG, 102684 B, textureType=8 spriteMode=2, border={x: 0, y: 0, z: 0, w: 0}, PPU=100, multi-sprite: Empty_Profile_0 rect(0,0,1080,2160) |
| Texture/Sprite | `Assets/_Images/Empty/Empty_Rank.jpg` | /GO_NavbarVisual/NavbarTransition/Image_EmptyRank :: Image.m_Sprite | 1080x2160 JPEG, 419763 B, textureType=8 spriteMode=2, border={x: 0, y: 0, z: 0, w: 0}, PPU=100, multi-sprite: Empty_Rank_0 rect(0,0,1080,2160) |
| Texture/Sprite | `Assets/_Images/Icon/Icon_BackArrow.png` | /GO_Delivery/Image/Image (1) :: Image.m_Sprite | 512x512 PNG, 3528 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Icon/Item/Icon_TicketPlay.png` | /GO_Machine/Button_Draw/GO_PlayInfo/GO_PlayInfoTicket/RawImage_PlayInfoTicket :: RawImage.m_Texture | 512x512 PNG, 109357 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Icon/Market/Icon_MarketMore.png` | /GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text/Image (1) :: Image.m_Sprite | 512x513 PNG, 2514 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Icon/NavBar/Icon_NavBarRankLine.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonRank/Image_Icon :: Image.m_Sprite | 512x512 PNG, 6411 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Icon/NavBar/Icon_NavbarCatchShop.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonCatchShop/Image_Icon :: Image.m_Sprite | 512x512 PNG, 35875 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Icon/NavBar/Icon_NavbarMarket.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonMarket/Image_Icon :: Image.m_Sprite | 512x512 PNG, 6378 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Icon/NavBar/Icon_NavbarProfile.png` | /GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_Icon :: Image.m_Sprite<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_Icon/Image_GuideShine :: Image.m_Sprite | 512x512 PNG, 6881 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Texture/Sprite | `Assets/_Images/Logo/Image_CatchuLogo.png` | /GO_Result/Image_ResultLogo :: Image.m_Sprite<br>/GO_TutorialLogo :: Image.m_Sprite | 540x86 PNG, 24235 B, textureType=8 spriteMode=1, border={x: 0, y: 0, z: 0, w: 0}, PPU=100 |
| Material | `Assets/_Material/Mat_NavbarLoadingShine.mat` | /GO_NavbarVisual/NavbarTransition/Image_EmptyCatchShop/Image_LoadingShine :: Image.m_Material<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyMarket/Image_LoadingShine :: Image.m_Material<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyPlay/Image_LoadingShine :: Image.m_Material<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyProfile/Image_LoadingShine :: Image.m_Material<br>/GO_NavbarVisual/NavbarTransition/Image_EmptyRank/Image_LoadingShine :: Image.m_Material | 1170 B |
| Material | `Assets/_Material/Play/Mat_PlayMainProductMotion.mat` |  :: UI_TutorialDrawing.mat_productMotion | 1274 B |
| Material | `Assets/_Shaders/Material_TutorialButtonIllumination.mat` | /GO_Delivery/Buttons/Button_Pay :: TutorialButtonGlow.illuminatedMaterial<br>/GO_Machine/Button_Draw :: TutorialButtonGlow.illuminatedMaterial<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory :: TutorialButtonGlow.illuminatedMaterial<br>/GO_Result/CG_ButtonGroup/Button_Order :: TutorialButtonGlow.illuminatedMaterial<br>/GO_Result/CG_ButtonGroup/Button_OrderSide :: TutorialButtonGlow.illuminatedMaterial | 1101 B |
| Material | `Assets/_Shaders/Material_TutorialGuideShine.mat` | /GO_Delivery/Buttons/Button_Pay/Image_GuideShine :: Image.m_Material<br>/GO_Machine/Button_Count/Image_GuideShine :: Image.m_Material<br>/GO_Machine/Button_Draw/Image_GuideShine :: Image.m_Material<br>/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Image_Icon/Image_GuideShine :: Image.m_Material<br>/GO_Result/CG_ButtonGroup/Button_Order/Image_GuideShine :: Image.m_Material<br>/GO_Result/CG_ButtonGroup/Button_OrderSide/Image_GuideShine :: Image.m_Material | 1082 B |
| VideoClip | `Assets/_Video/Video_Drawing.mp4` |  :: UI_TutorialDrawing.resultVideo | 3649514 B |
|  | `UNRESOLVED guid 0000000000000000f000000000000000` | /GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/PI_Claw :: ParticleImage.m_Texture<br>/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/PI_Claw/Particle Image :: ParticleImage.m_Texture<br>/GO_Result/CG_Page/GO_LightEffect :: ParticleImage.m_Texture<br>/GO_Result/CG_Page/GO_LightEffect/PI_Light :: ParticleImage.m_Texture<br>/GO_Result/CG_Page/GO_LightEffect/Particle Image :: ParticleImage.m_Texture | Unity 내장(unity_builtin_extra) fileID 10300 — 프로젝트 파일 아님. ParticleImage m_Texture 기본값(내장 Default-Particle 텍스처로 보이나 YAML만으로 이름 확정 불가) |

### 3.1 머티리얼 상세 (셰이더·주요 프로퍼티)

```text
### Assets/Hovl Studio/Materials/_Additive.mat
  shader=Assets/_Shaders/Shader Graph/HS_Blend_CG.shadergraph
  keywords=['_BUILTIN_SURFACE_TYPE_TRANSPARENT', '_SURFACE_TYPE_TRANSPARENT']
  tex=[]
  colors=['_Color=(1,1,1,1)', '_DistortionSpeedXYPowerZ=(0,0,0,0)', '_DoubleSidedConstants=(1,1,-1,0)', '_EmissionColor=(1,1,1,1)', '_SpeedMainTexUVNoiseUV=(0,0,0,0)', '_SpeedMainTexUVNoiseZW=(0,0,0,0)', '_TintColor=(1,1,1,1)']
  floats=['_AddPrecomputedVelocity=0', '_AlphaClip=0', '_AlphaCutoffEnable=0', '_AlphaDstBlend=10', '_AlphaSrcBlend=1', '_AlphaToMask=0', '_BUILTIN_AlphaClip=0', '_BUILTIN_Blend=2', '_BUILTIN_CullMode=0', '_BUILTIN_DstBlend=1', '_BUILTIN_QueueControl=0', '_BUILTIN_QueueOffset=0', '_BUILTIN_SrcBlend=5', '_BUILTIN_Surface=1', '_BUILTIN_ZTest=4', '_BUILTIN_ZWrite=0', '_BUILTIN_ZWriteControl=0', '_Blend=2', '_Blend2=1', '_BlendMode=0', '_BumpScale=1', '_CastShadows=0', '_ConservativeDepthOffsetEnable=0', '_Cull=0', '_CullMode=0', '_CullModeForward=0', '_Cutoff=0.5', '_DepthOffsetEnable=0', '_Depthpower=0.1', '_DetailNormalMapScale=1', '_DoubleSidedEnable=1', '_DoubleSidedGIMode=0', '_DoubleSidedNormalMode=2', '_DstBlend=1', '_Emission=2', '_EnableBlendModePreserveSpecularLighting=0', '_EnableFogOnTransparent=1', '_ExcludeFromTUAndAA=0', '_GlossMapScale=1', '_Glossiness=0.5', '_GlossyReflections=1', '_InvFade=0.4', '_Metallic=0', '_Mode=0', '_OcclusionStrength=1', '_Opacity=1', '_OpaqueCullMode=2', '_Parallax=0.02', '_QueueControl=0', '_QueueOffset=0', '_RenderQueueType=3', '_SmoothnessTextureChannel=0', '_SpecularHighlights=1', '_SrcBlend=5', '_StencilRef=0', '_StencilRefDepth=1', '_StencilRefDistortionVec=4', '_StencilRefMV=33', '_StencilWriteMask=6', '_StencilWriteMaskDepth=9', '_StencilWriteMaskDistortionVec=4', '_StencilWriteMaskMV=43', '_Surface=1', '_SurfaceType=1', '_TransparentBackfaceEnable=0', '_TransparentCullMode=2', '_TransparentDepthPostpassEnable=0', '_TransparentDepthPrepassEnable=0', '_TransparentSortPriority=0', '_TransparentWritingMotionVec=0', '_TransparentZWrite=0', '_UVSec=0', '_UseShadowThreshold=0', '_Usecenterglow=0', '_Usecustomrandom=0', '_Usedepth=1', '_ZTest=4', '_ZTestDepthEqualForOpaque=4', '_ZTestTransparent=4', '_ZWrite=0', '_ZWriteControl=0']
### Assets/JMO Assets/Cartoon FX/Materials/Misc/CFX2_Glow.mat
  shader=Assets/unity-ui-extensions-release/Runtime/Resources/Shaders/UI Particle Add.shader
  keywords=[]
  tex=['_BumpMap=UNRESOLVED 0b178db3c9e8755499da46a52e53ce76', '_MainTex=Assets/JMO Assets/Cartoon FX/Textures/CFX2_T_Glow.png']
  colors=['_Color=(1,1,1,1)', '_TintColor=(0.5,0.5,0.5,0.5)']
  floats=['_ColorMask=15', '_InvFade=0.732239', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_TexCoordScrollX=1', '_TexCoordScrollY=1', '_UseUIAlphaClip=0']
### Assets/_Effects/ParticleImage/GoldConfetti/Mat_ResultGoldFoil.mat
  shader=Assets/_Effects/ParticleImage/GoldConfetti/GoldFoil.shader
  keywords=[]
  tex=[]
  colors=['_EdgeColor=(1,0.94,0.76,1)', '_Gold=(1,0.86,0.6,1)', '_HighlightColor=(1,0.96,0.86,1)']
  floats=['_ColorMask=15', '_Exposure=1.13', '_Gloss=0.55', '_GrainFrequency=100', '_GrainStrength=0.008', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_UseUIAlphaClip=0']
### Assets/_Effects/ParticleImage/GoldConfetti/Mat_ResultProductGlow.mat
  shader=Assets/_Effects/ParticleImage/GoldConfetti/ResultProductGlow.shader
  keywords=[]
  tex=[]
  colors=['_Color=(1,1,1,1)', '_GlowColor=(1,0.95,0.82,1)', '_HaloColor=(0.69,0.6,1,1)']
  floats=['_ColorMask=15', '_Intensity=1.15', '_Reveal=1', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_UseUIAlphaClip=0']
### Assets/_Effects/ProductFx/Mat_EnhancementInvertedNormal.mat
  shader=Assets/_Effects/ProductFx/EnhancementInvertedNormal.shader
  keywords=[]
  tex=[]
  colors=['_NormalStep=(0.002,0.002,0,0)', '_UvRect=(0,0,1,1)']
  floats=[]
### Assets/_Effects/ScreenFx/GlassShine.mat
  shader=Assets/_Effects/ScreenFx/GlassShine.shader
  keywords=[]
  tex=[]
  colors=[]
  floats=['_ColorMask=15', '_Duration=4.5', '_Pulse=0.6', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_Strength=2.8', '_UseUIAlphaClip=0']
### Assets/_Effects/ScreenFx/Mat_Blur.mat
  shader=Assets/_Effects/ScreenFx/Blur.shader
  keywords=[]
  tex=[]
  colors=['_Axis=(1,0,0,0)']
  floats=[]
### Assets/_Effects/SurfaceFx/Mat_ImageNormalFx.mat
  shader=Assets/_Effects/SurfaceFx/ImageNormalFx.shader
  keywords=[]
  tex=[]
  colors=['_Light=(0,0.6,0.85,0)', '_UvRect=(0,0,1,1)']
  floats=['_ColorMask=15', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_Strength=0.7', '_UseUIAlphaClip=0']
### Assets/_Effects/UIEffect/UIEffect_CellLight/FlareUp.mat
  shader=Assets/_Shaders/Shader Graph/HS_Blend_CG.shadergraph
  keywords=['_BUILTIN_SURFACE_TYPE_TRANSPARENT', '_SURFACE_TYPE_TRANSPARENT']
  tex=['_MainTex=Assets/_Images/Effect/Effect_UpLightA.png']
  colors=['_Color=(1,1,1,1)', '_DistortionSpeedXYPowerZ=(0,0,0,0)', '_DoubleSidedConstants=(1,1,-1,0)', '_EmissionColor=(1,1,1,1)', '_SpeedMainTexUVNoiseZW=(0,0,0,0)']
  floats=['_AddPrecomputedVelocity=0', '_AlphaClip=0', '_AlphaCutoffEnable=0', '_AlphaDstBlend=1', '_AlphaSrcBlend=1', '_AlphaToMask=0', '_BUILTIN_AlphaClip=0', '_BUILTIN_Blend=2', '_BUILTIN_CullMode=0', '_BUILTIN_DstBlend=1', '_BUILTIN_QueueControl=0', '_BUILTIN_QueueOffset=0', '_BUILTIN_SrcBlend=5', '_BUILTIN_Surface=1', '_BUILTIN_ZTest=4', '_BUILTIN_ZWrite=0', '_BUILTIN_ZWriteControl=0', '_Blend=2', '_Blend2=1', '_BlendMode=1', '_BumpScale=1', '_CastShadows=0', '_ConservativeDepthOffsetEnable=0', '_Cull=0', '_CullMode=0', '_CullModeForward=0', '_Cutoff=0.5', '_DepthOffsetEnable=0', '_Depthpower=0.1', '_DetailNormalMapScale=1', '_DoubleSidedEnable=1', '_DoubleSidedGIMode=0', '_DoubleSidedNormalMode=2', '_DstBlend=1', '_DstMode=10', '_Emission=2', '_EnableBlendModePreserveSpecularLighting=0', '_EnableFogOnTransparent=1', '_ExcludeFromTUAndAA=0', '_GlossMapScale=1', '_Glossiness=0.5', '_GlossyReflections=1', '_Metallic=0', '_Mode=0', '_OcclusionStrength=1', '_Opacity=1', '_OpaqueCullMode=2', '_Parallax=0.02', '_QueueControl=0', '_QueueOffset=0', '_RenderQueueType=3', '_SmoothnessTextureChannel=0', '_SpecularHighlights=1', '_SrcBlend=5', '_SrcMode=5', '_StencilRef=0', '_StencilRefDepth=1', '_StencilRefDistortionVec=4', '_StencilRefMV=33', '_StencilWriteMask=6', '_StencilWriteMaskDepth=9', '_StencilWriteMaskDistortionVec=4', '_StencilWriteMaskMV=43', '_Surface=1', '_SurfaceType=1', '_TransparentBackfaceEnable=0', '_TransparentCullMode=2', '_TransparentDepthPostpassEnable=0', '_TransparentDepthPrepassEnable=0', '_TransparentSortPriority=0', '_TransparentWritingMotionVec=0', '_TransparentZWrite=0', '_UVSec=0', '_UseShadowThreshold=0', '_Usecenterglow=0', '_Usecustomrandom=0', '_Usedepth=1', '_ZTest=4', '_ZTestDepthEqualForOpaque=4', '_ZTestTransparent=4', '_ZWrite=0', '_ZWriteControl=0']
### Assets/_Effects/UIEffect/UIEffect_SliderEnd/CircleRainbow 1.mat
  shader=Assets/_Shaders/Shader Graph/HS_Blend_CG.shadergraph
  keywords=['_BUILTIN_SURFACE_TYPE_TRANSPARENT', '_SURFACE_TYPE_TRANSPARENT']
  tex=['_MainTex=Assets/_Effects/UIEffect/UIEffect_CellLight/CircleRainbow.png']
  colors=['_Color=(1,1,1,1)', '_DistortionSpeedXYPowerZ=(0,0,0,0)', '_DoubleSidedConstants=(1,1,-1,0)', '_EmissionColor=(1,1,1,1)', '_SpeedMainTexUVNoiseZW=(0,0,0,0)', '_TintColor=(1,1,1,1)']
  floats=['_AddPrecomputedVelocity=0', '_AlphaClip=0', '_AlphaCutoffEnable=0', '_AlphaDstBlend=10', '_AlphaSrcBlend=1', '_AlphaToMask=0', '_BUILTIN_AlphaClip=0', '_BUILTIN_Blend=2', '_BUILTIN_CullMode=0', '_BUILTIN_DstBlend=1', '_BUILTIN_QueueControl=0', '_BUILTIN_QueueOffset=0', '_BUILTIN_SrcBlend=5', '_BUILTIN_Surface=1', '_BUILTIN_ZTest=4', '_BUILTIN_ZWrite=0', '_BUILTIN_ZWriteControl=0', '_Blend=2', '_Blend2=1', '_BlendMode=0', '_BumpScale=1', '_CastShadows=0', '_ConservativeDepthOffsetEnable=0', '_Cull=0', '_CullMode=0', '_CullModeForward=0', '_Cutoff=0.5', '_DepthOffsetEnable=0', '_Depthpower=0.5', '_DetailNormalMapScale=1', '_DoubleSidedEnable=1', '_DoubleSidedGIMode=0', '_DoubleSidedNormalMode=2', '_DstBlend=1', '_DstBlendAlpha=1', '_Emission=3', '_EnableBlendModePreserveSpecularLighting=0', '_EnableFogOnTransparent=1', '_ExcludeFromTUAndAA=0', '_GlossMapScale=1', '_Glossiness=0.5', '_GlossyReflections=1', '_InvFade=1', '_Metallic=0', '_Mode=0', '_OcclusionStrength=1', '_Opacity=1', '_OpaqueCullMode=2', '_Parallax=0.02', '_QueueControl=0', '_QueueOffset=0', '_RenderQueueType=3', '_SmoothnessTextureChannel=0', '_SpecularHighlights=1', '_SrcBlend=5', '_SrcBlendAlpha=1', '_StencilRef=0', '_StencilRefDepth=1', '_StencilRefDistortionVec=4', '_StencilRefMV=33', '_StencilWriteMask=6', '_StencilWriteMaskDepth=9', '_StencilWriteMaskDistortionVec=4', '_StencilWriteMaskMV=43', '_Surface=1', '_SurfaceType=1', '_TransparentBackfaceEnable=0', '_TransparentCullMode=2', '_TransparentDepthPostpassEnable=0', '_TransparentDepthPrepassEnable=0', '_TransparentSortPriority=0', '_TransparentWritingMotionVec=0', '_TransparentZWrite=0', '_UVSec=0', '_UseShadowThreshold=0', '_Usecenterglow=0', '_Usecustomrandom=0', '_Usedepth=1', '_XRMotionVectorsPass=1', '_ZTest=4', '_ZTestDepthEqualForOpaque=4', '_ZTestTransparent=4', '_ZWrite=0', '_ZWriteControl=0']
### Assets/_Material/Mat_NavbarLoadingShine.mat
  shader=Assets/_Shaders/UI_NavbarLoadingShine.shader
  keywords=[]
  tex=[]
  colors=['_BandColor=(0.74,0.71,0.84,0.26)']
  floats=['_BaseOpacity=0.015', '_ColorMask=15', '_Speed=0.35', '_StartOffset=0', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_UseUIAlphaClip=0', '_Width=0.24']
### Assets/_Material/Play/Mat_PlayMainProductMotion.mat
  shader=Assets/_Shaders/PlayMainDrawingProductSway.shader
  keywords=[]
  tex=[]
  colors=['_ShineColor=(1,0.88,0.65,1)', '_ShineDirection=(1,-1,0,0)', '_UvRect=(0,0,1,1)']
  floats=['_Bend=0', '_ColorMask=15', '_Fit=1', '_ShineProgress=0', '_ShineStrength=0.8', '_ShineWidth=0.09', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_UseUIAlphaClip=0']
### Assets/_Shaders/Material_TutorialButtonIllumination.mat
  shader=Assets/_Shaders/TutorialButtonIllumination.shader
  keywords=[]
  tex=[]
  colors=['_Color=(1,1,1,1)']
  floats=['_ColorMask=15', '_Intensity=1', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_UseUIAlphaClip=0']
### Assets/_Shaders/Material_TutorialGuideShine.mat
  shader=Assets/_Shaders/TutorialGuideShine.shader
  keywords=[]
  tex=[]
  colors=['_Color=(0.94,0.86,1,0.32)']
  floats=['_ColorMask=15', '_Stencil=0', '_StencilComp=8', '_StencilOp=0', '_StencilReadMask=255', '_StencilWriteMask=255', '_UseUIAlphaClip=0']

```

- TMP 3종 SDF 머티리얼: 셰이더 guid 68e6db2ebdc24f95958faec2be5558d6(TextMeshPro Distance Field = TMP_SDF.shader. guidmap에서는 같은 guid를 가진 notifications 패키지 샘플 사본으로 잡힘), _FaceDilate 0, _OutlineWidth 0, _UnderlaySoftness/Offset 0(언더레이 미사용), _GradientScale 6, _WeightBold 0.75, 아틀라스 4096x4096, padding 5, renderMode 4165(SDFAA), PopulationMode 0(Static).

## 4. 텍스트 표

| GameObject | 활성 | text(프리팹 저장값) | font asset → source font | size | style | color | align(H/V) | 비고 |
|---|---|---|---|---|---|---|---|---|
| `/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Info/Message/Text_Info` | on | '상품 주인공은?' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 32 | 0 | #614AD8/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/GO_ResultEvent/CG_Winner/Winner/Text_Winner` | on | '우승자' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 32 | 0 | #27262B/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Machine/Button_PlayMy/Image_Window/RT_Guide/Text_Guide` | on | '지금 무료로 뽑기를 체험해 보세요!' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 36 | 0 | #FFFFFF/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Machine/Button_Count/Text_Count` | on | '1회' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 42 | 0 | #9686ED/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Machine/Button_Draw/GO_PlayInfo/Text_PlayInfo` | on | '무료 뽑기' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 52 | 0 | #FFFFFF/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Machine/Button_Draw/GO_PlayInfo/GO_PlayInfoTicket/Text_DrawTicket` | on | '2장' | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 28 | 0 | #3B3178/a0.6 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Machine/DrawingJoyStick/GO_DrawingJoyStick/GO_DrawingJoyStickGuide/Image/Text` | on | '좌우 이동하기' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 36 | 0 | #FFFFFF/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Result/CG_Page/CG_ProductInfo/Text_Brand` | on | (빈 값, 런타임 설정) | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 40 | 0 | #FBFBFB/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/GO_Result/CG_Page/CG_ProductInfo/Text_Name` | on | (빈 값, 런타임 설정) | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 38 | 0 | #D1D1D1/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Result/CG_Page/CG_Price/Text_Price` | on | (빈 값, 런타임 설정) | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 64 | 0 | #FFFFFF/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/Text_PlayInfo` | on | '상품 받기' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 52 | 0 | #FFFFFF/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Result/CG_ButtonGroup/Button_Order/GO_PlayInfo/GO_PlayInfoTicket/Text_PlayInfoTicket` | on | (빈 값, 런타임 설정) | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 28 | 0 | #3B3178/a0.6 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonMarket/Text` | on | '쇼핑' | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 32 | 0 | #9B9EAD/a0 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonCatchShop/Text` | on | '캐치샵' | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 32 | 0 | #C6C8D3/a0 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/GO_NavbarButtonRank/Text` | on | '랭킹' | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 32 | 0 | #9B9EAD/a0 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/Text` | on | '내정보' | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 32 | 0 | #9B9EAD/a0 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_NavbarVisual/NavbarTransition/Image_EmptyMarket/Text_EmptyTitle` | on | '쇼핑' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 52 | 0 | #383838/a1 | Left/Top | charSp 0, lineSp 0 |
| `/GO_NavbarVisual/NavbarTransition/Image_EmptyRank/Text_EmptyTitle` | on | '랭킹' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 52 | 0 | #383838/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_NavbarVisual/NavbarTransition/Image_EmptyProfile/Text_EmptyTitle` | on | '내 정보' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 52 | 0 | #B6B0D5/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/Title/Text` | on | '총 주문 상품 10건' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 45 | 0 | #1C1C1C/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text` | on | '배송지 정보' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 45 | 0 | #1C1C1C/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/AddressTitle/Text` | on | '배송지 관리' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 36 | 0 | #999999/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text` | on | '집' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 46 | 0 | #614AD8/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text/Text` | on | '(기본 배송지)' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 36 | 0 | #999999/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1)` | on | '캐치유' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 40 | 0 | #1C1C1C/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (1)/Text` | on | '010-0000-0000' | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 40 | 0 | #1C1C1C/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/GO_Address/Text (2)` | on | '서울특별시 00구 00대로' | Pretendard-Regular.asset → `Assets/Fonts/Noto_Update/Pretendard-Regular.ttf` | 40 | 0 | #555555/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Scroll View/Viewport/RT_Content/RT_Cell/Text_DeliveryHeading` | on | '배송 예정 상품 (10)' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 46 | 0 | #1C1C1C/a1 | Left/Geometry | charSp 0, lineSp 0 |
| `/GO_Delivery/Buttons/Button_Pay/Text` | on | '배송받기' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 46 | 0 | #FFFFFF/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/GO_Delivery/Image/Text` | OFF(자신) | '주문/배송 조회' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 40 | 0 | #383838/a1 | Left/Middle | charSp 0, lineSp 0 |
| `/Text_TutorialTitle` | OFF(자신) | '튜토리얼 뽑기' | Pretendard-Bold.asset → `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf` | 42 | 0 | #A6A6A6/a1 | Center/Middle | charSp 0, lineSp 0 |
| `/Button_TutorialSkip` | on | '튜토리얼' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 40(auto) | 0 | #AAAAAA/a1 | Right/Middle | charSp 0, lineSp 0 |
| `/RT_TutorialTitle/Text_TutorialLabel` | on | '튜토리얼' | Pretendard-Medium.asset → `Assets/Fonts/Noto_Update/Pretendard-Medium.ttf` | 40 | 0 | #AAAAAA/a1 | Right/Middle | charSp 0, lineSp 0 |

- 부모 비활성 여부는 1장 트리 참조(예: GO_Result·GO_Delivery·NavbarTransition 하위는 부모가 OFF).
- 런타임 텍스트(UI_TutorialDrawing.cs): `Text_DrawTicket`="2장"(190행), `Text_Price`=NumberFormat(price)+"원"(556행), 시작 토스트 `Managers.Toast.PlayToastUpTracked("무료 뽑기를 체험해 보세요", "(체험 상품은 랜덤하게 배치됩니다)", Purple, posY 248)`(296행). TextAnimator_TMP `_text`는 `<size=64>뽑기`(Text_PlayInfo 2곳, typewriter 자동시작 0).
- 폰트 원본 파일: `Assets/Fonts/Noto_Update/Pretendard-Bold.ttf`(2,661,752 B), `Pretendard-Medium.ttf`(2,701,192 B), `Pretendard-Regular.ttf`(2,725,828 B). TMP asset의 m_SourceFontFileGUID로 확인(216a0131…/72e14614…/018ec61e…). FaceInfo: PointSize 31, UnitsPerEM 2048, LineHeight 42, Ascent 29.50, Cap 22, Mean 17, Descent -7.48.

## 5. 결과 영상

- `UI_TutorialDrawing.resultVideo` → `Assets/_Video/Video_Drawing.mp4` (guid 603c2e0319563e04dbcdf9104b55999b), 3,649,514 B.
- ffprobe: 컨테이너 mp4, 길이 6.013991 s. 비디오 H.264 High, 1080x1920, yuv420p, bt709, 30 fps(180프레임, 6.000 s), 4,658,930 bps. 오디오 AAC LC 44.1 kHz 스테레오, 196 kbps.
- .meta VideoClipImporter: importAudio 1, encodeAlpha 0, flip 0, deinterlace 0, colorSpace 0, targetSettings 없음(트랜스코딩 설정 없음).
- 재생 방식(`Assets/_Scripts/UI/Other/PlayMainDrawingResultVideo.cs`): RenderTexture(클립 크기 ARGB32)로 렌더, RawImage + AspectRatioFitter **EnvelopeParent**(화면 꽉 채움, 1080x1920 영상을 1080x2160 캔버스에 덮음), VideoAspectRatio.FitInside, audioOutputMode Direct(사운드 OFF면 트랙 음소거), 재생 중 BGM 일시정지(PauseBGMForVideo). 튜토리얼 호출: `video.Begin(resultVideo, Button_TutorialSkip, isTutorial:true, allowSkip:false)`.

## 6. 오디오

프리팹 안에는 AudioSource/AudioClip 참조 없음(AudioSource 0개). 소리는 전역 `SoundManager`(`Assets/Resources/Prefabs/UI/Other/Sound_Main.prefab`의 SoundCue→AudioSource.m_Resource)로 재생.

| SoundType | 호출 위치 | clip | 포맷 | AudioSource 설정 |
|---|---|---|---|---|
| Sound_DrawMove (33) | `DrawingClawSound.Play()` ← UI_TutorialDrawing.cs:497(집게 열림 시 clawOpen 스프라이트 교체와 함께). DrawingClawSound가 volume 0.5로 Stop→Play | `Assets/_Sound/Play/Drawing/Sound_DrawMove.wav` 633,644 B | PCM s24le, 96 kHz, 2ch, 1.100 s. import loadType 0(DecompressOnLoad), compressionFormat 1(Vorbis), quality 1 | vol 0.5, loop 0, pitch 1 |
| Sound_PlaySelect (31) | `PlaySelectSound` 컴포넌트(Button_Count, Button_Draw, Button_Order) OnPointerDown, 버튼 interactable일 때만 | `Assets/_Sound/Play/Common/Sound_PlaySelect.wav` 50,298 B | PCM s24le, 48 kHz, 1ch, 0.348 s. loadType 0, Vorbis, quality 1 | vol 1, loop 0 |
| (영상 내장) | Video_Drawing.mp4 AAC 트랙 | 위 5장 | AAC LC 44.1k 2ch | Direct 출력 |

참고(튜토리얼 스크립트가 직접 호출하지 않음, 같은 Sound_Main에 존재): Sound_DrawOpen(29) `Assets/_Sound/Play/Drawing/Sound_DrawOpen.wav` 312,080 B vol0.9 / Sound_DrawResult(30) `Sound_DrawResult.wav` 811,566 B vol0.9 / Sound_DrawBGM(32) `Sound_DrawBGM.wav` 5,948,490 B vol0.8 loop / Sound_DrawEventBGM(58) `Sound_DrawEventBGM.mp3` 3,464,150 B / Sound_PlayButton(69) `Assets/_Sound/Play/Common/Sound_PlayButton.wav` 24,830 B. UI_TutorialDrawing.cs에 SoundType 직접 사용 없음(grep 확인).

## 7. 금박 컨페티 (GO_GoldConfetti) 및 기타 컨페티

### 7.1 GO_GoldConfetti 구조

- `/GO_Result/GO_GoldConfetti` [on, 부모 GO_Result OFF]: anchor/pivot 0.5, pos (0,155), size 1080x1600. ParticleImage(타이머 역할) + 자식 `GoldFoil`(stretch 0,0~1,1) = `GoldConfettiGraphic`(MaskableGraphic, 실제 금박 메시를 그림).
- 스크립트 사용(UI_TutorialDrawing.cs:613-616): 상품 등장 연출(DOAnchorPos .65s OutCubic, 상품 CanvasGroup 0→1 .3s, ProductGlow 0→1 .55s OutSine, glow size = 상품 rect ×1.55) 완료 후 `confetti.transform.position = 상품 rect.position; Stop(true); Play();`
- ParticleImage 자체는 보이는 입자를 만들지 않음: shape 1(Circle) radius 50, playMode 0(None=스크립트 재생), timeScale 0(Unscaled), startSize Const 0, startColor #000000/a0, rate 0, burst time0 count1, lifetime Const 4.8, duration 4.8, loop 0, gravity Const -9.81(모듈 비활성), Sprite/Texture/Material 없음. GoldConfettiGraphic이 `source.time`(0~duration)을 읽어 그림.

### 7.2 GoldConfettiGraphic 직렬화 값 (GO_GoldConfetti/GoldFoil, PI_GoldConfetti/GoldFoil 동일)

| 필드 | 값 | (스크립트 기본값) |
|---|---|---|
| count | 112 | 150 |
| seed | 74209 | 74209 |
| burstSpeed | 1450 | 1100 |
| duration | 4.8 | 6.4 |
| pieceScale | 1.3 | 1 |
| fallSpeedScale | 3.7 | 1 |
| fallResponse | 4 | 1.4 |
| upwardSpeed | 1150 | 280 |
| flutterScale | 0.5 | 1 |
| spinDamping | 0.85 | 0 |
| cacheShape | 1 | 0 |
| meshSegments | 4 | 6 |
| depthScale | 0.4 | 1 |
| ribbonLengthScale | 0.8 | 1 |
| m_Color | #FFFFFF a1 | - |
| m_Material | Assets/_Effects/ParticleImage/GoldConfetti/Mat_ResultGoldFoil.mat (shader GoldFoil.shader: _Gold (1,0.86,0.6) _HighlightColor (1,0.96,0.86) _EdgeColor (1,0.94,0.76) _Exposure 1.13 _Gloss 0.55 _GrainFrequency 100 _GrainStrength 0.008) | - |
| raycastTarget/maskable | 0 / 1 | - |
| source | GO_GoldConfetti: 같은 GO의 ParticleImage(7676743896926354228) / PI_GoldConfetti: 3277542342638210161 | - |

조각 생성 알고리즘(GoldConfettiGraphic.cs, System.Random(seed)): 각 조각 a∈[0,2π), speed=burstSpeed×U(.65,1.25), velocity=(cos a·speed, sin a·speed·0.9+upwardSpeed), start=dir×U(0,9), angle U(0,360)³, spin=(U(90,330),U(-250,250),U(-170,170)), type<.12이면 리본(width U(7,19), length U(45,70)×ribbonLengthScale), type<.4 length U(28,44), 그 외 U(13,27)(width U(7,13)), curl U(-3.5,3.5)(|curl|<.4→.4), twist U(-.7,.7), depth U(-180,350), drag U(1.65,2.65), fall U(130,240), phase U(0,2π), delay U(0,.09), life=duration×U(.7,1), tint U(.83,1); perspective=900/(900+depth×depthScale); depth 내림차순 정렬(먼 것 먼저).
프레임 위치: age=t-delay; travel=(1-e^(-drag·age))/drag; fall=fall×fallSpeedScale×(age-(1-e^(-resp·age))/resp); flutter=1-e^(-2age); x += (sin(3age+phase)-sin(phase))×26×flutter×flutterScale; y -= fall; y += sin(2.3age+phase)×9×flutter×flutterScale; alpha=smoothstep(age/.035)×(1-smoothstep((age-life+.7)/.7)); unit=min(rect.w,rect.h)/1080; 위치=rect.center+pos×unit; 회전 spinTime=(1-e^(-spinDamping·age))/spinDamping+0.3age; 메시=곡면 리본 meshSegments분할, 크기×perspective×unit×pieceScale, 정점색=(tint,tint,tint,alpha)×color.

### 7.3 PI_GoldConfetti (GO_ProductFXMask 하위)

- `/GO_Result/GO_ProductFXMask` RectMask2D softness (12,24), pos (0,230) size 978x1374. 그 안 `PI_GoldConfetti` pos (0,155) size 1080x1600, ParticleImage 값은 GO_GoldConfetti와 동일(타이머), 자식 GoldFoil 동일 값. UI_TutorialDrawing.cs에서 이름으로 직접 호출하지 않음(GameObjects enum에 GO_GoldConfetti만 있음).

### 7.4 PI_EventConfetti (`/GO_Result/PI_EventConfetti`)

- anchor (0.5,1) pivot (0.5,1) pos (0,100) size 0x0, rotation z=180. shape 4(Directional), angle 180, length 860, fitRect 1, duration 2, loop 0, burst time0 count **80**, startSize separated x12 y20, startColor RandomColor from gradient [0.171 #614AD8, 0.404 #4FD5FF, 0.632 #FEDF92, 0.866 #FFFFFF, 1.0 #FA7F82], lifetime Random 1..2, startSpeed Random 2..12, sizeOverLifetime curve (0,1)(0.796,1)(1,0), startRotation Random -360..360, rotationOverLifetime Random 0..2000(xyz), speedOverLifetime curve (0,1)(1,0), gravity curve (0,-9.81)(0.495,0) gravityModule on, noiseModule on (freq 0.3, strength 2), timeScale 1. Sprite/Texture/Material 없음(흰 사각 입자).

### 7.5 전체 ParticleImage 26개 직렬화 값 (압축 표기)

Const=상수, Random a..b=두 상수 사이, Curve xM [(t,v)...]=곡선×배수, Gradient(colors=[t:#RGB], alphas=[t:a]). enum(ParticleImage.cs 2934행~): _shape 0 Point/1 Circle/2 Rectangle/3 Line/4 Directional, _playMode 0 None/1 OnEnable/2 OnAwake, _sheetType 0 Lifetime/1 Speed/2 FPS, _timeScale 0 Unscaled/1 Normal, _spread 0 Random/1 Uniform.

```text
#### /UI_TutorialDrawing/GO_Result/GO_GoldConfetti (component fileID 7676743896926354228)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:7676743896926354228
  _children: []
  _space: 0
  _timeScale: 0
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 4.8
  _playMode: 0
  _startSize: Const 0
  _startColor: Color #000000/a0
  _lifetime: Const 4.8
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (1,1)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=1, used=0}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 0
  moduleParticleFoldout: 0
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: none
  m_Texture: none
#### /UI_TutorialDrawing/GO_Result/CG_Page/GO_LightEffect (component fileID 1298213965424835150)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:1298213965424835150
  _children: [local:3720282923261154416, local:972711724816497765, local:6271645384888068681]
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 200
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 1
  _prewarm: 1
  _duration: 5
  _playMode: 2
  _startSize: Random 30..60
  _startColor: Color #FFFFFF/a0.502
  _lifetime: Const 1
  _startSpeed: Const 2
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 0.500:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (1,1)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 10
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_SliderLight.png (fileID 21300000)
  m_Texture: UNRESOLVED 0000000000000000f000000000000000 (fileID 10300)
#### /UI_TutorialDrawing/GO_Result/CG_Page/GO_LightEffect/Particle Image (component fileID 6271645384888068681)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:1298213965424835150
  _children: [none]
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 200
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 1
  _prewarm: 1
  _duration: 5
  _playMode: 2
  _startSize: Random 80..100
  _startColor: Color #FFFFFF/a0.502
  _lifetime: Const 1
  _startSpeed: Const 2
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 0.500:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (1,1)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 10
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_Star.png (fileID 21300000)
  m_Texture: UNRESOLVED 0000000000000000f000000000000000 (fileID 10300)
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/PI_Claw (component fileID 6201962283201958206)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:6201962283201958206
  _children: [local:6783897400349946535]
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 0
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 1
  _prewarm: 1
  _duration: 5
  _playMode: 0
  _startSize: Const 300
  _startColor: Color #FFFFFF/a1
  _lifetime: Const 4
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.100:1, 0.900:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (0.5,2), (1,1)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Random 0..360
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 2
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 1
  moduleEventsFoldout: 1
  moduleAdvancedFoldout: 1
  m_Sprite: Assets/_Images/Effect/Effect_Light.png (fileID 21300000)
  m_Texture: UNRESOLVED 0000000000000000f000000000000000 (fileID 10300)
#### /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect (component fileID 8242968854086530817)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8242968854086530817
  _children: [local:6198187052349552078, local:9002890037298929552, local:7535962142388685339]
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 0
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Const 400
  _startColor: Color #FFFFFF/a0.6
  _lifetime: Const 1
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.200:1, 0.500:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(-0.00278542,0.00606072), (0.589295,1.01153), (1.06204,1.17414)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=1, used=0}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 1
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_Circle89.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider (component fileID 3625273906349048729)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/1 (component fileID 6198187052349552078)
  m_Enabled: 1
  m_Material: Assets/JMO Assets/Cartoon FX/Materials/Misc/CFX2_Glow.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8242968854086530817
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 0
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Const 350
  _startColor: Color #FFFFFF/a0.525
  _lifetime: Const 0.5
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.200:1, 0.500:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,0), (0.271641,0.988429), (1,1.13295)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=1, used=0}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_Circle96.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider (component fileID 3788094631334806015)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw (component fileID 8328475307854391210)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: [local:6629021536900489951, local:849141083628631866, local:4656539699185131770, local:6623974703259920857, local:3625273906349048729, local:3788094631334806015, local:6139753261794684968, local:6798946527468678083, local:6716614557141960426, local:2496916738824936846, local:2345041684741302145]
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 1
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 1
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 1
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ (component fileID 6798946527468678083)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: [local:6716614557141960426, local:2496916738824936846, local:2345041684741302145]
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 1
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 1
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/2 (component fileID 9002890037298929552)
  m_Enabled: 1
  m_Material: Assets/JMO Assets/Cartoon FX/Materials/Misc/CFX2_Glow.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8242968854086530817
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 0
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Const 270
  _startColor: Color #FFFFFF/a0.384
  _lifetime: Const 0.5
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.200:1, 0.500:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,0), (0.271641,0.988429), (1,1.13295)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=1, used=0}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_Circle96.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Result/GO_ProductFXMask/PI_GoldConfetti (component fileID 3277542342638210161)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:3277542342638210161
  _children: []
  _space: 0
  _timeScale: 0
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 4.8
  _playMode: 0
  _startSize: Const 0
  _startColor: Color #000000/a0
  _lifetime: Const 4.8
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (1,1)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=1, used=0}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 0
  moduleParticleFoldout: 0
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: none
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/Particle (component fileID 8028339313111105629)
  m_Enabled: 1
  m_Material: Assets/_Effects/UIEffect/UIEffect_CellLight/FlareUp.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8028339313111105629
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 0
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 80
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1.2
  _playMode: 2
  _startSize: Const 400
  _startColor: RandomGradients min=Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1]) max=Gradient(mode=1 colors=[0.000:#D9D1FA, 1.000:#D9D1FA] alphas=[0.000:0.706, 1.000:0.706])
  _lifetime: Const 1.7
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,0.00137329), (1,1)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Random -40..40
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 8
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=5, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 1
  m_Sprite: Assets/_Images/Effect/Effect_UpLightA.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_NavbarVisual/GO_Navbar/RT_ButtonGroup/Button_Inventory/GO_ReceiveEffect/3 (component fileID 7535962142388685339)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8242968854086530817
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 100
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 10..70
  _startColor: RandomColors #FFFFFF/a1..#FFFFFF/a0
  _lifetime: Const 0.7
  _startSpeed: Random 1..5
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.100:1, 0.312:1, 0.415:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0.2, count=10, used=0}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_4Star.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider (component fileID 2496916738824936846)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Result/PI_EventConfetti (component fileID 7153293557078042112)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:7153293557078042112
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 180
  _length: 860
  _fitRect: 1
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 2
  _playMode: 0
  _startSize: separated x=Const 12 y=Const 20 z=Const 12
  _startColor: RandomColor(from gradient) Gradient(mode=1 colors=[0.171:#614AD8, 0.404:#4FD5FF, 0.632:#FEDF92, 0.866:#FFFFFF, 1.000:#FA7F82] alphas=[0.000:1, 1.000:1])
  _lifetime: Random 1..2
  _startSpeed: Random 2..12
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (0.795848,1), (1,0)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Random -360..360
  _rotationOverLifetime: separated x=Random 0..2000 y=Random 0..2000 z=Random 0..2000
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 0
  _gravity: Curve x1 [(0,-9.81), (0.494812,0)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=1}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 0
  _frameOverTime: Const 0
  _startFrame: Random 0..1
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=80, used=0}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 0.3
  _minimumVertexDistance: 20
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 1
  _dieWithParticle: 0
  _trailRatio: 0.1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 0.3
  _noiseStrength: 2
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 1
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: none
  m_Texture: none
#### /UI_TutorialDrawing/GO_Result/CG_Page/GO_LightEffect/Particle Image (component fileID 972711724816497765)
  m_Enabled: 1
  m_Material: Assets/_Effects/UIEffect/UIEffect_SliderEnd/CircleRainbow 1.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:1298213965424835150
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 0
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 1
  _prewarm: 1
  _duration: 5
  _playMode: 2
  _startSize: Const 500
  _startColor: Color #FFFFFF/a0.392
  _lifetime: Const 4
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.291:1, 0.312:1, 0.400:0, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0.243, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (0.5,2), (1,1)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Random 0..360
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 3
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 1
  m_Sprite: Assets/_Images/Effect/Effect_Light.png (fileID 21300000)
  m_Texture: UNRESOLVED 0000000000000000f000000000000000 (fileID 10300)
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndPoint (component fileID 6139753261794684968)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 3
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 10
  _length: 0
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 0.2
  _playMode: 0
  _startSize: Const 50
  _startColor: Color #FFFFFF/a1
  _lifetime: Const 0.2
  _startSpeed: Const 3
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 0.607:#FFFFFF, 1.000:#FFB925] alphas=[0.000:0, 0.047:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (1,3)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 20
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 1
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_EndSlider.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ (component fileID 4656539699185131770)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 3
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 10
  _length: 0
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 0.2
  _playMode: 0
  _startSize: Const 50
  _startColor: Color #FFFFFF/a1
  _lifetime: Const 0.2
  _startSpeed: Const 3
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 0.607:#FFFFFF, 1.000:#FFB925] alphas=[0.000:0, 0.047:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (1,3)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 20
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 1
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_EndSlider.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/RT_ClawHand/PI_Claw/Particle Image (component fileID 6783897400349946535)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:6201962283201958206
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 10
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 1
  _prewarm: 0
  _duration: 5
  _playMode: 0
  _startSize: Random 50..100
  _startColor: Color #FFFFFF/a1
  _lifetime: Const 1
  _startSpeed: Const 3
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.764:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (0.5,1.5), (1,0)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 10
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 1
  moduleAdvancedFoldout: 1
  m_Sprite: Assets/_Images/Effect/Effect_Star.png (fileID 21300000)
  m_Texture: UNRESOLVED 0000000000000000f000000000000000 (fileID 10300)
#### /UI_TutorialDrawing/GO_Result/CG_Page/GO_LightEffect/PI_Light (component fileID 3720282923261154416)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:1298213965424835150
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 1
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0.5
  _radius: 0
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 1
  _prewarm: 0
  _duration: 5
  _playMode: 2
  _startSize: Const 600
  _startColor: Color #FFE799/a1
  _lifetime: Const 4
  _startSpeed: Const 0
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:0])
  _colorBySpeed: Color #FFFFFF/a1
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (1,2)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 2
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 1
  m_Sprite: Assets/_Images/Effect/Effect_Ellipse.png (fileID 21300000)
  m_Texture: UNRESOLVED 0000000000000000f000000000000000 (fileID 10300)
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ (component fileID 849141083628631866)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndSlider (component fileID 6716614557141960426)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ (component fileID 6623974703259920857)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: [local:3625273906349048729, local:3788094631334806015, local:6139753261794684968]
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 1
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 1
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_/ParticleImage_EndPoint (component fileID 2345041684741302145)
  m_Enabled: 1
  m_Material: none
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 3
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 10
  _length: 0
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 0.2
  _playMode: 0
  _startSize: Const 50
  _startColor: Color #FFFFFF/a1
  _lifetime: Const 0.2
  _startSpeed: Const 3
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 0.607:#FFFFFF, 1.000:#FFB925] alphas=[0.000:0, 0.047:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Curve x1 [(0,1), (1,3)]
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Const 1
  _alignToDirection: 0
  _gravity: Const -9.81
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=0}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 20
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: []
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 1
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_EndSlider.png (fileID 21300000)
  m_Texture: none
#### /UI_TutorialDrawing/GO_Machine/Button_PlayMy/Image_Window/Motion/RT_Claw/RT_ClawDown/PI_Claw/ParticleImage_ (component fileID 6629021536900489951)
  m_Enabled: 1
  m_Material: Assets/Hovl Studio/Materials/_Additive.mat (fileID 2100000)
  m_Color: {r=1, g=1, b=1, a=1}
  m_RaycastTarget: 0
  m_Maskable: 1
  _main: local:8328475307854391210
  _children: []
  _space: 0
  _timeScale: 1
  _emitterConstraintEnabled: {enabled=0}
  _emitterConstraintTransform: none
  _shape: 4
  _spread: 0
  _spreadLoop: 1
  _startDelay: 0
  _radius: 50
  _width: 100
  _height: 100
  _angle: 45
  _length: 100
  _fitRect: 0
  _emitOnSurface: 1
  _emitterThickness: 0
  _loop: 0
  _prewarm: 0
  _duration: 1
  _playMode: 0
  _startSize: Random 20..40
  _startColor: RandomColors #FFDED5/a1..#FFE2A0/a1
  _lifetime: Random 0.2..0.5
  _startSpeed: Random 1..6
  _colorOverLifetime: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:0, 0.124:1, 1.000:0])
  _colorBySpeed: Gradient(mode=0 colors=[0.000:#FFFFFF, 1.000:#FFFFFF] alphas=[0.000:1, 1.000:1])
  _colorSpeedRange: {from=0, to=1}
  _sizeOverLifetime: Const 1
  _sizeBySpeed: Curve x1 [(0,1), (1,1)]
  _sizeSpeedRange: {from=0, to=1}
  _startRotation: Const 0
  _rotationOverLifetime: Const 0
  _rotationBySpeed: Curve x1 [(0,1), (1,1)]
  _rotationSpeedRange: {from=0, to=1}
  _speedOverLifetime: Curve x1 [(0,1), (1,0)]
  _alignToDirection: 1
  _gravity: Curve x1 [(0,2), (1,-5)]
  _targetModule: {enabled=0}
  _attractorTarget: none
  _toTarget: Curve x1 [(0,0), (1,1)]
  _targetMode: 0
  _noiseModule: {enabled=0}
  _gravityModule: {enabled=1}
  _vortexModule: {enabled=0}
  _velocityModule: {enabled=0}
  _velocitySpace: 0
  _velocityOverLifetime: separated x=Const 0 y=Const 0 z=Const 0
  _vortexStrength: Const 0
  _sheetModule: {enabled=0}
  _textureTile: {x=1, y=1}
  _sheetType: 2
  _frameOverTime: Const 0
  _startFrame: Const 0
  _frameSpeedRange: {from=0, to=1}
  _textureSheetFPS: 25
  _textureSheetCycles: 1
  _rate: 0
  _rateOverLifetime: 0
  _rateOverDistance: 0
  _bursts: [{time=0, count=20, used=1}]
  _particleTrailRenderer: none
  _trailModule: {enabled=0}
  _trailWidth: Curve x1 [(0,1), (1,0)]
  _trailLifetime: 1
  _minimumVertexDistance: 10
  _trailColorOverLifetime: Color #FFFFFF/a1
  _trailColorOverTrail: Color #FFFFFF/a1
  _trailMaterial: none
  _inheritParticleColor: 0
  _dieWithParticle: 0
  _trailRatio: 1
  _noiseOffset: {x=0, y=0}
  _noiseFrequency: 1
  _noiseStrength: 1
  _multithreadModule: {enabled=0}
  _multithreadEnabled: 0
  _onStart: {m_PersistentCalls={m_Calls=[]}}
  _onFirstParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onLastParticleFinish: {m_PersistentCalls={m_Calls=[]}}
  _onStop: {m_PersistentCalls={m_Calls=[]}}
  moduleEmitterFoldout: 1
  moduleParticleFoldout: 1
  moduleMovementFoldout: 0
  moduleEventsFoldout: 0
  moduleAdvancedFoldout: 0
  m_Sprite: Assets/_Images/Effect/Effect_SliderEnd.png (fileID 21300000)
  m_Texture: none

```

## 8. CanvasGroup 알파 / Animator / DOTween

- Animator / Animation 컴포넌트: **0개**(UI_TutorialDrawing 및 1단계 중첩 프리팹 4종 모두). 애니메이션은 코드(DOTween Sequence)와 DOTweenAnimation 컴포넌트, 셰이더 시간값으로 처리.
- CanvasGroup 30개 중 alpha≠1: `.../GO_ResultEvent/CG_Winner` alpha 0(blocksRaycasts 0), `/GO_Result/RawImage_ProductGlow` alpha 0(interactable 0, blocks 0), `/GO_Result/RT_Multiple` alpha 0(blocks 0). `.../CG_Info` alpha 1 blocksRaycasts 0. 나머지 전부 alpha 1(2장 상세 참조).
- DOTweenAnimation(8개): JoystickGuide `Image` animType 1(Move) targetType 5 dur .6 ease 6 loops -1 loopType 1(Yoyo) endV3 (70,250,0) autoPlay 1; 화살표 6개 animType 7(Fade) targetType 3(CanvasGroup) dur .6 delay .2/.4/.6 endFloat 0 loops -1 Yoyo autoPlay 1; `GO_FirstJoinPresentGuide` animType 1 endV3 (-27,93,0) dur .6 loops -1 Yoyo autoPlay 0. (easeType 6 = DOTween Ease enum 값 그대로)
- 셰이더 기반 루프: GlassShine.mat(_Duration 4.5, _Pulse 0.6, _Strength 2.8), Mat_NavbarLoadingShine(_Speed .35, _Width .24, _BandColor (0.74,0.71,0.84,0.26)), BackdropFx(duration 8, playOnEnable 1), ImageNormalFx(motion 1, motionAmount .5, motionDuration 4, lightDirection (.15,.6,.4)), FillGradientFilter _scrollSpeed -1(Winner 테두리 회전 그라디언트).

## 9. 중첩/참조 프리팹 (1단계)

### PlayMainWinnerBanner.prefab (GO_WinnerBanner로 중첩)

```text
- PlayMainWinnerBanner [on] aMin(0.5,1) aMax(0.5,1) pos(0,-204) size(548.78,64) pivot(0.5,0.5) | CanvasGroup,CanvasRenderer,Image,Button,PlayMainWinnerBanner
  - RT_Clip [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | RectMask2D
    - <nested/stripped transform 7955947008489550973> (see PrefabInstance)
    - <nested/stripped transform 4296645197901055507> (see PrefabInstance)

- /PlayMainWinnerBanner [on]
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
  * Image type=Sliced color=#222222/a0.9 raycast=1 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 64x64 - Clean.png (fileID 21300000)
  * Button interactable=1 transition=0
  * PlayMainWinnerBanner
      fields={button: {fileID: 3746353511313912517}, canvas_group: {fileID: 2284588456671975558}, cells: [{fileID: 537980980526218863}, {fileID: 5962406872575134721}], previewNames: 0}
- /PlayMainWinnerBanner/RT_Clip [on]
  * RectMask2D padding={'x': 0, 'y': 0, 'z': 0, 'w': 0} softness={'x': 0, 'y': 0}
```

### PlayMainWinnerBannerCell.prefab (배너 내부 Row_0/Row_1, 2단계)

```text
- PlayMainWinnerBannerCell [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(548.78,54) pivot(0.5,0.5) | PlayMainWinnerBannerCell,CanvasGroup
  - Text_Info [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(-64.925,0) size(382.93,54) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI
  - Text_Time [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(205.465,0) size(101.85,54) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI

- /PlayMainWinnerBannerCell [on]
  * PlayMainWinnerBannerCell
      fields={text_info: {fileID: 9136634020158886553}, text_time: {fileID: 1656785330791225932}}
  * CanvasGroup alpha=1 interactable=1 blocksRaycasts=1 ignoreParent=0
- /PlayMainWinnerBannerCell/Text_Info [on]
  * TextMeshProUGUI size=32 autoSize=0(18-72) style=0 color=#FFFFFF/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='복싱아복… 님 890,000원 당첨'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
- /PlayMainWinnerBannerCell/Text_Time [on]
  * TextMeshProUGUI size=32 autoSize=0(18-72) style=0 color=#FFFFFF/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='1시간 전'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Regular.asset (fileID 2133645404499314196)
```

### SurfaceFx_DrawingGoldShine.prefab (UI_TutorialDrawing.dummyFx)

```text
- SurfaceFx_DrawingGoldShine [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(1080,1600) pivot(0.5,0.5) | SurfaceFx
  - Raw_Product [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,80) size(800,800) pivot(0.5,0.5) | CanvasRenderer,RawImage
  - Text_Hint [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,-400) size(900,60) pivot(0.5,0.5) | CanvasRenderer,TextMeshProUGUI

- /SurfaceFx_DrawingGoldShine [on]
  * SurfaceFx
      fields={cameraFx: {fileID: 0}, duration: 5.5, loop: 1, mode: 3, normalStrength: 1, normalTemplate: {fileID: 2100000, guid: 75fc2cb7bbcc15d4d809f742df1c457c, type: 2}, play: 0, playOnEnable: 1, product: {fileID: 4151047473706960477}, shineAngle: -20, shineStrength: 3, shineWidth: 0.16, smoothTemplate: {fileID: 2100000, guid: 1bb777a92adad7046a4849e66a7c97de, type: 2}, smoothness: 2, template: {fileID: 2100000, guid: 8e2ccc2cb6a36f04a90b5ea0a9f18922, type: 2}}
      ref template -> Assets/_Effects/SurfaceFx/Mat_DrawingBrightGold.mat (fileID 2100000)
      ref normalTemplate -> Assets/_Effects/ProductFx/Mat_EnhancementInvertedNormal.mat (fileID 2100000)
      ref smoothTemplate -> Assets/_Effects/ScreenFx/Mat_Blur.mat (fileID 2100000)
- /SurfaceFx_DrawingGoldShine/Raw_Product [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0.5,0.5,0.5)
      ref m_Texture -> Assets/_Effects/ParticleImage/OrbitProductReveal/PreviewProducts.png (fileID 2800000)
- /SurfaceFx_DrawingGoldShine/Text_Hint [on]
  * TextMeshProUGUI size=32 autoSize=0(0-0) style=0 color=#332659/a1 hAlign=2 vAlign=512 charSp=0 lineSp=0 wordSp=0 wrap=0 overflow=0 vtxGradient=0 margin={'x': 0, 'y': 0, 'z': 0, 'w': 0} raycast=0
      text='금동상 · 표면 샤인 · 원래 상품'
      ref m_fontAsset -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID 11400000)
      ref m_sharedMaterial -> Assets/Fonts/New Folder/Pretendard-Medium.asset (fileID -5343471035722667257)
```

### PlayMainDrawingResultProductInfoCell.prefab (PlayMainDrawingResultProductInfo.drawingResultProductInfoCell)

```text
- PlayMainDrawingResultProductInfoCell [on] aMin(0,0) aMax(0,0) pos(0,0) size(300,300) pivot(0.5,0.5) | CanvasRenderer,Image,PlayMainDrawingResultProductInfoCell,Button,TrueShadow
  - CG_Effect [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,CanvasGroup
  - GO_Select [OFF] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image,TrueShadow,TrueShadow
    - Image [on] aMin(0,0) aMax(1,1) pos(0,0) size(0,0) pivot(0.5,0.5) | CanvasRenderer,Image
  - RawImage_Product [on] aMin(0.5,0.5) aMax(0.5,0.5) pos(0,0) size(254,254) pivot(0.5,0.5) | CanvasRenderer,RawImage
  - RawImage_Grade [on] aMin(0,1) aMax(0,1) pos(12,-12) size(40,40) pivot(0,1) | CanvasRenderer,RawImage

- /PlayMainDrawingResultProductInfoCell [on]
  * Image type=Sliced color=#555555/a0.102 raycast=1 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 64x64 - Clean.png (fileID 21300000)
  * PlayMainDrawingResultProductInfoCell
      fields={button: {fileID: 2299658226275324125}, cg_effect: {fileID: 4502877499065658337}, defaultGrade: {fileID: 2800000, guid: e2b69da1e240ceb4bb829ddcdb39a5be, type: 3}, go_select: {fileID: 6873194684325018273}, rawImage_grade: {fileID: 2398320922682879566}, rawImage_product: {fileID: 7973999341428003679}, ts: {fileID: 5691477256348298291}}
      ref defaultGrade -> Assets/_Images/AX/Icon_GradeRandom.png (fileID 2800000)
  * Button interactable=1 transition=0
  * TrueShadow size=30 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#6B49BA/a1 blend=0 inset=0 cutout=0 useCasterAlpha=0 ignoreCasterColor=1
- /PlayMainDrawingResultProductInfoCell/CG_Effect [OFF]
  * Image type=Simple color=#DED8EF/a1 raycast=1 ppuMul=1 preserveAspect=0
  * CanvasGroup alpha=0 interactable=1 blocksRaycasts=1 ignoreParent=0
- /PlayMainDrawingResultProductInfoCell/GO_Select [OFF]
  * Image type=Sliced color=#E4E1F3/a1 raycast=1 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 64x64 - Clean.png (fileID 21300000)
  * TrueShadow size=32 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#BB4DEE/a1 blend=0 inset=0 cutout=0 useCasterAlpha=0 ignoreCasterColor=1
  * TrueShadow size=62 spread=0 angle=0 dist=0 offset={'x': 0, 'y': 0} color=#FFFFFF/a1 blend=0 inset=1 cutout=0 useCasterAlpha=0 ignoreCasterColor=1
- /PlayMainDrawingResultProductInfoCell/GO_Select/Image [on]
  * Image type=Sliced color=#FFFFFF/a1 raycast=1 ppuMul=1 preserveAspect=0 fillCenter=1
      ref m_Sprite -> Assets/_Images/AX/Circles/Circle @ 64x64 - Stroke 4.png (fileID 21300000)
- /PlayMainDrawingResultProductInfoCell/RawImage_Product [on]
  * RawImage color=#FFFFFF/a1 raycast=1 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/AX/Default_Dummy.png (fileID 2800000)
- /PlayMainDrawingResultProductInfoCell/RawImage_Grade [on]
  * RawImage color=#FFFFFF/a1 raycast=0 uv=(0,0,1,1)
      ref m_Texture -> Assets/_Images/AX/Icon_GradeRandom.png (fileID 2800000)
```

- PlayMainWinnerBanner 내부 PrefabInstance 2개(원본 PlayMainWinnerBannerCell.prefab): Row_1 anchor (0,0.5)-(1,0.5) sizeDelta (0,64) pos (0,88) m_IsActive 0, TMP fontSize 36/40 오버라이드, 자식 sizeDelta.y 56; Row_0 pos (0,0), m_text 비움, fontSize 36/40, sizeDelta.y 56.
- 배너/셀 신규 스프라이트: `Assets/_Images/AX/Circles/Circle @ 64x64 - Clean.png` 64x64 706 B border 32×4, `Circle @ 64x64 - Stroke 4.png` 64x64 828 B border 32×4.
- SurfaceFx_DrawingGoldShine: template `Assets/_Effects/SurfaceFx/Mat_DrawingBrightGold.mat`, Raw_Product 텍스처 `Assets/_Effects/ParticleImage/OrbitProductReveal/PreviewProducts.png` (uv 0,0.5,0.5,0.5) — 편집 미리보기용으로 보이며 런타임은 `surfaceFx.Init(RawImage_Dummy01+i, dummyFx, repeat:false)`(588행)로 더미 RawImage에 적용.

## 10. 미해결 / 주의

1. `GO_Delivery/GO_FingerPoint (Missing Prefab with guid: 13f794b97e812c041a575936ab6f0caf)` — 원본 프리팹 guid가 Assets/Packages/Library 어디에도 없음.
2. ParticleImage `m_Texture` = `guid 0000000000000000f000000000000000 fileID 10300`(Unity 내장 리소스) 6곳(RT_ClawHand/PI_Claw, 그 자식 Particle Image, GO_LightEffect, PI_Light, GO_LightEffect의 Particle Image 2개). 내장 자산 이름은 YAML로 확정 불가. 같은 컴포넌트에 m_Sprite가 지정되어 있어 실제 그림은 Sprite 쪽일 가능성이 높으나 확인 필요.
3. `CFX2_Glow.mat`의 `_BumpMap` guid 0b178db3c9e8755499da46a52e53ce76 미해결(비활성 GO_ReceiveEffect 하위에서만 사용).
4. TMP SDF 셰이더 guid 68e6db2e…가 notifications 패키지 샘플 사본에도 존재(guid 중복) — 실제 사용 셰이더는 TextMeshPro/Distance Field.
5. DOTween `easeType`/`animationType` 등은 enum 정수값만 기록(이름 매핑은 각 플러그인 소스 확인 필요).
6. 런타임에서 크기/위치/텍스트/스프라이트가 바뀌는 항목(상품 RawImage, glow 크기 ×1.55, 집게 스프라이트 clawOpen, 테마 스프라이트 등)은 프리팹 값과 다를 수 있음. 픽셀 대조는 Editor 실제 화면 캡처 기준 필요.
7. 2048 초과 텍스처 3개는 Unity에서 축소 렌더되므로 웹에서 원본 해상도를 쓰면 선명도가 다름.
8. 실기기/에디터 렌더 검증, 블러(UILayerBlur·UILayerBlurStack)·셰이더 효과의 수치적 재현은 이 문서 범위 밖(정적 YAML 조사만 수행).