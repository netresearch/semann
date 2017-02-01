/**
 * Vue View initialisation
 *
 * @author  Christian Opitz <christian.optiz@netresearch.de>
 * @license MIT License
 * @link    https://opensource.org/licenses/MIT
 * @version 0.0.1
 */

import Vue from 'vue'
import VueMaterial from 'vue-material'

/**
 * Theme initialisation
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 * @version  0.0.1
 */

let components = [
    'core',
    'avatar',
    'button',
    'buttonToggle',
    'checkbox',
    'divider',
    'icon',
    'list',
    'inputContainer',
    'menu',
    'radio',
    'select',
    'sidenav',
    'switch',
    'table',
    'tabs',
    'toolbar',
    'tooltip',
    'whiteframe'
]

components.forEach(component => {
    component = 'md' + component[0].toUpperCase() + component.substr(1)
    require('vue-material/dist/components/' + component + '/index.css')
    Vue.use(VueMaterial[component])
})

Vue.material.theme.register('default', require('./config').theme)
