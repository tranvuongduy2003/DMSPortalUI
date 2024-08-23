import { PaginationFilter } from '@/components/common/PaginationFilter'
import { PitchGroupsList } from '@/components/pitch-groups'
import { EPageOrder } from '@/enums/pagination.enum'
import { IPagination, IPaginationFilter, IPitchGroup } from '@/interfaces'
import { pitchGroupsService } from '@/services'
import { Button, notification, Pagination, Space, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'

export function PitchGroupsPage() {
  const [pitchGroupsPaginataion, setPitchGroupsPagination] = useState<IPagination<IPitchGroup>>()
  const [filter, setFilter] = useState<IPaginationFilter>({
    order: EPageOrder.ASC,
    orderBy: '',
    page: 1,
    searchBy: '',
    size: 12,
    takeAll: false,
    searchValue: ''
  })

  const handleFetchPitchGroups = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchPitchGroups.current = async () => {
      try {
        const { data } = await pitchGroupsService.getPitchGroups(filter)
        setPitchGroupsPagination(data)
      } catch (error: any) {
        notification.error({ message: error?.message })
      }
    }
    handleFetchPitchGroups.current()
  }, [filter])

  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <div className='flex items-center justify-between'>
        <Typography.Title level={2}>Quản lý hành chính</Typography.Title>
        <Button type='primary'>Tạo đơn vị</Button>
      </div>
      <PaginationFilter setFilter={setFilter} />
      <PitchGroupsList items={pitchGroupsPaginataion?.items ?? []} />
      <Pagination
        className='flex justify-center'
        defaultCurrent={1}
        pageSize={filter.size}
        current={filter.page}
        onChange={(page) => setFilter({ ...filter, page })}
        total={pitchGroupsPaginataion?.metadata.totalCount}
      />
    </Space>
  )
}
