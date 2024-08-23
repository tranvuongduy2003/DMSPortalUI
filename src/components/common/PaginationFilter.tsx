import { EPageOrder } from '@/enums/pagination.enum'
import { IPaginationFilter } from '@/interfaces'
import { Input, Select } from 'antd'
import { OptionProps } from 'antd/es/select'
import { Dispatch, SetStateAction } from 'react'

export interface IPaginationFilterProps {
  setFilter: Dispatch<SetStateAction<IPaginationFilter>>
  orderByFields?: OptionProps[]
  searchByFields?: OptionProps[]
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
          options={[
            { value: EPageOrder.ASC, label: 'Tăng dần' },
            { value: EPageOrder.DESC, label: 'Giảm dần' }
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
