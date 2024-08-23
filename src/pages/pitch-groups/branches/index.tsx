import { BranchesList } from '@/components/branches'
import { PaginationFilter } from '@/components/common'
import { EPageOrder } from '@/enums/pagination.enum'
import { IBranch, IPagination, IPaginationFilter, IPitchGroup } from '@/interfaces'
import { pitchGroupsService } from '@/services'
import { Button, notification, Pagination, Space, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export function BranchesByPitchGroupPage() {
  const { pitchGroupId } = useParams()

  const [currentPitchGroup, setCurrentPitchGroup] = useState<IPitchGroup>()
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

  const handleFetchBranches = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchBranches.current = async () => {
      try {
        await Promise.all([
          pitchGroupsService.getPitchGroupById(pitchGroupId!).then(({ data }) => {
            setCurrentPitchGroup(data)
          }),
          pitchGroupsService.getBranchesByPitchGroupId(pitchGroupId!, filter).then(({ data }) => {
            setBranchesPagination(data)
          })
        ])
      } catch (error: any) {
        notification.error({ message: error?.message })
      }
    }
    handleFetchBranches.current()
  }, [pitchGroupId, filter])

  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={2}>Cụm sân {currentPitchGroup?.name}</Typography.Title>
      <div className='flex items-center justify-between'>
        <Typography.Title level={2}>Quản lý chi nhánh</Typography.Title>
        <Button type='primary'>Tạo chi nhánh</Button>
      </div>
      <PaginationFilter setFilter={setFilter} />
      <BranchesList items={branchesPaginataion?.items ?? []} />
      <Pagination
        className='flex justify-center'
        defaultCurrent={1}
        pageSize={filter.size}
        current={filter.page}
        onChange={(page) => setFilter({ ...filter, page })}
        total={branchesPaginataion?.metadata.totalCount}
      />
    </Space>
  )
}
