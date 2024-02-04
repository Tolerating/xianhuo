<script lang="ts" setup>
import useProductStore from '@/stores/product/index'
import { storeToRefs } from 'pinia';
import {APP_BASE_URL} from '@/config/index'
const productStore = useProductStore()
const {productList}  = storeToRefs(productStore)
const navigateToDetail = (productId:number)=>{
    uni.navigateTo({
        url:`/pages/home/release/releaseGoods?productId=${productId}`
    })
}
</script>
<template>
    <view class="released-list-container">
        <uni-notice-bar text="温馨提示：如果填写信息有误可以点击商品展示框或编辑按钮进行修改信息重新发布，如果您不想卖了可以点击下架按钮进行下架。" />
        <view class="released-list">
            <view class="list-item" v-for="item in productList" :key="item.detail" @tap="navigateToDetail(item.id as number)">
                <view class="item-info">
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image
                                :src="APP_BASE_URL + item.images.split(',')[0]"
                                mode="scaleToFill"
                            />
                        </view>
                    </view>
                    <view class="item-info-right">
                        <view>
                            <uni-icons
                            type="gift-filled"
                            color=""
                            size="24"
                        />
                        </view>
                        <view>
                            <uni-icons
                            type="gift-filled"
                            color=""
                            size="24"
                        />
                        </view>
                        <view>
                            <uni-icons
                            type="gift-filled"
                            color=""
                            size="24"
                        />
                        </view>
                        <view>
                            <uni-icons
                            type="gift-filled"
                            color=""
                            size="24"
                        />
                        </view>
                    </view>
                </view>
                <view class="item-operation">
                    <view class="operation-item">
                        <uni-icons
                            type="compose"
                            color="white"
                            size="24"
                        />
                        <text>编辑</text>
                    </view>
                    <view class="operation-item">
                        <uni-icons
                            type="pulldown"
                            color="white"
                            size="24"
                        />
                        <text>下架</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.released-list-container {
    .released-list {
        display: flex;
        flex-direction: column;
        padding: 0 5px;
        .list-item {
            $item-height:150px;
            display: flex;
            flex-direction: column;
            background-color: pink;
            height: $item-height;
            margin-bottom: 15px;
            .item-info {
                display: flex;
                flex: 0 0 80%;
                .item-info-left {
                    width: calc($item-height * 0.8);
                    background-color: $uni-color-primary;
                    image{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }
                }
                .item-info-right {
                    display: flex;
                    flex-direction: column;

                }
            }
            .item-operation {
                flex: 0 1 100%;
                background-color: red;
                display: flex;
                justify-content: space-around;
                .operation-item{
                    display: flex;
                    justify-content: center;
                    background-color: green;
                    padding: 2px 5px;
                    border-radius: $xh-border-radius-sm;
                    text{
                        
                    }
                }
            }
        }
    }
}
</style>
