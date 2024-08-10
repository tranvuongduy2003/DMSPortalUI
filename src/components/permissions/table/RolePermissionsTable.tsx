import { IFunction, IRolePermission } from '@/interfaces'
import { useRolePermissionsTable } from '.'
import { Table, notification } from 'antd'
import { permissionsService } from '@/services'

interface PermissionsTableProps {
  permissions: IRolePermission[]
  functions: IFunction[]
}

export const RolePermissionsTable = ({ permissions, functions }: PermissionsTableProps) => {
  const [columns] = useRolePermissionsTable({ onChangePermission, functions })

  async function onChangePermission(roleId: string, functionId: string, value: boolean) {
    try {
      await permissionsService.updatePermissionByRole({
        roleId,
        functionId,
        value
      })
      notification.success({ message: 'Update permission successfully!' })
    } catch (error) {
      console.log('🚀 ~ onChangePermission ~ error:', error)
      notification.error({ message: 'Failed to update permission' })
    }
  }

  return (
    <Table
      columns={columns}
      dataSource={permissions}
      pagination={false}
      scroll={{ x: 1300 }}
      locale={{
        emptyText: 'No permissions found'
      }}
      rowKey={(record) => record.roleId}
    />
  )
}
