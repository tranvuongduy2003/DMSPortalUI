import { EPitchGroupStatus } from '@/enums'
import { pitchGroupsService } from '@/services'
import { CreatePitchGroupRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ICreatePitchGroupModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  refetch?: (() => Promise<void>) | null
}

export function CreatePitchGroupModal({ isModalOpen, setIsModalOpen, refetch }: ICreatePitchGroupModalProps) {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm<CreatePitchGroupRequest>()

  async function handleCreatePitchGroup() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const values = form.getFieldsValue()

      await pitchGroupsService.createPitchGroup(values)

      refetch && refetch()

      notification.success({
        message: 'Tạo mới cụm sân thành công!',
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
      title='Tạo mới cụm sân'
      onCancel={() => setIsModalOpen(false)}
      open={isModalOpen}
      footer={[null, null]}
      destroyOnClose={true}
      afterClose={form.resetFields}
    >
      <Form form={form} size='large' autoComplete='off' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Form.Item
          name='name'
          label={<span className='font-medium'>Tên cụm sân</span>}
          rules={[
            { required: true, message: 'Tên cụm sân không được bỏ trống' },
            {
              max: 50,
              message: 'Số kí tự không được vượt quá 50'
            }
          ]}
        >
          <Input placeholder='Nhập tên của cụm sân' />
        </Form.Item>
        <Form.Item name='status' label={<span className='font-medium'>Trạng thái:</span>}>
          <Select
            placeholder='Chọn trạng thái'
            defaultValue={EPitchGroupStatus.INACTIVE}
            options={[
              { value: EPitchGroupStatus.AVAILABLE, label: 'Đang hoạt động' },
              { value: EPitchGroupStatus.FULL, label: 'Hết sân' },
              { value: EPitchGroupStatus.INACTIVE, label: 'Không hoạt động' }
            ]}
          />
        </Form.Item>
        <div className='flex justify-end gap-3'>
          <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
          <Button htmlType='submit' onClick={() => handleCreatePitchGroup()} type='primary' loading={isLoading}>
            Tạo
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
