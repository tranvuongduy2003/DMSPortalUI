import axios, { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { authExtensions, isNullOrEmpty } from '@/utils'
import { authService } from '@/services'
import { IResponse } from '@/interfaces'
import { notification } from 'antd'

const requestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json'
  }
}

export type IConfig = AxiosRequestConfig

export const axiosInstance = axios.create(requestConfig)

async function middlewareRefresh(error: AxiosError) {
  try {
    const refreshToken = authExtensions.getRefreshToken()
    if (isNullOrEmpty(refreshToken)) {
      const { data } = await authService.refreshToken({
        refreshToken
      })
      authExtensions.setToken(data)
      if (error?.config?.headers) {
        error.config.headers.Authorization = `Bearer ${data.accessToken}`
      }
    }
  } catch (error) {
    authExtensions.logOut()
    window.location.replace('/login')
    return
  }

  error?.config && axios(error.config)
}

export default function initRequest() {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = authExtensions.getAccessToken()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error.response?.data)
    }
  )

  axiosInstance.interceptors.response.use(
    (res) => {
      return res.data
    },
    async (error: AxiosError<IResponse<any>>) => {
      const statusCode = error.response?.status
      const message = error.response?.data?.message

      switch (statusCode) {
        case 401: {
          if (message === 'invalid_token') {
            middlewareRefresh(error)
          } else if (message === 'invalid_refresh_token') {
            authExtensions.logOut()
          }
          break
        }
        case 403: {
          notification.error({
            message: 'Bạn không có quyển sử dụng chức năng này'
          })
          break
        }
        case 500: {
          break
        }
        default:
          break
      }
      return Promise.reject(error.response?.data)
    }
  )
}

initRequest()
