import { openWaAPI } from './services/openWaAPI'

export async function clearChat(chatId: string) {
  try {
    const body = { args: { chatId } }
    const response = await openWaAPI.post('/clearChat', body)
    if (!response.data.success) {
      console.log(response.data)
    }
  } catch (error) {
    console.error(error)
  }
}
