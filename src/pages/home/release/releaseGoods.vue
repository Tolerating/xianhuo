<!-- 商品发布页 -->
<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue';

const StatusBarHeight = uni.getSystemInfoSync().statusBarHeight
const statusBarHeight = ref<number>(Number(StatusBarHeight))
const goodsPrice = ref<number>()
const selectImgs = reactive<Map<string, object>>(new Map())
const releaseForm = reactive<{
    // 现价
    currentPrice: string,
    // 原价
    originPrice: string,
    // 是否接受砍价
    bargainDown: { value: number, text: string }[],
    // 商品图片
    imageList: any[],
    // 商品描述
    description: string
}>({
    currentPrice: "",
    originPrice: "",
    bargainDown: [{ value: 0, text: "不砍价" }],
    imageList: [],
    description: ""
})

// 焦点是否在现价输入框内，一开始为null
const isCurrentPrice = ref<boolean | null>(null)

// 价钱弹出层引用
const pricePopup = ref()
// 发货方式弹出层引用
const dispatchPopup = ref()
// 商品类别右侧抽屉
const goodsTypeRight = ref()
const showuPricePopup = () => {
    pricePopup.value.open()
}
const showDispatchWay = () => {
    dispatchPopup.value.open()
}
// setInterval(()=>{
//     const selction = getSelection()
//     console.log(selction)

// }, 1000)
// 接受键盘组件的input事件，根据isCurrentPrice分别为currentPrice和originPrice赋值
const setPrice = (value: string) => {
    console.log(isCurrentPrice.value, value);

    if (isCurrentPrice.value == null) return
    if (isCurrentPrice.value) {
        releaseForm.currentPrice += value
    } else {
        releaseForm.originPrice += value
    }

}
// 隐藏价格输入弹出层
const hidePricePopup = () => {
    pricePopup.value.close()
}

const showImgList = (e: any) => {
    selectImgs.set(e.tempFiles[0].uuid, e.tempFiles[0])
    console.log(selectImgs);


}
const deleteImg = (e: any) => {
    selectImgs.delete(e.tempFile.uuid)
    console.log(selectImgs);

}
const showTypeRight= ()=>{
    goodsTypeRight.value.open()
}
</script>
<template>
    <view class="release-goods-container">
        <view class="release-navigator">
            <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
            <view class="navigator-bar">
                <uni-icons type="closeempty" color="black" size="24" style="padding-right: 5px;" />
                <view class="navigator-rihgt">
                    <text>发闲置</text>
                    <button>发布</button>
                </view>
            </view>
        </view>
        <view class="release-content">
            <textarea class="content-textarea" maxlength="-1" placeholder-style="font-size:16px;"
                placeholder="描述下宝贝的品牌型号、货品来源..."></textarea>
            <uni-file-picker @select="showImgList" limit="9" @delete="deleteImg" :auto-upload="false"
                v-model="releaseForm.imageList" title="选择宝贝图片"></uni-file-picker>
            <view style="margin-top: 20px;">
                <!-- 显示自己的学校，不能更改 -->
                <uni-icons type="location-filled" :size="23" color="gray" /><text>浙江万里学院</text>
            </view>
        </view>
        <!-- 商品价钱，发货方式 -->
        <view class="goods-property">
            <view class="property-item" @tap="showTypeRight">
                <text class="property-item-left">商品分类</text>
                <view style="flex: 1;"></view>
                <view class="property-item-right">
                    <text>衣服/长袖</text>
                    <uni-icons type="right" color="gray" size="24" />
                </view>
            </view>
            <hr>
            <view class="property-item" @tap="showuPricePopup">
                <text class="property-item-left">价格</text>
                <view style="flex: 1;"></view>
                <view class="property-item-right">
                    <text>￥0.00</text>
                    <uni-icons type="right" color="gray" size="24" />
                </view>
            </view>
            <hr />
            <view class="property-item" @tap="showDispatchWay">
                <text class="property-item-left">发货方式</text>
                <view style="flex: 1;"></view>
                <view class="property-item-right">
                    <text>邮寄</text>
                    <uni-icons type="right" color="gray" size="24" />
                </view>
            </view>
        </view>
        <!-- 价钱弹出层 -->
        <uni-popup ref="pricePopup" type="center">
            <view class="input-container">
                <view class="price-group">
                    <text>现价</text>
                    <input placeholder="￥0.00" v-model="releaseForm.currentPrice" @focus="isCurrentPrice = true"
                        type="digit">
                    <uni-data-checkbox multiple :localdata="releaseForm.bargainDown"></uni-data-checkbox>
                </view>
                <hr>
                <view class="price-group">
                    <text style="font-size: 14px;">原价</text>
                    <input style="font-size: 14px;" @focus="isCurrentPrice = false" v-model="releaseForm.originPrice"
                        placeholder="￥0.00" type="digit">
                </view>
            </view>
        </uni-popup>
        <!-- 发货方式弹出层 -->
        <uni-popup ref="dispatchPopup" type="bottom">

        </uni-popup>
        <!-- 商品类别右侧抽屉 -->
        <uni-drawer ref="goodsTypeRight" mode="right" :mask-click="false">
			<scroll-view style="height: 100%;" scroll-y="true">
				<button  type="button">关闭Drawer</button>
				<view v-for="item in 60" :key="item">可滚动内容 {{ item }}</view>
			</scroll-view>
		</uni-drawer>
    </view>
</template>
<style scoped lang="scss">
$bg-color: rgba(231, 231, 231, .6);

.release-goods-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: $bg-color;
    padding: 0 $xianhuo-padding-LR;

    .release-navigator {

        .status-bar {
            background-color: $bg-color;
        }

        .navigator-bar {
            height: 44px;
            background-color: $bg-color;
            display: flex;
            align-items: center;

            .navigator-rihgt {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex: 1;

                text:first-child {
                    flex: 1;
                    font-size: $xh-font-size-base;
                    font-weight: bold;
                }

                button {
                    width: 50px;
                    font-size: $xh-font-size-base;
                    line-height: $xh-font-size-base;
                    background-color: $xh-color-primary;
                    font-weight: bold;
                    padding: 4px 2px;
                    margin-right: 10px;
                    border-radius: $xh-border-radius-lg;

                }
            }

        }
    }

    .release-content {
        background-color: white;
        border-radius: 15px;
        box-sizing: border-box;
        padding: 10px;
        margin: 10px 0 15px 0;

        .content-textarea {
            width: 100%;
        }
    }


    .goods-property {
        display: flex;
        flex-direction: column;
        background-color: white;
        border-radius: $xh-border-radius-base;
        padding: 5px;

        hr {
            opacity: .3;
        }

        .property-item {
            display: flex;
            align-items: center;
            height: 50px;

            .property-item-left {
                font-weight: bold;
                font-size: $xh-font-size-base;
            }

            .property-item-right {
                display: flex;
                align-items: center;

                text {
                    font-size: $xh-font-size-base;
                }
            }
        }
    }

    .input-container {
        background-color: white;
        padding: 10px;

        .price-group {
            display: flex;
            align-items: center;
            height: 40px;

            text {
                font-weight: bold;

            }

            input {
                color: $xh-color-error;
                padding-left: 5px;
            }
        }

        hr {
            opacity: .3;
        }

        .price-group {
            input {}
        }

    }
}
</style>
