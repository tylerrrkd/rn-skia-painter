import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { ImageProps, SkiaProps } from '@shopify/react-native-skia'

export interface ImageLayer {
  image: SkiaProps<ImageProps>
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
