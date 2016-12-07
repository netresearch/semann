var config = require('../index')
var merge = require('webpack-merge')
var utils = require('./utils')

if (config.is.development) {
    var webpackConfig = merge(
        require('./base'),
        require('./api'),
        require('./app')
    )
    // add hot-reload related code to entry chunks
    Object.keys(webpackConfig.entry).forEach(function(name) {
        webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name])
    })
    utils.addCompression(webpackConfig)
    module.exports = webpackConfig
} else {
    module.exports = [
        utils.addCompression(merge(require('./base'), require('./api'))),
        utils.addCompression(merge(require('./base'), require('./app')))
    ]
}
