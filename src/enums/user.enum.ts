export enum EGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export const GenderMap = new Map<EGender, string>([
  [EGender.MALE, 'Nam'],
  [EGender.FEMALE, 'Nữ'],
  [EGender.OTHER, 'Khác']
])

export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

export const UserStatusMap = new Map<EUserStatus, string>([
  [EUserStatus.ACTIVE, 'Hoạt động'],
  [EUserStatus.DISABLED, 'Bị vô hiệu hóa']
])
