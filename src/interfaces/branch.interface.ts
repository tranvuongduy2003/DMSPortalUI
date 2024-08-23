import { EBranchStatus } from '@/enums/branch.enum'
import { IPitchGroup } from './pitch-group.interface'
import { IUser } from './user.interface'
import { IPitch } from './pitch.interface'

export interface IBranch {
  id: string
  name: string
  address: string
  numberOfPitches?: number
  pitchGroupId: string
  managerId: string
  status: EBranchStatus
  pitchGroup: IPitchGroup
  manager: IUser
  pitches: IPitch[]
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}
