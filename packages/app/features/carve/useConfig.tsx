import { useMemo } from 'react'
import { LayerType } from '@my/stores'
import { ActionButtonProps, ActionSliderProps } from './actions'

export enum ActionType {
  preview = 'preview',
}

/**
 * @description 雕刻配置
 */
const config: Map<
  LayerType,
  {
    actions?: {
      actionStack?: ActionButtonProps[]
      sliderStack?: ActionSliderProps[]
    }
  }
> = new Map([
  [LayerType.material, {}],
  [LayerType.text, { actions: {} }],
  [LayerType.brush, { actions: {} }],
  [LayerType.album, { actions: {} }],
])

export default (type: LayerType) => {
  return useMemo(() => config.get(type), [type])
}
