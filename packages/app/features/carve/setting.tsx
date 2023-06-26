import React from 'react'
import { useTranslation } from '@my/locales'
import { YStack } from '@my/ui'
import { ActionSlider } from './actions'

export const CarveSetting = () => {
  const { t } = useTranslation()

  return (
    <YStack flex={1}>
      <ActionSlider name={t('carve precision')} />
      <ActionSlider name={t('carve speed')} />
      <ActionSlider name={t('laser power')} />
    </YStack>
  )
}
