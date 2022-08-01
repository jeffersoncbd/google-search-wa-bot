import { openWAService } from './openWAService'

export async function clearChat(chatId: string) {
  try {
    const body = { args: { chatId } }
    const response = await openWAService.post('/clearChat', body)
    if (!response.data.success) {
      console.log(response.data)
    }
  } catch (error) {
    console.error(error)
  }
}
