import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useSettingStore = create(
  combine({ IPAddress: '', isConnected: false }, (set) => ({
    setIPAddress: (IPAddress: string) => set(() => ({ IPAddress })),
    setConnectStatus: (isConnected: boolean) => set(() => ({ isConnected })),
  }))
)
