export enum EPageOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export const PageOrderMap = new Map<EPageOrder, string>([
  [EPageOrder.ASC, 'Tăng dần'],
  [EPageOrder.DESC, 'Giảm dần']
])
