import { EPitchGroupStatus } from '@/enums'

export type CreatePitchGroupRequest = {
  name: string
  status: EPitchGroupStatus
}

export type UpdatePitchGroupRequest = {
  id: string
  name: string
  status: EPitchGroupStatus
}
