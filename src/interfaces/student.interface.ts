import { EStudentStatus } from '@/enums/student.enum'
import { EGender } from '@/enums/user.enum'
import { INote } from './note.interface'

export interface IStudent {
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
  numberOfClasses?: number
  notes: INote[]
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}
