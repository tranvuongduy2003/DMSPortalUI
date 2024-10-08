import { IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { pitchesService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef } from 'react'
import { PitchesLayout } from './layout'

export function PitchesPage() {
  const handleFetchPitches = useRef<
    (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IPitch> | undefined>>
    ) => Promise<void>
  >(async (filter, setPagination) => {
    try {
      const { data } = await pitchesService.getPitches(filter)
      setPagination(data)
    } catch (error: any) {
      notification.error({ message: error?.message })
    }
  })

  return <PitchesLayout fetchPitches={handleFetchPitches.current} type='table' />
}
