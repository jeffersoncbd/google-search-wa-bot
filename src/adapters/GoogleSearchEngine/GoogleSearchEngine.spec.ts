import { GoogleSearchEngine } from './GoogleSearchEngine'
import google from 'googlethis'
import { faker } from '@faker-js/faker'

const googleOptions = {
  page: 0,
  safe: false,
  additional_params: {
    hl: 'pt',
    lr: 'lang_pt',
    cr: 'BR'
  },
  match_all_images: false,
  ris: false
}

function makeSut() {
  const sut = new GoogleSearchEngine()
  return { sut }
}

describe(GoogleSearchEngine.name, () => {
  test('deve buscar o termo recebido usando "googlethis"', async () => {
    jest.mock('googlethis')
    const { sut } = makeSut()
    const methodSearchSpy = jest.spyOn(google, 'search')
    await sut.search({ term: 'anyTerm' })
    expect(methodSearchSpy).toHaveBeenCalledWith('anyTerm', googleOptions)
  })

  test('deve retornar os dados invertidos e mapeados', async () => {
    jest.mock('googlethis')
    const { sut } = makeSut()
    const value1 = {
      title: faker.random.words(2),
      url: faker.internet.domainName(),
      description: faker.lorem.paragraph()
    }
    const value2 = {
      title: faker.random.words(2),
      url: faker.internet.domainName(),
      description: faker.lorem.paragraph()
    }
    jest
      .spyOn(google, 'search')
      .mockResolvedValue({ results: [value1, value2] } as any)
    const result = await sut.search({ term: 'anyTerm' })
    expect(result).toEqual([value2, value1])
  })
})
