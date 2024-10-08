import { IBranch } from '@/interfaces'
import { branchesService } from '@/services'
import { Button, Modal, Table, notification } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { UpdateBranchModal } from './UpdateBranchModal'
import { ADMINISTRATION_ROUTE, PITCH_GROUPS_ROUTE, BRANCHES_ROUTE } from '@/constants/routes'

const { confirm } = Modal

interface BranchesTableProps {
  branches: IBranch[]
}

export const BranchesTable = ({ branches }: BranchesTableProps) => {
  const navigate = useNavigate()

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [selectedBranch, setSelectedBranch] = useState<IBranch>()

  async function onDeleteBranch(branchId: string) {
    try {
      await branchesService.deleteBranch(branchId)
      notification.success({
        message: 'Xóa chi nhánh thành công!',
        duration: 0.5,
        onClose: () => navigate(0)
      })
    } catch (error: any) {
      notification.error({
        message: error.message
      })
    }
  }

  function showConfirm(branchId: string) {
    return confirm({
      title: <span className='text-red-600'>Bạn có muốn xóa chi nhánh này không?</span>,
      content: 'Hãy đảm bảo chi nhánh không chứa bất khì sân nào trước khi xóa!',
      okButtonProps: {
        className: 'bg-red-600'
      },
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => onDeleteBranch(branchId),
      centered: true
    })
  }

  const columns: ColumnsType<IBranch | AnyObject> = [
    {
      title: 'Tên chi nhánh',
      dataIndex: 'name',
      key: 'name',
      colSpan: 1
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      colSpan: 1
    },
    {
      title: 'Số lượng sân',
      dataIndex: 'numberOfPitches',
      key: 'numberOfPitches',
      colSpan: 1
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      colSpan: 1
    },
    {
      title: 'Cụm sân',
      key: 'pitchGroup',
      colSpan: 1,
      render: (_, branch) => (
        <Button
          type='link'
          onClick={() =>
            navigate(`/${ADMINISTRATION_ROUTE}/${PITCH_GROUPS_ROUTE}/${branch.pitchGroupId}/${BRANCHES_ROUTE}`)
          }
        >
          {branch.pitchGroup?.name}
        </Button>
      )
    },
    {
      title: 'Người quản lý',
      key: 'manager',
      colSpan: 1,
      render: (_, branch) => <span>{branch.manager?.fullName}</span>
    },
    {
      key: 'action',
      colSpan: 1,
      render: (_, branch) => (
        <div className='flex items-center justify-center gap-4'>
          <Button
            type='primary'
            icon={<BiEdit />}
            className='!bg-yellow-600'
            onClick={() => {
              setIsUpdateModalOpen(true)
              setSelectedBranch(branch as IBranch)
            }}
          />
          <Button type='primary' icon={<BiTrash />} className='!bg-red-600' onClick={() => showConfirm(branch.id)} />
        </div>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={branches}
        pagination={false}
        locale={{
          emptyText: 'Không tìm thấy bất kì nhánh nào'
        }}
        rowKey={(record) => record.id}
      />
      {isUpdateModalOpen && selectedBranch && (
        <UpdateBranchModal
          branch={selectedBranch}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
        />
      )}
    </>
  )
}
