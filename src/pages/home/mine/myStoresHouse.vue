<script lang="ts" setup>
import useUserStore from '@/stores/users/index'
import { storeToRefs } from 'pinia'
import {productsByUserId} from '@/api/home/goods'
import GoodCard from '@/components/goods/GoodCard.vue'
import { onMounted } from 'vue';
import { reactive } from 'vue';

import type { Product } from '@/types/Product';
import { onLoad } from '@dcloudio/uni-app'
const userStore = useUserStore()
const products = reactive<Product[]>([])
const { userInfo } = storeToRefs(userStore)
const storeMasterInfo = reactive(Object.assign({},userInfo.value))
onLoad((option:any)=>{
    uni.setNavigationBarTitle({
        title:"商品仓库"
    })
	const {self} = option
	if(self==0){
		let data = JSON.parse(decodeURIComponent(option.userInfo))
		Object.assign(storeMasterInfo,data)
	}
	
    productsByUserId(storeMasterInfo.id as number).then(res=>{
        products.length = 0
        products.push(...res.data)
    })
    
})
onMounted(()=>{
})
</script>
<template>
    <view class="released-producted-container">
        <view class="profile_top">
            <image :src="storeMasterInfo.avatar" mode="aspectFill"></image>
            <view class="profile_top_right">
                <text style="font-size: 20px;font-weight: bold;margin-bottom: 5px;">{{ storeMasterInfo.name.length >
                    5 ? storeMasterInfo.name.slice(0, 5) + "..." : storeMasterInfo.name }}的仓库</text>
                <text>欢迎关顾仓库，喜欢就拿下吧！</text>
            </view>
        </view>
        <view class="products-list">
            <GoodCard v-for="item in products" :key="item.createTime" :product="item"></GoodCard>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.released-producted-container {
    background-color: $xh-color-primary;
    min-height: 100vh;

    .profile_top {
        display: flex;
        max-height: 80px;
        padding: 10px;
        align-items: center;

        image {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            border: 1px solid white;
        }

        .profile_top_right {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
        }
    }

    .products-list {
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
