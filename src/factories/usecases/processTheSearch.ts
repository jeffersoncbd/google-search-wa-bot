import { ConvertGoogleResultToOpenWAMessage } from '../../adapters/ConvertGoogleResultToOpenWAMessage'
import { GoogleSearchEngine } from '../../adapters/GoogleSearchEngine'
import {
  ClearChatThroughEasyAPI,
  SendMessageThroughEasyAPI
} from '../../adapters/OpenWAEasyAPI'
import { ClearChat } from '../../_domain/entities/ClearChat'
import { Searcher } from '../../_domain/entities/Searcher'
import { SendMessage } from '../../_domain/entities/SendMessage'
import { ProcessTheSearch } from '../../_domain/usecases/ProcessTheSearch'

export function makeProcessTheSearch(): ProcessTheSearch {
  const chat = new ClearChat(new ClearChatThroughEasyAPI())
  const searcher = new Searcher(new GoogleSearchEngine())
  const message = new SendMessage(new SendMessageThroughEasyAPI())
  const converter = new ConvertGoogleResultToOpenWAMessage()
  return new ProcessTheSearch(chat, searcher, message, converter)
}
