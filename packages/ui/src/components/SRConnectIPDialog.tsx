import { useState } from 'react'
import { GetProps, Input, XStack } from 'tamagui'
import { useTranslation } from '@my/locales'
import { SRDialog } from './SRDialog'

export const SRConnectIPDialog: React.FC<GetProps<typeof SRDialog>> = ({ ...props }) => {
  const { t } = useTranslation()
  const [IPAddress, setIPAddress] = useState('')

  return (
    <SRDialog
      tittle={t('connect IP address')}
      content={
        <XStack>
          <Input
            flex={1}
            textAlign="center"
            borderWidth={'$0.5'}
            borderStyle={'solid'}
            borderColor={'$border'}
            focusStyle={{
              borderWidth: '$0.5',
              borderColor: '$border',
            }}
            keyboardType="numeric"
            value={IPAddress}
            placeholder={t('enter IP address on the motherboard')}
            placeholderTextColor={'$gray11'}
            onChange={(event) => setIPAddress(event?.nativeEvent?.text)}
          />
        </XStack>
      }
      {...props}
    />
  )
}
