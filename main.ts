import App from './App'

// #ifndef VUE3
// import Vue from 'vue'
// import {crea}  from 'pinia'
// import './uni.promisify.adaptor'
// Vue.config.productionTip = false
// App.mpType = 'app'
// const app = new Vue({
//   ...App
// })
// app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import pinia from './stores'
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  return {
    app,
	pinia
  }
}
// #endif