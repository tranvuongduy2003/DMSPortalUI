import {
  ADMINISTRATION_ROUTE,
  BRANCHES_ROUTE,
  CLASSES_ROUTE,
  PERMISSIONS_ROUTE,
  PITCH_GROUPS_ROUTE,
  PITCHES_ROUTE,
  STUDENTS_ROUTE,
  USERS_ROUTE
} from '@/constants/routes'
import { Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Key, ReactNode, useState } from 'react'
import { FaHouseFlag } from 'react-icons/fa6'
import { GiMeepleGroup } from 'react-icons/gi'
import { HiUserGroup } from 'react-icons/hi'
import { MdClass, MdManageAccounts, MdPrivacyTip } from 'react-icons/md'
import { PiStudentFill } from 'react-icons/pi'
import { RiGitBranchFill } from 'react-icons/ri'
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
  getItem('Hành chính', ADMINISTRATION_ROUTE, <MdManageAccounts />),
  getItem('Cụm sân', PITCH_GROUPS_ROUTE, <GiMeepleGroup />),
  getItem('Chi nhánh', BRANCHES_ROUTE, <RiGitBranchFill />),
  getItem('Sân', PITCHES_ROUTE, <FaHouseFlag />),
  getItem('Lớp', CLASSES_ROUTE, <MdClass />),
  getItem('Học viên', STUDENTS_ROUTE, <PiStudentFill />),
  getItem('Nhân viên', USERS_ROUTE, <HiUserGroup />),
  getItem('Quyền', PERMISSIONS_ROUTE, <MdPrivacyTip />)
]

export function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu
        theme='dark'
        defaultSelectedKeys={[PITCH_GROUPS_ROUTE]}
        selectedKeys={[pathname.split('/')[1]]}
        mode='inline'
        items={items}
        onClick={(info) => navigate(`/${info.key}`)}
      />
    </Sider>
  )
}
