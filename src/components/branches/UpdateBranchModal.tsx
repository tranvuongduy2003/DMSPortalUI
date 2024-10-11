import { BranchStatusMap, EBranchStatus } from '@/enums'
import { IBranch, IPitchGroup, IUser } from '@/interfaces'
import { branchesService, pitchGroupsService, usersService } from '@/services'
import { UpdateBranchRequest } from '@/types'
import { Button, Form, Input, Modal, notification, Select, Spin } from 'antd'
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

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false)
  const [pitchGroups, setPitchGroups] = useState<IPitchGroup[]>([])
  const [managers, setManagers] = useState<IUser[]>([])

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

      const { name, address, status, id, managerId } = values

      await branchesService.updateBranch(branch.id, { name, address, status, managerId, id })

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

  useEffect(() => {
    ;(async () => {
      setIsModalLoading(true)
      await Promise.all([
        pitchGroupsService.getPitchGroups({ takeAll: true }).then(({ data }) => setPitchGroups(data.items)),
        usersService.getUsers({ takeAll: true }).then(({ data }) => setManagers(data.items))
      ])
      setIsModalLoading(false)
    })()
  }, [])

  return (
    <Modal
      title='Cập nhật chi nhánh'
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
            label={<span className='font-medium'>Tên chi nhánh:</span>}
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
            label={<span className='font-medium'>Địa chỉ chi nhánh:</span>}
            rules={[{ required: true, message: 'Địa chỉ chi nhánh không được bỏ trống' }]}
          >
            <Input placeholder='Nhập địa chỉ của chi nhánh' />
          </Form.Item>
          <Form.Item
            name='pitchGroupId'
            rules={[{ required: true, message: 'Cụm sân không được bỏ trống' }]}
            label={<span className='font-medium'>Cụm sân:</span>}
          >
            <Select
              placeholder='Chọn cụm sân'
              options={pitchGroups.map((pitchGroup) => ({ value: pitchGroup.id, label: pitchGroup.name }))}
              disabled
            />
          </Form.Item>
          <Form.Item
            name='managerId'
            rules={[{ required: true, message: 'Người quản lý không được bỏ trống' }]}
            label={<span className='font-medium'>Người quản lý:</span>}
          >
            <Select
              placeholder='Chọn người quản lý'
              options={managers.map((manager) => ({ value: manager.id, label: manager.fullName }))}
            />
          </Form.Item>
          <Form.Item name='numberOfPitches' label={<span className='font-medium'>Số lượng sân:</span>}>
            <Input disabled />
          </Form.Item>
          <Form.Item name='status' label={<span className='font-medium'>Trạng thái:</span>}>
            <Select
              placeholder='Chọn trạng thái'
              defaultValue={EBranchStatus.CLOSED}
              options={[
                { value: EBranchStatus.CLOSED, label: BranchStatusMap.get(EBranchStatus.CLOSED) },
                { value: EBranchStatus.FULL, label: BranchStatusMap.get(EBranchStatus.FULL) },
                { value: EBranchStatus.OPEN, label: BranchStatusMap.get(EBranchStatus.OPEN) },
                { value: EBranchStatus.UNDER_MAINTENANCE, label: BranchStatusMap.get(EBranchStatus.UNDER_MAINTENANCE) }
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
      )}
    </Modal>
  )
}
