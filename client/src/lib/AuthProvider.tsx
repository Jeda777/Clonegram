import React, { createContext, useState } from 'react'

const authContext = createContext({})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState({})

  return <authContext.Provider value={{ auth, setAuth }}>{children}</authContext.Provider>
}

export default authContext
