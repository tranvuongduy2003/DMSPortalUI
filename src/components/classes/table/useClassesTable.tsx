import { IClass } from '@/interfaces'
import { UpdateClassRequest } from '@/types'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnsType } from 'antd/es/table'

interface ClassesTableHookProps {
  onChangeClass: (classId: string, request: UpdateClassRequest) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useClassesTable({ onChangeClass }: ClassesTableHookProps) {
  const columns: ColumnsType<IClass | AnyObject> = [
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
      colSpan: 1
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      colSpan: 1
    },
    {
      title: 'Số lượng học viên',
      dataIndex: 'numberOfStudents',
      key: 'numberOfStudents',
      colSpan: 1
    }
  ]

  return [columns]
}
