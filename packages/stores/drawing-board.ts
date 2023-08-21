import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import type { ImageLayerProps } from '@my/skia/ImageLayer'
import { SkMatrix } from '@shopify/react-native-skia'

export enum LayerType {
  material = 'material',
  text = 'text',
  brush = 'brush',
  album = 'album',
}

export interface LayerCommon {
  id: string
  type: LayerType
  matrix: SkMatrix
}

export interface LayerInfo extends LayerCommon {
  props: ImageLayerProps
}

export const useDrawingBoardStore = create(
  combine(
    {
      /**
       * 各个图层
       */
      layers: [] as LayerInfo[],
      currentLayer: {} as LayerInfo,
      snapshot: "" as string
    },
    (set, get) => ({
      clearLayers: () => set({ layers: [] }),
      addLayer: (layer: LayerInfo) => {
        set({ layers: [...get().layers, layer] })
      },
      setCurrentLayer: (currentLayer: LayerInfo) => {
        // 受控的挪到最上面(最后一个渲染)
        const shaking = get().layers?.filter?.((layer) => layer.id !== currentLayer.id)
        set({ layers: [...shaking, currentLayer], currentLayer })
      },
      changeLayer: (currentLayer: LayerInfo) => {
        // 受控的挪到最上面(最后一个渲染)
        const shaking = get().layers?.filter?.((layer) => layer.id !== currentLayer.id)
        set({ layers: [...shaking, currentLayer] })
      },
      setSnapshot(snapshot: string) {
        set({ snapshot })
      }
    })
  )
)
