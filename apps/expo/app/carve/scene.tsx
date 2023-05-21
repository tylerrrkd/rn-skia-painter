import { CarveScene } from 'app/features/carve/scene'
import { ButtonText, SRScreen } from '@my/ui'
import { useTranslation } from '@my/locales'

export default () => {
  const { t } = useTranslation()

  return (
    <>
      <SRScreen
        options={{
          title: t('carve scene'),
          headerRight: () => <ButtonText>{t('next')}</ButtonText>,
        }}
      />
      <CarveScene />
    </>
  )
}
