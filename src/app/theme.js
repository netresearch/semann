import Vue from 'vue'
import VueMaterial from 'vue-material'

var components = [
    'core',
    'toolbar',
    'sidenav',
    'icon',
    'button',
    'list',
    'checkbox',
    'inputContainer',
    'tabs',
    'whiteframe'
]

components.forEach(component => {
    component = 'md' + component[0].toUpperCase() + component.substr(1)
    require('vue-material/dist/components/' + component + '/index.css')
    Vue.use(VueMaterial[component])
})

Vue.material.theme.register('default', require('./config').theme)
