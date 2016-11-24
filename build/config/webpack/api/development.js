var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    plugins: [
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            chunks: ['api']
        })
    ]
}
