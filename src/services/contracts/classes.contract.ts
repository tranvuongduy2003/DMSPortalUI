import { IPaginationFilter, IResponse, IPagination, IClass, IStudent } from '@/interfaces'
import { CreateClassRequest, UpdateClassRequest } from '@/types'

export interface IClassesService {
  getClasses: (filter?: Partial<IPaginationFilter>) => Promise<IResponse<IPagination<IClass>>>
  getStudentsByClassId: (
    classId: string,
    filter?: Partial<IPaginationFilter>
  ) => Promise<IResponse<IPagination<IStudent>>>
  getClassById: (classId: string) => Promise<IResponse<IClass>>
  createClass: (request: CreateClassRequest) => Promise<IResponse<IClass>>
  updateClass: (classId: string, request: UpdateClassRequest) => Promise<IResponse>
  deleteClass: (classId: string) => Promise<IResponse>
}
