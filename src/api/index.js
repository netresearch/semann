import App from './app'
import EventEmitter from '../shared/event'

/**
 * Application initialisation
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 * @version  0.0.1
 * */
class Semann {

    /**
     * Semann constructor
     *
     * @param {*} [options] - Configuration object
     */
    constructor(options) {
        let extend = require('extend')
        let distUrl = (function() {
            let scripts = document.getElementsByTagName('script')
            return scripts[scripts.length - 1].src.split('/').slice(0, -1).join('/')
        })()

        this.options = extend(true, {
            distUrl: distUrl,
            app: {
                src: distUrl + './app.html',
                target: options.target,
                config: {}
            }
        }, options)
        this.app = new App(this.options.app)
    }

    /**
     * Enhance the content
     *
     * @param {string} text - Text to enhance
     * @return {{done: (function(*=)), update: (function(*=))}}
     */
    enhance(text) {
        let emitter = new EventEmitter()
        let enhanceId
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
            },
            update: (handler) => {
                emitter.on('enhancement-update', handler)
            }
        }
    }
}

module.exports = Semann
