import {createHashRouter} from 'react-router-dom'
import LoginPage from '../pages/login'
import LayoutComponent from '../layout'
import UserPage from '../pages/users'
import DashboardPage from '../pages/dashboard'
import ShipsPage from '../pages/ships'
import PortsPage from "../pages/ports"
import RoutesPage from "../pages/routes"
import OrdersPage from "../pages/orders";
import OrderDetailPage from "../pages/orders/detail";
import AddOrderPage from "../pages/orders/addOrder";
import ContainersPage from "../pages/containers";
import CustomersPage from "../pages/customers";
import SchedulesPage from "../pages/schedules";

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
                element: <SchedulesPage/>
            },
            {
                // 船只管理
                path: '/ships',
                element: <ShipsPage/>
            },
            {
                // 港口管理
                path: '/ports',
                element: <PortsPage/>
            },
            {
                // 航线管理
                path: '/routes',
                element: <RoutesPage/>
            },
            {
                // 订单管理
                path: '/orders',
                element: <OrdersPage/>
            },
            {
                // 集装箱管理
                path: '/containers',
                element: <ContainersPage/>
            },
            {
                // 订单详情
                path: '/orders/detail',
                element: <OrderDetailPage/>
            },
            {
                // 新增订单
                path: '/orders/create',
                element: <AddOrderPage/>
            },
            {
                // 客户管理
                path: '/customers',
                element: <CustomersPage/>
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
