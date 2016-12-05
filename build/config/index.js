// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var env = process.env.NODE_ENV || 'production';
var is = {
    development: env === 'development',
    production: env === 'production',
    testing: env === 'testing'
}

module.exports = {
    env: {
        NODE_ENV: '"' + env + '"'
    },
    is: is,
    projectRoot: path.resolve(__dirname, '../../'),
    assetsRoot: 'dist',
    assetsSubDirectory: 'static',
    sourceMaps: {
        js: true,
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        css: false
    },

    extractCss: !is.development,

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting make sure to:
    // npm install --save-dev compression-webpack-plugin
    gzip: false, // gzip: ['js', 'css'],
    server: {
        port: process.env.DEV_PORT || 666,
        url: process.env.DEV_URL || 'http://localhost',
        proxyTable: {}
    }
}
