import { faker } from '@faker-js/faker'
import { ValidationError } from '../_errors'
import { ClearChatThroughStub } from '../_interfaces'
import { ClearChat } from './Entity'

function makeSut() {
  const openWAStub = new ClearChatThroughStub()
  const sut = new ClearChat(openWAStub)
  return { sut, openWAStub }
}

describe(ClearChat.name, () => {
  test('deve lançar "ValidationError" caso a propriedade ID não seja informada', async () => {
    const { sut } = makeSut()
    await expect(sut.clear({ id: '' })).rejects.toThrow(ValidationError)
    await expect(sut.clear({ id: '' })).rejects.toThrow(
      'O ID da conversa deve ser informado'
    )
  })

  test('deve limpar a conversa que possui o ID informado', async () => {
    const { sut, openWAStub } = makeSut()
    const methodClearSpy = jest.spyOn(openWAStub, 'clear')
    const fakeId = faker.database.mongodbObjectId()
    await sut.clear({ id: fakeId })
    expect(methodClearSpy).toHaveBeenCalledWith({ id: fakeId })
  })
})
