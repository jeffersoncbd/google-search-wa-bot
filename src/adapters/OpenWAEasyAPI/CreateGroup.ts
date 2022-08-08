import { openWaAPI } from '../../services/openWaAPI'
import { ValidationError } from '../../_domain/entities/_errors'
import { CreateAGroupThroughOpenWA } from '../../_domain/entities/_interfaces'

export class CreateAGroupThroughEasyAPI implements CreateAGroupThroughOpenWA {
  async create(properties: { name: string }) {
    const response = await openWaAPI.post('/createGroup', {
      args: {
        groupName: properties.name,
        contacts: []
      }
    })
    if (!response.data.success) {
      throw new ValidationError(response.data.response.split(': ')[1])
    }
    return { id: response.data.response.wid._serialized }
  }
}
