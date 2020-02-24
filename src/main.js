import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import Home from './home.vue'
import Recommend from './recommend.vue'
import Analysis from './analysis.vue'


Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const router = new VueRouter({
  routes:[
    { path: '/', component: Home },
    { path: '/analysis', component: Analysis },
    { path: '/recommend', component: Recommend }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
