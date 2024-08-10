import { EGender, EUserStatus } from '@/enums'

export interface IUser {
  id: string
  userName: string
  fullName?: string
  email: string
  phoneNumber: string
  dob?: Date
  gender?: EGender
  avatar?: string
  address?: string
  status: EUserStatus
  roles: string[]
  createdAt: Date
  deletedAt?: Date
  updatedAt?: Date
}
