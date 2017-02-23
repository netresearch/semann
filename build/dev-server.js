process.env.NODE_ENV = process.env.NODE_ENV || 'development'

require('./check-versions')()
let config = require('./config')
let express = require('express')
let webpack = require('webpack')
let opn = require('opn')
let path = require('path')

let app = express()
app.configureWebpackMiddleware = function (webpackConfig) {
    let compiler = webpack(webpackConfig)

    let devMiddleware = require('webpack-middleware')(compiler, {
        publicPath: '/',
        stats: {
            colors: true,
            chunks: false
        }
    })

    let hotMiddleware = require('webpack-hot-middleware')(compiler)

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
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
let proxyMiddleware = require('http-proxy-middleware')
Object.keys(config.server.proxyTable).forEach(function (context) {
    let options = config.server.proxyTable[context]
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.configureWebpackMiddleware(require('./config/webpack'))

// serve pure static assets
app.use('/example', express.static('example'))

module.exports = app.listen(config.server.port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    let uri = config.server.url + ':' + config.server.port
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})
