import { IPagination, IPaginationFilter, IPitchGroup } from '@/interfaces'
import { pitchGroupsService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef } from 'react'
import { PitchGroupsLayout } from './layout'

export function PitchGroupsForAdministrationPage() {
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
      try {
        const { data } = await pitchGroupsService.getPitchGroups(filter)
        setPagination(data)
      } catch (error: any) {
        notification.error({ message: error?.message })
      }
    }
  )

  return <PitchGroupsLayout fetchPitchGroups={handleFetchPitchGroups.current} />
}
