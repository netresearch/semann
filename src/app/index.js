// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Api from './mixins/api'

var config = require('./config')
var extend = require('extend')

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

        require('./locale')
        require('./theme')

        /* eslint-disable no-new */
        new Vue({
            el: '#app',
            render: h => h(App)
        })
    })
})
