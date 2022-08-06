import { CreateGroup, GetGroupId } from '../../entities'

export interface FindOrCreateGroupByNameProperties {
  findByName: GetGroupId
  createWithName: CreateGroup
}

export class FindOrCreateGroupByName {
  constructor(private dependencies: FindOrCreateGroupByNameProperties) {}

  async findOrCreateWith(name: string) {
    let result = await this.dependencies.findByName.get({ name })
    if (result === undefined) {
      result = await this.dependencies.createWithName.create({ name })
    }
    return result.id
  }
}
