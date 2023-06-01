import { SRRoundButton, SRButton, XStack, YStack } from '@my/ui'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslation } from '@my/locales'
import { useLink } from 'solito/link'

export function HomeScreen() {
  const { bottom } = useSafeAreaInsets()
  const { t } = useTranslation()
  const carveScenelink = useLink({
    href: '/carve/scene',
  })
  const fileListlink = useLink({
    href: '/file-list',
  })

  return (
    <YStack f={1} p="$4" space>
      <YStack f={1} jc="center" ai="center">
        <SRRoundButton w={'$12'} h={'$12'} {...carveScenelink}>
          {t('start')}
        </SRRoundButton>
      </YStack>
      <XStack bottom={bottom}>
        <SRButton color="white" backgroundColor={'$primary'} f={1} {...fileListlink}>
          {t('file list')}
        </SRButton>
      </XStack>
    </YStack>
  )
}
