import { EGender, EStudentStatus } from '@/enums'
import { CreateNoteRequest } from './note.type'

export type CreateStudentRequest = {
  fullName: string
  phoneNumber?: string
  dob: Date
  address: string
  gender?: EGender
  height?: number
  weight?: number
  favouritePosition?: string
  fatherFullName?: string
  fatherBirthYear?: number
  fatherAddress?: string
  fatherPhoneNumber?: string
  fatherEmail?: string
  motherFullName?: string
  motherBirthYear?: number
  motherAddress?: string
  motherPhoneNumber?: string
  motherEmail?: string
  status: EStudentStatus
  note?: CreateNoteRequest
}

export type UpdateStudentRequest = {
  id: string
  fullName: string
  phoneNumber?: string
  dob: Date
  address: string
  gender?: EGender
  height?: number
  weight?: number
  favouritePosition?: string
  fatherFullName?: string
  fatherBirthYear?: number
  fatherAddress?: string
  fatherPhoneNumber?: string
  fatherEmail?: string
  motherFullName?: string
  motherBirthYear?: number
  motherAddress?: string
  motherPhoneNumber?: string
  motherEmail?: string
  status: EStudentStatus
}
