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
        信用：100
      </view>
    </view>
    <!--  商品信息  -->
    <view class="goods-info">
      <!--   价格、发布模式、服务保障等   -->
      <view class="base-info">
        <view class="base-info-left">
          <text>￥68</text>
        </view>
        <view class="base-info-right">
          <!--    交易类别（发布模式）      -->
          <text>出 售</text>
          <text>13浏览</text>
        </view>
      </view>
    </view>
    <!--  商品描述  -->
    <textarea class="goods-description" :disabled="true">
      闲鱼网，也有称闲鱼官网、咸鱼网官网、闲鱼网站二手市场、咸鱼网二手交易平台。闲鱼网（2.taobao.com）      是阿里巴巴淘宝旗下一个社区化的二手闲置交易市场，闲鱼网支持各种同城及线上的担保交易，闲鱼网站二手市场让你轻松在这买卖二手闲置物品...
    </textarea>
    <view class="goods-type">
      <text class="type-title">商品类别</text>
      <view class="type-list">
        <text>衣服</text>
      </view>
    </view>
    <!--  商品图片  -->
    <view class="goods-image" @tap="previewImg">
      <image v-for="item in imgList" :key="item" :src="item" mode="widthFix"></image>
    </view>
    <!--  页脚操作栏  -->
    <view class="goods-detail-footer">
      <view class="footer-icon">
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
      </view>

    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const imgList = ref<string[]>(["/static/yifu.jpg", "/static/kuzi.webp", "/static/kuzi.webp"])
//预览图片
const previewImg = () => {
  uni.previewImage({
    urls: imgList.value
  })
}

</script>

<style lang="scss" scoped>
.goods-detail-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 5px 15px;
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

.goods-type{
  display: flex;
  height: 50px;
  flex-direction: column;
  .type-title{
    font-size: 15px;
    font-weight: bold;
  }
  .type-list{
    
  }

}
.goods-description {
  width: 100%;
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
  inset: 93% 0 0 0;
  background-color: $xianhuo-theme-main;
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

}</style>