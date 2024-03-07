import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import { View, ViewProps } from 'react-native'

const groupVariants = cva(cn('flex flex-row'), {
  variants: {
    justify: {
      start: cn('justify-start'),
      center: cn('justify-center'),
      end: cn('justify-end'),
      'space-between': cn('justify-between')
    },
    gap: {
      xs: cn('gap-1'),
      sm: cn('gap-2'),
      md: cn('gap-3'),
      lg: cn('gap-4'),
      xl: cn('gap-5')
    }
  },
  defaultVariants: { justify: 'start', gap: 'sm' }
})

interface Props extends ViewProps, VariantProps<typeof groupVariants> {
  grow?: boolean
}

const Group = ({
  children,
  className,
  justify,
  gap,
  grow,
  ...props
}: Props) => {
  return (
    <View
      className={cn(groupVariants({ justify, gap, className }), { grow })}
      {...props}
    >
      {children}
    </View>
  )
}

export default Group
