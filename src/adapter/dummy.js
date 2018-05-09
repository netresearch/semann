window.Semann.adapter.dummy = class SemannAdapterDummy {
  settings = {}

  constructor (config) {
    this.config = config || {}
  }

  configure (analyzer) {
    analyzer.setSchema({
      replace: {
        type: 'textarea',
        default: this.config.replace || 'guide, science'
      }
    })
    analyzer.setLocales({
      en: {
        replace: 'List of words to find'
      },
      de: {
        replace: 'Liste zu ersetzender Worte'
      }
    })
  }

  analyze (analysis) {
    const text = analysis.text.toLowerCase()
    console.log(text)
    this.settings.replace
      .toLowerCase()
      .replace(/\s*,\s*/g, ',')
      .split(',')
      .forEach((keyword, i) => {
        let pos = text.indexOf(keyword)
        if (pos >= 0) {
          analysis.found(
            {
              id: [this.id, keyword, i].join('-'),
              title: keyword,
              start: pos,
              length: keyword.length
            }
          )
        }
      })
    analysis.done()
  }
}
