const { error } = require('./constants')
const File = require('./file')
const assert = require('node:assert')

;(async () => {
  {
    const filePath = './mocks/empty.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/invalid-header.csv'
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/five-items-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/valid.csv'
    const expected = [
      {
        id: 1,
        name: "João",
        profession: "Developer",
        age: 30
      },
      {
        id: 2,
        name: "Vitor",
        profession: "Developer",
        age: 30
      },
      {
        id: 3,
        name: "Alexandre",
        profession: "Developer",
        age: 30
      },
    ]

    const result = await File.csvToJSON(filePath)
    assert.deepEqual(result, expected)
  }
})()