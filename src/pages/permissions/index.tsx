import { GeneralPermissions, RolePermissions } from '@/components/permissions'
import { Space, Tabs, Typography } from 'antd'

const TAB_ITEMS = [
  {
    key: 'GENERALS',
    label: 'Chung',
    children: <GeneralPermissions />
  },
  {
    key: 'ROLES',
    label: 'Vai trò',
    children: <RolePermissions />
  }
]

export function PermissionsPage() {
  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={2}>Quản lý quyền</Typography.Title>
      <Tabs defaultActiveKey='2' items={TAB_ITEMS} type='card' className='permissions-tabs' />
    </Space>
  )
}
