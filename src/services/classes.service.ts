import { httpRequest } from '@/axios-client'
import { IClass, IPagination, IPaginationFilter } from '@/interfaces'
import { CreateClassRequest, UpdateClassRequest } from '@/types'
import { IClassesService } from './contracts'

class ClassesService implements IClassesService {
  private readonly apiPath = '/api/v1/classes'

  public getClasses = (filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IClass>>(`${this.apiPath}`, {
      params: filter
    })
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
