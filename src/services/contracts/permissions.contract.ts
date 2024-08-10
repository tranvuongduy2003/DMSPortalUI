import { IResponse, IPermission, IRolePermission } from '@/interfaces'
import { UpdatePermissionByRolePayload, UpdatePermissionPayload } from '@/types'

export interface IPermissionsService {
  // queries
  getPermissions: () => Promise<IResponse<IPermission[]>>
  getPermissionsByRole: () => Promise<IResponse<IRolePermission[]>>

  // commands
  updatePermission: (data: UpdatePermissionPayload) => Promise<IResponse<IPermission[]>>
  updatePermissionByRole: (data: UpdatePermissionByRolePayload) => Promise<IResponse<IRolePermission[]>>
}
