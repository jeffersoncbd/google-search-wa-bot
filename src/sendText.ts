import { openWAService } from './openWAService'

export async function sendText(chatId: string, content: string) {
  try {
    const body = { args: { to: chatId, content } }
    const response = await openWAService.post('/sendText', body)
    if (!response.data.success) {
      console.log(response.data)
    }
  } catch (error) {
    console.error(error)
  }
}
