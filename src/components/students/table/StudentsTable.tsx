import { IStudent } from '@/interfaces'
import { Table } from 'antd'
import { useStudentsTable } from '.'

interface StudentsTableProps {
  students: IStudent[]
}

export const StudentsTable = ({ students }: StudentsTableProps) => {
  const [columns] = useStudentsTable()

  return (
    <Table
      columns={columns}
      dataSource={students}
      pagination={false}
      locale={{
        emptyText: 'Không tìm thấy bất kì lớp nào'
      }}
      rowKey={(record) => record.id}
    />
  )
}
