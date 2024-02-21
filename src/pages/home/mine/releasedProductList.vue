<script lang="ts" setup>
import useProductStore from '@/stores/product/index'
import { storeToRefs } from 'pinia';
import { APP_BASE_URL } from '@/config/index'
import type { Product } from '@/types/Product'
import ProductPrice from '@/components/goods/ProductPrice.vue'
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { deleteProduct } from '@/api/home/goods'
import { onLoad } from '@dcloudio/uni-app';
import useUserStore from '@/stores/users';
const productStore = useProductStore()
const userStore = useUserStore()
const {counts} = storeToRefs(userStore)
const { productList, sellModeList } = storeToRefs(productStore)
const sellModeMap = reactive<string[]>([])
sellModeList.value.forEach(item => {
    sellModeMap[item.id] = item.name
})
const navigateToDetail = (product: Product) => {
    uni.navigateTo({
        url: `/pages/goods/goodDetail?uId=${userStore.userInfo.id}&pId=${product.id}`
    })
}
const navigateToEdit = (productId: number) => {
    uni.navigateTo({
        url: `/pages/home/release/releaseGoods?productId=${productId}`
    })
}
onLoad(() => {
    uni.setNavigationBarTitle({
        title: "我的发布"
    })
})
const deleteP = (id: number, index: number) => {
    uni.showModal({
        title: '提示',
        content: '确定下架',
        success: function (res) {
            if (res.confirm) {
                deleteProduct(id, -1).then(res => {
                    uni.showToast({
                        title: res.message
                    })
                    counts.value.released--
                    productList.value.splice(index, 1)
                })
            }
        }
    });
}
onMounted(() => {
    productStore.requestProductList()
})
</script>
<template>
    <view class="released-list-container">
        <uni-notice-bar text="温馨提示：如果填写信息有误可以点击商品展示框或编辑按钮进行修改信息重新发布，如果您不想卖了可以点击下架按钮进行下架。" />
        <view class="released-list">
            <view class="list-item" v-for="(item, index) in productList" :key="item.detail">
                <view class="item-info" @tap="navigateToDetail(item)">
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image :src="APP_BASE_URL + item.images.split(',')[0]" mode="scaleToFill" />
                        </view>
                    </view>
                    <view class="item-info-right">
                        <view class="item-right-wrapper">
                            <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text style="font-weight: bold;">{{ item.detail.slice(0, 6) }}...</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="tags" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text">{{ sellModeMap[item.sellModeId] }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="map" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text">{{ item.address }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text class="item-right-text" style="padding-right: 20px;">{{ item.createTime }}</text>
                        </view>
                        <ProductPrice style="display: flex;justify-content: flex-end;margin-top: 15px;"
                            :mode="item.sellModeId" originPrice="0" :currentPrice="item.currentPrice"
                            :timeUnit="item.timeUnit"></ProductPrice>
                    </view>
                </view>
                <uv-line style="margin: 5px 0;" color="#2979ff"></uv-line>
                <view class="item-operation">
                    <uv-button type="success" :plain="true" size="small" shape="circle" :iconSize="18" icon="edit-pen"
                        @tap="navigateToEdit(item.id as number)" text="编辑"></uv-button>
                    <uv-button type="error" :plain="true" size="small" shape="circle" :iconSize="18" icon="trash"
                        @tap="deleteP(item.id as number, index)" text="下架"></uv-button>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.released-list-container {
    background-color: #ece1e1;
    min-height: 100vh;

    .released-list {
        display: flex;
        flex-direction: column;
        padding: 0 5px;

        .list-item {
            $item-height: 160px;
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: $xh-border-radius-base;
            height: 200px;
            margin-bottom: 15px;
            padding: 5px;

            .item-info {
                display: flex;

                .item-info-left {
                    flex: 0 0 $item-height;

                    image {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                    }
                }

                .item-info-right {
                    display: flex;
                    flex-direction: column;

                    .item-right-wrapper {
                        display: flex;
                        align-items: center;
                    }
                    .item-right-text{
                        font-size: $xh-font-size-base;
                    }
                }
            }

            .item-operation {
                flex: 0 1 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
        }
    }
}
</style>
