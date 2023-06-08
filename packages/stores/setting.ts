import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useSettingStore = create(
  combine({ IPAddress: '' }, (set) => ({
    setIPAddress: (IPAddress: string) => set(() => ({ IPAddress })),
  }))
)
