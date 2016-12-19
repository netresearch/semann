/**
 * Event emitter
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 * @version  0.0.1
 */
export default class EventEmitter {

    /**
     * EventEmitter constructor
     *
     * @param {*} [options=*] - Configuration object (optional)
     */
    constructor(options) {
        /**
         * @type {*} Options object
         */
        this.options = options || {}
        /**
         * @type {*} Events handle
         */
        this._memoryEvents = {}
        /**
         * @type {*} Callbacks container
         */
        this._callbacks = {}
    }

    /**
     * Event listener
     *
     * @param {*} event - Event to listen on
     * @param {*} callback - Callback which is called after event
     * @return {EventEmitter}
     */
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

    /**
     * Event triggering
     *
     * @param {*} event
     */
    trigger(event) {
        let args = Array.prototype.slice.call(arguments, 1)
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
