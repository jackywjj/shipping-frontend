import type {MenuProps} from 'antd'
import {Menu} from 'antd'
import './style.less'
import {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'

const MenuComponent = () => {
    type MenuItems = Required<MenuProps>['items'][number];
    const items: MenuItems[] = [
        {
            label: '仪表盘',
            key: '/dashboard'
        }, {
            label: '航运调度',
            key: '/schedules',
        }, {
            label: '船只管理',
            key: '/ships',
        }, {
            label: '港口管理',
            key: '/ports',
        }, {
            label: '航线管理',
            key: '/routes',
        }, {
            label: '航运订单',
            key: 'shipping-orders',
            children: [
                {label: '订单管理', key: '/orders'},
                {label: '客户下单', key: '/orders/create'}
            ]
        }, {
            label: '客户管理',
            key: 'customer-management',
            children: [
                {label: '客户信息', key: '/customers'},
                {label: '充值中心', key: '/recharge'},
                {label: '客户台账', key: '/transactions'}
            ]
        },
        {
            label: '系统设置',
            key: 'setting',
            children: [
                {label: '用户管理', key: '/users'},
            ]
        }
    ]
    const location = useLocation()
    const navigate = useNavigate()
    const [openKeys, setOpenKeys] = useState<string[]>([])

    useEffect(() => {
        // 详情页选中列表页菜单
        const index = location.pathname.lastIndexOf('/detail');
        if (index !== -1) {
            //const path = location.pathname.slice(0, index)
            //setSelectedKeys([path])
            return
        }
        //setSelectedKeys([location.pathname])
    }, [location])
    const onSelectMenu = ({key}: any) => {
        navigate(key)
    }

    interface LevelKeysProps {
        key?: string;
        children?: LevelKeysProps[];
    }

    const getLevelKeys = (items1: LevelKeysProps[]) => {
        const key: Record<string, number> = {};
        const func = (items2: LevelKeysProps[], level = 1) => {
            items2.forEach((item) => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.children) {
                    func(item.children, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };

    const levelKeys = getLevelKeys(items as LevelKeysProps[]);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const currentOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        // open
        if (currentOpenKey !== undefined) {
            const repeatIndex = keys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setOpenKeys(
                keys
                    .filter((_, index) => index !== repeatIndex)
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            // close
            setOpenKeys(keys);
        }
    };

    return (
        <div className='menuComponent'>
            <Menu
                items={items}
                mode='inline'
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onSelect={onSelectMenu}/>
        </div>
    )
}

export default MenuComponent
