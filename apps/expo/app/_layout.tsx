import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'

export default () => {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })
  const scheme = useColorScheme()

  if (!loaded) {
    return null
  }
  return (
    <Provider>
        <ThemeProvider
          value={{
            dark: scheme === 'dark',
            colors: {
              ...DefaultTheme.colors,
              background: '#fff', // 全局背景色
              card: '#fff', // 卡片背景色
            },
          }}
        >
          <StatusBar style="dark" />
          <Stack />
        </ThemeProvider>
    </Provider>
  )
}
