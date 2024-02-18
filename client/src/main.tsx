import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'

import ProtectedRoutes from './components/ProtectedRoutes.tsx'
import PersistLogin from './components/PersistLogin.tsx'
import Layout from './components/Layout.tsx'
import { store } from './app/store.ts'

import UserPage from './pages/UserPage.tsx'
import PostPage from './pages/PostPage.tsx'
import SignInPage from './pages/SignInPage.tsx'
import HomePage from './pages/HomePage.tsx'

import './index.css'
import ConversationsPage from './pages/ConversationsPage.tsx'
import SingleConversationPage from './pages/SingleConversationPage.tsx'

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
        element: <Layout />,
        children: [
          {
            element: <ProtectedRoutes />,
            children: [
              { path: '', element: <HomePage /> },
              { path: '/user/:username', element: <UserPage /> },
              { path: '/post/:postId', element: <PostPage /> },
              {
                path: '/conversations',
                element: <ConversationsPage />,
                children: [
                  {
                    path: ':conversationId',
                    element: <SingleConversationPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  { path: '/sign-in', element: <SignInPage /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
