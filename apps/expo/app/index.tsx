import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { ButtonText, getTokens } from '@my/ui'
import { Settings } from '@tamagui/lucide-icons'
import { useMemo } from 'react'
import { useTranslation } from '@my/locales'

export default function Screen() {
  const { t } = useTranslation()

  const isConnected = false

  const disabled = useMemo(() => !isConnected, [isConnected])

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerLeft: () => (
            <ButtonText {...{ disabled }}>
              <Settings />
            </ButtonText>
          ),
          headerRight: () => (
            <ButtonText {...{ disabled }}>
              {isConnected ? t('connected') : t('unconnected')}
            </ButtonText>
          ),
          headerShadowVisible: false,
          contentStyle: {
            borderTopColor: "$color",
            borderTopWidth: 1,
          },
        }}
      />
      <HomeScreen />
    </>
  )
}
