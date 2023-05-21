import { HomeScreen } from 'app/features/home/screen'
import { ButtonText, SRScreen } from '@my/ui'
import { Settings } from '@tamagui/lucide-icons'
import { useMemo } from 'react'
import { useTranslation } from '@my/locales'

export default () => {
  const { t } = useTranslation()

  const isConnected = false

  const disabled = useMemo(() => !isConnected, [isConnected])

  return (
    <>
      <SRScreen
        options={{
          title: '',
          headerLeft: () => (
            <ButtonText {...{ disabled }}>
              <Settings />
            </ButtonText>
          ),
          headerRight: () => (
            <ButtonText {...{ disabled }}>
              {isConnected ? t('connected') : t('unconnected')}
            </ButtonText>
          ),
        }}
      />
      <HomeScreen />
    </>
  )
}
