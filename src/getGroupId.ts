import { CreateGroup } from './_domain/Entities/CreateGroup/Entity'
import { GetGroupId } from './_domain/Entities/GetGroupId'
import * as OpenWAEasyAPI from './adapters/OpenWAEasyAPI'

export async function getGroupId(groupName: string): Promise<string> {
  const getGroupIdThroughEasyAPI = new OpenWAEasyAPI.GetGroupIdThroughEasyAPI()
  const getGroupId = new GetGroupId(getGroupIdThroughEasyAPI)
  const group = await getGroupId.get({ name: groupName })

  if (group === undefined) {
    const createAGroupThroughEasyAPI =
      new OpenWAEasyAPI.CreateAGroupThroughEasyAPI()
    const createGroup = new CreateGroup(createAGroupThroughEasyAPI)
    const result = await createGroup.create({ name: groupName })
    return result.id
  }

  return group.id
}
