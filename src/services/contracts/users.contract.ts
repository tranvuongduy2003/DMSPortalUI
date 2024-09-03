import { IPaginationFilter, IResponse, IPagination, IUser } from '@/interfaces'
import { CreateUserRequest, UpdateUserRequest } from '@/types'

export interface IUsersService {
  getUsers: (filter?: Partial<IPaginationFilter>) => Promise<IResponse<IPagination<IUser>>>
  getUserById: (userId: string) => Promise<IResponse<IUser>>
  createUser: (request: CreateUserRequest) => Promise<IResponse<IUser>>
  updateUser: (userId: string, request: UpdateUserRequest) => Promise<IResponse>
  deleteUser: (userId: string) => Promise<IResponse>
}
