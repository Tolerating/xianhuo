<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import useUserStore from '@/stores/users';
import { cancelFavourite } from '@/api/home/goods'
import type { Product } from '@/types/Product';
import {getInfoByUserId,cancelRequireInfo} from '@/api/home/require'
import type { RequireInfo } from '@/types/RequireInfo';
const userStore = useUserStore()
const {counts} = storeToRefs(userStore)
const infoList = reactive<RequireInfo[]>([])
const navigateToDetail = (product: RequireInfo) => {
    uni.navigateTo({
        url: `/pages/goods/infoDetail?uId=${product.userId}&pId=${product.id}`
    })
}
const cancelStar = (info: RequireInfo, index: number) => {

    uni.showModal({
        title: '提示',
        content: '确定需求已解决？',
        success: function (res) {
            if (res.confirm) {
                cancelRequireInfo(info.id as string).then(res => {
                    uni.showToast({
                        title: res.message
                    })
                    counts.value.article--
                    infoList.splice(index, 1)
                })
            }
        }
    });
}
onMounted(async () => {
    let result = await getInfoByUserId()
    infoList.length = 0
    //@ts-ignore
    infoList.push(...result.data)
})
onLoad(() => {
    uni.setNavigationBarTitle({
        title: "我的求购"
    })
})
</script>
<template>
    <view class="favourite-list-container">
        <uv-empty v-if="infoList.length == 0"
            style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;"></uv-empty>
        <view class="favourite-list">
            <view class="list-item" v-for="(item, index) in infoList" :key="item.detail">
                <view class="item-info" style="position: relative;" >
                    <uv-button style="position: absolute;right: 0;top: 0;" type="success" :plain="true" size="small" shape="circle" :iconSize="18" icon="star"
                                @tap="cancelStar(item, index)" text="已解决"></uv-button>
                    <view class="item-info-left">
                        <view style="padding-bottom: 100%;position: relative;">
                            <image src="../../../static/require.png" mode="scaleToFill" />
                        </view>
                    </view>
                    <view class="item-info-right" @tap="navigateToDetail(item)">
                        <view style="display: flex;justify-content: space-between;">
                            <view style="display: flex;">
                                <uv-icon name="bag" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                                <text>{{ item.detail.slice(0, 6) }}...</text>
                            </view>
                            
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="map" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text>{{ item.school }}</text>
                        </view>
                        <view class="item-right-wrapper">
                            <uv-icon name="clock" style="margin-right: 2px;" color="#2979ff" size="22"></uv-icon>
                            <text style="padding-right: 20px;">{{ item.createTime }}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.favourite-list-container {
    background-color: #ece1e1;
    box-sizing: border-box;
    padding-bottom: 15px;
    min-height: 100vh;

    .favourite-list {
        display: flex;
        flex-direction: column;
        padding: 0 5px;

        .list-item {
            $item-height: 160px;
            display: flex;
            flex-direction: column;
            background-color: white;
            border-radius: $xh-border-radius-base;
            height: $item-height;
            margin-top: 15px;
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
                    justify-content: space-between;

                    .item-right-wrapper {
                        display: flex;
                        align-items: center;
                        text{
                            font-size: $xh-font-size-base;
                        }
                    }
                }
            }

        }
    }
}</style>
