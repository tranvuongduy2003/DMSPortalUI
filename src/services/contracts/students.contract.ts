import { IPagination, IPaginationFilter, IResponse, IStudent } from '@/interfaces'
import { CreateStudentRequest, UpdateStudentRequest } from '@/types'

export interface IStudentsService {
  getStudents: (filter?: Partial<IPaginationFilter>) => Promise<IResponse<IPagination<IStudent>>>
  getStudentById: (studentId: string) => Promise<IResponse<IStudent>>
  createStudent: (request: CreateStudentRequest) => Promise<IResponse<IStudent>>
  updateStudent: (studentId: string, request: UpdateStudentRequest) => Promise<IResponse>
  deleteStudent: (studentId: string) => Promise<IResponse>
}
