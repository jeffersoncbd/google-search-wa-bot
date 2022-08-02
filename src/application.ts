import 'dotenv/config'
import google from 'googlethis'

import { getGroupId } from './getGroupId'
import { clearChat } from './clearChat'
import { startServer } from './Server'
import { sendText } from './sendText'

const botGroupName = process.env.BOT_GROUP_NAME || 'google'
const botCommand = process.env.BOT_COMMAND || '.gs'
const googleOptions = {
  page: 0,
  safe: false,
  additional_params: {
    hl: 'pt',
    lr: 'lang_pt',
    cr: 'BR'
  }
}

async function root() {
  const groupId: string = await getGroupId(botGroupName)

  startServer(async (body) => {
    const messageTo: string = body.data.to
    const messageFrom: string = body.data.from
    const messageBody: string = body.data.body
    if (
      (messageTo === groupId || messageFrom === groupId) &&
      messageBody.substring(0, botCommand.length) === botCommand
    ) {
      clearChat(groupId)

      const term = messageBody.substring(botCommand.length)
      const response = await google.search(term, googleOptions)

      response.results.reverse().forEach((result) => {
        sendText(
          groupId,
          `*${result.title}*\n${result.url}\n_${result.description}_`
        )
      })
      if (response.weather) {
        sendText(
          groupId,
          `*${response.weather.location} - ${response.weather.temperature} ºC*\n_${response.weather.forecast}_\nChuva: ${response.weather.precipitation}\nUmidade: ${response.weather.humidity}\nVento: ${response.weather.wind}`
        )
      }
    }
  })
}

root()
