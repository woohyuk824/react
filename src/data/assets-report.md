# assets-report

생성: tools/run_all.py (Unity 프로젝트 catchu_client 읽기 전용 export)

- public/ 전체: **32.83 MB** (unity/ 26.56 MB, products/ 6.26 MB)
- 검증: JSON 7개 파싱, 참조 경로 158개 중 누락 0개

## 1. 데이터 파일 (src/data)

| file | size |
|---|---|
| materials.json | 1.5 KB |
| products.json | 30.9 KB |
| sprites.json | 0.6 KB |
| toast.layout.json | 4.5 KB |
| tutorial.layout.json | 156.8 KB |
| winnerBanner.layout.json | 6.0 KB |
| winnerBannerCell.layout.json | 1.8 KB |

## 2. 텍스처 (public/unity, 레이아웃·추가 지정)

| public path | source | size | src px → out px | note |
|---|---|---|---|---|
| unity/_Images/AX/Circles/Circle_@_1024x1024_-_Clean.png | Assets/_Images/AX/Circles/Circle @ 1024x1024 - Clean.png | 17.0 KB | 1024x1024 → 1024x1024 |  |
| unity/_Images/AX/Circles/Circle_@_46x46_-_Clean.png | Assets/_Images/AX/Circles/Circle @ 46x46 - Clean.png | 0.6 KB | 46x46 → 46x46 |  |
| unity/_Images/AX/Circles/Circle_@_60x60_-_Clean.png | Assets/_Images/AX/Circles/Circle @ 60x60 - Clean.png | 0.8 KB | 60x60 → 60x60 |  |
| unity/_Images/AX/Circles/Circle_@_60x60_-_Stroke_2.png | Assets/_Images/AX/Circles/Circle @ 60x60 - Stroke 2.png | 0.9 KB | 60x60 → 60x60 |  |
| unity/_Images/AX/Circles/Circle_@_64x64_-_Clean.png | Assets/_Images/AX/Circles/Circle @ 64x64 - Clean.png | 0.7 KB | 64x64 → 64x64 |  |
| unity/_Images/AX/Circles/Circle_@_80x80_-_Clean.png | Assets/_Images/AX/Circles/Circle @ 80x80 - Clean.png | 1.0 KB | 80x80 → 80x80 |  |
| unity/_Images/AX/Circles/Circle_@_96x96_-_Clean.png | Assets/_Images/AX/Circles/Circle @ 96x96 - Clean.png | 1.1 KB | 96x96 → 96x96 |  |
| unity/_Images/AX/Default_Dummy.png | Assets/_Images/AX/Default_Dummy.png | 6.4 KB | 512x512 → 512x512 |  |
| unity/_Images/AX/Icon_GradeRandom.png | Assets/_Images/AX/Icon_GradeRandom.png | 78.3 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png | Assets/_Images/Content/Draw/Image_DrawJoystickGuideArrow.png | 0.4 KB | 19x44 → 19x44 |  |
| unity/_Images/Content/Draw/Image_DrawJoystickGuideBG.png | Assets/_Images/Content/Draw/Image_DrawJoystickGuideBG.png | 8.4 KB | 239x64 → 239x64 |  |
| unity/_Images/Content/Draw/Image_DrawOrderButton.png | Assets/_Images/Content/Draw/Image_DrawOrderButton.png | 288.0 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawOrderButtonLock.png | Assets/_Images/Content/Draw/Image_DrawOrderButtonLock.png | 177.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawOrderButtonSelect.png | Assets/_Images/Content/Draw/Image_DrawOrderButtonSelect.png | 237.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawReButton.png | Assets/_Images/Content/Draw/Image_DrawReButton.png | 288.6 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawReButtonLock.png | Assets/_Images/Content/Draw/Image_DrawReButtonLock.png | 178.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawReButtonSelect.png | Assets/_Images/Content/Draw/Image_DrawReButtonSelect.png | 237.3 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawResultButton.png | Assets/_Images/Content/Draw/Image_DrawResultButton.png | 67.5 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawResultButtonLock.png | Assets/_Images/Content/Draw/Image_DrawResultButtonLock.png | 40.4 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Draw/Image_DrawResultButtonSelect.png | Assets/_Images/Content/Draw/Image_DrawResultButtonSelect.png | 68.4 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Image_Finger.png | Assets/_Images/Content/Image_Finger.png | 121.3 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Image_Grade(Silver).png | Assets/_Images/Content/Image_Grade(Silver).png | 52.7 KB | 700x700 → 700x700 |  |
| unity/_Images/Content/Image_PlayButtonShineMask.png | Assets/_Images/Content/Image_PlayButtonShineMask.png | 3.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Image_ProfileMine.png | Assets/_Images/Content/Image_ProfileMine.png | 64.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/Image_Space.png | Assets/_Images/Content/Image_Space.png | 1.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/Image_PlayMainCoin.png | Assets/_Images/Content/PlayMain/Image_PlayMainCoin.png | 102.4 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/Image_PlayMainEmpty.jpg | Assets/_Images/Content/PlayMain/Image_PlayMainEmpty.jpg | 372.7 KB | 4320x2160 → 2048x1024 | maxTextureSize 2048 로 LANCZOS 축소 |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButton.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButton.png | 259.4 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButtonSelect.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_DrawCountButtonSelect.png | 219.2 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawBG.jpg | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawBG.jpg | 240.7 KB | 1080x2160 → 1024x2048 | maxTextureSize 2048 로 LANCZOS 축소 |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawClawBox.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawClawBox.png | 24.6 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawClawBoxFront.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawClawBoxFront.png | 19.9 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy01.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy01.png | 274.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy02.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy02.png | 293.8 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy03.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy03.png | 300.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy04.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy04.png | 144.5 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy05.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawDummy05.png | 104.3 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawResult.jpg | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawResult.jpg | 888.9 KB | 1024x2048 → 1024x2048 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawingGlass.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Image_PlayMainDrawingGlass.png | 105.1 KB | 978x1374 → 978x1374 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButton.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButton.png | 85.3 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButtonLock.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButtonLock.png | 48.5 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButtonSelect.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawButtonSelect.png | 86.0 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClaw.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClaw.png | 99.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawLine.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawLine.png | 5.8 KB | 6x2160 → 6x2048 | maxTextureSize 2048 로 LANCZOS 축소 |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawOpen.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawClawOpen.png | 88.6 KB | 512x512 → 512x512 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_DrawJoyStick.png | 527.0 KB | 2560x512 → 2048x410 | maxTextureSize 2048 로 LANCZOS 축소 |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInBG.jpg | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInBG.jpg | 1.09 MB | 978x1374 → 978x1374 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBG.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBG.png | 786.8 KB | 984x397 → 984x397 |  |
| unity/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBGNormal.png | Assets/_Images/Content/PlayMain/PlayMainDrawing/Theme/Main/Image_PlayMainDrawInFrontBGNormal.png | 722.1 KB | 1994x789 → 1024x405 | maxTextureSize 1024 로 LANCZOS 축소 |
| unity/_Images/Content/Toast/Image_ColorToastMessageSkyBlue.png | Assets/_Images/Content/Toast/Image_ColorToastMessageSkyBlue.png | 130.2 KB | 1080x120 → 1080x120 |  |
| unity/_Images/Content/Toast/Image_GradientToastBlue.png | Assets/_Images/Content/Toast/Image_GradientToastBlue.png | 241.9 KB | 1080x224 → 1080x224 |  |
| unity/_Images/Content/Toast/Image_GradientToastPurple.png | Assets/_Images/Content/Toast/Image_GradientToastPurple.png | 215.7 KB | 1080x224 → 1080x224 | toast purple bg |
| unity/_Images/Dummy/Dummy_ProfileBackgroun.png | Assets/_Images/Dummy/Dummy_ProfileBackgroun.png | 2.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Dummy/Dummy_ProfileCharacter.png | Assets/_Images/Dummy/Dummy_ProfileCharacter.png | 42.8 KB | 512x512 → 512x512 |  |
| unity/_Images/Effect/Effect_Ellipse.png | Assets/_Images/Effect/Effect_Ellipse.png | 72.5 KB | 512x513 → 512x513 |  |
| unity/_Images/Effect/Effect_EndSlider.png | Assets/_Images/Effect/Effect_EndSlider.png | 27.1 KB | 564x622 → 564x622 |  |
| unity/_Images/Effect/Effect_Light.png | Assets/_Images/Effect/Effect_Light.png | 52.0 KB | 513x513 → 513x513 |  |
| unity/_Images/Effect/Effect_SliderEnd.png | Assets/_Images/Effect/Effect_SliderEnd.png | 85.1 KB | 512x512 → 512x512 |  |
| unity/_Images/Effect/Effect_SliderLight.png | Assets/_Images/Effect/Effect_SliderLight.png | 77.8 KB | 512x512 → 512x512 |  |
| unity/_Images/Effect/Effect_Star.png | Assets/_Images/Effect/Effect_Star.png | 25.3 KB | 512x512 → 512x512 |  |
| unity/_Images/Effect/Effect_UpLightA.png | Assets/_Images/Effect/Effect_UpLightA.png | 31.2 KB | 1024x1024 → 1024x1024 |  |
| unity/_Images/Icon/Icon_GradeA.png | Assets/_Images/Icon/Icon_GradeA.png | 64.7 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeB.png | Assets/_Images/Icon/Icon_GradeB.png | 72.8 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeLogo.png | Assets/_Images/Icon/Icon_GradeLogo.png | 75.1 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeS.png | Assets/_Images/Icon/Icon_GradeS.png | 73.8 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeSSV.png | Assets/_Images/Icon/Icon_GradeSSV.png | 75.8 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeSV.png | Assets/_Images/Icon/Icon_GradeSV.png | 75.9 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeTextA.png | Assets/_Images/Icon/Icon_GradeTextA.png | 24.3 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeTextB.png | Assets/_Images/Icon/Icon_GradeTextB.png | 29.1 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeTextC.png | Assets/_Images/Icon/Icon_GradeTextC.png | 17.4 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeTextS.png | Assets/_Images/Icon/Icon_GradeTextS.png | 24.9 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeTextSSV.png | Assets/_Images/Icon/Icon_GradeTextSSV.png | 39.8 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeTextSV.png | Assets/_Images/Icon/Icon_GradeTextSV.png | 42.9 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeTextV.png | Assets/_Images/Icon/Icon_GradeTextV.png | 24.8 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Icon_GradeV.png | Assets/_Images/Icon/Icon_GradeV.png | 73.8 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Icon/Item/Icon_TicketPlay.png | Assets/_Images/Icon/Item/Icon_TicketPlay.png | 106.8 KB | 512x512 → 512x512 |  |
| unity/_Images/Icon/icon_GradeC.png | Assets/_Images/Icon/icon_GradeC.png | 50.7 KB | 512x512 → 512x512 | grade icon |
| unity/_Images/Logo/Image_CatchuLogo.png | Assets/_Images/Logo/Image_CatchuLogo.png | 23.7 KB | 540x86 → 540x86 |  |

