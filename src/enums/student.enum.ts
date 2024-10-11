export enum EStudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ENROLLED = 'ENROLLED',
  WAITLISTED = 'WAITLISTED',
  SUSPENDED = 'SUSPENDED'
}

export const StudentStatusMap = new Map<EStudentStatus, string>([
  [EStudentStatus.ACTIVE, 'Hoạt động'],
  [EStudentStatus.INACTIVE, 'Ngừng hoạt động'],
  [EStudentStatus.ENROLLED, 'Đã nhập học'],
  [EStudentStatus.WAITLISTED, 'Đang chờ duyệt'],
  [EStudentStatus.SUSPENDED, 'Tạm nghỉ']
])
