import React, { createContext, useState } from 'react'
import { authObject } from '../../types'

type authContextProps = {
  auth: authObject | {}
  setAuth: ({}: authObject | {}) => void
}

const initialValue = {
  auth: {},
  setAuth: () => {},
}

const authContext = createContext<authContextProps>(initialValue)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(initialValue.auth)

  return <authContext.Provider value={{ auth, setAuth }}>{children}</authContext.Provider>
}

export default authContext
