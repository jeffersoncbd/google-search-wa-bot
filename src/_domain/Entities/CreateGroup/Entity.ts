import { ValidationError } from '../_errors/Validation'
import { CreateGroupWithANameThroughTheInterface } from '../_interfaces/CreateGroupWithAName'

export class CreateGroup {
  constructor(private group: CreateGroupWithANameThroughTheInterface) {}

  async create(name: string) {
    if (!name || name.length < 4) {
      throw new ValidationError('O nome do grupo deve ter pelomenos 4 letras')
    }
    return await this.group.create(name)
  }
}
