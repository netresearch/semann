var merge = require('webpack-merge')

module.exports = merge(
    {
        entry: {
            api: './src/api/index.js'
        },
        output: {
            library: 'Semann'
        }
    },
    require('../../index').is.development ? require('./development') : require('./production')
)