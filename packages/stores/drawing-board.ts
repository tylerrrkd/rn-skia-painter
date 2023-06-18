import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { SkImage } from "@shopify/react-native-skia"

export const useDrawingBoardStore = create(
  combine(
    {
      /**
       * 相册里导入的图片
       */
      images: [] as SkImage[],
    },
    (set, get) => ({
      addImage: (image: SkImage) => {
        set({ images: [...get().images, image] })
      },
    })
  )
)
