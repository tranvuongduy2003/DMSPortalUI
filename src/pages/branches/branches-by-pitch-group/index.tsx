import { IBranch, IPagination, IPaginationFilter, IPitchGroup } from '@/interfaces'
import { pitchGroupsService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BranchesLayout } from '../layout'

export function BranchesByPitchGroupPage() {
  const { pitchGroupId } = useParams()

  const [currentPitchGroup, setCurrentPitchGroup] = useState<IPitchGroup>()

  const handleFetchBranches = useRef<
    (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IBranch> | undefined>>
    ) => Promise<void>
  >(async (filter, setPagination) => {
    try {
      await Promise.all([
        pitchGroupsService.getPitchGroupById(pitchGroupId!).then(({ data }) => {
          setCurrentPitchGroup(data)
        }),
        pitchGroupsService.getBranchesByPitchGroupId(pitchGroupId!, filter).then(({ data }) => {
          setPagination(data)
        })
      ])
    } catch (error: any) {
      notification.error({ message: error?.message })
    }
  })

  return <BranchesLayout pitchGroup={currentPitchGroup} fetchBranches={handleFetchBranches.current!} />
}
