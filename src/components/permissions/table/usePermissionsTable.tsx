import { COMMAND } from '@/constants'
import { IPermission } from '@/interfaces'
import { Checkbox } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnsType } from 'antd/es/table'

interface PermissionsTableHookProps {
  onChangePermission: (functionId: string, commandId: string, value: boolean) => void
}

export function usePermissionsTable({ onChangePermission }: PermissionsTableHookProps) {
  const columns: ColumnsType<IPermission | AnyObject> = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      colSpan: 1,
      render: (value: string) => <span className='inline-block h6 !text-sm max-w-[155px]'>{value}</span>
    },
    {
      title: 'Xem',
      dataIndex: 'hasView',
      key: 'hasView',
      align: 'center',
      render: (value: boolean, permission) => (
        <Checkbox
          checked={value}
          onChange={(event) => onChangePermission(permission.id, COMMAND.VIEW, event.target.checked)}
        />
      )
    },
    {
      title: 'Tạo',
      dataIndex: 'hasCreate',
      key: 'hasCreate',
      align: 'center',
      render: (value: boolean, permission) => (
        <Checkbox
          checked={value}
          onChange={(event) => onChangePermission(permission.id, COMMAND.CREATE, event.target.checked)}
        />
      )
    },
    {
      title: 'Cập nhật',
      dataIndex: 'hasUpdate',
      key: 'hasUpdate',
      align: 'center',
      render: (value: boolean, permission) => (
        <Checkbox
          checked={value}
          onChange={(event) => onChangePermission(permission.id, COMMAND.UPDATE, event.target.checked)}
        />
      )
    },
    {
      title: 'Xóa',
      dataIndex: 'hasDelete',
      key: 'hasDelete',
      align: 'center',
      render: (value: boolean, permission) => (
        <Checkbox
          checked={value}
          onChange={(event) => onChangePermission(permission.id, COMMAND.DELETE, event.target.checked)}
        />
      )
    }
  ]

  return [columns]
}
