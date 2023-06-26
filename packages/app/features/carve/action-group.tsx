import React from 'react'
import { XStack, XStackProps } from '@my/ui'
import { ActionButton, ActionButtonProps } from './actions'

export type Action<T = string> = Omit<ActionButtonProps, 'active'> & { key: T }

/**
 * @description 区分按钮状态组件
 */
export const ActionGroup = <T,>({
  actions,
  value,
  onChange,
  type = 'l',
  ...props
}: {
  actions: Action<T>[]
  value?: Action<T>
  onChange?: (action: Action<T>) => void
  type?: ActionButtonProps['type']
} & XStackProps) => {
  return (
    <XStack justifyContent="center" {...props}>
      {actions?.map?.(({ children, ...action }) => (
        <ActionButton
          {...{
            type,
            ...action,
            onPress: (event) => {
              if (action.key === value?.key) return
              action?.onPress?.(event)
              onChange?.(action)
            },
            active: action.key === value?.key,
          }}
        >
          {children}
        </ActionButton>
      ))}
    </XStack>
  )
}
