import * as React from 'react'

import { cn } from '@/lib/utils'
import { TextInput, TextInputProps } from 'react-native'

export interface InputProps extends TextInputProps {}

const Input = ({ className, keyboardType, ...props }: InputProps) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      className={cn(
        'flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export default Input
