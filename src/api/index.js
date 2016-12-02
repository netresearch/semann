var distUrl = (function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1].src.split('/').slice(0, -1).join('/')
})()
var extend = require('extend')

import App from './app'
import EventEmitter from '../shared/event'

class Semann {
    constructor(options) {
        this.options = extend(true, {
            distUrl: distUrl,
            app: {
                src: distUrl + '/app.html',
                target: options.target,
                config: {}
            }
        }, options)
        this.app = new App(this.options.app)
    }

    enhance(text) {
        var emitter = new EventEmitter()
        var enhanceId
        this.app.on('enhancement-done', (enhancedId, results) => {
            if (enhanceId === enhancedId) {
                emitter.trigger('enhancement-done', results)
            }
        })
        this.app.enhance(text).then(newEnhanceId => {
            enhanceId = newEnhanceId
        })
        return {
            done: (handler) => {
                emitter.on('enhancement-done', handler)
            }
        }
    }
}

module.exports = Semann
