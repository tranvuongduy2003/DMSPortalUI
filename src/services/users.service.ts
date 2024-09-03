import { httpRequest } from '@/axios-client'
import { IUser, IPagination, IPaginationFilter } from '@/interfaces'
import { CreateUserRequest, UpdateUserRequest } from '@/types'
import { IUsersService } from './contracts'

class UsersService implements IUsersService {
  private readonly apiPath = '/api/v1/users'

  public getUsers = (filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IUser>>(`${this.apiPath}`, {
      params: filter
    })
  }

  public getUserById = (UserId: string) => {
    return httpRequest.get<IUser>(`${this.apiPath}/${UserId}`)
  }

  public createUser = (request: CreateUserRequest) => {
    return httpRequest.post<CreateUserRequest, IUser>(`${this.apiPath}`, request)
  }

  public updateUser = (UserId: string, request: UpdateUserRequest) => {
    return httpRequest.put<UpdateUserRequest, void>(`${this.apiPath}/${UserId}`, request)
  }

  public deleteUser = (UserId: string) => {
    return httpRequest.delete<void>(`${this.apiPath}/${UserId}`)
  }
}

export const usersService = new UsersService()
