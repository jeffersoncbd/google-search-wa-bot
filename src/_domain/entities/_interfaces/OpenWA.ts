export interface Result {
  id: string
}

export interface CreateAGroupThroughOpenWA {
  create(properties: { name: string }): Promise<Result>
}

export interface GetGroupIdThroughOpenWA {
  get(properties: { name: string }): Promise<Result | undefined>
}

export class CreateAGroupThroughStub implements CreateAGroupThroughOpenWA {
  async create() {
    return { id: 'anyId' }
  }
}

export class GetGroupIdThroughStub implements GetGroupIdThroughOpenWA {
  async get(): Promise<Result | undefined> {
    return { id: 'anyId' }
  }
}
