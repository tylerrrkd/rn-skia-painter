import { useState, useCallback, useEffect, useImperativeHandle, forwardRef } from 'react'
import { GetProps, Input, XStack } from 'tamagui'
import { useTranslation } from '@my/locales'
import { useSettingStore } from '@my/stores'
import { useReportStatus } from '@my/command'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SRDialog } from './SRDialog'
import { useToastController } from '@tamagui/toast'

export const KEY_IP_ADDRESS = 'ipAddress'

export interface SRConnectIPDialogRef {
  initIPAddressFromStorage: () => Promise<string>
  reportStatus: any
}

export const SRConnectIPDialog = forwardRef<SRConnectIPDialogRef, GetProps<typeof SRDialog>>(
  ({ ...props }, ref) => {
    const Toast = useToastController()
    const { t } = useTranslation()
    const [IPAddress, setIPAddress] = useSettingStore((state) => [
      state.IPAddress,
      state.setIPAddress,
    ])
    const [typingIPAddress, setTypingIPAddress] = useState<string>()
    const [isError, setIsError] = useState(false)
    const { run: reportStatus, error } = useReportStatus(IPAddress)

    useEffect(() => {
      IPAddress && setTypingIPAddress(IPAddress)
    }, [IPAddress])

    const initIPAddressFromStorage = useCallback(async () => {
      const IPAddress = (await AsyncStorage.getItem(KEY_IP_ADDRESS)) || ''
      setIPAddress(IPAddress)
      return IPAddress
    }, [])

    useEffect(() => {
      if (error?.message) {
        if (error.message.includes('timeout')) {
          Toast.show(t('connection timeout, please check if the device is online'))
        } else if (error.message.includes('404')) {
          Toast.show(t('connected the incorrect IP address'))
        } else {
          Toast.show(error.message)
        }
      }
    }, [error])

    useImperativeHandle(ref, () => ({
      initIPAddressFromStorage,
      reportStatus,
    }))

    const onConfirm = useCallback(async () => {
      if (!typingIPAddress) {
        setIsError(true)
        return false
      } else if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(typingIPAddress)) {
        setIsError(true)
        return false
      }
      setIsError(false)
      AsyncStorage.setItem(KEY_IP_ADDRESS, typingIPAddress)
      setIPAddress(typingIPAddress)
      reportStatus()
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
)
