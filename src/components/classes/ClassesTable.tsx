import { IClass } from '@/interfaces'
import { classesService } from '@/services'
import { Button, Modal, Table, notification } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { UpdateClassModal } from './UpdateClassModal'
import { ADMINISTRATION_ROUTE, PITCHES_ROUTE, CLASSES_ROUTE } from '@/constants/routes'

const { confirm } = Modal

interface ClassesTableProps {
  classes: IClass[]
}

export const ClassesTable = ({ classes }: ClassesTableProps) => {
  const navigate = useNavigate()

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [selectedClass, setSelectedClass] = useState<IClass>()

  async function onDeleteClass(classId: string) {
    try {
      await classesService.deleteClass(classId)
      notification.success({
        message: 'Xóa lớp học thành công!',
        duration: 0.5,
        onClose: () => navigate(0)
      })
    } catch (error: any) {
      notification.error({
        message: error.message
      })
    }
  }

  function showConfirm(classId: string) {
    return confirm({
      title: <span className='text-red-600'>Bạn có muốn xóa lớp học này không?</span>,
      content: 'Hãy đảm bảo lớp học không chứa bất kì học viên nào trước khi xóa!',
      okButtonProps: {
        className: 'bg-red-600'
      },
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => onDeleteClass(classId),
      centered: true
    })
  }

  const columns: ColumnsType<IClass | AnyObject> = [
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
      colSpan: 1
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      colSpan: 1
    },
    {
      title: 'Số lượng học viên',
      dataIndex: 'numberOfStudents',
      key: 'numberOfStudents',
      colSpan: 1
    },
    {
      title: 'Sân',
      key: 'pitch',
      colSpan: 1,
      render: (_, classData) => (
        <Button
          type='link'
          onClick={() => navigate(`/${ADMINISTRATION_ROUTE}/${PITCHES_ROUTE}/${classData.pitchId}/${CLASSES_ROUTE}`)}
        >
          {classData.pitch?.name}
        </Button>
      )
    },
    {
      key: 'action',
      colSpan: 1,
      render: (_, classData) => (
        <div className='flex items-center justify-center gap-4'>
          <Button
            type='primary'
            icon={<BiEdit />}
            className='!bg-yellow-600'
            onClick={() => {
              setIsUpdateModalOpen(true)
              setSelectedClass(classData as IClass)
            }}
          />
          <Button type='primary' icon={<BiTrash />} className='!bg-red-600' onClick={() => showConfirm(classData.id)} />
        </div>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={classes}
        pagination={false}
        locale={{
          emptyText: 'Không tìm thấy bất kì lớp học nào'
        }}
        rowKey={(record) => record.id}
      />
      {isUpdateModalOpen && selectedClass && (
        <UpdateClassModal
          classData={selectedClass}
          isModalOpen={isUpdateModalOpen}
          setIsModalOpen={setIsUpdateModalOpen}
        />
      )}
    </>
  )
}
