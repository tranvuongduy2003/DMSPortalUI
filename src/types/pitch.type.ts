import { EPitchStatus } from '@/enums'

export type CreatePitchRequest = {
  name: string
  branchId: string
  status: EPitchStatus
}

export type UpdatePitchRequest = {
  id: string
  name: string
  status: EPitchStatus
}
