import { EClassStatus } from '@/enums'
import { classesService } from '@/services'
import { CreateClassRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export interface ICreateClassModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  refetch?: (() => Promise<void>) | null
}

export function CreateClassModal({ isModalOpen, setIsModalOpen, refetch }: ICreateClassModalProps) {
  const navigate = useNavigate()
  const { pitchId } = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm<CreateClassRequest>()

  async function handleCreateClass() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const values = form.getFieldsValue()

      const { name, status } = values

      await classesService.createClass({
        name,
        pitchId: pitchId ?? '',
        status
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

  return (
    <Modal
      title='Tạo mới lớp'
      onCancel={() => setIsModalOpen(false)}
      open={isModalOpen}
      footer={[null, null]}
      destroyOnClose={true}
      afterClose={form.resetFields}
    >
      <Form form={form} size='large' autoComplete='off' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Form.Item
          name='name'
          label={<span className='font-medium'>Tên lớp</span>}
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
        <Form.Item name='status' label={<span className='font-medium'>Trạng thái:</span>}>
          <Select
            placeholder='Chọn trạng thái'
            defaultValue={EClassStatus.SCHEDULED}
            options={[
              { value: EClassStatus.CANCELED, label: 'Đã hủy' },
              { value: EClassStatus.COMPLETED, label: 'Đã kết thúc' },
              { value: EClassStatus.FULL, label: 'Đã đầy' },
              { value: EClassStatus.IN_PROGRESS, label: 'Đang diễn ra' },
              { value: EClassStatus.OPEN_FOR_ENROLLMENT, label: 'Trong quá trình đăng ký' },
              { value: EClassStatus.POSTPONED, label: 'Đã bị hoãn' },
              { value: EClassStatus.SCHEDULED, label: 'Đã lên lịch' }
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
    </Modal>
  )
}
