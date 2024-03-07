import { Stack } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { useSession } from '@/hooks/useSession'
import { Redirect } from 'expo-router'
import { useCallback, useState } from 'react'
import { Text } from 'react-native'

const SignInPage = () => {
  const { signIn, session, isLoading } = useSession()
  const [username, setUsername] = useState('')

  const handleCreateAccount = useCallback(
    () => signIn({ username }),
    [username]
  )

  if (session) {
    return <Redirect href='/(app)' />
  }

  return (
    <Stack justify='center' align='center' className='mx-4' gap='lg'>
      <Text className='text-3xl font-bold'>Todo List</Text>
      <Input
        placeholder='Enter Username'
        onChangeText={setUsername}
        value={username}
      />
      <Button onPress={handleCreateAccount} className='w-full'>
        <Text className='text-white'>
          {isLoading ? 'Loading...' : 'Sign in'}
        </Text>
      </Button>
    </Stack>
  )
}

export default SignInPage
