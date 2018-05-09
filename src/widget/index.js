/**
 * Vue App
 *
 * @author  Christian Opitz <christian.optiz@netresearch.de>
 * @license MIT License
 * @link    https://opensource.org/licenses/MIT
 * @version 0.0.1
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueCustomElement from 'vue-custom-element'
import Element from './element'
import axios from 'axios'
import i18n from './locale'

import {Semann, connect} from './semann'
import Widget from './components/widget'

window.Semann = Semann

// Vue plugins
Vue.use(VueCustomElement)
Vue.use(Element)
Vue.prototype.$http = axios

function emitCreated () {
  this.$nextTick(() => {
    this.$emit('semann-widget-created', this.$refs.widget)
  })
}

Vue.customElement(
  'semann-widget',
  {
    render (h) {
      return h(Widget, {ref: 'widget'})
    },
    mounted: emitCreated,
    updated: emitCreated
  },
  {
    beforeCreateVueInstance (RootComponentDefinition) {
      RootComponentDefinition.i18n = i18n
      return RootComponentDefinition
    },
    connectedCallback () {
      this.addEventListener('semann-widget-created', (e) => connect(this, e.detail[0]))
    }
  }
)
