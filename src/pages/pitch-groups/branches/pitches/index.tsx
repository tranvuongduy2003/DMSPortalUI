import { PaginationFilter } from '@/components/common'
import { PitchesList } from '@/components/pitches'
import { EPageOrder } from '@/enums/pagination.enum'
import { IBranch, IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { branchesService } from '@/services'
import { Button, notification, Pagination, Space, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export function PitchesByBranchPage() {
  const { branchId } = useParams()

  const [currentBranch, setCurrentBranch] = useState<IBranch>()
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

  const handleFetchPitches = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchPitches.current = async () => {
      try {
        await Promise.all([
          branchesService.getBranchById(branchId!).then(({ data }) => {
            setCurrentBranch(data)
          }),
          branchesService.getPitchesByBranchId(branchId!, filter).then(({ data }) => {
            setPitchesPagination(data)
          })
        ])
      } catch (error: any) {
        notification.error({ message: error?.message })
      }
    }
    handleFetchPitches.current()
  }, [branchId, filter])

  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={2}>Chi nhánh {currentBranch?.name}</Typography.Title>
      <div className='flex items-center justify-between'>
        <Typography.Title level={2}>Quản lý sân</Typography.Title>
        <Button type='primary'>Tạo sân</Button>
      </div>
      <PaginationFilter setFilter={setFilter} />
      <PitchesList items={pitchesPaginataion?.items ?? []} />
      <Pagination
        className='flex justify-center'
        defaultCurrent={1}
        pageSize={filter.size}
        current={filter.page}
        onChange={(page) => setFilter({ ...filter, page })}
        total={pitchesPaginataion?.metadata.totalCount}
      />
    </Space>
  )
}
