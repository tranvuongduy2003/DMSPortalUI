import { EClassStatus } from '@/enums'

export type CreateClassRequest = {
  name: string
  pitchId: string
  status: EClassStatus
}

export type UpdateClassRequest = {
  id: string
  name: string
  status: EClassStatus
}
