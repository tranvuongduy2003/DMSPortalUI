export enum EClassStatus {
  CANCELED = 'CANCELED',
  SCHEDULED = 'SCHEDULED',
  FULL = 'FULL',
  POSTPONED = 'POSTPONED',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  OPEN_FOR_ENROLLMENT = 'OPEN_FOR_ENROLLMENT'
}

export const ClassStatusMap = new Map<EClassStatus, string>([
  [EClassStatus.CANCELED, 'Đã hủy'],
  [EClassStatus.COMPLETED, 'Đã kết thúc'],
  [EClassStatus.FULL, 'Đã đầy'],
  [EClassStatus.IN_PROGRESS, 'Đang diễn ra'],
  [EClassStatus.OPEN_FOR_ENROLLMENT, 'Trong quá trình đăng ký'],
  [EClassStatus.POSTPONED, 'Đã bị hoãn'],
  [EClassStatus.SCHEDULED, 'Đã lên lịch']
])
