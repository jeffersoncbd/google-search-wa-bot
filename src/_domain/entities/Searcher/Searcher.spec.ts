import { faker } from '@faker-js/faker'
import { ValidationError } from '../_errors'
import {
  SearchEngineResult,
  SearchEngineStub
} from '../_interfaces/SearchEngine'
import { Searcher } from './Entity'

function makeSut() {
  const engineStub = new SearchEngineStub()
  const sut = new Searcher(engineStub)
  return { sut, engineStub }
}

describe(Searcher.name, () => {
  test('deve lançar "ValidationError" caso o termo de busca não seja informado', async () => {
    const { sut } = makeSut()
    await expect(sut.search({ term: '' })).rejects.toThrow(ValidationError)
    await expect(sut.search({ term: '' })).rejects.toThrow(
      'Não foi informado o termo que deve ser pesquisado'
    )
  })

  test('deve usar "SearchEngine" para buscar o termo recebido', async () => {
    const { sut, engineStub } = makeSut()
    const methodSearchSpy = jest.spyOn(engineStub, 'search')
    const fakeTerm = faker.random.word()
    await sut.search({ term: fakeTerm })
    expect(methodSearchSpy).toHaveBeenCalledWith({ term: fakeTerm })
  })

  test('deve retornar o resultado encontrado por "SearchEngine"', async () => {
    const { sut, engineStub } = makeSut()
    const fakeResult: SearchEngineResult = {
      title: faker.random.words(2),
      url: faker.internet.domainName(),
      description: faker.lorem.paragraph()
    }
    jest.spyOn(engineStub, 'search').mockResolvedValue([fakeResult])
    const result = await sut.search({ term: 'anyTerm' })
    expect(result).toEqual([fakeResult])
  })
})
