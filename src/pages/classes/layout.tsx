import { ClassesList } from '@/components/classes'
import { ClassesTable } from '@/components/classes/ClassesTable'
import { CreateClassModal } from '@/components/classes/CreateClassModal'
import { PaginationFilter } from '@/components/common'
import { EPageOrder } from '@/enums/pagination.enum'
import { IClass, IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { Space, Typography, Button, Pagination } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface IClassesLayoutProps {
  pitch?: IPitch
  type?: 'card' | 'table'
  fetchClasses: (
    filter: IPaginationFilter,
    setPagination: Dispatch<SetStateAction<IPagination<IClass> | undefined>>
  ) => Promise<void>
}

export function ClassesLayout({ pitch, type = 'card', fetchClasses }: IClassesLayoutProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [classesPaginataion, setClassesPagination] = useState<IPagination<IClass>>()
  const [filter, setFilter] = useState<IPaginationFilter>({
    order: EPageOrder.ASC,
    orderBy: '',
    page: 1,
    searchBy: '',
    size: 12,
    takeAll: false,
    searchValue: ''
  })

  useEffect(() => {
    fetchClasses(filter, setClassesPagination)
  }, [fetchClasses, filter])

  return (
    <>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        {pitch ? <Typography.Title level={2}>Sân {pitch?.name}</Typography.Title> : <></>}
        <div className='flex items-center justify-between'>
          <Typography.Title level={2}>Quản lý lớp</Typography.Title>
          <Button type='primary' onClick={() => setIsCreateModalOpen(true)}>
            Tạo lớp mới
          </Button>
        </div>
        <PaginationFilter
          orderByFields={[
            { value: 'numberOfStudents', label: 'Số lượng học viên' },
            { value: 'createdAt', label: 'Ngày tạo' }
          ]}
          searchByFields={[{ value: 'name', label: 'Tên lớp' }]}
          setFilter={setFilter}
        />
        {type === 'card' ? (
          <ClassesList items={classesPaginataion?.items ?? []} />
        ) : type === 'table' ? (
          <ClassesTable classes={classesPaginataion?.items ?? []} />
        ) : (
          <></>
        )}
        <Pagination
          className='flex justify-center'
          defaultCurrent={1}
          pageSize={filter.size}
          current={filter.page}
          onChange={(page) => setFilter({ ...filter, page })}
          total={classesPaginataion?.metadata.totalCount}
        />
      </Space>
      {isCreateModalOpen && <CreateClassModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} />}
    </>
  )
}
