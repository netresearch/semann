/**
 * Localisation initialisation
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 * @version  0.0.1
 */

let Vue = require('vue')
let VueI18n = require('vue-i18n')

Vue.use(VueI18n)
let locales = ['de', 'en']
locales.forEach(locale => {
    Vue.locale(locale, require('./' + locale))
})

let lang = require('../config').language
if (lang === 'auto') {
    lang = (navigator.language || navigator.userLanguage).replace(/^([a-z][a-z]).+$/, '$1')
}

if (locales.indexOf(lang) < 0) {
    console.info('Semann is not yet translated into ' + lang + ' - feel free to contribute.')
    lang = 'en'
}

Vue.config.lang = lang
if (lang !== 'en') {
    Vue.config.fallbackLang = 'en'
}
