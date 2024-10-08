import { IFunction, IRolePermission } from '@/interfaces'
import { functionsService, permissionsService } from '@/services'
import { useAppStore } from '@/stores'
import { useEffect, useRef, useState } from 'react'
import { RolePermissionsTable } from './table'

export function RolePermissions() {
  const setLoading = useAppStore((state) => state.setIsLoading)

  const [rolePermissions, setRolePermissions] = useState<IRolePermission[]>([])
  const [functions, setFunctions] = useState<IFunction[]>([])

  const handleFetchRolePermissions = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchRolePermissions.current = async () => {
      setLoading(true)
      try {
        await Promise.all([
          permissionsService.getPermissionsByRole().then(({ data }) => setRolePermissions(data)),
          functionsService.getFunctions().then(({ data }) => setFunctions(data))
        ])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    handleFetchRolePermissions.current()
    return () => {
      handleFetchRolePermissions.current = null
    }
  }, [])

  return <RolePermissionsTable permissions={rolePermissions ?? []} functions={functions ?? []} />
}
