import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import './pages/css/index.css'
import App from './App.tsx'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import Base from './Base.tsx'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Base />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }])
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
