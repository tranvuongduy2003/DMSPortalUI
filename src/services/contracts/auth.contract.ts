import { ForgotPasswordPayload, ResetPasswordPayload } from '@/types/auth.type'
import { IResponse, IToken, IUser } from '@/interfaces'
import { LoginPayload, RefreshTokenPayload } from '@/types'

export interface IAuthService {
  login: (data: LoginPayload) => Promise<IResponse<IToken>>
  logout: () => Promise<IResponse<any>>
  refreshToken: (data: RefreshTokenPayload) => Promise<IResponse<IToken>>
  forgotPassword: (data: ForgotPasswordPayload) => Promise<IResponse<any>>
  resetPassword: (data: ResetPasswordPayload) => Promise<IResponse<any>>
  getProfile: () => Promise<IResponse<IUser>>
}
