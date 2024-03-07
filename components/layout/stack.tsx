import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'
import { View, ViewProps } from 'react-native'

const stackVariants = cva('flex flex-1', {
  variants: {
    align: {
      start: cn('items-start'),
      center: cn('items-center'),
      stretch: cn('items-stretch'),
      end: cn('items-end')
    },
    justify: {
      start: cn('justify-start'),
      center: cn('justify-center'),
      end: cn('justify-end'),
      'space-between': cn('justify-between'),
      'space-arround': cn('justify-around')
    },
    gap: {
      xs: cn('gap-1'),
      sm: cn('gap-2'),
      md: cn('gap-3'),
      lg: cn('gap-4'),
      xl: cn('gap-5')
    }
  },
  defaultVariants: { align: 'start', justify: 'start', gap: 'sm' }
})

interface Props extends ViewProps, VariantProps<typeof stackVariants> {}

const Stack = ({
  children,
  className,
  align,
  justify,
  gap,
  ...props
}: Props) => {
  return (
    <View
      className={cn(stackVariants({ align, justify, gap, className }))}
      {...props}
    >
      {children}
    </View>
  )
}

export default Stack
