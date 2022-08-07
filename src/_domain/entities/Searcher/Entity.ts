import { ValidationError } from '../_errors'
import { SearchEngine } from '../_interfaces/SearchEngine'

export interface SearcherProperties {
  term: string
}

export class Searcher {
  constructor(private engine: SearchEngine) {}

  async search(properties: SearcherProperties) {
    if (!properties.term) {
      throw new ValidationError(
        'Não foi informado o termo que deve ser pesquisado'
      )
    }
    return await this.engine.search(properties)
  }
}
