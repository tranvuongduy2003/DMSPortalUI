import { IPitchGroup } from '@/interfaces'
import { pitchGroupsService } from '@/services'
import { Button, Modal, Table, notification } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { UpdatePitchGroupModal } from './UpdatePitchGroupModal'
import { EPitchGroupStatus, PitchGroupStatusMap } from '@/enums'

const { confirm } = Modal

interface PitchGroupsTableProps {
  pitchGroups: IPitchGroup[]
}

export const PitchGroupsTable = ({ pitchGroups }: PitchGroupsTableProps) => {
  const navigate = useNavigate()

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [selectedPitchGroup, setSelectedPitchGroup] = useState<IPitchGroup>()

  async function onDeletePitchGroup(pitchGroupId: string) {
    try {
      await pitchGroupsService.deletePitchGroup(pitchGroupId)
      notification.success({
        message: 'Xóa cụm sân thành công!',
        duration: 0.5,
        onClose: () => navigate(0)
      })
    } catch (error: any) {
      notification.error({
        message: error.message
      })
    }
  }

  function showConfirm(pitchGroupId: string) {
    return confirm({
      title: <span className='text-red-600'>Bạn có muốn xóa cụm sân này không?</span>,
      content: 'Hãy đảm bảo cụm sân không chứa bất khì chi nhánh nào trước khi xóa!',
      okButtonProps: {
        className: 'bg-red-600'
      },
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => onDeletePitchGroup(pitchGroupId),
      centered: true
    })
  }

  const columns: ColumnsType<IPitchGroup | AnyObject> = [
    {
      title: 'Tên cụm sân',
      dataIndex: 'name',
      key: 'name',
      colSpan: 1
    },
    {
      title: 'Số lượng chi nhánh',
      dataIndex: 'numberOfBranches',
      key: 'numberOfBranches',
      colSpan: 1
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      colSpan: 1,
      render: (value: EPitchGroupStatus) => PitchGroupStatusMap.get(value)
    },
    {
      key: 'action',
      colSpan: 1,
      render: (_, pitchGroup) => (
        <div className='flex items-center justify-center gap-4'>
          <Button
            type='primary'
            icon={<BiEdit />}
            className='!bg-yellow-600'
            onClick={() => {
              setIsUpdateModalOpen(true)
              setSelectedPitchGroup(pitchGroup as IPitchGroup)
            }}
          />
          <Button
            type='primary'
            icon={<BiTrash />}
            className='!bg-red-600'
            onClick={() => showConfirm(pitchGroup.id)}
          />
        </div>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={pitchGroups}
        pagination={false}
        locale={{
          emptyText: 'Không tìm thấy bất kì cụm sân nào'
        }}
        rowKey={(record) => record.id}
      />
      {isUpdateModalOpen && selectedPitchGroup && (
        <UpdatePitchGroupModal
          pitchGroup={selectedPitchGroup}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
        />
      )}
    </>
  )
}
