import React, { useCallback } from 'react'
import { useTranslation } from '@my/locales'
import { Image, XStack, YStack } from '@my/ui'
import { ActionSlider } from './actions'
import { useDrawingBoardStore, useDrawingCanvastore, useSettingStore } from '@my/stores'
import { useCarveSettingStore } from '@my/stores/carve-setting'
import { getFtpClient, uploadFileTo } from '@my/command/ftp'

export const CarveSetting = () => {
  const { t } = useTranslation()
  const width = useDrawingCanvastore((s) => s.width)
  const height = useDrawingCanvastore((s) => s.height)
  const carvePrecision = useCarveSettingStore((s) => s.carvePrecision)
  const carveSpeed = useCarveSettingStore((s) => s.carveSpeed)
  const laserPower = useCarveSettingStore((s) => s.laserPower)
  const setCarvePrecision = useCarveSettingStore((s) => s.setCarvePrecision)
  const setCarveSpeed = useCarveSettingStore((s) => s.setCarveSpeed)
  const setLaserPower = useCarveSettingStore((s) => s.setLaserPower)
  const snapshot = useDrawingBoardStore((s) => s.snapshot)

  const uploadToDevice = useCallback(() => {
    const ftpClient = getFtpClient({
      ip_address: useSettingStore.getState().IPAddress,
    })
    console.log(ftpClient)
  }, [useSettingStore])

  return (
    <YStack flex={1}>
      <XStack height={'$3'} />
      <XStack
        overflow="hidden"
        style={{
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: '#ff0000',
          backgroundColor: '#f4f4f4',
        }}
      >
        <Image
          onPress={uploadToDevice}
          style={{
            width,
            height,
          }}
          source={{ uri: snapshot }}
        />
      </XStack>
      <YStack mt={'$2'} space={'$2'}>
        <ActionSlider
          min={5}
          max={10}
          value={carvePrecision}
          onChange={setCarvePrecision}
          name={t('carve precision')}
        />
        <ActionSlider
          min={1}
          unit="%"
          value={carveSpeed}
          onChange={setCarveSpeed}
          name={t('carve speed')}
        />
        <ActionSlider
          min={1}
          unit="%"
          value={laserPower}
          onChange={setLaserPower}
          name={t('laser power')}
        />
      </YStack>
    </YStack>
  )
}
