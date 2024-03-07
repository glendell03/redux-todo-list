import React, { PropsWithChildren, useCallback } from 'react'
import { Pressable, Text } from 'react-native'
import { Group } from './layout'
import { useAppDispatch } from '@/hooks/redux'
import {
  TodoState,
  deleteTodo,
  toggleTodo
} from '@/redux/features/todos/todosSlice'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { cn } from '@/lib/utils'
import { router } from 'expo-router'

interface Props {
  id: string
  checked: boolean
  priority: TodoState['priority']
}

const ListItem = ({
  children,
  id,
  checked,
  priority
}: PropsWithChildren<Props>) => {
  const dispatch = useAppDispatch()

  const handleDeleteTodo = useCallback(() => dispatch(deleteTodo({ id })), [])

  const handleEditTodo = useCallback(() => {
    router.navigate(`/(app)/addTodoModal?id=${id}`)
  }, [])

  const handleToggleTodo = useCallback(() => dispatch(toggleTodo({ id })), [])

  return (
    <Group
      className='bg-white px-3 py-1 h-12 items-center rounded-md'
      justify='space-between'
    >
      <BouncyCheckbox
        isChecked={checked}
        onPress={handleToggleTodo}
        fillColor='black'
        unfillColor='white'
      />
      <Text
        className={cn('mr-2', {
          'text-green-400': priority === 'low',
          'text-yellow-400': priority === 'medium',
          'text-red-400': priority === 'high'
        })}
      >
        {priority}
      </Text>
      <Text
        numberOfLines={1}
        className={cn('flex-1', { 'line-through': checked })}
      >
        {children}
      </Text>
      <Pressable onPress={handleEditTodo}>
        <Text className='text-blue-500 mr-2'>Edit</Text>
      </Pressable>
      <Pressable onPress={handleDeleteTodo}>
        <Text className='text-red-500'>Delete</Text>
      </Pressable>
    </Group>
  )
}

export default ListItem
