import { CustomToast, TamaguiProvider, TamaguiProviderProps, ToastProvider } from '@my/ui'
import { LanguageProvider } from '@my/locales'
import { useColorScheme } from 'react-native'

import { ToastViewport } from './ToastViewport'
import config from '../tamagui.config'

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  return (
    <TamaguiProvider config={config} disableInjectCSS defaultTheme={'light'} {...rest}>
      <LanguageProvider>
        <ToastProvider
          swipeDirection="horizontal"
          duration={6000}
          native={[
            /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
            'ios',
            'android',
          ]}
        >
          {children}
          <CustomToast />
          <ToastViewport />
        </ToastProvider>
      </LanguageProvider>
    </TamaguiProvider>
  )
}
