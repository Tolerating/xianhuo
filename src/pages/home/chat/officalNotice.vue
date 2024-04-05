<script lang="ts" setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { allNotices,delNotice } from '@/api/home/goods'
import type { Notice } from '@/types/Notice';
import useCommonStore from '@/stores/common';
import { storeToRefs } from 'pinia';
const commonStore = useCommonStore()
const { unreadNotices } = storeToRefs(commonStore)
const noticeList = reactive<Notice[]>([])

const showDetail = (item: Notice) => {
    if (item.attachType == 0) {
        uni.navigateTo({
            url: `/pages/goods/infoDetail?uId=${item.publisher}&pId=${item.attach}`
        })
    } else {
        uni.navigateTo({
            url: `/pages/goods/goodDetail?uId=${item.publisher}&pId=${item.attach}`
        })
    }

}
const delelteNotice = (item:Notice,index:number)=>{
	delNotice(item.id).then(res=>{
		noticeList.splice(index,1)
		uni.showToast({
			title:res.message,
			icon:"success"
		})
	})
}
onMounted(async () => {
    unreadNotices.value = 0
    let result = await allNotices()
    noticeList.length = 0
    noticeList.push(...result.data)
})
</script>
<template>
    <view class="favourite-list-container">
        <uv-empty v-if="noticeList.length == 0" mode="favor"
            style="position: fixed;top: 0;bottom: 0;left: 0;right: 0;"></uv-empty>
        <uni-card v-for="(item,index) in noticeList" :title="item.title" thumbnail="../../../static/logo.png">
            <text class="uni-body">{{ item.content }}</text>
            <!-- <navigator
                :url="'/pages/goods/infoDetail?uId=' + item.publisher + '&pId='+ item.attach"
                open-type="navigate"
                hover-class="navigator-hover"
            >
                查看详情
            </navigator> -->
            <view slot="actions" class="card-actions">
                <view class="card-actions-item" @tap="showDetail(item)">
                    <uni-icons type="link" size="18" color="#999"></uni-icons>
                    <text class="card-actions-item-text">查看详情</text>
                </view>
                <view class="card-actions-item" @tap="delelteNotice(item,index)">
                    <uni-icons type="trash" size="18" color="#999"></uni-icons>
                    <text class="card-actions-item-text">删除</text>
                </view>
            </view>
        </uni-card>
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

                    .item-right-wrapper {
                        display: flex;
                        align-items: center;

                        text {
                            font-size: $xh-font-size-base;
                        }
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

.card-actions {
    display: flex;
    padding: 5px 10px 0;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eee;
    margin-top: 5px;

    .card-actions-item {
        display: flex;
        align-items: center;
        column-gap: 5px;
    }
}
</style>
