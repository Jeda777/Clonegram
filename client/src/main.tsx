import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

import App from './pages/App.tsx'
import SignIn from './pages/Sign-in.tsx'
import { AuthProvider } from './lib/AuthProvider.tsx'
import ProtectedRoutes from './components/ProtectedRoutes.tsx'
import PersistLogin from './components/PersistLogin.tsx'

import './index.css'

if (import.meta.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const themeObject = {
  resetCSS: true,
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    text: {
      secondary: '#c7c7ca',
    },
  },
}

const theme = extendTheme(themeObject)

const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [{ path: '/', element: <App /> }],
      },
    ],
  },

  { path: '/sign-in', element: <SignIn /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>,
)
