import { IFunction, IRolePermission } from '@/interfaces'
import { functionsService, permissionsService } from '@/services'
import { Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { RolePermissionsTable } from './table'

export function RolePermissions() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rolePermissions, setRolePermissions] = useState<IRolePermission[]>([])
  const [functions, setFunctions] = useState<IFunction[]>([])

  const handleFetchRolePermissions = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchRolePermissions.current = async () => {
      setIsLoading(true)
      try {
        await Promise.all([
          permissionsService.getPermissionsByRole().then(({ data }) => setRolePermissions(data)),
          functionsService.getFunctions().then(({ data }) => setFunctions(data))
        ])
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    handleFetchRolePermissions.current()
    return () => {
      handleFetchRolePermissions.current = null
    }
  }, [])

  return isLoading ? (
    <div className='flex items-center justify-center w-full'>
      <Spin spinning={isLoading} size='large' />
    </div>
  ) : (
    <RolePermissionsTable permissions={rolePermissions ?? []} functions={functions ?? []} />
  )
}
