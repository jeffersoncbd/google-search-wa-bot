import { faker } from '@faker-js/faker'
import { ValidationError } from '../_errors/Validation'
import { GetGroupIdThroughOpenWA, Result } from '../_interfaces'
import { GetGroupId, GetGroupIdProperties } from './Entity'

class GetGroupIdThroughStub implements GetGroupIdThroughOpenWA {
  async get(): Promise<Result | undefined> {
    return { id: 'anyId' }
  }
}

function makeSut() {
  const openWAStub = new GetGroupIdThroughStub()
  const sut = new GetGroupId(openWAStub)
  return { sut, openWAStub }
}

describe(GetGroupId.name, () => {
  test('deve lançar "ValidationError" se "properties" não for informado', async () => {
    const { sut } = makeSut()
    await expect(
      sut.get(undefined as unknown as GetGroupIdProperties)
    ).rejects.toThrow(ValidationError)
    await expect(
      sut.get(undefined as unknown as GetGroupIdProperties)
    ).rejects.toThrow(
      'Deve ser informado as propriedades necessárias para encontrar o ID de um grupo'
    )
  })

  test('deve lançar "ValidationError" se a propriedade "name" não for informada', async () => {
    const { sut } = makeSut()
    await expect(sut.get({ name: '' })).rejects.toThrow(ValidationError)
    await expect(sut.get({ name: '' })).rejects.toThrow(
      'O nome do grupo tem no mínimo 4 letras'
    )
  })

  test('deve lançar "ValidationError" se a propriedade "name" tive menos que 4 caracteres', async () => {
    const { sut } = makeSut()
    await expect(sut.get({ name: 'any' })).rejects.toThrow(ValidationError)
    await expect(sut.get({ name: 'any' })).rejects.toThrow(
      'O nome do grupo tem no mínimo 4 letras'
    )
  })

  test('deve buscar em "GetGroupIdThroughOpenWA" utilizando a propriedade "name" recebida', async () => {
    const { sut, openWAStub } = makeSut()
    const fakeName = faker.random.words(3)
    const methodGetSpy = jest.spyOn(openWAStub, 'get')
    await sut.get({ name: fakeName })
    expect(methodGetSpy).toHaveBeenCalledWith({ name: fakeName })
  })

  test('deve retornar o resultado de "GetGroupIdThroughOpenWA"', async () => {
    const { sut, openWAStub } = makeSut()
    const fakeId = faker.database.mongodbObjectId()
    jest.spyOn(openWAStub, 'get').mockResolvedValue({ id: fakeId })
    const result = await sut.get({ name: 'anyName' })
    expect(result).toEqual({ id: fakeId })
  })
})
