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
      notification.success({ message: 'Cập nhật quyền thành công!' })
    } catch (error: any) {
      notification.error({ message: error.message })
    }
  }

  return (
    <Table
      columns={columns}
      dataSource={permissions}
      pagination={false}
      scroll={{ x: 1300 }}
      locale={{
        emptyText: 'Không tìm thấy bất kì quyền nào'
      }}
      rowKey={(record) => record.roleId}
    />
  )
}
