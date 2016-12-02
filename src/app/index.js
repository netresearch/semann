// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Api from './mixins/api'

var config = require('./config')
var extend = require('extend')

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
