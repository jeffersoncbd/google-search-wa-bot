import { SearchEngineResult } from '../../_domain/entities/_interfaces/SearchEngine'
import { ConvertSearchResultToMessage } from '../../_domain/usecases/_interfaces/ConvertSearchResultToMessage'

export class ConvertGoogleResultToOpenWAMessage
  implements ConvertSearchResultToMessage
{
  convert(result: SearchEngineResult): string {
    const { title, url, description } = result
    return `*${title}*\n${url}\n_${description}_`
  }
}
