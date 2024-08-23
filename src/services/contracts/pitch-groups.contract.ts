import { IBranch, IPagination, IPaginationFilter, IPitchGroup, IResponse } from '@/interfaces'
import { CreatePitchGroupRequest, UpdatePitchGroupRequest } from '@/types'

export interface IPitchGroupsService {
  getPitchGroups: (filter?: Partial<IPaginationFilter>) => Promise<IResponse<IPagination<IPitchGroup>>>
  getBranchesByPitchGroupId: (
    pitchGroupId: string,
    filter?: Partial<IPaginationFilter>
  ) => Promise<IResponse<IPagination<IBranch>>>
  getPitchGroupById: (pitchGroupId: string) => Promise<IResponse<IPitchGroup>>
  createPitchGroup: (request: CreatePitchGroupRequest) => Promise<IResponse<IPitchGroup>>
  updatePitchGroup: (pitchGroupId: string, request: UpdatePitchGroupRequest) => Promise<IResponse>
  deletePitchGroup: (pitchGroupId: string) => Promise<IResponse>
}
