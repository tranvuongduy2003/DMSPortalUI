import { AxiosInstance } from 'axios'
import { axiosInstance, IConfig } from './initRequest'
import { IResponse } from '@/interfaces'

class HttpRequest {
  api: AxiosInstance

  constructor() {
    this.api = axiosInstance
  }

  async get<TData>(url: string, config?: IConfig) {
    return this.api.get<IResponse<TData>, IResponse<TData>>(url, config)
  }

  async post<TPayload, TData>(url: string, data: TPayload, config?: IConfig) {
    return this.api.post<IResponse<TData>, IResponse<TData>>(url, data, config)
  }

  async put<TPayload, TData>(url: string, data: TPayload, config?: IConfig) {
    return this.api.put<IResponse<TData>, IResponse<TData>>(url, data, config)
  }

  async patch<TPayload, TData>(url: string, data?: TPayload, config?: IConfig) {
    return this.api.patch<IResponse<TData>, IResponse<TData>>(url, data, config)
  }

  async delete<TData>(url: string, config?: IConfig) {
    return this.api.delete<IResponse<TData>, IResponse<TData>>(url, config)
  }
}

export const httpRequest = new HttpRequest()
