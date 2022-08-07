import { openWaAPI } from '../../services/openWaAPI'
import { ClearChatThroughOpenWA } from '../../_domain/entities/_interfaces'

export class ClearChatThroughEasyAPI implements ClearChatThroughOpenWA {
  async clear(properties: { id: string }) {
    try {
      const body = { args: { chatId: properties.id } }
      const response = await openWaAPI.post('/clearChat', body)
      if (!response.data.success) {
        console.error(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
