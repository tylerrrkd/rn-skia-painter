import { useState, forwardRef, useImperativeHandle } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Skia, Canvas, CanvasProps, rect } from '@shopify/react-native-skia'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useDrawingBoardStore, LayerType } from '@my/stores'
import { useToastController } from '@tamagui/toast'
import { GestureHandler } from './GestureHandler'
import { Dimensions } from 'react-native'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import Layer from './Layer'

const { width: screenWidth } = Dimensions.get('window')

export type DrawingBoardProps = Omit<CanvasProps, 'children'>
export interface DrawingBoardRef {
  pickImage: () => Promise<void>
}

// https://kazzkiq.github.io/svg-color-filter/
const BLACK_AND_WHITE = [
  // r-rbgam
  0, 1, 0, 0, 0,
  // g-rbgam
  0, 1, 0, 0, 0,
  // b-rbgam
  0, 1, 0, 0, 0,
  // a-rbgam
  0, 0, 0, 1, 0,
]
const GRAY_SCALE = [
  // r-rbgam
  1, 0, 0, 0, 0,
  // g-rbgam
  1, 0, 0, 0, 0,
  // b-rbgam
  1, 0, 0, 0, 0,
  // a-rbgam
  0, 0, 0, 1, 0,
]

/**
 * TODO:
 * 1. 滤镜(颜色模式) 黑白二值、
 *  - 调研openCV结合Skia怎么用
 * 通过current获取matrix来控制当前选中的对象
 */
export const DrawingBoard = forwardRef<DrawingBoardRef, DrawingBoardProps>(
  ({ style, ...props }, ref) => {
    const layers = useDrawingBoardStore((state) => state.layers)
    const addLayer = useDrawingBoardStore((state) => state.addLayer)
    const changeLayer = useDrawingBoardStore((state) => state.changeLayer)
    const Toast = useToastController()
    const [height, setHeight] = useState(screenWidth)

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
        const matrix = Skia.Matrix()
        image &&
          addLayer({
            id: uuidv4(),
            type: LayerType.album,
            matrix,
            props: {
              image,
              fit: 'contain',
              width: height,
              height,
              colorMatrixProps: {
                matrix: BLACK_AND_WHITE,
              },
            },
          })
      } else {
        Toast.show('未选择图片')
      }
    }

    useImperativeHandle(ref, () => ({
      pickImage,
    }))

    return (
      <GestureHandlerRootView>
        <Canvas
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
          {layers.map((layer) => (
            <Layer key={layer.id} {...layer} />
          ))}
        </Canvas>
        {layers?.map?.((layer) => (
          <GestureHandler
            key={layer.id}
            matrix={layer.matrix}
            dimensions={rect(0, 0, (layer?.props as any)?.width, (layer?.props as any)?.height)}
            onMatrixChange={(matrix) =>
              changeLayer({
                ...layer,
                matrix,
              })
            }
          />
        ))}
      </GestureHandlerRootView>
    )
  }
)
