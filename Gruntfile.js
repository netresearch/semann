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
 * @license  GNU General Public License
 * @link     https://www.gnu.org/licenses/gpl.html
 */

module.exports = function(grunt) {
    'use strict';
    var path = require('path');

    require('time-grunt')(grunt);
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
    });

};
