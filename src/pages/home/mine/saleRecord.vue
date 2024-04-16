<script lang="ts" setup>
import { APP_BASE_URL } from '@/config/index'
import ProductPrice from '@/components/goods/ProductPrice.vue'
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { afterReceive, sellHistory } from '@/api/home/goods'
import useUserStore from '@/stores/users';
import type { OrderInfo } from '@/types/OrderInfo';
const userStore = useUserStore()
const sellHistoryList = reactive<OrderInfo[]>([])
const navigateToDetail = (product: OrderInfo) => {
    uni.navigateTo({
        url: `/pages/goods/goodDetail?uId=${userStore.userInfo.id}&pId=${product.productId}`
    })
}
const init = ()=>{
	sellHistory().then(res => {
	    console.log(res, userStore.userInfo);
	    sellHistoryList.length = 0
	    sellHistoryList.push(...res.data)
	})
}
const checkReceive = (item:OrderInfo)=>{
	uni.showModal({
		title:"提示",
		content:"确定收货？",
		success(res) {
			if(res.confirm){
				uni.showLoading({
					title:"请求中，切勿操作！"
				})
				afterReceive(item.afterServiceId as string,item.orderId).then(res =>{
					uni.hideLoading()
					uni.showToast({
						title:res.message,
						icon:"success"
					})
					init()
				}).catch(err=>{
					uni.hideLoading()
				})
			}
		}
	})
	
}
onMounted(() => {
    init()
})
</script>
<template>
    <view class="released-list-container">
        <view class="released-list">
            <view class="list-item" style="position: relative;" v-for="(item, index) in sellHistoryList" :key="item.createTime">
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
                            originPrice="0" :currentPrice="String(item.total)" timeUnit="周" />
                    </view>
                    <image v-if="item.status == 0" style="width: 30%;height: 50%;position: absolute;right: 10px;top: 5px;" src="../../../static/returnMoney.png"></image>
                </view>
                <uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
                <view class="item-operation">
                    <uv-alert v-if="item.status == 2 && item.afterStatus == 0" type="warning" description="商品处于售后状态，请尽快处理"></uv-alert>
					<uv-alert v-if="item.status == 2 && item.afterStatus == 11" type="warning" description="商品售后成功，等待买家发货。。。"></uv-alert>
					<uv-button type="success"
					    v-if="item.status == 2 && item.afterStatus == 12"
					    :plain="true" size="small" shape="circle" :iconSize="18" icon="edit-pen"
					    @tap="checkReceive(item)" text="确认收货"></uv-button>
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
