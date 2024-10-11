export enum EBranchStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FULL = 'FULL',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE'
}

export const BranchStatusMap = new Map<EBranchStatus, string>([
  [EBranchStatus.OPEN, 'Đang mở'],
  [EBranchStatus.CLOSED, 'Đã đóng cửa'],
  [EBranchStatus.FULL, 'Hết sân'],
  [EBranchStatus.UNDER_MAINTENANCE, 'Đang sửa chữa']
])
