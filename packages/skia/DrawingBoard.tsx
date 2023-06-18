import { useState, forwardRef, useImperativeHandle } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { Skia, Canvas, CanvasProps, Group, Image, useImage } from '@shopify/react-native-skia'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useDrawingBoardStore } from '@my/stores'
import { useToastController } from '@tamagui/toast'

export type DrawingBoardProps = Omit<CanvasProps, 'children'>
export interface DrawingBoardRef {
  pickImage: () => Promise<void>
}

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
        <Group>
          {images.map((image) => (
            <Image image={image} fit="contain" x={0} y={0} width={256} height={256} />
          ))}
        </Group>
      </Canvas>
    )
  }
)
