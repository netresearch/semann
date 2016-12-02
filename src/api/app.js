import Messaging from '../shared/messaging'
import EventEmitter from '../shared/event'

/**
 * postMessage API for the app
 */
class AppApi {
    /**
     * Construct
     *
     * @param options
     */
    constructor(app) {
        this.app = app
    }

    /**
     * Get the origin of the API (application can not find out the origin of the
     * window it is embedded into and thus needs to call this method to find it out
     * and set it to its messaging instance to avoid confusion with other postMessage
     * calls)
     *
     * @returns string
     */
    getOrigin() {
        return this.app.options.origin || document.location.origin
    }

    /**
     * Get the config for the app
     *
     * @returns {*}
     */
    getConfig() {
        return this.app.options.config
    }

    /**
     * Dispatch an event
     *
     * @param event
     */
    dispatch(event) {
        this.app.trigger.apply(this.app, arguments)
    }
}

function _call(app, fn, args) {
    return new Promise((resolve, reject) => {
        app.on('app-registered', () => {
            args = [fn].concat(args ? Array.prototype.slice.call(args, 0) : [])
            app.messaging.call.apply(app.messaging, args).then(resolve, reject)
        })
    })
}

/**
 * App - representing app for Semanot API
 */
export default class App extends EventEmitter {
    /**
     * Construct - create the iframe and establish messaging
     *
     * @param options
     */
    constructor(options) {
        super({memorizeEvents: ['app-registered']})

        this.options = options

        this.iframe = this.options.target.appendChild(document.createElement('iframe'))
        var matches = this.options.src.match(/^https?:\/\/[^/]+/)
        this.messaging = new Messaging(matches ? matches[0] : document.location.origin, this.iframe.contentWindow)
        this.messaging.registerServer('api', new AppApi(this))
        this.iframe.setAttribute('src', this.options.src)
        this.iframe.setAttribute('frameborder', 0)
        this.iframe.setAttribute('scrolling', 'no')
        this.iframe.style.width = this.options.width || '100%'
        this.iframe.style.height = this.options.height || '100%'
    }

    enhance(text) {
        return _call(this, 'app.enhance', arguments)
    }
}