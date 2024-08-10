import { IPitch, IPagination, IPaginationFilter, IResponse, IClass } from '@/interfaces'
import { CreatePitchRequest, UpdatePitchRequest } from '@/types'

export interface IPitchesService {
  getPitches: (filter?: Partial<IPaginationFilter>) => Promise<IResponse<IPagination<IPitch>>>
  getClassesByPitchId: (pitchId: string, filter?: Partial<IPaginationFilter>) => Promise<IResponse<IPagination<IClass>>>
  createPitch: (request: CreatePitchRequest) => Promise<IResponse<IPitch>>
  updatePitch: (pitchId: string, request: UpdatePitchRequest) => Promise<IResponse>
  deletePitch: (pitchId: string) => Promise<IResponse>
}
