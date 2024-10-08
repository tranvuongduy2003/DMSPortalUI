import { IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { pitchesService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef } from 'react'
import { PitchesLayout } from './layout'
import { useAppStore } from '@/stores'

export function PitchesPage() {
  const setLoading = useAppStore((state) => state.setIsLoading)

  const handleFetchPitches = useRef<
    (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IPitch> | undefined>>
    ) => Promise<void>
  >(async (filter, setPagination) => {
    setLoading(true)
    try {
      const { data } = await pitchesService.getPitches(filter)
      setPagination(data)
    } catch (error: any) {
      notification.error({ message: error?.message })
    } finally {
      setLoading(false)
    }
  })

  return <PitchesLayout fetchPitches={handleFetchPitches.current} type='table' />
}
