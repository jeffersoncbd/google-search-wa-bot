import { faker } from '@faker-js/faker'
import { CreateGroup, GetGroupId } from '../../entities'
import {
  CreateAGroupThroughStub,
  GetGroupIdThroughStub
} from '../../entities/_interfaces'
import { FindOrCreateGroupByName } from './UseCase'

function makeSut() {
  const getGroupIdStub = new GetGroupId(new GetGroupIdThroughStub())
  const createGroupStub = new CreateGroup(new CreateAGroupThroughStub())
  const sut = new FindOrCreateGroupByName({
    findByName: getGroupIdStub,
    createWithName: createGroupStub
  })
  return { sut, getGroupIdStub, createGroupStub }
}

describe(FindOrCreateGroupByName.name, () => {
  test('deve buscar o ID do grupo com o nome recebido usando "GetGroupId"', async () => {
    const { sut, getGroupIdStub } = makeSut()
    const methodGetSpy = jest.spyOn(getGroupIdStub, 'get')
    const fakeName = faker.random.words(3)
    await sut.findOrCreateWith(fakeName)
    expect(methodGetSpy).toHaveBeenCalledWith({ name: fakeName })
  })

  test('deve retornar o ID do grupo encontrado por "GetGroupId"', async () => {
    const { sut, getGroupIdStub } = makeSut()
    const fakeId = faker.database.mongodbObjectId()
    jest.spyOn(getGroupIdStub, 'get').mockResolvedValue({ id: fakeId })
    const groupId = await sut.findOrCreateWith('anyName')
    expect(groupId).toBe(fakeId)
  })

  test('deve criar um grupo se "GetGroupId" não encontrar um grupo com o nome informado', async () => {
    const { sut, getGroupIdStub, createGroupStub } = makeSut()
    const fakeName = faker.random.words(3)
    jest.spyOn(getGroupIdStub, 'get').mockResolvedValue(undefined)
    const methodCreateSpy = jest.spyOn(createGroupStub, 'create')
    await sut.findOrCreateWith(fakeName)
    expect(methodCreateSpy).toHaveBeenCalledWith({ name: fakeName })
  })

  test('deve retornar o ID do grupo criado por "CreateGroup"', async () => {
    const { sut, getGroupIdStub, createGroupStub } = makeSut()
    const fakeId = faker.database.mongodbObjectId()
    jest.spyOn(getGroupIdStub, 'get').mockResolvedValue(undefined)
    jest.spyOn(createGroupStub, 'create').mockResolvedValue({ id: fakeId })
    const groupId = await sut.findOrCreateWith('anyName')
    expect(groupId).toEqual(fakeId)
  })
})
