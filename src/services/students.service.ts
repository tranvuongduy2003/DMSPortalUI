import { httpRequest } from '@/axios-client'
import { IStudent, IPagination, IPaginationFilter } from '@/interfaces'
import { CreateStudentRequest, UpdateStudentRequest } from '@/types'
import { IStudentsService } from './contracts'

class StudentsService implements IStudentsService {
  private readonly apiPath = '/api/v1/students'

  public getStudents = (filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IStudent>>(`${this.apiPath}`, {
      params: filter
    })
  }

  public getStudentById = (studentId: string) => {
    return httpRequest.get<IStudent>(`${this.apiPath}/${studentId}`)
  }

  public createStudent = (request: CreateStudentRequest) => {
    return httpRequest.post<CreateStudentRequest, IStudent>(`${this.apiPath}`, request)
  }

  public updateStudent = (studentId: string, request: UpdateStudentRequest) => {
    return httpRequest.put<UpdateStudentRequest, void>(`${this.apiPath}/${studentId}`, request)
  }

  public deleteStudent = (studentId: string) => {
    return httpRequest.delete<void>(`${this.apiPath}/${studentId}`)
  }
}

export const studentsService = new StudentsService()
