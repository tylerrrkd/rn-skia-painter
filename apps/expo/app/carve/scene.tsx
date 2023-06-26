import { CarveScene } from 'app/features/carve/scene'
import { ButtonText, SRScreen } from '@my/ui'
import { useTranslation } from '@my/locales'
import { useLink } from 'solito/link'

export default () => {
  const { t } = useTranslation()
  const carveSettingLink = useLink({
    href: '/carve/setting',
  })

  return (
    <>
      <SRScreen
        options={{
          title: t('carve scene'),
          headerRight: () => <ButtonText {...carveSettingLink}>{t('next')}</ButtonText>,
        }}
      />
      <CarveScene />
    </>
  )
}
