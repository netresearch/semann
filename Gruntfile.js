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
module.exports = function(grunt) {
    'use strict'
    let path = require('path')

    require('time-grunt')(grunt)
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'build/config/grunt'),
        init: true,

        jitGrunt: {
            staticMappings: {
                availabletasks: 'grunt-available-tasks'
            }
        },
        data: {
            path: path
        }
    })
}
