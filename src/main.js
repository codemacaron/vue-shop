// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'

// library imports
// Editor
import VueHtml5Editor from 'vue-html5-editor'
import './assets/fontawesome/css/font-awesome.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// plugin setup
Vue.use(VueHtml5Editor, {
  name: 'vue-html5-editor',
  showModuleName: false,
  icons: {
    text: 'fa fa-pencil',
    color: 'fa fa-paint-brush',
    font: 'fa fa-font',
    align: 'fa fa-align-justify',
    list: 'fa fa-list',
    link: 'fa fa-chain',
    unlink: 'fa fa-chain-broken',
    tabulation: 'fa fa-table',
    image: 'fa fa-file-image-o',
    hr: 'fa fa-minus',
    eraser: 'fa fa-eraser',
    undo: 'fa-undo fa',
    'full-screen': 'fa fa-arrows-alt',
    info: 'fa fa-info',
    bars: 'fa fa-bars'
  },
  image: {
    sizeLimit: 512 * 1024,
    upload: {
      url: null,
      headers: {},
      params: {},
      fieldName: {}
    },
    compress: {
      width: 1600,
      height: 1600,
      quality: 80
    },
    uploadHandler (responseText) {
      var json = JSON.parse(responseText)
      if (!json.ok) {
        alert(json.msg)
      } else {
        return json.data
      }
    }
  },
  hiddenModules: [],
  visibleModules: [
    'text',
    'color',
    'font',
    'align',
    'list',
    'link',
    'unlink',
    'tabulation',
    'image',
    'hr',
    'eraser',
    'undo'
  ],
  modules: {
  }
})

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
