import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'


import Edit from './views/Edit.vue'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'home',component: Home},
    { path: '/login',name: 'login',component: Login},
    { path: '/signup',name: 'signup',component: SignUp},
    { path: '/user/:userId',name: 'profile',component: Profile},



    { path: '/edit/:postId?',name: 'edit',component: Edit},
    { path: '/about',name: 'about',component: () => import(/* webpackChunkName: "about" */ './views/About.vue')}
  ]
})


