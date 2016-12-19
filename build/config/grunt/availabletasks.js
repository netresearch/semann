/**
 * This file is a part of Semann
 *
 * JavaScript ECMAScript 6
 *
 * Grunt task configuration
 *
 * @category JavaScript
 * @package  Netresearch\LEDS\Grunt
 * @author   André Lademann <andre.lademann@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 */
'use strict'

module.exports = {

    tasks: {
        options: {
            groups: {
                'Development': ['dev', 'test', 'availabletasks', 'default'],
                'Production': ['prod', 'all']
            }
        }
    }
}
