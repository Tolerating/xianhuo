<!-- 商品发布页 -->
<script setup lang="ts">
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue';
import { allCategories, allSellMode, dispatchModeBySell, productRequireByDispatch, uploadImg, releaseGoods } from '@/api/home/goods'
import type { Category } from '@/types/Category';
import { nextTick } from 'vue';
import { timeUnit, type Product } from '@/types/Product'
import type { SellMode } from '@/types/SellMode';
import type { DispatchMode } from '@/types/DispatchMode'
import type { ProductRequire } from '@/types/ProductRequire'
import { computed } from 'vue';

const StatusBarHeight = uni.getSystemInfoSync().statusBarHeight
const statusBarHeight = ref<number>(Number(StatusBarHeight))

// 存放已经上传的图片的网络地址
const selectImgs = reactive<Map<string, string>>(new Map())

// 发布商品表单
const releaseForm = reactive<Product>({
    id: null,
    categoryId: 1,
    detail: "",
    images: "",
    currentPrice: "",
    timeUnit: "时",
    originPrice: "",
    sellModeId: 1,
    dispatchModeId: 1,
    userId: 1,
    productRequireId: "",
    status: 1,
    location: "123,122",
    freight: ""
})


// 存放商品分类
const categoryList = reactive<Category[]>([])
// 存放售卖模式列表
const sellModeList = reactive<SellMode[]>([])
// 存放发货方式列表
const dispatchModeList = reactive<DispatchMode[]>([])
// 存放商品要求列表
const productRequireList = reactive<ProductRequire[]>([])
// 存放选中的商品要求id
const selectedProductRequire = reactive<number[]>([])
// 物品出租下拉选择框数据源
const timeUnitList = reactive<{ value: string, text: string }[]>([])
timeUnit.forEach((ele) => {
    timeUnitList.push({ value: ele, text: ele })
})
// 发货方式为快递的邮费选项
const freightSelect = ref<number>(0)
// 焦点是否在现价输入框内，一开始为null
type PriceType = 0 | 1 | 2
const isCurrentPrice = ref<PriceType>(0)
// 价钱弹出层引用
const pricePopup = ref()
// 商品类别右侧抽屉
const goodsTypeRight = ref()
const showuPricePopup = () => {
    pricePopup.value.open()
}


// 发布商品
const releaseProduct = async () => {
    let imgArr: string[] = []
    selectImgs.forEach((el) => {
        imgArr.push(el)
    })
    releaseForm.images = imgArr.join()
    console.log(imgArr.join());
    let result = await releaseGoods(releaseForm)
    const { message } = result
    uni.showToast({
        title: message,
        duration: 2000
    });
    uni.navigateBack()
}

// 计算发布按钮是否可用
const isRelease = computed((): boolean => {
    return !(Boolean(releaseForm.detail) && Boolean(selectImgs.size) && Boolean(releaseForm.currentPrice))
})


