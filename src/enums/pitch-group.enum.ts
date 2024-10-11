export enum EPitchGroupStatus {
  AVAILABLE = 'AVAILABLE',
  INACTIVE = 'INACTIVE',
  FULL = 'FULL'
}

export const PitchGroupStatusMap = new Map<EPitchGroupStatus, string>([
  [EPitchGroupStatus.AVAILABLE, 'Đang hoạt động'],
  [EPitchGroupStatus.FULL, 'Hết sân'],
  [EPitchGroupStatus.INACTIVE, 'Không hoạt động']
])
