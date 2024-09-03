import { EBranchStatus } from '@/enums'
import { IBranch } from '@/interfaces'
import { branchesService } from '@/services'
import { useAuthStore } from '@/stores'
import { UpdateBranchRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IUpdateBranchModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  branch: IBranch
  refetch?: (() => Promise<void>) | null
}

export function UpdateBranchModal({ isModalOpen, setIsModalOpen, branch, refetch }: IUpdateBranchModalProps) {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.profile)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm<UpdateBranchRequest>()

  const handleInitializeForm = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleInitializeForm.current = async () => {
      form.setFieldsValue(branch)
    }
    handleInitializeForm.current()
    ;() => {
      handleInitializeForm.current = null
    }
  }, [form, branch])

  async function handleUpdateBranch() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const values = form.getFieldsValue()

      const { name, address, status, id } = values

      await branchesService.updateBranch(branch.id, { name, address, status, managerId: user?.id ?? '', id })

      refetch && refetch()

      notification.success({
        message: 'Cập nhật thông tin chi nhánh thành công!',
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
      title='Cập nhật chi nhánh'
      onCancel={() => setIsModalOpen(false)}
      open={isModalOpen}
      footer={[null, null]}
      destroyOnClose={true}
      afterClose={form.resetFields}
    >
      <Form form={form} size='large' autoComplete='off' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <Form.Item name='id' className='hidden' />
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
          <Button htmlType='submit' onClick={() => handleUpdateBranch()} type='primary' loading={isLoading}>
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
