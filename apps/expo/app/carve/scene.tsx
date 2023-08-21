import { CarveScene, CarveSceneRef } from 'app/features/carve/scene'
import { ButtonText, SRScreen } from '@my/ui'
import { useTranslation } from '@my/locales'
import { useLink } from 'solito/link'
import { useRef } from 'react'

export default () => {
  const { t } = useTranslation()
  const { onPress, ...carveSettingLink } = useLink({
    href: '/carve/setting',
  })
  const carveSceneRef = useRef<CarveSceneRef>(null)

  return (
    <>
      <SRScreen
        options={{
          title: t('carve scene'),
          headerRight: () => <ButtonText onPress={() => carveSceneRef.current?.drawingBoard?.onNext(onPress)} {...carveSettingLink}>{t('next')}</ButtonText>,
        }}
      />
      <CarveScene ref={carveSceneRef} />
    </>
  )
}
