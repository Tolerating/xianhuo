<script lang="ts" setup>
import useProductStore from '@/stores/product/index'
import useUserStore from './stores/users';
import { onLaunch } from '@dcloudio/uni-app';
const productStore = useProductStore()
const userStore = useUserStore()

onLaunch(() => {
	productStore.requestSellMode()
	productStore.requestCategory()
	productStore.requestAllDispatchMode()
	productStore.requestAllProductRequire()
	userStore.getUserInfo()
	uni.getSystemInfo({
    success(res) {
        console.log(res.windowWidth);
        uni.setStorageSync("windowWidth",res.windowWidth / 2 - 38 + 19)
		
    }
})
})

</script>

<style>
/*每个页面公共css */
/* @import url("./assert/css/variable.scss"); */
</style>
