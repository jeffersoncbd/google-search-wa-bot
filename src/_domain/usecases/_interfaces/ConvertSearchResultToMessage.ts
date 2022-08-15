import { SearchEngineResult } from '../../entities/_interfaces/SearchEngine'

export interface ConvertSearchResultToMessage {
  convert(result: SearchEngineResult): string
}
