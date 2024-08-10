export type LoginPayload = {
  username: string
  password: string
}

export type RefreshTokenPayload = {
  refreshToken: string
}

export type ForgotPasswordPayload = {
  email: string
  hostUrl: string
}

export type ForgotPasswordParams = {
  token: string
  email: string
}

export type ResetPasswordPayload = {
  email: string
  resetCode: string
  newPassword: string
}
