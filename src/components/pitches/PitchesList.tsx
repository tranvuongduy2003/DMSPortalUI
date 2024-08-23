import { IPitch } from '@/interfaces'
import { Empty } from 'antd'
import { PitchCard } from '.'

interface IPitchesList {
  items: IPitch[]
}

export function PitchesList({ items }: IPitchesList) {
  return (
    <>
      {items && items.length > 0 ? (
        <div className='grid grid-cols-4 gap-4'>
          {items.map((item) => (
            <PitchCard key={item.id} pitch={item} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center w-full'>
          <Empty description='Không tìm thấy Sân nào!' />
        </div>
      )}
    </>
  )
}
