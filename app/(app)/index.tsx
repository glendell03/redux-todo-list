import { Button } from '@/components/ui'
import React from 'react'
import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'
import ListItem from '@/components/listItem'
import { useTodos } from '@/redux/features/todos/todosSlice'
import { useSession } from '@/hooks/useSession'
import { router } from 'expo-router'

const AppPage = () => {
  const { session } = useSession()
  const insets = useSafeAreaInsets()

  const todos = useTodos(session)
  const completedTodos = useTodos(session, true)

  return (
    <View
      className='flex-1 px-4 pt-4'
      style={{
        paddingBottom: insets.bottom
      }}
    >
      <Text className='text-lg mb-4'>
        Tasks: {completedTodos.length}/{todos.length}
      </Text>
      <FlashList
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={todos}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            id={item.id}
            checked={item.completed}
            priority={item.priority}
          >
            {item.text}
          </ListItem>
        )}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={200}
        className='mb-4'
      />
      <Button onPress={() => router.navigate('/(app)/addTodoModal')}>
        <Text className='text-white'>Add todo</Text>
      </Button>
    </View>
  )
}

export default AppPage
