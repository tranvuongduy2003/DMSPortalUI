import { IClass, IPagination, IPaginationFilter } from '@/interfaces'
import { classesService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef } from 'react'
import { ClassesLayout } from './layout'

export function ClassesPage() {
  const handleFetchClasses = useRef<
    (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IClass> | undefined>>
    ) => Promise<void>
  >(async (filter, setPagination) => {
    try {
      const { data } = await classesService.getClasses(filter)
      setPagination(data)
    } catch (error: any) {
      notification.error({ message: error?.message })
    }
  })

  return <ClassesLayout fetchClasses={handleFetchClasses.current} type='table' />
}
