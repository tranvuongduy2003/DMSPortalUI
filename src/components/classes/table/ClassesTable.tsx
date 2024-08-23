import { IClass } from '@/interfaces'
import { classesService } from '@/services'
import { Table, notification } from 'antd'
import { useClassesTable } from '.'
import { UpdateClassRequest } from '@/types'

interface ClassesTableProps {
  classes: IClass[]
}

export const ClassesTable = ({ classes }: ClassesTableProps) => {
  const [columns] = useClassesTable({ onChangeClass })

  async function onChangeClass(classId: string, request: UpdateClassRequest) {
    try {
      await classesService.updateClass(classId, request)
      notification.success({ message: 'Cập nhật lớp thành công!' })
    } catch (error: any) {
      notification.error({ message: error.message })
    }
  }

  return (
    <Table
      columns={columns}
      dataSource={classes}
      pagination={false}
      locale={{
        emptyText: 'Không tìm thấy bất kì lớp nào'
      }}
      rowKey={(record) => record.id}
    />
  )
}
