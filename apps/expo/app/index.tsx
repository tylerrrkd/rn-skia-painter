import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { ButtonText } from '@my/ui'
import { Settings } from '@tamagui/lucide-icons'
import { useMemo } from 'react'

export default function Screen() {
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
          headerRight: () => <ButtonText {...{ disabled }}>未连接</ButtonText>,
        }}
      />
      <HomeScreen />
    </>
  )
}
