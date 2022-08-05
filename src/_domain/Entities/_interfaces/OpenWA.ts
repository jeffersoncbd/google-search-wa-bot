export interface Result {
  id: string
}

export interface CreateAGroupThroughOpenWA {
  create(properties: { name: string }): Promise<Result>
}

export interface GetGroupIdThroughOpenWA {
  get(properties: { name: string }): Promise<Result | undefined>
}
