var distUrl = (function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1].src.split('/').slice(0, -1).join('/')
})()
var extend = require('extend')

import App from './app'

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
        console.log(text)
    }
}

module.exports = Semann
