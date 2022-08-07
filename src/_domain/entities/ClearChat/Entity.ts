import { ValidationError } from '../_errors'
import { ClearChatThroughOpenWA } from '../_interfaces'

export interface ClearChatProperties {
  id: string
}

export class ClearChat {
  constructor(private openWA: ClearChatThroughOpenWA) {}

  async clear(properties: ClearChatProperties) {
    if (!properties.id) {
      throw new ValidationError('O ID da conversa deve ser informado')
    }
    await this.openWA.clear(properties)
  }
}
