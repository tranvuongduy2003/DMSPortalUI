import { IUser } from '@/interfaces'
import { usersService } from '@/services'
import { useAppStore } from '@/stores'
import { notification } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

export function UserDetailsPages() {
  const { userId } = useParams()

  const setLoading = useAppStore((state) => state.setIsLoading)

  const [user, setUser] = useState<IUser>()

  const handleFetchUser = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchUser.current = async () => {
      setLoading(true)
      try {
        const { data } = await usersService.getUserById(userId!)
        setUser(data)
      } catch (error: any) {
        notification.error({ message: error?.message })
      } finally {
        setLoading(false)
      }
    }
    handleFetchUser.current()
  }, [userId])

  return <div>{JSON.stringify(user)}</div>
}
