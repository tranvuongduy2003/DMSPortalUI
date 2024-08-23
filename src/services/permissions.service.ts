import { httpRequest } from '@/axios-client'
import { IPermission, IRolePermission } from '@/interfaces'
import { UpdatePermissionByRolePayload, UpdatePermissionPayload } from '@/types'
import { IPermissionsService } from './contracts'

class PermissionsService implements IPermissionsService {
  private readonly apiPath = '/api/v1/permissions'

  // queries
  public getPermissions = () => {
    return httpRequest.get<IPermission[]>(`${this.apiPath}`)
  }

  public getPermissionsByRole = () => {
    return httpRequest.get<IRolePermission[]>(`${this.apiPath}/roles`)
  }

  // commands
  public updatePermission = (data: UpdatePermissionPayload) => {
    return httpRequest.put<UpdatePermissionPayload, IPermission[]>(`${this.apiPath}`, data)
  }

  public updatePermissionByRole = (data: UpdatePermissionByRolePayload) => {
    return httpRequest.put<UpdatePermissionByRolePayload, IRolePermission[]>(`${this.apiPath}/roles`, data)
  }
}

export const permissionsService = new PermissionsService()
