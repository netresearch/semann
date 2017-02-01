/**
 * Vue App
 *
 * @author  Christian Opitz <christian.optiz@netresearch.de>
 * @license MIT License
 * @link    https://opensource.org/licenses/MIT
 * @version 0.0.1
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App'
import Api from './mixins/api'

// Vue components
Vue.use(VueResource)

var config = require('./config')
var extend = require('extend')
Vue.config.devtools = true

/**
 * App initialisation
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 * @version  0.0.1
 */
Api.init(function(api) {
    api.getConfig().then(appConfig => {
        extend(true, config, appConfig)

        // Custom modules
        require('./locale')
        require('./theme')

        /* eslint-disable no-new */
        new Vue({
            el: '#app',
            render: h => h(App)
        })
    })
})

