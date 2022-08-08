import { openWaAPI } from '../../services/openWaAPI'
import { ValidationError } from '../../_domain/entities/_errors'
import { SendMessageThroughOpenWA } from '../../_domain/entities/_interfaces'

export class SendMessageThroughEasyAPI implements SendMessageThroughOpenWA {
  async send(properties: { chatId: string; message: string }): Promise<void> {
    const response = await openWaAPI.post('/sendText', {
      args: { to: properties.chatId, content: properties.message }
    })
    if (!response.data.success) {
      throw new ValidationError(response.data.response.split(': ')[1])
    }
  }
}
