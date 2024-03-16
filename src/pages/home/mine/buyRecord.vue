<script lang="ts" setup>
import { APP_BASE_URL } from '@/config/index'
import ProductPrice from '@/components/goods/ProductPrice.vue'
import { computed, onMounted } from 'vue';
import { reactive } from 'vue';
import { deleteProduct, buyHistory, updateOrderStatus, askAfterService, getAfterService, allAfterService, askPlatform } from '@/api/home/goods'
import dayjs from 'dayjs'
import useUserStore from '@/stores/users';
import type { OrderInfo } from '@/types/OrderInfo';
import type { AfterService } from '@/types/AfterService';
const userStore = useUserStore()
const buyHistoryList = reactive<OrderInfo[]>([])
const AfterServiceList = reactive<AfterService[]>([])
const navigateToDetail = (product: OrderInfo) => {
    uni.navigateTo({
        url: `/pages/goods/goodDetail?uId=${userStore.userInfo.id}&pId=${product.productId}`
    })
}
const showPlatformBtn = (item: OrderInfo) => {
    // let flag = false
    let after = AfterServiceList.filter((cur) => {
        return cur.orderId == item.orderId
    })[0]
    console.log(after);

    let now = dayjs()
    // let end = dayjs(after.createTime).add(3, "day")
    let end = dayjs(after?.createTime).add(3, "minute")
    return end.isBefore(now) && after?.platformStatus !=0

}

const judgePlatform = (item: OrderInfo) => {
    let after = AfterServiceList.filter((cur) => {
        return cur.orderId == item.orderId
    })[0]
    return after?.platformStatus==0
}

const remainTime = (time: string) => {
    let now = dayjs()
    let end = dayjs(time).add(3, 'day')
    return end.diff(now)
}
const initAfterList = () => {
    allAfterService(String(userStore.userInfo.id)).then(res => {
        AfterServiceList.length = 0
        AfterServiceList.push(...res.data)
    })
}
const askPlatformDeal = (order: OrderInfo, index: number) => {
    let after = AfterServiceList.filter((cur) => {
        return cur.orderId == order.orderId
    })[0]
    uni.showModal({
        title: "提示",
        content: "确定申请平台介入？",
        success: (res) => {
            if (res.confirm) {
                askPlatform(after.id as string).then(res => {
                    uni.showToast({
                        title:res.message,
                        success(){
                            AfterServiceList[index].platformStatus = 0
                        }
                    })
                })
            }
        }
    })
}
const askAfter = (order: OrderInfo, index: number) => {
    uni.showModal({
        title: '申请售后',
        editable: true,
        placeholderText: "请输入申请原因",
        success: function (res) {
            if (res.confirm) {
                let data: AfterService = {
                    buyerId: String(userStore.userInfo.id),
                    cause: res.content as string,
                    images: order.productImages,
                    productId: order.productId,
                    orderId: order.orderId,
                    sellerId: order.sellId,
                    productDetail:order.productDetail,
                    productPrice: order.total as string
                }
                updateOrderStatus(Number(order.orderId), 2).then(res => {
                    askAfterService(data).then(res => {
                        uni.showToast({
                            title: '申请售后成功',
                            icon: 'success',
                            duration: 1000,
                            success: function () {
                                initAfterList()
                            }
                        })
                    })
                })
            }
        }
    });
}

onMounted(() => {
    buyHistory().then(res => {
        console.log(res);
        buyHistoryList.length = 0
        buyHistoryList.push(...res.data)
    })
    initAfterList()
    // console.log(dayjs("2024-03-12").add(3,"day").);


})
</script>
<template>
    <view class="released-list-container">
        <uni-notice-bar text="温馨提示：如果您对购买的商品不满意，可以申请售后（请仔细填写申请原因），我们会通知卖家尽快处理。如果卖家三天内未处理，我们会为您开启平台介入。" />
        <view class="released-list">
            <view class="list-item" v-for="(item, index) in buyHistoryList" :key="item.createTime">
                <view class="item-info" @tap="navigateToDetail(item)">
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
                </view>
                <uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
                <view class="item-operation">
                    <uv-button type="success" v-if="item.status == 1" :plain="true" size="small" shape="circle"
                        :iconSize="18" icon="edit-pen" @tap="askAfter(item, index)" text="申请售后"></uv-button>
                    <uv-button type="success" v-if="item.status == 2 && showPlatformBtn(item)" :plain="true"
                        size="small" shape="circle" :iconSize="18" icon="edit-pen" @tap="askPlatformDeal(item, index)"
                        text="申请平台介入"></uv-button>
                        <uv-alert v-if="item.status == 2 && !judgePlatform(item) && !showPlatformBtn(item)" type="warning" description="正在等待商家处理。。。。"></uv-alert>
                        <uv-alert v-if="item.status == 2 && judgePlatform(item)" type="warning" description="正在等待平台处理。。。。"></uv-alert>
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
