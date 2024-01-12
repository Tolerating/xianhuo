<!-- 商品发布页 -->
<script setup lang="ts">
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue';
import { allCategories } from '@/api/home/goods'
import type { Category } from '@/types/Category';
import { nextTick } from 'vue';

//地图经纬度

const StatusBarHeight = uni.getSystemInfoSync().statusBarHeight
const statusBarHeight = ref<number>(Number(StatusBarHeight))
const goodsPrice = ref<number>()
const selectImgs = reactive<Map<string, object>>(new Map())
const releaseForm = reactive<{
    category: number,
    // 现价
    currentPrice: string,
    // 原价
    originPrice: string,
    // 是否接受砍价
    bargainDown: { value: number, text: string }[],
    // 商品图片
    imageList: any[],
    // 商品描述
    description: string,
    [key:string]:unknown
}>({
    category: 1,
    currentPrice: "",
    originPrice: "",
    bargainDown: [{ value: 0, text: "不砍价" }],
    imageList: [],
    description: ""
})



// 存放商品分类
const categoryList = reactive<Category[]>([])
// 焦点是否在现价输入框内，一开始为null
const isCurrentPrice = ref<boolean | null>(null)
const categorySelected = ref<number>(0)
// 价钱弹出层引用
const pricePopup = ref()
// 发货方式弹出层引用
const sellPopup = ref()
// 商品类别右侧抽屉
const goodsTypeRight = ref()
const showuPricePopup = () => {
    pricePopup.value.open()
}
const showSellhWay = () => {
    sellPopup.value.open()
}

// 点击价格输入弹出层弹窗触发
const savePrice = () => {

}

const dealFloatNumber = (value:string,property:string)=>{
    if (value.indexOf('-') != -1) {
        nextTick(() => {
            releaseForm[property] = ""
        })
        return
    }

    if (value.indexOf(".") != -1 && value.split(".")[1].length > 2) {
        nextTick(() => {
            releaseForm[property] = value.split(".")[0] + "." + value.split(".")[1].slice(0, 2)
        })
    }
}

const dealPrice = (e: Event) => {
    //@ts-ignore
    const { value } = e.detail
    if(isCurrentPrice){
        dealFloatNumber(value,'currentPrice')
    }else{
        dealFloatNumber(value,'originPrice')
    }
    
}



const showImgList = (e: any) => {
    selectImgs.set(e.tempFiles[0].uuid, e.tempFiles[0])


}
const deleteImg = (e: any) => {
    selectImgs.delete(e.tempFile.uuid)

}
const showTypeRight = () => {
    goodsTypeRight.value.open()
}
const getCategories = async () => {
    const result = await allCategories();
    categoryList.push(...result.data)

}
// var main = plus.android.runtimeMainActivity();
// var pkName = main.getPackageName();
// console.log(pkName)

onMounted(() => {
    getCategories()
})
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
                <map latitude="39.909" longitude="116.39742"></map>
            </view>
        </view>
        <!-- 商品价钱，发货方式 -->
        <view class="goods-property">
            <view class="property-item" @tap="showTypeRight">
                <text class="property-item-left">商品分类</text>
                <view style="flex: 1;"></view>
                <view class="property-item-right">
                    <text>{{ categoryList[releaseForm.category - 1]?.name }}</text>
                    <uni-icons type="right" color="gray" size="24" />
                </view>
            </view>
            <hr>
            <view class="property-item" @tap="showuPricePopup">
                <text class="property-item-left">价格</text>
                <view style="flex: 1;"></view>
                <view class="property-item-right">
                    <text style="color: red;font-weight: bold;">￥{{ Number(releaseForm.currentPrice) }}</text>
                    <uni-icons type="right" color="gray" size="24" />
                </view>
            </view>
            <hr />
            <view class="property-item" @tap="showSellhWay">
                <text class="property-item-left">售卖模式</text>
                <view style="flex: 1;"></view>
                <view class="property-item-right">
                    <text>邮寄</text>
                    <uni-icons type="right" color="gray" size="24" />
                </view>
            </view>
        </view>
        <!-- 价钱弹出层 -->
        <uni-popup ref="pricePopup" @maskClick="savePrice" type="bottom">
            <view class="input-container">
                <view class="price-group">
                    <text>现价</text>
                    <input placeholder="￥0.00" @input="dealPrice" v-model="releaseForm.currentPrice"
                        @focus="isCurrentPrice = true" type="digit">
                    <!-- <uni-data-checkbox multiple :localdata="releaseForm.bargainDown"></uni-data-checkbox> -->
                </view>
                <hr>
                <view class="price-group">
                    <text style="font-size: 14px;">原价</text>
                    <input style="font-size: 14px;" @input="dealPrice" @focus="isCurrentPrice = false" v-model="releaseForm.originPrice"
                        placeholder="￥0.00" type="digit">
                </view>
            </view>
        </uni-popup>
        <!-- 售卖方式弹出层 -->
        <uni-popup ref="sellPopup" type="bottom">
            <view class="sell-container">
                <view class="sell-item"></view>
                <uni-section type="line" class="sell-item" title="售卖模式">
                    <uni-data-checkbox
                        style="padding-left: 10px;"
                        :localdata="[{value:0,text:'物品出售'},{value:1,text:'物品出租'},{value:2,text:'物品交换'}]"
                        mode="button"
                    />
                </uni-section>
                <uni-section type="line" class="sell-item" title="发货方式">
                    <text style="padding-left: 10px;">自行协商·自提 | 送货上门 | 约定交易地点 | 当面验货交易</text>
                </uni-section>
                <uni-section type="line" class="sell-item" title="商品要求">
                    <uni-data-checkbox
                        style="padding-left: 10px;"
                        :localdata="[{value:0,text:'不砍价'},{value:1,text:'仅限本校'},{value:2,text:'不支持退换货'}]"
                        multiple
                        mode="button"
                    />
                </uni-section>
            </view>
        </uni-popup>
        <!-- 商品类别弹出层 -->
        <uni-popup ref="goodsTypeRight" type="bottom">
            <view class="goods-category-container">
                <view :class="{ 'category-selected': item.id == categorySelected }" class="category-item "
                    v-for="item in categoryList" @tap="categorySelected = item.id" :key="item.id">
                    {{ item.name }}
                </view>
            </view>
        </uni-popup>
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
        padding: 20px;
        padding-bottom: 100px;
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

    }

    .goods-category-container {
        background-color: white;
        display: flex;
        flex-wrap: wrap;
        row-gap: 10px;
        padding: 30px 10px 150px 10px;
        column-gap: 5px;

        .category-item {
            background-color: rgba($color: $xh-color-info, $alpha: .4);
            border-radius: 15px;
            padding: 5px;
            text-align: center;
            flex: 0 0 calc(90%/3)
        }

        .category-item.category-selected {
            background-color: rgba($color: $xh-color-primary, $alpha: .6);
            color: $xh-text-color-highlight;
        }
    }

    .sell-container{
        background-color: white;
        padding-bottom: 100px;
        // display: flex;

        .sell-item{
            margin-bottom: 15px;
        }
    }
}
</style>
