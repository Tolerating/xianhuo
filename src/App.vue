<script lang="ts" setup>
import useProductStore from '@/stores/product/index'
import useUserStore from './stores/users';
import { onLaunch } from '@dcloudio/uni-app';
const productStore = useProductStore()
const userStore = useUserStore()


onLaunch(() => {
	console.log("launch",uni.getStorageSync("xh_user")=='');
	if(uni.getStorageSync("xh_user")!=''){

		productStore.requestSellMode()
		productStore.requestCategory()
		productStore.requestAllDispatchMode()
		productStore.requestAllProductRequire()
		userStore.getUserInfo()
		userStore.initCounts()
		// 用户第一次登录后没有完善用户信息就退出应用，再次打开应用后的判断
		if (userStore.userInfo.name == "") {
			uni.redirectTo({
				url: "/pages/login/setPersonalInfo"
			})
		}
	}
	uni.getSystemInfo({
		success(res) {
			console.log(res.windowWidth);
			uni.setStorageSync("windowWidth", res.windowWidth / 2 - 38 + 19)

		}
	})
	
})

</script>

<style>
/*每个页面公共css */
/* @import url("./assert/css/variable.scss"); */
</style>
