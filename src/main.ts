import App from '@/App.vue'
//监听tabbar中间的发布商品按钮的点击事件
uni.onTabBarMidButtonTap(() => {
    console.log(123);
    uni.navigateTo({
        url: "/pages/home/release/releaseIndex"
    })
})

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
import {createSSRApp} from 'vue'
import pinia from './stores'

console.log(import.meta.env.PROD)

export function createApp() {
    const app = createSSRApp(App)
    app.use(pinia as any)
    return {
        app,
        pinia
    }
}

// #endif