import { STUDENTS_ROUTE } from '@/constants/routes'
import { IClass } from '@/interfaces'
import { Card } from 'antd'
import { MdCached } from 'react-icons/md'
import { RiNumbersFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export interface IClassCardProps {
  classData: IClass
}

export function ClassCard({ classData }: IClassCardProps) {
  const navigate = useNavigate()

  return (
    <Card title={classData.name} hoverable onClick={() => navigate(`${classData.id}/${STUDENTS_ROUTE}`)}>
      <div className='flex flex-col gap-4'>
        <p className='flex items-center gap-2'>
          <RiNumbersFill />
          <span>Số lượng học viên:</span>
          <span className='font-medium'>{classData.numberOfStudents ?? 0}</span>
        </p>
        <p className='flex items-center gap-2'>
          <MdCached />
          <span>Trạng thái:</span>
          <span className='font-medium'>{classData.status}</span>
        </p>
      </div>
    </Card>
  )
}
