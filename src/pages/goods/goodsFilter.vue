<!-- 商品检索页 -->
<template>
  <water-full-layout class="goods-filter-container">
    <view ref="goodsWrapper" class="goods-wrapper">
      <GoodCard v-for="item in productList" :key="item.detail" :product="item" class="goods-item"></GoodCard>
    </view>
    <uv-load-more v-if="showMore" loadmoreText="没有更多了" color="#606266" marginBottom="30" lineColor="#1CD29B" line />
    <uni-popup ref="popup" type="bottom" background-color="#fff">
      <view class="fileter-popup">
        <uni-section type="line" class="sell-item" title="区域选择">
          <uni-data-checkbox style="padding-left: 10px;" @change="sellModeChange"
            :localdata="[{ id: 1, name: '全部' }, { id: 2, name: '选择区域' }]" :map="{ text: 'name', value: 'id' }"
            v-model="areaSelectedId" mode="button" />
          <navigator v-show="areaSelectedId == 2" url="/pages/home/release/locationSelect" open-type="navigate"
            hover-class="navigator-hover">
            <uni-icons type="location-filled" :size="23" color="gray" />
            <text style="color: rgb(15, 105, 241);">{{ filterArea?.name ? filterArea.name : '点击选择' }}</text>
          </navigator>
        </uni-section>
        <uni-section type="line" class="sell-item" title="售卖模式">
          <uni-data-checkbox style="padding-left: 10px;" :localdata="sellModeExtend" :map="{ text: 'name', value: 'id' }"
            v-model="searchFilter.sellMode" mode="button" />
        </uni-section>
        <uni-section type="line" class="sell-item" title="分类选择">
          <view class="goods-category-container">
            <view :class="{ 'category-selected': item.id == searchFilter.categoryId }" class="category-item "
              v-for=" item  in  categoryListExtend " @tap="searchFilter.categoryId = item.id" :key="item.id">
              {{ item.name }}
            </view>
          </view>
        </uni-section>

        <view class="filter-footer">
          <!-- @vue-ignore -->
          <button type="default" @tap="closeFilterPopup">
            取消
          </button>
          <!-- @vue-ignore -->
          <button type="primary" @tap="getFilterProducts">
            完成
          </button>
        </view>
      </view>
    </uni-popup>
  </water-full-layout>
</template>

<script lang="ts" setup>
import WaterFullLayout from "@/components/WaterFullLayout.vue";
import GoodCard from "@/components/goods/GoodCard.vue";
import { getCurrentInstance, ref } from "vue";
import { onReachBottom, onNavigationBarButtonTap, onNavigationBarSearchInputClicked,onNavigationBarSearchInputChanged, onHide, onLoad, onShow } from "@dcloudio/uni-app";
import { reactive } from "vue";
import useProductStore from '@/stores/product';
import type { AMAPLocation, ProductFilterPrams } from "@/types/common";
import { storeToRefs } from "pinia";
import { toRaw } from "vue";
import { nextTick } from "vue";
import { onMounted } from "vue";
import type { SellMode } from "@/types/SellMode";
import { pageFilterProduct } from '@/api/home/goods'
import { toRef } from "vue";
import type { Category } from "@/types/Category";
import type { Product } from "@/types/Product";
const productStore = useProductStore()
// 解构商品类别列表
const { categoryList, sellModeList } = storeToRefs(productStore)
const sellModeExtend = reactive<SellMode[]>([{ id: 0, name: "全部" }, ...toRaw(sellModeList.value)])
const categoryListExtend = reactive<Category[]>([{ id: 0, name: "全部分类" }, ...toRaw(categoryList.value)])
const productList = reactive<Product[]>([])
const filterArea = reactive<AMAPLocation>({} as AMAPLocation)
// 控制没有更多数据组价的显示
const showMore = ref<boolean>(false)
onShow(() => {
  uni.$once("school-location", (data: AMAPLocation) => {
    data.name = data.name.replace(/\\/g, "")
    Object.assign(filterArea, data)
    const { longitude, latitude } = data.location
    searchFilter.location = `${longitude},${latitude}`
  })
})
// 筛选弹出层的引用
const popup = ref()

// 存放页面传过来的参数
const filterPrams = reactive<ProductFilterPrams>({
  key: "",
  category: 0,
  sell: 0
})

const searchFilter = reactive<{ productName: string, categoryId: number, sellMode: number, location: string }>({
  productName: "",
  categoryId: 0,
  sellMode: 0,
  location: ""
})
const areaSelectedId = ref<number>(1)
const goodsNum = ref<number>(8)
// 当前所在分页
const currentPage = ref<number>(1)
//获取页面实例
const ins = getCurrentInstance()
//@ts-ignore
let webView = ins.ctx.$scope.$getAppWebview();
const sellModeChange = (e: { detail: { value: number, data: SellMode } }) => {
  if (e.detail.value == 1) {
    searchFilter.location = ""
  }

}
// 打开筛选弹出层
const viewPopup = () => {
  popup.value.open()
}
onReachBottom(() => {
  console.log("到底了")
  if (!showMore.value) {
    currentPage.value++
    pageFilterProduct(currentPage.value, 10, searchFilter.productName, searchFilter.location, searchFilter.sellMode, searchFilter.categoryId).then(res => {
      if (res.data.records.length == 0) {
        showMore.value = true
      } else {
        productList.push(...res.data.records)
      }
    })

  }
})
// #ifdef APP-PLUS
  onNavigationBarButtonTap((e: any) => {
    if (e.text == "筛选") {
      popup.value.open()
    }
  })
  onNavigationBarSearchInputClicked(() => {
    uni.hideKeyboard()
    uni.navigateTo({
      url: "/pages/goods/search",
      animationDuration: 0
    })
  })
  
  onNavigationBarSearchInputChanged(()=>{
    console.log("changeljdlklsajfl");
    searchFilter.productName = ""
  })
// #endif
onLoad((option: any) => {
  console.log("onload");

  // 接收页面传值
  const { key, category, sell } = option
  if (key != "" && category != 0) {
    searchFilter.categoryId = category
  } else {
    searchFilter.productName = key
    searchFilter.categoryId = category
  }
  // filterPrams.key = key
  // filterPrams.category = Number(category)
  // filterPrams.sell = Number(sell)

  webView.setTitleNViewSearchInputText(searchFilter.productName)
})

// 点击取消按钮关闭弹出层
const closeFilterPopup = () => {
  popup.value.close()

}

// 点击完成获取符合筛选结果的商品
const getFilterProducts = () => {
  showMore.value = false
  currentPage.value = 1
  popup.value.close()
  pageFilterProduct(currentPage.value, 10, searchFilter.productName, searchFilter.location, searchFilter.sellMode, searchFilter.categoryId).then(res => {
      productList.length = 0
      productList.push(...res.data.records)
  })
}
onMounted(() => {
  console.log("挂载之后");
  pageFilterProduct(currentPage.value, 10, searchFilter.productName, "", searchFilter.sellMode, searchFilter.categoryId).then(res => {
    productList.length = 0
    productList.push(...res.data.records)
  })
})
</script>

<style lang="scss" scoped>
.goods-filter-container {
  background-color: #dee5e3;
  min-height: 100vh;
}



.goods-wrapper {
  display: flex;
  flex-wrap: wrap;


  .goods-item {
    flex: 0 0 50%;
    // max-height: 300px;
    margin-bottom: 10px;

  }
}

.fileter-popup {
  padding: 10px $xianhuo-padding-LR 30px;

  .filter-footer {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
}

.goods-category-container {
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  padding: 5px 10px 0 10px;
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
</style>