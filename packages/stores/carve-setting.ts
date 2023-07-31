import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useCarveSettingStore = create(
  combine(
    {
      carvePrecision: 5,
      carveSpeed: 50,
      laserPower: 100,
    },
    (set) => ({
      setCarvePrecision: (carvePrecision: number) => {
        set({ carvePrecision })
      },
      setCarveSpeed: (carveSpeed: number) => {
        set({ carveSpeed })
      },
      setLaserPower: (laserPower: number) => {
        set({ laserPower })
      },
    })
  )
)
