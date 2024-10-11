import { IPitchGroup } from '@/interfaces'
import { Button, Card } from 'antd'
import { useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdCached } from 'react-icons/md'
import { RiNumbersFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { UpdatePitchGroupModal } from './UpdatePitchGroupModal'
import { ADMINISTRATION_ROUTE, BRANCHES_ROUTE, PITCH_GROUPS_ROUTE } from '@/constants/routes'
import { PitchGroupStatusMap } from '@/enums'

export interface IPitchGroupCardProps {
  pitchGroup: IPitchGroup
}

export function PitchGroupCard({ pitchGroup }: IPitchGroupCardProps) {
  const navigate = useNavigate()

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const buttonRef = useRef<any>(null)

  return (
    <>
      <Card
        title={
          <div className='flex items-center justify-between'>
            <div>{pitchGroup.name}</div>
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
          navigate(`/${ADMINISTRATION_ROUTE}/${PITCH_GROUPS_ROUTE}/${pitchGroup.id}/${BRANCHES_ROUTE}`)
        }
      >
        <div className='flex flex-col gap-4'>
          <p className='flex items-center gap-2'>
            <RiNumbersFill />
            <span>Số lượng chi nhánh:</span>
            <span className='font-medium'>{pitchGroup.numberOfBranches ?? 0}</span>
          </p>
          <p className='flex items-center gap-2'>
            <MdCached />
            <span>Trạng thái:</span>
            <span className='font-medium'>{PitchGroupStatusMap.get(pitchGroup.status)}</span>
          </p>
        </div>
      </Card>
      {isUpdateModalOpen && pitchGroup && (
        <UpdatePitchGroupModal
          pitchGroup={pitchGroup}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
        />
      )}
    </>
  )
}
