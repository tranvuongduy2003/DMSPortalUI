import { EPitchGroupStatus } from '@/enums/pitch-group.enum'
import { IBranch } from './branch.interface'

export interface IPitchGroup {
  id: string
  name: string
  numberOfBranches?: number
  status: EPitchGroupStatus
  branches: IBranch[]
  createdAt: string
  updatedAt: string
  deletedAt: string
}
