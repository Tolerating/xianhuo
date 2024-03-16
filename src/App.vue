<script lang="ts" setup>
import useProductStore from '@/stores/product/index'
import useUserStore from './stores/users';
import useCommonStore from './stores/common';
import { onHide, onLaunch,onShow } from '@dcloudio/uni-app';
import { storeToRefs } from 'pinia';
const productStore = useProductStore()
const userStore = useUserStore()
const commonStore = useCommonStore()
const {socket,socketOpen}  = storeToRefs(commonStore)

onShow(()=>{
	// const pages = getCurrentPages()
	// const page = pages[pages.length - 1]
	// console.log(page.route);
	console.log(commonStore.socket);
	
	if(!socket.value){
		commonStore.initSocket(String(userStore.userInfo.id))
	}	
})

onHide(()=>{
	commonStore.closeSocket()
})

onLaunch(() => {
	console.log("launch", uni.getStorageSync("xh_user"));
	if (uni.getStorageSync("xh_user") != '') {
		productStore.requestSellMode()
		productStore.requestCategory()
		productStore.requestAllDispatchMode()
		productStore.requestAllProductRequire()
		userStore.getUserInfo()
		userStore.initCounts()
		// 用户第一次登录后没有完善用户信息就退出应用，再次打开应用后的判断
		if (userStore.userInfo.name == "") {
			uni.redirectTo({
				url: "/pages/login/setPersonalInfo",
				success() {
					// #ifdef APP-PLUS
					plus.navigator.closeSplashscreen()
					// #endif
				}
			})
		}
		uni.reLaunch({
			url: "/pages/home/index",
			success() {
				// #ifdef APP-PLUS
				plus.navigator.closeSplashscreen()
				// #endif
			}
		})

	} else {
		uni.reLaunch({
			url: "/pages/login/index",
			success() {
				// #ifdef APP-PLUS
				plus.navigator.closeSplashscreen()
				// #endif
			}
		})
	}
	uni.getSystemInfo({
		success(res) {
			uni.setStorageSync("windowWidth", res.windowWidth / 2 - 38 + 19)

		}
	})

})

</script>

<style>
/*每个页面公共css */
/* @import url("./assert/css/variable.scss"); */
</style>
