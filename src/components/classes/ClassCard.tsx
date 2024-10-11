import { ADMINISTRATION_ROUTE, CLASSES_ROUTE, STUDENTS_ROUTE } from '@/constants/routes'
import { IClass } from '@/interfaces'
import { Button, Card } from 'antd'
import { useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdCached } from 'react-icons/md'
import { RiNumbersFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { UpdateClassModal } from './UpdateClassModal'
import { ClassStatusMap } from '@/enums'

export interface IClassCardProps {
  classData: IClass
}

export function ClassCard({ classData }: IClassCardProps) {
  const navigate = useNavigate()

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const buttonRef = useRef<any>(null)

  return (
    <>
      <Card
        title={
          <div className='flex items-center justify-between'>
            <div>{classData.name}</div>
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
          navigate(`/${ADMINISTRATION_ROUTE}/${CLASSES_ROUTE}/${classData.id}/${STUDENTS_ROUTE}`)
        }
      >
        <div className='flex flex-col gap-4'>
          <p className='flex items-center gap-2'>
            <RiNumbersFill />
            <span>Số lượng học viên:</span>
            <span className='font-medium'>{classData.numberOfStudents ?? 0}</span>
          </p>
          <p className='flex items-center gap-2'>
            <MdCached />
            <span>Trạng thái:</span>
            <span className='font-medium'>{ClassStatusMap.get(classData.status)}</span>
          </p>
        </div>
      </Card>
      {isUpdateModalOpen && classData && (
        <UpdateClassModal classData={classData} isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen} />
      )}
    </>
  )
}
