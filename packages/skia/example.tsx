import { useState, forwardRef, useImperativeHandle } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'
import { useSharedValue, withDecay, useDerivedValue, withSpring } from 'react-native-reanimated'
import {
  Skia,
  Canvas,
  CanvasProps,
  Fill,
  Circle,
  useValue,
  useSharedValueEffect,
  useComputedValue,
  vec,
  Path,
  LinearGradient,
  Group,
  Line,
  rect,
} from '@shopify/react-native-skia'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useDrawingBoardStore } from '@my/stores'
import { useToastController } from '@tamagui/toast'
import ImageLayer from './ImageLayer'
import { useMemo, useRef, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { GestureHandler } from './GestureHandler'

export type DrawingBoardProps = Omit<CanvasProps, 'children'>
export interface DrawingBoardRef {
  pickImage: () => Promise<void>
}

// https://kazzkiq.github.io/svg-color-filter/
const BLACK_AND_WHITE = [
  0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0.2126, 0.7152, 0.0722, 0, 0, 0, 0, 0,
  1, 0,
]
const GRAY_SCALE = [
  0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0.33, 0.33, 0.33, 0, 0, 0, 0, 0, 1, 0,
]
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const PictureDimensions = rect(0, 0, width, height)

const Size = 20
const Padding = 10

const FgColor = '#DC4C4C'
const BgColor = '#EC795A'

export const DrawingBoard = forwardRef<DrawingBoardRef, DrawingBoardProps>(
  ({ style, ...props }, ref) => {
    const imageLayers = useDrawingBoardStore((state) => state.imageLayers)
    const addImageLayer = useDrawingBoardStore((state) => state.addImageLayer)
    const Toast = useToastController()
    const [height, setHeight] = useState(400)

    const onLayout = (event: LayoutChangeEvent) => {
      setHeight(event.nativeEvent.layout.width)
    }

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      const asset = result?.assets?.[0]
      if (!result.canceled && asset) {
        const assetData = await Skia.Data.fromURI(asset.uri)
        const image = Skia.Image.MakeImageFromEncoded(assetData)
        image &&
          addImageLayer({
            image,
            fit: 'contain',
            width: height,
            height,
            colorMatrixProps: {
              matrix: GRAY_SCALE,
            },
          })
      } else {
        Toast.show('未选择图片')
      }
    }

    useImperativeHandle(ref, () => ({
      pickImage,
    }))

    // const touchPos = useValue({ x: 0, y: 0 })

    // const lineP1 = useComputedValue(
    //   () => vec?.(touchPos.current.x, touchPos.current.y + 14),
    //   [touchPos]
    // )
    // const lineP2 = useComputedValue(() => vec?.(touchPos.current.x, height), [touchPos])

    // const xPosShared = useSharedValue({ x: 0, y: 0 })

    // useSharedValueEffect(() => {
    //   touchPos.current = { x: xPosShared.value.x, y: xPosShared.value.y }
    // }, xPosShared)

    const dragGesture = Gesture.Pan()
      .onTouchesDown(() => {
        console.log('onTouchesDown')
      })
      .onTouchesMove((e) => {
        // const data = e.changedTouches[0]!
        // xPosShared.value = { x: data.x, y: data.y }
      })
      .onStart(() => {
        console.log('onStart!')
      })
      .onUpdate(() => {
        console.log('onUpdate!')
      })
      .onEnd(() => {
        console.log('onEnd!')
      })

    const pictureMatrix = useSharedValue(Skia.Matrix())

    const { width } = useWindowDimensions()

    const startX = width / 2 - (Size * 2 - Padding) + Size
    const startY = 2 * Size
    const centerX = useSharedValue(startX)
    const centerY = useSharedValue(startY)

    const rectCenter = useDerivedValue(() => {
      return { x: centerX.value, y: centerY.value }
    })

    const rectCenterReal = useValue(rectCenter.value)

    useSharedValueEffect(() => {
      rectCenterReal.current = rectCenter.value
    }, rectCenter)

    const gesture = Gesture.Pan()
      .onChange((e) => {
        centerX.value += e.changeX
        centerY.value += e.changeY
      })
      .onEnd(() => {
        centerX.value = withSpring(startX)
        centerY.value = withSpring(startY)
      })

    return (
      <GestureHandlerRootView>
        {/* <GestureHandler dimensions={PictureDimensions} matrix={pictureMatrix}> */}
        <GestureDetector gesture={gesture}>
          <Canvas
            style={[
              {
                width: '100%',
                height,
                borderWidth: 2,
                borderColor: '#ff0000',
                backgroundColor: '#f4f4f4',
              },
              style,
            ]}
            {...props}
          >
            <Fill color="white" />
            <Line
              p1={{ x: width / 2 - (Size - Padding), y: 0 }}
              p2={rectCenterReal}
              color={BgColor}
              strokeWidth={2}
              style="fill"
            />
            <Circle c={rectCenterReal} r={Size} color={FgColor} />
            <Circle c={rectCenterReal} r={Size} color={BgColor} strokeWidth={5} style="stroke" />
          </Canvas>
        </GestureDetector>
        {/* <Canvas
          onLayout={onLayout}
          style={[
            {
              width: '100%',
              height,
              borderWidth: 2,
              borderColor: '#ff0000',
              backgroundColor: '#f4f4f4',
            },
            style,
          ]}
          {...props}
        >
          {imageLayers.map((props, index) => (
            <ImageLayer matrix={pictureMatrix} key={index} {...props} />
          ))}
        </Canvas> */}
        {/* </GestureHandler> */}
      </GestureHandlerRootView>
    )
  }
)
