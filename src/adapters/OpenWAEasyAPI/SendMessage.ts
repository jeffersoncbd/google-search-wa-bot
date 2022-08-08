import { openWaAPI } from '../../services/openWaAPI'
import { SendMessageThroughOpenWA } from '../../_domain/entities/_interfaces'

export class SendMessageThroughEasyAPI implements SendMessageThroughOpenWA {
  async send(properties: { chatId: string; message: string }): Promise<void> {
    try {
      const response = await openWaAPI.post('/sendText', {
        args: { to: properties.chatId, content: properties.message }
      })
      if (!response.data.success) {
        console.error(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
