import { faker } from '@faker-js/faker'
import { ValidationError } from '../_errors/Validation'
import { CreateAGroupThroughOpenWA } from '../_interfaces'
import { CreateGroup } from './Entity'

class CreateGroupStub implements CreateAGroupThroughOpenWA {
  async create() {
    return { id: 'anyId' }
  }
}

function makeSut() {
  const groupStub = new CreateGroupStub()
  const sut = new CreateGroup(groupStub)
  return { sut, groupStub }
}

describe(CreateGroup.name, () => {
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
    const { sut, groupStub } = makeSut()
    const createSpy = jest.spyOn(groupStub, 'create')
    const anyName = faker.random.words(3)
    await sut.create({ name: anyName })
    expect(createSpy).toHaveBeenCalledWith({ name: anyName })
  })

  test('deve retornar o resultado da interface OpenWA', async () => {
    const { sut, groupStub } = makeSut()
    const mockedResult = { id: faker.database.mongodbObjectId() }
    jest.spyOn(groupStub, 'create').mockResolvedValue(mockedResult)
    const result = await sut.create({ name: 'anyName' })
    expect(result).toEqual(mockedResult)
  })
})
