<!-- 商品发布页 -->
<script setup lang="ts">
import { onMounted, toRaw } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue';
import { uploadImg, releaseGoods, updateProduct } from '@/api/home/goods'
import { nextTick } from 'vue';
import { timeUnit, type Product } from '@/types/Product'
import type { AMAPLocation, FileSelect } from '@/types/common'
import { computed } from 'vue';
import CategoryPopup from '@/components/goods/CategoryPopup.vue'
import { onLoad, onShow } from '@dcloudio/uni-app';
import type { Category } from '@/types/Category';
import { requestProductById, allMode } from '@/api/home/goods'
import useUserStore from '@/stores/users/index'
import useProductStore from '@/stores/product';
import { APP_BASE_URL } from '@/config/index'
import { storeToRefs } from 'pinia';
import type { SellModeProductRequire } from '@/types/SellModeProductRequire'
import { watch } from 'vue';
import type { ProductRequire } from '@/types/ProductRequire';


const StatusBarHeight = uni.getSystemInfoSync().statusBarHeight
const statusBarHeight = ref<number>(Number(StatusBarHeight))
// 是否为编辑状态
const isEdit = ref<boolean>(false)
// 要编辑商品的id
const productId = ref<number>(-1)
const userStore = useUserStore()
const productStore = useProductStore()
const { sellModeList, categoryList, dispatchModeList, productRequireList } = storeToRefs(productStore)
// 存放最新的全部售卖、发货、商品要求对应关系列表
const requireRuleList = reactive<SellModeProductRequire[]>([])
// 存储地址选择界面传回的地址信息
const selectedLocation = reactive<AMAPLocation>({} as AMAPLocation)
const wholeAddress = ref<string>("")
watch(()=>selectedLocation.name,(newValue)=>{
    const { city, district, address, name, province } = selectedLocation
    releaseForm.address = `${province}-${city}-${district}-${address}-${name.replace(/\\/g, '')}`
})
onShow(() => {
    uni.$once("school-location", (data) => {
        Object.assign(selectedLocation, data)
        // 处理发布商品定位，格式为 "经度,维度"
        const { longitude, latitude } = data.location
        releaseForm.location = `${longitude},${latitude}`
    })
})
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
    location: "",
    freight: "",
    address: ""
})
// 售卖模式，发货模式，放在reactive中数据初始化无效
const sellMode = ref(0)
const dispatchMode = ref(0)
// checkbox存放选中的商品要求id
const selectedProductRequire = reactive<number[]>([])
// 物品出租下拉选择框数据源
const timeUnitList = reactive<{ value: string, text: string }[]>([])
timeUnit.forEach((ele) => {
    timeUnitList.push({ value: ele, text: ele })
})

// 全部商品要求数据
const requireArray = reactive<ProductRequire[]>([])
// 发货方式为快递的邮费选项
const freightSelect = ref<number>(0)
type PriceType = 0 | 1 | 2
const isCurrentPrice = ref<PriceType>(0)
// 价钱弹出层引用
const pricePopup = ref()
// 商品类别popup
const categoryPopup = ref()
const showuPricePopup = () => {
    pricePopup.value.open()
}

// 图片预览数据源
const preImage = reactive<any>([])

// 商品要求多选框变化事件
const productRequireChange = (e: any) => {
    releaseForm.productRequireId = e.detail.value.join()   
}

// 发布商品
const releaseProduct = async () => {
    let imgArr: string[] = []
    selectImgs.forEach((el) => {
        imgArr.push(el)
    })
    releaseForm.images = imgArr.join()
    // 设置发布者id
    releaseForm.userId = Number(userStore.userInfo.id)
    // 设置售卖模式，发货模式
    releaseForm.sellModeId = sellMode.value
    releaseForm.dispatchModeId = dispatchMode.value
    let result
    if (isEdit.value) {
        result = await updateProduct(releaseForm)
    } else {
        // 处理上传图片服务器路径为字符串，以逗号拼接
        result = await releaseGoods(releaseForm)

    }
    let { message,data } = result
    uni.showToast({
        title: message,
        duration: 2000
    });
	if(isEdit.value){
		data = releaseForm.id
	}
    uni.redirectTo({
    	url: `/pages/goods/goodDetail?uId=${releaseForm.userId}&pId=${data}`
    })

}

// 计算发布按钮是否可用
const isRelease = computed((): boolean => {
    return !(Boolean(releaseForm.detail) && Boolean(selectImgs.size) && Boolean(releaseForm.currentPrice) && Boolean(releaseForm.location))
})

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


// 发货方式单选框计算属性
const dispatchComputed = computed(() => {
    let arr: any = []
    requireRuleList.filter(item => {
        return item.sellModeId == sellMode.value
    }).forEach(item => {
        arr.push(item.dispatchId)
    })
    let result = dispatchModeList.value.filter(item => {
        return arr.indexOf(item.id) != -1
    })
    if (result.length == 1) {
        dispatchMode.value = result[0].id
    }
    return result

})

const requireListCom = computed(()=>{
	let dis = sellMode.value
	let arr:ProductRequire[] = []
	productRequireList.value.forEach(item=>{
		arr.push(item)
	})
	return arr
})

// 根据数据库中的售卖、发货、商品要求关系规则表计算出要显示的商品要求，返回一个数组给商品要求
const requireComputed = computed(() => {
    let arr: number[] = []
    requireRuleList.filter(item => {
        return item.sellModeId == sellMode.value && item.dispatchId == dispatchMode.value
    }).forEach(item => {
        arr.push(item.productRequireId)
    })
    return productRequireList.value.filter(item => {
        return arr.indexOf(item.id) != -1
    })
})




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

