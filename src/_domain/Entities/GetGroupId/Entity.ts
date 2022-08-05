import { ValidationError } from '../_errors/Validation'
import { GetGroupIdThroughOpenWA } from '../_interfaces'

export interface GetGroupIdProperties {
  name: string
}

export class GetGroupId {
  constructor(private openWA: GetGroupIdThroughOpenWA) {}

  async get(properties: GetGroupIdProperties) {
    if (!properties) {
      throw new ValidationError(
        'É necessário informar as propriedades necessárias para encontrar o ID do grupo'
      )
    }
    if (!properties.name || properties.name.length < 4) {
      throw new ValidationError('O nome do grupo tem no mínimo 4 letras')
    }
    return await this.openWA.get(properties)
  }
}
