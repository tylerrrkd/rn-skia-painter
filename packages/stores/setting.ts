import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { TranslationKey } from '@my/locales'

export const useSettingStore = create(
  combine(
    {
      IPAddress: '',
      isConnected: false,
      // 给非react组件用的语言表
      locale: {} as Record<string, string>,
    },
    (set) => ({
      setIPAddress: (IPAddress: string) => set(() => ({ IPAddress })),
      setConnectStatus: (isConnected: boolean) => set(() => ({ isConnected })),
      setLocale: (locale: Record<string, string>) => set(() => ({ locale })),
    })
  )
)

export const translate = (key: TranslationKey) => {
  const locale = useSettingStore.getState().locale
  return locale?.[key] || key
}
