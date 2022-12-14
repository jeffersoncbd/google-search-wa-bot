import { ValidationError } from '../_errors/Validation'
import { CreateAGroupThroughOpenWA } from '../_interfaces'

interface CreateGroupProperties {
  name: string
}

export class CreateGroup {
  constructor(private openWA: CreateAGroupThroughOpenWA) {}

  async create(properties: CreateGroupProperties) {
    if (!properties.name || properties.name.length < 4) {
      throw new ValidationError('O nome do grupo deve ter pelomenos 4 letras')
    }
    return await this.openWA.create(properties)
  }
}
