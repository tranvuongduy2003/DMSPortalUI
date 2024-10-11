import { PaginationFilter } from '@/components/common/PaginationFilter'
import { StudentsList } from '@/components/students'
import { EPageOrder } from '@/enums/pagination.enum'
import { IPagination, IPaginationFilter, IStudent } from '@/interfaces'
import { studentsService } from '@/services'
import { useAppStore } from '@/stores'
import { Button, notification, Pagination, Space, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function StudentsPage() {
  const navigate = useNavigate()

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

  const setLoading = useAppStore((state) => state.setIsLoading)

  const handleFetchStudents = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchStudents.current = async () => {
      setLoading(true)
      try {
        const { data } = await studentsService.getStudents(filter)
        setStudentsPagination(data)
      } catch (error: any) {
        notification.error({ message: error?.message })
      } finally {
        setLoading(false)
      }
    }
    handleFetchStudents.current()
  }, [filter])

  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <div className='flex items-center justify-between'>
        <Typography.Title level={2}>Quản lý học viên</Typography.Title>
        <Button type='primary' onClick={() => navigate('create')}>
          Đăng ký học viên mới
        </Button>
      </div>
      <PaginationFilter
        orderByFields={[
          { value: 'height', label: 'Chiều cao' },
          { value: 'weight', label: 'Cân nặng' },
          { value: 'dob', label: 'Ngày sinh' },
          { value: 'numberOfClasses', label: 'Số lớp đã học' },
          { value: 'createdAt', label: 'Ngày tạo' }
        ]}
        searchByFields={[
          { value: 'fullName', label: 'Họ tên' },
          { value: 'address', label: 'Địa chỉ' }
        ]}
        setFilter={setFilter}
      />
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
