import { faker } from '@faker-js/faker'
import { ClearChat } from '../../entities/ClearChat'
import { Searcher } from '../../entities/Searcher'
import { SendMessage } from '../../entities/SendMessage'
import {
  ClearChatThroughStub,
  SendMessageThroughStub
} from '../../entities/_interfaces'
import {
  SearchEngineResult,
  SearchEngineStub
} from '../../entities/_interfaces/SearchEngine'
import { ConvertSearchResultToMessage } from '../_interfaces/ConvertSearchResultToMessage'
import { ProcessTheSearch, ProcessTheSearchProperties } from './Entity'

class ConverterStub implements ConvertSearchResultToMessage {
  convert(): string {
    return 'any message'
  }
}

function makeSut() {
  const chatStub = new ClearChat(new ClearChatThroughStub())
  const searcherStub = new Searcher(new SearchEngineStub())
  const messageStub = new SendMessage(new SendMessageThroughStub())
  const converterStub = new ConverterStub()
  const sut = new ProcessTheSearch(
    chatStub,
    searcherStub,
    messageStub,
    converterStub
  )
  return { sut, chatStub, searcherStub, messageStub, converterStub }
}
function makeFakeResult(): SearchEngineResult {
  return {
    title: faker.random.words(2),
    url: faker.internet.domainName(),
    description: faker.lorem.paragraph()
  }
}
let fakeProperties: ProcessTheSearchProperties = {
  chatId: 'anyId',
  termToSearch: 'anyTerm'
}

describe(ProcessTheSearch.name, () => {
  beforeEach(() => {
    fakeProperties = {
      chatId: 'anyId',
      termToSearch: 'anyTerm'
    }
  })

  test('deve limpar o chat com o ID recebido usando a entidade "ClearChat"', async () => {
    const { sut, chatStub } = makeSut()
    fakeProperties.chatId = faker.database.mongodbObjectId()
    const methodClearSpy = jest.spyOn(chatStub, 'clear')
    await sut.process(fakeProperties)
    expect(methodClearSpy).toHaveBeenCalledWith({ id: fakeProperties.chatId })
  })

  test('deve pesquisar o termo recebido usando a entidade "Searcher"', async () => {
    const { sut, searcherStub } = makeSut()
    fakeProperties.termToSearch = faker.random.words(3)
    const methodSearchSpy = jest.spyOn(searcherStub, 'search')
    await sut.process(fakeProperties)
    expect(methodSearchSpy).toHaveBeenCalledWith({
      term: fakeProperties.termToSearch
    })
  })

  test('deve converter as pequisas retornadas por "Searcher" usando a entidade "ConvertSearchResultToMessage"', async () => {
    const { sut, searcherStub, converterStub } = makeSut()
    const result1 = makeFakeResult()
    const result2 = makeFakeResult()
    jest.spyOn(searcherStub, 'search').mockResolvedValue([result1, result2])
    const methodConvertSpy = jest.spyOn(converterStub, 'convert')
    await sut.process(fakeProperties)
    expect(methodConvertSpy.mock.calls).toEqual([[result1], [result2]])
  })

  test('deve enviar as mensagens convertidas por "ConvertSearchResultToMessage" usando a entidade "SendMessage"', async () => {
    const { sut, searcherStub, converterStub, messageStub } = makeSut()
    const message1 = faker.random.words(5)
    const message2 = faker.random.words(5)
    jest
      .spyOn(searcherStub, 'search')
      .mockResolvedValue([makeFakeResult(), makeFakeResult()])
    jest
      .spyOn(converterStub, 'convert')
      .mockReturnValueOnce(message1)
      .mockReturnValueOnce(message2)
    const methodSendSpy = jest.spyOn(messageStub, 'send')
    await sut.process(fakeProperties)
    expect(methodSendSpy.mock.calls).toEqual([
      [{ chatId: fakeProperties.chatId, message: message1 }],
      [{ chatId: fakeProperties.chatId, message: message2 }]
    ])
  })

  test('deve enviar uma mensagem para cada resultado retornado por "Searcher"', async () => {
    const { sut, searcherStub, messageStub } = makeSut()
    const results: SearchEngineResult[] = []
    const randomValue = Math.floor(
      Math.random() * (Math.floor(10) - Math.ceil(2)) + Math.ceil(2)
    )
    for (let i = 0; i < randomValue; i++) {
      results.push(makeFakeResult())
    }
    jest.spyOn(searcherStub, 'search').mockResolvedValue(results)
    const methodSendSpy = jest.spyOn(messageStub, 'send')
    await sut.process(fakeProperties)
    expect(methodSendSpy).toHaveBeenCalledTimes(results.length)
  })
})
