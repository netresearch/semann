// https://github.com/shelljs/shelljs
require('./check-versions')()
require('shelljs/global')
process.env.NODE_ENV = 'production'

var path = require('path')
var config = require('./config')
var ora = require('ora')
var webpack = require('webpack')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.assetsRoot, config.assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)

webpack(require('./config/webpack'), function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
})
