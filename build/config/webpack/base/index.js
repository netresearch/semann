var path = require('path')
var utils = require('../utils')
var config = require('../../index')
var webpack = require('webpack')
var merge = require('webpack-merge')

module.exports = merge(
    {
        output: {
            path: path.join(config.projectRoot, config.assetsRoot),
            filename: '[name].js'
        },
        resolve: {
            extensions: ['', '.js'],
            fallback: [path.join(config.projectRoot, 'node_modules')]
        },
        resolveLoader: {
            fallback: [path.join(config.projectRoot, 'node_modules')]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': config.env
            })
        ],
        module: {
            preLoaders: [
                {
                    test: /\.js$/,
                    loader: 'eslint',
                    include: config.projectRoot,
                    exclude: /node_modules/
                }
            ],
            loaders: [
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
            ]
        },
        eslint: {
            formatter: require('eslint-friendly-formatter')
        }
    },
    require('../../index').is.development ? require('./development') : require('./production')
)
