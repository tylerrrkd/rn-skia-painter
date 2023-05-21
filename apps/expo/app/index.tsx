import { HomeScreen } from 'app/features/home/screen'
import { ButtonText, SRIconButton, SRScreen } from '@my/ui'
import { Settings } from '@tamagui/lucide-icons'
// import { useMemo } from 'react'
import { useTranslation } from '@my/locales'
import { useLink } from 'solito/link'

export default () => {
  const { t } = useTranslation()

  const settingLink = useLink({
    href: '/setting',
  })

  const isConnected = false

  // const disabled = useMemo(() => !isConnected, [isConnected])

  return (
    <>
      <SRScreen
        options={{
          title: '',
          headerLeft: () => (
            <SRIconButton {...settingLink} padding={0} icon={<Settings size={'$1.5'} />} />
          ),
          headerRight: () => (
            <ButtonText
              pressStyle={{
                opacity: 0.6,
              }}
            >
              {isConnected ? t('connected') : t('unconnected')}
            </ButtonText>
          ),
        }}
      />
      <HomeScreen />
    </>
  )
}
