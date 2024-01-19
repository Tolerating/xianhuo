<!-- 商品详情页 -->
<template>
  <view class="goods-detail-container">
    <!--	发布者信息	-->
    <view class="publish-info">
      <view>
        <image src="/static/logo.png"></image>
        <view class="info-right">
          <text style="font-size:15px"><b>很好的卖家</b></text>
          <text style="align-self: center">浙江万里学院</text>
        </view>
      </view>
      <view>
        <!-- <text>信用：100</text> -->
        <view class="store-button">进入TA的仓库</view>
      </view>
    </view>
    <!--  商品信息  -->
    <view class="goods-info">
      <!--   价格、售卖模式   -->
      <view class="base-info">
        <view class="base-info-left">
          <text>￥{{ product.currentPrice }}</text>
        </view>
        <view class="base-info-right">
          <!--   售卖模式      -->
          <SellModeIcon type="出售"></SellModeIcon>
          <!-- <text>13浏览</text> -->
        </view>
      </view>
    </view>
    <!--  商品描述  -->
    <uni-section type="line" padding="0 0 0 20px" class="sell-item" title="商品描述">
      <text class="goods-description">
      {{ product.detail }}
    </text>
    </uni-section>
    <uni-section type="line" padding="0 0 0 20px" class="sell-item" title="商品类别">
      <template v-slot:right>
					{{ categoryName }}
				</template>
    </uni-section>
    <uni-section type="line" padding="0 0 0 20px" class="sell-item" title="发货方式">
      <template v-slot:right>
        <text style="color: red;">{{ dispatchName }}</text>
				</template>
    </uni-section>
    <uni-section v-if="product.productRequireId" type="line" padding="0 0 0 20px" class="sell-item" title="商品要求">
      <uni-tag v-for="item in productRequireNameList" :key="item"
        :text="item"
        size="normal"
        type="warning"
        style="margin-right: 5px;color: black;"
      />
    </uni-section>
    <uni-section type="square" class="sell-item" title="商品图片">
      <view class="goods-image" @tap="previewImg">
      <image v-for="item in imgList" :key="item" :src="item" mode="widthFix"></image>
    </view>
    </uni-section>
   



    <!--  页脚操作栏  -->
    <view class="goods-detail-footer">
      <uni-goods-nav :options="[
        {
          icon: 'star',
          text: '收藏'
        }
      ]" :button-group="[
  {
    text: '咨询卖家',
    backgroundColor: '#fd8464',
    color: '#fff'
  },
  {
    text: '立即购买',
    backgroundColor: '#bf3916',
    color: '#fff'
  }
]" :fill="true" @click="" @button-click="" />
      <!-- <view class="footer-icon">
        <uni-icons type="star" color="black" size="24" />
        <text>
          收藏
        </text>
      </view>
      <view class="footer-icon">
        <uni-icons type="chat" color="black" size="24" />
        <text>
          留言
        </text>
      </view>
      <view class="footer-button">
        <uni-icons type="chatboxes" color="black" size="24" />
        <text>
          我想要
        </text>
      </view> -->

    </view>
  </view>
</template>

<script lang="ts" setup>
import SellModeIcon from '@/components/goods/SellModeIcon.vue'
import { requestProductById } from '@/api/home/goods'
import { ref } from "vue";
import { onMounted } from 'vue';
import { reactive } from 'vue';
import type { Product } from '@/types/Product';
import useProductStore from '@/stores/product';
import useUserStore from '@/stores/users';
import { onLoad } from '@dcloudio/uni-app';
import {APP_BASE_URL} from '@/config/index'

// 商品图片列表
const imgList = reactive<string[]>([])
const product = reactive<Product>({
  id: null,
  categoryId: -1,
  detail: "",
  images: "",
  currentPrice: "",
  timeUnit: "时",
  originPrice: "",
  sellModeId: -1,
  dispatchModeId: -1,
  userId: -1,
  productRequireId: "",
  status: 1,
  location: "",
})
const productStore = useProductStore()
// 商品分类名字
const categoryName = ref<string>("")
// 商品发货方式名字
const dispatchName = ref<string>("")

const productRequireNameList:string[] = []


//预览图片
const previewImg = () => {
  uni.previewImage({
    urls: imgList
  })
}
const init = async () => {
  const result = await requestProductById(1)
  console.log(result);
  Object.assign(product, result.data)
  console.log(productStore.categoryList);
  categoryName.value = productStore.categoryNameById(product.categoryId) || ""
  console.log(categoryName.value);
  imgList.length = 0
  imgList.push(...product.images.split(",").map(value=>APP_BASE_URL + value));
  dispatchName.value = productStore.dispatchModeNameById(product.dispatchModeId) || ""
  productRequireNameList.length = 0
  productRequireNameList.push(...productStore.productRequireNameById(product.productRequireId.split(",")))
  
}
onLoad(()=>{
  init()
})
</script>

<style lang="scss" scoped>
$footer-height: 50px;

.goods-detail-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 5px $xianhuo-padding-LR $footer-height;
}

.publish-info {
  $info-height: 50px;
  display: flex;
  height: $info-height;
  align-items: center;
  justify-content: space-between;

  view:nth-child(1) {
    display: flex;
    align-items: center;
  }

  image {
    height: $info-height - 10px;
    width: $info-height - 10px;
    border-radius: 50%;
  }

  .info-right {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: $info-height;
    align-items: center;
    font-size: 12px;
  }

  .store-button {
    background-color: $xh-color-primary;
    padding: 5px;
    border-radius: 15px;

  }
}

.goods-info {
  $info-height: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;

  .base-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: $info-height;
    width: 100%;

    .base-info-left {
      float: left;
      color: red;
      font-size: 24px;
      font-weight: bold;
    }

    .base-info-right {
      float: right;
      display: flex;
      flex-direction: column;
      font-size: 13px;

      text:nth-child(1) {
        background-color: $xianhuo-theme-main;
      }
    }
  }

}

.goods-type {
  display: flex;
  height: 50px;
  flex-direction: column;

  .type-title {
    font-size: 15px;
    font-weight: bold;
  }

  .type-list {}

}


.goods-image {
  display: flex;
  //width: 100%;
  background-color: #2f2f2f;
  justify-content: space-around;
  flex-wrap: wrap;

  image {
    width: 100%;
  }
}

.goods-detail-footer {
  position: fixed;
  z-index: 1000;
  // inset: 93% 0 0 0;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: $footer-height;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 $xianhuo-padding-LR;
  font-size: 11px;

  .footer-icon {
    display: flex;
    flex-direction: column;
  }

  .footer-button {
    display: flex;
    align-items: center;
    padding: 3px;
    font-size: 16px;
    border-radius: 15px;
    background-color: $xianhuo-theme-color;

    text:nth-last-child(1) {
      font-weight: bold;
    }
  }

}
</style>