## 3. 영상·사운드·폰트

| public path | source | size | note |
|---|---|---|---|
| unity/fonts/Pretendard-Bold.ttf | Assets/Fonts/Noto_Update/Pretendard-Bold.ttf | 2.54 MB | ttf copy |
| unity/fonts/Pretendard-Bold.woff2 | Assets/Fonts/Noto_Update/Pretendard-Bold.ttf | 629.2 KB | woff2 subset U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+20A9,U+2190-2193,U+3000-303F,U+3131-318E,U+AC00-D7A3,U+FF01-FF5E |
| unity/fonts/Pretendard-Medium.ttf | Assets/Fonts/Noto_Update/Pretendard-Medium.ttf | 2.58 MB | ttf copy |
| unity/fonts/Pretendard-Medium.woff2 | Assets/Fonts/Noto_Update/Pretendard-Medium.ttf | 616.2 KB | woff2 subset U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+20A9,U+2190-2193,U+3000-303F,U+3131-318E,U+AC00-D7A3,U+FF01-FF5E |
| unity/fonts/Pretendard-Regular.ttf | Assets/Fonts/Noto_Update/Pretendard-Regular.ttf | 2.60 MB | ttf copy |
| unity/fonts/Pretendard-Regular.woff2 | Assets/Fonts/Noto_Update/Pretendard-Regular.ttf | 605.0 KB | woff2 subset U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-203A,U+20A9,U+2190-2193,U+3000-303F,U+3131-318E,U+AC00-D7A3,U+FF01-FF5E |
| unity/sound/Sound_DrawMove.m4a | Assets/_Sound/Play/Drawing/Sound_DrawMove.wav | 25.0 KB | AAC 192k 48kHz |
| unity/sound/Sound_PlaySelect.m4a | Assets/_Sound/Play/Common/Sound_PlaySelect.wav | 8.3 KB | AAC 192k 48kHz |
| unity/video/Video_Drawing.mp4 | Assets/_Video/Video_Drawing.mp4 | 3.48 MB | ffmpeg stream copy + faststart |
| unity/video/Video_Splash.mp4 | Assets/_Video/Video_Splash.mp4 | 3.02 MB | ffmpeg stream copy + faststart |

