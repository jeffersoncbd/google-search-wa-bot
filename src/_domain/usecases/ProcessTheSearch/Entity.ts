import { ClearChat } from '../../entities/ClearChat'
import { Searcher } from '../../entities/Searcher'
import { SendMessage } from '../../entities/SendMessage'
import { ConvertSearchResultToMessage } from '../_interfaces/ConvertSearchResultToMessage'

export interface ProcessTheSearchProperties {
  chatId: string
  termToSearch: string
}

export class ProcessTheSearch {
  constructor(
    private chat: ClearChat,
    private searcher: Searcher,
    private message: SendMessage,
    private converter: ConvertSearchResultToMessage
  ) {}

  async process(properties: ProcessTheSearchProperties) {
    const { chatId, termToSearch } = properties
    const cleaningPromise = this.chat.clear({ id: chatId })
    const searchPromise = this.searcher.search({ term: termToSearch })
    const [results] = await Promise.all([searchPromise, cleaningPromise])
    for (const result of results) {
      const message = this.converter.convert(result)
      await this.message.send({ chatId, message })
    }
  }
}
