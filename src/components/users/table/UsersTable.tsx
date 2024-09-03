import { IUser } from '@/interfaces'
import { Table } from 'antd'
import { useUsersTable } from '.'

interface UsersTableProps {
  users: IUser[]
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const [columns] = useUsersTable()

  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={false}
      locale={{
        emptyText: 'Không tìm thấy bất kì người dùng nào'
      }}
      rowKey={(record) => record.id}
    />
  )
}
