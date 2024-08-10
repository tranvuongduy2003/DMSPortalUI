import { IFunction, IResponse } from '@/interfaces'

export interface IFunctionsService {
  getFunctions: () => Promise<IResponse<IFunction[]>>
}
