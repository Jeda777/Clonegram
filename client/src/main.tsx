import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { Provider } from 'react-redux'

import App from './pages/App.tsx'
import SignIn from './pages/Sign-in.tsx'
import ProtectedRoutes from './components/ProtectedRoutes.tsx'
import PersistLogin from './components/PersistLogin.tsx'
import Layout from './components/Layout.tsx'
import { store } from './app/store.ts'

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
    element: <Layout />,
    children: [
      {
        element: <PersistLogin />,
        children: [
          {
            element: <ProtectedRoutes />,
            children: [{ path: '/', element: <App /> }],
          },
        ],
      },
    ],
  },

  { path: '/sign-in', element: <SignIn /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
