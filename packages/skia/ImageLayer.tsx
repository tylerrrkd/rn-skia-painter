import { ColorMatrix, Image } from '@shopify/react-native-skia'
import type { ImageProps, SkiaProps, MatrixColorFilterProps } from '@shopify/react-native-skia'

export type ImageLayerProps = {
  colorMatrixProps?: MatrixColorFilterProps
} & SkiaProps<ImageProps>

const ImageLayer: React.FC<ImageLayerProps> = ({ colorMatrixProps, ...props }) => {
  return (
    <Image x={0} y={0} {...props}>
      {colorMatrixProps && <ColorMatrix {...colorMatrixProps} />}
    </Image>
  )
}

export default ImageLayer
