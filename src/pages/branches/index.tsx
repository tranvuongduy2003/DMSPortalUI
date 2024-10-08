import { IBranch, IPagination, IPaginationFilter } from '@/interfaces'
import { branchesService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef } from 'react'
import { BranchesLayout } from './layout'
import { useAppStore } from '@/stores'

export function BranchesPage() {
  const setLoading = useAppStore((state) => state.setIsLoading)

  const handleFetchBranches = useRef<
    (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IBranch> | undefined>>
    ) => Promise<void>
  >(async (filter, setPagination) => {
    setLoading(true)
    try {
      const { data } = await branchesService.getBranches(filter)
      setPagination(data)
    } catch (error: any) {
      notification.error({ message: error?.message })
    } finally {
      setLoading(false)
    }
  })

  return <BranchesLayout fetchBranches={handleFetchBranches.current!} type='table' />
}
