import { BranchesList } from '@/components/branches'
import { BranchesTable } from '@/components/branches/BranchesTable'
import { CreateBranchModal } from '@/components/branches/CreateBranchModal'
import { PaginationFilter } from '@/components/common'
import { EPageOrder } from '@/enums/pagination.enum'
import { IBranch, IPagination, IPaginationFilter, IPitchGroup } from '@/interfaces'
import { Space, Typography, Button, Pagination } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface IBranchesLayoutProps {
  pitchGroup?: IPitchGroup
  type?: 'card' | 'table'
  fetchBranches: (
    filter: IPaginationFilter,
    setPagination: Dispatch<SetStateAction<IPagination<IBranch> | undefined>>
  ) => Promise<void>
}

export function BranchesLayout({ pitchGroup, type = 'card', fetchBranches }: IBranchesLayoutProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [branchesPaginataion, setBranchesPagination] = useState<IPagination<IBranch>>()
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
    fetchBranches(filter, setBranchesPagination)
  }, [fetchBranches, filter])

  return (
    <>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        {pitchGroup ? <Typography.Title level={2}>Cụm sân {pitchGroup?.name}</Typography.Title> : <></>}
        <div className='flex items-center justify-between'>
          <Typography.Title level={2}>Quản lý chi nhánh</Typography.Title>
          <Button type='primary' onClick={() => setIsCreateModalOpen(true)}>
            Tạo chi nhánh mới
          </Button>
        </div>
        <PaginationFilter
          orderByFields={[
            { value: 'numberOfPitches', label: 'Số lượng sân' },
            { value: 'createdAt', label: 'Ngày tạo' }
          ]}
          searchByFields={[
            { value: 'name', label: 'Tên chi nhánh' },
            { value: 'address', label: 'Địa chỉ' }
          ]}
          setFilter={setFilter}
        />
        {type === 'card' ? (
          <BranchesList items={branchesPaginataion?.items ?? []} />
        ) : type === 'table' ? (
          <BranchesTable branches={branchesPaginataion?.items ?? []} />
        ) : (
          <></>
        )}
        <Pagination
          className='flex justify-center'
          defaultCurrent={1}
          pageSize={filter.size}
          current={filter.page}
          onChange={(page) => setFilter({ ...filter, page })}
          total={branchesPaginataion?.metadata.totalCount}
        />
      </Space>
      {isCreateModalOpen && <CreateBranchModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} />}
    </>
  )
}
