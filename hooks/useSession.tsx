import React from 'react'
import { useStorageState } from './useStorageState'

export interface Session {
  username: string
}

const AuthContext = React.createContext<{
  signIn: (props: Session) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
})

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext)
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />')
    }
  }

  return value
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session')

  const signIn = React.useCallback(
    ({ username }: Session) => {
      setSession(username)
    },
    [setSession]
  )

  const signOut = React.useCallback(() => {
    setSession(null)
  }, [setSession])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
