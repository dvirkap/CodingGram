import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueCodemirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'
// import VueSweetalert2 from 'vue-sweetalert2'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'


// import  '../node_modules/uikit/dist/js/uikit-icons.js'


// uikit/dist/js/uikit-icons.min.js
import  './css/reset.css'
import  './css/style.css'


Vue.config.productionTip = false
// Vue.use(VueSweetalert2);
Vue.use(VueCodemirror, /* { 
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
