import { openWaAPI } from '../../services/openWaAPI'
import { CreateGroupWithANameThroughTheInterface } from '../../_domain/Entities/_interfaces/CreateGroupWithAName'

export class CreateGroupWithANameThroughTheAPI
  implements CreateGroupWithANameThroughTheInterface
{
  async create(name: string) {
    const response = await openWaAPI.post('/createGroup', {
      args: {
        groupName: name,
        contacts: []
      }
    })
    return { id: response.data.response.wid._serialized }
  }
}
