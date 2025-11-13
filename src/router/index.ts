import { createBrowserRouter } from 'react-router'
import AppLayout from '../layouts/AppLayout'
import HomePage from '../pages/HomePage'
import AuthLayout from '../layouts/AuthLayout'
import LoginPage from '../pages/login/LoginPage'
import MonitorLayout from '../layouts/MonitorLayout'
import SamplePage from '../pages/monitor/SamplePage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
  {
    path: '/login',
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: LoginPage,
      },
    ],
  },
  {
    path: '/monitor',
    Component: MonitorLayout,
    children: [
      {
        path: ':type',
        Component: SamplePage,
      },
    ],
  },
])

export default router
