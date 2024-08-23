import { IPermission } from '@/interfaces'
import { Table, notification } from 'antd'
import { usePermissionsTable } from '.'
import { permissionsService } from '@/services'

interface PermissionsTableProps {
  permissions: IPermission[]
}

const PermissionsTable = ({ permissions }: PermissionsTableProps) => {
  const [columns] = usePermissionsTable({ onChangePermission })

  async function onChangePermission(functionId: string, commandId: string, value: boolean) {
    try {
      await permissionsService.updatePermission({
        functionId,
        commandId,
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
      locale={{
        emptyText: 'Không tìm thấy bất kì quyền nào'
      }}
      rowKey={(record) => record.id}
    />
  )
}

export default PermissionsTable
