import { CreateAGroupThroughEasyAPI } from './adapters/EasyAPI'
import { openWaAPI } from './services/openWaAPI'
import { CreateGroup } from './_domain/Entities/CreateGroup/Entity'

export async function getGroupId(groupName: string) {
  try {
    const response = await openWaAPI.post('/getAllGroups', {
      withNewMessagesOnly: false
    })
    const group = response.data.response.find((group: any) => {
      return group.name === groupName
    })

    if (group === undefined) {
      const apiInterface = new CreateAGroupThroughEasyAPI()
      const createGroup = new CreateGroup(apiInterface)
      const result = await createGroup.create({ name: groupName })
      return result.id
    }

    return group.id
  } catch (error: any) {
    console.log(error)
    if (error.response.data.error === 'unauthorised') {
      throw new Error(
        'A API não permitiu o uso da API_KEY informada no arquivo .env'
      )
    }
  }
}
