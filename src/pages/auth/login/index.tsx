import { AuthContext } from '@/contexts'
import { useAppStore } from '@/stores'
import { LoginPayload } from '@/types'
import { Button, Form, Input, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()
  const [form] = useForm<LoginPayload>()

  const { logIn } = useContext(AuthContext)

  const { isLoading } = useAppStore((state) => state)

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
            Đăng nhập
          </Typography.Title>
        </div>
        <Form size='large' form={form} onFinish={logIn} autoComplete='off'>
          <Form.Item name='username'>
            <Input
              placeholder='Nhập tên đăng nhập của bạn'
              className='!border-none backdrop-blur-xl bg-white/30 hover:bg-white/30 hover:!border-none focus:bg-white/30 focus:!border-none text-white rounded-full px-4 py-3 placeholder:text-slate-200'
            />
          </Form.Item>
          <Form.Item name='password'>
            <Input
              type='password'
              placeholder='Nhập mật khẩu của bạn'
              className='!border-none backdrop-blur-xl bg-white/30 hover:bg-white/30 hover:!border-none focus:bg-white/30 focus:!border-none text-white rounded-full px-4 py-3 placeholder:text-slate-200'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' loading={isLoading} htmlType='submit' className='w-full border-none rounded-full'>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <p
          className='text-center text-white cursor-pointer hover:text-slate-200'
          onClick={() => navigate('/auth/forgot-password')}
        >
          Quên mật khẩu ?
        </p>
      </div>
    </div>
  )
}
