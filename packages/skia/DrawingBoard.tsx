import { forwardRef, useImperativeHandle } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Skia, Canvas, CanvasProps, rect } from '@shopify/react-native-skia'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useDrawingBoardStore, LayerType, useDrawingCanvastore } from '@my/stores'
import { useToastController } from '@tamagui/toast'
import { GestureHandler } from './GestureHandler'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import Layer from './Layer'
import { getRatio, scaleByRatio } from './utils'

export type DrawingBoardProps = Omit<CanvasProps, 'children'>
export interface DrawingBoardRef {
  pickImage: () => Promise<void>
}

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
    const setCurrentLayer = useDrawingBoardStore((state) => state.setCurrentLayer)
    const { canvasWidth, canvasHeight } = useDrawingCanvastore((state) => ({
      canvasWidth: state.width,
      canvasHeight: state.height,
    }))
    const Toast = useToastController()

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
              width: canvasWidth,
              // 按比例缩放
              height: scaleByRatio(getRatio(canvasHeight, image.width()), image.height()),
              shader: 'grayscale',
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
          style={[
            {
              width: canvasWidth,
              height: canvasHeight,
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
            onSelect={() => setCurrentLayer(layer)}
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
