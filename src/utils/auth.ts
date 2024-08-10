import { IToken } from '@/interfaces'
import { useAppStore, useAuthStore } from '@/stores'

class AuthExtensions {
  logOut = () => {
    const setIsLoading = useAppStore.getState().setIsLoading
    const reset = useAuthStore.getState().reset

    setIsLoading(true)
    reset()

    setIsLoading(false)
  }

  setToken = (token: IToken) => {
    useAuthStore.setState({
      token: token
    })
  }

  getAccessToken = () => {
    const token = useAuthStore.getState().token?.accessToken ?? ''
    return token
  }

  getRefreshToken = () => {
    const token = useAuthStore.getState().token?.refreshToken ?? ''
    return token
  }
}

export const authExtensions = new AuthExtensions()
