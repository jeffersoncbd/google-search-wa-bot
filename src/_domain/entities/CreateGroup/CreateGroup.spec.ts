import { faker } from '@faker-js/faker'
import { ValidationError } from '../_errors/Validation'
import { CreateAGroupThroughStub } from '../_interfaces'
import { CreateGroup, CreateGroupProperties } from './Entity'

function makeSut() {
  const openWAStub = new CreateAGroupThroughStub()
  const sut = new CreateGroup(openWAStub)
  return { sut, openWAStub }
}

describe(CreateGroup.name, () => {
  test('deve lançar "ValidationError" se "properties" não for informado', async () => {
    const { sut } = makeSut()
    await expect(
      sut.create(undefined as unknown as CreateGroupProperties)
    ).rejects.toThrow(ValidationError)
    await expect(
      sut.create(undefined as unknown as CreateGroupProperties)
    ).rejects.toThrow(
      'Deve ser informado as propriedades necessárias para criar um grupo'
    )
  })

  test('deve lançar "ValidationError" caso a propriedade "name" esteja vazia', async () => {
    const { sut } = makeSut()
    await expect(sut.create({ name: '' })).rejects.toThrow(ValidationError)
    await expect(sut.create({ name: '' })).rejects.toThrowError(
      'O nome do grupo deve ter pelomenos 4 letras'
    )
  })

  test('deve lançar "ValidationError" caso a propriedade "name" possua menos de 4 letras', async () => {
    const { sut } = makeSut()
    await expect(sut.create({ name: 'any' })).rejects.toThrow(ValidationError)
    await expect(sut.create({ name: 'any' })).rejects.toThrowError(
      'O nome do grupo deve ter pelomenos 4 letras'
    )
  })

  test('deve criar um grupo na interface OpenWA usando a propriedade "name" recebida', async () => {
    const { sut, openWAStub } = makeSut()
    const createSpy = jest.spyOn(openWAStub, 'create')
    const anyName = faker.random.words(3)
    await sut.create({ name: anyName })
    expect(createSpy).toHaveBeenCalledWith({ name: anyName })
  })

  test('deve retornar o resultado da interface OpenWA', async () => {
    const { sut, openWAStub } = makeSut()
    const mockedResult = { id: faker.database.mongodbObjectId() }
    jest.spyOn(openWAStub, 'create').mockResolvedValue(mockedResult)
    const result = await sut.create({ name: 'anyName' })
    expect(result).toEqual(mockedResult)
  })
})
