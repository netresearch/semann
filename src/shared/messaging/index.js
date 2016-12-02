import uid from './uid'

export default class Messaging {
    /**
     * Constructor - add required listeners
     *
     * @param origin
     * @param windowObject
     */
    constructor(origin, windowObject) {
        var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent'
        var event = window[eventMethod]
        var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'
        event(messageEvent, function(e) {
            var origin = e.origin || e.originalEvent.origin
            if (e.source === this.window && origin === this.origin || this.origin === '*') {
                this._handle(e.data)
            }
        }.bind(this), false)

        this.origin = origin
        this.window = windowObject
        this.servers = {}
        this._handlers = {}
    }

    /**
     * Register an object which's methods and child objects methods can be called
     * from a messaging client
     *
     * @param name
     * @param object
     */
    registerServer(name, object) {
        this.servers[name] = object
    }

    /**
     * Creates a handler for the return of a method called on another messaging server
     *
     * @returns {{callbacks: Array}}
     * @private
     */
    _createHandler() {
        var handler = { callbacks: [] }
        handler.then = function(callback) {
            if (handler.hasOwnProperty('_result')) {
                callback(handler._result)
            } else {
                handler.callbacks.push(callback)
            }
            return handler
        }
        return handler
    }

    /**
     * Call a method on another messaging server
     *
     * @param method
     * @returns Promise
     */
    call(method) {
        var args = Array.prototype.slice.call(arguments, 1)
        var id = uid()
        return new Promise(resolve => {
            this._handlers[id] = resolve
            this.window.postMessage({id: id, method: method, arguments: args}, this.origin)
        })
    }

    /**
     * Handle the result of a method called on a messaging server and invoke the
     * appropriate listener
     *
     * @param message
     * @private
     */
    _handle(message) {
        if (message.method === 'resolve') {
            if (this._handlers[message.id]) {
                this._handlers[message.id](message.result)
                delete this._handlers[message.id]
            }
        } else {
            var methodPath = message.method.split('.')
            var method = methodPath.pop()
            var target = this.servers
            while (target && methodPath.length) {
                target = target[methodPath.shift()]
            }
            if (!target || !target[method]) {
                throw new Error('Unknown method "' + message.method + '"')
            }
            var result = target[method].apply(target, message.arguments)
            var resolve = function(res) {
                // It might occure, that the id is reset, when the target frame is removed
                if (message.id) {
                    this.window.postMessage({method: 'resolve', id: message.id, result: res}, this.origin)
                }
            }.bind(this)
            if (typeof result === 'function') {
                result(resolve)
            } else {
                resolve(result)
            }
        }
    }
}
