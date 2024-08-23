import { httpRequest } from '@/axios-client'
import { IClass, IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { CreatePitchRequest, UpdatePitchRequest } from '@/types'
import { IPitchesService } from './contracts'

class PitchesService implements IPitchesService {
  private readonly apiPath = '/api/v1/pitches'

  public getPitches = (filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IPitch>>(`${this.apiPath}`, {
      params: filter
    })
  }

  public getClassesByPitchId = (pitchId: string, filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IClass>>(`${this.apiPath}/${pitchId}/classes`, {
      params: filter
    })
  }

  public getPitchById = (pitchId: string) => {
    return httpRequest.get<IPitch>(`${this.apiPath}/${pitchId}`)
  }

  public createPitch = (request: CreatePitchRequest) => {
    return httpRequest.post<CreatePitchRequest, IPitch>(`${this.apiPath}`, request)
  }

  public updatePitch = (pitchId: string, request: UpdatePitchRequest) => {
    return httpRequest.put<UpdatePitchRequest, void>(`${this.apiPath}/${pitchId}`, request)
  }

  public deletePitch = (pitchId: string) => {
    return httpRequest.delete<void>(`${this.apiPath}/${pitchId}`)
  }
}

export const pitchesService = new PitchesService()
