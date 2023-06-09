import React, { cloneElement } from 'react'
import { GetProps, SRIconButton, XStack, XStackProps } from '@my/ui'
import useMergedState from 'rc-util/lib/hooks/useMergedState'

export const ActionButton: React.FC<
  GetProps<typeof SRIconButton> & { type?: 's' | 'l'; active?: boolean }
> = ({ children, icon, type = 'l', active, ...props }) => {
  return (
    <SRIconButton
      color={'black'}
      height={'$8'}
      fontSize={type === 'l' ? '$4' : '$3'}
      icon={cloneElement(icon as JSX.Element, {
        color: active ? '$primary' : '$inactive',
        size: type === 'l' ? '$3' : '$2',
      })}
      flexDirection="column"
      {...props}
    >
      {children}
    </SRIconButton>
  )
}

export type Action<T = string> = Omit<GetProps<typeof ActionButton>, 'active'> & { key: T }

export const ActionGroup = <T,>({
  actions,
  value,
  defaultValue,
  onChange,
  ...props
}: {
  actions: Action<T>[]
  value?: Action<T>
  defaultValue?: Action<T>
  onChange?: (action: Action<T>) => void
} & XStackProps) => {
  const [mergedValue, setValue] = useMergedState(defaultValue, {
    value,
  })

  return (
    <XStack justifyContent="center" {...props}>
      {actions?.map?.(({ children, ...action }) => (
        <ActionButton
          {...{
            ...action,
            onPress: (event) => {
              action?.onPress?.(event)
              setValue(action)
              onChange?.(action)
            },
            active: action.key === mergedValue?.key,
          }}
        >
          {children}
        </ActionButton>
      ))}
    </XStack>
  )
}
