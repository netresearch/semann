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
'use strict';

module.exports = {

    // API documentation
    api: {
        options: {
            source: './<%= package.directories.src.api %>',
            destination: '<%= package.directories.dest.doc.api %>/',
            test: {
                type: 'mocha',
                source: './test/unit',
                includes: ['Test\\.(js|es6)$'],
                excludes: ['\\.config\\.(js|es6)$']
            },
            title: 'Semann'
        }
    },

    // App documentation
    app: {
        options: {
            source: '<%= package.directories.src.app %>',
            destination: '<%= package.directories.dest.doc.app %>/'
        }
    },

    // Shared documentation
    shared: {
        options: {
            source: '<%= package.directories.src.shared %>',
            destination: '<%= package.directories.dest.doc.shared %>/'
        }
    }

};
