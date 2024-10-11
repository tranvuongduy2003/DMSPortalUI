import { IPitch } from '@/interfaces'
import { Button, Card } from 'antd'
import { useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdCached } from 'react-icons/md'
import { RiNumbersFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { UpdatePitchModal } from './UpdatePitchModal'
import { ADMINISTRATION_ROUTE, CLASSES_ROUTE, PITCHES_ROUTE } from '@/constants/routes'
import { PitchStatusMap } from '@/enums'

export interface IPitchCardProps {
  pitch: IPitch
}

export function PitchCard({ pitch }: IPitchCardProps) {
  const navigate = useNavigate()

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const buttonRef = useRef<any>(null)

  return (
    <>
      <Card
        title={
          <div className='flex items-center justify-between'>
            <div>{pitch.name}</div>
            <Button
              type='text'
              icon={<BiEdit />}
              size='large'
              ref={buttonRef}
              onClick={() => setIsUpdateModalOpen(true)}
            />
          </div>
        }
        hoverable
        onClick={(event) =>
          !buttonRef.current.contains(event.target) &&
          navigate(`/${ADMINISTRATION_ROUTE}/${PITCHES_ROUTE}/${pitch.id}/${CLASSES_ROUTE}`)
        }
      >
        <div className='flex flex-col gap-4'>
          <p className='flex items-center gap-2'>
            <RiNumbersFill />
            <span>Số lượng lớp:</span>
            <span className='font-medium'>{pitch.numberOfClasses ?? 0}</span>
          </p>
          <p className='flex items-center gap-2'>
            <MdCached />
            <span>Trạng thái:</span>
            <span className='font-medium'>{PitchStatusMap.get(pitch.status)}</span>
          </p>
        </div>
      </Card>
      {isUpdateModalOpen && pitch && (
        <UpdatePitchModal pitch={pitch} isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen} />
      )}
    </>
  )
}
