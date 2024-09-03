import { EGender } from '@/enums'

export type CreateUserRequest = {
  userName: string
  email: string
  phoneNumber: string
  fullName?: string
  dob?: Date
  gender?: EGender
  avatar?: string
  address?: string
  roles: string[]
}

export type UpdateUserRequest = CreateUserRequest & {
  id: string
}
