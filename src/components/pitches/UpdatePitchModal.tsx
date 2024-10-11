import { EPitchStatus, PitchStatusMap } from '@/enums'
import { IBranch, IPitch } from '@/interfaces'
import { branchesService, pitchesService } from '@/services'
import { UpdatePitchRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select, Spin } from 'antd'
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
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false)
  const [branches, setBranches] = useState<IBranch[]>([])

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

      const { id, name, status } = values

      await pitchesService.updatePitch(pitch.id, { id, name, status })

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

  useEffect(() => {
    ;(async () => {
      setIsModalLoading(true)
      const { data } = await branchesService.getBranches({ takeAll: true })
      setBranches(data.items)
      setIsModalLoading(false)
    })()
  }, [])

  return (
    <Modal
      title='Cập nhật sân'
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
          <Form.Item name='id' className='hidden' />
          <Form.Item
            name='name'
            label={<span className='font-medium'>Tên sân:</span>}
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
          <Form.Item name='branchId' label={<span className='font-medium'>Chi nhánh:</span>}>
            <Select
              placeholder='Chọn chi nhánh'
              options={branches.map((branch) => ({ value: branch.id, label: branch.name }))}
              disabled
            />
          </Form.Item>
          <Form.Item name='numberOfClasses' label={<span className='font-medium'>Số lượng lớp học:</span>}>
            <Input disabled />
          </Form.Item>
          <Form.Item name='status' label={<span className='font-medium'>Trạng thái:</span>}>
            <Select
              placeholder='Chọn trạng thái'
              defaultValue={EPitchStatus.AVAILABLE}
              options={[
                { value: EPitchStatus.AVAILABLE, label: PitchStatusMap.get(EPitchStatus.AVAILABLE) },
                { value: EPitchStatus.BUSY, label: PitchStatusMap.get(EPitchStatus.BUSY) },
                { value: EPitchStatus.CLOSED, label: PitchStatusMap.get(EPitchStatus.CLOSED) },
                { value: EPitchStatus.RESERVED, label: PitchStatusMap.get(EPitchStatus.RESERVED) },
                { value: EPitchStatus.UNDER_MAINTENANCE, label: PitchStatusMap.get(EPitchStatus.UNDER_MAINTENANCE) }
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
      )}
    </Modal>
  )
}
