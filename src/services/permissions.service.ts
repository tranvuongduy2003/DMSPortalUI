import { httpRequest } from '@/axios-client'
import { IPermission, IRolePermission } from '@/interfaces'
import { UpdatePermissionByRolePayload, UpdatePermissionPayload } from '@/types'
import { IPermissionsService } from './contracts'

class PermissionsService implements IPermissionsService {
  // queries
  getPermissions = () => {
    return httpRequest.get<IPermission[]>('/api/permissions')
  }

  getPermissionsByRole = () => {
    return httpRequest.get<IRolePermission[]>('/api/permissions/roles')
  }

  // commands
  updatePermission = (data: UpdatePermissionPayload) => {
    return httpRequest.put<UpdatePermissionPayload, IPermission[]>('/api/permissions', data)
  }
  updatePermissionByRole = (data: UpdatePermissionByRolePayload) => {
    return httpRequest.put<UpdatePermissionByRolePayload, IRolePermission[]>('/api/permissions/roles', data)
  }
}

export const permissionsService = new PermissionsService()
