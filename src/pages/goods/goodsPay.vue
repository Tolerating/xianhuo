<script lang="ts" setup>
import ProductPrice from '@/components/goods/ProductPrice.vue'
import { APP_BASE_URL } from '@/config';
import type { Product } from '@/types/Product';
import { addOrderInfo,payProduct } from '@/api/home/goods'
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import useUserStore from '@/stores/users'
import type { OrderInfo } from '@/types/OrderInfo';
const userStore = useUserStore()
let product: Product = {} as Product
const isBuy = ref<Boolean>(false)
const buyProduct = () => {
    isBuy.value = true
    let orderId = new Date().getTime().toString()
    let data:OrderInfo = {
        orderId, 
        buyId: userStore.userInfo.id?.toString() as string,
        sellId:product.userId.toString(), 
        productId: product.id?.toString() as string,
        productAddress:product.address,
		total:product.currentPrice,
        productCategory:String(product.categoryId),
        productDetail:product.detail,
        productImages:product.images 
    }
    addOrderInfo(data).then(res => {
		console.log(data);
        payProduct(orderId).then(res=>{
            uni.requestPayment({
                "provider": "alipay", //固定值为"alipay"
                "orderInfo": res.data, //此处为服务器返回的订单信息字符串
                success: function (res) {
                    var rawdata = JSON.parse(res.rawdata);
                    uni.reLaunch({
                        url:"/pages/home/index"
                    })
                    console.log("支付成功",rawdata);
                },
                fail: function (err) {
                    console.log('支付失败:' + JSON.stringify(err));
                }
            });
        })
    })

}
onLoad((option: any) => {
    let EnvUtils = plus.android.importClass("com.alipay.sdk.app.EnvUtils");
    //@ts-ignore
    EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX);
    console.log(decodeURIComponent(option.product));
    product = JSON.parse(decodeURIComponent(option.product)) as Product
    uni.setNavigationBarTitle({
        title: "确认购买"
    })
})
</script>
<template>
    <view class="check-buy-container">
        <view class="list-item">
            <view class="item-info">
                <view class="item-info-left">
                    <view style="padding-bottom: 100%;position: relative;">
                        <image :src="APP_BASE_URL + product.images?.split(',')[0]" mode="scaleToFill" />
                    </view>
                </view>
                <view class="item-info-right">
                    <view style="display: flex;justify-content: space-between;">
                        <view style="display: flex;">
                            <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text style="font-weight: bold;">{{ product.detail?.slice(0, 16) }}...</text>
                        </view>

                    </view>
                    <view class="item-right-wrapper">
                        <uv-icon name="map" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                        <text>{{ product.address }}</text>
                    </view>
                    <ProductPrice style="display: flex;justify-content: flex-end;margin-top: 15px;"
                        :mode="product.sellModeId" originPrice="0" :currentPrice="product.currentPrice"
                        :timeUnit="product.timeUnit"></ProductPrice>
                </view>
            </view>
        </view>
        <view class="dispatch-info">
            <text>自提</text>
            <text>付款后，将通知卖家到买家协商地点交货</text>
        </view>
        <view class="price-footer">
            <text>实付款: <text style="font-weight: bold;color: red;">￥{{ product.currentPrice }}</text></text>
            <uv-button type="primary" shape="circle" text="确认购买" :disabled="isBuy" @tap="buyProduct"></uv-button>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.check-buy-container {
    display: flex;
    background-color: rgb(233 231 231 / 38%);
    height: calc(100vh - var(--status-bar-height));
    padding: 0 $xianhuo-padding-LR;
    flex-direction: column;

    .list-item {
        $item-height: 160px;
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: $xh-border-radius-base;
        height: $item-height;
        margin-top: 15px;
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
                justify-content: space-around;

                .item-right-wrapper {
                    display: flex;
                    align-items: center;

                    text {
                        font-size: $xh-font-size-base;
                    }
                }
            }
        }


    }

    .dispatch-info {
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: $xh-border-radius-base;
        margin-top: 15px;
        padding: 15px;

        text:nth-child(1) {
            font-size: $xh-font-size-xl;
            padding-left: 10px;
            margin-bottom: 20px;
        }

    }

    .price-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        height: 50px;
        padding-right: 10px;

        text:nth-child(1) {
            padding-right: 10px;
        }

    }
}</style>
