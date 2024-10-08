import { PaginationFilter } from '@/components/common'
import { PitchesList } from '@/components/pitches'
import { CreatePitchModal } from '@/components/pitches/CreatePitchModal'
import { PitchesTable } from '@/components/pitches/PitchesTable'
import { EPageOrder } from '@/enums/pagination.enum'
import { IBranch, IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { Button, Pagination, Space, Typography } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface IPitchesLayoutProps {
  branch?: IBranch
  type?: 'card' | 'table'
  fetchPitches: (
    filter: IPaginationFilter,
    setPagination: Dispatch<SetStateAction<IPagination<IPitch> | undefined>>
  ) => Promise<void>
}

export function PitchesLayout({ branch, type = 'card', fetchPitches }: IPitchesLayoutProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [pitchesPaginataion, setPitchesPagination] = useState<IPagination<IPitch>>()
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
    fetchPitches(filter, setPitchesPagination)
  }, [fetchPitches, filter])

  return (
    <>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        {branch ? <Typography.Title level={2}>Chi nhánh {branch.name}</Typography.Title> : <></>}
        <div className='flex items-center justify-between'>
          <Typography.Title level={2}>Quản lý sân</Typography.Title>
          <Button type='primary' onClick={() => setIsCreateModalOpen(true)}>
            Tạo sân
          </Button>
        </div>
        <PaginationFilter setFilter={setFilter} />
        {type === 'card' ? (
          <PitchesList items={pitchesPaginataion?.items ?? []} />
        ) : type === 'table' ? (
          <PitchesTable pitches={pitchesPaginataion?.items ?? []} />
        ) : (
          <></>
        )}
        <Pagination
          className='flex justify-center'
          defaultCurrent={1}
          pageSize={filter.size}
          current={filter.page}
          onChange={(page) => setFilter({ ...filter, page })}
          total={pitchesPaginataion?.metadata.totalCount}
        />
      </Space>
      {isCreateModalOpen && <CreatePitchModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} />}
    </>
  )
}
