import { Image, RuntimeShader } from '@shopify/react-native-skia'
import type {
  ImageProps,
  SkiaProps,
  RuntimeShaderImageFilterProps,
} from '@shopify/react-native-skia'
import { BLACK_AND_WHITE_SHADER, GRAY_SHADER } from './utils/shader'
import { ShaderType } from 'app/features/carve/operations'

export type ImageLayerProps = {
  shader: ShaderType
} & ImageProps

const ShaderMap: Record<ShaderType, Parameters<typeof RuntimeShader>[number]['source']> = {
  'b/w': BLACK_AND_WHITE_SHADER,
  grayscale: GRAY_SHADER,
  outline: BLACK_AND_WHITE_SHADER,
  'true tone': GRAY_SHADER,
}

const ImageLayer: React.FC<ImageLayerProps> = ({ shader, ...props }) => {
  return (
    <Image x={0} y={0} {...props}>
      <RuntimeShader source={ShaderMap[shader]} />
    </Image>
  )
}

export default ImageLayer
