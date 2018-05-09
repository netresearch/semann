import axios from 'axios'
import Mark from 'mark.js'

const util = {http: axios}

export default class Analysis {
  results = []

  constructor (target, analyzers) {
    this.targets = target ? (Array.isArray(target) ? target : [target]) : []
    this.analyzers = analyzers
    this.running = false
  }

  run () {
    const results = []
    this.running = true
    this.results = results
    const promises = []
    this.targets.forEach(target => {
      let mark
      const text = (target instanceof Element) ? target.innerText : target + ''
      this.analyzers.forEach(analyzer => {
        promises.push(new Promise((resolve, reject) => {
          try {
            analyzer.analyze({
              util,
              text,
              found: (res) => results.push(Object.assign(res, {
                target,
                text,
                analyzer,
                mark () {
                  if (!mark && target instanceof Element) {
                    mark = new Mark(target)
                  }
                  if (mark) {
                    // https://github.com/julmot/mark.js/issues/235
                    mark.mark(text.substring(res.start, res.end), {
                      separateWordSearch: false
                    })
                  }
                },
                unmark () {
                  if (mark) {
                    mark.unmark()
                  }
                }
              })),
              done: resolve,
              fail: reject
            })
          } catch (e) {
            reject(e)
          }
        }))
      })
    })
    return Promise.all(promises).then(() => {
      this.running = false
      return this.results
    })
  }
}
