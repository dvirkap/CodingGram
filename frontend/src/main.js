import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueSocketio from 'vue-socket.io-extended';
import VueSocketIO from 'vue-socket.io'
// import io from 'socket.io-client';

// import VueCodemirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'
// import VueSweetalert2 from 'vue-sweetalert2'

import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'


// import  '../node_modules/uikit/dist/js/uikit-icons.js'


// uikit/dist/js/uikit-icons.min.js
import  './css/reset.css'
import  './css/style.css'
import './registerServiceWorker'


Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://metinseylan.com:1992',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
  // options: { path: "//" } //Optional options
}))
// Vue.use(VueSocketio, io('http://socketserver.com:1923'), { store });
// Vue.use(VueSocketio, io('http://localhost:3000'), { store });
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
