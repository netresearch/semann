/**
 * Generate a uid
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 */
module.exports = function uid() {
    return '' + Math.random().toString(36).substr(2, 9)
}
