<script lang="ts" setup>
import useProductStore from '@/stores/product/index'
import { storeToRefs } from 'pinia';
import { APP_BASE_URL } from '@/config/index'
import ProductPrice from '@/components/goods/ProductPrice.vue'
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { deleteProduct, allFavouriteByUserId } from '@/api/home/goods'
import { onLoad } from '@dcloudio/uni-app';
import useUserStore from '@/stores/users';
import { cancelFavourite } from '@/api/home/goods'
import type { Product } from '@/types/Product';
const productStore = useProductStore()
const userStore = useUserStore()
const {counts} = storeToRefs(userStore)
const { sellModeList } = storeToRefs(productStore)
const favouriteList = reactive<Product[]>([])
const sellModeMap = reactive<string[]>([])
sellModeList.value.forEach(item => {
    sellModeMap[item.id] = item.name
})
const navigateToDetail = (product: Product) => {
    uni.navigateTo({
        url: `/pages/goods/goodDetail?uId=${product.userId}&pId=${product.id}`
    })
}
const cancelStar = (product: Product, index: number) => {

    uni.showModal({
        title: '提示',
        content: '确定下架',
        success: function (res) {
            if (res.confirm) {
                cancelFavourite(String(userStore.userInfo.id), String(product.id)).then(res => {
                    uni.showToast({
                        title: res.message
                    })
                    counts.value.star--
                    favouriteList.splice(index, 1)
                })
            }
        }
    });
}
onMounted(async () => {
    let result = await allFavouriteByUserId(String(userStore.userInfo.id))
    favouriteList.length = 0
    favouriteList.push(...result.data)
})
onLoad(() => {
    uni.setNavigationBarTitle({
        title: "我的收藏"
    })
})
</script>
<template>
    <view class="favourite-list-container">
        <uv-empty v-if="favouriteList.length == 0" mode="favor"
            style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;"></uv-empty>
        <view class="favourite-list">
            <view class="list-item" v-for="(item, index) in favouriteList" :key="item.detail">
                <view class="item-info" style="position: relative;" >
                    <uv-button style="position: absolute;right: 0;top: 0;" type="success" :plain="true" size="small" shape="circle" :iconSize="18" icon="star"
                                @tap="cancelStar(item, index)" text="取消收藏"></uv-button>
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image :src="APP_BASE_URL + item.images.split(',')[0]" mode="scaleToFill" />
                        </view>
                    </view>
                    <view class="item-info-right" @tap="navigateToDetail(item)">
                        <view style="display: flex;justify-content: space-between;">
                            <view style="display: flex;">
                                <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                                <text style="font-weight: bold;">{{ item.detail.slice(0, 6) }}...</text>
                            </view>
                            
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="tags" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text>{{ sellModeMap[item.sellModeId] }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="map" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text>{{ item.address }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text style="padding-right: 20px;">{{ item.createTime }}</text>
                        </view>
                        <ProductPrice style="display: flex;justify-content: flex-end;margin-top: 15px;"
                            :mode="item.sellModeId" originPrice="0" :currentPrice="item.currentPrice"
                            :timeUnit="item.timeUnit"></ProductPrice>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.favourite-list-container {
    background-color: #ece1e1;
    min-height: 100vh;

    .favourite-list {
        display: flex;
        flex-direction: column;
        padding: 0 5px;

        .list-item {
            $item-height: 160px;
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: $xh-border-radius-base;
            height: $item-height;
            margin-bottom: 15px;
            padding: 5px;

            .item-info {
                display: flex;

                .item-info-left {
                    flex: 0 0 $item-height;

                    image {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }
                }

                .item-info-right {
                    display: flex;
                    flex-direction: column;

                    .item-right-wrapper {
                        display: flex;
                        align-items: center;
                    }
                }
            }

            .item-operation {
                flex: 0 1 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
        }
    }
}</style>
