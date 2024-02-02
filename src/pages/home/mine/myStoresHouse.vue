<script lang="ts" setup>
import useUserStore from '@/stores/users/index'
import { storeToRefs } from 'pinia'
import GoodCard from '@/components/goods/GoodCard.vue'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
</script>
<template>
    <view class="released-producted-container">
        <view class="profile_top">
            <image :src="userInfo.avatar" mode="aspectFill"></image>
            <view class="profile_top_right">
                <text style="font-size: 20px;font-weight: bold;margin-bottom: 5px;">{{ userInfo.name.length >
                    5 ? userInfo.name.slice(0, 5) + "..." : userInfo.name }}的仓库</text>
                <text>欢迎关顾仓库，喜欢就拿下吧！</text>
            </view>
        </view>
        <view class="products-list">
            <view class="product-card" v-for="item in 3" :key="item">
                <view style="background-color: aquamarine;">
                    <image src="../../../static/yifu.jpg" class="good-image" mode=""></image>
                    <text class="goods-title">
                        <span>售卖</span>
                        我是标题
                    </text>
                    <view class="goods-price">
                        <text><span>￥</span>680</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.released-producted-container {
    background-color: rgba($color: $xh-theme-color-100, $alpha: .4);
    height: 100vh;

    .profile_top {
        display: flex;
        max-height: 80px;
        padding: 10px;
        align-items: center;

        image {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            border: 1px solid white;
        }

        .profile_top_right {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
        }
    }

    .products-list {
        display: flex;
        flex-wrap: wrap;

        .product-card {
            display: flex;
            flex-direction: column;
            background-color: white;
            overflow: hidden;
            box-sizing: border-box;
            padding: 5px;
            flex: 0 0 50%;

            .good-image {
                width: 100%;
                border-radius: 15px;
                overflow: hidden;
            }
        }
    }
}
</style>
