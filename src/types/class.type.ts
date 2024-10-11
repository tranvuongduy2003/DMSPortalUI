import { EClassStatus } from '@/enums'

export type CreateClassRequest = {
  name: string
  pitchId: string
  teacherId: string
  status: EClassStatus
}

export type UpdateClassRequest = {
  id: string
  name: string
  teacherId: string
  status: EClassStatus
}
