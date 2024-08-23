import { EGender } from '@/enums'
import { studentsService } from '@/services'
import { CreateStudentRequest } from '@/types'
import { Button, DatePicker, Form, Input, notification, Select, Space, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ICreateStudentPageProps {}

export function CreateStudentPage() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm<CreateStudentRequest>()

  async function handleUpdateUser() {
    setIsLoading(true)
    try {
      await form.validateFields()

      const values = form.getFieldsValue()
      const { dob, note, ...rest } = values

      const request: CreateStudentRequest = {
        ...rest,
        dob: (dob as any).format('YYYY-MM-DD'),
        note: {
          content: note as string
        }
      }

      await studentsService.createStudent(request)

      notification.success({
        message: 'Tạo học viên mới thành công!',
        duration: 0.5,
        onClose: () => navigate('/students')
      })
      setIsLoading(false)
    } catch (error: any) {
      notification.error({
        message: error.message
      })
      setIsLoading(false)
    }
  }

  return (
    <Space size='large' direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={2}>Quản lý học viên</Typography.Title>
      <Typography.Title level={3}>Đăng ký học viên mới</Typography.Title>

      <Form form={form} size='middle' autoComplete='off' labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
        <div className='px-8 py-6 border border-solid rounded-md'>
          <Typography.Title level={4}>Thông tin cơ bản</Typography.Title>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <Form.Item
                name='fullName'
                label={<span className='font-medium'>Họ và tên:</span>}
                rules={[
                  { required: true, message: 'Họ và tên không được để trống' },
                  {
                    max: 50,
                    message: 'Số kí tự không được vượt quá 50'
                  }
                ]}
              >
                <Input placeholder='Nhập họ và tên học viên' />
              </Form.Item>
              <Form.Item name='phoneNumber' label={<span className='font-medium'>Số điện thoại:</span>}>
                <Input placeholder='Nhập số điện thoại học viên' />
              </Form.Item>
              <Form.Item
                name='dob'
                rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}
                label={<span className='font-medium'>Ngày sinh</span>}
              >
                <DatePicker
                  placeholder='Chọn ngày sinh'
                  className='w-full'
                  format={'DD/MM/YYYY'}
                  onChange={(date) => form.setFieldValue('dob', date)}
                  maxDate={dayjs(new Date())}
                />
              </Form.Item>
              <Form.Item
                name='address'
                label={<span className='font-medium'>Địa chỉ:</span>}
                rules={[
                  { required: true, message: 'Địa chỉ không được để trống' },
                  {
                    max: 255,
                    message: 'Số kí tự không được vượt quá 255'
                  }
                ]}
              >
                <Input placeholder='Nhập địa chỉ của học viên' />
              </Form.Item>
            </div>
            <div>
              <Form.Item name='gender' label={<span className='font-medium'>Giới tính:</span>}>
                <Select
                  placeholder='Chọn giới tính'
                  defaultValue={EGender.MALE}
                  options={[
                    { value: EGender.MALE, title: 'Nam' },
                    { value: EGender.FEMALE, title: 'Nữ' },
                    { value: EGender.OTHER, title: 'Khác' }
                  ]}
                />
              </Form.Item>
              <Form.Item name='height' label={<span className='font-medium'>Chiều cao (cm):</span>}>
                <Input type='number' min={0} max={300} placeholder='Nhập chiều cao của học viên' />
              </Form.Item>
              <Form.Item name='weight' label={<span className='font-medium'>Cân nặng (kg):</span>}>
                <Input type='number' min={0} max={300} placeholder='Nhập cân nặng của học viên' />
              </Form.Item>
              <Form.Item name='favouritePosition' label={<span className='font-medium'>Vị trí yêu thích:</span>}>
                <Input placeholder='Nhập vị trí yêu thích của học viên' />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className='px-8 py-6 mt-4 border border-solid rounded-md'>
          <Typography.Title level={4}>Thông tin phụ huynh</Typography.Title>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <Form.Item
                name='fatherFullName'
                label={<span className='font-medium'>Họ và tên bố:</span>}
                rules={[
                  {
                    max: 50,
                    message: 'Số kí tự không được vượt quá 50'
                  }
                ]}
              >
                <Input placeholder='Nhập họ và tên bố' />
              </Form.Item>
              <Form.Item name='fatherBirthYear' label={<span className='font-medium'>Năm sinh của bố:</span>}>
                <Input type='number' min={1000} max={new Date().getFullYear()} placeholder='Nhập năm sinh của bố' />
              </Form.Item>
              <Form.Item
                name='fatherAddress'
                label={<span className='font-medium'>Địa chỉ của bố:</span>}
                rules={[
                  {
                    max: 255,
                    message: 'Số kí tự không được vượt quá 255'
                  }
                ]}
              >
                <Input placeholder='Nhập địa chỉ của bố' />
              </Form.Item>
              <Form.Item name='fatherPhoneNumber' label={<span className='font-medium'>Số điện thoại của bố:</span>}>
                <Input placeholder='Nhập số điện thoại của bố' />
              </Form.Item>
              <Form.Item
                name='fatherEmail'
                label={<span className='font-medium'>Email của bố:</span>}
                rules={[{ type: 'email', message: 'Không đúng định dạng' }]}
              >
                <Input type='email' placeholder='Nhập email của bố' />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name='motherFullName'
                label={<span className='font-medium'>Họ và tên mẹ:</span>}
                rules={[
                  {
                    max: 50,
                    message: 'Số kí tự không được vượt quá 50'
                  }
                ]}
              >
                <Input placeholder='Nhập họ và tên mẹ' />
              </Form.Item>
              <Form.Item name='motherBirthYear' label={<span className='font-medium'>Năm sinh của mẹ:</span>}>
                <Input type='number' min={1000} max={new Date().getFullYear()} placeholder='Nhập năm sinh của mẹ' />
              </Form.Item>
              <Form.Item
                name='motherAddress'
                label={<span className='font-medium'>Địa chỉ của mẹ:</span>}
                rules={[
                  {
                    max: 255,
                    message: 'Số kí tự không được vượt quá 255'
                  }
                ]}
              >
                <Input placeholder='Nhập địa chỉ của mẹ' />
              </Form.Item>
              <Form.Item name='motherPhoneNumber' label={<span className='font-medium'>Số điện thoại của mẹ:</span>}>
                <Input placeholder='Nhập số điện thoại của mẹ' />
              </Form.Item>
              <Form.Item
                name='motherEmail'
                label={<span className='font-medium'>Email của mẹ:</span>}
                rules={[{ type: 'email', message: 'Không đúng định dạng' }]}
              >
                <Input type='email' placeholder='Nhập email của mẹ' />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className='px-8 py-6 mt-4 border border-solid rounded-md'>
          <Form.Item
            name='note'
            label={<Typography.Title level={4}>Ghi chú</Typography.Title>}
            rules={[
              {
                max: 1000,
                message: 'Số kí tự không được vượt quá 1000'
              }
            ]}
          >
            <TextArea placeholder='Nhập ghi chú' autoSize={false} rows={6} maxLength={1000} />
          </Form.Item>
        </div>
        <div className='flex justify-center my-4'>
          <Button htmlType='submit' size='large' onClick={handleUpdateUser} type='primary' loading={isLoading}>
            Đăng ký
          </Button>
        </div>
      </Form>
    </Space>
  )
}
