import { Spin } from 'antd'
import PermissionsTable from './table/PermissionsTable'
import { useEffect, useRef, useState } from 'react'
import { IPermission } from '@/interfaces'
import { permissionsService } from '@/services'

export function GeneralPermissions() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [permissions, setPermissions] = useState<IPermission[]>([])

  const handleFetchPermissions = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    handleFetchPermissions.current = async () => {
      setIsLoading(true)
      try {
        const { data } = await permissionsService.getPermissions()
        setPermissions(data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    handleFetchPermissions.current()
    return () => {
      handleFetchPermissions.current = null
    }
  }, [])

  return isLoading ? (
    <div className='flex items-center justify-center w-full'>
      <Spin spinning={isLoading} size='large' />
    </div>
  ) : (
    <PermissionsTable permissions={permissions ?? []} />
  )
}
