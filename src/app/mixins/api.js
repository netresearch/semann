/**
 * Api
 *
 * @author  Christian Opitz <christian.optiz@netresearch.de>
 * @license MIT License
 * @link    https://opensource.org/licenses/MIT
 * @version 0.0.1
 */
import Messaging from '../../shared/messaging'

/**
 * Api initialisation
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 */
let messaging = new Messaging('*', window.parent)

let call = function(method, args) {
    return messaging.call.apply(
        messaging,
        ['api.' + method].concat(args ? Array.prototype.slice.call(args, 0) : [])
    )
}

let api = {
    getConfig() { return call('getConfig') },
    dispatch(event) { return call('dispatch', arguments) },
    registerServer(name, object) {
        messaging.registerServer(name, object)
        call('dispatch', [name + '-registered'])
    }
}

module.exports = {
    beforeCreate() { this.api = api },
    init(callback) {
        messaging.call('api.getOrigin').then(result => {
            delete module.exports.init
            messaging.origin = result
            callback(api)
        })
    }
}
