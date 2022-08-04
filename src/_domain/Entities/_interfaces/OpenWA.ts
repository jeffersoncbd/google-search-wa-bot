interface Result {
  id: string
}

export interface CreateAGroupThroughOpenWA {
  create(properties: { name: string }): Promise<Result>
}
