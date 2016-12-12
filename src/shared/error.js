/**
 * Custom error handler
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 * @version  0.0.1
 */
export class SemannError extends Error {

    /**
     * SemannError improves error handling
     *
     * @param {string} [message] - The error message
     */
    constructor(message) {
        super()

        if (Error.hasOwnProperty('captureStackTrace')) {
            Error.captureStackTrace(this, this.constructor)
        } else {
            Object.defineProperty(this, 'stack', {
                value: (new Error()).stack
            })
        }

        Object.defineProperty(this, 'message', {
            value: message
        })
    }
}