## 4. 상품 이미지 (public/products)

- drawTutorialResult 세트 8개, 고유 URL 96개, 성공 96, 실패 0

| file | size | url |
|---|---|---|
| products/07118.png | 10.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/07118.png |
| products/29231.png | 15.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/29231.png |
| products/32800.png | 71.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/32800.png |
| products/37551.png | 112.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/37551.png |
| products/43562.png | 72.9 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43562.png |
| products/43698.png | 204.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43698.png |
| products/43788.png | 131.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43788.png |
| products/43790.png | 26.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43790.png |
| products/43794.png | 35.4 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43794.png |
| products/43802.png | 128.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43802.png |
| products/43846.png | 45.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43846.png |
| products/43850.png | 41.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43850.png |
| products/43903.png | 47.2 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43903.png |
| products/43923.png | 128.2 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/43923.png |
| products/44249.png | 93.8 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44249.png |
| products/44425.png | 100.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44425.png |
| products/44685.png | 32.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44685.png |
| products/44701.png | 99.4 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44701.png |
| products/44743.png | 52.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44743.png |
| products/44744.png | 37.4 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44744.png |
| products/44749.png | 51.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44749.png |
| products/44959.png | 54.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44959.png |
| products/44980.png | 57.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/44980.png |
| products/46068.png | 28.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/46068.png |
| products/47897.png | 37.6 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/47897.png |
| products/48414.png | 29.8 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/48414.png |
| products/48428.png | 46.8 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/48428.png |
| products/48550.png | 84.6 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/48550.png |
| products/48605.png | 95.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/48605.png |
| products/48684.png | 87.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/48684.png |
| products/48883.png | 97.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/48883.png |
| products/49199.png | 53.6 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/49199.png |
| products/51148.png | 179.2 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/51148.png |
| products/51157.png | 254.2 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/51157.png |
| products/51176.png | 151.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/51176.png |
| products/51752.png | 90.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/51752.png |
| products/52323.png | 135.6 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52323.png |
| products/52384.png | 25.2 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52384.png |
| products/52419.png | 27.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52419.png |
| products/52430.png | 18.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52430.png |
| products/52442.png | 54.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52442.png |
| products/52728.png | 90.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52728.png |
| products/52732.png | 85.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52732.png |
| products/52757.png | 58.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52757.png |
| products/52765.png | 47.4 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52765.png |
| products/52808.png | 150.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52808.png |
| products/52931.png | 67.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/52931.png |
| products/53623.png | 37.9 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/53623.png |
| products/53917.png | 48.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/53917.png |
| products/54150.png | 38.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/54150.png |
| products/54549.png | 70.8 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/54549.png |
| products/55080.png | 127.6 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/55080.png |
| products/55423.png | 29.4 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/55423.png |
| products/55630.png | 133.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/55630.png |
| products/55665.png | 26.9 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/55665.png |
| products/55674.png | 46.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/55674.png |
| products/55829.png | 60.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/55829.png |
| products/55966.png | 13.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/55966.png |
| products/55972.png | 11.2 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/55972.png |
| products/56046.png | 58.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/56046.png |
| products/56056.png | 42.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/56056.png |
| products/56444.png | 13.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/56444.png |
| products/56864.png | 47.9 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/56864.png |
| products/56866.png | 25.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/56866.png |
| products/56881.png | 17.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/56881.png |
| products/57127.png | 100.8 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/57127.png |
| products/57365.png | 17.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/57365.png |
| products/57614.png | 34.6 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/57614.png |
| products/58022.png | 30.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/58022.png |
| products/58571.png | 40.5 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/58571.png |
| products/58731.png | 91.9 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/58731.png |
| products/58841.png | 144.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/58841.png |
| products/58908.png | 72.6 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/58908.png |
| products/58913.png | 184.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/58913.png |
| products/58924.png | 92.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/58924.png |
| products/59026.png | 78.6 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/59026.png |
| products/59074.png | 73.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/59074.png |
| products/59155.png | 26.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/59155.png |
| products/59329.png | 88.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/59329.png |
| products/59448.png | 17.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/59448.png |
| products/59547.png | 60.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/59547.png |
| products/59969.png | 30.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/59969.png |
| products/60077.png | 114.9 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60077.png |
| products/60088.png | 17.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60088.png |
| products/60235.png | 51.8 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60235.png |
| products/60266.png | 18.7 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60266.png |
| products/60321.png | 33.8 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60321.png |
| products/60389.png | 5.4 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60389.png |
| products/60465.png | 52.2 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60465.png |
| products/60513.png | 39.1 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60513.png |
| products/60547.png | 50.3 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60547.png |
| products/60678.png | 101.9 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60678.png |
| products/60733.png | 50.9 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60733.png |
| products/60775.png | 39.2 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/60775.png |
| products/61032.png | 114.4 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/61032.png |
| products/63282.png | 48.0 KB | https://catchuapi.s3.ap-northeast-2.amazonaws.com/media/products/63282.png |

