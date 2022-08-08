import { openWaAPI } from '../../services/openWaAPI'
import { ValidationError } from '../../_domain/entities/_errors'
import * as interfaces from '../../_domain/entities/_interfaces'

export class GetGroupIdThroughEasyAPI
  implements interfaces.GetGroupIdThroughOpenWA
{
  async get(properties: {
    name: string
  }): Promise<interfaces.Result | undefined> {
    const response = await openWaAPI.post('/getAllGroups', {
      withNewMessagesOnly: false
    })
    if (!response.data.success) {
      throw new ValidationError(response.data.response.split(': ')[1])
    }

    const group = response.data.response.find((group: any) => {
      return group.name === properties.name
    })

    return group ? { id: group.id } : undefined
  }
}
