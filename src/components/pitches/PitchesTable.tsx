import { ADMINISTRATION_ROUTE, BRANCHES_ROUTE, PITCHES_ROUTE } from '@/constants/routes'
import { IPitch } from '@/interfaces'
import { pitchesService } from '@/services'
import { Button, Modal, notification, Table } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { UpdatePitchModal } from './UpdatePitchModal'

const { confirm } = Modal

interface PitchesTableProps {
  pitches: IPitch[]
}

export const PitchesTable = ({ pitches }: PitchesTableProps) => {
  const navigate = useNavigate()

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [selectedPitch, setSelectedPitch] = useState<IPitch>()

  async function onDeletePitch(pitchId: string) {
    try {
      await pitchesService.deletePitch(pitchId)
      notification.success({
        message: 'Xóa sân thành công!',
        duration: 0.5,
        onClose: () => navigate(0)
      })
    } catch (error: any) {
      notification.error({
        message: error.message
      })
    }
  }

  function showConfirm(pitchId: string) {
    return confirm({
      title: <span className='text-red-600'>Bạn có muốn xóa sân này không?</span>,
      content: 'Hãy đảm bảo sân không chứa bất khì lớp học nào trước khi xóa!',
      okButtonProps: {
        className: 'bg-red-600'
      },
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => onDeletePitch(pitchId),
      centered: true
    })
  }

  const columns: ColumnsType<IPitch | AnyObject> = [
    {
      title: 'Tên sân',
      dataIndex: 'name',
      key: 'name',
      colSpan: 1
    },
    {
      title: 'Số lượng lớp học',
      dataIndex: 'numberOfClasses',
      key: 'numberOfClasses',
      colSpan: 1
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      colSpan: 1
    },
    {
      title: 'Chi nhánh',
      key: 'branch',
      colSpan: 1,
      render: (_, pitch) => (
        <Button
          type='link'
          onClick={() => navigate(`/${ADMINISTRATION_ROUTE}/${BRANCHES_ROUTE}/${pitch.branchId}/${PITCHES_ROUTE}`)}
        >
          {pitch.branch?.name}
        </Button>
      )
    },
    {
      key: 'action',
      colSpan: 1,
      render: (_, pitch) => (
        <div className='flex items-center justify-center gap-4'>
          <Button
            type='primary'
            icon={<BiEdit />}
            className='!bg-yellow-600'
            onClick={() => {
              setIsUpdateModalOpen(true)
              setSelectedPitch(pitch as IPitch)
            }}
          />
          <Button type='primary' icon={<BiTrash />} className='!bg-red-600' onClick={() => showConfirm(pitch.id)} />
        </div>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={pitches}
        pagination={false}
        locale={{
          emptyText: 'Không tìm thấy bất kì sân nào'
        }}
        rowKey={(record) => record.id}
      />
      {isUpdateModalOpen && selectedPitch && (
        <UpdatePitchModal pitch={selectedPitch} isModalOpen={isUpdateModalOpen} setIsModalOpen={setIsUpdateModalOpen} />
      )}
    </>
  )
}
