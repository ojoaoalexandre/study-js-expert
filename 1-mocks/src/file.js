const { readFile } = require('fs/promises')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, 'utf8')
    const validation = this.isValid(content)

    if(!validation.valid) throw new Error(validation.error)

    const result = this.parseCSVToJSON(content)
    return result
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...rows] = csvString.split(/\r?\n/)
    const isHeaderValid = header === options.fields.join(',')

    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    if(!rows.length || rows.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    const [header, ...content] = csvString.split(/\r?\n/)
    const headerFields = header.split(',')
    const users = content.map(line => {
      const columns = line.split(',')
      let user = {}

      for(const index in columns) {
        user[headerFields[index]] = columns[index].trim()
      }

      return user
    })

    return users
  }
}

module.exports = File