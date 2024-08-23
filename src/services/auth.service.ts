import { httpRequest } from '@/axios-client'
import { IToken, IUser } from '@/interfaces'
import { ForgotPasswordPayload, LoginPayload, RefreshTokenPayload, ResetPasswordPayload } from '@/types'
import { IAuthService } from './contracts'

class AuthService implements IAuthService {
  private readonly apiPath = '/api/v1/auth'

  public login = (data: LoginPayload) => {
    return httpRequest.post<LoginPayload, IToken>(`${this.apiPath}/signin`, data)
  }

  public logout = () => {
    return httpRequest.post<any, any>(`${this.apiPath}/logout`, {})
  }

  public refreshToken = (data: RefreshTokenPayload) => {
    return httpRequest.post<RefreshTokenPayload, IToken>(`${this.apiPath}/refresh-token`, data)
  }

  public forgotPassword = (data: ForgotPasswordPayload) => {
    return httpRequest.post<ForgotPasswordPayload, any>(`${this.apiPath}/forgot-password`, data)
  }

  public resetPassword = (data: ResetPasswordPayload) => {
    return httpRequest.post<ResetPasswordPayload, any>(`${this.apiPath}/reset-password`, data)
  }

  public getProfile = () => {
    return httpRequest.get<IUser>(`${this.apiPath}/profile`)
  }
}

export const authService = new AuthService()
