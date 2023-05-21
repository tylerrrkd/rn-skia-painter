import { Button, SRRoundButton, SRButton, XStack, YStack } from '@my/ui'
// import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from '@my/locales'

export function HomeScreen() {
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()

  return (
    <YStack backgroundColor={'white'} f={1} p="$4" space>
      <YStack f={1} jc="center" ai="center">
        <SRRoundButton w={'$12'} h={'$12'}>
          {t('start')}
        </SRRoundButton>
      </YStack>
      <XStack bottom={bottom}>
        <SRButton color="white" backgroundColor={'$primary'} f={1}>
          {t('file list')}
        </SRButton>
      </XStack>
    </YStack>
  )
}
