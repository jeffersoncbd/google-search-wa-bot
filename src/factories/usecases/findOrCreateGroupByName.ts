import { FindOrCreateGroupByName } from '../../_domain/usecases/FindOrCreateGroupByName'
import * as OpenWAEasyAPI from '../../adapters/OpenWAEasyAPI'
import { CreateGroup, GetGroupId } from '../../_domain/entities'

export function makeFindOrCreateGroupByName(): FindOrCreateGroupByName {
  const getGroupIdThroughEasyAPI = new OpenWAEasyAPI.GetGroupIdThroughEasyAPI()
  const getGroupId = new GetGroupId(getGroupIdThroughEasyAPI)

  const createAGroupThroughEasyAPI =
    new OpenWAEasyAPI.CreateAGroupThroughEasyAPI()
  const createGroup = new CreateGroup(createAGroupThroughEasyAPI)

  return new FindOrCreateGroupByName({
    findByName: getGroupId,
    createWithName: createGroup
  })
}
