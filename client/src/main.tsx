import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import App from './pages/App.tsx'
import SignIn from './pages/Sign-in.tsx'

import './index.css'

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
    path: '/',
    element: <App />,
  },
  { path: '/sign-in', element: <SignIn /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
