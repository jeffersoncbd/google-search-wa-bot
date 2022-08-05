import { openWaAPI } from '../../services/openWaAPI'
import {
  GetGroupIdThroughOpenWA,
  Result
} from '../../_domain/Entities/_interfaces'

export class GetGroupIdThroughEasyAPI implements GetGroupIdThroughOpenWA {
  async get(properties: { name: string }): Promise<Result | undefined> {
    const response = await openWaAPI.post('/getAllGroups', {
      withNewMessagesOnly: false
    })

    const group = response.data.response.find((group: any) => {
      return group.name === properties.name
    })

    return group ? { id: group.id } : undefined
  }
}
