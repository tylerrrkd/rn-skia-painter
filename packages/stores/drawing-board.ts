import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { ImageLayerProps } from '@my/skia/ImageLayer'

export const useDrawingBoardStore = create(
  combine(
    {
      /**
       * 相册里导入的图片
       */
      imageLayers: [] as ImageLayerProps[],
    },
    (set, get) => ({
      addImageLayer: (imageLayer: ImageLayerProps) => {
        set({ imageLayers: [...get().imageLayers, imageLayer] })
      },
    })
  )
)
