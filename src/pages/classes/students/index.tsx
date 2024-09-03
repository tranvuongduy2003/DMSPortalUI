import { PaginationFilter } from '@/components/common'
import { StudentsList } from '@/components/students'
import { EPageOrder } from '@/enums/pagination.enum'
import { IClass, IPagination, IPaginationFilter, IStudent } from '@/interfaces'
import { classesService } from '@/services'
import { Button, notification, Pagination, Space, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export function StudentsByClassPage() {
  const { classId } = useParams()

  const [currentClass, setCurrentClass] = useState<IClass>()
  const [studentsPaginataion, setStudentsPagination] = useState<IPagination<IStudent>>()
  const [filter, setFilter] = useState<IPaginationFilter>({
    order: EPageOrder.ASC,
    orderBy: '',
    page: 1,
    searchBy: '',
    size: 12,
    takeAll: false,
    searchValue: ''
  })

  const handleFetchStudents = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchStudents.current = async () => {
      try {
        await Promise.all([
          classesService.getClassById(classId!).then(({ data }) => {
            setCurrentClass(data)
          }),
          classesService.getStudentsByClassId(classId!, filter).then(({ data }) => {
            setStudentsPagination(data)
          })
        ])
      } catch (error: any) {
        notification.error({ message: error?.message })
      }
    }
    handleFetchStudents.current()
  }, [classId, filter])

  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={2}>Lớp {currentClass?.name}</Typography.Title>
      <div className='flex items-center justify-between'>
        <Typography.Title level={2}>Quản lý học viên</Typography.Title>
        <Button type='primary'>Thêm học viên</Button>
      </div>
      <PaginationFilter setFilter={setFilter} />
      <StudentsList items={studentsPaginataion?.items ?? []} />
      <Pagination
        className='flex justify-center'
        defaultCurrent={1}
        pageSize={filter.size}
        current={filter.page}
        onChange={(page) => setFilter({ ...filter, page })}
        total={studentsPaginataion?.metadata.totalCount}
      />
    </Space>
  )
}
