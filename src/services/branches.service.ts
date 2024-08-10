import { httpRequest } from '@/axios-client'
import { IBranch, IPagination, IPaginationFilter, IPitch } from '@/interfaces'
import { CreateBranchRequest, UpdateBranchRequest } from '@/types'
import { IBranchesService } from './contracts'

class BranchesService implements IBranchesService {
  private readonly apiPath = '/api/v1/branches'

  public getBranches = (filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IBranch>>(`${this.apiPath}`, {
      params: filter
    })
  }

  public getPitchesByBranchId = (branchId: string, filter?: Partial<IPaginationFilter>) => {
    return httpRequest.get<IPagination<IPitch>>(`${this.apiPath}/${branchId}/pitches`, {
      params: filter
    })
  }

  public createBranch = (request: CreateBranchRequest) => {
    return httpRequest.post<CreateBranchRequest, IBranch>(`${this.apiPath}`, request)
  }

  public updateBranch = (branchId: string, request: UpdateBranchRequest) => {
    return httpRequest.put<UpdateBranchRequest, void>(`${this.apiPath}/${branchId}`, request)
  }

  public deleteBranch = (branchId: string) => {
    return httpRequest.delete<void>(`${this.apiPath}/${branchId}`)
  }
}

export const branchesService = new BranchesService()
