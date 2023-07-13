import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { Dimensions } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

export const useDrawingCanvastore = create(
  combine(
    {
      width: screenWidth,
      height: screenWidth,
    },
    (set) => ({
      setSize: ({ width, height }: { width: number; height: number }) => {
        set({ width, height })
      },
    })
  )
)
