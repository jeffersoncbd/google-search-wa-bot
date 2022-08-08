import { faker } from '@faker-js/faker'
import { ValidationError } from '../_errors'
import { SendMessageThroughStub } from '../_interfaces'
import { SendMessage, SendMessageProperties } from './Entity'

function makeSut() {
  const openWAStub = new SendMessageThroughStub()
  const sut = new SendMessage(openWAStub)
  return { sut, openWAStub }
}

describe(SendMessage.name, () => {
  test('deve lançar "ValidationError" se a propriedade "chatId" não for informada', async () => {
    const { sut } = makeSut()
    await expect(
      sut.send({ chatId: '', message: 'anyMessage' })
    ).rejects.toThrow(ValidationError)
    await expect(
      sut.send({ chatId: '', message: 'anyMessage' })
    ).rejects.toThrow('O ID do chat deve ser informado')
  })

  test('deve lançar "ValidationError" se a propriedade "message" não for informada', async () => {
    const { sut } = makeSut()
    await expect(sut.send({ chatId: 'anyId', message: '' })).rejects.toThrow(
      ValidationError
    )
    await expect(sut.send({ chatId: 'anyId', message: '' })).rejects.toThrow(
      'A mensagem a ser enviada não foi informada'
    )
  })

  test('deve usar "SendMessageThroughOpenWA" para enviar a mensagem e ID recebido', async () => {
    const { sut, openWAStub } = makeSut()
    const methodSendSpy = jest.spyOn(openWAStub, 'send')
    const fakeProperties: SendMessageProperties = {
      chatId: faker.database.mongodbObjectId(),
      message: faker.lorem.lines(1)
    }
    await sut.send(fakeProperties)
    expect(methodSendSpy).toHaveBeenCalledWith(fakeProperties)
  })
})