const selectedImage = async (e: FileSelect) => {
    const { file } = e
    let result = await uploadImg({ name: "file", uri: file[0].url })
    console.log(result);
    if (selectImgs.has(result.data)) {
        uni.showToast({
            title: "该图片已经上传过"
        })
    } else {
        preImage.push({
            status: "success",
            name: result.data,
            url: APP_BASE_URL + result.data
        })
        selectImgs.set(result.data, result.data)
    }
}

//删除图片 
const deleteImg = (e: any) => {
    console.log(e.file.name);
    let imgIndex;
    for (let index in preImage) {
        if (preImage[index].name == e.file.name) {
            imgIndex = index
            break
        }
    }
    preImage.splice(imgIndex, 1)
}

// 监听分类改变
const categoryPopupChange = (e: Category) => {
    releaseForm.categoryId = e.id
}
const showTypeRight = () => {
    categoryPopup.value.show()
}
const initData = async () => {
    // 编辑状态的数据回显
    if (isEdit.value) {
        const data = await requestProductById(productId.value)
        console.log("要编辑的数据：", data);
        Object.assign(releaseForm, data.data)
        // 设置售卖与发货模式
        sellMode.value = Number(releaseForm.sellModeId)
        // 商品要求选中
        selectedProductRequire.length = 0
        // console.log(...releaseForm.productRequireId.split(",").map(item => Number(item)));

        selectedProductRequire.push(...releaseForm.productRequireId.split(",").map(item => Number(item)))

        // 设置是否包邮
        if (releaseForm.freight as string == "0") {
            freightSelect.value = 1
        }
        releaseForm.images.split(",").forEach(item => {
            preImage.push({
                status: "success",
                name: item,
                url: APP_BASE_URL + item
            })
            selectImgs.set(item, item)
        })
        dispatchMode.value = Number(releaseForm.dispatchModeId)
    } else {
        sellMode.value = sellModeList.value[0].id
        dispatchMode.value = dispatchModeList.value[0].id
    }

}
// 计算所选地点的完整地址
const dispatchAddress = computed(() => {
    const { city, district, address, name, province } = selectedLocation
    return `${province}-${city}-${district}-${address}-${name.replace(/\\/g, '')}`
})


onLoad((option: any) => {
    requireArray.length = 0
	productStore.requestAllProductRequire().then(res=>{
		requireArray.push(...res)	
	})
    allMode().then(res => {
        Object.assign(requireRuleList, res.data)
    });
    if (Object.keys(option).length) {
        isEdit.value = true
        productId.value = option.productId
    }
})
onMounted(() => {
    initData()
})
</script>
<template>
    <view class="release-goods-container">
        <view class="release-navigator">
            <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
            <view class="navigator-bar">
                <navigator open-type="navigateBack" :delta="1" hover-class="navigator-hover">

                    <uni-icons type="closeempty" color="black" size="24" style="padding-right: 5px;" />
                </navigator>
                <view class="navigator-rihgt">
                    <text>{{ isEdit ? "编辑商品" : "发闲置" }}</text>
                    <button :disabled="isRelease" @tap="releaseProduct">{{ isEdit ? "完成" : "发布" }}</button>
                </view>
            </view>
        </view>
        <view class="release-content">
            <textarea class="content-textarea" v-model="releaseForm.detail" maxlength="-1"
                placeholder-style="font-size:16px;" placeholder="描述下宝贝的品牌型号、货品来源..."></textarea>
            <uv-upload :fileList="preImage" name="1" multiple :previewFullImage="true" :maxCount="5"
                @afterRead="selectedImage" @delete="deleteImg" uploadText="选择宝贝图片"></uv-upload>
            <view style="margin-top: 20px;">
                <navigator url="/pages/home/release/locationSelect" open-type="navigate" hover-class="navigator-hover">
                    <uni-icons type="location-filled" :size="23" color="gray" />
                    <text style="color: rgb(15, 105, 241);text-decoration: underline solid rgb(15, 105, 241);">
                        {{ releaseForm.address?releaseForm.address:"选择地址" }}</text>
                </navigator>
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
                    :map="{ text: 'name', value: 'id' }" v-model="sellMode" mode="button" />
            </uni-section>
            <uni-section type="line" class="sell-item" title="发货方式">
                <uni-data-checkbox style="padding-left: 10px;" :localdata="dispatchComputed"
                    :map="{ text: 'name', value: 'id' }" v-model="dispatchMode" mode="button" />
                <uni-section type="line" v-if="dispatchMode == 1" class="sell-item" title="运费">
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
                <uni-data-checkbox style="padding-left: 10px;" :localdata="requireListCom" v-model="selectedProductRequire"
                    :map="{ text: 'name', value: 'id' }" multiple @change="productRequireChange"/>
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
                <view v-if="sellMode == 2" class="price-group">
                    <text>单位</text>
                    <uni-data-select v-model="releaseForm.timeUnit" :localdata="timeUnitList"></uni-data-select>
                </view>
                <hr>
                <view v-if="sellMode != 2" class="price-group">
                    <text style="font-size: 14px;">原价</text>
                    <input style="font-size: 14px;" @input="dealPrice" @focus="isCurrentPrice = 1"
                        v-model="releaseForm.originPrice" placeholder="￥0.00" type="digit">
                </view>
            </view>
        </uni-popup>
        <!-- 商品类别弹出层 -->
        <CategoryPopup ref="categoryPopup" @change="categoryPopupChange" type="bottom"
            :category-id="releaseForm.categoryId"></CategoryPopup>
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
