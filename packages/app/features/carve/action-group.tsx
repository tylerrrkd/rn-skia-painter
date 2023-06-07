import React, { cloneElement } from 'react'
import { GetProps, SRIconButton, XStack, XStackProps } from '@my/ui'

export const ActionButton: React.FC<
  GetProps<typeof SRIconButton> & { type?: 's' | 'l'; active?: boolean }
> = ({ children, icon, type = 'l', active }) => {
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
    >
      {children}
    </SRIconButton>
  )
}

export type Action<T = string> = Exclude<GetProps<typeof ActionButton>, 'active'> & { key?: T }

export const ActionGroup: React.FC<
  {
    actions: Action[]
    current?: Action
    onChange: (action: Action) => void
  } & XStackProps
> = ({ actions, current, onChange, ...props }) => {
  return (
    <XStack justifyContent="center" {...props}>
      {actions?.map?.(({ children, ...action }) => (
        <ActionButton
          {...{
            ...action,
            onPress: (event) => {
              action?.onPress?.(event)
              onChange(action)
            },
            active: action.key === current?.key,
          }}
        >
          {children}
        </ActionButton>
      ))}
    </XStack>
  )
}
