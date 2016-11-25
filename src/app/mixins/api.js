import Messaging from '../../shared/messaging'

var messaging = new Messaging('*', window.parent)
var config = {}
var extend = require('extend')

messaging.call('api.getOrigin').then(result => {
    messaging.origin = result
    messaging.call('api.getConfig').then(appConfig => {
        extend(true, config, appConfig)
    })
})

var call = function(method, args) {
    return messaging.call.apply(
        messaging,
        ['api.' + method].concat(args ? Array.prototype.slice.call(args, 0) : [])
    )
}
var api = {
    getConfig() { return call('getConfig') },
    getOrigin() { return call('getOrigin') },
    setDimensions(width, height) { return call('setDimensions', arguments) }
}

module.exports = {
    beforeCreate() {
        this.api = api
    }
}
