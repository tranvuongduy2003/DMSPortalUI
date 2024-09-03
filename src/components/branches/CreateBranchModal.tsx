import { EBranchStatus } from '@/enums'
import { branchesService } from '@/services'
import { useAuthStore } from '@/stores'
import { CreateBranchRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export interface ICreateBranchModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  refetch?: (() => Promise<void>) | null
}

export function CreateBranchModal({ isModalOpen, setIsModalOpen, refetch }: ICreateBranchModalProps) {
  const navigate = useNavigate()
  const { pitchGroupId } = useParams()
  const user = useAuthStore((state) => state.profile)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm<CreateBranchRequest>()

  async function handleCreateBranch() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const values = form.getFieldsValue()

      const { name, address, status } = values

      await branchesService.createBranch({
        name,
        address,
        status,
        managerId: user?.id ?? '',
        pitchGroupId: pitchGroupId ?? ''
      })

      refetch && refetch()

      notification.success({
        message: 'Tạo mới chi nhánh thành công!',
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
      title='Tạo mới chi nhánh'
      onCancel={() => setIsModalOpen(false)}
      open={isModalOpen}
      footer={[null, null]}
      destroyOnClose={true}
      afterClose={form.resetFields}
    >
      <Form form={form} size='large' autoComplete='off' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Form.Item
          name='name'
          label={<span className='font-medium'>Tên chi nhánh</span>}
          rules={[
            { required: true, message: 'Tên chi nhánh không được bỏ trống' },
            {
              max: 50,
              message: 'Số kí tự không được vượt quá 50'
            }
          ]}
        >
          <Input placeholder='Nhập tên của chi nhánh' />
        </Form.Item>
        <Form.Item
          name='address'
          label={<span className='font-medium'>Địa chỉ chi nhánh</span>}
          rules={[{ required: true, message: 'Địa chỉ chi nhánh không được bỏ trống' }]}
        >
          <Input placeholder='Nhập địa chỉ của chi nhánh' />
        </Form.Item>
        <Form.Item name='status' label={<span className='font-medium'>Trạng thái:</span>}>
          <Select
            placeholder='Chọn trạng thái'
            defaultValue={EBranchStatus.CLOSED}
            options={[
              { value: EBranchStatus.CLOSED, label: 'Đã đóng cửa' },
              { value: EBranchStatus.FULL, label: 'Hết sân' },
              { value: EBranchStatus.OPEN, label: 'Đang mở' },
              { value: EBranchStatus.UNDER_MAINTENANCE, label: 'Đang sửa chữa' }
            ]}
          />
        </Form.Item>
        <div className='flex justify-end gap-3'>
          <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
          <Button htmlType='submit' onClick={() => handleCreateBranch()} type='primary' loading={isLoading}>
            Tạo
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
