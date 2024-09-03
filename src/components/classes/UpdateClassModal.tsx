import { EClassStatus } from '@/enums'
import { IClass } from '@/interfaces'
import { classesService } from '@/services'
import { UpdateClassRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IUpdateClassModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  classData: IClass
  refetch?: (() => Promise<void>) | null
}

export function UpdateClassModal({ isModalOpen, setIsModalOpen, classData, refetch }: IUpdateClassModalProps) {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm<UpdateClassRequest>()

  const handleInitializeForm = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleInitializeForm.current = async () => {
      form.setFieldsValue(classData)
    }
    handleInitializeForm.current()
    ;() => {
      handleInitializeForm.current = null
    }
  }, [form, classData])

  async function handleUpdateClass() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const values = form.getFieldsValue()

      await classesService.updateClass(classData.id, values)

      refetch && refetch()

      notification.success({
        message: 'Cập nhật thông tin lớp thành công!',
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
      title='Cập nhật lớp'
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
          <Button htmlType='submit' onClick={() => handleUpdateClass()} type='primary' loading={isLoading}>
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
