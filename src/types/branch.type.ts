import { EBranchStatus } from '@/enums'

export type CreateBranchRequest = {
  name: string
  address: string
  pitchGroupId: string
  managerId: string
  status: EBranchStatus
}

export type UpdateBranchRequest = {
  id: string
  name: string
  address: string
  managerId: string
  status: EBranchStatus
}
