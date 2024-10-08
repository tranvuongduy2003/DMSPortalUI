import { IClass, IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { pitchesService } from '@/services'
import { notification } from 'antd'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ClassesLayout } from '../layout'
import { useAppStore } from '@/stores'

export function ClassesByPitchPage() {
  const { pitchId } = useParams()

  const [currentPitch, setCurrentPitch] = useState<IPitch>()

  const setLoading = useAppStore((state) => state.setIsLoading)

  const handleFetchClasses = useRef<
    (
      filter: IPaginationFilter,
      setPagination: Dispatch<SetStateAction<IPagination<IClass> | undefined>>
    ) => Promise<void>
  >(async (filter, setPagination) => {
    setLoading(true)
    try {
      await Promise.all([
        pitchesService.getPitchById(pitchId!).then(({ data }) => {
          setCurrentPitch(data)
        }),
        pitchesService.getClassesByPitchId(pitchId!, filter).then(({ data }) => {
          setPagination(data)
        })
      ])
    } catch (error: any) {
      notification.error({ message: error?.message })
    } finally {
      setLoading(false)
    }
  })

  return <ClassesLayout pitch={currentPitch} fetchClasses={handleFetchClasses.current} />
}
