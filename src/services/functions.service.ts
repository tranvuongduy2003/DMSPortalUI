import { httpRequest } from '@/axios-client'
import { IFunction } from '@/interfaces'
import { IFunctionsService } from './contracts'

class FunctionsService implements IFunctionsService {
  private readonly apiPath = '/api/v1/functions'

  public getFunctions = () => {
    return httpRequest.get<IFunction[]>(`${this.apiPath}`)
  }
}

export const functionsService = new FunctionsService()
