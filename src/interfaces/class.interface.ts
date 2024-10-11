import { EClassStatus } from '@/enums/class.enum'
import { IPitch } from './pitch.interface'
import { IUser } from './user.interface'

export interface IClass {
  id: string
  name: string
  pitchId: string
  teacherId: string
  status: EClassStatus
  numberOfStudents?: number
  pitch: IPitch
  teacher: IUser
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}
