import { SettingScreen } from 'app/features/setting/screen'
import { SRScreen } from '@my/ui'
import { useTranslation } from '@my/locales'

export default () => {
  const { t } = useTranslation()

  return (
    <>
      <SRScreen
        options={{
          title: t('setting'),
        }}
      />
      <SettingScreen />
    </>
  )
}
