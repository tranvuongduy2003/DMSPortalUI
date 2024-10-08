import { IPermission } from '@/interfaces'
import { permissionsService } from '@/services'
import { useAppStore } from '@/stores'
import { useEffect, useRef, useState } from 'react'
import PermissionsTable from './table/PermissionsTable'

export function GeneralPermissions() {
  const setLoading = useAppStore((state) => state.setIsLoading)

  const [permissions, setPermissions] = useState<IPermission[]>([])

  const handleFetchPermissions = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchPermissions.current = async () => {
      setLoading(true)
      try {
        const { data } = await permissionsService.getPermissions()
        setPermissions(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    handleFetchPermissions.current()
    return () => {
      handleFetchPermissions.current = null
    }
  }, [])

  return <PermissionsTable permissions={permissions ?? []} />
}
