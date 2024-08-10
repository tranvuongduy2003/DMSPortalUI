import { EPitchStatus } from '@/enums/pitch.enum'
import { IBranch } from './branch.interface'
import { IClass } from './class.interface'

export interface IPitch {
  id: string
  name: string
  branchId: string
  status: EPitchStatus
  numberOfClasses?: number
  branch: IBranch
  classes: IClass[]
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}
