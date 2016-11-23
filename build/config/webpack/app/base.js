var path = require('path')
var utils = require('../utils')
var config = require('../../index')
var webpack = require('webpack')

module.exports = {
    entry: {
        app: './src/app/index.js'
    },
    output: {
        path: path.join(config.projectRoot, config.assetsRoot),
        publicPath: config.publicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(config.projectRoot, 'node_modules')],
        alias: {
            'src': path.resolve(config.projectRoot, 'src'),
            'assets': path.resolve(config.projectRoot, 'src/assets'),
            'components': path.resolve(config.projectRoot, 'src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(config.projectRoot, 'node_modules')]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.env
        }),
    ],
    module: {
        preLoaders: [
            {
                test: /\.vue$/,
                loader: 'eslint',
                include: config.projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint',
                include: config.projectRoot,
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: config.projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ].concat(
            utils.styleLoaders({sourceMap: config.sourceMaps.css, extract: config.extractCss})
        )
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    vue: {
        loaders: utils.cssLoaders({sourceMap: config.sourceMaps.css, extract: config.extractCss}),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ]
    }
}