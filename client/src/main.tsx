import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './pages/App.tsx'

import './index.css'
import SignIn from './pages/Sign-in.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: '/sign-in', element: <SignIn /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
