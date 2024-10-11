export enum EPitchStatus {
  AVAILABLE = 'AVAILABLE',
  CLOSED = 'CLOSED',
  BUSY = 'BUSY',
  RESERVED = 'RESERVED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE'
}

export const PitchStatusMap = new Map<EPitchStatus, string>([
  [EPitchStatus.AVAILABLE, 'Sân trống'],
  [EPitchStatus.CLOSED, 'Đã đóng cửa'],
  [EPitchStatus.BUSY, 'Đang bận'],
  [EPitchStatus.RESERVED, 'Đã được đặt'],
  [EPitchStatus.UNDER_MAINTENANCE, 'Đang sửa chữa']
])
