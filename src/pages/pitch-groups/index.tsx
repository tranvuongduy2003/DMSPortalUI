import { IPagination, IPaginationFilter, IPitchGroup } from '@/interfaces'
import { pitchGroupsService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef } from 'react'
import { PitchGroupsLayout } from './layout'
import { useAppStore } from '@/stores'

export function PitchGroupsPage() {
  const setLoading = useAppStore((state) => state.setIsLoading)

  const handleFetchPitchGroups = useRef<
    (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IPitchGroup> | undefined>>
    ) => Promise<void>
  >(
    async (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IPitchGroup> | undefined>>
    ) => {
      setLoading(true)
      try {
        const { data } = await pitchGroupsService.getPitchGroups(filter)
        setPagination(data)
      } catch (error: any) {
        notification.error({ message: error?.message })
      } finally {
        setLoading(false)
      }
    }
  )

  return <PitchGroupsLayout fetchPitchGroups={handleFetchPitchGroups.current} type='table' />
}
