import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { ImageLayerProps } from '@my/skia/ImageLayer'

export interface ImageLayer {
  image: ImageLayerProps
}

export const useDrawingCanvastore = create(
  combine(
    {
      width: 0,
      height: 0,
    },
    (set) => ({
      setSize: ({ width, height }: { width: number; height: number }) => {
        set({ width, height })
      },
    })
  )
)
