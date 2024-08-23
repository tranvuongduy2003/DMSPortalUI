import { httpRequest } from '@/axios-client'
import { IClass, IPagination, IPaginationFilter, IStudent } from '@/interfaces'
import { CreateClassRequest, UpdateClassRequest } from '@/types'
import { IClassesService } from './contracts'

class ClassesService implements IClassesService {
  private readonly apiPath = '/api/v1/classes'

  public getClasses = (filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IClass>>(`${this.apiPath}`, {
      params: filter
    })
  }

  public getStudentsByClassId = (classId: string, filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IStudent>>(`${this.apiPath}/${classId}/students`, {
      params: filter
    })
  }

  public getClassById = (classId: string) => {
    return httpRequest.get<IClass>(`${this.apiPath}/${classId}`)
  }

  public createClass = (request: CreateClassRequest) => {
    return httpRequest.post<CreateClassRequest, IClass>(`${this.apiPath}`, request)
  }

  public updateClass = (classId: string, request: UpdateClassRequest) => {
    return httpRequest.put<UpdateClassRequest, void>(`${this.apiPath}/${classId}`, request)
  }

  public deleteClass = (classId: string) => {
    return httpRequest.delete<void>(`${this.apiPath}/${classId}`)
  }
}

export const classesService = new ClassesService()
