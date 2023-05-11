import { Button, Text, XStack, YStack } from '@my/ui'
// import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function HomeScreen() {
  const { bottom } = useSafeAreaInsets()

  return (
    <YStack f={1} p="$4" space>
      <YStack f={1} jc="center" ai="center">
        <Button circular>开始</Button>
      </YStack>
      <YStack bottom={bottom}>
        <XStack>
          <Button f={1}>文件列表</Button>
        </XStack>
      </YStack>
    </YStack>
  )
}
