import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { ImageLayerProps } from '@my/skia/ImageLayer'

export interface ImageLayer {
  image: ImageLayerProps
}

export const useDrawingBoardStore = create(
  combine(
    {
      /**
       * 相册里导入的图片
       */
      imageLayers: [] as ImageLayer[],
    },
    (set, get) => ({
      addImageLayer: (imageLayer: ImageLayer) => {
        set({ imageLayers: [...get().imageLayers, imageLayer] })
      },
    })
  )
)
