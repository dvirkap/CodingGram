import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueCodemirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'


// import  '../node_modules/uikit/dist/js/uikit-icons.js'
// import  '../node_modules/uikit/dist/css/uikit.min.css'

// uikit/dist/js/uikit-icons.min.js
import  './css/reset.css'
import  './css/style.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
