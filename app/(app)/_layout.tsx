import { Redirect, Stack } from 'expo-router'

// TODO: Create a useSession hook
import { useSession } from '@/hooks/useSession'
import { Pressable, Text } from 'react-native'
import { useCallback } from 'react'

export default function AppLayout() {
  const { session, signOut } = useSession()

  // You can keep the splash screen open, or render a loading screen like we do here.
  // if (isLoading) {
  //   return <Text>Loading...</Text>
  // }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href='/sign-in' />
  }

  const handleSignOut = useCallback(() => signOut(), [])

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerRight: () => (
            <Pressable onPress={handleSignOut}>
              <Text>Sign out</Text>
            </Pressable>
          ),
          title: `${session.charAt(0).toUpperCase() + session.slice(1) + "'s"} Todo List`
        }}
      />
      <Stack.Screen
        name='addTodoModal'
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
          title: 'Todo'
        }}
      />
    </Stack>
  )
}
