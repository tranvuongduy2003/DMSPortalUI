import { IBranch } from '@/interfaces'
import { Card } from 'antd'
import { MdCached } from 'react-icons/md'
import { RiNumbersFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export interface IBranchCardProps {
  branch: IBranch
}

export function BranchCard({ branch }: IBranchCardProps) {
  const navigate = useNavigate()

  return (
    <Card title={branch.name} hoverable onClick={() => navigate(`${branch.id}/pitches`)}>
      <div className='flex flex-col gap-4'>
        <p className='flex items-center gap-2'>
          <RiNumbersFill />
          <span>Số lượng sân:</span>
          <span className='font-medium'>{branch.numberOfPitches ?? 0}</span>
        </p>
        <p className='flex items-center gap-2'>
          <MdCached />
          <span>Trạng thái:</span>
          <span className='font-medium'>{branch.status}</span>
        </p>
      </div>
    </Card>
  )
}
