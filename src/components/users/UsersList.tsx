import { IUser } from '@/interfaces'
import { Empty } from 'antd'
import { UsersTable } from './table'

interface IUsersList {
  items: IUser[]
}

export function UsersList({ items }: IUsersList) {
  return (
    <>
      {items && items.length > 0 ? (
        <UsersTable users={items} />
      ) : (
        <div className='flex items-center justify-center w-full'>
          <Empty description='Không tìm thấy người dùng nào!' />
        </div>
      )}
    </>
  )
}
