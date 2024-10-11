import { ClassStatusMap, EClassStatus } from '@/enums'
import { IPitch, IUser } from '@/interfaces'
import { classesService, pitchesService, usersService } from '@/services'
import { CreateClassRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select, Spin } from 'antd'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ICreateClassModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  refetch?: (() => Promise<void>) | null
}

export function CreateClassModal({ isModalOpen, setIsModalOpen, refetch }: ICreateClassModalProps) {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false)
  const [pitches, setPitches] = useState<IPitch[]>([])
  const [teachers, setTeacher] = useState<IUser[]>([])

  const [form] = Form.useForm<CreateClassRequest>()

  async function handleCreateClass() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const values = form.getFieldsValue()

      const { name, status, pitchId, teacherId } = values

      await classesService.createClass({
        name,
        pitchId,
        status,
        teacherId
      })

      refetch && refetch()

      notification.success({
        message: 'Tạo mới lớp thành công!',
        duration: 0.5,
        onClose: () => navigate(0)
      })
      setIsLoading(false)
      setIsModalOpen(false)
    } catch (error: any) {
      notification.error({
        message: error.message
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      setIsModalLoading(true)
      await Promise.all([
        pitchesService.getPitches({ takeAll: true }).then(({ data }) => setPitches(data.items)),
        usersService.getTeachers({ takeAll: true }).then(({ data }) => setTeacher(data.items))
      ])
      setIsModalLoading(false)
    })()
  }, [])

  return (
    <Modal
      title='Tạo mới lớp'
      onCancel={() => setIsModalOpen(false)}
      open={isModalOpen}
      footer={[null, null]}
      destroyOnClose={true}
      afterClose={form.resetFields}
    >
      {isModalLoading ? (
        <div className='flex justify-center'>
          <Spin spinning={isModalLoading} size='large' />
        </div>
      ) : (
        <Form form={form} size='large' autoComplete='off' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item
            name='name'
            label={<span className='font-medium'>Tên lớp:</span>}
            rules={[
              { required: true, message: 'Tên lớp không được bỏ trống' },
              {
                max: 50,
                message: 'Số kí tự không được vượt quá 50'
              }
            ]}
          >
            <Input placeholder='Nhập tên của lớp' />
          </Form.Item>
          <Form.Item
            name='pitchId'
            rules={[{ required: true, message: 'Sân không được bỏ trống' }]}
            label={<span className='font-medium'>Sân:</span>}
          >
            <Select placeholder='Chọn sân' options={pitches.map((pitch) => ({ value: pitch.id, label: pitch.name }))} />
          </Form.Item>
          <Form.Item
            name='teacherId'
            rules={[{ required: true, message: 'Giáo viên phụ trách không được bỏ trống' }]}
            label={<span className='font-medium'>Giáo viên phụ trách:</span>}
          >
            <Select
              placeholder='Chọn giáo viên phụ trách'
              options={teachers.map((teacher) => ({ value: teacher.id, label: teacher.fullName }))}
            />
          </Form.Item>
          <Form.Item name='status' label={<span className='font-medium'>Trạng thái:</span>}>
            <Select
              placeholder='Chọn trạng thái'
              defaultValue={EClassStatus.SCHEDULED}
              options={[
                { value: EClassStatus.CANCELED, label: ClassStatusMap.get(EClassStatus.CANCELED) },
                { value: EClassStatus.COMPLETED, label: ClassStatusMap.get(EClassStatus.COMPLETED) },
                { value: EClassStatus.FULL, label: ClassStatusMap.get(EClassStatus.FULL) },
                { value: EClassStatus.IN_PROGRESS, label: ClassStatusMap.get(EClassStatus.IN_PROGRESS) },
                {
                  value: EClassStatus.OPEN_FOR_ENROLLMENT,
                  label: ClassStatusMap.get(EClassStatus.OPEN_FOR_ENROLLMENT)
                },
                { value: EClassStatus.POSTPONED, label: ClassStatusMap.get(EClassStatus.POSTPONED) },
                { value: EClassStatus.SCHEDULED, label: ClassStatusMap.get(EClassStatus.SCHEDULED) }
              ]}
            />
          </Form.Item>
          <div className='flex justify-end gap-3'>
            <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button htmlType='submit' onClick={() => handleCreateClass()} type='primary' loading={isLoading}>
              Tạo
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  )
}
