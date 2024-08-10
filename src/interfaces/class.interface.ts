import { EClassStatus } from '@/enums/class.enum'
import { IPitch } from './pitch.interface'

export interface IClass {
  id: string
  name: string
  pitchId: string
  status: EClassStatus
  numberOfStudents?: number
  pitch: IPitch
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}
