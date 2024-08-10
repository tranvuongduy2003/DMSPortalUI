import { httpRequest } from '@/axios-client'
import { IBranch, IPagination, IPaginationFilter, IPitchGroup } from '@/interfaces'
import { CreatePitchGroupRequest, UpdatePitchGroupRequest } from '@/types'
import { IPitchGroupsService } from './contracts'

class PitchGroupsService implements IPitchGroupsService {
  private readonly apiPath = '/api/v1/pitchgroups'

  public getPitchGroups = (filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IPitchGroup>>(`${this.apiPath}`, {
      params: filter
    })
  }

  public getBranchesByPitchGroupId = (pitchGroupId: string, filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IBranch>>(`${this.apiPath}/${pitchGroupId}/branches`, {
      params: filter
    })
  }

  public createPitchGroup = (request: CreatePitchGroupRequest) => {
    return httpRequest.post<CreatePitchGroupRequest, IPitchGroup>(`${this.apiPath}`, request)
  }

  public updatePitchGroup = (pitchGroupId: string, request: UpdatePitchGroupRequest) => {
    return httpRequest.put<UpdatePitchGroupRequest, void>(`${this.apiPath}/${pitchGroupId}`, request)
  }

  public deletePitchGroup = (pitchGroupId: string) => {
    return httpRequest.delete<void>(`${this.apiPath}/${pitchGroupId}`)
  }
}

export const pitchGroupsService = new PitchGroupsService()
