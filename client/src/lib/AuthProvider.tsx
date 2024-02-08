import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
import { authObject } from '../../types'

type authContextProps = {
  auth: authObject
  setAuth: Dispatch<SetStateAction<authObject>>
  persist: boolean
  setPersist: Dispatch<SetStateAction<boolean>>
}

const initialValue = {
  auth: {
    accessToken: '',
    email: '',
    id: '',
    imageUrl: '',
    username: '',
  },
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
}

const authContext = createContext<authContextProps>(initialValue)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(initialValue.auth)
  const persistData = localStorage.getItem('persist')
  const initialPersistState = persistData ? (JSON.parse(persistData) as boolean) : false
  const [persist, setPersist] = useState(initialPersistState)

  return <authContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</authContext.Provider>
}

export default authContext
