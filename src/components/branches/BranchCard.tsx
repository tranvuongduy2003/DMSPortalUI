import { IBranch } from '@/interfaces'
import { Button, Card } from 'antd'
import { useRef, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdCached } from 'react-icons/md'
import { PiAddressBook } from 'react-icons/pi'
import { RiNumbersFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { UpdateBranchModal } from './UpdateBranchModal'
import { ADMINISTRATION_ROUTE, BRANCHES_ROUTE, PITCHES_ROUTE } from '@/constants/routes'

export interface IBranchCardProps {
  branch: IBranch
}

export function BranchCard({ branch }: IBranchCardProps) {
  const navigate = useNavigate()

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const buttonRef = useRef<any>(null)

  return (
    <>
      <Card
        title={
          <div className='flex items-center justify-between'>
            <div>{branch.name}</div>
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
          navigate(`/${ADMINISTRATION_ROUTE}/${BRANCHES_ROUTE}/${branch.id}/${PITCHES_ROUTE}`)
        }
      >
        <div className='flex flex-col gap-4'>
          <p className='flex items-center gap-2'>
            <RiNumbersFill />
            <span>Số lượng sân:</span>
            <span className='font-medium'>{branch.numberOfPitches ?? 0}</span>
          </p>
          <p className='flex items-center gap-2'>
            <PiAddressBook />
            <span>Địa chỉ:</span>
            <span className='font-medium'>{branch.address ?? ''}</span>
          </p>
          <p className='flex items-center gap-2'>
            <MdCached />
            <span>Trạng thái:</span>
            <span className='font-medium'>{branch.status}</span>
          </p>
        </div>
      </Card>
      {isUpdateModalOpen && branch && (
        <UpdateBranchModal branch={branch} isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen} />
      )}
    </>
  )
}
