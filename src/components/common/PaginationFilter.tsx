import { EPageOrder, PageOrderMap } from '@/enums/pagination.enum'
import { IPaginationFilter } from '@/interfaces'
import { Input, Select } from 'antd'
import { DefaultOptionType } from 'antd/es/select'
import { Dispatch, SetStateAction } from 'react'

export interface IPaginationFilterProps {
  setFilter: Dispatch<SetStateAction<IPaginationFilter>>
  orderByFields?: DefaultOptionType[]
  searchByFields?: DefaultOptionType[]
}

export function PaginationFilter({ setFilter, orderByFields, searchByFields }: IPaginationFilterProps) {
  return (
    <div className='flex gap-4'>
      <div>
        <span className='font-medium'>Sắp xếp theo: </span>
        <Select
          options={orderByFields}
          style={{ width: 160 }}
          onChange={(orderBy) =>
            setFilter((filter) => ({
              ...filter,
              orderBy
            }))
          }
        />
      </div>
      <div>
        <span className='font-medium'>Thứ tự: </span>
        <Select
          style={{ width: 112 }}
          defaultValue={EPageOrder.ASC}
          options={[
            { value: EPageOrder.ASC, label: PageOrderMap.get(EPageOrder.ASC) },
            { value: EPageOrder.DESC, label: PageOrderMap.get(EPageOrder.DESC) }
          ]}
          onChange={(order) =>
            setFilter((filter) => ({
              ...filter,
              order
            }))
          }
        />
      </div>
      <div>
        <span className='font-medium'>Tìm kiếm theo: </span>
        <Select
          style={{ width: 160 }}
          options={searchByFields}
          onChange={(searchBy) =>
            setFilter((filter) => ({
              ...filter,
              searchBy
            }))
          }
        />
      </div>
      <div>
        <span className='font-medium'>Tìm kiếm: </span>
        <Input
          style={{ width: 240 }}
          placeholder='Nhập nội dung tìm kiếm'
          onChange={(event) =>
            setFilter((filter) => ({
              ...filter,
              searchValue: event.target.value
            }))
          }
        />
      </div>
    </div>
  )
}
