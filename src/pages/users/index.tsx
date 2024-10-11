import { PaginationFilter } from '@/components/common'
import { UsersList } from '@/components/users'
import { EPageOrder } from '@/enums/pagination.enum'
import { IPagination, IPaginationFilter, IUser } from '@/interfaces'
import { usersService } from '@/services'
import { useAppStore } from '@/stores'
import { Button, notification, Pagination, Space, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UsersPage() {
  const navigate = useNavigate()

  const [usersPaginataion, setUsersPagination] = useState<IPagination<IUser>>()
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

  const handleFetchUsers = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchUsers.current = async () => {
      setLoading(true)
      try {
        const { data } = await usersService.getUsers(filter)
        setUsersPagination(data)
      } catch (error: any) {
        notification.error({ message: error?.message })
      } finally {
        setLoading(false)
      }
    }
    handleFetchUsers.current()
  }, [filter])

  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <div className='flex items-center justify-between'>
        <Typography.Title level={2}>Quản lý người dùng</Typography.Title>
        <Button type='primary' onClick={() => navigate('create')}>
          Tạo người dùng mới
        </Button>
      </div>
      <PaginationFilter
        orderByFields={[
          { value: 'dob', label: 'Ngày sinh' },
          { value: 'numberOfClasses', label: 'Ngày tạo' }
        ]}
        searchByFields={[
          { value: 'userName', label: 'Tên người dung' },
          { value: 'fullName', label: 'Họ tên' },
          { value: 'email', label: 'Email' },
          { value: 'phoneNumber', label: 'Số điện thoại' },
          { value: 'address', label: 'Địa chỉ' }
        ]}
        setFilter={setFilter}
      />
      <UsersList items={usersPaginataion?.items ?? []} />
      <Pagination
        className='flex justify-center'
        defaultCurrent={1}
        pageSize={filter.size}
        current={filter.page}
        onChange={(page) => setFilter({ ...filter, page })}
        total={usersPaginataion?.metadata.totalCount}
      />
    </Space>
  )
}
