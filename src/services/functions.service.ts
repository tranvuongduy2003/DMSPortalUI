import { httpRequest } from '@/axios-client'
import { IFunction } from '@/interfaces'
import { IFunctionsService } from './contracts'

class FunctionsService implements IFunctionsService {
  getFunctions = () => {
    return httpRequest.get<IFunction[]>('/api/functions')
  }
}

export const functionsService = new FunctionsService()
