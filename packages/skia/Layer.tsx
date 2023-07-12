import { LayerInfo, LayerType } from '@my/stores'
import { Group } from '@shopify/react-native-skia'
import { useMemo, memo } from 'react'
import ImageLayer from './ImageLayer'

/**
 * @description
 * 代理图层类型
 */
const Layer: React.FC<LayerInfo> = ({ type, matrix, props }) => {
  const layer = useMemo(() => {
    if (type === LayerType.album) return <ImageLayer {...props} />
  }, [type])

  return <Group matrix={matrix}>{layer}</Group>
}

export default memo(Layer)
