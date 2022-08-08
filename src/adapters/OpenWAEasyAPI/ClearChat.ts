import { openWaAPI } from '../../services/openWaAPI'
import { ValidationError } from '../../_domain/entities/_errors'
import { ClearChatThroughOpenWA } from '../../_domain/entities/_interfaces'

export class ClearChatThroughEasyAPI implements ClearChatThroughOpenWA {
  async clear(properties: { id: string }) {
    const body = { args: { chatId: properties.id } }
    const response = await openWaAPI.post('/clearChat', body)
    if (!response.data.success) {
      throw new ValidationError(response.data.response.split(': ')[1])
    }
  }
}
