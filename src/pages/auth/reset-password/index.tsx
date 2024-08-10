import { PASSWORD_REGEX } from '@/constants/regex'
import { authService } from '@/services'
import { isNullOrEmpty } from '@/utils'
import { Button, Form, Input, notification, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = location.search.split('&')
  const token = params[0].split('=')[1]
  const email = params[1].split('=')[1]
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = useForm<{ newPassword: string }>()

  async function handleForgotPasswordAsync({ newPassword }: { newPassword: string }) {
    setIsLoading(true)
    if (isNullOrEmpty(email) || isNullOrEmpty(token)) notification.error({ message: 'Đường dẫn không hợp lệ' })

    try {
      await authService.resetPassword({
        email: email ?? '',
        resetCode: token ?? '',
        newPassword: newPassword ?? ''
      })
      notification.success({
        message: 'Đặt lại mật khẩu thành công!',
        onClose: () => navigate('/login')
      })
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      notification.error({
        message: error
      })
    }
  }

  return (
    <div className='relative flex flex-col items-center justify-center w-full min-h-screen p-16'>
      <img
        src='/login-background.jpg'
        alt='login-background'
        className='absolute top-0 left-0 z-0 object-cover w-full h-full brightness-50'
      />
      <div className='py-8 px-16 rounded-lg w-[600px] relative z-10 overflow-hidden shadow-slate-700 shadow-2xl'>
        <div className='absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-white/30 -z-10'></div>
        <div className='flex flex-col items-center justify-center w-full mb-8'>
          <Typography.Title className='!text-white'>DMS Portal</Typography.Title>
          <Typography.Title className='!text-white' style={{ margin: 0 }} level={2}>
            Đặt lại mật khẩu
          </Typography.Title>
        </div>
        <Form size='large' form={form} onFinish={handleForgotPasswordAsync} autoComplete='off'>
          <Form.Item
            name='newPassword'
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới' },
              {
                min: 8,
                message: 'Mật khẩu phải có ít nhất 8 kí tự'
              },
              {
                pattern: PASSWORD_REGEX.upperCase,
                message: 'Mật khẩu phải có ít nhất một kí tự in hoa'
              },
              {
                pattern: PASSWORD_REGEX.lowerCase,
                message: 'Mật khẩu phải có ít nhất một kí tự in hoa'
              },
              {
                pattern: PASSWORD_REGEX.number,
                message: 'Mật khẩu phải có ít nhất một chữ số'
              },
              {
                pattern: PASSWORD_REGEX.specialCharacter,
                message: 'Mật khẩu phải có ít nhất một kí tự đặc biệt'
              }
            ]}
          >
            <Input
              type='password'
              placeholder='Nhập mật khẩu mới của bạn'
              className='!border-none backdrop-blur-xl bg-white/30 hover:bg-white/30 hover:!border-none focus:bg-white/30 focus:!border-none text-white rounded-full px-4 py-3 placeholder:text-slate-200'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' loading={isLoading} htmlType='submit' className='w-full border-none rounded-full'>
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
