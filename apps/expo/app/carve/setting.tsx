import { CarveSetting } from 'app/features/carve/setting'
import { ButtonText, SRScreen } from '@my/ui'
import { useTranslation } from '@my/locales'

export default () => {
  const { t } = useTranslation()

  return (
    <>
      <SRScreen
        options={{
          title: t('carve setting'),
          headerRight: () => <ButtonText>{t('next')}</ButtonText>,
        }}
      />
      <CarveSetting />
    </>
  )
}
