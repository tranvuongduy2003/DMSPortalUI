import { httpRequest } from '@/axios-client'
import { IToken, IUser } from '@/interfaces'
import { ForgotPasswordPayload, LoginPayload, RefreshTokenPayload, ResetPasswordPayload } from '@/types'
import { IAuthService } from './contracts'

class AuthService implements IAuthService {
  login = (data: LoginPayload) => {
    return httpRequest.post<LoginPayload, IToken>('/api/auth/signin', data)
  }
  logout = () => {
    return httpRequest.post<any, any>('/api/auth/logout', {})
  }
  refreshToken = (data: RefreshTokenPayload) => {
    return httpRequest.post<RefreshTokenPayload, IToken>('/api/auth/refresh-token', data)
  }
  forgotPassword = (data: ForgotPasswordPayload) => {
    return httpRequest.post<ForgotPasswordPayload, any>('/api/auth/forgot-password', data)
  }
  resetPassword = (data: ResetPasswordPayload) => {
    return httpRequest.post<ResetPasswordPayload, any>('/api/auth/reset-password', data)
  }
  getProfile = () => {
    return httpRequest.get<IUser>('/api/auth/profile')
  }
}

export const authService = new AuthService()
