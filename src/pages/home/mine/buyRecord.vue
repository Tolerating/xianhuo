<script lang="ts" setup>
import { APP_BASE_URL } from '@/config/index'
import ProductPrice from '@/components/goods/ProductPrice.vue'
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { buyHistory, updateOrderStatus, askAfterService, askPlatform,afterDispatch } from '@/api/home/goods'
import dayjs from 'dayjs'
import useUserStore from '@/stores/users';
import type { OrderInfo } from '@/types/OrderInfo';
import type { AfterService } from '@/types/AfterService';
const userStore = useUserStore()
const buyHistoryList = reactive<OrderInfo[]>([])
const navigateToDetail = (product: OrderInfo) => {
    uni.navigateTo({
        url: `/pages/goods/goodDetail?uId=${userStore.userInfo.id}&pId=${product.productId}`
    })
}
const init = () => {
    buyHistory().then(res => {
        console.log(res);
        buyHistoryList.length = 0
        buyHistoryList.push(...res.data)
    })
}
const showPlatformBtn = (item: OrderInfo) => {

    let now = dayjs()
    let end = dayjs(item.afterCreateTime).add(3, "day")
    // 测试用
    // let end = dayjs(item.afterCreateTime).add(3, "minute")
    return end.isBefore(now) && item.platformAfterStatus != 0

}
const checkDispatch = (item:OrderInfo)=>{
	uni.showModal({
		title:"提示",
		content:"确定发货？",
		success(res) {
			if(res.confirm){
				afterDispatch(item.afterServiceId as string).then(res=>{
					uni.showToast({
						title:res.message,
						icon:"success"
					})
					init()
				})
			}
		}
	})
	
}
const remainTime = (time: string) => {
    let now = dayjs()
    let end = dayjs(time).add(3, 'day')
    return end.diff(now)
}
const askPlatformDeal = (order: OrderInfo, index: number) => {
    if (order.platformAfterStatus == 1) {
        uni.showModal({
            title: '平台介入',
            editable: true,
            placeholderText: "请输入申请原因",
            success: function (res) {
                if (res.confirm) {
                    if(res.content==""){
                        uni.showToast({
                            title: '请输入申请原因',
                            icon: 'error',
                            duration: 1000
                        })
                    }else{
                        let data: AfterService = {
                            buyerId: String(userStore.userInfo.id),
                            cause: res.content as string,
                            images: order.productImages,
                            productId: order.productId,
                            orderId: order.orderId,
                            sellerId: order.sellId,
                            productDetail: order.productDetail,
                            productPrice: order.total as string,
                            platformStatus:0
                        }
                        updateOrderStatus(Number(order.orderId), 2).then(res => {
                            askAfterService(data).then(res => {
                                uni.showToast({
                                    title: res.message,
                                    icon: 'success',
                                    duration: 1000,
                                    success: function () {
                                        init()
                                    }
                                })
                             })
                        })
                    }
                }
            }
        });
    } else {
        uni.showModal({
             title: "提示",
             content: "确定申请平台介入？",
             success: (res) => {
                 if (res.confirm) {
                     askPlatform(order.afterServiceId as string,order.orderId).then(res => {
                         uni.showToast({
                             title: res.message,
                             success() {
                                 init()
                             }
                         })
                     })
                 }
             }
         })
    }
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
                    productDetail: order.productDetail,
                    productPrice: order.total as string,
					platformStatus:-1
                }
                updateOrderStatus(Number(order.orderId), 2).then(res => {
                    askAfterService(data).then(res => {
                        uni.showToast({
                            title: '申请售后成功',
                            icon: 'success',
                            duration: 1000,
                            success: function () {
                                init()
                            }
                        })
                    })
                })
            }
        }
    });
}

const judgePlatformBtn = (item:OrderInfo)=>{
	let {status,platformFlag,afterStatus,platformAfterStatus} = item;
	// 商家拒绝过一次显示或平台拒绝要求重填
	let condition1 = (platformFlag && status == 1 && afterStatus == -1 && platformAfterStatus == -1) ||( platformAfterStatus == 1 && afterStatus == -1)
	// 商家三天未处理
	let condition2 = item.status == 2 && showPlatformBtn(item) && item.afterStatus == 0 && platformAfterStatus == -1
	return condition1 || condition2
}
const judgeAskAfter = (item:OrderInfo)=>{
	let {status,afterStatus} = item;
	// 第一次申请售后
	let condition1 = status == 1
	// 商家要求重填
	let condition2 = status == 1 && afterStatus == -1 && item.afterStatus == -1
	return condition1 || condition2
}

onMounted(() => {
    init()
})
</script>
<template>
    <view class="released-list-container">
        <uni-notice-bar text="温馨提示：如果您对购买的商品不满意，可以申请售后（请仔细填写申请原因），我们会通知卖家尽快处理。如果卖家三天内未处理，我们会为您开启平台介入。" />
        <view class="released-list">
            <view class="list-item" style="position: relative;" v-for="(item, index) in buyHistoryList"
                :key="item.createTime">
                <view class="item-info" @tap="navigateToDetail(item)">
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image :src="APP_BASE_URL + item.productImages.split(',')[0]" mode="scaleToFill" />
                        </view>
                    </view>
                    <view class="item-info-right">
                        <view class="item-right-wrapper">
                            <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text style="font-weight: bold;">{{ item.productDetail.slice(0, 6) }}...</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="map" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text">{{ item.productAddress }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text">{{ item.createTime }} 下单</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="20"></uv-icon>
                            <text class="item-right-text">{{ item?.payTime }} 支付</text>
                        </view>
                        <ProductPrice style="display: flex;justify-content: flex-end;" :mode="1"
                            originPrice='0' :currentPrice="item.total as string" timeUnit="周" />
                    </view>
                    <image v-if="item.status == 0"
                        style="width: 30%;height: 50%;position: absolute;right: 10px;top: 5px;"
                        src="../../../static/returnMoney.png"></image>
                </view>
                <uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
                <view class="item-operation">
                    <uv-button type="success"
                        v-if="judgeAskAfter(item)"
                        :plain="true" size="small" shape="circle" :iconSize="18" icon="edit-pen"
                        @tap="askAfter(item, index)" text="申请售后"></uv-button>
					<uv-button type="success"
					    v-if="item.status == 2 && item.afterStatus == 11"
					    :plain="true" size="small" shape="circle" :iconSize="18" icon="edit-pen"
					    @tap="checkDispatch(item)" text="确认发货"></uv-button>
                    <uv-button type="success"
                        v-if="judgePlatformBtn(item)"
                        :plain="true" size="small" shape="circle" :iconSize="18" icon="edit-pen"
                        @tap="askPlatformDeal(item, index)" text="申请平台介入"></uv-button>
                    <uv-alert v-if="item.status == 2 && item.platformAfterStatus != 0 && item.afterStatus == 0 && !showPlatformBtn(item)"
                        type="warning" description="正在等待商家处理。。。。"></uv-alert>
                    <uv-alert v-if="item.status == 2 && item.platformAfterStatus == 0" type="warning"
                        description="正在等待平台处理。。。。"></uv-alert>
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
                        font-size: 11px;
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
