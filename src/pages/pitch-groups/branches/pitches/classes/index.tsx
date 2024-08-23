import { ClassesList } from '@/components/classes'
import { PaginationFilter } from '@/components/common'
import { EPageOrder } from '@/enums/pagination.enum'
import { IClass, IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { pitchesService } from '@/services'
import { Button, notification, Pagination, Space, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export function ClassesByPitchPage() {
  const { pitchId } = useParams()

  const [currentPitch, setCurrentPitch] = useState<IPitch>()
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

  const handleFetchClasses = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchClasses.current = async () => {
      try {
        await Promise.all([
          pitchesService.getPitchById(pitchId!).then(({ data }) => {
            setCurrentPitch(data)
          }),
          pitchesService.getClassesByPitchId(pitchId!, filter).then(({ data }) => {
            setClassesPagination(data)
          })
        ])
      } catch (error: any) {
        notification.error({ message: error?.message })
      }
    }
    handleFetchClasses.current()
  }, [pitchId, filter])

  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={2}>Sân {currentPitch?.name}</Typography.Title>
      <div className='flex items-center justify-between'>
        <Typography.Title level={2}>Quản lý lớp</Typography.Title>
        <Button type='primary'>Tạo lớp</Button>
      </div>
      <PaginationFilter setFilter={setFilter} />
      <ClassesList items={classesPaginataion?.items ?? []} />
      <Pagination
        className='flex justify-center'
        defaultCurrent={1}
        pageSize={filter.size}
        current={filter.page}
        onChange={(page) => setFilter({ ...filter, page })}
        total={classesPaginataion?.metadata.totalCount}
      />
    </Space>
  )
}
