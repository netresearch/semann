export default class EventEmitter {
    constructor(options) {
        this.options = options || {}
        this._memoryEvents = {}
        this._callbacks = {}
    }

    on(event, callback) {
        if (!this._callbacks.hasOwnProperty(event)) {
            this._callbacks[event] = []
        }
        this._callbacks[event].push(callback)
        if (this._memoryEvents[event]) {
            callback.apply(this, this._memoryEvents[event])
        }
        return this
    }

    trigger(event) {
        var args = Array.prototype.slice.call(arguments, 1)
        if (this._callbacks[event]) {
            this._callbacks[event].forEach(function(callback) {
                return callback.apply(this, args)
            }.bind(this))
        }
        if (this.options.memorizeEvents && this.options.memorizeEvents.indexOf(event) > -1) {
            this._memoryEvents[event] = args
        }
    }
}
