import { forwardRef, useImperativeHandle } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  Skia,
  Canvas,
  CanvasProps,
  rect,
  useCanvasRef,
  ImageFormat,
} from '@shopify/react-native-skia'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useDrawingBoardStore, LayerType, useDrawingCanvastore } from '@my/stores'
import { useToastController } from '@tamagui/toast'
import { GestureHandler } from './GestureHandler'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import Layer from './Layer'
import { getRatio, scaleByRatio } from './utils'
import { useTranslation } from '@my/locales'
import React from 'react'
import CNCHandler, { CNCHandlerRef } from '@my/cnc'

export type DrawingBoardProps = Omit<CanvasProps, 'children'>
export interface DrawingBoardRef {
  pickImage: () => Promise<void>
  onNext: (triggerNext?: () => void) => void
}

/**
 * TODO:
 * 1. 滤镜(颜色模式) 黑白二值、
 *  - 调研openCV结合Skia怎么用
 * 通过current获取matrix来控制当前选中的对象
 */
export const DrawingBoard = forwardRef<DrawingBoardRef, DrawingBoardProps>(
  ({ style, ...props }, ref) => {
    const canvasRef = useCanvasRef()
    const { t } = useTranslation()
    const layers = useDrawingBoardStore((state) => state.layers)
    const addLayer = useDrawingBoardStore((state) => state.addLayer)
    const changeLayer = useDrawingBoardStore((state) => state.changeLayer)
    const setCurrentLayer = useDrawingBoardStore((state) => state.setCurrentLayer)
    const setSnapshot = useDrawingBoardStore((state) => state.setSnapshot)
    const { canvasWidth, canvasHeight } = useDrawingCanvastore((state) => ({
      canvasWidth: state.width,
      canvasHeight: state.height,
    }))
    const Toast = useToastController()
    const cncHandlerRef = React.useRef<CNCHandlerRef>(null)

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
        Toast.show(t('you did not choose image'))
      }
    }

    // FIXME: ref多次转发 无法拿到 layers 最新值
    const onNext: DrawingBoardRef['onNext'] = async (triggerNext) => {
      // if (layers.length <= 0) return Toast.show('内容为空')
      // const image = canvasRef.current?.makeImageSnapshot()
      // if (image) {
      //   const base64 = image.encodeToBase64(ImageFormat.PNG, 100)
      //   setSnapshot(`data:image/png;base64,${base64}`)
      //   triggerNext?.()
      // }
      const image = layers?.[0]?.props?.image
      const base64 = image?.encodeToBase64?.(ImageFormat?.JPEG, 100)!
      const gcode = await cncHandlerRef.current?.getGCode({
        base64,
        width: image?.width()!,
        height: image?.height()!,
      })
      console.log(gcode, 1232)
    }

    useImperativeHandle(ref, () => ({
      pickImage,
      onNext,
    }))

    return (
      <>
        <GestureHandlerRootView>
          <Canvas
            ref={canvasRef}
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
        <CNCHandler ref={cncHandlerRef} />
      </>
    )
  }
)
