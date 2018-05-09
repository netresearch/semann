/**
 * Localisation initialisation
 *
 * @author   Christian Opitz <christian.optiz@netresearch.de>
 * @license  MIT License
 * @link     https://opensource.org/licenses/MIT
 * @version  0.0.1
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import de from './de'
import en from './en'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'en',
  messages: {de, en}
})
