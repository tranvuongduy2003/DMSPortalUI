import { IPitchGroup } from '@/interfaces'
import { Empty } from 'antd'
import { PitchGroupCard } from '.'

interface IPitchGroupsList {
  items: IPitchGroup[]
}

export function PitchGroupsList({ items }: IPitchGroupsList) {
  return (
    <>
      {items && items.length > 0 ? (
        <div className='grid grid-cols-4 gap-4'>
          {items.map((item) => (
            <PitchGroupCard key={item.id} pitchGroup={item} />
          ))}
        </div>
      ) : (
        <div className='flex items-center justify-center w-full'>
          <Empty description='Không tìm thấy Cụm sân nào!' />
        </div>
      )}
    </>
  )
}
