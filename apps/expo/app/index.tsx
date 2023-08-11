import { HomeScreen } from 'app/features/home/screen'
import { ButtonText, SRConnectIPDialog, SRIconButton, SRScreen, SRConnectIPDialogRef } from '@my/ui'
import { Settings } from '@tamagui/lucide-icons'
// import { useMemo } from 'react'
import { useTranslation } from '@my/locales'
import { useLink } from 'solito/link'
import { useSettingStore } from '@my/stores'
import { useCallback, useEffect, useRef } from 'react'

export default () => {
  const { t } = useTranslation()

  const connectIPDialogRef = useRef<SRConnectIPDialogRef>(null)

  const { current: connectIPDialog } = connectIPDialogRef

  const settingLink = useLink({
    href: '/setting',
  })

  const isConnected = useSettingStore((s) => s.isConnected)

  // const disabled = useMemo(() => !isConnected, [isConnected])

  useEffect(() => {
    connectIPDialog?.initIPAddressFromStorage?.()
  }, [connectIPDialog])

  return (
    <>
      <SRScreen
        options={{
          title: '',
          headerLeft: () => (
            <SRIconButton {...settingLink} padding={0} icon={<Settings size={'$1.5'} />} />
          ),
          headerRight: () => (
            <SRConnectIPDialog
              ref={connectIPDialogRef}
              trigger={
                <ButtonText
                  pressStyle={{
                    opacity: 0.6,
                  }}
                >
                  {isConnected ? t('connected') : t('unconnected')}
                </ButtonText>
              }
            />
          ),
        }}
      />
      <HomeScreen />
    </>
  )
}
