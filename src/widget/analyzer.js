import hash from 'object-hash'

export default class Analyzer {
  schema = {}
  locales = {}

  constructor (definition) {
    if (!definition || !definition.adapter) {
      throw new Error('Analyzer needs an adapter')
    }
    if (!window.Semann.adapter[definition.adapter]) {
      throw new Error(`Adapter ${definition.adapter} is not available`)
    }
    this.id = definition.id || hash(definition)
    this.adapter = new window.Semann.adapter[definition.adapter](definition)
    this.adapter.configure({
      setSchema: (schema) => {
        this.schema = schema || {}
      },
      setLocales: (locales) => {
        this.locales = locales
      }
    })

    const settings = {}
    for (let setting of Object.keys(this.schema)) {
      settings[setting] = this.schema[setting].default
    }
    this.adapter.settings = settings
  }

  analyze (analysis) {
    return this.adapter.analyze(analysis)
  }
}
