import { authService } from '@/services'
import { Button, Form, Input, notification, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'

export function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = useForm<{ email: string }>()

  async function handleForgotPasswordAsync({ email }: { email: string }) {
    setIsLoading(true)
    try {
      await authService.forgotPassword({
        email: email,
        hostUrl: `${window.location.origin}/auth/reset-password`
      })
      notification.success({
        message: 'Vui lòng kiểm tra email để đặt lại mật khẩu!'
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
            Quên mật khẩu
          </Typography.Title>
        </div>
        <Form size='large' form={form} onFinish={handleForgotPasswordAsync} autoComplete='off'>
          <Form.Item name='email'>
            <Input
              placeholder='Nhập email của bạn'
              className='!border-none backdrop-blur-xl bg-white/30 hover:bg-white/30 hover:!border-none focus:bg-white/30 focus:!border-none text-white rounded-full px-4 py-3 placeholder:text-slate-200'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' loading={isLoading} htmlType='submit' className='w-full border-none rounded-full'>
              Quên mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
