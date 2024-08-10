import { IStudent } from './student.interface'

export interface INote {
  id: string
  content: string
  studentId: string
  student?: IStudent
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}
