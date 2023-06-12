import { useState, useCallback, useEffect } from 'react'
import { GetProps, Input, XStack } from 'tamagui'
import { useTranslation } from '@my/locales'
import { useSettingStore } from '@my/stores'
import { SRDialog } from './SRDialog'

export const SRConnectIPDialog: React.FC<GetProps<typeof SRDialog>> = ({ ...props }) => {
  const { t } = useTranslation()
  const [IPAddress, setIPAddress] = useSettingStore((state) => [
    state.IPAddress,
    state.setIPAddress,
  ])
  const [typingIPAddress, setTypingIPAddress] = useState<string>()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    IPAddress && setTypingIPAddress(IPAddress)
  }, [IPAddress])

  const onConfirm = useCallback(async () => {
    if (!typingIPAddress) {
      setIsError(true)
      return false
    } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(typingIPAddress)) {
      setIsError(true)
      return false
    }
    setIsError(false)
    setIPAddress(typingIPAddress)
    return true
  }, [typingIPAddress])

  return (
    <SRDialog
      tittle={t('connect IP address')}
      onConfirm={onConfirm}
      content={
        <XStack>
          <Input
            flex={1}
            textAlign="center"
            borderWidth={'$0.5'}
            borderStyle={'solid'}
            borderColor={isError ? 'red' : '$border'}
            focusStyle={
              isError
                ? {}
                : {
                    borderWidth: '$0.5',
                    borderColor: '$border',
                  }
            }
            keyboardType="numeric"
            value={typingIPAddress}
            placeholder={t('enter IP address on the motherboard')}
            placeholderTextColor={'$gray11'}
            onChange={(event) => {
              setIsError(false)
              setTypingIPAddress(event?.nativeEvent?.text)
            }}
          />
        </XStack>
      }
      {...props}
    />
  )
}
