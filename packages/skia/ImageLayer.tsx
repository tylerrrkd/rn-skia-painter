import { ColorMatrix, Group, Image } from '@shopify/react-native-skia'
import type {
  ImageProps,
  SkiaProps,
  MatrixColorFilterProps,
  SkMatrix,
} from '@shopify/react-native-skia'

export interface ImageLayerProps {
  id: string
  matrix: SkMatrix
  imageProps: SkiaProps<ImageProps>
  colorMatrixProps?: MatrixColorFilterProps
}

const ImageLayer: React.FC<ImageLayerProps> = ({ matrix, colorMatrixProps, imageProps }) => {
  return (
    <Group matrix={matrix}>
      <Image x={0} y={0} {...imageProps}>
        {colorMatrixProps && <ColorMatrix {...colorMatrixProps} />}
      </Image>
    </Group>
  )
}

export default ImageLayer
