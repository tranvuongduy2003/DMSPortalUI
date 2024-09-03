import { EPitchStatus } from '@/enums'
import { IPitch } from '@/interfaces'
import { pitchesService } from '@/services'
import { UpdatePitchRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IUpdatePitchModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  pitch: IPitch
  refetch?: (() => Promise<void>) | null
}

export function UpdatePitchModal({ isModalOpen, setIsModalOpen, pitch, refetch }: IUpdatePitchModalProps) {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm<UpdatePitchRequest>()

  const handleInitializeForm = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleInitializeForm.current = async () => {
      form.setFieldsValue(pitch)
    }
    handleInitializeForm.current()
    ;() => {
      handleInitializeForm.current = null
    }
  }, [form, pitch])

  async function handleUpdatePitch() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const values = form.getFieldsValue()

      await pitchesService.updatePitch(pitch.id, values)

      refetch && refetch()

      notification.success({
        message: 'Cập nhật thông tin sân thành công!',
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
      title='Cập nhật sân'
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
          label={<span className='font-medium'>Tên sân</span>}
          rules={[
            { required: true, message: 'Tên sân không được bỏ trống' },
            {
              max: 50,
              message: 'Số kí tự không được vượt quá 50'
            }
          ]}
        >
          <Input placeholder='Nhập tên của sân' />
        </Form.Item>
        <Form.Item name='status' label={<span className='font-medium'>Trạng thái:</span>}>
          <Select
            placeholder='Chọn trạng thái'
            defaultValue={EPitchStatus.AVAILABLE}
            options={[
              { value: EPitchStatus.AVAILABLE, label: 'Sân trống' },
              { value: EPitchStatus.BUSY, label: 'Đang bận' },
              { value: EPitchStatus.CLOSED, label: 'Đã đóng cửa' },
              { value: EPitchStatus.RESERVED, label: 'Đã được đặt' },
              { value: EPitchStatus.UNDER_MAINTENANCE, label: 'Đang sửa chữa' }
            ]}
          />
        </Form.Item>
        <div className='flex justify-end gap-3'>
          <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
          <Button htmlType='submit' onClick={() => handleUpdatePitch()} type='primary' loading={isLoading}>
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
