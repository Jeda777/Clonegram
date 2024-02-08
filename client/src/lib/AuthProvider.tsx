import React, { Dispatch, SetStateAction, createContext, useState } from 'react'
import { authObject } from '../../types'

type authContextProps = {
  auth: authObject
  setAuth: Dispatch<SetStateAction<authObject>>
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
}

const authContext = createContext<authContextProps>(initialValue)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(initialValue.auth)

  return <authContext.Provider value={{ auth, setAuth }}>{children}</authContext.Provider>
}

export default authContext
