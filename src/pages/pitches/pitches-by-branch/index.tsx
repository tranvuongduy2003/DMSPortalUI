import { IBranch, IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { branchesService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PitchesLayout } from '../layout'
import { useAppStore } from '@/stores'

export function PitchesByBranchPage() {
  const { branchId } = useParams()

  const [currentBranch, setCurrentBranch] = useState<IBranch>()

  const setLoading = useAppStore((state) => state.setIsLoading)

  const handleFetchPitches = useRef<
    (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IPitch> | undefined>>
    ) => Promise<void>
  >(async (filter, setPagination) => {
    setLoading(true)
    try {
      await Promise.all([
        branchesService.getBranchById(branchId!).then(({ data }) => {
          setCurrentBranch(data)
        }),
        branchesService.getPitchesByBranchId(branchId!, filter).then(({ data }) => {
          setPagination(data)
        })
      ])
    } catch (error: any) {
      notification.error({ message: error?.message })
    } finally {
      setLoading(false)
    }
  })

  return <PitchesLayout branch={currentBranch} fetchPitches={handleFetchPitches.current!} />
}
