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
})

</script>

<style>
/*每个页面公共css */
/* @import url("./assert/css/variable.scss"); */
</style>
