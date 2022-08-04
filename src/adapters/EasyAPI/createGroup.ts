import { openWaAPI } from '../../services/openWaAPI'
import { CreateAGroupThroughOpenWA } from '../../_domain/Entities/_interfaces'

export class CreateAGroupThroughEasyAPI implements CreateAGroupThroughOpenWA {
  async create(properties: { name: string }) {
    const response = await openWaAPI.post('/createGroup', {
      args: {
        groupName: properties.name,
        contacts: []
      }
    })
    return { id: response.data.response.wid._serialized }
  }
}
