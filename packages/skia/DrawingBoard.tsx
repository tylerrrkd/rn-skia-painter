import { useState, forwardRef, useImperativeHandle } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { Skia, Canvas, CanvasProps, Image } from '@shopify/react-native-skia'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useDrawingBoardStore } from '@my/stores'
import { useToastController } from '@tamagui/toast'
import ImageLayer from './ImageLayer'

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

export const DrawingBoard = forwardRef<DrawingBoardRef, DrawingBoardProps>(
  ({ style, ...props }, ref) => {
    const imageLayers = useDrawingBoardStore((state) => state.imageLayers)
    const addImageLayer = useDrawingBoardStore((state) => state.addImageLayer)
    const Toast = useToastController()
    const [height, setHeight] = useState(0)

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
            image: {
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
        {imageLayers.map(({ image }, index) => (
          <ImageLayer key={index} {...image} />
        ))}
      </Canvas>
    )
  }
)
