import { Button, Text, XStack, YStack } from '@my/ui'
// import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from '@my/locales'

export function HomeScreen() {
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  return (
    <YStack f={1} p="$4" space>
      <YStack f={1} jc="center" ai="center">
        <Button>{t('start')}</Button>
      </YStack>
      <XStack bottom={bottom}>
        <Button f={1}>{t('file list')}</Button>
      </XStack>
    </YStack>
  )
}
