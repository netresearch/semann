var path = require('path')
var utils = require('../utils')
var config = require('../../index')
var merge = require('webpack-merge')

module.exports = merge(
    {
        entry: {
            app: './src/app/index.js'
        },
        resolve: {
            extensions: ['', '.js', '.vue'],
            alias: {
                'src': path.resolve(config.projectRoot, 'src/app'),
                'assets': path.resolve(config.projectRoot, 'src/app/assets'),
                'components': path.resolve(config.projectRoot, 'src/app/components')
            }
        },
        module: {
            preLoaders: [
                {
                    test: /\.vue$/,
                    loader: 'eslint',
                    include: config.projectRoot,
                    exclude: /node_modules/
                }
            ],
            loaders: [
                {
                    test: /\.vue$/,
                    loader: 'vue'
                }
            ].concat(
                utils.styleLoaders({sourceMap: config.sourceMaps.css, extract: config.extractCss})
            )
        },
        vue: {
            loaders: utils.cssLoaders({sourceMap: config.sourceMaps.css, extract: config.extractCss}),
            postcss: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        }
    },
    require('../../index').is.development ? require('./development') : require('./production')
)
