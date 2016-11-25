import Messaging from '../shared/messaging'

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
     * Set the App dimensions
     *
     * @param width
     * @param height
     */
    setDimensions(width, height) {
        this.app.iframe.style.width = width + 'px'
        this.app.iframe.style.height = height + 'px'
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
}

/**
 * App - representing app for Semanot API
 */
export default class App {
    /**
     * Construct - create the iframe and establish messaging
     *
     * @param options
     */
    constructor(options) {
        this.options = options

        this.iframe = this.options.target.parentNode.appendChild(document.createElement('iframe'))
        var matches = this.options.src.match(/^https?:\/\/[^/]+/)
        this.messaging = new Messaging(matches ? matches[0] : document.location.origin, this.iframe.contentWindow)
        this.messaging.registerServer('api', new AppApi(this))
        this.iframe.setAttribute('src', this.options.src)
        this.iframe.setAttribute('frameborder', 0)
        this.iframe.setAttribute('scrolling', 'no')
    }
}
