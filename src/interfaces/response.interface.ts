import { EPageOrder } from '@/enums/pagination.enum'

export interface IResponse<T = any> {
  statusCode: number
  message: string
  data: T
  errors: string
}

export interface IPagination<T> {
  items: T
  metadata: IMetadata
}

export interface IMetadata {
  currentPage: number
  totalPages: number
  takeAll: boolean
  pageSize: number
  payloadSize: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

export interface IPaginationFilter {
  page: number
  size: number
  takeAll: boolean
  orderBy: string
  order: EPageOrder
  searchBy: string
  searchValue?: string
}
