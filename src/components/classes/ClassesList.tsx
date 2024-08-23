import { IClass } from '@/interfaces'
import { Empty } from 'antd'
import { ClassCard } from '.'

interface IClassesList {
  items: IClass[]
}

export function ClassesList({ items }: IClassesList) {
  return (
    <>
      {items && items.length > 0 ? (
        <div className='grid grid-cols-4 gap-4'>
          {items.map((item) => (
            <ClassCard key={item.id} classData={item} />
          ))}
        </div>
      ) : (
        // <ClassesTable classes={items} />
        <div className='flex items-center justify-center w-full'>
          <Empty description='Không tìm thấy lớp nào!' />
        </div>
      )}
    </>
  )
}
