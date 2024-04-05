<script lang="ts" setup>
import { APP_BASE_URL } from '@/config/index'
import { onMounted } from 'vue';
import { reactive, ref } from 'vue';
import { afterHistory } from '@/api/home/goods'
import useUserStore from '@/stores/users';
import type { AfterService } from '@/types/AfterService';
const userStore = useUserStore()
const buyAfterList = reactive<AfterService[]>([])
const sellAfterList = reactive<AfterService[]>([])
const currentTab = ref<number>(0)
const navigateToDetail = (product: AfterService) => {
    uni.navigateTo({
        url: `/pages/goods/goodDetail?uId=${userStore.userInfo.id}&pId=${product.productId}`
    })
}

onMounted(() => {
    afterHistory().then(res => {
        buyAfterList.length = 0
        buyAfterList.push(...(res.data?.filter(item => {
            return item.buyerId == String(userStore.userInfo.id)
        }) || []))
        sellAfterList.length = 0
        sellAfterList.push(...(res.data?.filter(item => {
            return item.sellerId == String(userStore.userInfo.id)
        }) || []))
    })


})
</script>
<template>
    <view class="released-list-container">
        <!-- <uni-notice-bar text="温馨提示：如果您对购买的商品不满意，可以申请售后（请仔细填写申请原因），我们会通知卖家尽快处理。如果卖家三天内未处理，我们会为您开启平台介入。" /> -->
        <view class="btn-group">
            <uv-button class="group-item" :type="currentTab === 0 ? 'primary' : 'default'" @tap="currentTab = 0">购买商品</uv-button>
            <uv-button class="group-item" :type="currentTab === 1 ? 'primary' : 'default'" @tap="currentTab = 1">售出商品</uv-button>
        </view>
        <view v-show="currentTab === 0" class="released-list">
            <uv-empty mode="data" v-if="buyAfterList.length === 0" ></uv-empty>
            <view class="list-item" v-for="(item, index) in buyAfterList" @tap="navigateToDetail(item)" :key="item.createTime">
                <view class="item-info">
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image :src="APP_BASE_URL + item.images.split(',')[0]" mode="scaleToFill" />
                        </view>
                    </view>
                    <view class="item-info-right">
                        <view class="item-right-wrapper">
                            <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text style="font-weight: bold;">{{ item.productDetail.slice(0, 10) }}...</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text" >{{ item.createTime }} 申请</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text" >{{ (item.sellerDealTime &&
                item.platformDealTime) || item.sellerDealTime }} 处理</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="tags" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text">商品价格：￥{{ item.productPrice
                                }}</text>
                        </view>
                    </view>
                </view>
                <uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
                <view class="item-operation">
                    <uv-alert v-if="item.status == 1" type="success" :description="'退款成功，退款金额：￥'+item.productPrice"></uv-alert>
                    <uv-alert v-if="item.status == -1" type="error"
                        :description="'退款失败，原因：'+((item.sellerRefuseCause && item.platformResult) || item.sellerRefuseCause)"></uv-alert>
                </view>
            </view>
        </view>
        <view v-show="currentTab === 1" class="released-list">
            <uv-empty mode="data" v-if="sellAfterList.length === 0" ></uv-empty>
            <view class="list-item" v-for="(item, index) in sellAfterList" @tap="navigateToDetail(item)" :key="item.createTime">
                <view class="item-info">
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image :src="APP_BASE_URL + item.images.split(',')[0]" mode="scaleToFill" />
                        </view>
                    </view>
                    <view class="item-info-right">
                        <view class="item-right-wrapper">
                            <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text style="font-weight: bold;">{{ item.productDetail.slice(0, 10) }}...</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text">{{ item.createTime }} 申请</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text">{{ (item.sellerDealTime &&
                item.platformDealTime) || item.sellerDealTime }} 处理</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="tags" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text">申请原因：{{ item.cause
                                }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="tags" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text">商品价格：￥{{ item.productPrice
                                }}</text>
                        </view>
                    </view>
                </view>
                <uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
                <view class="item-operation">
                    <uv-alert v-if="item.status == 1" type="success" :description="'退款成功，退款金额：￥'+item.productPrice"></uv-alert>
                    <uv-alert v-if="item.status == -1" type="error"
                        :description="'退款失败，原因：'+((item.sellerRefuseCause && item.platformResult) || item.sellerRefuseCause)"></uv-alert>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.released-list-container {
    background-color: #ece1e1;
    min-height: 100vh;
    padding: 0 $xianhuo-padding-LR;

    .btn-group {
        position: fixed;
        left: 0;
        right: 0;
        display: flex;
        background-color: white;
        border-bottom: 1px solid #141414;
        // height: 50px;
        .group-item{
            flex: 1;
        }
    }

    .released-list {
        display: flex;
        flex-direction: column;
        padding-top: 50px;

        .list-item {
            $item-height: 150px;
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: $xh-border-radius-base;
            height: 200px;
            margin-bottom: 15px;
            overflow: hidden;

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
                        font-size: $xh-font-size-sm;
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
