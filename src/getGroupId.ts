import { openWAService } from './openWAService'

export async function getGroupId(groupName: string) {
  try {
    const response = await openWAService.post('/getAllGroups', {
      withNewMessagesOnly: false
    })
    const group = response.data.response.find((group: any) => {
      return group.name === groupName
    })

    if (group === undefined) {
      const response = await openWAService.post('/createGroup', {
        args: {
          groupName,
          contacts: []
        }
      })
      return response.data.response.wid._serialized
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
