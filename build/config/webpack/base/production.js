var config = require('../../index')
var webpack = require('webpack')

module.exports = {
    devtool: config.sourceMaps.js ? '#source-map' : false,
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}
