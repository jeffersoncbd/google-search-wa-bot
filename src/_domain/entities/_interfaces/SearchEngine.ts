export interface SearchEngineResult {
  title: string
  link: string
  description: string
}

export interface SearchEngine {
  search(properties: { term: string }): Promise<SearchEngineResult[]>
}

export class SearchEngineStub implements SearchEngine {
  async search(): Promise<SearchEngineResult[]> {
    return []
  }
}
