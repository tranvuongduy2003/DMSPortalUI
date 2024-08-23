import { IBranch } from '@/interfaces'
import { Empty } from 'antd'
import { BranchCard } from '.'

interface IBranchesList {
  items: IBranch[]
}

export function BranchesList({ items }: IBranchesList) {
  return (
    <>
      {items && items.length > 0 ? (
        <div className='grid grid-cols-4 gap-4'>
          {items.map((item) => (
            <BranchCard key={item.id} branch={item} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center w-full'>
          <Empty description='Không tìm thấy Chi nhánh nào!' />
        </div>
      )}
    </>
  )
}
