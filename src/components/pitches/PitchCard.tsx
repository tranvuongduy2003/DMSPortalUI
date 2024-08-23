import { IPitch } from '@/interfaces'
import { Card } from 'antd'
import { MdCached } from 'react-icons/md'
import { RiNumbersFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export interface IPitchCardProps {
  pitch: IPitch
}

export function PitchCard({ pitch }: IPitchCardProps) {
  const navigate = useNavigate()

  return (
    <Card title={pitch.name} hoverable onClick={() => navigate(`${pitch.id}/classes`)}>
      <div className='flex flex-col gap-4'>
        <p className='flex items-center gap-2'>
          <RiNumbersFill />
          <span>Số lượng lớp:</span>
          <span className='font-medium'>{pitch.numberOfClasses ?? 0}</span>
        </p>
        <p className='flex items-center gap-2'>
          <MdCached />
          <span>Trạng thái:</span>
          <span className='font-medium'>{pitch.status}</span>
        </p>
      </div>
    </Card>
  )
}
