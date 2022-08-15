import google from 'googlethis'
import {
  SearchEngine,
  SearchEngineResult
} from '../../_domain/entities/_interfaces/SearchEngine'

const googleOptions = {
  page: 0,
  safe: false,
  additional_params: {
    hl: 'pt',
    lr: 'lang_pt',
    cr: 'BR'
  },
  match_all_images: false,
  ris: false
}

export class GoogleSearchEngine implements SearchEngine {
  async search(properties: { term: string }): Promise<SearchEngineResult[]> {
    const response = await google.search(properties.term, googleOptions)
    return response.results.reverse().map((result) => ({
      title: result.title,
      url: result.url,
      description: result.description
    }))
  }
}
