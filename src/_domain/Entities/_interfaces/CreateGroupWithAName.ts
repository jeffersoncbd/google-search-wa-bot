interface Result {
  id: string
}

export interface CreateGroupWithANameThroughTheInterface {
  create(name: string): Promise<Result>
}
