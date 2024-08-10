import { GeneralPermissions, RolePermissions } from '@/components/permissions'
import { Space, Tabs, Typography } from 'antd'

const TAB_ITEMS = [
  {
    key: 'GENERALS',
    label: 'Generals',
    children: <GeneralPermissions />
  },
  {
    key: 'ROLES',
    label: 'Roles',
    children: <RolePermissions />
  }
]

export function PermissionsPage() {
  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={2}>Permissions Management</Typography.Title>
      <Tabs defaultActiveKey='2' items={TAB_ITEMS} type='card' className='permissions-tabs' />
    </Space>
  )
}
