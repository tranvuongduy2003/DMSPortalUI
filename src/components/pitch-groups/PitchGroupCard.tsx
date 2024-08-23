import { IPitchGroup } from '@/interfaces'
import { Card } from 'antd'
import { MdCached } from 'react-icons/md'
import { RiNumbersFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export interface IPitchGroupCardProps {
  pitchGroup: IPitchGroup
}

export function PitchGroupCard({ pitchGroup }: IPitchGroupCardProps) {
  const navigate = useNavigate()

  return (
    <Card title={pitchGroup.name} hoverable onClick={() => navigate(`${pitchGroup.id}/branches`)}>
      <div className='flex flex-col gap-4'>
        <p className='flex items-center gap-2'>
          <RiNumbersFill />
          <span>Số lượng chi nhánh:</span>
          <span className='font-medium'>{pitchGroup.numberOfBranches ?? 0}</span>
        </p>
        <p className='flex items-center gap-2'>
          <MdCached />
          <span>Trạng thái:</span>
          <span className='font-medium'>{pitchGroup.status}</span>
        </p>
      </div>
    </Card>
  )
}
