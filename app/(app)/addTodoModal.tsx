import { useSession } from '@/hooks/useSession'
import React, { useCallback, useEffect, useState } from 'react'
import { Text } from 'react-native'
import { randomUUID } from 'expo-crypto'
import { useAppDispatch } from '@/hooks/redux'
import {
  addTodo,
  editTodo,
  useTodoById
} from '@/redux/features/todos/todosSlice'
import { Button, Input } from '@/components/ui'
import { Stack } from '@/components/layout'
import { useLocalSearchParams, useNavigation } from 'expo-router'

const AddTodoModal = () => {
  const { session } = useSession()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const { id } = useLocalSearchParams<{ id: string }>()

  const todoById = useTodoById(id)

  const [todo, setTodo] = useState('')

  useEffect(() => {
    if (!todoById) return
    setTodo(todoById?.text)
  }, [todoById?.text])

  const handleAddTodo = useCallback(() => {
    if (todoById) {
      dispatch(editTodo({ id, text: todo }))
      navigation.goBack()
    } else {
      if (!session || !todo.length) return
      const uuid = randomUUID()
      dispatch(addTodo({ id: uuid, text: todo, username: session }))
      navigation.goBack()
    }
  }, [todo, todoById])

  return (
    <Stack className='p-4' gap='md'>
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
