import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { ImageLayerProps } from '@my/skia/ImageLayer'

export enum LayerType {
  material = 'material',
  text = 'text',
  brush = 'brush',
  album = 'album',
}

export interface LayerInfo {
  type: LayerType
}

export const useDrawingBoardStore = create(
  combine(
    {
      /**
       * 当前操作的图层
       */
      currentLayer: {} as LayerInfo,
      /**
       * 相册里导入的图片
       */
      imageLayers: [] as ImageLayerProps[],
    },
    (set, get) => ({
      addImageLayer: (imageLayer: ImageLayerProps) => {
        set({ imageLayers: [...get().imageLayers, imageLayer] })
      },
      changeImageLayer: (imageLayer: ImageLayerProps) => {
        // 受控的挪到第一个
        const shaking = get().imageLayers?.filter?.((layer) => layer.id !== imageLayer.id)
        set({ imageLayers: [imageLayer, ...shaking] })
      },
    })
  )
)
