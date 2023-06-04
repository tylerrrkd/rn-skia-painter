import { useState, cloneElement } from 'react'
import { Check } from '@tamagui/lucide-icons'
import { Adapt, Select, SelectProps, Sheet, GetProps } from 'tamagui'

export interface SROptions {
  label: React.ReactNode
  value: string
}

export function SRSelector({
  title,
  options,
  triggerProps = {
    flex: 1,
    backgroundColor: '$backgroundTransparent',
    pressStyle: { backgroundColor: '$colorTransparent' },
  },
  valueProps,
  titleProps,
  trigger,
  ...props
}: SelectProps & {
  title?: React.ReactNode
  options: SROptions[]
  triggerProps?: GetProps<typeof Select.Trigger>
  valueProps?: GetProps<typeof Select.Value>
  titleProps?: GetProps<typeof Select.Label>
  trigger?: () => React.ReactElement
}) {
  const [open, setOpen] = useState(false)

  return (
    <Select open={open} onOpenChange={setOpen} {...props}>
      {typeof trigger === 'function' ? (
        cloneElement(trigger(), {
          onPress: () => setOpen((x) => !x),
        })
      ) : (
        <Select.Trigger {...triggerProps}>
          <Select.Value {...valueProps} />
        </Select.Trigger>
      )}
      <Adapt platform="touch">
        <Sheet native modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$2">
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>
      <Select.Content zIndex={1000}>
        <Select.Viewport minWidth={200}>
          <Select.Group>
            {title && (
              <Select.Label textAlign="center" {...titleProps}>
                {title}
              </Select.Label>
            )}
            {options?.map?.(({ label, value }, i) => {
              return (
                <Select.Item index={i} key={i} value={value}>
                  <Select.ItemText>{label}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              )
            })}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  )
}
