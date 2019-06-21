import Vue from 'vue'
import App from './App'
import store from './store/store'
import Fly from 'flyio/dist/npm/wx'

Vue.config.productionTip = false
App.mpType = 'app'

//将store对象放置在vue 的原型上,每个vue对象都可以使用
Vue.prototype.$store = store
//引入fly
//var Fly=require("flyio/dist/npm/wx")
let fly = new Fly
Vue.prototype.$fly = fly

const app = new Vue(App)
app.$mount()
