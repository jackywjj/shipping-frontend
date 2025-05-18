import {createHashRouter} from 'react-router-dom'
import LoginPage from '../pages/login'
import LayoutComponent from '../layout'
import UserPage from '../pages/users'
import DashboardPage from '../pages/dashboard'

const router = createHashRouter([
    {
        path: '/',
        element: <LoginPage/>
    },
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/',
        element: <LayoutComponent/>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage/>
            },
            {
                path: '/users',
                element: <UserPage/>
            },
            {
                path: '/schedules',
                element: <UserPage/>
            },
            {
                path: '/ships',
                element: <UserPage/>
            },
            {
                path: '/ports',
                element: <UserPage/>
            },
            {
                path: '/routes',
                element: <UserPage/>
            },
            {
                path: '/orders',
                element: <UserPage/>
            },
            {
                path: '/customers',
                element: <UserPage/>
            },
            {
                path: '/recharge',
                element: <UserPage/>
            },
            {
                path: '/transactions',
                element: <UserPage/>
            }
        ]
    }
])

export default router
