<script lang="ts" setup>
import { APP_BASE_URL } from '@/config/index'
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { afterServiceToDeal, dealAfterService } from '@/api/home/goods'
import useUserStore from '@/stores/users';
import type { AfterService } from '@/types/AfterService';
const userStore = useUserStore()
const waitDealAfterList = reactive<AfterService[]>([])
const navigateToDetail = (product: AfterService) => {
    uni.navigateTo({
        url: `/pages/goods/goodDetail?uId=${userStore.userInfo.id}&pId=${product.productId}`
    })
}
const agreeAfter = (item: AfterService, index: number) => {
    uni.showModal({
        title: '售后处理',
        content: "确定同意该售后？",
        success: function (res) {
            if (res.confirm) {
                dealAfterService(item.id as string, item.productId, item.orderId, item.buyerId, "", 1).then(res => {
                    uni.showToast({ title: res.message, icon: 'success' })
                    waitDealAfterList.splice(index, 1)
                })
            }
        }
    });
}
const refuseAfter = (item: AfterService, index: number) => {
    uni.showModal({
        title: '售后处理',
        editable: true,
        placeholderText: "请输入拒绝原因",
        success: function (res) {
            if (res.confirm) {
                if (res.content != "") {
                    dealAfterService(item.id as string, item.productId, item.orderId, item.buyerId, res.content as string, 0).then(res => {
                        uni.showToast({ title: res.message, icon: 'success' })
                        waitDealAfterList.splice(index, 1)
                    })
                }else{
                    uni.showToast({ title: "请输入拒绝原因", icon: 'error' })
                }
            }
        }
    });
}

onMounted(() => {
    afterServiceToDeal().then(res => {
        waitDealAfterList.length = 0
        waitDealAfterList.push(...res.data)
    })


})
</script>
<template>
    <view class="released-list-container">
        <!-- <uni-notice-bar text="温馨提示：如果您对购买的商品不满意，可以申请售后（请仔细填写申请原因），我们会通知卖家尽快处理。如果卖家三天内未处理，我们会为您开启平台介入。" /> -->
        <view class="released-list">
            <uv-empty mode="data" v-if="waitDealAfterList.length === 0"></uv-empty>
            <view class="list-item" v-for="(item, index) in waitDealAfterList" :key="item.createTime">
                <view class="item-info" @tap="navigateToDetail(item)">
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image :src="APP_BASE_URL + item.images.split(',')[0]" mode="scaleToFill" />
                        </view>
                    </view>
                    <view class="item-info-right">
                        <view class="item-right-wrapper">
                            <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text style="font-weight: bold;">{{ item.productDetail.slice(0, 10) }}...</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text" style="padding-right: 20px;">{{ item.createTime }} 申请</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="tags" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text" style="padding-right: 20px;">申请原因：{{ item.cause
                                }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="tags" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text" style="padding-right: 20px;">商品价格：￥{{ item.productPrice
                                }}</text>
                        </view>
                    </view>
                </view>
                <uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
                <view class="item-operation">
                    <uv-button type="success" :plain="true" size="small" shape="circle" :iconSize="18" icon="edit-pen"
                        @tap="agreeAfter(item, index)" text="同意"></uv-button>
                    <uv-button type="success" :plain="true" size="small" shape="circle" :iconSize="18" icon="edit-pen"
                        @tap="refuseAfter(item, index)" text="拒绝"></uv-button>
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
        top: 44px;
        left: 0;
        right: 0;
        display: flex;
        background-color: white;
        border-bottom: 1px solid #141414;

        // height: 50px;
        .group-item {
            flex: 1;
        }
    }

    .released-list {
        display: flex;
        flex-direction: column;
        padding-top: 20px;

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
