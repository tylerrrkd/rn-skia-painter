import React from 'react'
import { useTranslation } from '@my/locales'
import { Image, XStack, YStack } from '@my/ui'
import { ActionSlider } from './actions'
import { useDrawingCanvastore } from '@my/stores'
import { useCarveSettingStore } from '@my/stores/carve-setting'

export const CarveSetting = () => {
  const { t } = useTranslation()
  const width = useDrawingCanvastore(s => s.width)
  const height = useDrawingCanvastore(s => s.height)
  const carvePrecision = useCarveSettingStore(s => s.carvePrecision)
  const carveSpeed = useCarveSettingStore(s => s.carveSpeed)
  const laserPower = useCarveSettingStore(s => s.laserPower)
  const setCarvePrecision = useCarveSettingStore(s => s.setCarvePrecision)
  const setCarveSpeed = useCarveSettingStore(s => s.setCarveSpeed)
  const setLaserPower = useCarveSettingStore(s => s.setLaserPower)

  return (
    <YStack flex={1}>
      <XStack height={"$3"} />
      <Image source={{ uri: "111" }} style={{
        width,
        height,
        borderWidth: 2,
        borderColor: '#ff0000',
        backgroundColor: '#f4f4f4',
      }} />
      <YStack mt={"$2"} space={"$2"}>
        <ActionSlider min={5} max={10} value={carvePrecision} onChange={setCarvePrecision} name={t('carve precision')} />
        <ActionSlider min={1} unit="%" value={carveSpeed} onChange={setCarveSpeed} name={t('carve speed')} />
        <ActionSlider min={1} unit="%" value={laserPower} onChange={setLaserPower} name={t('laser power')} />
      </YStack>
    </YStack>
  )
}
