import { ValidationError } from '../_errors'
import { SendMessageThroughOpenWA } from '../_interfaces'

export interface SendMessageProperties {
  chatId: string
  message: string
}

export class SendMessage {
  constructor(private openWA: SendMessageThroughOpenWA) {}

  async send(properties: SendMessageProperties) {
    if (!properties.chatId) {
      throw new ValidationError('O ID do chat deve ser informado')
    }
    if (!properties.message) {
      throw new ValidationError('A mensagem a ser enviada não foi informada')
    }
    await this.openWA.send(properties)
  }
}
