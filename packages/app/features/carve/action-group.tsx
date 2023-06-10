import React, { cloneElement } from 'react'
import { GetProps, SRIconButton, XStack, XStackProps } from '@my/ui'

export type ActionButtonProps = GetProps<typeof SRIconButton> & {
  type?: 's' | 'l'
  active?: boolean
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  icon,
  type = 'l',
  active,
  ...props
}) => {
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
