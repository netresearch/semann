var Vue = require('vue')
var VueI18n = require('vue-i18n')

Vue.use(VueI18n)
var locales = ['de', 'en']
locales.forEach(locale => {
    Vue.locale(locale, require('./' + locale))
})

var lang = require('../config').language
if (lang === 'auto') {
    lang = (navigator.language || navigator.userLanguage).replace(/^([a-z][a-z]).+$/, '$1')
}
if (locales.indexOf(lang) < 0) {
    console.log('Semann is not yet translated into ' + lang + ' - feel free to contribute')
    lang = 'en'
}
Vue.config.lang = lang
if (lang !== 'en') {
    Vue.config.fallbackLang = 'en'
}
