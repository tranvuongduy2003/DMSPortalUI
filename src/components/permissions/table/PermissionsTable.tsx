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
      locale={{
        emptyText: 'No permissions found'
      }}
      rowKey={(record) => record.id}
    />
  )
}

export default PermissionsTable
