import { PaginationFilter } from '@/components/common'
import { PitchGroupsList } from '@/components/pitch-groups'
import { CreatePitchGroupModal } from '@/components/pitch-groups/CreatePitchGroupModal'
import { PitchGroupsTable } from '@/components/pitch-groups/PitchGroupsTable'
import { EPageOrder } from '@/enums/pagination.enum'
import { IPagination, IPaginationFilter, IPitchGroup } from '@/interfaces'
import { Button, Pagination, Space, Typography } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IPitchGroupsLayoutProps {
  type?: 'table' | 'card'
  fetchPitchGroups: (
    filter: IPaginationFilter,
    setPagination: Dispatch<SetStateAction<IPagination<IPitchGroup> | undefined>>
  ) => Promise<void>
}

export function PitchGroupsLayout({ type = 'card', fetchPitchGroups }: IPitchGroupsLayoutProps) {
  const [pitchGroupsPaginataion, setPitchGroupsPagination] = useState<IPagination<IPitchGroup>>()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
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
    fetchPitchGroups(filter, setPitchGroupsPagination)
  }, [fetchPitchGroups, filter])

  return (
    <>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        <div className='flex items-center justify-between'>
          <Typography.Title level={2}>Quản lý cụm sân</Typography.Title>
          <Button type='primary' onClick={() => setIsCreateModalOpen(true)}>
            Tạo cụm sân mới
          </Button>
        </div>
        <PaginationFilter
          orderByFields={[
            { value: 'numberOfBranches', label: 'Số lượng chi nhánh' },
            { value: 'createdAt', label: 'Ngày tạo' }
          ]}
          searchByFields={[{ value: 'name', label: 'Tên cụm sân' }]}
          setFilter={setFilter}
        />
        {type === 'card' ? (
          <PitchGroupsList items={pitchGroupsPaginataion?.items ?? []} />
        ) : type === 'table' ? (
          <PitchGroupsTable pitchGroups={pitchGroupsPaginataion?.items ?? []} />
        ) : (
          <></>
        )}
        <Pagination
          className='flex justify-center'
          defaultCurrent={1}
          pageSize={filter.size}
          current={filter.page}
          onChange={(page) => setFilter({ ...filter, page })}
          total={pitchGroupsPaginataion?.metadata.totalCount}
        />
      </Space>
      {isCreateModalOpen && (
        <CreatePitchGroupModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} />
      )}
    </>
  )
}
