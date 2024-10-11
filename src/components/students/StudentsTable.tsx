import { EGender, EStudentStatus, GenderMap, StudentStatusMap } from '@/enums'
import { IStudent } from '@/interfaces'
import { studentsService } from '@/services'
import { Button, Modal, notification, Table } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const { confirm } = Modal

interface StudentsTableProps {
  students: IStudent[]
}

export const StudentsTable = ({ students }: StudentsTableProps) => {
  const navigate = useNavigate()

  async function handleDeleteStudent(studentId: string) {
    try {
      await studentsService.deleteStudent(studentId)
      notification.success({
        message: 'Xóa học viên thành công!',
        duration: 0.5,
        onClose: () => navigate(0)
      })
    } catch (error: any) {
      notification.error({
        message: error.message
      })
    }
  }

  function showConfirm(studentId: string) {
    return confirm({
      title: <span className='text-red-600'>Bạn có muốn xóa học viên này không?</span>,
      content: 'Sau khi xóa, học viên sẽ rời khỏi tất cả các lớp hiện tại',
      okButtonProps: {
        className: 'bg-red-600'
      },
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => handleDeleteStudent(studentId),
      centered: true
    })
  }

  const columns: ColumnsType<IStudent | AnyObject> = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      colSpan: 1
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      colSpan: 1,
      render: (value: Date) => <span>{dayjs(value).format('DD/MM/YYYY')}</span>
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      colSpan: 1
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      colSpan: 1,
      render: (value: EGender) => GenderMap.get(value)
    },
    {
      title: 'Chiều cao (cm)',
      dataIndex: 'height',
      key: 'height',
      colSpan: 1
    },
    {
      title: 'Cân nặng (kg)',
      dataIndex: 'weight',
      key: 'weight',
      colSpan: 1
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      colSpan: 1,
      render: (value: EStudentStatus) => StudentStatusMap.get(value)
    },
    {
      title: 'Số lớp đã học',
      dataIndex: 'numberOfClasses',
      key: 'numberOfClasses',
      colSpan: 1
    },
    {
      colSpan: 1,
      render: (_, student) => (
        <div className='flex items-center justify-center gap-4'>
          <Button
            type='primary'
            icon={<BiEdit />}
            className='!bg-yellow-600'
            onClick={() => navigate(`/students/${student.id}`)}
          />
          <Button type='primary' icon={<BiTrash />} className='!bg-red-600' onClick={() => showConfirm(student.id)} />
        </div>
      )
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={students}
      pagination={false}
      locale={{
        emptyText: 'Không tìm thấy bất kì lớp nào'
      }}
      rowKey={(record) => record.id}
    />
  )
}
