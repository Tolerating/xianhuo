<!-- 商品发布页 -->
<script setup lang="ts">
import { onMounted } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue';
import { addRequireInfo } from '@/api/home/require'
import type {RequireInfo} from '@/types/RequireInfo'
import { computed } from 'vue';
import CategoryPopup from '@/components/goods/CategoryPopup.vue'
import { onLoad  } from '@dcloudio/uni-app';
import type { Category } from '@/types/Category';
import { requestProductById  } from '@/api/home/goods'
import useUserStore from '@/stores/users/index'
import useProductStore from '@/stores/product';
import { storeToRefs } from 'pinia';
const StatusBarHeight = uni.getSystemInfoSync().statusBarHeight
const statusBarHeight = ref<number>(Number(StatusBarHeight))
// 要编辑商品的id
const userStore = useUserStore()
const {userInfo} = storeToRefs(userStore)
const productStore = useProductStore()
const { categoryList} = storeToRefs(productStore)
// 发布需求表单
const releaseForm = reactive<RequireInfo>({
    categoryId: 1,
    detail: "",
    userId: String(userInfo.value.id),
    status: "1",
    location: userStore.userInfo.location,
    school: userInfo.value.school
})
// 商品类别popup
const categoryPopup = ref()
// 发布商品
const releaseProduct = async () => {
    let result = await addRequireInfo(releaseForm)
    userStore.counts.article++
    uni.showToast({
        title: result.message,
        duration: 2000
    });
    uni.navigateBack()

}

// 计算发布按钮是否可用
const isRelease = computed((): boolean => {
    return !Boolean(releaseForm.detail) 
})

// 监听分类改变
const categoryPopupChange = (e: Category) => {
    releaseForm.categoryId = e.id
}
const showTypeRight = () => {
    categoryPopup.value.show()
}
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
                    <text>发需求</text>
                    <button :disabled="isRelease" @tap="releaseProduct">发布</button>
                </view>
            </view>
        </view>
        <view class="release-content">
            <textarea class="content-textarea" v-model="releaseForm.detail" maxlength="-1"
                placeholder-style="font-size:16px;" placeholder="描述下你的需求..."></textarea>
            <view style="margin-top: 20px;">
                    <uni-icons type="location-filled" :size="23" color="gray" />
                    <text style="color: rgb(15, 105, 241);text-decoration: underline solid rgb(15, 105, 241);">
                        {{ userStore.userInfo.school }}</text>
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

        </view>
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
    
}
</style>
