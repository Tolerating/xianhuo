<template>
  <view class="home-index-wrapper">
    <view class="top-fixed">
      <view class="status_bar">

      </view>
      <view class="home-index-organization">
        <image src="../../static/tabbar/home.png" mode=""></image>
        <text>{{ userInfo.school }}</text>
      </view>
      <view class="search-wrapper">
        <view class="search-input" @tap="jumpSearch">
          <uni-easyinput v-model="searchValue" :disabled="true" type="text" suffix-icon="search" placeholder="雨伞"/>
        </view>
        <view class="search-category">
          <uni-icons type="list" size="25" @tap="toGoodsType">分类</uni-icons>
          <text>分类</text>
        </view>
      </view>
      <DiscoverySwiper @tabChange="getTabSelectedGoods"></DiscoverySwiper>
    </view>
    <template v-for="(item) in tabList" :key="item.id">
      <GoodsWaterFallFlow :disCoveryType="item" v-show="currentTab.id==item.id"></GoodsWaterFallFlow>
    </template>
    <CategoryPopup ref="categoryPopup" type="bottom" @change="navigateToFilter" :category-id="-1"></CategoryPopup>
  </view>

</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {onReachBottom, onPageScroll, onLoad,onPullDownRefresh, onShow} from '@dcloudio/uni-app'
import type {DiscoveryType} from '@/types/common'
import DiscoverySwiper from '@/components/goods/DiscoverySwiper.vue'
import GoodsWaterFallFlow from '@/components/goods/GoodsWaterFallFlow.vue'
import CategoryPopup from '@/components/goods/CategoryPopup.vue'
import useCommonStore from "@/stores/common"
import useUserStore from '@/stores/users/index'
import {storeToRefs} from 'pinia'
import type { Category } from '@/types/Category'
import {setSession} from '@/api/user/login'
import { onMounted } from 'vue'
import useProductStore from '@/stores/product'
import { nextTick } from 'vue'
const searchValue = ref<string>("")
const productStore = useProductStore()
const store = useCommonStore()
const userStore = useUserStore()
const {reachBottom,homeRefesh} = storeToRefs(store)
const {userInfo} = storeToRefs(userStore)
const {tabList, currentTab,initSocket} = store
const {socket} = storeToRefs(store)
const categoryPopup = ref()

onReachBottom(() => {
  store.updateReachBottom(!reachBottom.value)

})
onPullDownRefresh(()=>{
	console.log(1231231313123131);
})
onPageScroll((e) => {
  store.currentScrollTop = e.scrollTop
})
onLoad(() => {
  tabList.forEach((item) => {
    uni.removeStorageSync("discovery" + item.id)
  })

})
const toGoodsType = ()=>{
  categoryPopup.value.show()
}
const jumpSearch = () => {
  uni.navigateTo({
    url: "/pages/goods/search",
    animationType: "slide-in-bottom",
    animationDuration: 0
  })
}
const getTabSelectedGoods = (val: DiscoveryType) => {

  // let timer = setTimeout(() => {
    nextTick(()=>{
      uni.pageScrollTo({
        scrollTop: uni.getStorageSync("discovery" + val.id) || 0,
        duration: 0,
        fail() {
          console.log("失败了");
        },
        success() {
          console.log("成功了");
        }
      })
    })
    // clearTimeout(timer)
  // }, 10)

  store.updateCurrentTab(val)
}
const navigateToFilter = (e:Category)=>{
  uni.navigateTo({
			url: `/pages/goods/goodsFilter?key=${e.name}&category=${e.id}&sell=0`,
      success(){
        categoryPopup.value.close()
      }

		})
}

onShow(()=>{
	homeRefesh.value = !homeRefesh.value
	// if(!socket.value){
	// 	initSocket(String(userInfo.value.id))
	// }
    // setSession()
})
</script>

<style lang="scss" scoped>
$icon-size: 25px;
.home-index-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: flex-start;
  width: 100%;
  background-color: #dee5e3;
  min-height: 100vh;

  .status_bar {
    background-color: #d4c9a7;
    height: var(--status-bar-height);
  }

  .home-index-organization {
    padding: 5px 10px 0px 10px;
    $line-height: 30px;
    display: flex;
    align-items: center;
    height: $line-height;
    background-color: white;
    font-size: 16px;

    image {
      width: $icon-size;
      height: $icon-size;
    }

    text {
      padding-left: 10px;
    }
  }

  .search-wrapper {
    display: flex;
    padding: 0px 5px 0 10px;
    height: 40px;
    align-items: center;
    background-color: white;

    .search-input {
      flex: 9;
    }

    .search-category {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-left: 10px;
      flex: 1;
      font-size: 13px;
    }
  }
}

.top-fixed {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10000;
}
</style>