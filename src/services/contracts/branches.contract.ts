import { IBranch, IPagination, IPaginationFilter, IPitch, IResponse } from '@/interfaces'
import { CreateBranchRequest, UpdateBranchRequest } from '@/types'

export interface IBranchesService {
  getBranches: (filter?: Partial<IPaginationFilter>) => Promise<IResponse<IPagination<IBranch>>>
  getPitchesByBranchId: (
    branchId: string,
    filter?: Partial<IPaginationFilter>
  ) => Promise<IResponse<IPagination<IPitch>>>
  getBranchById: (branchId: string) => Promise<IResponse<IBranch>>
  createBranch: (request: CreateBranchRequest) => Promise<IResponse<IBranch>>
  updateBranch: (branchId: string, request: UpdateBranchRequest) => Promise<IResponse>
  deleteBranch: (branchId: string) => Promise<IResponse>
}
