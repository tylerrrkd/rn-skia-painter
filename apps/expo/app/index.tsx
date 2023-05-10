import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { Button } from '@my/ui'
import { Settings } from '@tamagui/lucide-icons'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerLeft: () => <Button icon={Settings} chromeless />,
        }}
      />
      <HomeScreen />
    </>
  )
}
