import { useState, forwardRef, useImperativeHandle } from 'react'
import { LayoutChangeEvent } from 'react-native'
import {
  Skia,
  Canvas,
  CanvasProps,
  Group,
  Image,
  BackdropFilter,
  ColorMatrix,
} from '@shopify/react-native-skia'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useDrawingBoardStore } from '@my/stores'
import { useToastController } from '@tamagui/toast'

export type DrawingBoardProps = Omit<CanvasProps, 'children'>
export interface DrawingBoardRef {
  pickImage: () => Promise<void>
}

// https://kazzkiq.github.io/svg-color-filter/
const BLACK_AND_WHITE = [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0]
const GRAY_SCALE = [
  0.3333, 0.3333, 0.3333, 0, 0, 0.3333, 0.3333, 0.3333, 0, 0, 0.3333, 0.3333, 0.3333, 0, 0, 0, 0, 0,
  1, 0,
]

export const DrawingBoard = forwardRef<DrawingBoardRef, DrawingBoardProps>(
  ({ style, ...props }, ref) => {
    const images = useDrawingBoardStore((state) => state.images)
    const addImage = useDrawingBoardStore((state) => state.addImage)
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
        image && addImage(image)
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
        <Group origin={{ x: height / 2, y: height / 2 }}>
          {images.map((image, index) => (
            <Image
              key={index}
              image={image}
              fit="contain"
              x={0}
              y={0}
              width={height}
              height={height}
            />
          ))}
          <BackdropFilter
            clip={{ x: 0, y: 0, width: height, height: height }}
            filter={<ColorMatrix matrix={BLACK_AND_WHITE} />}
          />
        </Group>
      </Canvas>
    )
  }
)
