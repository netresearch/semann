var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    plugins: [
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'app.html',
            template: 'app.html',
            inject: true,
            chunks: ['app']
        })
    ]
}