// 获取商品要求
const requestProductRequire = async () => {
    let productRequire = await productRequireByDispatch(releaseForm.sellModeId, releaseForm.dispatchModeId);
    productRequireList.length = 0
    productRequireList.push(...productRequire.data)
}
// 获取发货方式
const requestdispatchMode = async () => {
    const result = await dispatchModeBySell(releaseForm.sellModeId)
    dispatchModeList.length = 0
    dispatchModeList.push(...result.data)
    // 默认选择第一种发货方式
    releaseForm.dispatchModeId = dispatchModeList[0].id
}
// 处理价钱输入
const dealFloatNumber = (value: string, property: string) => {
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

// 售卖模式改变的监听事件
const getDispatchMode = async () => {
    await requestdispatchMode()
    await requestProductRequire()
}

// 发货方式改变的监听事件
const getProductRequire = async () => {
    requestProductRequire()
}

// 运费方式选择改变时间
const freightChange = (e: any) => {
    const { value } = e.detail;
    if (value == 1) {
        releaseForm.freight = "0.0"
    }
}

const dealPrice = (e: Event) => {
    //@ts-ignore
    const { value } = e.detail
    if (isCurrentPrice.value == 0) {
        dealFloatNumber(value, 'currentPrice')
    } else if (isCurrentPrice.value == 1) {
        dealFloatNumber(value, 'originPrice')
    } else {
        dealFloatNumber(value, 'freight')
    }
}

const selectedImage = async (e: any) => {
    console.log(e);
    // let arr:any = []
    // arr.push({name:"file",file:e.tempFiles[0].file,uri:e.tempFiles[0].path})
    let result = await uploadImg({ name: "file", file: e.tempFiles[0].file, uri: e.tempFiles[0].path })
    console.log(result);
    selectImgs.set(e.tempFiles[0].uuid, result.data)
}
const deleteImg = (e: any) => {
    selectImgs.delete(e.tempFile.uuid)

}
const showTypeRight = () => {
    goodsTypeRight.value.open()
}
const initData = async () => {
    // 获取分类
    const category = await allCategories();
    categoryList.push(...category.data)
    releaseForm.categoryId = category.data[0].id
    // 获取售卖模式
    const sellmodes = await allSellMode();
    sellModeList.push(...sellmodes.data)
    // 设置默认的售卖模式
    releaseForm.sellModeId = sellModeList[0].id
    requestdispatchMode()
    requestProductRequire()

}
onMounted(() => {
    initData()
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
                    <button :disabled="isRelease" @tap="releaseProduct">发布</button>
                </view>
            </view>
        </view>
        <view class="release-content">
            <textarea class="content-textarea" v-model="releaseForm.detail" maxlength="-1"
                placeholder-style="font-size:16px;" placeholder="描述下宝贝的品牌型号、货品来源..."></textarea>
            <uni-file-picker @select="selectedImage" limit="5" @delete="deleteImg" :auto-upload="false"
                file-mediatype="image" file-extname="png,jpg" title="选择宝贝图片"></uni-file-picker>
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
                    <text>{{ categoryList[releaseForm.categoryId - 1]?.name }}</text>
                    <uni-icons type="right" color="gray" size="24" />
                </view>
            </view>
            <hr>
            <uni-section type="line" class="sell-item" title="售卖模式">
                <uni-data-checkbox style="padding-left: 10px;" :localdata="sellModeList"
                    :map="{ text: 'name', value: 'id' }" v-model="releaseForm.sellModeId" @change="getDispatchMode"
                    mode="button" />
            </uni-section>
            <uni-section type="line" class="sell-item" title="发货方式">
                <uni-data-checkbox style="padding-left: 10px;" :localdata="dispatchModeList"
                    :map="{ text: 'name', value: 'id' }" v-model="releaseForm.dispatchModeId" @change="getProductRequire"
                    mode="button" />
                <uni-section type="line" v-if="releaseForm.dispatchModeId == 1" class="sell-item" title="运费">
                    <view style="padding-left: 20px;">
                        <uni-data-checkbox :localdata="[{ value: 0, text: '自己填' }, { value: 1, text: '包邮' }]"
                            @change="freightChange" v-model="freightSelect" />
                        <input v-if="!freightSelect" placeholder="￥0.00" @input="dealPrice"
                            style="width:200px;background-color: #b5adad59;padding: 5px;border-radius: 10px;"
                            v-model="releaseForm.freight" @focus="isCurrentPrice = 2" type="digit">
                    </view>
                </uni-section>
            </uni-section>
            <uni-section type="line" class="sell-item" title="商品要求">
                <uni-data-checkbox style="padding-left: 10px;" :localdata="productRequireList"
                    v-model="selectedProductRequire" :map="{ text: 'name', value: 'id' }" multiple mode="button" />
            </uni-section>
            <hr>
            <view class="property-item" @tap="showuPricePopup">
                <text class="property-item-left">价格</text>
                <view style="flex: 1;"></view>
                <view class="property-item-right">
                    <text style="color: red;font-weight: bold;">￥{{ Number(releaseForm.currentPrice) }}</text>
                    <uni-icons type="right" color="gray" size="24" />
                </view>
            </view>

        </view>
        <!-- 价钱弹出层 -->
        <uni-popup ref="pricePopup" type="center">
            <view class="input-container">
                <view class="price-group">
                    <text>现价</text>
                    <input placeholder="￥0.00" @input="dealPrice" v-model="releaseForm.currentPrice"
                        @focus="isCurrentPrice = 0" type="digit">
                </view>
                <view v-if="releaseForm.sellModeId == 2" class="price-group">
                    <text>单位</text>
                    <uni-data-select v-model="releaseForm.timeUnit" :localdata="timeUnitList"></uni-data-select>
                </view>
                <hr>
                <view v-if="releaseForm.sellModeId != 2" class="price-group">
                    <text style="font-size: 14px;">原价</text>
                    <input style="font-size: 14px;" @input="dealPrice" @focus="isCurrentPrice = 1"
                        v-model="releaseForm.originPrice" placeholder="￥0.00" type="digit">
                </view>
            </view>
        </uni-popup>
        <!-- 商品类别弹出层 -->
        <uni-popup ref="goodsTypeRight" type="bottom">
            <view class="goods-category-container">
                <view :class="{ 'category-selected': item.id == releaseForm.categoryId }" class="category-item "
                    v-for=" item  in  categoryList " @tap="releaseForm.categoryId = item.id" :key="item.id">
                    {{ item.name }}
                </view>
            </view>
        </uni-popup>
    </view>
</template>
<style scoped lang="scss">
$bg-color: #e7e7e7;

.release-goods-container {
    display: flex;
    flex-direction: column;
    background-color: rgba($color: $bg-color, $alpha: .6);
    padding: 0 $xianhuo-padding-LR;
    padding-bottom: 10px;

    .release-navigator {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;

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
        margin: calc(44px + var(--status-bar-height) + 10px) 0 15px 0;

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
            min-height: 50px;

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

        .freight-group {}

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
            flex: 0 0 calc(85%/3)
        }

        .category-item.category-selected {
            background-color: rgba($color: $xh-color-primary, $alpha: .6);
            color: $xh-text-color-highlight;
        }
    }

    .sell-container {
        background-color: white;
        padding-bottom: 100px;
        // display: flex;

        .sell-item {
            margin-bottom: 15px;
        }
    }
}
</style>
