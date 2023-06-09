import { X } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { GestureResponderEvent } from 'react-native'
import { Button, ButtonProps, Dialog, DialogProps, Unspaced, XStack } from 'tamagui'
import { useTranslation } from '@my/locales'
import { SRButton } from '../SRComponent'

export const SRDialog: React.FC<
  DialogProps & {
    tittle?: string
    trigger?: React.ReactNode
    content?: React.ReactNode
    showCloseButton?: boolean
    confirmText?: string
    onConfirm?: (event: GestureResponderEvent) => Promise<boolean>
    confirmProps?: ButtonProps
    cancelText?: string
    onCancel?: ButtonProps['onPress']
    cancelProps?: ButtonProps
  }
> = ({
  tittle,
  trigger,
  content,
  showCloseButton,
  confirmText,
  onConfirm,
  confirmProps,
  cancelText,
  onCancel,
  cancelProps,
  ...props
}) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <Dialog modal open={open} onOpenChange={setOpen} {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          w={'90%'}
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          space
        >
          {tittle && (
            <Dialog.Title fontFamily="$body" size={'$5'} fontWeight={'700'} textAlign="center">
              {tittle}
            </Dialog.Title>
          )}
          {content}
          <XStack alignItems="center" justifyContent="center" space={'$2'}>
            <Dialog.Close asChild flex={1}>
              <Button {...cancelProps} onPress={onCancel}>
                {cancelText ? cancelText : t('cancel')}
              </Button>
            </Dialog.Close>
            <SRButton
              flex={1}
              {...confirmProps}
              onPress={async (event) => {
                const result = await onConfirm?.(event)
                result && setOpen(false)
              }}
            >
              {confirmText ? confirmText : t('confirm')}
            </SRButton>
          </XStack>
          {showCloseButton && (
            <Unspaced>
              <Dialog.Close asChild>
                <Button position="absolute" top="$0" right="$0" size="$2" circular icon={X} />
              </Dialog.Close>
            </Unspaced>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
