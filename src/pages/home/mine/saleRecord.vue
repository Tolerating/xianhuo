<script lang="ts" setup>
import useProductStore from '@/stores/product/index'
import { storeToRefs } from 'pinia';
import { APP_BASE_URL } from '@/config/index'
import type { Product } from '@/types/Product'
import ProductPrice from '@/components/goods/ProductPrice.vue'
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { deleteProduct, sellHistory } from '@/api/home/goods'
import { onLoad } from '@dcloudio/uni-app';
import useUserStore from '@/stores/users';
import type { OrderInfo } from '@/types/OrderInfo';
const productStore = useProductStore()
const userStore = useUserStore()
const sellHistoryList = reactive<OrderInfo[]>([])
const sellModeMap = reactive<string[]>([])
const navigateToDetail = (product: OrderInfo) => {
    uni.navigateTo({
        url: `/pages/goods/goodDetail?uId=${userStore.userInfo.id}&pId=${product.productId}`
    })
}
onMounted(() => {
    sellHistory().then(res => {
        console.log(res, userStore.userInfo);
        sellHistoryList.length = 0
        sellHistoryList.push(...res.data)
    })
})
</script>
<template>
    <view class="released-list-container">
        <uni-notice-bar text="温馨提示：如果填写信息有误可以点击商品展示框或编辑按钮进行修改信息重新发布，如果您不想卖了可以点击下架按钮进行下架。" />
        <view class="released-list">
            <view class="list-item" @tap="navigateToDetail(item)" style="position: relative;" v-for="(item, index) in sellHistoryList" :key="item.createTime">
                <view class="item-info">
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image :src="APP_BASE_URL + item.productImages.split(',')[0]" mode="scaleToFill" />
                        </view>
                    </view>
                    <view class="item-info-right">
                        <view class="item-right-wrapper">
                            <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text style="font-weight: bold;">{{ item.productDetail.slice(0, 6) }}...</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="map" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text">{{ item.productAddress }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text" style="padding-right: 20px;">{{ item.createTime }} 下单</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text" style="padding-right: 20px;">{{ item?.payTime }} 支付</text>
                        </view>
                        <ProductPrice style="display: flex;justify-content: flex-end;margin-top: 15px;" :mode="1"
                            originPrice='0' :currentPrice="item.total as string" timeUnit="周" />
                    </view>
                    <image v-if="item.status == 0" style="width: 30%;height: 50%;position: absolute;right: 10px;top: 5px;" src="../../../static/returnMoney.png"></image>
                </view>
                <uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
                <view class="item-operation">
                    <uv-alert v-if="item.status == 2" type="warning" description="商品处于售后状态，请尽快处理"></uv-alert>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.released-list-container {
    background-color: #ece1e1;
    min-height: 100vh;

    .released-list {
        display: flex;
        flex-direction: column;
        padding: 0 5px;

        .list-item {
            $item-height: 160px;
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: $xh-border-radius-base;
            height: 200px;
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
                        margin-bottom: 5px;
                    }

                    .item-right-text {
                        font-size: $xh-font-size-base;
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
}
</style>
