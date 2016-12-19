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

    // API documentation
    options: {

        test: {
            type: 'mocha',
            source: './test/unit',
            includes: ['Test\\.(js|es6)$'],
            excludes: ['\\.config\\.(js|es6)$']
        },
        manual: {
            overview: [
                './README.md'
            ],
            installation: [
                './docs/installation.md'
            ]
        }
    },

    api: {
        options: {
            source: './<%= package.directories.src.api %>',
            destination: '<%= package.directories.dest.doc.api %>/',
            title: 'Semann API'
        }
    },

    // App documentation
    app: {
        options: {
            source: '<%= package.directories.src.app %>',
            destination: '<%= package.directories.dest.doc.app %>/',
            title: 'Semann APP'
        }
    },

    // Shared documentation
    shared: {
        options: {
            source: '<%= package.directories.src.shared %>',
            destination: '<%= package.directories.dest.doc.shared %>/',
            title: 'Semann APP'
        }
    }

}
