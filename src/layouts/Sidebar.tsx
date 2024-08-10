import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Key, ReactNode, useState } from 'react'
import { MdPrivacyTip } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

export interface ISidebarProps {}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: ReactNode, key: Key, icon?: ReactNode, onClick?: () => void, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick
  } as MenuItem
}

const items: MenuItem[] = [
  // getItem("Dashboard", "dashboard", <MdDashboard />),
  getItem('Permissions', 'permissions', <MdPrivacyTip />)
]

export function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu
        theme='dark'
        defaultSelectedKeys={['dashboard']}
        selectedKeys={[pathname.split('/')[1]]}
        mode='inline'
        items={items}
        onClick={(info) => navigate(`/${info.key}`)}
      />
    </Sider>
  )
}
