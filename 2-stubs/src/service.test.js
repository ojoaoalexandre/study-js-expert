const Service = require('./service')
const assert = require('assert')

const BASE_URL = 'https://swapi.dev/api/people/1'
const BASE_URL_1 = 'https://swapi.dev/api/people/2'

const { createSandbox } = require('sinon')
const sinon = createSandbox()
const mocks = {
  luke: require("../mocks/luke-skywalker.json"),
  c3po: require("../mocks/c-3po.json")
}

;(async () => {
  const service = new Service()

  const stub = sinon.stub(
    service,
    service.makeRequest.name
  )

  stub.withArgs(BASE_URL).resolves(mocks.luke)
  stub.withArgs(BASE_URL_1).resolves(mocks.c3po)

  {
    const expected = {
      name: 'Luke Skywalker',
      films: 4,
      starships: 2
    }

    const results = await service.getPlanets(BASE_URL)
    assert.deepStrictEqual(results, expected)
  }

  {
    const expected = {
      name: 'C-3PO',
      films: 6,
      starships: 0
    }

    const results = await service.getPlanets(BASE_URL_1)
    assert.deepStrictEqual(results, expected)
  }
})()