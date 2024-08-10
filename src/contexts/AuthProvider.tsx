import { IResponse } from '@/interfaces'
import { authService } from '@/services'
import { useAppStore, useAuthStore } from '@/stores'
import { LoginPayload } from '@/types'
import { notification } from 'antd'
import React, { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

export interface AuthContextProps {
  logIn: (payload: LoginPayload) => Promise<void>
  logOut: () => void
}

export const AuthContext = React.createContext<Partial<AuthContextProps>>({})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate()

  const { setIsLoading } = useAppStore((state) => state)
  const { setToken, setLoggedIn, setProfile } = useAuthStore((state) => state)

  const logIn = async (payload: LoginPayload) => {
    setIsLoading(true)
    try {
      const { data } = await authService.login(payload)

      setToken(data)
      setLoggedIn(true)

      const { data: profileData } = await authService.getProfile()
      setProfile(profileData)

      setIsLoading(false)
      notification.success({
        message: 'Đăng nhập thành công!',
        duration: 0.25,
        onClose: () => navigate('/')
      })
    } catch (error: unknown) {
      setIsLoading(false)
      console.log('🚀 ~ logIn ~ error:', error)
      notification.error({
        message: (error as IResponse<unknown>).message
      })
    }
  }

  const logOut = () => {
    authService.logout()
    setToken({
      accessToken: '',
      refreshToken: ''
    })
    setProfile(null)
    setLoggedIn(false)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  )
}
