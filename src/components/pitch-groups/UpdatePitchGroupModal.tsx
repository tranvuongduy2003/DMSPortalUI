import { EPitchGroupStatus, PitchGroupStatusMap } from '@/enums'
import { IPitchGroup } from '@/interfaces'
import { pitchGroupsService } from '@/services'
import { UpdatePitchGroupRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select } from 'antd'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface IUpdatePitchGroupModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  pitchGroup: IPitchGroup
  refetch?: (() => Promise<void>) | null
}

export function UpdatePitchGroupModal({
  isModalOpen,
  setIsModalOpen,
  pitchGroup,
  refetch
}: IUpdatePitchGroupModalProps) {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm<UpdatePitchGroupRequest>()

  const handleInitializeForm = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleInitializeForm.current = async () => {
      form.setFieldsValue(pitchGroup)
    }
    handleInitializeForm.current()
    ;() => {
      handleInitializeForm.current = null
    }
  }, [form, pitchGroup])

  async function handleUpdatePitchGroup() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const { id, name, status } = form.getFieldsValue()

      await pitchGroupsService.updatePitchGroup(pitchGroup.id, { id, name, status })

      refetch && refetch()

      notification.success({
        message: 'Cập nhật thông tin cụm sân thành công!',
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
      title='Cập nhật cụm sân'
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
          label={<span className='font-medium'>Tên cụm sân:</span>}
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
        <Form.Item name='numberOfBranches' label={<span className='font-medium'>Số lượng chi nhánh:</span>}>
          <Input disabled />
        </Form.Item>
        <Form.Item name='status' label={<span className='font-medium'>Trạng thái:</span>}>
          <Select
            placeholder='Chọn trạng thái'
            defaultValue={EPitchGroupStatus.AVAILABLE}
            options={[
              { value: EPitchGroupStatus.AVAILABLE, label: PitchGroupStatusMap.get(EPitchGroupStatus.AVAILABLE) },
              { value: EPitchGroupStatus.FULL, label: PitchGroupStatusMap.get(EPitchGroupStatus.FULL) },
              { value: EPitchGroupStatus.INACTIVE, label: PitchGroupStatusMap.get(EPitchGroupStatus.INACTIVE) }
            ]}
          />
        </Form.Item>
        <div className='flex justify-end gap-3'>
          <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
          <Button htmlType='submit' onClick={() => handleUpdatePitchGroup()} type='primary' loading={isLoading}>
            Cập nhật
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