## 5. 미해결 / 주의

- GO_Delivery/GO_FingerPoint: Missing Prefab (guid 13f794b97e812c041a575936ab6f0caf) — 프로젝트에 원본 없음. GO_Delivery 는 export 제외 서브트리라 레이아웃에 없음.
- RawImage_ProductGlow: m_Texture 비어 있음(fileID 0). 셰이더 CatchU/UI/Result Product Glow(Assets/_Effects/ParticleImage/GoldConfetti/ResultProductGlow.shader)가 절차적으로 그림 → 텍스처 없음. 머티리얼 값은 materials.json.
- ParticleImage(파티클)·GoldConfettiGraphic·TextAnimator_TMP 는 props 미포함(덩치 큼), 참조 텍스처만 node.refs 로 export.
- 커스텀 셰이더 머티리얼(GlassShine, TutorialGuideShine, ResultProductGlow 등)은 웹에서 별도 재현 필요 — 경로·float·color 는 materials.json.
- UI_TutorialDrawing.dummyFx(SurfaceFx_DrawingGoldShine.prefab), mat_productMotion 은 경로만 props 에 기록, 레이아웃 미export.
- Image_DrawJoyStick: 2560x512 → 2048x410, 서브 스프라이트 rect 는 소수(409.6) 그대로. Image_DrawClawLine 6x2160 → 6x2048(반올림).
- Icon_GradeC 파일명이 소문자 'icon_GradeC.png' (원본 그대로). 대소문자 구분 서버에서 경로 주의.
- Unity의 실제 축소 크기는 이 스크립트의 반올림과 1px 다를 수 있음.
