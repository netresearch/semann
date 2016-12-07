process.env.NODE_ENV = process.env.NODE_ENV || 'development'

require('./check-versions')()
var config = require('./config')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')

var app = express()
app.configureWebpackMiddleware = function(webpackConfig) {
    var compiler = webpack(webpackConfig)

    var devMiddleware = require('webpack-middleware')(compiler, {
        publicPath: '/',
        stats: {
            colors: true,
            chunks: false
        }
    })

    var hotMiddleware = require('webpack-hot-middleware')(compiler)

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
            hotMiddleware.publish({action: 'reload'})
            cb()
        })
    })

    // serve webpack bundle output
    app.use(devMiddleware)

    // enable hot-reload and state-preserving
    // compilation error display
    app.use(hotMiddleware)
}

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// proxy api requests
var proxyMiddleware = require('http-proxy-middleware')
Object.keys(config.server.proxyTable).forEach(function(context) {
    var options = config.server.proxyTable[context]
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.configureWebpackMiddleware(require('./config/webpack'))

module.exports = app.listen(config.server.port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = config.server.url + ':' + config.server.port
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})
