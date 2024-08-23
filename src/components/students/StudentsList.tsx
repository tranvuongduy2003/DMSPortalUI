import { IStudent } from '@/interfaces'
import { Empty } from 'antd'
import { StudentsTable } from './table'

interface IStudentsList {
  items: IStudent[]
}

export function StudentsList({ items }: IStudentsList) {
  return (
    <>
      {items && items.length > 0 ? (
        <StudentsTable students={items} />
      ) : (
        <div className='flex items-center justify-center w-full'>
          <Empty description='Không tìm thấy học viên nào!' />
        </div>
      )}
    </>
  )
}
