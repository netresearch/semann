var merge = require('webpack-merge')

module.exports = merge(
    {
        entry: {
            api: './src/api/index.js'
        }
    },
    require('../../index').is.development ? require('./development') : require('./production')
)