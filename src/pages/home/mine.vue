<template>
    <view class="mine_page_wrapper">
        <view class="status_bar" :style="{ height: statusBarHeight + 'px' }">

        </view>
        <view class="mine_top_profile">
            <view class="profile_top">
                <image :src="userInfo.avatar" mode="aspectFill"></image>
                <view class="profile_top_right">
                    <text style="font-size: 20px;">{{ userInfo.name }}</text>
                    <!-- <text>关注 0 | 粉丝 0</text> -->
                </view>
            </view>
            <view class="profile_bottom">
                <view class="bottom_operation" @tap="countsNavigate(1)">
                    <text style="font-size: 20px;">{{ counts.star }}</text>
                    <text style="font-size: 12px;">我的收藏</text>
                </view>
                <view class="bottom_operation" @tap="countsNavigate(2)">
                    <text style="font-size: 20px;">{{ counts.released }}</text>
                    <text style="font-size: 12px;">我的闲置</text>
                </view>
                <view class="bottom_operation" @tap="countsNavigate(3)">
                    <text style="font-size: 20px;">{{ counts.released }}</text>
                    <text style="font-size: 12px;">我的仓库</text>
                </view>
                <view class="bottom_operation" @tap="countsNavigate(4)">
                    <text style="font-size: 20px;">{{ counts.article }}</text>
                    <text style="font-size: 12px;">我的帖子</text>
                </view>
            </view>
        </view>
        <view class="mine_deal_wrapper">
            <view class="mine_deal_card">
                <view class="deal_card_title">
                    <text>我的交易</text>
                </view>
                <view class="deal_card_body">
                    <view class='deal_option' v-for="(item, index) in dealItem" :key="index">
                        <view class="icon_group">
                            <text :class="'cuIcon-' + item.icon" style="font-size: 30px;"></text>
                            <view class="cu-tag badge" style="right: 0px;">9</view>
                        </view>
                        <text style="font-size: 13px;color: #999898;">{{ item.name }}</text>
                    </view>
                </view>
            </view>
        </view>
        <uni-list>
            <uni-list-item showArrow title="修改学校" />
            <!-- <uni-list-item showArrow title="修改主题" /> -->
            <!-- <uni-list-item showArrow title="建议意见反馈" /> -->
            <uni-list-item showArrow title="退出登录" clickable @click="logoutXH" />
            <uni-list-item showArrow title="用户服务协议" />
        </uni-list>
    </view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ref } from 'vue';
import useUserStore from '@/stores/users/index'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import useProductStore from '@/stores/product/index'
import { releasedCount } from '@/api/user/user'
const statusBarHeight = ref<number>(Number(uni.getSystemInfoSync().statusBarHeight));
const userStore = useUserStore()
const productStore = useProductStore()
const { userInfo, counts } = storeToRefs(userStore)
const dealItem = reactive([
    {
        name: "待付款",
        icon: 'pay'
    },
    {
        name: "待发货",
        icon: 'send'
    },
    {
        name: "待收货",
        icon: 'deliver'
    },
    {
        name: "退款/售后",
        icon: 'refund'
    },

])
// 我的收藏，我的帖子，我的发布页面跳转函数
const countsNavigate = (flag: number) => {
    switch (flag) {
        case 1:
            // 我的收藏
            uni.navigateTo({
                url: "/pages/home/mine/favouriteList"
            })
            break;
        case 2:
            // 我的发布
            uni.navigateTo({
                url: "/pages/home/mine/releasedProductList"
            })
            break;
        case 3:
            // 我的仓库
            uni.navigateTo({
                url: `/pages/home/mine/myStoresHouse?id=${userInfo.value.id}`
            })
            break;
        case 4:
            // 我的帖子
            uni.navigateTo({
                url: "/pages/home/mine/myStoresHouse"
            })
            break;
        default:
            break;
    }
}
const logoutXH = () => {
    uni.showModal({
        title: '提示',
        content: '确定退出',
        success: function (res) {
            if (res.confirm) {
                uni.removeStorageSync("xh_user")
                console.log("退出前",uni.getStorageSync("xh_user"));
                
                uni.redirectTo({
                    url: "/pages/login/index"
                })
            } else if (res.cancel) {
            }
        }
    });

}
onMounted(() => {
    console.log("登录页挂载");
    productStore.requestProductList()
    
})
</script>

<style lang="scss" scoped>
.mine_page_wrapper {
    height: 100%;
    background-color: #F0F0F0;

    .status_bar {
        position: sticky;
        top: 0;
        background-color: #5290FF;
    }
}


.mine_top_profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #5290FF;
    padding: 5px 5px 0;
    padding-bottom: 35px;
    color: white;
    transform: translateY(-1px);

    .profile_top {
        display: flex;
        max-height: 80px;
        padding: 0 10px 10px 10px;
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

    .profile_bottom {
        display: flex;
        justify-content: space-around;

        .bottom_operation {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
        }
    }
}

.mine_deal_wrapper {
    display: flex;
    justify-content: center;

    .mine_deal_card {
        width: 85%;
        height: 126px;
        border-radius: 15px;
        background-color: white;
        transform: translateY(-25px);
        box-shadow: 6px 6px 7px #a69f9f;
        display: flex;
        flex-direction: column;

        .deal_card_title {
            flex: 1;
            font-size: 16px;
            padding-left: 15px;
            padding-top: 16px;
            font-weight: bold;
        }

        .deal_card_body {
            flex: 2;
            display: flex;
            justify-content: space-around;
            padding: 10px;

            .deal_option {
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: relative;

                .icon_group {
                    position: relative;
                    text-align: center;
                }
            }
        }
    }

}
</style>
