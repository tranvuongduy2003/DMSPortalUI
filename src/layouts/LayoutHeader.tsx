import { AuthContext } from '@/contexts'
import { useAuthStore } from '@/stores'
import { Button } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useContext } from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export function LayoutHeader() {
  const navigate = useNavigate()

  const { profile } = useAuthStore((state) => state)
  const { logOut } = useContext(AuthContext)

  return (
    <Header style={{ backgroundColor: '#002140', paddingBlock: 12 }}>
      <div className='flex items-center justify-between w-full h-full'>
        <div className='flex items-center gap-4 cursor-pointer'>
          {/* <Image src='/logo.png' alt='logo' width={40} height={40} className='object-cover' preview={false} /> */}
          <h1 className='text-2xl font-bold text-white' onClick={() => navigate('/')}>
            DMS Portal
          </h1>
          <Button type='primary' className='!bg-green-600 ml-8' onClick={() => navigate('students/create')}>
            <BiPlusCircle />
            Đăng ký học viên mới
          </Button>
        </div>
        <div className='flex items-center gap-4'>
          <Button type='text' size='large' onClick={() => navigate('/profile')}>
            <div className='flex items-center gap-2 text-white'>
              <FaUserCircle className='text-2xl' />
              <span>Xin chào, {profile?.fullName}</span>
            </div>
          </Button>
          <Button type='text' size='large' onClick={logOut}>
            <IoLogOut className='text-2xl text-white' />
          </Button>
        </div>
      </div>
    </Header>
  )
}
