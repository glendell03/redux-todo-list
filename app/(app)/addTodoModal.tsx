import { useSession } from '@/hooks/useSession'
import React, { useCallback, useEffect, useState } from 'react'
import { Text } from 'react-native'
import { randomUUID } from 'expo-crypto'
import { useAppDispatch } from '@/hooks/redux'
import {
  TodoState,
  addTodo,
  editTodo,
  useTodoById
} from '@/redux/features/todos/todosSlice'
import { Button, Input } from '@/components/ui'
import { Group, Stack } from '@/components/layout'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { cn } from '@/lib/utils'
import { PRIORITIES } from '@/lib/constant'

const AddTodoModal = () => {
  const { session } = useSession()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const { id } = useLocalSearchParams<{ id: string }>()

  const todoById = useTodoById(id)

  const [todo, setTodo] = useState('')

  const [priority, setPriority] = useState<TodoState['priority']>('low')

  useEffect(() => {
    if (!todoById) return
    setTodo(todoById?.text)
    setPriority(todoById?.priority)
  }, [todoById?.text])

  const handleAddTodo = useCallback(() => {
    if (todoById) {
      dispatch(editTodo({ id, text: todo }))
      navigation.goBack()
    } else {
      if (!session || !todo.length) return
      const uuid = randomUUID()
      dispatch(addTodo({ id: uuid, text: todo, username: session, priority }))
      navigation.goBack()
    }
  }, [todo, todoById, priority])

  return (
    <Stack className='p-4' gap='md'>
      <Text className='text-lg'>Priority</Text>
      <Group>
        {PRIORITIES.map((p) => (
          <Button
            key={p}
            onPress={() => setPriority(p)}
            className={cn('grow shadow-none', {
              'bg-green-400': p === 'low' && priority !== 'low',
              'bg-yellow-400': p === 'medium' && priority !== 'medium',
              'bg-red-400': p === 'high' && priority !== 'high'
            })}
          >
            <Text className='text-white'>{p}</Text>
          </Button>
        ))}
      </Group>
      <Text className='text-lg'>Task</Text>
      <Input
        className='bg-white'
        placeholder='Enter todo'
        value={todo}
        onChangeText={setTodo}
      />
      <Button className='w-full' onPress={handleAddTodo}>
        <Text className='text-white'>{todoById ? 'Edit' : 'Add'}</Text>
      </Button>
    </Stack>
  )
}

export default AddTodoModal
