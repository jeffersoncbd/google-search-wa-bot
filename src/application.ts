import 'dotenv/config'

import { Server } from './services/Server'
import { sendText } from './sendText'
import { makeFindOrCreateGroupByName } from './factories/usecases/findOrCreateGroupByName'
import { ClearChatThroughEasyAPI } from './adapters/OpenWAEasyAPI/ClearChat'
import { ClearChat } from './_domain/entities/ClearChat'
import { GoogleSearchEngine } from './adapters/GoogleSearchEngine'
import { Searcher } from './_domain/entities/Searcher'

const botGroupName = process.env.BOT_GROUP_NAME || 'google'
const botCommand = process.env.BOT_COMMAND || '.gs'

const group = makeFindOrCreateGroupByName()
const server = new Server()

const clearChatThroughEasyAPI = new ClearChatThroughEasyAPI()
const clearChat = new ClearChat(clearChatThroughEasyAPI)

const googleSearchEngine = new GoogleSearchEngine()
const searcher = new Searcher(googleSearchEngine)

interface Data {
  groupId: string
  messageTo: string
  messageFrom: string
  messageBody: string
}

async function processMessage(data: Data) {
  const { groupId, messageTo, messageFrom, messageBody } = data
  if (
    (messageTo === groupId || messageFrom === groupId) &&
    messageBody.substring(0, botCommand.length) === botCommand
  ) {
    clearChat.clear({ id: groupId })

    const term = messageBody.substring(botCommand.length)
    const results = await searcher.search({ term })

    for (const result of results) {
      await sendText(
        groupId,
        `*${result.title}*\n${result.link}\n_${result.description}_`
      )
    }
  }
}

async function root() {
  try {
    const groupId: string = await group.findOrCreateWith(botGroupName)

    server.addRequestHandler((request) => {
      processMessage({
        groupId,
        messageTo: request.body.data.to,
        messageFrom: request.body.data.from,
        messageBody: request.body.data.body
      })
    })

    server.start()
  } catch (error: any) {
    if (
      error.code === 'ECONNREFUSED' &&
      error.config.baseURL === process.env.OPEN_WA_URL
    ) {
      console.error(
        `Não foi possível conectar com "${process.env.OPEN_WA_URL}", verifique se o servidor foi iniciado.`
      )
      return
    }
    if (error.response.data.error === 'unauthorised') {
      console.error(
        'A API não permitiu o uso da API_KEY informada no arquivo .env'
      )
      return
    }
    console.error(error)
  }
}

root()
